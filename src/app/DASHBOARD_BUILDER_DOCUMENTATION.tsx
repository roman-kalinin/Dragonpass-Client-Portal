/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║           DRAGONPASS DASHBOARD BUILDER - DEVELOPER DOCUMENTATION        ║
 * ║                     Comprehensive State & Behavior Spec                 ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * This document defines all states, edge cases, interactions, and decisions
 * for the Dashboard Builder feature. It serves as the single source of truth
 * for developers implementing or maintaining this feature.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * TABLE OF CONTENTS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 1. ARCHITECTURE OVERVIEW
 * 2. STATE DEFINITIONS & TRANSITIONS
 * 3. COMPONENT HIERARCHY
 * 4. USER FLOWS
 * 5. EDGE CASES & CORNER CASES
 * 6. MISSING STATES (Identified & Resolved)
 * 7. INTERACTION SPECIFICATIONS
 * 8. ERROR HANDLING
 * 9. ACCESSIBILITY
 * 10. PERFORMANCE CONSIDERATIONS
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * 1. ARCHITECTURE OVERVIEW
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * The Dashboard Builder uses a centralized state management pattern via
 * React Context + useReducer. All state mutations flow through dispatched
 * actions, making state transitions predictable and debuggable.
 *
 * Layout Structure:
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ TopBar (fixed, 64px height)                                     │
 * ├──────┬───────────┬──────────────────────────────────────────────┤
 * │ Icon │ Sidebar   │ Main Content Area                            │
 * │ Nav  │ (291px)   │ ┌────────────────────────────────────────┐   │
 * │(73px)│ OR Widget │ │ Dashboard Toolbar                      │   │
 * │      │ Library   │ ├────────────────────────────────────────┤   │
 * │      │ (400px)   │ │ Dashboard Canvas                       │   │
 * │      │           │ │ (scrollable)                           │   │
 * │      │           │ └────────────────────────────────────────┘   │
 * └──────┴───────────┴──────────────────────────────────────────────┘
 *
 * File Structure:
 * /src/app/
 * ├── App.tsx                    - Root component, wraps with AppProvider
 * ├── store.tsx                  - Context + Reducer (state management)
 * ├── types.ts                   - TypeScript type definitions
 * ├── data.ts                    - Mock data, widget definitions, templates
 * └── components/
 *     ├── TopBar.tsx             - Global header with search & stats
 *     ├── IconNav.tsx            - Left icon navigation rail
 *     ├── Sidebar.tsx            - Dashboard list (system + saved views)
 *     ├── WidgetLibrary.tsx      - Widget browser with categories & preview
 *     ├── DashboardToolbar.tsx   - Name, description, date range, actions
 *     ├── DashboardCanvas.tsx    - Widget rendering area (KPI, Chart, Table)
 *     ├── UnsavedChangesDialog.tsx - Confirmation modals
 *     └── Toast.tsx              - Notification system
 *
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * 2. STATE DEFINITIONS & TRANSITIONS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ STATE PROPERTY           │ TYPE              │ DEFAULT              │
 * ├─────────────────────────────────────────────────────────────────────┤
 * │ sidebarView              │ 'navigation' |    │ 'navigation'         │
 * │                          │ 'widget-library'  │                      │
 * │ activeDashboardId        │ string | null     │ null                 │
 * │ dashboards               │ Dashboard[]       │ system + saved       │
 * │ widgetLibraryOpen        │ boolean           │ false                │
 * │ widgetCategories         │ WidgetCategory[]  │ 5 categories         │
 * │ selectedWidgetIds        │ string[]          │ []                   │
 * │ previewWidgetId          │ string | null     │ null                 │
 * │ widgetSearchQuery        │ string            │ ''                   │
 * │ dashboardSearchQuery     │ string            │ ''                   │
 * │ globalSearchQuery        │ string            │ ''                   │
 * │ dateRange                │ DateRange         │ 'Last 30 Days'       │
 * │ isLoading                │ boolean           │ false                │
 * │ isSaving                 │ boolean           │ false                │
 * │ isExporting              │ boolean           │ false                │
 * │ hasUnsavedChanges        │ boolean           │ false                │
 * │ showDeleteConfirm        │ string | null     │ null                 │
 * │ showUnsavedWarning       │ boolean           │ false                │
 * │ pendingNavigationId      │ string | null     │ null                 │
 * │ toastMessage             │ string | null     │ null                 │
 * │ toastType                │ success|error|info│ 'info'               │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * KEY STATE TRANSITIONS:
 *
 * A. No Dashboard Selected → Dashboard Selected
 *    Trigger: User clicks dashboard in sidebar
 *    Guard: Check hasUnsavedChanges (show warning if true)
 *    Effect: Load dashboard widgets into selectedWidgetIds
 *
 * B. Navigation Sidebar → Widget Library
 *    Trigger: User clicks "Add Widget" button
 *    Guard: Must have activeDashboardId
 *    Effect: sidebarView changes, widgetLibraryOpen = true
 *
 * C. Empty Dashboard → Populated Dashboard
 *    Trigger: User selects widgets OR applies template
 *    Effect: Widgets render in canvas grouped by type
 *
 * D. Clean State → Dirty State
 *    Trigger: Any modification (name, desc, widgets)
 *    Effect: hasUnsavedChanges = true, dashboard.isDirty = true
 *
 * E. Dirty State → Clean State
 *    Trigger: Save action completes
 *    Effect: hasUnsavedChanges = false, all isDirty = false
 *
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * 3. COMPONENT HIERARCHY
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * App (AppProvider wrapper)
 * └── DashboardBuilder
 *     ├── TopBar
 *     │   ├── Logo
 *     │   ├── GlobalSearch (input)
 *     │   ├── RequestStats (42 requests, 12m resolution)
 *     │   └── NotificationBell
 *     │
 *     ├── IconNav
 *     │   ├── TopGroup (Dashboard, Orders, Analytics)
 *     │   ├── MiddleGroup (Trends, Programs, Members)
 *     │   └── BottomGroup (Settings)
 *     │
 *     ├── Sidebar (when sidebarView === 'navigation')
 *     │   ├── Header (title + description)
 *     │   ├── DashboardSearch
 *     │   ├── SystemDashboards
 *     │   │   └── DashboardItem[] (Overview, Financial, etc.)
 *     │   ├── Divider
 *     │   └── SavedViews
 *     │       ├── DashboardItem[] (user-created)
 *     │       └── NewDashboardButton
 *     │
 *     ├── WidgetLibrary (when sidebarView === 'widget-library')
 *     │   ├── Header (title + close button)
 *     │   ├── PreviewCard (selected/hovered widget)
 *     │   ├── WidgetSearch
 *     │   └── CategoryList (accordion)
 *     │       └── CategoryItem
 *     │           ├── CategoryHeader (name + count + toggle)
 *     │           └── WidgetItem[] (selectable, with badge)
 *     │
 *     ├── MainContent
 *     │   ├── DashboardToolbar
 *     │   │   ├── NameInput
 *     │   │   ├── DescriptionInput
 *     │   │   ├── DateRangeSelector (dropdown)
 *     │   │   ├── ExportButton
 *     │   │   ├── SaveButton
 *     │   │   └── AddWidgetButton
 *     │   │
 *     │   └── DashboardCanvas
 *     │       ├── EmptyState (no dashboard or no widgets)
 *     │       │   ├── NoDashboardSelected (no activeDashboardId)
 *     │       │   └── BuildYourDashboard (dashboard with no widgets)
 *     │       │       ├── TemplateCard[]
 *     │       │       └── BrowseAllTemplatesButton
 *     │       │
 *     │       └── PopulatedState (has widgets)
 *     │           ├── KpiGrid (4-column grid)
 *     │           │   └── KpiCard[] (value, trend, sparkline)
 *     │           ├── ChartGrid (2-column grid)
 *     │           │   └── ChartPlaceholder[]
 *     │           └── TableSection (full-width)
 *     │               └── TableWidget[] (with mock data rows)
 *     │
 *     ├── UnsavedChangesDialog (modal)
 *     ├── DeleteConfirmDialog (modal)
 *     └── Toast (notification)
 *
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * 4. USER FLOWS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * FLOW 1: Create New Dashboard from Scratch
 * ──────────────────────────────────────────
 * 1. User clicks "+ New dashboard" in sidebar
 * 2. New dashboard created with default name "New Dashboard"
 * 3. Empty state shown with templates
 * 4. User edits name in toolbar
 * 5. User clicks "Add Widget" to open Widget Library
 * 6. User browses categories, clicks widgets to select
 * 7. Selected widgets appear in canvas
 * 8. User clicks "Save" to persist
 *
 * FLOW 2: Create Dashboard from Template
 * ───────────────────────────────────────
 * 1. User clicks "+ New dashboard"
 * 2. Empty state shows template options
 * 3. User clicks "Executive Overview" template
 * 4. Pre-configured widgets populate the canvas
 * 5. User customizes (add/remove widgets)
 * 6. User saves
 *
 * FLOW 3: Edit Existing Dashboard
 * ────────────────────────────────
 * 1. User clicks dashboard in sidebar
 * 2. Dashboard loads with existing widgets
 * 3. User modifies name/description/widgets
 * 4. Dirty indicator appears on sidebar item
 * 5. User saves
 *
 * FLOW 4: Navigate Away with Unsaved Changes
 * ────────────────────────────────────────────
 * 1. User has unsaved changes on current dashboard
 * 2. User clicks different dashboard in sidebar
 * 3. Unsaved Changes dialog appears
 * 4. Options: "Discard" (lose changes) or "Save & Continue"
 * 5a. Discard → Navigate to new dashboard, old changes lost
 * 5b. Save & Continue → Save first, then navigate
 *
 * FLOW 5: Widget Library Interaction
 * ───────────────────────────────────
 * 1. User clicks "Add Widget"
 * 2. Widget Library replaces sidebar
 * 3. Preview card shows last selected/hovered widget
 * 4. User can search widgets by name/description
 * 5. User can expand/collapse categories
 * 6. Clicking a widget toggles selection (checkmark)
 * 7. Hovering shows preview
 * 8. Selected widgets immediately appear in canvas
 * 9. User closes Widget Library via X button
 *
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * 5. EDGE CASES & CORNER CASES
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * EC-01: Empty Dashboard Name
 * ────────────────────────────
 * Scenario: User clears the dashboard name input
 * Resolution: Allow empty during editing. On save, if empty,
 * auto-set to "Untitled Dashboard". Name input has maxLength=50.
 * The input placeholder shows "Dashboard name" as visual cue.
 *
 * EC-02: Duplicate Dashboard Names
 * ─────────────────────────────────
 * Scenario: User creates a dashboard with same name as existing
 * Resolution: Allowed. Dashboards are identified by unique IDs,
 * not names. Consider adding a visual indicator or suggestion in
 * future iterations. Current behavior matches common patterns
 * (Google Sheets, Notion, etc. allow duplicate names).
 *
 * EC-03: Maximum Widget Count
 * ───────────────────────────
 * Scenario: User adds many widgets (20+) to a single dashboard
 * Resolution: No hard limit imposed. The canvas scrolls vertically.
 * Performance consideration: Large number of widgets may slow
 * rendering. Consider virtualizing if > 50 widgets needed.
 * Recommended soft limit: 20 widgets per dashboard.
 *
 * EC-04: Widget Library Search with No Results
 * ──────────────────────────────────────────────
 * Scenario: User searches for a term that matches no widgets
 * Resolution: Empty state shown with message "No widgets found
 * for '{query}'" and a "Clear search" button. Categories with
 * no matching widgets are hidden.
 *
 * EC-05: Dashboard Search with No Results
 * ─────────────────────────────────────────
 * Scenario: User searches dashboards in sidebar with no matches
 * Resolution: Separate messages for system and saved views:
 * - System: "No system dashboards match '{query}'"
 * - Saved: "No saved dashboards match '{query}'"
 *
 * EC-06: Empty Saved Views
 * ─────────────────────────
 * Scenario: User has no saved dashboards
 * Resolution: Show message "No saved dashboards yet. Create one
 * to get started." with the "+ New dashboard" button below.
 *
 * EC-07: Delete System Dashboard
 * ──────────────────────────────
 * Scenario: User attempts to delete a system dashboard
 * Resolution: System dashboards (isSystem=true) are not deletable.
 * The delete action is not exposed in the UI for system dashboards.
 * Only user-created dashboards can be deleted.
 *
 * EC-08: Browser Back/Forward Navigation
 * ───────────────────────────────────────
 * Scenario: User navigates away using browser buttons
 * Resolution: Currently not handled (no router integration).
 * RECOMMENDATION: Add beforeunload event listener when
 * hasUnsavedChanges is true:
 * ```
 * window.addEventListener('beforeunload', (e) => {
 *   if (hasUnsavedChanges) e.preventDefault();
 * });
 * ```
 *
 * EC-09: Rapid Save Clicks
 * ─────────────────────────
 * Scenario: User clicks Save multiple times quickly
 * Resolution: Save button is disabled while isSaving=true.
 * The button shows a loading spinner. Subsequent clicks are
 * ignored until the save operation completes.
 *
 * EC-10: Widget Type Rendering
 * ────────────────────────────
 * Scenario: Widgets of different types need different layouts
 * Resolution: Three layout strategies:
 * - KPI: 4-column grid, compact cards with value + trend
 * - CHART: 2-column grid, larger cards with placeholder area
 * - TABLE: Full-width, scrollable data table
 * Widgets are automatically sorted by type in the canvas.
 *
 * EC-11: Date Range Change
 * ─────────────────────────
 * Scenario: User changes date range
 * Resolution: Currently updates the display label. In production,
 * this should trigger data refetch for all widgets. The dropdown
 * closes on outside click. "Custom Range" option would need a
 * date picker UI (not yet implemented).
 *
 * EC-12: No Active Dashboard + Toolbar Interaction
 * ──────────────────────────────────────────────────
 * Scenario: No dashboard selected, user interacts with toolbar
 * Resolution: Export, Save, and Add Widget buttons are disabled
 * (opacity-50, pointer-events none) when no activeDashboardId.
 * Name and description inputs show default placeholder values.
 *
 * EC-13: Widget Removal from Canvas
 * ──────────────────────────────────
 * Scenario: User removes last widget from dashboard
 * Resolution: Dashboard transitions back to empty state
 * ("Build your dashboard") with template options visible.
 * The hasUnsavedChanges flag remains true.
 *
 * EC-14: Concurrent Widget Library and Canvas Interaction
 * ────────────────────────────────────────────────────────
 * Scenario: Widget Library open, user toggles widgets
 * Resolution: Canvas updates in real-time as widgets are
 * toggled. Checkmarks appear on selected items. Deselecting
 * removes from canvas immediately.
 *
 * EC-15: Toast Auto-Dismiss
 * ──────────────────────────
 * Scenario: Toast notification appears
 * Resolution: Auto-dismisses after 3 seconds. Can be manually
 * dismissed via X button. Only one toast visible at a time.
 * Toast types: success (green), error (red), info (blue).
 *
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * 6. MISSING STATES (Identified & Resolved)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * The original Figma designs showed 3 states. Here are the additional
 * states that were missing and how they were resolved:
 *
 * MS-01: No Dashboard Selected State
 * ────────────────────────────────────
 * FIGMA: Not shown
 * RESOLUTION: Added "Select a dashboard" empty state with LayoutDashboard
 * icon and instructional text. This is the initial app state.
 *
 * MS-02: Loading State
 * ─────────────────────
 * FIGMA: Not shown
 * RESOLUTION: Added isLoading state property. When true, components
 * can show skeleton/spinner states. Currently used for save/export
 * operations (isSaving, isExporting) with spinner icons on buttons.
 * RECOMMENDATION: Add skeleton loading for initial dashboard data fetch.
 *
 * MS-03: Save/Export Feedback
 * ───────────────────────────
 * FIGMA: Not shown
 * RESOLUTION: Added toast notification system. Success/error toasts
 * appear in bottom-right corner. Save and Export buttons show loading
 * spinners during operations.
 *
 * MS-04: Unsaved Changes Warning
 * ────────────────────────────────
 * FIGMA: Not shown
 * RESOLUTION: Added UnsavedChangesDialog modal. Appears when user
 * tries to navigate away from dirty dashboard. Options: Discard
 * or Save & Continue. Yellow warning icon with clear messaging.
 *
 * MS-05: Delete Confirmation
 * ───────────────────────────
 * FIGMA: Not shown
 * RESOLUTION: Added DeleteConfirmDialog modal. Red warning styling.
 * Shows dashboard name being deleted. Options: Cancel or Delete.
 *
 * MS-06: Dirty Dashboard Indicator
 * ──────────────────────────────────
 * FIGMA: Not shown
 * RESOLUTION: Added amber dot indicator on sidebar dashboard items
 * when dashboard.isDirty === true. Provides visual cue that changes
 * haven't been saved.
 *
 * MS-07: Widget Library Empty Search State
 * ──────────────────────────────────────────
 * FIGMA: Not shown
 * RESOLUTION: Added "No widgets found" message with "Clear search"
 * action button. Categories with no matches are hidden entirely.
 *
 * MS-08: Dashboard Search Empty State
 * ─────────────────────────────────────
 * FIGMA: Not shown
 * RESOLUTION: Added contextual messages for both System and Saved
 * Views sections when no dashboards match the search query.
 *
 * MS-09: No Saved Dashboards State
 * ──────────────────────────────────
 * FIGMA: Not shown
 * RESOLUTION: Added instructional message "No saved dashboards yet.
 * Create one to get started." in the Saved Views section.
 *
 * MS-10: Widget Hover States
 * ───────────────────────────
 * FIGMA: Partially shown (selected state only)
 * RESOLUTION: Added hover effects on all interactive elements:
 * - Sidebar items: bg-[#f9fafb] on hover
 * - Widget items: bg-[#f9fafb] on hover, bg-[#f0fdf4] when selected
 * - Buttons: Various hover color changes
 * - KPI cards: Remove button appears on hover (group-hover)
 * - Table rows: bg-[#f9fafb] on hover
 *
 * MS-11: Widget Card Actions (More Menu)
 * ────────────────────────────────────────
 * FIGMA: Shown as "..." icon on widget cards
 * RESOLUTION: Added MoreVertical icon that appears on card hover.
 * RECOMMENDATION: Implement dropdown menu with options:
 * - Edit widget settings
 * - Duplicate widget
 * - Move up/down
 * - Remove from dashboard
 *
 * MS-12: Date Range Dropdown
 * ───────────────────────────
 * FIGMA: Shown collapsed only
 * RESOLUTION: Implemented full dropdown with 6 date range options.
 * Active selection highlighted. Closes on outside click.
 * "Custom Range" listed but date picker not implemented.
 *
 * MS-13: Notification Bell State
 * ────────────────────────────────
 * FIGMA: Shown without notification indicator
 * RESOLUTION: Bell icon implemented with hover state.
 * RECOMMENDATION: Add:
 * - Unread count badge (red circle with number)
 * - Notification dropdown panel
 * - Mark as read functionality
 *
 * MS-14: User Profile Section
 * ────────────────────────────
 * FIGMA: Shown in sidebar bottom with avatar
 * RESOLUTION: Deferred from current implementation as it's in
 * the icon nav rail. The Figma showed "Alex Morgan - Senior Agent"
 * with online indicator.
 * RECOMMENDATION: Add user profile dropdown with:
 * - Profile settings
 * - Organization settings
 * - Sign out
 *
 * MS-15: Export Format Options
 * ────────────────────────────
 * FIGMA: Single "Export" button shown
 * RESOLUTION: Implemented as single-click export with loading state.
 * RECOMMENDATION: Add dropdown for format selection:
 * - Export as PDF
 * - Export as CSV
 * - Export as PNG (screenshot)
 * - Share link
 *
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * 7. INTERACTION SPECIFICATIONS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * INT-01: Sidebar Dashboard Click
 * ─────────────────────────────────
 * Behavior: Selects dashboard, loads its widgets
 * Guard: If hasUnsavedChanges, show warning dialog
 * Visual: Active item gets bg-[#f1f5f9], text-[#0a2333]
 *
 * INT-02: Widget Toggle (in Library)
 * ────────────────────────────────────
 * Behavior: Toggles widget selection for active dashboard
 * Visual: Selected = green bg + checkmark, Unselected = chart icon
 * Side effect: Canvas updates immediately
 *
 * INT-03: Widget Hover (in Library)
 * ──────────────────────────────────
 * Behavior: Updates preview card with hovered widget
 * Visual: Item background changes to bg-[#f9fafb]
 *
 * INT-04: Category Accordion Toggle
 * ──────────────────────────────────
 * Behavior: Expands/collapses widget category
 * Visual: ChevronDown ↔ ChevronRight icon transition
 * Default: "Overview" expanded, others collapsed
 *
 * INT-05: Template Selection
 * ──────────────────────────
 * Behavior: Populates dashboard with template's widget set
 * Effect: Replaces any existing widget selection
 * Visual: Canvas transitions from empty to populated
 *
 * INT-06: Widget Removal (from Canvas)
 * ─────────────────────────────────────
 * Behavior: Removes widget from dashboard
 * Trigger: X button on card hover
 * Guard: None (immediate removal)
 * Visual: Widget disappears, grid re-flows
 * Side effect: Widget unchecked in library if open
 *
 * INT-07: Dashboard Name/Description Edit
 * ─────────────────────────────────────────
 * Behavior: Updates dashboard metadata
 * Trigger: Input change event
 * Constraints: Name maxLength=50, Description maxLength=200
 * Side effect: Sets hasUnsavedChanges = true
 *
 * INT-08: Date Range Selection
 * ─────────────────────────────
 * Behavior: Changes date range for all widgets
 * Trigger: Click option in dropdown
 * Visual: Dropdown closes, label updates
 * Side effect: In production, triggers data refresh
 *
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * 8. ERROR HANDLING
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ERR-01: Save Failure
 * ─────────────────────
 * Current: Mock save always succeeds after 800ms delay
 * Production: Should handle API errors:
 * - Network failure → Toast "Failed to save. Please try again."
 * - Auth expired → Redirect to login
 * - Conflict → Toast "Dashboard was modified by another user"
 *
 * ERR-02: Export Failure
 * ──────────────────────
 * Current: Mock export always succeeds after 800ms delay
 * Production: Should handle:
 * - Timeout → Toast "Export timed out. Please try again."
 * - Format error → Toast "Export failed. Try a different format."
 *
 * ERR-03: Data Load Failure
 * ──────────────────────────
 * Current: All data is mock/static
 * Production: Should handle:
 * - API unavailable → Error state with retry button
 * - Partial failure → Show available data, error toast for failed
 * - Empty response → Empty state with appropriate messaging
 *
 * ERR-04: Invalid Widget ID Reference
 * ─────────────────────────────────────
 * Resolution: Widget lookup uses .filter(Boolean) to skip missing
 * IDs. Widgets with invalid IDs are silently dropped from render.
 * RECOMMENDATION: Add console.warn for missing widget IDs in dev.
 *
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * 9. ACCESSIBILITY
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * A11Y-01: Keyboard Navigation
 * ──────────────────────────────
 * - All interactive elements are native HTML buttons/inputs
 * - Tab order follows visual layout (left to right, top to bottom)
 * - Modal dialogs trap focus when open
 * RECOMMENDATION: Add arrow key navigation within sidebar list
 *
 * A11Y-02: Screen Readers
 * ────────────────────────
 * - Dashboard items use button semantics
 * - Inputs have placeholder text as implicit labels
 * RECOMMENDATION: Add explicit aria-labels:
 *   - "Dashboard name" for name input
 *   - "Dashboard description" for description input
 *   - "Select date range" for date picker
 *   - aria-expanded for accordion categories
 *   - aria-selected for dashboard items
 *   - role="alert" for toast notifications
 *
 * A11Y-03: Color Contrast
 * ─────────────────────────
 * - Primary text (#0a2333 on white): 15.4:1 ratio (AAA)
 * - Secondary text (#62748e on white): 4.8:1 ratio (AA)
 * - Trend positive (#008236): 5.2:1 ratio (AA)
 * - Trend negative (#d4183d): 4.6:1 ratio (AA)
 *
 * A11Y-04: Motion Preferences
 * ────────────────────────────
 * RECOMMENDATION: Respect prefers-reduced-motion for:
 * - Toast slide-in animation
 * - Loading spinner animations
 * - Hover transitions
 *
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * 10. PERFORMANCE CONSIDERATIONS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * PERF-01: Widget Rendering
 * ──────────────────────────
 * All widgets render simultaneously. For dashboards with many
 * widgets (>15), consider:
 * - Virtualized list for table rows
 * - Lazy loading for chart components
 * - Memoization of KPI cards (React.memo)
 *
 * PERF-02: State Updates
 * ───────────────────────
 * Each dispatch triggers full context re-render. For high-frequency
 * updates (e.g., search input), consider:
 * - Debouncing search inputs (300ms)
 * - Splitting context into smaller providers
 * - Using useMemo for filtered lists
 *
 * PERF-03: Widget Library Filtering
 * ──────────────────────────────────
 * Current implementation filters all categories on every render.
 * With current data size (~45 widgets), this is negligible.
 * For larger widget catalogs (>200), consider pre-indexed search.
 *
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ACTION REFERENCE (Reducer)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * | Action                        | Effect                                |
 * |-------------------------------|---------------------------------------|
 * | SET_ACTIVE_DASHBOARD          | Navigate to dashboard                 |
 * | SET_SIDEBAR_VIEW              | Switch sidebar panel                  |
 * | TOGGLE_WIDGET_LIBRARY         | Open/close widget library             |
 * | CLOSE_WIDGET_LIBRARY          | Close widget library                  |
 * | CREATE_DASHBOARD              | Create new empty dashboard            |
 * | DELETE_DASHBOARD              | Remove dashboard permanently          |
 * | UPDATE_DASHBOARD_NAME         | Change dashboard name                 |
 * | UPDATE_DASHBOARD_DESCRIPTION  | Change dashboard description          |
 * | TOGGLE_WIDGET_SELECTION       | Add/remove widget from dashboard      |
 * | ADD_WIDGETS_TO_DASHBOARD      | Batch add selected widgets            |
 * | REMOVE_WIDGET_FROM_DASHBOARD  | Remove specific widget                |
 * | SET_PREVIEW_WIDGET            | Update widget preview card            |
 * | SET_WIDGET_SEARCH             | Filter widget library                 |
 * | SET_DASHBOARD_SEARCH          | Filter sidebar dashboards             |
 * | SET_GLOBAL_SEARCH             | Global search (top bar)               |
 * | SET_DATE_RANGE                | Change time period                    |
 * | TOGGLE_CATEGORY               | Expand/collapse widget category       |
 * | SAVE_DASHBOARD                | Start save operation                  |
 * | SAVE_COMPLETE                 | Finish save, clear dirty flags        |
 * | EXPORT_DASHBOARD              | Start export operation                |
 * | EXPORT_COMPLETE               | Finish export                         |
 * | SHOW_DELETE_CONFIRM           | Show/hide delete confirmation         |
 * | SHOW_UNSAVED_WARNING          | Show/hide unsaved changes dialog      |
 * | SET_PENDING_NAVIGATION        | Store target dashboard for nav        |
 * | DISCARD_CHANGES_AND_NAVIGATE  | Discard changes, navigate to pending  |
 * | SET_TOAST                     | Show/dismiss toast notification       |
 * | APPLY_TEMPLATE                | Apply template widget set             |
 * | CLEAR_WIDGET_SELECTIONS       | Clear all selections                  |
 *
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * FUTURE RECOMMENDATIONS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 1. DRAG & DROP: Allow reordering widgets within the canvas
 *    using react-dnd. Define drop zones for grid cells.
 *
 * 2. WIDGET RESIZE: Allow users to resize widget cards
 *    (1x1, 2x1, 2x2 grid spans) using re-resizable.
 *
 * 3. REAL-TIME DATA: Connect to Supabase or API for live data.
 *    Widget values should refresh on dateRange change.
 *
 * 4. SHARING: Add dashboard sharing with view/edit permissions.
 *    Generate shareable links.
 *
 * 5. VERSION HISTORY: Track dashboard changes over time.
 *    Allow reverting to previous versions.
 *
 * 6. CUSTOM WIDGETS: Allow users to create custom KPIs
 *    with configurable data sources and thresholds.
 *
 * 7. RESPONSIVE LAYOUT: Current grid is fixed 4-column for KPIs.
 *    Consider responsive breakpoints:
 *    - Desktop (>1280px): 4 columns
 *    - Tablet (768-1280px): 2 columns
 *    - Mobile (<768px): 1 column, sidebar as drawer
 *
 * 8. UNDO/REDO: Implement action history for undo/redo support.
 *    Track last N actions for reversal.
 *
 * 9. KEYBOARD SHORTCUTS:
 *    - Ctrl+S: Save dashboard
 *    - Ctrl+E: Export
 *    - Ctrl+N: New dashboard
 *    - Escape: Close widget library / dismiss dialog
 *    - Ctrl+Z: Undo
 *
 * 10. ONBOARDING: First-time user experience with guided tour
 *     highlighting key features (sidebar, widget library, templates).
 */

// This file is documentation only - no runtime exports needed.
export {};
