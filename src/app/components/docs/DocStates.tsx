import { ArrowRight, Database } from 'lucide-react';

function SectionHeader({ title, subtitle, number }: { title: string; subtitle: string; number: string }) {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="w-10 h-10 rounded-xl bg-[#0a2333] flex items-center justify-center shrink-0">
        <span className="font-['Cabin',sans-serif] font-bold text-[14px] text-white">{number}</span>
      </div>
      <div>
        <h2 className="font-['Cabin',sans-serif] font-bold text-[20px] text-[#0a2333]">{title}</h2>
        <p className="font-['Cabin',sans-serif] text-[14px] text-[#62748e] mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

const stateProperties = [
  { name: 'sidebarView', type: "'navigation' | 'widget-library'", default: "'navigation'", group: 'Navigation' },
  { name: 'activeDashboardId', type: 'string | null', default: 'null', group: 'Navigation' },
  { name: 'dashboards', type: 'Dashboard[]', default: 'system + saved', group: 'Data' },
  { name: 'widgetLibraryOpen', type: 'boolean', default: 'false', group: 'Widget Library' },
  { name: 'widgetCategories', type: 'WidgetCategory[]', default: '5 categories', group: 'Widget Library' },
  { name: 'selectedWidgetIds', type: 'string[]', default: '[]', group: 'Widget Library' },
  { name: 'previewWidgetId', type: 'string | null', default: 'null', group: 'Widget Library' },
  { name: 'widgetSearchQuery', type: 'string', default: "''", group: 'Search' },
  { name: 'dashboardSearchQuery', type: 'string', default: "''", group: 'Search' },
  { name: 'globalSearchQuery', type: 'string', default: "''", group: 'Search' },
  { name: 'dateRange', type: 'DateRange', default: "'Last 30 Days'", group: 'Config' },
  { name: 'isLoading', type: 'boolean', default: 'false', group: 'UI States' },
  { name: 'isSaving', type: 'boolean', default: 'false', group: 'UI States' },
  { name: 'isExporting', type: 'boolean', default: 'false', group: 'UI States' },
  { name: 'hasUnsavedChanges', type: 'boolean', default: 'false', group: 'UI States' },
  { name: 'showDeleteConfirm', type: 'string | null', default: 'null', group: 'Dialogs' },
  { name: 'showUnsavedWarning', type: 'boolean', default: 'false', group: 'Dialogs' },
  { name: 'pendingNavigationId', type: 'string | null', default: 'null', group: 'Dialogs' },
  { name: 'toastMessage', type: 'string | null', default: 'null', group: 'Feedback' },
  { name: 'toastType', type: "'success'|'error'|'info'", default: "'info'", group: 'Feedback' },
];

const transitions = [
  {
    id: 'A',
    from: 'No Dashboard Selected',
    to: 'Dashboard Selected',
    trigger: 'User clicks dashboard in sidebar',
    guard: 'Check hasUnsavedChanges (show warning if true)',
    effect: 'Load dashboard widgets into selectedWidgetIds',
    color: '#1447e6',
  },
  {
    id: 'B',
    from: 'Navigation Sidebar',
    to: 'Widget Library',
    trigger: 'User clicks "Add Widget" button',
    guard: 'Must have activeDashboardId',
    effect: 'sidebarView changes, widgetLibraryOpen = true',
    color: '#8200DB',
  },
  {
    id: 'C',
    from: 'Empty Dashboard',
    to: 'Populated Dashboard',
    trigger: 'User selects widgets OR applies template',
    guard: 'None',
    effect: 'Widgets render in canvas grouped by type',
    color: '#008236',
  },
  {
    id: 'D',
    from: 'Clean State',
    to: 'Dirty State',
    trigger: 'Any modification (name, desc, widgets)',
    guard: 'None',
    effect: 'hasUnsavedChanges = true, dashboard.isDirty = true',
    color: '#d97706',
  },
  {
    id: 'E',
    from: 'Dirty State',
    to: 'Clean State',
    trigger: 'Save action completes',
    guard: 'None',
    effect: 'hasUnsavedChanges = false, all isDirty = false',
    color: '#d4183d',
  },
];

const actions = [
  { action: 'SET_ACTIVE_DASHBOARD', effect: 'Navigate to dashboard', category: 'nav' },
  { action: 'SET_SIDEBAR_VIEW', effect: 'Switch sidebar panel', category: 'nav' },
  { action: 'TOGGLE_WIDGET_LIBRARY', effect: 'Open/close widget library', category: 'nav' },
  { action: 'CLOSE_WIDGET_LIBRARY', effect: 'Close widget library', category: 'nav' },
  { action: 'CREATE_DASHBOARD', effect: 'Create new empty dashboard', category: 'crud' },
  { action: 'DELETE_DASHBOARD', effect: 'Remove dashboard permanently', category: 'crud' },
  { action: 'UPDATE_DASHBOARD_NAME', effect: 'Change dashboard name', category: 'crud' },
  { action: 'UPDATE_DASHBOARD_DESCRIPTION', effect: 'Change dashboard description', category: 'crud' },
  { action: 'TOGGLE_WIDGET_SELECTION', effect: 'Add/remove widget from dashboard', category: 'widget' },
  { action: 'ADD_WIDGETS_TO_DASHBOARD', effect: 'Batch add selected widgets', category: 'widget' },
  { action: 'REMOVE_WIDGET_FROM_DASHBOARD', effect: 'Remove specific widget', category: 'widget' },
  { action: 'SET_PREVIEW_WIDGET', effect: 'Update widget preview card', category: 'widget' },
  { action: 'SET_WIDGET_SEARCH', effect: 'Filter widget library', category: 'search' },
  { action: 'SET_DASHBOARD_SEARCH', effect: 'Filter sidebar dashboards', category: 'search' },
  { action: 'SET_GLOBAL_SEARCH', effect: 'Global search (top bar)', category: 'search' },
  { action: 'SET_DATE_RANGE', effect: 'Change time period', category: 'config' },
  { action: 'TOGGLE_CATEGORY', effect: 'Expand/collapse widget category', category: 'config' },
  { action: 'SAVE_DASHBOARD', effect: 'Start save operation', category: 'async' },
  { action: 'SAVE_COMPLETE', effect: 'Finish save, clear dirty flags', category: 'async' },
  { action: 'EXPORT_DASHBOARD', effect: 'Start export operation', category: 'async' },
  { action: 'EXPORT_COMPLETE', effect: 'Finish export', category: 'async' },
  { action: 'SHOW_DELETE_CONFIRM', effect: 'Show/hide delete confirmation', category: 'dialog' },
  { action: 'SHOW_UNSAVED_WARNING', effect: 'Show/hide unsaved changes dialog', category: 'dialog' },
  { action: 'SET_PENDING_NAVIGATION', effect: 'Store target dashboard for nav', category: 'dialog' },
  { action: 'DISCARD_CHANGES_AND_NAVIGATE', effect: 'Discard changes, navigate to pending', category: 'dialog' },
  { action: 'SET_TOAST', effect: 'Show/dismiss toast notification', category: 'feedback' },
  { action: 'APPLY_TEMPLATE', effect: 'Apply template widget set', category: 'widget' },
  { action: 'CLEAR_WIDGET_SELECTIONS', effect: 'Clear all selections', category: 'widget' },
];

const categoryColors: Record<string, { bg: string; text: string; label: string }> = {
  nav: { bg: '#eff6ff', text: '#1447e6', label: 'Navigation' },
  crud: { bg: '#f0fdf4', text: '#008236', label: 'CRUD' },
  widget: { bg: '#faf5ff', text: '#8200DB', label: 'Widget' },
  search: { bg: '#fef9c3', text: '#92400e', label: 'Search' },
  config: { bg: '#fff1f2', text: '#d4183d', label: 'Config' },
  async: { bg: '#fef3c7', text: '#d97706', label: 'Async' },
  dialog: { bg: '#f1f5f9', text: '#475569', label: 'Dialog' },
  feedback: { bg: '#ecfdf5', text: '#047857', label: 'Feedback' },
};

export function DocStates() {
  return (
    <div className="max-w-[1200px] mx-auto px-8 py-10">
      {/* Page Title */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#faf5ff] flex items-center justify-center">
            <Database size={16} className="text-[#8200DB]" />
          </div>
          <span className="font-['Cabin',sans-serif] font-bold text-[11px] text-[#8200DB] uppercase tracking-widest">
            Section 2 of 6
          </span>
        </div>
        <h1 className="font-['Cabin',sans-serif] font-bold text-[32px] text-[#0a2333] leading-tight">
          State Definitions & Transitions
        </h1>
        <p className="font-['Cabin',sans-serif] text-[16px] text-[#62748e] mt-2 max-w-[700px]">
          Complete state shape, all properties with types and defaults, key state transitions, and the full action reference table.
        </p>
      </div>

      {/* State Table */}
      <SectionHeader number="2.1" title="State Properties" subtitle="All 20 state properties grouped by domain. Defined in types.ts, managed in store.tsx." />
      
      <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden mb-12 shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <th className="text-left px-5 py-3 font-['Cabin',sans-serif] font-bold text-[11px] text-[#62748e] uppercase tracking-wider">Property</th>
              <th className="text-left px-5 py-3 font-['Cabin',sans-serif] font-bold text-[11px] text-[#62748e] uppercase tracking-wider">Type</th>
              <th className="text-left px-5 py-3 font-['Cabin',sans-serif] font-bold text-[11px] text-[#62748e] uppercase tracking-wider">Default</th>
              <th className="text-left px-5 py-3 font-['Cabin',sans-serif] font-bold text-[11px] text-[#62748e] uppercase tracking-wider">Group</th>
            </tr>
          </thead>
          <tbody>
            {stateProperties.map((prop, i) => (
              <tr key={prop.name} className={`border-b border-[#f3f4f6] ${i % 2 === 0 ? '' : 'bg-[#fafbfc]'}`}>
                <td className="px-5 py-2.5">
                  <code className="font-mono text-[12px] text-[#0a2333] bg-[#f1f5f9] rounded px-1.5 py-0.5">{prop.name}</code>
                </td>
                <td className="px-5 py-2.5">
                  <code className="font-mono text-[11px] text-[#8200DB]">{prop.type}</code>
                </td>
                <td className="px-5 py-2.5">
                  <code className="font-mono text-[11px] text-[#62748e]">{prop.default}</code>
                </td>
                <td className="px-5 py-2.5">
                  <span className="font-['Cabin',sans-serif] text-[11px] text-[#62748e]">{prop.group}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key State Transitions */}
      <SectionHeader number="2.2" title="Key State Transitions" subtitle="Critical state changes with triggers, guards, and side effects." />
      
      <div className="space-y-4 mb-12">
        {transitions.map(t => (
          <div key={t.id} className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: t.color + '15' }}>
                <span className="font-['Cabin',sans-serif] font-bold text-[14px]" style={{ color: t.color }}>{t.id}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#f1f5f9] rounded-lg px-3 py-1.5">
                  <span className="font-['Cabin',sans-serif] font-medium text-[13px] text-[#0a2333]">{t.from}</span>
                </div>
                <ArrowRight size={16} style={{ color: t.color }} />
                <div className="rounded-lg px-3 py-1.5 border-2" style={{ borderColor: t.color, backgroundColor: t.color + '08' }}>
                  <span className="font-['Cabin',sans-serif] font-bold text-[13px]" style={{ color: t.color }}>{t.to}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#f8fafc] rounded-lg p-3">
                <p className="font-['Cabin',sans-serif] font-bold text-[10px] text-[#62748e] uppercase tracking-wider mb-1">Trigger</p>
                <p className="font-['Cabin',sans-serif] text-[12px] text-[#0a2333]">{t.trigger}</p>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-3">
                <p className="font-['Cabin',sans-serif] font-bold text-[10px] text-[#62748e] uppercase tracking-wider mb-1">Guard</p>
                <p className="font-['Cabin',sans-serif] text-[12px] text-[#0a2333]">{t.guard}</p>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-3">
                <p className="font-['Cabin',sans-serif] font-bold text-[10px] text-[#62748e] uppercase tracking-wider mb-1">Effect</p>
                <p className="font-['Cabin',sans-serif] text-[12px] text-[#0a2333]">{t.effect}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Reference */}
      <SectionHeader number="2.3" title="Action Reference (Reducer)" subtitle="All 28 actions that can be dispatched. Color-coded by category." />
      
      <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm">
        {/* Category legend */}
        <div className="px-5 py-3 bg-[#f8fafc] border-b border-[#e2e8f0] flex gap-3 flex-wrap">
          {Object.entries(categoryColors).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: val.text }} />
              <span className="font-['Cabin',sans-serif] text-[10px] text-[#62748e]">{val.label}</span>
            </div>
          ))}
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e2e8f0]">
              <th className="text-left px-5 py-2.5 font-['Cabin',sans-serif] font-bold text-[11px] text-[#62748e] uppercase tracking-wider w-16">Cat.</th>
              <th className="text-left px-5 py-2.5 font-['Cabin',sans-serif] font-bold text-[11px] text-[#62748e] uppercase tracking-wider">Action Type</th>
              <th className="text-left px-5 py-2.5 font-['Cabin',sans-serif] font-bold text-[11px] text-[#62748e] uppercase tracking-wider">Effect</th>
            </tr>
          </thead>
          <tbody>
            {actions.map((a, i) => {
              const cat = categoryColors[a.category];
              return (
                <tr key={a.action} className={`border-b border-[#f3f4f6] ${i % 2 === 0 ? '' : 'bg-[#fafbfc]'}`}>
                  <td className="px-5 py-2">
                    <span className="inline-block rounded px-1.5 py-0.5 font-['Cabin',sans-serif] text-[9px] font-bold" style={{ backgroundColor: cat.bg, color: cat.text }}>
                      {cat.label}
                    </span>
                  </td>
                  <td className="px-5 py-2">
                    <code className="font-mono text-[11px] text-[#0a2333]">{a.action}</code>
                  </td>
                  <td className="px-5 py-2">
                    <span className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">{a.effect}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
