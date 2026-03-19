import { Shield, AlertCircle, Zap, Lightbulb, Keyboard, Palette, MonitorSmartphone } from 'lucide-react';

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

const errors = [
  {
    id: 'ERR-01',
    title: 'Save Failure',
    current: 'Mock save always succeeds after 800ms delay',
    production: [
      'Network failure → Toast "Failed to save. Please try again."',
      'Auth expired → Redirect to login',
      'Conflict → Toast "Dashboard was modified by another user"',
    ],
  },
  {
    id: 'ERR-02',
    title: 'Export Failure',
    current: 'Mock export always succeeds after 800ms delay',
    production: [
      'Timeout → Toast "Export timed out. Please try again."',
      'Format error → Toast "Export failed. Try a different format."',
    ],
  },
  {
    id: 'ERR-03',
    title: 'Data Load Failure',
    current: 'All data is mock/static',
    production: [
      'API unavailable → Error state with retry button',
      'Partial failure → Show available data, error toast for failed',
      'Empty response → Empty state with appropriate messaging',
    ],
  },
  {
    id: 'ERR-04',
    title: 'Invalid Widget ID Reference',
    current: 'Widget lookup uses .filter(Boolean) to skip missing IDs',
    production: [
      'Widgets with invalid IDs silently dropped from render',
      'RECOMMENDATION: Add console.warn for missing widget IDs in dev mode',
    ],
  },
];

const a11yItems = [
  {
    id: 'A11Y-01',
    icon: Keyboard,
    title: 'Keyboard Navigation',
    implemented: [
      'All interactive elements are native HTML buttons/inputs',
      'Tab order follows visual layout (left to right, top to bottom)',
      'Modal dialogs focus management when open',
    ],
    recommendations: [
      'Add arrow key navigation within sidebar list',
      'Escape key to close widget library / dismiss dialog',
      'Ctrl+S: Save, Ctrl+E: Export, Ctrl+N: New dashboard',
    ],
  },
  {
    id: 'A11Y-02',
    icon: MonitorSmartphone,
    title: 'Screen Readers',
    implemented: [
      'Dashboard items use button semantics',
      'Inputs have placeholder text as implicit labels',
    ],
    recommendations: [
      'aria-label="Dashboard name" for name input',
      'aria-label="Dashboard description" for description input',
      'aria-label="Select date range" for date picker',
      'aria-expanded for accordion categories',
      'aria-selected for dashboard items',
      'role="alert" for toast notifications',
    ],
  },
  {
    id: 'A11Y-03',
    icon: Palette,
    title: 'Color Contrast',
    implemented: [
      'Primary text (#0a2333 on white): 15.4:1 ratio — AAA ✓',
      'Secondary text (#62748e on white): 4.8:1 ratio — AA ✓',
      'Trend positive (#008236): 5.2:1 ratio — AA ✓',
      'Trend negative (#d4183d): 4.6:1 ratio — AA ✓',
    ],
    recommendations: [],
  },
  {
    id: 'A11Y-04',
    icon: Zap,
    title: 'Motion Preferences',
    implemented: [],
    recommendations: [
      'Respect prefers-reduced-motion for toast slide-in animation',
      'Respect prefers-reduced-motion for loading spinner animations',
      'Respect prefers-reduced-motion for hover transitions',
    ],
  },
];

const perfItems = [
  {
    id: 'PERF-01',
    title: 'Widget Rendering',
    description: 'All widgets render simultaneously. For dashboards with many widgets (>15), consider:',
    items: [
      'Virtualized list for table rows',
      'Lazy loading for chart components',
      'React.memo for KPI cards',
    ],
    severity: 'medium' as const,
  },
  {
    id: 'PERF-02',
    title: 'State Updates',
    description: 'Each dispatch triggers full context re-render. For high-frequency updates (e.g., search input):',
    items: [
      'Debouncing search inputs (300ms recommended)',
      'Splitting context into smaller providers',
      'Using useMemo for filtered lists',
    ],
    severity: 'low' as const,
  },
  {
    id: 'PERF-03',
    title: 'Widget Library Filtering',
    description: 'Current implementation filters all categories on every render.',
    items: [
      'With current data size (~45 widgets), this is negligible',
      'For larger widget catalogs (>200), consider pre-indexed search',
    ],
    severity: 'low' as const,
  },
];

