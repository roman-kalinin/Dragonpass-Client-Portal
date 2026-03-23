# PRD: API Channel & Portal Enhancements

## Overview

This PRD specifies the implementation of Generic API as a new channel in the Dragonpass Client Portal. It covers four interconnected workstreams: a global Test/Production environment toggle, a restructured Settings page with a Developers tab for API credential management, a renamed Entitlements section (formerly Benefit Orchestrator) with product catalog and single pass management, and sandbox empty state / onboarding experiences.

**Tech stack:** React, Vite, Tailwind CSS, shadcn/Radix UI components.
**Design language:** minimal color use, enterprise typography. All new components must be consistent with the existing design system.

---

## 1. Global Test / Production Environment Toggle

### 1.1 Purpose

Allow API clients to switch the entire portal between Test (sandbox) and Production environments. All data-fetching pages scope their content to the active environment. Settings is the only exception — it remains environment-agnostic.

### 1.2 Toggle Component

**Location:** Portal header bar, right-aligned area (near existing "42 Requests today" / "12m Avg. resolution time" stats).

**Component:** A pill/segmented control with two options:
- `Production` (default for existing clients)
- `Test`

**Behavior:**
- Clicking switches the active environment globally
- The selected environment is persisted in local state (React context) and optionally synced to URL query param (`?env=test` / `?env=production`) for shareable links
- Switching triggers a re-fetch of all data on the current page
- The toggle is always visible in the header — it does not hide on any page

**Visual states:**

| State | Appearance |
|-------|-----------|
| Production active | Pill shows "Production" selected with default dark navy styling. No additional visual indicators. Portal looks normal. |
| Test active | Pill shows "Test" selected with amber (`#D97706`) highlight. **Additionally:** a full-width amber banner appears below the header reading "You are viewing test data" with a dismiss option (dismiss hides banner for session only, toggle pill still shows amber). Every page title gets an appended badge: e.g., "Orders `TEST`" in a small amber tag. |

**Implementation notes:**
- Create an `EnvironmentContext` provider at the app root that exposes `{ environment: 'test' | 'production', setEnvironment }`.
- All data-fetching hooks / API calls read from this context to scope requests.
- The toggle component should be a `SegmentedControl` or custom pill using shadcn styling.

### 1.3 Test Mode Banner

```
┌──────────────────────────────────────────────────────────────────────┐
│ ⚠ You are viewing test data                              [Dismiss] │
└──────────────────────────────────────────────────────────────────────┘
```

- Full-width, sits directly below the header bar and above page content
- Background: `#FEF3C7` (amber-50), left border or icon accent: `#D97706` (amber-600)
- Text: "You are viewing test data" — dark text, no link
- Dismiss button: text-only "Dismiss" — hides banner for the current session (stored in sessionStorage), but the amber toggle pill remains visible
- The banner re-appears on next session or page refresh if still in test mode

### 1.4 Environment Badge on Page Titles

When in Test mode, append a small badge next to every page title:

```
Orders  [TEST]
```

- Badge: inline, small rounded tag, amber background (`#FEF3C7`), amber text (`#92400E`), uppercase, `text-xs font-medium`
- Applied to: Dashboard, Order Management, Analytics, Entitlements page titles
- NOT applied to: Settings (environment-agnostic)

### 1.5 Scoping Rules

| Page | Environment-scoped? | Notes |
|------|-------------------|-------|
| Dashboard | Yes | KPIs, charts, and getting started checklist reflect active environment |
| Order Management | Yes | Orders table shows test or production orders |
| Analytics | Yes | All dashboard widgets and charts scoped to environment |
| Entitlements | Partial | Product catalog is always visible (env-agnostic). Active entitlements section is scoped. |
| Settings | No | All tabs (Products, Categories, Team, Developers, General) show account-level config. Exception: the Developers tab shows keys for the currently selected environment. |

---

## 2. Settings Page Restructure

### 2.1 New Tab Structure

Replace the current Settings tabs with:

```
[ Products ]  [ Categories ]  [ Team ]  [ Developers ]  [ General ]
```

