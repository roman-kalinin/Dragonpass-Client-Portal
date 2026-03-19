import { Search } from 'lucide-react';
import { useApp } from '../store';

export function Sidebar() {
  const { state, dispatch, filteredDashboards, activeDashboard } = useApp();

  const handleDashboardClick = (id: string) => {
    if (state.hasUnsavedChanges && state.activeDashboardId !== id) {
      dispatch({ type: 'SET_PENDING_NAVIGATION', payload: id });
      dispatch({ type: 'SHOW_UNSAVED_WARNING', payload: true });
      return;
    }
    dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: id });
  };

  const handleNewDashboard = () => {
    dispatch({ type: 'CREATE_DASHBOARD' });
  };

  return (
    <div className="bg-white w-[291px] flex flex-col border-r border-[rgba(0,0,0,0.04)] overflow-y-auto shrink-0">
      <div className="flex flex-col gap-6 p-[17px]">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <p className="font-['Cabin',sans-serif] font-bold text-[24px] text-[#0f172b] leading-8">
              Analytics
            </p>
            <p className="font-['Cabin',sans-serif] text-[16px] text-[#62748e] leading-6">
              View and manage all customer orders across trips
            </p>
          </div>
          {/* Search */}
          <div className="relative h-9 w-full border-b border-[#f3f4f6]">
            <Search size={16} className="absolute left-2.5 top-2.5 text-[#0a2333]" />
            <input
              type="text"
              placeholder="Search dashboard"
              value={state.dashboardSearchQuery}
              onChange={e => dispatch({ type: 'SET_DASHBOARD_SEARCH', payload: e.target.value })}
              className="h-full w-full rounded-md pl-9 pr-3 text-[14px] placeholder:text-[#6a7282] focus:outline-none bg-transparent font-['Cabin',sans-serif]"
            />
          </div>
        </div>

        {/* System Dashboards */}
        <div className="flex flex-col gap-3">
          <p className="font-['Cabin',sans-serif] font-medium text-[12px] text-[#6a7282] uppercase leading-5">
            System
          </p>
          <div className="flex flex-col gap-1">
            {filteredDashboards.system.length === 0 && state.dashboardSearchQuery ? (
              <p className="text-[13px] text-[#6a7282] font-['Cabin',sans-serif] pl-3 py-2 italic">
                No system dashboards match "{state.dashboardSearchQuery}"
              </p>
            ) : (
              filteredDashboards.system.map(d => (
                <button
                  key={d.id}
                  onClick={() => handleDashboardClick(d.id)}
                  className={`h-9 rounded-md w-full text-left pl-3 py-2 transition-colors font-['Cabin',sans-serif] font-medium text-[14px] leading-5 ${
                    state.activeDashboardId === d.id
                      ? 'bg-[#f1f5f9] text-[#0a2333]'
                      : 'text-[#6a7282] hover:bg-[#f9fafb] hover:text-[#0a2333]'
                  }`}
                >
                  {d.name}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="bg-[#e5e5e5] h-px w-full" />

        {/* Saved Views */}
        <div className="flex flex-col gap-3">
          <p className="font-['Cabin',sans-serif] font-medium text-[12px] text-[#6a7282] uppercase leading-5">
            Saved Views
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              {filteredDashboards.saved.length === 0 && !state.dashboardSearchQuery ? (
                <p className="text-[13px] text-[#6a7282] font-['Cabin',sans-serif] pl-3 py-2 italic">
                  No saved dashboards yet. Create one to get started.
                </p>
              ) : filteredDashboards.saved.length === 0 && state.dashboardSearchQuery ? (
                <p className="text-[13px] text-[#6a7282] font-['Cabin',sans-serif] pl-3 py-2 italic">
                  No saved dashboards match "{state.dashboardSearchQuery}"
                </p>
              ) : (
                filteredDashboards.saved.map(d => (
                  <button
                    key={d.id}
                    onClick={() => handleDashboardClick(d.id)}
                    className={`h-9 rounded-md w-full text-left px-3 py-2 transition-colors font-['Cabin',sans-serif] font-medium text-[14px] leading-5 flex items-center justify-between ${
                      state.activeDashboardId === d.id
                        ? 'bg-[#f1f5f9] text-[#0a2333]'
                        : 'text-[#6a7282] hover:bg-[#f9fafb] hover:text-[#0a2333]'
                    }`}
                  >
                    <span>{d.name}</span>
                    {d.isDirty && (
                      <span className="w-2 h-2 rounded-full bg-[#f59e0b]" title="Unsaved changes" />
                    )}
                  </button>
                ))
              )}
            </div>
            {/* New Dashboard Button */}
            <button
              onClick={handleNewDashboard}
              className="h-9 rounded-lg border border-[#d1d5dc] w-full flex items-center justify-center text-[14px] font-['Cabin',sans-serif] font-medium text-[#0a2333] hover:bg-[#f9fafb] transition-colors"
            >
              + New dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
