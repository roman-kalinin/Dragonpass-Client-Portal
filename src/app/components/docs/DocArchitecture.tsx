import { FileCode, FolderOpen, Box, ArrowRight } from 'lucide-react';

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

export function DocArchitecture() {
  return (
    <div className="max-w-[1200px] mx-auto px-8 py-10">
      {/* Page Title */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#eff6ff] flex items-center justify-center">
            <Box size={16} className="text-[#1447e6]" />
          </div>
          <span className="font-['Cabin',sans-serif] font-bold text-[11px] text-[#1447e6] uppercase tracking-widest">
            Section 1 of 6
          </span>
        </div>
        <h1 className="font-['Cabin',sans-serif] font-bold text-[32px] text-[#0a2333] leading-tight">
          Architecture Overview
        </h1>
        <p className="font-['Cabin',sans-serif] text-[16px] text-[#62748e] mt-2 max-w-[700px]">
          The Dashboard Builder uses a centralized state management pattern via React Context + useReducer. 
          All state mutations flow through dispatched actions, making state transitions predictable and debuggable.
        </p>
      </div>

      {/* Layout Diagram */}
      <SectionHeader number="1.1" title="Layout Structure" subtitle="Fixed layout with scrollable canvas area. All measurements in pixels." />
      
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 mb-12 shadow-sm">
        <div className="border-2 border-[#0a2333] rounded-xl overflow-hidden">
          {/* Top Bar */}
          <div className="bg-[#0a2333] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-['Cabin',sans-serif] font-bold text-[13px]">TopBar</span>
              <span className="font-['Cabin',sans-serif] text-[11px] opacity-60">components/TopBar.tsx</span>
            </div>
            <div className="bg-white/20 rounded px-2 py-0.5">
              <span className="font-['Cabin',sans-serif] text-[11px]">fixed · h-64px · z-20</span>
            </div>
          </div>
          
          <div className="flex" style={{ height: 340 }}>
            {/* Icon Nav */}
            <div className="bg-[#f1f5f9] border-r border-[#e2e8f0] flex flex-col items-center justify-center" style={{ width: 73 }}>
              <div className="transform -rotate-90 whitespace-nowrap">
                <span className="font-['Cabin',sans-serif] font-bold text-[11px] text-[#0a2333]">IconNav</span>
              </div>
              <span className="font-['Cabin',sans-serif] text-[10px] text-[#62748e] mt-2">73px</span>
            </div>
            
            {/* Sidebar */}
            <div className="bg-[#f8fafc] border-r border-[#e2e8f0] flex flex-col items-center justify-center px-2" style={{ width: 180 }}>
              <span className="font-['Cabin',sans-serif] font-bold text-[12px] text-[#0a2333]">Sidebar</span>
              <span className="font-['Cabin',sans-serif] text-[10px] text-[#62748e] mt-1">291px</span>
              <div className="w-full h-px bg-[#e2e8f0] my-3" />
              <span className="font-['Cabin',sans-serif] font-bold text-[12px] text-[#0a2333]">OR</span>
              <div className="w-full h-px bg-[#e2e8f0] my-3" />
              <span className="font-['Cabin',sans-serif] font-bold text-[12px] text-[#0a2333]">Widget Library</span>
              <span className="font-['Cabin',sans-serif] text-[10px] text-[#62748e] mt-1">400px</span>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              <div className="bg-white border-b border-[#e2e8f0] px-4 py-3 flex items-center justify-between">
                <span className="font-['Cabin',sans-serif] font-bold text-[12px] text-[#0a2333]">DashboardToolbar</span>
                <span className="bg-[#f1f5f9] rounded px-2 py-0.5 font-['Cabin',sans-serif] text-[10px] text-[#62748e]">shrink-0</span>
              </div>
              <div className="flex-1 bg-[#f9fafb] flex items-center justify-center">
                <div className="text-center">
                  <span className="font-['Cabin',sans-serif] font-bold text-[14px] text-[#0a2333]">DashboardCanvas</span>
                  <p className="font-['Cabin',sans-serif] text-[11px] text-[#62748e] mt-1">flex-1 · overflow-y-auto · p-6</p>
                  <p className="font-['Cabin',sans-serif] text-[10px] text-[#62748e] mt-3">
                    Renders: EmptyState | KPI Grid | Chart Grid | Table
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Overlays note */}
        <div className="mt-6 flex gap-4">
          {['UnsavedChangesDialog', 'DeleteConfirmDialog', 'Toast'].map(name => (
            <div key={name} className="flex items-center gap-2 bg-[#fef9c3] border border-[#fde68a] rounded-lg px-3 py-2">
              <div className="w-2 h-2 rounded-full bg-[#d97706]" />
              <span className="font-['Cabin',sans-serif] text-[11px] text-[#92400e] font-medium">{name}</span>
              <span className="font-['Cabin',sans-serif] text-[10px] text-[#92400e]">z-50 overlay</span>
            </div>
          ))}
        </div>
      </div>

      {/* File Structure */}
      <SectionHeader number="1.2" title="File Structure" subtitle="All source files organized under /src/app/ with component-per-file pattern." />
      
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 mb-12 shadow-sm">
        <div className="grid grid-cols-2 gap-8">
          {/* Core Files */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FolderOpen size={16} className="text-[#d97706]" />
              <span className="font-['Cabin',sans-serif] font-bold text-[14px] text-[#0a2333]">/src/app/</span>
            </div>
            {[
              { file: 'App.tsx', desc: 'Root component, wraps with AppProvider', color: '#1447e6' },
              { file: 'store.tsx', desc: 'Context + Reducer (state management)', color: '#8200DB' },
              { file: 'types.ts', desc: 'TypeScript type definitions', color: '#008236' },
              { file: 'data.ts', desc: 'Mock data, widget definitions, templates', color: '#d97706' },
            ].map(item => (
              <div key={item.file} className="flex items-start gap-3 py-2.5 border-b border-[#f3f4f6] last:border-0">
                <FileCode size={14} style={{ color: item.color }} className="mt-0.5 shrink-0" />
                <div>
                  <span className="font-['Cabin',sans-serif] font-medium text-[13px] text-[#0a2333]">{item.file}</span>
                  <p className="font-['Cabin',sans-serif] text-[11px] text-[#62748e]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Components */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FolderOpen size={16} className="text-[#1447e6]" />
              <span className="font-['Cabin',sans-serif] font-bold text-[14px] text-[#0a2333]">/src/app/components/</span>
            </div>
            {[
              { file: 'TopBar.tsx', desc: 'Global header with search & stats' },
              { file: 'IconNav.tsx', desc: 'Left icon navigation rail' },
              { file: 'Sidebar.tsx', desc: 'Dashboard list (system + saved views)' },
              { file: 'WidgetLibrary.tsx', desc: 'Widget browser with categories & preview' },
              { file: 'DashboardToolbar.tsx', desc: 'Name, description, date range, actions' },
              { file: 'DashboardCanvas.tsx', desc: 'Widget rendering area (KPI, Chart, Table)' },
              { file: 'UnsavedChangesDialog.tsx', desc: 'Confirmation modals' },
              { file: 'Toast.tsx', desc: 'Notification system' },
            ].map(item => (
              <div key={item.file} className="flex items-start gap-3 py-2 border-b border-[#f3f4f6] last:border-0">
                <FileCode size={14} className="text-[#1447e6] mt-0.5 shrink-0" />
                <div>
                  <span className="font-['Cabin',sans-serif] font-medium text-[13px] text-[#0a2333]">{item.file}</span>
                  <p className="font-['Cabin',sans-serif] text-[11px] text-[#62748e]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Component Hierarchy */}
      <SectionHeader number="1.3" title="Component Hierarchy" subtitle="Visual tree showing parent-child relationships and rendering conditions." />
      
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 mb-12 shadow-sm">
        <div className="space-y-1">
          {/* Root */}
          <TreeNode label="App" tag="AppProvider wrapper" depth={0} />
          <TreeNode label="DashboardBuilder" depth={1} />
          <TreeNode label="TopBar" depth={2} children={['Logo', 'GlobalSearch', 'RequestStats', 'NotificationBell']} />
          <TreeNode label="IconNav" depth={2} children={['TopGroup (3)', 'MiddleGroup (3)', 'BottomGroup (1)']} />
          <TreeNode label="Sidebar" depth={2} condition="sidebarView === 'navigation'" children={['Header', 'DashboardSearch', 'SystemDashboards[]', 'SavedViews[]', 'NewDashboardButton']} />
          <TreeNode label="WidgetLibrary" depth={2} condition="sidebarView === 'widget-library'" children={['Header + Close', 'PreviewCard', 'WidgetSearch', 'CategoryList → WidgetItem[]']} />
          <TreeNode label="DashboardToolbar" depth={2} children={['NameInput', 'DescriptionInput', 'DateRangeSelector', 'Export', 'Save', 'AddWidget']} />
          <TreeNode label="DashboardCanvas" depth={2} children={['EmptyState | KpiGrid + ChartGrid + TableSection']} />
          <TreeNode label="UnsavedChangesDialog" tag="z-50 modal" depth={2} condition="showUnsavedWarning" />
          <TreeNode label="DeleteConfirmDialog" tag="z-50 modal" depth={2} condition="showDeleteConfirm !== null" />
          <TreeNode label="Toast" tag="z-50 fixed" depth={2} condition="toastMessage !== null" />
        </div>
      </div>

      {/* Data Flow */}
      <SectionHeader number="1.4" title="Data Flow Pattern" subtitle="Unidirectional data flow: Components dispatch actions → Reducer updates state → Context re-renders." />
      
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          {[
            { label: 'Component', sublabel: 'User interaction', color: '#1447e6', bg: '#eff6ff' },
            { label: 'dispatch()', sublabel: 'Action object', color: '#8200DB', bg: '#faf5ff' },
            { label: 'Reducer', sublabel: 'Pure function', color: '#d97706', bg: '#fef9c3' },
            { label: 'New State', sublabel: 'Immutable update', color: '#008236', bg: '#f0fdf4' },
            { label: 'Re-render', sublabel: 'Context consumers', color: '#1447e6', bg: '#eff6ff' },
          ].map((step, i) => (
            <div key={step.label} className="flex items-center gap-4">
              <div className="text-center">
                <div
                  className="w-[140px] h-[72px] rounded-xl border-2 flex flex-col items-center justify-center"
                  style={{ borderColor: step.color, backgroundColor: step.bg }}
                >
                  <span className="font-['Cabin',sans-serif] font-bold text-[13px]" style={{ color: step.color }}>
                    {step.label}
                  </span>
                  <span className="font-['Cabin',sans-serif] text-[10px] text-[#62748e]">{step.sublabel}</span>
                </div>
              </div>
              {i < 4 && <ArrowRight size={16} className="text-[#cad5e2] shrink-0" />}
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-[#f8fafc] rounded-xl p-4 border border-[#e2e8f0]">
          <p className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">
            <span className="font-bold text-[#0a2333]">Key principle:</span> No direct state mutation. All changes go through the reducer via dispatch(). 
            Components read state from context and dispatch actions to modify it. This makes every state change traceable and predictable.
          </p>
        </div>
      </div>
    </div>
  );
}

function TreeNode({ label, tag, depth, condition, children: childItems }: { 
  label: string; tag?: string; depth: number; condition?: string; children?: string[] 
}) {
  return (
    <div style={{ paddingLeft: depth * 28 }} className="flex items-start gap-2 py-1.5">
      <div className="flex items-center gap-2">
        {depth > 0 && (
          <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0 text-[#cad5e2]">
            <path d="M4 0 L4 8 L16 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
        <div className="bg-[#0a2333] rounded px-2 py-0.5">
          <span className="font-['Cabin',sans-serif] font-bold text-[11px] text-white">{label}</span>
        </div>
        {tag && (
          <span className="bg-[#f1f5f9] rounded px-1.5 py-0.5 font-['Cabin',sans-serif] text-[10px] text-[#62748e]">{tag}</span>
        )}
        {condition && (
          <span className="bg-[#fef9c3] border border-[#fde68a] rounded px-1.5 py-0.5 font-['Cabin',sans-serif] text-[10px] text-[#92400e]">
            if {condition}
          </span>
        )}
      </div>
      {childItems && (
        <div className="flex items-center gap-1 ml-2">
          {childItems.map(c => (
            <span key={c} className="bg-[#f1f5f9] rounded px-1.5 py-0.5 font-['Cabin',sans-serif] text-[10px] text-[#62748e]">{c}</span>
          ))}
        </div>
      )}
    </div>
  );
}
