import { Calendar, ChevronDown, Download, Save, Plus, Loader2, Edit2, Share2, MoreVertical, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useApp } from '../store';
import { DATE_RANGES } from '../data';

export function DashboardToolbar() {
  const { state, dispatch, activeDashboard } = useApp();
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const dateRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) {
        setShowDateDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSave = () => {
    dispatch({ type: 'SAVE_DASHBOARD' });
    setTimeout(() => {
      dispatch({ type: 'SAVE_COMPLETE' });
      dispatch({ type: 'EXIT_EDIT_MODE' });
    }, 800);
  };

  const handleExport = () => {
    dispatch({ type: 'EXPORT_DASHBOARD' });
    setTimeout(() => dispatch({ type: 'EXPORT_COMPLETE' }), 800);
  };

  // ── VIEW MODE TOOLBAR ─────────────────────────────────────
  if (!state.isEditMode) {
    return (
      <div className="flex items-start justify-between px-6 py-4 shrink-0">
        {/* Dashboard Title & Description */}
        <div className="flex flex-col gap-1">
          <h1 className="font-['Cabin',sans-serif] font-bold text-[24px] text-[#0f172b] leading-8">
            {activeDashboard?.name ?? 'Analytics'}
          </h1>
          {activeDashboard?.description && (
            <p className="font-['Cabin',sans-serif] text-[14px] text-[#62748e]">
              {activeDashboard.description}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0 mt-1">
          {/* Edit Dashboard */}
          <button
            onClick={() => {
              if (activeDashboard && !activeDashboard.isSystem) dispatch({ type: 'ENTER_EDIT_MODE' });
            }}
            disabled={!activeDashboard || activeDashboard.isSystem}
            className="cursor-pointer flex items-center gap-2 h-9 rounded-lg border border-[#d1d5dc] px-4 bg-white hover:bg-[#f9fafb] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title={activeDashboard?.isSystem ? 'System dashboards cannot be edited' : 'Edit Dashboard'}
          >
            <Edit2 size={14} className="text-[#0a0a0a]" />
            <span className="font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a0a0a]">Edit Dashboard</span>
          </button>

          {/* Share */}
          <button
            className="cursor-pointer flex items-center gap-2 h-9 rounded-lg border border-[#d1d5dc] px-4 bg-white hover:bg-[#f9fafb] transition-colors"
          >
            <Share2 size={14} className="text-[#0a0a0a]" />
            <span className="font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a0a0a]">Share</span>
          </button>

          {/* Export */}
          <button
            onClick={handleExport}
            disabled={state.isExporting || !activeDashboard}
            className="cursor-pointer flex items-center gap-2 h-9 rounded-lg border border-[#d1d5dc] px-4 bg-white hover:bg-[#f9fafb] disabled:opacity-50 transition-colors"
          >
            {state.isExporting
              ? <Loader2 size={14} className="text-[#0a0a0a] animate-spin" />
              : <Download size={14} className="text-[#0a0a0a]" />}
            <span className="font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a0a0a]">Export</span>
          </button>

          {/* More */}
          <button className="cursor-pointer w-9 h-9 rounded-lg border border-[#d1d5dc] bg-white flex items-center justify-center hover:bg-[#f9fafb] transition-colors">
            <MoreVertical size={16} className="text-[#62748e]" />
          </button>
        </div>
      </div>
    );
  }

  // ── EDIT MODE TOOLBAR ─────────────────────────────────────
  return (
    <div className="flex items-center gap-4 px-6 py-3 shrink-0 border-b border-[#e2e8f0]">
      {/* Dashboard Name + Description */}
      <div className="flex flex-1 gap-3 items-center">
        <input
          type="text"
          value={activeDashboard?.name ?? 'New Dashboard'}
          onChange={e => {
            if (activeDashboard) {
              dispatch({ type: 'UPDATE_DASHBOARD_NAME', payload: { id: activeDashboard.id, name: e.target.value } });
            }
          }}
          className="h-9 w-[203px] rounded-lg border border-[#d1d5dc] px-3 text-[14px] font-['Cabin',sans-serif] font-bold text-[#0a0a0a] focus:outline-none focus:border-[#0a2333] bg-white"
          placeholder="Dashboard name"
          maxLength={50}
        />
        <input
          type="text"
          value={activeDashboard?.description ?? ''}
          onChange={e => {
            if (activeDashboard) {
              dispatch({ type: 'UPDATE_DASHBOARD_DESCRIPTION', payload: { id: activeDashboard.id, description: e.target.value } });
            }
          }}
          className="h-9 flex-1 rounded-lg border border-[#d1d5dc] px-3 text-[14px] font-['Cabin',sans-serif] text-[#0a0a0a] focus:outline-none focus:border-[#0a2333] bg-white"
          placeholder="Dashboard description"
          maxLength={200}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 items-center shrink-0">
        {/* Date Range Selector */}
        <div ref={dateRef} className="relative">
          <button
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className="cursor-pointer flex items-center gap-2 h-9 rounded-lg border border-[#d1d5dc] px-3 bg-white hover:bg-[#f9fafb] transition-colors"
          >
            <Calendar size={14} className="text-[#62748e]" />
            <span className="font-['Cabin',sans-serif] text-[14px] text-[#0a2333]">
              {state.dateRange.label}
            </span>
            <ChevronDown size={14} className="text-[#62748e]" />
          </button>
          {showDateDropdown && (
            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg border border-[#e5e7eb] shadow-lg py-1 z-50 min-w-[180px]">
              {DATE_RANGES.map(dr => (
                <button
                  key={dr.value}
                  onClick={() => {
                    dispatch({ type: 'SET_DATE_RANGE', payload: dr });
                    setShowDateDropdown(false);
                  }}
                  className={`cursor-pointer w-full text-left px-3 py-2 text-[14px] font-['Cabin',sans-serif] hover:bg-[#f9fafb] transition-colors ${
                    state.dateRange.value === dr.value ? 'text-[#0a2333] font-medium bg-[#f1f5f9]' : 'text-[#62748e]'
                  }`}
                >
                  {dr.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={state.isSaving || !activeDashboard}
          className="cursor-pointer flex items-center gap-2 h-9 rounded-lg bg-[#0a2333] px-4 hover:bg-[#152c3c] disabled:opacity-50 transition-colors"
        >
          {state.isSaving ? <Loader2 size={16} className="text-white animate-spin" /> : <Save size={16} className="text-white" />}
          <span className="font-['Cabin',sans-serif] font-medium text-[14px] text-white">Save</span>
        </button>
      </div>
    </div>
  );
}