- Remove "Components (Not MVP)" tab entirely
- Add "Developers" tab between Team and General
- Remove the "Dev Docs" button from the sidebar footer — its functionality moves into the Developers tab
- Tab styling: existing horizontal tab bar pattern with underline indicator

### 2.2 Products Tab (Existing, Enhanced)

Retains current behavior: card grid showing available channels (Mobile App WL, Website WL, API, Digital Concierge Chat).

Each card shows:
- Icon / illustration
- Channel name
- Status badge: `LIVE` (green) / `INACTIVE` (gray) / `REQUESTED` (amber)
- Toggle switch (triggers Change Request modal when enabling)
- Short description
- Key Features list

**API card specifically:**
- Icon: puzzle piece or API-style icon
- Description: "RESTful API for third-party integrations"
- Key Features: REST & GraphQL endpoints, Rate limiting, Authentication, Real-time webhooks
- When toggled ON → Change Request Review modal: "You have requested to enable **API**. Your account manager will reach out to you directly to manage this change implementation." → [Cancel] [Confirm Request]

### 2.3 Categories Tab (Existing)

No changes. Retains current category grid (Flights, Hotels, Tickets, eSIMs, Airport Lounge, Airport Transfer, Airport Dining, Airport Fast Track, Health & Wellness) with checkbox toggles and Change Request modal.

### 2.4 Team Tab (Existing)

No changes to current functionality.

### 2.5 Developers Tab (New)

This is the primary new addition to Settings. It contains API credential management and documentation links.

#### Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Developers                                                  │
│  Manage your API keys, webhooks, and integration settings    │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 📄 API Documentation                                    │ │
│  │ Complete reference for the Dragonpass API.               │ │
│  │                                    [View Documentation →]│ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
│  API Keys                                                    │
│  ─────────────────────────────────────────────────────       │
│  Your API keys for the [Test ▾ / Production ▾] environment.  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ Name         Key                Created    Status    │    │
│  │ ─────────────────────────────────────────────────    │    │
│  │ Publishable  dp_test_pk_4f...  12 Mar 26  Active  ⋯ │    │
│  │ Secret       dp_test_sk_••••   12 Mar 26  Active  ⋯ │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  [+ Create New Key]                                          │
│                                                              │
│  ── Production Access ──────────────────────────────────     │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 🔒 Production keys require approval                      │ │
│  │ Request production access when you're ready to go live.  │ │
│  │ Your account manager will review and provision your      │ │
│  │ production credentials.                                  │ │
│  │                          [Request Production Access]     │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
│  Webhooks (Coming Soon)                                      │
│  ─────────────────────────────────────────────────────       │
│  Configure webhook endpoints for real-time event delivery.   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Webhook configuration will be available in a future      │ │
│  │ release.                                                 │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### API Keys Section

**Key Display Table:**

| Column | Description |
|--------|-------------|
| Name | Human-readable label (e.g., "Publishable key", "Secret key", or custom name) |
| Key | Masked by default for secret keys (`dp_test_sk_••••••••`). Publishable keys shown in full. Copy button (clipboard icon) on every row. |
| Created | Date created, format: `DD MMM YYYY` |
| Last Used | Relative time ("2 hours ago", "Never") — shows when key was last used in an API call |
| Status | `Active` (green badge) / `Revoked` (red badge) |
| Actions | Overflow menu (`⋯`): Reveal (secret keys, one-time), Rotate, Revoke |

**Key Prefixes:**

| Environment | Key Type | Prefix |
|------------|----------|--------|
| Test | Publishable | `dp_test_pk_` |
| Test | Secret | `dp_test_sk_` |
| Production | Publishable | `dp_live_pk_` |
| Production | Secret | `dp_live_sk_` |

**Behaviors:**
- Test keys are auto-generated when the client account is created. They are visible on first login.
- Secret keys: shown in full exactly once at creation. After that, masked (`dp_test_sk_••••••••••••`). If the "Reveal" action is used, show once then disable the action permanently for that key.
- Copy-to-clipboard: clicking the copy icon copies the full key value. Show a brief "Copied!" tooltip.
- Rotate: opens confirmation dialog → "Rotating this key will invalidate the current key immediately. Any integrations using this key will stop working. Are you sure?" → [Cancel] [Rotate Key] → generates new key, shows secret once.
- Revoke: opens confirmation dialog → "Revoking this key is permanent and cannot be undone." → [Cancel] [Revoke Key] → key status changes to "Revoked", row is grayed out.