const futureWork = [
  { title: 'Drag & Drop', desc: 'Allow reordering widgets within the canvas using react-dnd. Define drop zones for grid cells.', priority: 'High' },
  { title: 'Widget Resize', desc: 'Allow users to resize widget cards (1x1, 2x1, 2x2 grid spans) using re-resizable.', priority: 'High' },
  { title: 'Real-Time Data', desc: 'Connect to Supabase or API for live data. Widget values should refresh on dateRange change.', priority: 'High' },
  { title: 'Sharing', desc: 'Add dashboard sharing with view/edit permissions. Generate shareable links.', priority: 'Medium' },
  { title: 'Version History', desc: 'Track dashboard changes over time. Allow reverting to previous versions.', priority: 'Medium' },
  { title: 'Custom Widgets', desc: 'Allow users to create custom KPIs with configurable data sources and thresholds.', priority: 'Medium' },
  { title: 'Responsive Layout', desc: 'Desktop (>1280px): 4 cols, Tablet (768–1280px): 2 cols, Mobile (<768px): 1 col + drawer sidebar.', priority: 'Medium' },
  { title: 'Undo/Redo', desc: 'Implement action history for undo/redo support. Track last N actions for reversal.', priority: 'Low' },
  { title: 'Keyboard Shortcuts', desc: 'Ctrl+S: Save, Ctrl+E: Export, Ctrl+N: New dashboard, Escape: Close, Ctrl+Z: Undo.', priority: 'Low' },
  { title: 'Onboarding', desc: 'First-time user experience with guided tour highlighting sidebar, widget library, templates.', priority: 'Low' },
];

const priorityColors: Record<string, { bg: string; text: string }> = {
  High: { bg: '#fef2f2', text: '#d4183d' },
  Medium: { bg: '#fef9c3', text: '#92400e' },
  Low: { bg: '#f1f5f9', text: '#475569' },
};

