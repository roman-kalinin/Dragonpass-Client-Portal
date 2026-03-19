import { AlertTriangle, CheckCircle2, Plus, Clock, Eye, Monitor } from 'lucide-react';
import { PREVIEW_MAP } from './StatePreviews';

function StatusBadge({ status }: { status: 'resolved' | 'recommendation' | 'deferred' }) {
  const styles = {
    resolved: { bg: '#f0fdf4', border: '#bbf7d0', text: '#008236', label: 'Resolved' },
    recommendation: { bg: '#eff6ff', border: '#bedbff', text: '#1447e6', label: 'Recommendation' },
    deferred: { bg: '#fef9c3', border: '#fde68a', text: '#92400e', label: 'Deferred' },
  };
  const s = styles[status];
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 border font-['Cabin',sans-serif] text-[10px] font-bold" style={{ backgroundColor: s.bg, borderColor: s.border, color: s.text }}>
      {status === 'resolved' && <CheckCircle2 size={10} />}
      {s.label}
    </span>
  );
}

interface StateItem {
  id: string;
  title: string;
  status: 'resolved' | 'recommendation' | 'deferred';
  scenario: string;
  resolution: string;
  figma?: string;
}

const edgeCases: StateItem[] = [
  { id: 'EC-01', title: 'Empty Dashboard Name', status: 'resolved', scenario: 'User clears the dashboard name input', resolution: 'Allow empty during editing. On save, if empty, auto-set to "Untitled Dashboard". Name input has maxLength=50. Placeholder shows "Dashboard name" as visual cue.' },
  { id: 'EC-02', title: 'Duplicate Dashboard Names', status: 'resolved', scenario: 'User creates a dashboard with same name as existing', resolution: 'Allowed. Dashboards are identified by unique IDs, not names. Matches patterns of Google Sheets, Notion, etc.' },
  { id: 'EC-03', title: 'Maximum Widget Count', status: 'resolved', scenario: 'User adds many widgets (20+) to a single dashboard', resolution: 'No hard limit. Canvas scrolls vertically. Recommended soft limit: 20 widgets. Consider virtualizing if >50 widgets.' },
  { id: 'EC-04', title: 'Widget Library Search — No Results', status: 'resolved', scenario: 'User searches for a term that matches no widgets', resolution: 'Empty state shows "No widgets found for \'{query}\'" with a "Clear search" button. Categories with no matches hidden.' },
  { id: 'EC-05', title: 'Dashboard Search — No Results', status: 'resolved', scenario: 'User searches dashboards in sidebar with no matches', resolution: 'Separate messages for System and Saved Views sections with contextual wording.' },
  { id: 'EC-06', title: 'Empty Saved Views', status: 'resolved', scenario: 'User has no saved dashboards', resolution: 'Shows "No saved dashboards yet. Create one to get started." with the "+ New dashboard" button below.' },
  { id: 'EC-07', title: 'Delete System Dashboard', status: 'resolved', scenario: 'User attempts to delete a system dashboard', resolution: 'System dashboards (isSystem=true) not deletable. Delete action not exposed in UI for system dashboards.' },
  { id: 'EC-08', title: 'Browser Back/Forward Navigation', status: 'recommendation', scenario: 'User navigates away using browser buttons', resolution: 'Currently not handled. RECOMMENDATION: Add beforeunload event listener when hasUnsavedChanges is true.' },
  { id: 'EC-09', title: 'Rapid Save Clicks', status: 'resolved', scenario: 'User clicks Save multiple times quickly', resolution: 'Save button disabled while isSaving=true. Shows loading spinner. Subsequent clicks ignored.' },
  { id: 'EC-10', title: 'Widget Type Rendering', status: 'resolved', scenario: 'Widgets of different types need different layouts', resolution: 'Three layout strategies: KPI → 4-col grid, CHART → 2-col grid, TABLE → full-width. Auto-sorted by type.' },
  { id: 'EC-11', title: 'Date Range Change', status: 'resolved', scenario: 'User changes date range', resolution: 'Updates display label. In production, should trigger data refetch. Dropdown closes on outside click.' },
  { id: 'EC-12', title: 'No Active Dashboard + Toolbar', status: 'resolved', scenario: 'No dashboard selected, user interacts with toolbar', resolution: 'Export, Save, Add Widget disabled (opacity-50, pointer-events none). Inputs show placeholder values.' },
  { id: 'EC-13', title: 'Widget Removal — Last Widget', status: 'resolved', scenario: 'User removes last widget from dashboard', resolution: 'Dashboard transitions to empty state with templates. hasUnsavedChanges remains true.' },
  { id: 'EC-14', title: 'Concurrent Library + Canvas', status: 'resolved', scenario: 'Widget Library open, user toggles widgets', resolution: 'Canvas updates in real-time. Checkmarks sync with canvas state. Deselecting removes immediately.' },
  { id: 'EC-15', title: 'Toast Auto-Dismiss', status: 'resolved', scenario: 'Toast notification appears', resolution: 'Auto-dismisses after 3 seconds. Manual dismiss via X button. One toast at a time. Types: success, error, info.' },
];