**Create New Key Button:**
- Opens a modal: "Create API Key"
  - Field: Key name (text input, required, max 64 chars)
  - Field: Key type dropdown — "Standard" (default, full access) / future: "Restricted"
  - [Cancel] [Generate Key]
- On generate: shows a one-time reveal screen with the new secret key, a copy button, and a required checkbox: "I have saved this key securely" before [Done] button enables.

#### Production Access Request

**States:**

| State | UI |
|-------|-----|
| Not requested | Info card with lock icon. "Production keys require approval. Request production access when you're ready to go live." Button: [Request Production Access] |
| Requested (pending) | Card changes to amber/pending state. "Production access requested on {date}. Your account manager will reach out to manage this." Button disabled, shows "Pending Review" |
| Approved | Production keys appear in the keys table when user switches environment toggle to Production. The info card is replaced with a success state: "Production access is active." |

**Request flow:**
1. User clicks "Request Production Access"
2. Confirmation modal: "Request Production Access? Your account manager will be notified and will reach out to provision your production credentials. This typically takes 1-2 business days." → [Cancel] [Submit Request]
3. On confirm: sends email to account manager, UI transitions to "Requested" state
4. Backend/admin approves → production keys generated → user sees them next time they switch to Production environment

#### Documentation Link

- A prominent card at the top of the Developers tab
- Card with document icon, title "API Documentation", description "Complete reference for the Dragonpass API including endpoints, authentication, and code examples."
- CTA button: "View Documentation →" — opens external documentation URL in new tab
- The URL is configurable per client (stored as a client setting in the backend)

### 2.6 General Tab (Existing)

No changes to current functionality. Contains account-level settings (company info, notification preferences, branding).

---

## 3. Entitlements (Renamed from Benefit Orchestrator)

### 3.1 Navigation Change

- Rename "Benefit Orchestrator" to "Entitlements" in the sidebar navigation
- Update the icon if needed (keep it consistent with the design system)
- The sidebar item links to `/entitlements`

### 3.2 Page Structure

The Entitlements page has two main sections separated by tabs or a clear visual divider:

```
┌─────────────────────────────────────────────────────────────────┐
│  Entitlements                                          [TEST]   │
│  Manage your product entitlements and service allocations        │
│                                                                  │
│  [ Product Catalog ]  [ Active Entitlements ]  [ Performance ]   │
│                                                                  │
│  ... tab content ...                                            │
└─────────────────────────────────────────────────────────────────┘
```

**Tabs within Entitlements:**
1. **Product Catalog** — browsable catalog of all available products (env-agnostic)
2. **Active Entitlements** — current allocations, usage, caps (env-scoped)
3. **Performance** — metrics and analytics for entitlements (env-scoped, maps to existing "Performance" tab from Benefit Orchestrator)

### 3.3 Product Catalog Tab

A grid of product cards showing all available Dragonpass products. This content is NOT environment-scoped — it is educational and always visible, even in an empty sandbox.

#### Product Card

```
┌────────────────────────────────┐
│  ✈️  Flights                    │
│                                │
│  Flight bookings and upgrades  │
│                                │
│  ● ACTIVE                      │
│                                │
│  [View Details →]              │
└────────────────────────────────┘
```

**Card fields:**
- Icon (product-specific, matching existing category icons from Settings > Categories)
- Product name
- Short description (one line)
- Status badge:
  - `ACTIVE` (green) — client has active entitlements for this product
  - `AVAILABLE` (gray/neutral) — product exists but client has no entitlements
  - `REQUESTED` (amber) — client has requested but not yet provisioned
- "View Details →" link → navigates to product detail page

**Products to display:**
1. Flights — Flight bookings and upgrades
2. Hotels — Hotel reservations and room upgrades
3. Airport Lounge — Premium airport lounge access
4. Airport Transfer — Ground transportation services
5. Airport Dining — Airport restaurant reservations
6. Airport Fast Track — Priority security and immigration
7. eSIMs — International mobile connectivity
8. Tickets — Event and entertainment tickets
9. Health & Wellness — Spa and wellness services

