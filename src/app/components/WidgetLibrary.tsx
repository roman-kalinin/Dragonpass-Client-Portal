import { Search, ChevronDown, ChevronRight, X, BarChart3, Check, Clock, PieChart, LineChart, Table, Hash } from 'lucide-react';
import { useApp } from '../store';
import { ALL_WIDGETS } from '../data';

function WidgetTypeBadge({ type }: { type: 'KPI' | 'CHART' | 'TABLE' }) {
  const styles = {
    KPI: 'bg-[#eff6ff] border-[#bedbff] text-[#1447e6]',
    CHART: 'bg-[#f0fdf4] border-[#bbf7d0] text-[#008236]',
    TABLE: 'bg-[#fef9c3] border-[#fde68a] text-[#92400e]',
  };
  return (
    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${styles[type]}`}>
      {type}
    </span>
  );
}

function WidgetTypeIcon({ type, name }: { type: 'KPI' | 'CHART' | 'TABLE'; name: string }) {
  const cls = "text-[#90a1b9]";
  if (type === 'KPI') return <Hash size={16} className={cls} />;
  if (type === 'TABLE') return <Table size={16} className={cls} />;
  const lower = name.toLowerCase();
  if (lower.includes('channel') || lower.includes('distribution') || lower.includes('tier') || lower.includes('funnel') || lower.includes('value'))
    return <PieChart size={16} className={cls} />;
  if (lower.includes('trend') || lower.includes('reach') || lower.includes('adoption') || lower.includes('economy'))
    return <LineChart size={16} className={cls} />;
  return <BarChart3 size={16} className={cls} />;
}

export function WidgetLibrary() {
  const { state, dispatch } = useApp();

  const filteredCategories = state.widgetCategories.map(cat => ({
    ...cat,
    widgets: cat.widgets.filter(
      w =>
        w.name.toLowerCase().includes(state.widgetSearchQuery.toLowerCase()) ||
        w.description.toLowerCase().includes(state.widgetSearchQuery.toLowerCase())
    ),
  }));

  const hasResults = filteredCategories.some(c => c.widgets.length > 0);

  // Get preview widget
  const previewWidget = state.previewWidgetId
    ? ALL_WIDGETS.find(w => w.id === state.previewWidgetId)
    : state.selectedWidgetIds.length > 0
    ? ALL_WIDGETS.find(w => w.id === state.selectedWidgetIds[state.selectedWidgetIds.length - 1])
    : ALL_WIDGETS.find(w => w.id === 'w-active-members');

  return (
    <div className="bg-white w-[400px] flex flex-col border-r border-[rgba(0,0,0,0.04)] overflow-hidden shrink-0">
      {/* Sticky header + preview + search */}
      <div className="shrink-0 flex flex-col gap-2 p-4 pb-0">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-['Cabin',sans-serif] font-bold text-[24px] text-[#0f172b] leading-8">
              Widget Library
            </p>
            <p className="font-['Cabin',sans-serif] text-[16px] text-[#62748e] leading-6">
              Select a widget to preview before adding
            </p>
          </div>
          {state.isEditMode && (
            <button
              onClick={() => {
                dispatch({ type: 'CLOSE_WIDGET_LIBRARY' });
                dispatch({ type: 'EXIT_EDIT_MODE' });
              }}
              className="cursor-pointer w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-[#62748e]" />
            </button>
          )}
        </div>

        {/* Preview Card — fixed height */}
        <div className="h-[184px] rounded-[14px] border border-[#e2e8f0] bg-[#f8fafc] p-4 flex flex-col gap-2">
          {previewWidget ? (
            <>
              <p className="text-[10px] text-[#62748e] font-['Cabin',sans-serif] font-medium uppercase tracking-wider">
                Preview:
              </p>
              <div className="flex gap-2 items-center">
                <BarChart3 size={16} className="text-[#9f9f9f]" />
                <span className="font-['Cabin',sans-serif] font-medium text-[13px] text-[#0a2333]">
                  {previewWidget.name}
                </span>
                <WidgetTypeBadge type={previewWidget.type} />
              </div>
              <p className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">
                {previewWidget.description}
              </p>
              {previewWidget.mockValue && (
                <div className="rounded-lg pt-3 pl-3 flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Cabin',sans-serif] font-bold text-[24px] text-[#0a2333]">
                      {previewWidget.mockValue}
                    </span>
                    {previewWidget.mockTrend !== undefined && (
                      <span
                        className={`font-['Cabin',sans-serif] font-medium text-[12px] ${
                          previewWidget.mockTrend >= 0 ? 'text-[#008236]' : 'text-[#d4183d]'
                        }`}
                      >
                        {previewWidget.mockTrend >= 0 ? '+' : ''}
                        {previewWidget.mockTrend}%
                      </span>
                    )}
                  </div>
                  {/* Mini sparkline */}
                  <svg className="w-full h-8" viewBox="0 0 180 32" fill="none">
                    <path
                      d="M0 28 C20 25, 40 20, 60 22 S100 12, 120 15 S150 8, 180 4"
                      stroke="#152C3C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-2 border border-dashed border-[#cad5e2] rounded-[14px] bg-[#fefeff]">
              <Clock size={16} className="text-[#62748e]" />
              <p className="font-['Cabin',sans-serif] font-medium text-[13px] text-[#62748e]">
                Hover or select a widget to preview
              </p>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative h-9 w-full border-b border-[#f3f4f6]">
          <Search size={16} className="absolute left-2.5 top-2.5 text-[#0a2333]" />
          <input
            type="text"
            placeholder="Search widget"
            value={state.widgetSearchQuery}
            onChange={e => dispatch({ type: 'SET_WIDGET_SEARCH', payload: e.target.value })}
            className="h-full w-full rounded-md pl-9 pr-3 text-[14px] placeholder:text-[rgba(10,35,51,0.5)] focus:outline-none bg-transparent font-['Cabin',sans-serif]"
          />
        </div>
      </div>

      {/* Scrollable category list */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {!hasResults && state.widgetSearchQuery && (
          <div className="py-8 text-center">
            <p className="font-['Cabin',sans-serif] text-[14px] text-[#62748e]">
              No widgets found for "{state.widgetSearchQuery}"
            </p>
            <button
              onClick={() => dispatch({ type: 'SET_WIDGET_SEARCH', payload: '' })}
              className="cursor-pointer mt-2 text-[13px] text-[#1447e6] hover:underline font-['Cabin',sans-serif]"
            >
              Clear search
            </button>
          </div>
        )}

        {filteredCategories.map(cat => {
          if (state.widgetSearchQuery && cat.widgets.length === 0) return null;
          const totalInCategory = state.widgetCategories.find(c => c.id === cat.id)?.widgets.length ?? 0;

          return (
            <div key={cat.id}>
              {/* Category Header */}
              <button
                onClick={() => dispatch({ type: 'TOGGLE_CATEGORY', payload: cat.id })}
                className="cursor-pointer flex items-center justify-between w-full h-10 rounded-lg hover:bg-[#f9fafb] transition-colors px-1"
              >
                <div className="flex items-center gap-2">
                  {cat.isExpanded ? (
                    <ChevronDown size={16} className="text-[#62748e]" />
                  ) : (
                    <ChevronRight size={16} className="text-[#62748e]" />
                  )}
                  <span className="font-['Cabin',sans-serif] font-semibold text-[13px] text-[#0a2333]">
                    {cat.name}
                  </span>
                </div>
                <span className="bg-[#f1f5f9] rounded-full w-6 h-5 flex items-center justify-center font-['Cabin',sans-serif] font-semibold text-[11px] text-[#62748e]">
                  {totalInCategory}
                </span>
              </button>

              {/* Widget Items */}
              {cat.isExpanded && (
                <div className="flex flex-col border-l border-[#e2e8f0] ml-2 pl-2">
                  {cat.widgets.map(widget => {
                    const isSelected = state.selectedWidgetIds.includes(widget.id);
                    return (
                      <button
                        key={widget.id}
                        onClick={() => dispatch({ type: 'TOGGLE_WIDGET_SELECTION', payload: widget.id })}
                        onMouseEnter={() => dispatch({ type: 'SET_PREVIEW_WIDGET', payload: widget.id })}
                        className={`cursor-pointer flex items-start gap-2.5 px-3 py-2 rounded-[10px] transition-colors text-left group ${
                          isSelected ? 'bg-gradient-to-r from-[#f0fdf4] to-[rgba(240,253,244,0)]' : 'hover:bg-[#f9fafb]'
                        }`}
                      >
                        {/* Selection indicator */}
                        <div className="mt-0.5 shrink-0">
                          {isSelected ? (
                            <Check size={16} className="text-[#22c55e]" />
                          ) : (
                            <WidgetTypeIcon type={widget.type} name={widget.name} />
                          )}
                        </div>
                        {/* Widget Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-['Cabin',sans-serif] font-medium text-[13px] text-[#0a2333]">
                              {widget.name}
                            </span>
                            <WidgetTypeBadge type={widget.type} />
                          </div>
                          <p className="font-['Cabin',sans-serif] text-[11px] text-[#62748e] leading-4 mt-0.5">
                            {widget.description}
                          </p>
                        </div>
                        {/* Remove button for selected */}
                        {isSelected && (
                          <X
                            size={20}
                            className="text-[#62748e] mt-0.5 shrink-0"
                            onClick={e => {
                              e.stopPropagation();
                              dispatch({ type: 'TOGGLE_WIDGET_SELECTION', payload: widget.id });
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}