export function DocErrorsA11y() {
  return (
    <div className="max-w-[1200px] mx-auto px-8 py-10">
      {/* Page Title */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#f0fdf4] flex items-center justify-center">
            <Shield size={16} className="text-[#008236]" />
          </div>
          <span className="font-['Cabin',sans-serif] font-bold text-[11px] text-[#008236] uppercase tracking-widest">
            Section 6 of 6
          </span>
        </div>
        <h1 className="font-['Cabin',sans-serif] font-bold text-[32px] text-[#0a2333] leading-tight">
          Error Handling, Accessibility & Performance
        </h1>
        <p className="font-['Cabin',sans-serif] text-[16px] text-[#62748e] mt-2 max-w-[700px]">
          Guidelines for error states, accessibility compliance, performance considerations, 
          and the roadmap for future improvements.
        </p>
      </div>

      {/* Error Handling */}
      <SectionHeader number="6.1" title="Error Handling" subtitle="Current mock implementations and production-ready error handling strategies." />
      
      <div className="grid grid-cols-2 gap-4 mb-16">
        {errors.map(err => (
          <div key={err.id} className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#f3f4f6]">
              <div className="w-8 h-8 rounded-lg bg-[#fef2f2] flex items-center justify-center">
                <AlertCircle size={14} className="text-[#d4183d]" />
              </div>
              <div>
                <code className="font-mono text-[10px] text-[#62748e]">{err.id}</code>
                <h3 className="font-['Cabin',sans-serif] font-bold text-[14px] text-[#0a2333]">{err.title}</h3>
              </div>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <p className="font-['Cabin',sans-serif] font-bold text-[10px] text-[#62748e] uppercase tracking-wider mb-1">Current (Mock)</p>
                <p className="font-['Cabin',sans-serif] text-[12px] text-[#0a2333] bg-[#f8fafc] rounded-lg p-2.5">{err.current}</p>
              </div>
              <div>
                <p className="font-['Cabin',sans-serif] font-bold text-[10px] text-[#d4183d] uppercase tracking-wider mb-2">Production Handling</p>
                <div className="space-y-1.5">
                  {err.production.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d4183d] mt-1.5 shrink-0" />
                      <span className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Accessibility */}
      <SectionHeader number="6.2" title="Accessibility (A11y)" subtitle="Current compliance status and recommendations for WCAG 2.1 Level AA." />
      
      <div className="space-y-4 mb-16">
        {a11yItems.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-[#f3f4f6]">
              <div className="w-8 h-8 rounded-lg bg-[#eff6ff] flex items-center justify-center">
                <item.icon size={14} className="text-[#1447e6]" />
              </div>
              <div>
                <code className="font-mono text-[10px] text-[#62748e]">{item.id}</code>
                <h3 className="font-['Cabin',sans-serif] font-bold text-[14px] text-[#0a2333]">{item.title}</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px bg-[#f3f4f6]">
              <div className="bg-white p-5">
                <p className="font-['Cabin',sans-serif] font-bold text-[10px] text-[#008236] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#008236]" />
                  Implemented
                </p>
                {item.implemented.length > 0 ? (
                  <div className="space-y-2">
                    {item.implemented.map((imp, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#008236] mt-0.5 shrink-0">
                          <path d="M2 6L5 9L10 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-['Cabin',sans-serif] text-[12px] text-[#0a2333]">{imp}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-['Cabin',sans-serif] text-[12px] text-[#62748e] italic">Not yet implemented</p>
                )}
              </div>
              <div className="bg-white p-5">
                <p className="font-['Cabin',sans-serif] font-bold text-[10px] text-[#1447e6] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Lightbulb size={10} className="text-[#1447e6]" />
                  Recommendations
                </p>
                {item.recommendations.length > 0 ? (
                  <div className="space-y-2">
                    {item.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1447e6] mt-1.5 shrink-0" />
                        <span className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">{rec}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-['Cabin',sans-serif] text-[12px] text-[#008236] italic">All requirements met ✓</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance */}
      <SectionHeader number="6.3" title="Performance Considerations" subtitle="Current performance profile and optimization recommendations." />
      
      <div className="grid grid-cols-3 gap-4 mb-16">
        {perfItems.map(item => {
          const sevColors = {
            high: { bg: '#fef2f2', border: '#fecaca', text: '#d4183d' },
            medium: { bg: '#fef9c3', border: '#fde68a', text: '#92400e' },
            low: { bg: '#f0fdf4', border: '#bbf7d0', text: '#008236' },
          };
          const sev = sevColors[item.severity];
          return (
            <div key={item.id} className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <code className="font-mono text-[10px] text-[#62748e]">{item.id}</code>
                <span className="rounded-full px-2 py-0.5 font-['Cabin',sans-serif] text-[10px] font-bold border" style={{ backgroundColor: sev.bg, borderColor: sev.border, color: sev.text }}>
                  {item.severity.toUpperCase()} IMPACT
                </span>
              </div>
              <h3 className="font-['Cabin',sans-serif] font-bold text-[14px] text-[#0a2333] mb-2">{item.title}</h3>
              <p className="font-['Cabin',sans-serif] text-[12px] text-[#62748e] mb-3">{item.description}</p>
              <div className="space-y-1.5">
                {item.items.map((it, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#62748e] mt-1.5 shrink-0" />
                    <span className="font-['Cabin',sans-serif] text-[11px] text-[#62748e]">{it}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Future Roadmap */}
      <SectionHeader number="6.4" title="Future Roadmap" subtitle="Planned improvements and feature additions prioritized by impact." />
      
      <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <th className="text-left px-5 py-3 font-['Cabin',sans-serif] font-bold text-[11px] text-[#62748e] uppercase tracking-wider w-10">#</th>
              <th className="text-left px-5 py-3 font-['Cabin',sans-serif] font-bold text-[11px] text-[#62748e] uppercase tracking-wider w-[180px]">Feature</th>
              <th className="text-left px-5 py-3 font-['Cabin',sans-serif] font-bold text-[11px] text-[#62748e] uppercase tracking-wider">Description</th>
              <th className="text-left px-5 py-3 font-['Cabin',sans-serif] font-bold text-[11px] text-[#62748e] uppercase tracking-wider w-24">Priority</th>
            </tr>
          </thead>
          <tbody>
            {futureWork.map((item, i) => {
              const pc = priorityColors[item.priority];
              return (
                <tr key={item.title} className={`border-b border-[#f3f4f6] ${i % 2 === 0 ? '' : 'bg-[#fafbfc]'}`}>
                  <td className="px-5 py-3">
                    <span className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">{i + 1}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="font-['Cabin',sans-serif] font-bold text-[13px] text-[#0a2333]">{item.title}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">{item.desc}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-block rounded-full px-2.5 py-0.5 font-['Cabin',sans-serif] text-[10px] font-bold" style={{ backgroundColor: pc.bg, color: pc.text }}>
                      {item.priority}
                    </span>
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