**Grid layout:** 3 columns on desktop (xl), 2 columns on medium screens, 1 column on mobile. Cards use consistent height with content alignment.

### 3.4 Product Detail Pages

Each product gets a dedicated detail page at `/entitlements/products/:productSlug`.

#### Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  ← Back to Product Catalog                                        │
│                                                                    │
│  ✈️  Flights                                          [ACTIVE]     │
│  Flight bookings and upgrades                                      │
│                                                                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │
│                                                                    │
│  Overview                                                          │
│  ─────────                                                         │
│  Paragraph describing the product, its value proposition,          │
│  and how it integrates with the Dragonpass platform.               │
│                                                                    │
│  Key Benefits                                                      │
│  ────────────                                                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐              │
│  │ 🌐 Global    │ │ 💰 Revenue   │ │ ⚡ Real-time │              │
│  │ Coverage     │ │ Generation   │ │ Booking      │              │
│  │ Access to    │ │ Earn on      │ │ Instant      │              │
│  │ 1000+ ...   │ │ every...     │ │ confirmation │              │
│  └──────────────┘ └──────────────┘ └──────────────┘              │
│                                                                    │
│  Integration Guide                                                 │
│  ──────────────────                                                │
│  Brief setup guidance with steps or summary of what's              │
│  needed to integrate this product via API.                         │
│                                                                    │
│  [View API Documentation →]    [Request This Product]              │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

**Sections on each product detail page:**

1. **Header** — product icon, name, status badge, back link to catalog
2. **Overview** — 2-3 paragraph description of the product
3. **Key Benefits** — 3-4 benefit cards in a row (icon, title, short description)
4. **Integration Guide** — brief text on how to integrate via API, what endpoints are involved, what data is needed. This is static content per product, not auto-generated.
5. **Documentation Link** — "View API Documentation →" button opening external docs (filtered/anchored to the relevant product section if possible)
6. **Request CTA** — for products the client doesn't have yet:
   - Button: "Request This Product" → opens Change Request modal (same pattern as Settings > Products and Categories)
   - For already-active products: button changes to "Manage Entitlements →" linking to Active Entitlements tab
   - For requested products: button shows "Requested — Pending Review" (disabled)

**Content management:** Product detail content (overview text, benefits, integration guide text) should be stored as structured data (JSON or CMS) so it can be updated without code changes. For MVP, hardcoded content per product is acceptable, but structure the components to accept props.

### 3.5 Active Entitlements Tab

This tab is **environment-scoped** — it shows entitlements for the active environment (Test or Production).

#### Entitlements Table / Card List

