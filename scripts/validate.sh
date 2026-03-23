#!/bin/bash
# Post-implementation validation script
# Run after each code change to catch common issues

cd "$(dirname "$0")/.."

echo "=== VALIDATION START ==="
ERRORS=0

# 1. Vite build — the single source of truth for compilation
echo ""
echo "--- Check: Vite build ---"
BUILD_OUTPUT=$(npx vite build --mode development 2>&1)
if echo "$BUILD_OUTPUT" | grep -q "✓ built"; then
  echo "  PASS: Build succeeded"
  echo "$BUILD_OUTPUT" | tail -4
else
  echo "  FAIL: Build failed"
  echo "$BUILD_OUTPUT"
  ERRORS=$((ERRORS + 1))
fi

# 2. Check that all local imports resolve to real files
echo ""
echo "--- Check: Import resolution ---"
IMPORT_ERRORS=0
for f in src/app/App.tsx src/app/components/*.tsx src/app/components/**/*.tsx; do
  [ -f "$f" ] || continue
  while IFS= read -r line; do
    if echo "$line" | grep -qE "^import.*from\s+'\."; then
      REL_PATH=$(echo "$line" | sed -n "s/.*from\s*'\(\..*\)'.*/\1/p")
      if [ -n "$REL_PATH" ]; then
        DIR=$(dirname "$f")
        RESOLVED=false
        for EXT in ".tsx" ".ts" "/index.tsx" "/index.ts"; do
          if [ -f "$DIR/$REL_PATH$EXT" ]; then
            RESOLVED=true
            break
          fi
        done
        if ! $RESOLVED; then
          echo "  WARNING: $f - Unresolved import: $REL_PATH"
          IMPORT_ERRORS=$((IMPORT_ERRORS + 1))
        fi
      fi
    fi
  done < "$f"
done

if [ $IMPORT_ERRORS -eq 0 ]; then
  echo "  PASS: All local imports resolve"
else
  ERRORS=$((ERRORS + IMPORT_ERRORS))
fi

# 3. Check for unused imports in key files (common cause of blank pages)
echo ""
echo "--- Check: Unused Lucide imports in DashboardCanvas ---"
if [ -f "src/app/components/DashboardCanvas.tsx" ]; then
  # Extract imported identifiers from lucide-react line
  LUCIDE_IMPORTS=$(grep "from 'lucide-react'" src/app/components/DashboardCanvas.tsx | sed "s/import {//;s/} from.*//;s/,/ /g" | tr -s ' ')
  UNUSED=0
  for IDENT in $LUCIDE_IMPORTS; do
    # Check if used anywhere else in the file (skip the import line itself)
    USAGE=$(grep -c "$IDENT" src/app/components/DashboardCanvas.tsx)
    if [ "$USAGE" -le 1 ]; then
      echo "  WARNING: '$IDENT' imported but possibly unused"
      UNUSED=$((UNUSED + 1))
    fi
  done
  if [ $UNUSED -eq 0 ]; then
    echo "  PASS: All Lucide imports appear used"
  fi
fi

echo ""
echo "=== VALIDATION COMPLETE: $ERRORS error(s) ==="
[ $ERRORS -eq 0 ] && exit 0 || exit 1