const missingStates: StateItem[] = [
  { id: 'MS-01', title: 'No Dashboard Selected State', status: 'resolved', scenario: 'No dashboard is selected in the sidebar', resolution: '"Select a dashboard" empty state with LayoutDashboard icon', figma: 'Not shown' },
  { id: 'MS-02', title: 'Loading State', status: 'resolved', scenario: 'User initiates save or export action', resolution: 'isLoading property. Save/export show spinner icons on buttons', figma: 'Not shown' },
  { id: 'MS-03', title: 'Save/Export Feedback', status: 'resolved', scenario: 'Save or export operation completes', resolution: 'Toast notification system. Success/error toasts in bottom-right', figma: 'Not shown' },
  { id: 'MS-04', title: 'Unsaved Changes Warning', status: 'resolved', scenario: 'User navigates away with unsaved changes', resolution: 'UnsavedChangesDialog modal. Options: Discard or Save & Continue', figma: 'Not shown' },
  { id: 'MS-05', title: 'Delete Confirmation', status: 'resolved', scenario: 'User deletes a saved dashboard', resolution: 'DeleteConfirmDialog modal. Red warning styling. Shows dashboard name', figma: 'Not shown' },
  { id: 'MS-06', title: 'Dirty Dashboard Indicator', status: 'resolved', scenario: 'Dashboard has been modified but not saved', resolution: 'Amber dot on sidebar items when dashboard.isDirty === true', figma: 'Not shown' },
  { id: 'MS-07', title: 'Widget Library Empty Search', status: 'resolved', scenario: 'Search in widget library returns no matches', resolution: '"No widgets found" message with "Clear search" button', figma: 'Not shown' },
  { id: 'MS-08', title: 'Dashboard Search Empty', status: 'resolved', scenario: 'Sidebar search returns no matching dashboards', resolution: 'Contextual messages for both System and Saved Views sections', figma: 'Not shown' },
  { id: 'MS-09', title: 'No Saved Dashboards', status: 'resolved', scenario: 'User has not created any dashboards yet', resolution: '"No saved dashboards yet. Create one to get started."', figma: 'Not shown' },
  { id: 'MS-10', title: 'Widget Hover States', status: 'resolved', scenario: 'User hovers over interactive elements', resolution: 'Hover effects on sidebar items, widget items, buttons, KPI cards, table rows', figma: 'Partial' },
  { id: 'MS-11', title: 'Widget Card Actions', status: 'recommendation', scenario: 'User wants to perform actions on a widget card', resolution: 'MoreVertical icon on hover. RECOMMENDATION: add dropdown menu', figma: 'Shown as "..."' },
  { id: 'MS-12', title: 'Date Range Dropdown', status: 'resolved', scenario: 'User clicks date range selector', resolution: 'Full dropdown with 6 options. Active highlighted. Outside click close', figma: 'Collapsed only' },
  { id: 'MS-13', title: 'Notification Bell State', status: 'recommendation', scenario: 'Notifications indicator and interaction', resolution: 'Bell icon with hover. RECOMMENDATION: unread badge + dropdown', figma: 'No indicator' },
  { id: 'MS-14', title: 'User Profile Section', status: 'deferred', scenario: 'User profile menu interaction', resolution: 'Deferred. RECOMMENDATION: profile dropdown with settings/sign out', figma: 'Avatar shown' },
  { id: 'MS-15', title: 'Export Format Options', status: 'recommendation', scenario: 'User wants to choose export format', resolution: 'Single-click export. RECOMMENDATION: dropdown for PDF/CSV/PNG/Share', figma: 'Single button' },
];