```
┌──────────────────────────────────────────────────────────────────────┐
│  Active Entitlements                                     [TEST]     │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  📱 eSIMs                                                      │  │
│  │  International mobile connectivity                             │  │
│  │                                                                │  │
│  │  Allocation: 1,000  │  Used: 347  │  Remaining: 653           │  │
│  │  ████████████░░░░░░░░░░░░░░░░░░░░  34.7%                     │  │
│  │                                                                │  │
│  │  Cap: 1,000          Status: ● Active       [Manage →]        │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  🏢 Airport Lounge                                             │  │
│  │  Premium airport lounge access                                 │  │
│  │                                                                │  │
│  │  Allocation: 20,000  │  Used: 17,450  │  Remaining: 2,550     │  │
│  │  ██████████████████████████████░░░░░  87.3%        ⚠️ 80%+    │  │
│  │                                                                │  │
│  │  Cap: 20,000         Status: ● Active       [Manage →]        │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Entitlement card fields:**
- Product icon + name + description
- Allocation (total passes provisioned)
- Used count
- Remaining count
- Progress bar showing usage percentage
- Cap value (client-configurable)
- Status badge: `Active` (green) / `Paused` (amber) / `Exhausted` (red)
- Threshold warning indicator:
  - Normal (< 50%): green progress bar
  - 50-79%: progress bar turns amber, no additional indicator
  - 80-89%: progress bar turns amber, warning icon + "80%+ used" label
  - 90-99%: progress bar turns red, warning icon + "90%+ used — approaching cap" label
  - 100%: progress bar full red, "Cap reached" label, Top Up CTA appears
- "Manage →" button → opens slide-out detail panel or navigates to entitlement detail view

#### Entitlement Detail Panel (Slide-Out or Page)

When clicking "Manage →" on an entitlement card, show a detail view with:

1. **Usage summary** — same stats as the card but larger, with a time-series chart showing usage over time
2. **Cap Configuration**
   - Input field: "Usage cap" — numeric input, current value shown
   - Alert thresholds: checkboxes pre-checked at 50%, 80%, 90%, 100%
   - Alert recipients: list of admin email addresses that receive alerts
   - [Save Configuration] button
3. **Recent Activity** — table of recent pass usages (date, reference, user/customer, status)
4. **Stretch: Actions**
   - Pause / Resume toggle — pauses new pass issuance without revoking existing
   - Top Up button → opens modal to request additional allocation (triggers email to account manager, similar to production key request flow)

### 3.6 Cap & Alert System

**Cap configuration per entitlement:**
- Each entitlement type has a configurable cap (numeric value)
- Cap is set by the client in the portal (in the entitlement detail panel)
- Default: no cap (unlimited) — client can optionally set one

**Email alert thresholds:**
- Alerts fire when usage crosses 50%, 80%, 90%, and 100% of the cap
- Each threshold sends an email to all configured admin addresses
- Email content:
  - Subject: `[Dragonpass] {Product} usage at {X}% — {used}/{cap} passes used`
  - Body: summary of usage, link to the entitlement in the portal, action guidance (at 100%: "Your allocation has been fully consumed. Contact your account manager or request a top-up in the portal.")
- Alerts are one-time per threshold crossing (don't re-fire if usage fluctuates)
- Backend implementation: track last alerted threshold per entitlement, only fire when a higher threshold is crossed

**Visual indicators in the portal:**
- Progress bar color changes at thresholds (described above)
- At 80%+: amber warning banner appears on the entitlement card
- At 100%: red "Cap Reached" banner + "Top Up" CTA button

### 3.7 Empty State (Active Entitlements Tab)

When no active entitlements exist (typical for first login in sandbox):

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│           📦                                                  │
│                                                              │
│     No active entitlements yet                               │
│                                                              │
│     Browse the product catalog to explore available          │
│     products and request entitlements for your account.      │
│                                                              │
│     [Browse Product Catalog →]                               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

- Centered illustration/icon
- Short explanatory text
- Primary CTA links to the Product Catalog tab

---

## 4. Sandbox Empty States & Onboarding

### 4.1 Dashboard Empty State (Getting Started)

When a client first logs in and is in Test mode with no data, the Dashboard shows a Getting Started experience instead of empty charts.

```
┌──────────────────────────────────────────────────────────────────────┐
│  Dashboard                                                  [TEST]   │
│  Welcome to Dragonpass                                               │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  🚀 Getting Started with Dragonpass API                        │  │
│  │                                                                │  │
│  │  ████████████░░░░░░░░░░░░░░░  1 of 4 complete                │  │
│  │                                                                │  │
│  │  ✅ 1. Review your test API keys                               │  │
│  │        Your test credentials are ready.                        │  │
│  │        → Go to Settings > Developers                           │  │
│  │                                                                │  │
│  │  ○  2. Make your first test API call                           │  │
│  │        Use your test keys to make a sample request.            │  │
│  │        → View API Documentation                                │  │
│  │                                                                │  │
│  │  ○  3. Browse available products                               │  │
│  │        Explore the product catalog to see what you             │  │
│  │        can offer your customers.                               │  │
│  │        → Go to Entitlements                                    │  │
│  │                                                                │  │
│  │  ○  4. Request production access                               │  │
│  │        When you're ready to go live, request your              │  │
│  │        production credentials.                                 │  │
│  │        → Go to Settings > Developers                           │  │
│  │                                                                │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐ │
│  │  GMV         │ │  Revenue     │ │  ARPU        │ │  Margin    │ │
│  │  --          │ │  --          │ │  --          │ │  --        │ │
│  │  No data yet │ │  No data yet │ │  No data yet │ │  No data   │ │
│  └──────────────┘ └──────────────┘ └──────────────┘ └────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  Revenue Trend                                                 │  │
│  │                                                                │  │
│  │           No data yet. Make some test API calls                │  │
│  │           to see your metrics here.                            │  │
│  │                                                                │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Getting Started Card:**
- Prominent card at the top of the dashboard
- Shows a progress bar (X of 4 complete)
- Steps are tracked locally (localStorage or backend) per user
- Each step has: checkbox (filled when complete), title, description, arrow link to the relevant page
- Step 1 auto-completes when user visits Settings > Developers tab
- Step 2 auto-completes when the first test API call is detected (backend event)
- Step 3 auto-completes when user visits Entitlements > Product Catalog
- Step 4 auto-completes when production access is requested
- Card can be dismissed after all steps complete (or manually via a "×" close button) — once dismissed, the dashboard shows the normal widget layout
- The card also shows in Production mode if the user hasn't completed setup, but it adapts the content (e.g., step 1 becomes "Review your production API keys")

