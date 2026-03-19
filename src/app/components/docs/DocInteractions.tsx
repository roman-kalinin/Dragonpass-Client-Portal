import { MousePointer, Eye, Hand } from 'lucide-react';

const interactions = [
  {
    id: 'INT-01',
    title: 'Sidebar Dashboard Click',
    behavior: 'Selects dashboard, loads its widgets',
    guard: 'If hasUnsavedChanges, show warning dialog',
    visual: 'Active item gets bg-[#f1f5f9], text-[#0a2333]',
    trigger: 'Click on dashboard name in sidebar list',
    sideEffect: 'dispatch(SET_ACTIVE_DASHBOARD) → loads widget IDs from dashboard.widgets',
    color: '#1447e6',
  },
  {
    id: 'INT-02',
    title: 'Widget Toggle (in Library)',
    behavior: 'Toggles widget selection for active dashboard',
    guard: 'None — immediate toggle',
    visual: 'Selected = green bg + checkmark, Unselected = chart icon',
    trigger: 'Click on widget item in Widget Library',
    sideEffect: 'Canvas updates immediately, hasUnsavedChanges = true',
    color: '#008236',
  },
  {
    id: 'INT-03',
    title: 'Widget Hover (in Library)',
    behavior: 'Updates preview card with hovered widget info',
    guard: 'None',
    visual: 'Item background changes to bg-[#f9fafb]',
    trigger: 'Mouse enters widget item',
    sideEffect: 'dispatch(SET_PREVIEW_WIDGET) → preview card re-renders with new data',
    color: '#8200DB',
  },
  {
    id: 'INT-04',
    title: 'Category Accordion Toggle',
    behavior: 'Expands or collapses a widget category list',
    guard: 'None',
    visual: 'ChevronDown ↔ ChevronRight icon transition',
    trigger: 'Click on category header row',
    sideEffect: 'dispatch(TOGGLE_CATEGORY) → isExpanded toggled. Default: "Overview" expanded',
    color: '#d97706',
  },
  {
    id: 'INT-05',
    title: 'Template Selection',
    behavior: 'Populates dashboard with template\'s pre-configured widget set',
    guard: 'Must have activeDashboardId',
    visual: 'Canvas transitions from empty state to populated with widgets',
    trigger: 'Click template card in empty state',
    sideEffect: 'dispatch(APPLY_TEMPLATE) → replaces any existing widget selection',
    color: '#d4183d',
  },
  {
    id: 'INT-06',
    title: 'Widget Removal (from Canvas)',
    behavior: 'Removes a specific widget from the active dashboard',
    guard: 'None — immediate removal, no confirmation',
    visual: 'Widget card disappears, grid re-flows. X button visible on hover (group-hover)',
    trigger: 'Click X button on widget card',
    sideEffect: 'dispatch(REMOVE_WIDGET_FROM_DASHBOARD) → widget unchecked in library if open',
    color: '#1447e6',
  },
  {
    id: 'INT-07',
    title: 'Dashboard Name/Description Edit',
    behavior: 'Updates dashboard metadata in real-time',
    guard: 'Must have activeDashboardId (inputs disabled otherwise)',
    visual: 'Input border changes to border-[#0a2333] on focus',
    trigger: 'Typing in name (maxLength=50) or description (maxLength=200) input',
    sideEffect: 'dispatch(UPDATE_DASHBOARD_NAME/DESCRIPTION) → hasUnsavedChanges = true',
    color: '#008236',
  },
  {
    id: 'INT-08',
    title: 'Date Range Selection',
    behavior: 'Changes date range label for all widgets',
    guard: 'None — dropdown always accessible',
    visual: 'Dropdown opens below button, active option highlighted with bg-[#f1f5f9]',
    trigger: 'Click option in dropdown. Outside click closes dropdown',
    sideEffect: 'dispatch(SET_DATE_RANGE) → in production, would trigger data refresh',
    color: '#8200DB',
  },
];