function StateCard({ item }: { item: StateItem }) {
  const preview = PREVIEW_MAP[item.id];
  const hasPreview = !!preview;

  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
      <div className="flex min-h-[180px]">
        {/* ─── Left: Description ─── */}
        <div className="w-[380px] shrink-0 p-5 flex flex-col border-r border-[#e2e8f0]">
          {/* Header row */}
          <div className="flex items-center gap-2 mb-3">
            <code className="font-mono text-[11px] text-[#0a2333] bg-[#f1f5f9] rounded px-1.5 py-0.5 font-bold">{item.id}</code>
            <StatusBadge status={item.status} />
            {item.figma && (
              <span className={`font-['Cabin',sans-serif] text-[10px] px-1.5 py-0.5 rounded border ${
                item.figma === 'Not shown'
                  ? 'bg-[#fef2f2] border-[#fecaca] text-[#d4183d]'
                  : 'bg-[#fef9c3] border-[#fde68a] text-[#92400e]'
              }`}>
                Figma: {item.figma}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-['Cabin',sans-serif] font-bold text-[15px] text-[#0a2333] mb-3 leading-tight">
            {item.title}
          </h3>

          {/* Scenario */}
          <div className="bg-[#f8fafc] rounded-lg p-3 mb-3">
            <p className="font-['Cabin',sans-serif] font-bold text-[9px] text-[#62748e] uppercase tracking-widest mb-1">Scenario</p>
            <p className="font-['Cabin',sans-serif] text-[12px] text-[#0a2333] leading-relaxed">{item.scenario}</p>
          </div>

          {/* Resolution */}
          <div className="flex-1">
            <p className="font-['Cabin',sans-serif] font-bold text-[9px] text-[#008236] uppercase tracking-widest mb-1">Resolution</p>
            <p className="font-['Cabin',sans-serif] text-[12px] text-[#62748e] leading-relaxed">{item.resolution}</p>
          </div>
        </div>

        {/* ─── Right: Preview ─── */}
        <div className="flex-1 bg-[#f8fafc] flex flex-col min-w-0">
          {hasPreview ? (
            <>
              {/* Preview chrome bar */}
              <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#e2e8f0] bg-[#f1f5f9]">
                <div className="flex gap-1">
                  <span className="w-[7px] h-[7px] rounded-full bg-[#fca5a5]" />
                  <span className="w-[7px] h-[7px] rounded-full bg-[#fde68a]" />
                  <span className="w-[7px] h-[7px] rounded-full bg-[#86efac]" />
                </div>
                <div className="flex-1 flex items-center justify-center gap-1.5">
                  <Eye size={10} className="text-[#62748e]" />
                  <span className="font-['Cabin',sans-serif] text-[10px] text-[#62748e] font-medium">Live Preview</span>
                </div>
              </div>
              {/* Preview content */}
              <div className="flex-1 overflow-auto bg-white">
                <preview.component />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center px-6">
                <div className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center mx-auto mb-2">
                  <Monitor size={18} className="text-[#cad5e2]" />
                </div>
                <p className="font-['Cabin',sans-serif] text-[12px] text-[#94a3b8] font-medium">No visual preview</p>
                <p className="font-['Cabin',sans-serif] text-[10px] text-[#cbd5e1] mt-0.5">Behavioral or logic-only edge case</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DocEdgeCases() {
  return (
    <div className="max-w-[1200px] mx-auto px-8 py-10">
      {/* Page Title */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#fef9c3] flex items-center justify-center">
            <AlertTriangle size={16} className="text-[#d97706]" />
          </div>
          <span className="font-['Cabin',sans-serif] font-bold text-[11px] text-[#d97706] uppercase tracking-widest">
            Section 4 of 6
          </span>
        </div>
        <h1 className="font-['Cabin',sans-serif] font-bold text-[32px] text-[#0a2333] leading-tight">
          Edge Cases & Missing States
        </h1>
        <p className="font-['Cabin',sans-serif] text-[16px] text-[#62748e] mt-2 max-w-[700px]">
          Every edge case identified during implementation and the 15 missing states from the original 
          Figma designs — each shown as a description + live preview pair, ready to copy into Figma.
        </p>
        {/* Summary badges */}
        <div className="flex gap-3 mt-5 flex-wrap">
          <div className="flex items-center gap-2 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg px-3 py-2">
            <CheckCircle2 size={14} className="text-[#008236]" />
            <span className="font-['Cabin',sans-serif] text-[12px] text-[#008236] font-medium">25 Resolved</span>
          </div>
          <div className="flex items-center gap-2 bg-[#eff6ff] border border-[#bedbff] rounded-lg px-3 py-2">
            <Plus size={14} className="text-[#1447e6]" />
            <span className="font-['Cabin',sans-serif] text-[12px] text-[#1447e6] font-medium">4 Recommendations</span>
          </div>
          <div className="flex items-center gap-2 bg-[#fef9c3] border border-[#fde68a] rounded-lg px-3 py-2">
            <Clock size={14} className="text-[#92400e]" />
            <span className="font-['Cabin',sans-serif] text-[12px] text-[#92400e] font-medium">1 Deferred</span>
          </div>
          <div className="flex items-center gap-2 bg-[#eff6ff] border border-[#bedbff] rounded-lg px-3 py-2">
            <Eye size={14} className="text-[#1447e6]" />
            <span className="font-['Cabin',sans-serif] text-[12px] text-[#1447e6] font-medium">21 Live Previews</span>
          </div>
        </div>
      </div>

      {/* ═══ EDGE CASES ═══ */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#0a2333] flex items-center justify-center shrink-0">
          <span className="font-['Cabin',sans-serif] font-bold text-[14px] text-white">4.1</span>
        </div>
        <div>
          <h2 className="font-['Cabin',sans-serif] font-bold text-[20px] text-[#0a2333]">Edge Cases (EC-01 to EC-15)</h2>
          <p className="font-['Cabin',sans-serif] text-[14px] text-[#62748e] mt-1">
            Corner cases discovered during development. Each card shows description on the left and a live element preview on the right.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5 mb-16">
        {edgeCases.map(ec => (
          <StateCard key={ec.id} item={ec} />
        ))}
      </div>

      {/* ═══ MISSING STATES ═══ */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#0a2333] flex items-center justify-center shrink-0">
          <span className="font-['Cabin',sans-serif] font-bold text-[14px] text-white">4.2</span>
        </div>
        <div>
          <h2 className="font-['Cabin',sans-serif] font-bold text-[20px] text-[#0a2333]">Missing States (MS-01 to MS-15)</h2>
          <p className="font-['Cabin',sans-serif] text-[14px] text-[#62748e] mt-1">
            States not present in the original 3 Figma frames that were identified and implemented.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {missingStates.map(ms => (
          <StateCard key={ms.id} item={ms} />
        ))}
      </div>
    </div>
  );
}