**KPI Cards in empty state:**
- Show the same card layout as populated (GMV, Revenue, ARPU, Margin)
- Values show `--` or `£0.00` with "No data yet" as subtitle
- Sparkline area is blank/flat

**Chart widgets in empty state:**
- Show chart container with title
- Body shows centered text: "No data yet. Make some test API calls to see your metrics here."
- No placeholder chart lines or fake data

### 4.2 Order Management Empty State

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│           🛒                                                  │
│                                                              │
│     No orders yet                                            │
│                                                              │
│     Orders will appear here once you start making            │
│     API calls. Try creating a test order to see how          │
│     it works.                                                │
│                                                              │
│     [View API Documentation →]                               │
│     See example request ↗                                    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

- Centered in the table area (replacing the table rows)
- The filter bar and column headers are still visible above (but with no data)
- Primary CTA: "View API Documentation" button → opens external docs
- Secondary CTA: "See example request" text link → opens docs anchored to the order creation endpoint
- The "Today (0) / Upcoming 7 days (0)" tabs show zero counts

### 4.3 Analytics Empty State

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│           📊                                                  │
│                                                              │
│     Analytics will populate as data flows in                 │
│                                                              │
│     Make some test API calls to start seeing your            │
│     metrics and trends here.                                 │
│                                                              │
│     [View API Documentation →]                               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

- The dashboard sidebar (System dashboards list) is still visible
- Empty state replaces the main content area
- Applies per-dashboard: each dashboard view shows this if it has no data

### 4.4 Settings > Developers First Visit

Not truly an empty state — test keys are pre-generated and visible immediately. But on first visit:

- Test API keys table is populated with the auto-generated publishable and secret keys
- A blue info banner at the top of the section: "These are your test credentials. Use them to integrate and test the Dragonpass API. When you're ready for production, request access below."
- The Documentation card is prominent at the top
- The Production Access section shows the "Not requested" state with the CTA

---

## 5. Sidebar Navigation Update

### 5.1 Updated Nav Items

The sidebar navigation items (in order, top to bottom):

1. **Dashboard** (grid icon) — `/dashboard`
2. **Order Management** (cart icon) — `/orders`
3. **Analytics** (chart icon) — `/analytics`
4. **Entitlements** (key/pass icon) — `/entitlements` ← renamed from Benefit Orchestrator
5. **Persona Builder** (users icon) — `/persona-builder` ← if it exists, keep as is
6. **Settings** (gear icon) — `/settings`

**Removed:**
- "Dev Docs" button from sidebar footer — functionality now lives in Settings > Developers tab
- "Benefit Orchestrator" label — replaced by "Entitlements"

### 5.2 Icon for Entitlements

Use a suitable icon that conveys "access passes / entitlements" — suggestions: `Ticket`, `KeyRound`, `BadgeCheck`, or `ShieldCheck` from Lucide icons. Should be visually distinct from the existing sidebar icons.

---