export function DocInteractions() {
  return (
    <div className="max-w-[1200px] mx-auto px-8 py-10">
      {/* Page Title */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#fff1f2] flex items-center justify-center">
            <MousePointer size={16} className="text-[#d4183d]" />
          </div>
          <span className="font-['Cabin',sans-serif] font-bold text-[11px] text-[#d4183d] uppercase tracking-widest">
            Section 5 of 6
          </span>
        </div>
        <h1 className="font-['Cabin',sans-serif] font-bold text-[32px] text-[#0a2333] leading-tight">
          Interaction Specifications
        </h1>
        <p className="font-['Cabin',sans-serif] text-[16px] text-[#62748e] mt-2 max-w-[700px]">
          Detailed specification for every interactive element in the dashboard builder. 
          Includes trigger, behavior, guard conditions, visual feedback, and side effects.
        </p>
      </div>

      {/* Interaction Cards */}
      <div className="space-y-6">
        {interactions.map(int => (
          <div key={int.id} className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-4 px-6 py-4 border-b border-[#f3f4f6]">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: int.color + '12' }}>
                <span className="font-['Cabin',sans-serif] font-bold text-[12px]" style={{ color: int.color }}>{int.id}</span>
              </div>
              <div>
                <h3 className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333]">{int.title}</h3>
                <p className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">{int.behavior}</p>
              </div>
            </div>
            
            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-px bg-[#f3f4f6]">
              <div className="bg-white p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Hand size={12} className="text-[#62748e]" />
                  <p className="font-['Cabin',sans-serif] font-bold text-[10px] text-[#62748e] uppercase tracking-wider">Trigger</p>
                </div>
                <p className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{int.trigger}</p>
              </div>
              <div className="bg-white p-5">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#62748e]">
                    <path d="M6 1L11 6L6 11L1 6Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <p className="font-['Cabin',sans-serif] font-bold text-[10px] text-[#62748e] uppercase tracking-wider">Guard Condition</p>
                </div>
                <p className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{int.guard}</p>
              </div>
              <div className="bg-white p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Eye size={12} className="text-[#62748e]" />
                  <p className="font-['Cabin',sans-serif] font-bold text-[10px] text-[#62748e] uppercase tracking-wider">Visual Feedback</p>
                </div>
                <p className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{int.visual}</p>
              </div>
              <div className="bg-white p-5">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#62748e]">
                    <path d="M1 6H8M8 6L5 3M8 6L5 9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="font-['Cabin',sans-serif] font-bold text-[10px] text-[#62748e] uppercase tracking-wider">Side Effect</p>
                </div>
                <p className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{int.sideEffect}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Color Token Reference */}
      <div className="mt-16">
        <div className="flex items-start gap-4 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0a2333] flex items-center justify-center shrink-0">
            <span className="font-['Cabin',sans-serif] font-bold text-[14px] text-white">5.2</span>
          </div>
          <div>
            <h2 className="font-['Cabin',sans-serif] font-bold text-[20px] text-[#0a2333]">Color Token Reference</h2>
            <p className="font-['Cabin',sans-serif] text-[14px] text-[#62748e] mt-1">Color values used across all interactive states for consistency.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: 'Primary Text', value: '#0a2333', usage: 'Headings, active states, input text', ratio: '15.4:1 AAA' },
              { name: 'Secondary Text', value: '#62748e', usage: 'Descriptions, labels, subtext', ratio: '4.8:1 AA' },
              { name: 'Muted Text', value: '#6a7282', usage: 'Placeholders, disabled text', ratio: '4.5:1 AA' },
              { name: 'Trend Positive', value: '#008236', usage: 'Positive changes, success states', ratio: '5.2:1 AA' },
              { name: 'Trend Negative', value: '#d4183d', usage: 'Negative changes, error, delete', ratio: '4.6:1 AA' },
              { name: 'Active BG', value: '#f1f5f9', usage: 'Selected sidebar items, active states', ratio: 'Background' },
              { name: 'Hover BG', value: '#f9fafb', usage: 'Hover state backgrounds', ratio: 'Background' },
              { name: 'Widget Selected', value: '#f0fdf4', usage: 'Selected widget items in library', ratio: 'Background' },
              { name: 'Border Default', value: '#e2e8f0', usage: 'Card borders, dividers', ratio: 'Decorative' },
              { name: 'Border Input', value: '#d1d5dc', usage: 'Input borders, button borders', ratio: 'Decorative' },
              { name: 'Primary Button', value: '#0a2333', usage: '"Add Widget" button background', ratio: 'Background' },
              { name: 'Dirty Indicator', value: '#f59e0b', usage: 'Unsaved changes dot on sidebar', ratio: 'Indicator' },
            ].map(color => (
              <div key={color.name} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg border border-[#e2e8f0] shrink-0" style={{ backgroundColor: color.value }} />
                <div>
                  <p className="font-['Cabin',sans-serif] font-bold text-[11px] text-[#0a2333]">{color.name}</p>
                  <code className="font-mono text-[10px] text-[#62748e]">{color.value}</code>
                  <p className="font-['Cabin',sans-serif] text-[10px] text-[#62748e] mt-0.5">{color.usage}</p>
                  <span className="font-['Cabin',sans-serif] text-[9px] text-[#62748e] bg-[#f1f5f9] rounded px-1 py-0.5">{color.ratio}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}