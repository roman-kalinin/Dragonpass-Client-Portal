# Dragonpass Client Portal — Project Guidelines

## Stack
- React + Vite + TypeScript
- Tailwind CSS v4 (utility-first, inline classes — no CSS modules)
- shadcn/ui components in `src/app/components/ui/`
- Lucide React for all icons
- State management: custom context/reducer in `src/app/store.tsx`
- No router — navigation is state-based via `activeView` in `App.tsx`

---

## Navigation Pattern
- `App.tsx` owns `activeView: string` state
- `IconNav` receives `activeView` + `onNavigate` props and highlights the active item
- Each top-level view is a full-page component (e.g. `OrderManagementPage`, `DashboardBuilder`)
- To add a new view: add a branch in `App.tsx` and wire the nav id in `IconNav`

---

## Design System

### Font
Always use `font-['Cabin',sans-serif]` — never system fonts or other typefaces.

### Color Tokens (use these exact values)
| Role | Value |
|---|---|
| Primary / dark navy | `#0a2333` |
| Secondary text | `#586e7d` |
| Tertiary text | `#6a7282` |
| Disabled / placeholder text | `#9ca3af` |
| Border default | `#e5e7eb` |
| Border subtle (top bars) | `#e2e8f0` |
| Page background | `#f9fafb` |
| Surface / card | `#ffffff` |
| Icon color (inactive) | `#45556c` |
| Nav divider | `#cad5e2` |
| Brand accent | `#34d399` |
| Error / destructive | `#dc2626` |

### Status Badges
| Badge | Background | Text |
|---|---|---|
| CONFIRMED | `#dcfce7` | `#166534` |
| ENTITLEMENT | `#d1fae5` | `#0a2333` |
| DISCOUNT | `#ccfbf1` | `#134e4a` |
| PENDING | `#fef9c3` | `#854d0e` |
| CANCELLED | `#fee2e2` | `#991b1b` |

Badge pattern: `inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-['Cabin',sans-serif]`

### Typography Scale
| Use | Class |
|---|---|
| Page title | `font-bold text-[22px] text-[#0a2333]` |
| Section heading | `font-bold text-[15px] text-[#0a2333]` |
| Table header | `font-semibold text-[11px] text-[#6a7282] uppercase tracking-wider` |
| Body / table cell | `text-[13px] text-[#0a2333]` |
| Supporting / label | `text-[12px] text-[#6a7282]` |
| Caption / meta | `text-[11px] text-[#9ca3af]` |

### Layout Shell
Every full-page view follows this structure:
```
<div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f9fafb]">
  <TopBar />
  <div className="flex flex-1 overflow-hidden">
    <IconNav activeView={activeView} onNavigate={onNavigate} />
    <main content />
  </div>
</div>
```
- `TopBar` is always shared and unchanged across views
- `IconNav` is always shared — pass `activeView` + `onNavigate` from `App.tsx`
- Main content area: `flex-1 flex flex-col overflow-hidden`

### Shared Layout Components
- `TopBar` — `src/app/components/TopBar.tsx` — uses `useApp()`, must be inside `<AppProvider>`
- `IconNav` — `src/app/components/IconNav.tsx` — accepts `activeView`, `onNavigate`
- `AppProvider` wraps all views in `App.tsx`

### Cards & Surfaces
- White card with border: `bg-white rounded-xl border border-[#e5e7eb]`
- Page header block: `bg-white border-b border-[#e5e7eb] px-8 py-5`
- Table rows: `border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors`
- Section divider inside panels: `border-t border-[#e5e7eb]`

### Buttons
- Primary: `bg-[#0a2333] text-white rounded-xl px-4 py-3 hover:bg-[#152c3c] transition-colors`
- Ghost/outline: `border border-[#e5e7eb] rounded-lg px-3 h-9 text-[#45556c] hover:bg-[#f9fafb] transition-colors`
- Icon button: `w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors`

### Inputs
- Search/text: `border border-[#e5e7eb] rounded-lg h-9 px-3 text-[13px] font-['Cabin',sans-serif] focus:outline-none focus:border-[#0a2333] bg-[#f9fafb]`
- Always include `font-['Cabin',sans-serif]` on inputs

### Icons
- Library: Lucide React only
- Size: `14` or `16` for inline/UI icons, `20` for nav/toolbar
- Inactive nav icons: `text-[#45556C]`
- Active nav icons: `text-white` (on `bg-[#0a2333]` button)

---

## File Structure
```
src/app/
  App.tsx                     # View routing, AppProvider wrapper
  store.tsx                   # Global state context + reducer
  components/
    TopBar.tsx                # Shared top bar
    IconNav.tsx               # Shared nav rail
    Sidebar.tsx               # Dashboard sidebar
    orders/
      OrderManagementPage.tsx
      OrderDetailPanel.tsx
      orderData.ts
    ui/                       # shadcn/ui primitives — do not edit
    docs/                     # Dev documentation views
```

New features go in `src/app/components/<feature-name>/`.

---

## Rules
- Never edit files in `src/app/components/ui/` — these are shadcn primitives
- Always wrap new top-level views in `<AppProvider>` (done in App.tsx)
- No router — use `activeView` state pattern
- No dark mode implementation — ignore dark variants
- Figma references live in `figma references/` — check them before building any new UI
- Do not add comments unless logic is non-obvious
- Do not add error handling for impossible scenarios
- Do not create helper abstractions for one-off use