## 6. Data Models (Frontend State)

### 6.1 Environment Context

```typescript
interface EnvironmentContext {
  environment: 'test' | 'production';
  setEnvironment: (env: 'test' | 'production') => void;
  isTestMode: boolean;
}
```

### 6.2 API Key

```typescript
interface ApiKey {
  id: string;
  name: string;
  type: 'publishable' | 'secret';
  keyPrefix: string;          // e.g., "dp_test_pk_4f2a..."
  maskedKey: string;          // e.g., "dp_test_sk_••••••••••••"
  fullKey?: string;           // only present on creation (one-time reveal)
  environment: 'test' | 'production';
  status: 'active' | 'revoked';
  createdAt: string;          // ISO date
  lastUsedAt: string | null;  // ISO date or null
  canReveal: boolean;         // false after first reveal
}
```

### 6.3 Production Access Request

```typescript
interface ProductionAccessRequest {
  status: 'not_requested' | 'pending' | 'approved' | 'rejected';
  requestedAt?: string;       // ISO date
  approvedAt?: string;        // ISO date
  reviewedBy?: string;        // account manager name
}
```

### 6.4 Entitlement

```typescript
interface Entitlement {
  id: string;
  productSlug: string;        // e.g., 'esims', 'airport-lounge'
  productName: string;
  productIcon: string;        // icon identifier
  description: string;
  environment: 'test' | 'production';
  allocation: number;         // total passes allocated
  used: number;               // passes consumed
  remaining: number;          // allocation - used
  cap: number | null;         // client-set cap, null = unlimited
  status: 'active' | 'paused' | 'exhausted';
  alertThresholds: {
    enabled: boolean;
    thresholds: number[];     // e.g., [50, 80, 90, 100]
    recipients: string[];     // email addresses
  };
  lastAlertedThreshold: number | null;
  createdAt: string;
  updatedAt: string;
}
```

### 6.5 Product (Catalog)

```typescript
interface Product {
  slug: string;               // URL slug
  name: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;    // rich text / markdown
  benefits: {
    icon: string;
    title: string;
    description: string;
  }[];
  integrationGuide: string;   // rich text / markdown
  documentationUrl: string;
  clientStatus: 'active' | 'available' | 'requested';
}
```

### 6.6 Onboarding Checklist

```typescript
interface OnboardingChecklist {
  steps: {
    id: string;
    title: string;
    description: string;
    linkTo: string;           // internal route
    linkLabel: string;
    completed: boolean;
    completedAt?: string;
  }[];
  dismissed: boolean;
}
```

---

## 7. API Endpoints Required (Backend Contract)

