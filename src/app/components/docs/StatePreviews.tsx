import { useState, useEffect } from 'react';
import {
  Search, LayoutDashboard, Calendar, ChevronDown,
  Download, Save, Plus, Loader2, AlertTriangle, X, CheckCircle,
  XCircle, Info, BarChart3, Check, Users, BarChart, MoreVertical,
} from 'lucide-react';
import { ALL_WIDGETS, MONTHLY_ACTIVITY_DATA } from '../../data';

// ═══════════════════════════════════════════════════════════
// EC-01: Empty Dashboard Name
// ═══════════════════════════════════════════════════════════
export function PreviewEC01() {
  const [name, setName] = useState('');
  return (
    <div className="p-4">
      <div className="flex items-center gap-3 flex-wrap">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="h-9 w-[180px] rounded-lg border border-[#d1d5dc] px-3 text-[14px] font-['Cabin',sans-serif] font-bold text-[#0a0a0a] focus:outline-none focus:border-[#0a2333]"
          placeholder="Dashboard name"
          maxLength={50}
        />
        <button
          onClick={() => { if (!name.trim()) setName('Untitled Dashboard'); }}
          className="h-9 rounded-lg border border-[#d1d5dc] px-4 bg-white hover:bg-[#f9fafb] transition-colors flex items-center gap-2"
        >
          <Save size={16} className="text-[#62748e]" />
          <span className="font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a2333]">Save</span>
        </button>
      </div>
      {!name.trim() && (
        <p className="font-['Cabin',sans-serif] text-[11px] text-[#d97706] mt-2">Empty — will auto-set to "Untitled Dashboard" on save</p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EC-04: Widget Library Search — No Results
// ═══════════════════════════════════════════════════════════
export function PreviewEC04() {
  const [query, setQuery] = useState('xyznonexistent');
  return (
    <div>
      <div className="px-4 pt-4 pb-3 border-b border-[#f3f4f6]">
        <p className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0f172b]">Widget Library</p>
      </div>
      <div className="p-4">
        <div className="relative h-9 w-full border-b border-[#f3f4f6] mb-4">
          <Search size={16} className="absolute left-2.5 top-2.5 text-[#0a2333]" />
          <input
            type="text"
            placeholder="Search widget"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="h-full w-full rounded-md pl-9 pr-3 text-[14px] placeholder:text-[rgba(10,35,51,0.5)] focus:outline-none bg-transparent font-['Cabin',sans-serif]"
          />
        </div>
        {query && (
          <div className="py-6 text-center">
            <p className="font-['Cabin',sans-serif] text-[14px] text-[#62748e]">
              No widgets found for "{query}"
            </p>
            <button
              onClick={() => setQuery('')}
              className="mt-2 text-[13px] text-[#1447e6] hover:underline font-['Cabin',sans-serif]"
            >
              Clear search
            </button>
          </div>
        )}
        {!query && (
          <div className="text-center py-4">
            <p className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">Type to see empty state</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EC-05: Dashboard Search — No Results
// ═══════════════════════════════════════════════════════════
export function PreviewEC05() {
  const [query, setQuery] = useState('nonexistent');
  return (
    <div className="p-4">
      <p className="font-['Cabin',sans-serif] font-bold text-[18px] text-[#0f172b] mb-3">Analytics</p>
      <div className="relative h-9 w-full border-b border-[#f3f4f6] mb-4">
        <Search size={16} className="absolute left-2.5 top-2.5 text-[#0a2333]" />
        <input
          type="text"
          placeholder="Search dashboard"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="h-full w-full rounded-md pl-9 pr-3 text-[14px] placeholder:text-[#6a7282] focus:outline-none bg-transparent font-['Cabin',sans-serif]"
        />
      </div>
      <p className="font-['Cabin',sans-serif] font-medium text-[12px] text-[#6a7282] uppercase mb-2">System</p>
      <p className="text-[13px] text-[#6a7282] font-['Cabin',sans-serif] pl-3 py-2 italic">
        No system dashboards match "{query}"
      </p>
      <div className="bg-[#e5e5e5] h-px w-full my-3" />
      <p className="font-['Cabin',sans-serif] font-medium text-[12px] text-[#6a7282] uppercase mb-2">Saved Views</p>
      <p className="text-[13px] text-[#6a7282] font-['Cabin',sans-serif] pl-3 py-2 italic">
        No saved dashboards match "{query}"
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EC-06: Empty Saved Views
// ═══════════════════════════════════════════════════════════
export function PreviewEC06() {
  return (
    <div className="p-4">
      <p className="font-['Cabin',sans-serif] font-bold text-[18px] text-[#0f172b] mb-3">Analytics</p>
      <p className="font-['Cabin',sans-serif] font-medium text-[12px] text-[#6a7282] uppercase mb-2">System</p>
      {['Overview', 'Financial', 'User Engagement'].map(name => (
        <button key={name} className="h-8 rounded-md w-full text-left pl-3 py-1.5 text-[#6a7282] hover:bg-[#f9fafb] font-['Cabin',sans-serif] font-medium text-[13px]">
          {name}
        </button>
      ))}
      <div className="bg-[#e5e5e5] h-px w-full my-3" />
      <p className="font-['Cabin',sans-serif] font-medium text-[12px] text-[#6a7282] uppercase mb-2">Saved Views</p>
      <p className="text-[13px] text-[#6a7282] font-['Cabin',sans-serif] pl-3 py-2 italic">
        No saved dashboards yet. Create one to get started.
      </p>
      <button className="h-8 rounded-lg border border-[#d1d5dc] w-full flex items-center justify-center text-[13px] font-['Cabin',sans-serif] font-medium text-[#0a2333] hover:bg-[#f9fafb] transition-colors mt-2">
        + New dashboard
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EC-09: Rapid Save Clicks
// ═══════════════════════════════════════════════════════════
export function PreviewEC09() {
  const [saving, setSaving] = useState(false);
  return (
    <div className="p-4">
      <div className="flex gap-3">
        <button
          onClick={() => { if (!saving) { setSaving(true); setTimeout(() => setSaving(false), 800); } }}
          disabled={saving}
          className="flex items-center gap-2 h-9 rounded-lg border border-[#d1d5dc] px-4 bg-white hover:bg-[#f9fafb] disabled:opacity-50 transition-colors"
        >
          {saving ? <Loader2 size={16} className="text-[#62748e] animate-spin" /> : <Save size={16} className="text-[#62748e]" />}
          <span className="font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a2333]">Save</span>
        </button>
        <button
          disabled={saving}
          className="flex items-center gap-2 h-9 rounded-lg border border-[#d1d5dc] px-4 bg-white hover:bg-[#f9fafb] disabled:opacity-50 transition-colors"
        >
          <Download size={16} className="text-[#62748e]" />
          <span className="font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a2333]">Export</span>
        </button>
      </div>
      {saving && (
        <p className="font-['Cabin',sans-serif] text-[11px] text-[#d97706] mt-2">Saving... button disabled, clicks ignored</p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EC-10: Widget Type Rendering
// ═══════════════════════════════════════════════════════════
export function PreviewEC10() {
  const kpis = ALL_WIDGETS.filter(w => w.type === 'KPI').slice(0, 4);
  const charts = ALL_WIDGETS.filter(w => w.type === 'CHART').slice(0, 2);
  return (
    <div className="p-3 bg-[#f9fafb]">
      <p className="font-['Cabin',sans-serif] text-[10px] text-[#62748e] uppercase tracking-wider font-bold mb-1.5">KPI — 4-column grid</p>
      <div className="grid grid-cols-4 gap-2 mb-3">
        {kpis.map(w => (
          <div key={w.id} className="bg-white rounded-lg border border-[#e2e8f0] p-2">
            <span className="font-['Cabin',sans-serif] text-[9px] text-[#62748e]">{w.name}</span>
            <p className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333] leading-tight">{w.mockValue}</p>
            {w.mockTrend !== undefined && (
              <span className={`font-['Cabin',sans-serif] text-[9px] ${w.mockTrend >= 0 ? 'text-[#008236]' : 'text-[#d4183d]'}`}>
                {w.mockTrend >= 0 ? '↑' : '↓'} {Math.abs(w.mockTrend)}%
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="font-['Cabin',sans-serif] text-[10px] text-[#62748e] uppercase tracking-wider font-bold mb-1.5">CHART — 2-column grid</p>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {charts.map(w => (
          <div key={w.id} className="bg-white rounded-lg border border-[#e2e8f0] p-2">
            <div className="flex items-center gap-1.5 mb-1">
              <BarChart size={12} className="text-[#62748e]" />
              <span className="font-['Cabin',sans-serif] font-medium text-[10px] text-[#0a2333]">{w.name}</span>
            </div>
            <div className="h-10 bg-[#f9fafb] rounded border border-dashed border-[#e2e8f0] flex items-center justify-center">
              <span className="font-['Cabin',sans-serif] text-[9px] text-[#62748e]">Chart</span>
            </div>
          </div>
        ))}
      </div>
      <p className="font-['Cabin',sans-serif] text-[10px] text-[#62748e] uppercase tracking-wider font-bold mb-1.5">TABLE — Full-width</p>
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-2">
        <p className="font-['Cabin',sans-serif] font-bold text-[11px] text-[#0a2333] mb-1">Monthly Activity</p>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e2e8f0]">
              {['Month', 'New', 'Active', 'Value'].map(h => (
                <th key={h} className="py-1 px-1.5 font-['Cabin',sans-serif] font-medium text-[9px] text-[#62748e]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MONTHLY_ACTIVITY_DATA.slice(0, 2).map(row => (
              <tr key={row.month} className="border-b border-[#f3f4f6]">
                <td className="py-1 px-1.5 font-['Cabin',sans-serif] text-[9px] text-[#0a2333]">{row.month}</td>
                <td className="py-1 px-1.5 font-['Cabin',sans-serif] text-[9px] text-[#0a2333]">{row.newUsers.toLocaleString()}</td>
                <td className="py-1 px-1.5 font-['Cabin',sans-serif] text-[9px] text-[#0a2333]">{row.activeUsers.toLocaleString()}</td>
                <td className="py-1 px-1.5 font-['Cabin',sans-serif] text-[9px] text-[#0a2333]">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EC-11: Date Range Dropdown
// ═══════════════════════════════════════════════════════════
export function PreviewEC11() {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState('Last 30 Days');
  const ranges = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Last 12 Months', 'Year to Date', 'Custom Range'];
  return (
    <div className="p-4 min-h-[260px]">
      <div className="relative inline-block">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 h-[34px] rounded-[10px] bg-[#f9fafb] border border-[#e5e7eb] px-3"
        >
          <Calendar size={14} className="text-[#62748e]" />
          <span className="font-['Cabin',sans-serif] text-[14px] text-[#0a2333]">{selected}</span>
          <ChevronDown size={14} className="text-[#62748e]" />
        </button>
        {open && (
          <div className="absolute left-0 top-full mt-1 bg-white rounded-lg border border-[#e5e7eb] shadow-lg py-1 z-50 min-w-[180px]">
            {ranges.map(r => (
              <button
                key={r}
                onClick={() => { setSelected(r); setOpen(false); }}
                className={`w-full text-left px-3 py-2 text-[14px] font-['Cabin',sans-serif] hover:bg-[#f9fafb] transition-colors ${selected === r ? 'text-[#0a2333] font-medium bg-[#f1f5f9]' : 'text-[#62748e]'}`}
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EC-12: No Active Dashboard + Disabled Toolbar
// ═══════════════════════════════════════════════════════════
export function PreviewEC12() {
  return (
    <div className="p-4">
      <div className="flex items-center gap-3 flex-wrap">
        <input type="text" value="" readOnly className="h-9 w-[160px] rounded-lg border border-[#d1d5dc] px-3 text-[13px] font-['Cabin',sans-serif] font-bold text-[#0a0a0a] opacity-50" placeholder="Dashboard name" />
        <div className="flex gap-2 shrink-0">
          <button disabled className="flex items-center gap-1.5 h-9 rounded-lg border border-[#d1d5dc] px-3 bg-white opacity-50 cursor-not-allowed">
            <Download size={14} className="text-[#62748e]" />
            <span className="font-['Cabin',sans-serif] font-medium text-[13px] text-[#0a2333]">Export</span>
          </button>
          <button disabled className="flex items-center gap-1.5 h-9 rounded-lg border border-[#d1d5dc] px-3 bg-white opacity-50 cursor-not-allowed">
            <Save size={14} className="text-[#62748e]" />
            <span className="font-['Cabin',sans-serif] font-medium text-[13px] text-[#0a2333]">Save</span>
          </button>
          <button disabled className="flex items-center gap-1.5 h-9 rounded-lg bg-[#0a2333] px-3 opacity-50 cursor-not-allowed">
            <Plus size={14} className="text-white" />
            <span className="font-['Cabin',sans-serif] font-medium text-[13px] text-white">Add Widget</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EC-13: Widget Removal — Last Widget (Empty State)
// ═══════════════════════════════════════════════════════════
export function PreviewEC13() {
  return (
    <div className="flex items-center justify-center py-10 bg-[#f9fafb]">
      <div className="text-center max-w-[320px]">
        <div className="mx-auto w-12 h-12 rounded-full bg-[#f1f5f9] flex items-center justify-center mb-3">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <path d="M4 4H14V18H4V4Z" fill="#CAD5E2" />
            <path d="M18 4H28V12H18V4Z" fill="#62748E" />
            <path d="M4 22H14V28H4V22Z" fill="#CAD5E2" />
            <path d="M18 16H28V28H18V16Z" fill="#62748E" />
          </svg>
        </div>
        <h2 className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333] mb-1">Build your dashboard</h2>
        <p className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">Start from scratch or choose a template.</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EC-15: Toast Notifications — All Types
// ═══════════════════════════════════════════════════════════
export function PreviewEC15() {
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const icons = {
    success: <CheckCircle size={14} className="text-[#008236]" />,
    error: <XCircle size={14} className="text-[#d4183d]" />,
    info: <Info size={14} className="text-[#1447e6]" />,
  };
  const bgColors = {
    success: 'bg-[#f0fdf4] border-[#bbf7d0]',
    error: 'bg-[#fef2f2] border-[#fecaca]',
    info: 'bg-[#eff6ff] border-[#bedbff]',
  };

  return (
    <div className="p-4 min-h-[140px] relative">
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setToast({ msg: 'Dashboard saved', type: 'success' })} className="h-8 rounded-lg bg-[#f0fdf4] border border-[#bbf7d0] px-3 font-['Cabin',sans-serif] font-medium text-[12px] text-[#008236] hover:bg-[#dcfce7] transition-colors">
          Success
        </button>
        <button onClick={() => setToast({ msg: 'Failed to save', type: 'error' })} className="h-8 rounded-lg bg-[#fef2f2] border border-[#fecaca] px-3 font-['Cabin',sans-serif] font-medium text-[12px] text-[#d4183d] hover:bg-[#fee2e2] transition-colors">
          Error
        </button>
        <button onClick={() => setToast({ msg: 'Exported as PDF', type: 'info' })} className="h-8 rounded-lg bg-[#eff6ff] border border-[#bedbff] px-3 font-['Cabin',sans-serif] font-medium text-[12px] text-[#1447e6] hover:bg-[#dbeafe] transition-colors">
          Info
        </button>
      </div>
      {toast && (
        <div className="mt-3">
          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm ${bgColors[toast.type]}`}>
            {icons[toast.type]}
            <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{toast.msg}</span>
            <button onClick={() => setToast(null)} className="ml-1 w-4 h-4 rounded flex items-center justify-center hover:bg-black/5">
              <X size={10} className="text-[#62748e]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MS-01: No Dashboard Selected
// ═══════════════════════════════════════════════════════════
export function PreviewMS01() {
  return (
    <div className="flex items-center justify-center py-10 bg-[#f9fafb]">
      <div className="text-center max-w-[320px]">
        <div className="mx-auto w-12 h-12 rounded-full bg-[#f1f5f9] flex items-center justify-center mb-3">
          <LayoutDashboard size={24} className="text-[#62748e]" />
        </div>
        <h2 className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333] mb-1">Select a dashboard</h2>
        <p className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">Choose from sidebar or create a new one.</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MS-02: Loading / Saving State
// ═══════════════════════════════════════════════════════════
export function PreviewMS02() {
  return (
    <div className="p-4">
      <div className="flex gap-3">
        <button disabled className="flex items-center gap-2 h-9 rounded-lg border border-[#d1d5dc] px-4 bg-white opacity-50 cursor-not-allowed">
          <Loader2 size={16} className="text-[#62748e] animate-spin" />
          <span className="font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a2333]">Saving...</span>
        </button>
        <button disabled className="flex items-center gap-2 h-9 rounded-lg border border-[#d1d5dc] px-4 bg-white opacity-50 cursor-not-allowed">
          <Loader2 size={16} className="text-[#62748e] animate-spin" />
          <span className="font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a2333]">Exporting...</span>
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MS-03: Save/Export Feedback
// ═══════════════════════════════════════════════════════════
export function PreviewMS03() {
  const [step, setStep] = useState<'idle' | 'saving' | 'done'>('idle');

  const handleSave = () => {
    setStep('saving');
    setTimeout(() => setStep('done'), 800);
    setTimeout(() => setStep('idle'), 3800);
  };

  return (
    <div className="p-4 min-h-[120px]">
      <button
        onClick={handleSave}
        disabled={step !== 'idle'}
        className="flex items-center gap-2 h-9 rounded-lg border border-[#d1d5dc] px-4 bg-white hover:bg-[#f9fafb] disabled:opacity-50 transition-colors"
      >
        {step === 'saving' ? <Loader2 size={16} className="text-[#62748e] animate-spin" /> : <Save size={16} className="text-[#62748e]" />}
        <span className="font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a2333]">{step === 'saving' ? 'Saving...' : 'Save'}</span>
      </button>
      {step === 'done' && (
        <div className="mt-3">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm bg-[#f0fdf4] border-[#bbf7d0]">
            <CheckCircle size={14} className="text-[#008236]" />
            <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">Dashboard saved successfully</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MS-04: Unsaved Changes Warning Dialog
// ═══════════════════════════════════════════════════════════
export function PreviewMS04() {
  return (
    <div className="p-5 bg-[#f1f5f9] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-[380px] p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-[#fef3c7] flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-[#d97706]" />
          </div>
          <div className="flex-1">
            <h3 className="font-['Cabin',sans-serif] font-bold text-[15px] text-[#0a2333] mb-1">Unsaved Changes</h3>
            <p className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">You have unsaved changes. Save before leaving?</p>
          </div>
          <button className="w-5 h-5 rounded flex items-center justify-center hover:bg-gray-100">
            <X size={14} className="text-[#62748e]" />
          </button>
        </div>
        <div className="flex justify-end gap-2">
          <button className="h-8 rounded-lg border border-[#d1d5dc] px-3 font-['Cabin',sans-serif] font-medium text-[13px] text-[#0a2333] hover:bg-[#f9fafb]">Discard</button>
          <button className="h-8 rounded-lg bg-[#0a2333] px-3 font-['Cabin',sans-serif] font-medium text-[13px] text-white hover:bg-[#152c3c]">Save & Continue</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MS-05: Delete Confirmation Dialog
// ═══════════════════════════════════════════════════════════
export function PreviewMS05() {
  return (
    <div className="p-5 bg-[#f1f5f9] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-[380px] p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-[#fee2e2] flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-[#d4183d]" />
          </div>
          <div className="flex-1">
            <h3 className="font-['Cabin',sans-serif] font-bold text-[15px] text-[#0a2333] mb-1">Delete Dashboard</h3>
            <p className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">Delete "Program Performance"? This cannot be undone.</p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button className="h-8 rounded-lg border border-[#d1d5dc] px-3 font-['Cabin',sans-serif] font-medium text-[13px] text-[#0a2333] hover:bg-[#f9fafb]">Cancel</button>
          <button className="h-8 rounded-lg bg-[#d4183d] px-3 font-['Cabin',sans-serif] font-medium text-[13px] text-white hover:bg-[#b91c1c]">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MS-06: Dirty Dashboard Indicator
// ═══════════════════════════════════════════════════════════
export function PreviewMS06() {
  return (
    <div className="p-4">
      <p className="font-['Cabin',sans-serif] font-medium text-[12px] text-[#6a7282] uppercase mb-2">Saved Views</p>
      {[
        { name: 'Program Performance', dirty: true, active: true },
        { name: 'Supply', dirty: false, active: false },
        { name: 'My Custom View', dirty: true, active: false },
      ].map(d => (
        <button
          key={d.name}
          className={`h-8 rounded-md w-full text-left px-3 py-1.5 font-['Cabin',sans-serif] font-medium text-[13px] flex items-center justify-between ${
            d.active ? 'bg-[#f1f5f9] text-[#0a2333]' : 'text-[#6a7282] hover:bg-[#f9fafb]'
          }`}
        >
          <span>{d.name}</span>
          {d.dirty && <span className="w-2 h-2 rounded-full bg-[#f59e0b]" title="Unsaved changes" />}
        </button>
      ))}
      <p className="font-['Cabin',sans-serif] text-[10px] text-[#62748e] mt-2 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#f59e0b] shrink-0" />
        Amber dot = unsaved changes
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MS-07 / MS-08 / MS-09 (reuse)
// ═══════════════════════════════════════════════════════════
export function PreviewMS07() { return <PreviewEC04 />; }
export function PreviewMS08() { return <PreviewEC05 />; }
export function PreviewMS09() { return <PreviewEC06 />; }

// ═══════════════════════════════════════════════════════════
// MS-10: Widget Hover States
// ═══════════════════════════════════════════════════════════
export function PreviewMS10() {
  const widget = ALL_WIDGETS.find(w => w.id === 'w-eligible-members')!;
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-3">
        {/* Sidebar hover */}
        <div>
          <p className="font-['Cabin',sans-serif] text-[9px] text-[#62748e] uppercase tracking-wider font-bold mb-1">Sidebar</p>
          <button className="h-7 rounded-md w-full text-left pl-2.5 text-[#6a7282] hover:bg-[#f9fafb] hover:text-[#0a2333] font-['Cabin',sans-serif] font-medium text-[12px] transition-colors">
            Financial
          </button>
          <button className="h-7 rounded-md w-full text-left pl-2.5 bg-[#f1f5f9] text-[#0a2333] font-['Cabin',sans-serif] font-medium text-[12px]">
            User Engagement
          </button>
        </div>
        {/* Widget Library */}
        <div>
          <p className="font-['Cabin',sans-serif] text-[9px] text-[#62748e] uppercase tracking-wider font-bold mb-1">Widget Item</p>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#f9fafb] transition-colors cursor-pointer">
            <BarChart3 size={12} className="text-[#90a1b9]" />
            <span className="font-['Cabin',sans-serif] font-medium text-[11px] text-[#0a2333]">Total Orders</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[#f0fdf4]">
            <div className="w-3 h-3 rounded bg-[#0a2333] flex items-center justify-center">
              <Check size={8} className="text-white" />
            </div>
            <span className="font-['Cabin',sans-serif] font-medium text-[11px] text-[#0a2333]">Active Members</span>
          </div>
        </div>
      </div>
      {/* KPI Card */}
      <p className="font-['Cabin',sans-serif] text-[9px] text-[#62748e] uppercase tracking-wider font-bold mb-1 mt-3">KPI Card (hover)</p>
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-3 relative group max-w-[220px]">
        <button className="absolute top-1.5 right-1.5 w-5 h-5 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all">
          <X size={12} className="text-[#62748e]" />
        </button>
        <div className="flex items-center gap-1.5">
          <Users size={12} className="text-[#62748e]" />
          <span className="font-['Cabin',sans-serif] text-[11px] text-[#62748e]">{widget.name}</span>
          <button className="ml-auto w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical size={12} className="text-[#62748e]" />
          </button>
        </div>
        <span className="font-['Cabin',sans-serif] font-bold text-[22px] text-[#0a2333] leading-tight">{widget.mockValue}</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MS-12: Date Range Dropdown Open
// ═══════════════════════════════════════════════════════════
export function PreviewMS12() { return <PreviewEC11 />; }

// ═══════════════════════════════════════════════════════════
// Map of all preview-able states
// ═══════════════════════════════════════════════════════════
export const PREVIEW_MAP: Record<string, { component: React.FC; label: string } | undefined> = {
  'EC-01': { component: PreviewEC01, label: 'Empty Dashboard Name' },
  'EC-04': { component: PreviewEC04, label: 'Widget Library Search — No Results' },
  'EC-05': { component: PreviewEC05, label: 'Dashboard Search — No Results' },
  'EC-06': { component: PreviewEC06, label: 'Empty Saved Views' },
  'EC-09': { component: PreviewEC09, label: 'Rapid Save Clicks' },
  'EC-10': { component: PreviewEC10, label: 'Widget Type Rendering' },
  'EC-11': { component: PreviewEC11, label: 'Date Range Dropdown' },
  'EC-12': { component: PreviewEC12, label: 'No Active Dashboard + Toolbar' },
  'EC-13': { component: PreviewEC13, label: 'Widget Removal — Last Widget' },
  'EC-15': { component: PreviewEC15, label: 'Toast Notifications' },
  'MS-01': { component: PreviewMS01, label: 'No Dashboard Selected' },
  'MS-02': { component: PreviewMS02, label: 'Loading State' },
  'MS-03': { component: PreviewMS03, label: 'Save/Export Feedback' },
  'MS-04': { component: PreviewMS04, label: 'Unsaved Changes Warning' },
  'MS-05': { component: PreviewMS05, label: 'Delete Confirmation' },
  'MS-06': { component: PreviewMS06, label: 'Dirty Dashboard Indicator' },
  'MS-07': { component: PreviewMS07, label: 'Widget Library Empty Search' },
  'MS-08': { component: PreviewMS08, label: 'Dashboard Search Empty' },
  'MS-09': { component: PreviewMS09, label: 'No Saved Dashboards' },
  'MS-10': { component: PreviewMS10, label: 'Widget Hover States' },
  'MS-12': { component: PreviewMS12, label: 'Date Range Dropdown' },
};
