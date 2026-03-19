import { Play, ArrowDown } from 'lucide-react';

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

interface FlowStep {
  label: string;
  detail: string;
  type: 'action' | 'system' | 'decision' | 'end';
}

function FlowDiagram({ steps, branchAt, branchA, branchB }: { 
  steps: FlowStep[];
  branchAt?: number;
  branchA?: { label: string; steps: FlowStep[] };
  branchB?: { label: string; steps: FlowStep[] };
}) {
  const typeStyles = {
    action: { bg: '#eff6ff', border: '#bedbff', text: '#1447e6' },
    system: { bg: '#f0fdf4', border: '#bbf7d0', text: '#008236' },
    decision: { bg: '#fef9c3', border: '#fde68a', text: '#92400e' },
    end: { bg: '#f1f5f9', border: '#e2e8f0', text: '#475569' },
  };

  return (
    <div className="flex flex-col items-center">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center">
          <div
            className={`w-[420px] rounded-xl border-2 px-5 py-3 text-center ${step.type === 'decision' ? 'rotate-0' : ''}`}
            style={{ 
              backgroundColor: typeStyles[step.type].bg,
              borderColor: typeStyles[step.type].border,
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="font-['Cabin',sans-serif] font-bold text-[11px] px-1.5 py-0.5 rounded" style={{ backgroundColor: typeStyles[step.type].text + '15', color: typeStyles[step.type].text }}>
                {i + 1}
              </span>
              <span className="font-['Cabin',sans-serif] font-bold text-[13px]" style={{ color: typeStyles[step.type].text }}>
                {step.label}
              </span>
            </div>
            <p className="font-['Cabin',sans-serif] text-[11px] text-[#62748e] mt-1">{step.detail}</p>
          </div>
          
          {/* Branch point */}
          {branchAt !== undefined && i === branchAt && branchA && branchB && (
            <div className="flex items-start gap-6 my-3">
              <div className="flex flex-col items-center">
                <div className="bg-[#fef9c3] border border-[#fde68a] rounded-lg px-3 py-1 mb-2">
                  <span className="font-['Cabin',sans-serif] font-bold text-[11px] text-[#92400e]">{branchA.label}</span>
                </div>
                {branchA.steps.map((bs, bi) => (
                  <div key={bi} className="flex flex-col items-center">
                    <ArrowDown size={14} className="text-[#cad5e2] my-1" />
                    <div className="w-[200px] rounded-lg border px-3 py-2 text-center" style={{ 
                      backgroundColor: typeStyles[bs.type].bg,
                      borderColor: typeStyles[bs.type].border 
                    }}>
                      <span className="font-['Cabin',sans-serif] font-bold text-[11px]" style={{ color: typeStyles[bs.type].text }}>{bs.label}</span>
                      <p className="font-['Cabin',sans-serif] text-[10px] text-[#62748e] mt-0.5">{bs.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg px-3 py-1 mb-2">
                  <span className="font-['Cabin',sans-serif] font-bold text-[11px] text-[#008236]">{branchB.label}</span>
                </div>
                {branchB.steps.map((bs, bi) => (
                  <div key={bi} className="flex flex-col items-center">
                    <ArrowDown size={14} className="text-[#cad5e2] my-1" />
                    <div className="w-[200px] rounded-lg border px-3 py-2 text-center" style={{ 
                      backgroundColor: typeStyles[bs.type].bg,
                      borderColor: typeStyles[bs.type].border 
                    }}>
                      <span className="font-['Cabin',sans-serif] font-bold text-[11px]" style={{ color: typeStyles[bs.type].text }}>{bs.label}</span>
                      <p className="font-['Cabin',sans-serif] text-[10px] text-[#62748e] mt-0.5">{bs.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {i < steps.length - 1 && !(branchAt !== undefined && i === branchAt) && (
            <ArrowDown size={16} className="text-[#cad5e2] my-2" />
          )}
        </div>
      ))}
    </div>
  );
}

export function DocFlows() {
  return (
    <div className="max-w-[1200px] mx-auto px-8 py-10">
      {/* Page Title */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#f0fdf4] flex items-center justify-center">
            <Play size={16} className="text-[#008236]" />
          </div>
          <span className="font-['Cabin',sans-serif] font-bold text-[11px] text-[#008236] uppercase tracking-widest">
            Section 3 of 6
          </span>
        </div>
        <h1 className="font-['Cabin',sans-serif] font-bold text-[32px] text-[#0a2333] leading-tight">
          User Flows
        </h1>
        <p className="font-['Cabin',sans-serif] text-[16px] text-[#62748e] mt-2 max-w-[700px]">
          Step-by-step user journeys through the application. Each flow shows the happy path 
          with branching points for decision states.
        </p>
        {/* Legend */}
        <div className="flex gap-4 mt-4">
          {[
            { label: 'User Action', color: '#1447e6', bg: '#eff6ff' },
            { label: 'System Response', color: '#008236', bg: '#f0fdf4' },
            { label: 'Decision Point', color: '#92400e', bg: '#fef9c3' },
            { label: 'End State', color: '#475569', bg: '#f1f5f9' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm border" style={{ backgroundColor: l.bg, borderColor: l.color }} />
              <span className="font-['Cabin',sans-serif] text-[11px] text-[#62748e]">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Flow 1: Create from Scratch */}
      <SectionHeader number="3.1" title="Flow 1: Create New Dashboard from Scratch" subtitle="User creates an empty dashboard, adds widgets manually, and saves." />
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 mb-12 shadow-sm">
        <FlowDiagram steps={[
          { label: 'Click "+ New dashboard" in sidebar', detail: 'Saved Views section, below dashboard list', type: 'action' },
          { label: 'New dashboard created with default name', detail: 'dispatch(CREATE_DASHBOARD) → id: new-{timestamp}, name: "New Dashboard"', type: 'system' },
          { label: 'Empty state shown with templates', detail: 'Canvas shows "Build your dashboard" with template cards', type: 'system' },
          { label: 'User edits name in toolbar', detail: 'Name input becomes editable, maxLength=50, sets isDirty=true', type: 'action' },
          { label: 'Click "Add Widget" to open Widget Library', detail: 'dispatch(TOGGLE_WIDGET_LIBRARY) → sidebar switches to widget browser', type: 'action' },
          { label: 'Browse categories, click widgets to select', detail: 'Each click toggles selection, canvas updates in real-time', type: 'action' },
          { label: 'Selected widgets appear in canvas', detail: 'Grouped by type: KPIs in 4-col grid, Charts in 2-col, Tables full-width', type: 'system' },
          { label: 'Click "Save" to persist', detail: 'dispatch(SAVE_DASHBOARD) → 800ms delay → SAVE_COMPLETE → toast notification', type: 'end' },
        ]} />
      </div>

      {/* Flow 2: Create from Template */}
      <SectionHeader number="3.2" title="Flow 2: Create Dashboard from Template" subtitle="User creates a dashboard using a pre-configured template." />
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 mb-12 shadow-sm">
        <FlowDiagram steps={[
          { label: 'Click "+ New dashboard"', detail: 'Creates empty dashboard, shows empty state', type: 'action' },
          { label: 'Empty state shows template options', detail: 'Two templates: "Executive Overview" and "Growth Tracking"', type: 'system' },
          { label: 'Click template card (e.g., "Executive Overview")', detail: 'dispatch(APPLY_TEMPLATE, "tmpl-executive") → 7 pre-configured widgets', type: 'action' },
          { label: 'Pre-configured widgets populate canvas', detail: 'KPI cards, charts, and tables render immediately', type: 'system' },
          { label: 'User customizes (add/remove widgets)', detail: 'Optional: open Widget Library or remove widgets from canvas', type: 'action' },
          { label: 'Save dashboard', detail: 'dispatch(SAVE_DASHBOARD) → toast "Dashboard saved successfully"', type: 'end' },
        ]} />
      </div>

      {/* Flow 3: Edit Existing */}
      <SectionHeader number="3.3" title="Flow 3: Edit Existing Dashboard" subtitle="User modifies a dashboard that already has widgets." />
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 mb-12 shadow-sm">
        <FlowDiagram steps={[
          { label: 'Click dashboard in sidebar', detail: 'dispatch(SET_ACTIVE_DASHBOARD) → loads existing widgets', type: 'action' },
          { label: 'Dashboard loads with existing widgets', detail: 'Canvas shows current widget configuration', type: 'system' },
          { label: 'User modifies name/description/widgets', detail: 'Any change sets hasUnsavedChanges=true, dashboard.isDirty=true', type: 'action' },
          { label: 'Dirty indicator appears on sidebar item', detail: 'Amber dot (w-2 h-2 rounded-full bg-amber-500) next to name', type: 'system' },
          { label: 'Save dashboard', detail: 'Clears all dirty flags, toast confirmation', type: 'end' },
        ]} />
      </div>

      {/* Flow 4: Navigate with Unsaved Changes */}
      <SectionHeader number="3.4" title="Flow 4: Navigate Away with Unsaved Changes" subtitle="User tries to switch dashboards while having unsaved changes." />
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 mb-12 shadow-sm">
        <FlowDiagram 
          steps={[
            { label: 'User has unsaved changes on current dashboard', detail: 'hasUnsavedChanges=true, isDirty=true on active dashboard', type: 'system' },
            { label: 'Click different dashboard in sidebar', detail: 'Guard check: hasUnsavedChanges === true → show dialog', type: 'action' },
            { label: 'Unsaved Changes dialog appears', detail: 'Modal with "Discard" and "Save & Continue" options', type: 'decision' },
          ]}
          branchAt={2}
          branchA={{
            label: 'Discard',
            steps: [
              { label: 'Navigate to new dashboard', detail: 'Old changes lost permanently', type: 'system' },
              { label: 'New dashboard loaded', detail: 'hasUnsavedChanges reset to false', type: 'end' },
            ]
          }}
          branchB={{
            label: 'Save & Continue',
            steps: [
              { label: 'Save current dashboard first', detail: '500ms delay, then navigate', type: 'system' },
              { label: 'Navigate to new dashboard', detail: 'Both dashboards saved correctly', type: 'end' },
            ]
          }}
        />
      </div>

      {/* Flow 5: Widget Library Interaction */}
      <SectionHeader number="3.5" title="Flow 5: Widget Library Interaction" subtitle="Detailed flow for browsing, searching, and selecting widgets." />
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 shadow-sm">
        <FlowDiagram steps={[
          { label: 'Click "Add Widget" button', detail: 'dispatch(TOGGLE_WIDGET_LIBRARY) → sidebar switches to widget library (400px)', type: 'action' },
          { label: 'Widget Library replaces sidebar', detail: 'Shows preview card + search + 5 categories (accordion)', type: 'system' },
          { label: 'Preview card shows last selected/hovered widget', detail: 'Displays name, type badge, description, mock value + sparkline', type: 'system' },
          { label: 'User can search widgets by name/description', detail: 'Filters across all categories, hides empty categories', type: 'action' },
          { label: 'Expand/collapse categories', detail: 'ChevronDown ↔ ChevronRight toggle, default: "Overview" expanded', type: 'action' },
          { label: 'Click widget to toggle selection', detail: 'Checkmark appears/disappears, canvas updates immediately', type: 'action' },
          { label: 'Hover widget shows preview', detail: 'dispatch(SET_PREVIEW_WIDGET) → preview card updates', type: 'action' },
          { label: 'Selected widgets appear in canvas in real-time', detail: 'KPI → 4-col grid, Chart → 2-col grid, Table → full-width', type: 'system' },
          { label: 'Close Widget Library via X button', detail: 'dispatch(CLOSE_WIDGET_LIBRARY) → sidebar returns to navigation', type: 'end' },
        ]} />
      </div>
    </div>
  );
}