These are the endpoints the frontend expects. Actual backend implementation is out of scope for the frontend PRD, but the contract is defined here for coordination.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/keys?env={test\|production}` | List API keys for environment |
| POST | `/api/keys` | Create new API key |
| POST | `/api/keys/:id/rotate` | Rotate an API key |
| POST | `/api/keys/:id/revoke` | Revoke an API key |
| GET | `/api/production-access` | Get production access request status |
| POST | `/api/production-access/request` | Submit production access request |
| GET | `/api/entitlements?env={test\|production}` | List active entitlements |
| GET | `/api/entitlements/:id` | Get entitlement detail |
| PATCH | `/api/entitlements/:id/cap` | Update cap and alert config |
| POST | `/api/entitlements/:id/pause` | Pause entitlement (stretch) |
| POST | `/api/entitlements/:id/resume` | Resume entitlement (stretch) |
| POST | `/api/entitlements/:id/topup` | Request top-up (stretch) |
| GET | `/api/products` | List all products in catalog |
| GET | `/api/products/:slug` | Get product detail |
| POST | `/api/products/:slug/request` | Request a product (sends email to AM) |
| GET | `/api/onboarding/checklist` | Get onboarding checklist state |
| PATCH | `/api/onboarding/checklist/:stepId` | Mark step as complete |
| GET | `/api/orders?env={test\|production}` | List orders (existing, add env param) |
| GET | `/api/analytics/:dashboardId?env={test\|production}` | Get dashboard data (existing, add env param) |

---

## 8. Route Structure

```
/dashboard                          → Dashboard (with getting started card)
/orders                             → Order Management
/analytics                          → Analytics
/analytics/:dashboardId             → Specific dashboard view
/entitlements                       → Entitlements (default: Product Catalog tab)
/entitlements/catalog               → Product Catalog tab
/entitlements/active                → Active Entitlements tab
/entitlements/performance           → Performance tab
/entitlements/products/:slug        → Product detail page
/entitlements/manage/:id            → Entitlement detail / management view
/settings                           → Settings (default: Products tab)
/settings/products                  → Products tab
/settings/categories                → Categories tab
/settings/team                      → Team tab
/settings/developers                → Developers tab
/settings/general                   → General tab
```

---

## 9. Implementation Priority

### Phase 1: Foundation
1. `EnvironmentContext` provider and toggle component in header
2. Test mode banner and page title badges
3. Settings tab restructure (add Developers tab, remove Components)
4. Sidebar rename: Benefit Orchestrator → Entitlements

### Phase 2: Developer Experience
5. Developers tab: API keys table with mock/seed data
6. Developers tab: key creation modal with one-time reveal flow
7. Developers tab: production access request workflow
8. Developers tab: documentation link card
9. Key actions: rotate, revoke with confirmation dialogs

### Phase 3: Entitlements
10. Product Catalog tab with product cards grid
11. Product detail pages (start with 2-3 products, template the rest)
12. Active Entitlements tab with entitlement cards
13. Entitlement detail panel with usage chart and cap configuration
14. Cap threshold visual indicators (progress bar colors, warning labels)

### Phase 4: Onboarding & Empty States
15. Dashboard Getting Started card with checklist
16. Orders empty state
17. Analytics empty state
18. Entitlements (Active) empty state
19. Developers tab first-visit info banner

### Phase 5: Stretch
20. Pause / Resume entitlement actions
21. Top Up request workflow
22. Active Modules view in Settings or Entitlements
23. Webhook configuration UI (placeholder now, full implementation later)

---

## 10. Design Reference

All new components should follow the existing Dragonpass design system:

- **Colors:** Navy (`#0F1B2D`) for sidebar and headings, White (`#FFFFFF`) content areas, Teal (`#0D9488`) for accents and active states, Green (`#059669`) for confirmed/active badges, Amber (`#D97706`) for warnings and test mode, Red (`#DC2626`) for errors and destructive actions
- **Typography:** System font stack or the font used in the existing portal, enterprise-grade sizing
- **Components:** Use shadcn/Radix UI components as the base — Dialog for modals, DropdownMenu for overflow menus, Tabs for tab navigation, Badge for status indicators, Table for data tables, Card for content cards, Input/Button for forms
- **Spacing:** Generous whitespace, consistent padding (16px/24px/32px scale)
- **Borders:** Light gray (`#E5E7EB`) for subtle dividers, 1px weight
- **Shadows:** Minimal, only on modals and floating elements
- **Animations:** Subtle transitions on tab switches, toggle states, and modal open/close. No flashy animations.

---

## 11. Acceptance Criteria Summary

1. **Environment toggle** is visible in the header on every page. Switching it re-scopes all data on the current page. Test mode shows amber banner + page title badges.
2. **Settings > Developers tab** shows API keys table with copy, reveal (one-time), rotate, and revoke actions. Test keys are visible on first login.
3. **Production access request** triggers email to AM, shows pending state, and production keys appear after approval.
4. **Entitlements page** shows a product catalog (always visible) and active entitlements (env-scoped) with progress bars and cap management.
5. **Product detail pages** exist for each product with overview, benefits, integration guide, documentation link, and request CTA.
6. **Cap alerts** fire at 50%, 80%, 90%, 100% thresholds via email. Visual indicators in the portal match thresholds.
7. **Empty states** on Dashboard (Getting Started card), Orders, Analytics, and Entitlements guide users with CTAs to relevant actions and documentation.
8. **Sidebar** shows "Entitlements" instead of "Benefit Orchestrator". Dev Docs button is removed.
9. **All new components** follow the existing design system (shadcn/Radix, Tailwind, navy/teal/white palette).
