import { useState, useRef, useEffect, useCallback } from 'react';
import {
  LayoutDashboard, TrendingUp, Users, MoreVertical, X,
  ArrowUpRight, ArrowDownRight, Star, CheckCircle, Zap,
  DollarSign, BarChart, GripVertical,
} from 'lucide-react';
import { useApp } from '../store';
import { ALL_WIDGETS, DASHBOARD_TEMPLATES, MONTHLY_ACTIVITY_DATA } from '../data';
import { Widget } from '../types';

// ── Empty State ─────────────────────────────────────────────

function EmptyState() {
  const { state, dispatch, activeDashboard } = useApp();

  if (!activeDashboard) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-[420px]">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#f1f5f9] flex items-center justify-center mb-4">
            <LayoutDashboard size={32} className="text-[#62748e]" />
          </div>
          <h2 className="font-['Cabin',sans-serif] font-bold text-[18px] text-[#0a2333] mb-2">
            Select a dashboard
          </h2>
          <p className="font-['Cabin',sans-serif] text-[14px] text-[#62748e] mb-6">
            Choose a dashboard from the sidebar or create a new one to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center max-w-[420px]">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#f1f5f9] flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M4 4H14V18H4V4Z" fill="#CAD5E2" />
            <path d="M18 4H28V12H18V4Z" fill="#62748E" />
            <path d="M4 22H14V28H4V22Z" fill="#CAD5E2" />
            <path d="M18 16H28V28H18V16Z" fill="#62748E" />
          </svg>
        </div>
        <h2 className="font-['Cabin',sans-serif] font-bold text-[18px] text-[#0a2333] mb-2">
          Build your dashboard
        </h2>
        <p className="font-['Cabin',sans-serif] text-[14px] text-[#62748e] mb-6">
          Start from scratch or choose a template to get up and running quickly.
        </p>
        {/* Templates */}
        <div className="flex flex-col gap-3">
          {DASHBOARD_TEMPLATES.map(tmpl => (
            <button
              key={tmpl.id}
              onClick={() => dispatch({ type: 'APPLY_TEMPLATE', payload: tmpl.id })}
              className="w-full h-[62px] rounded-lg bg-white flex items-center gap-3 pl-3 hover:shadow-md transition-shadow text-left"
            >
              <div
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{ backgroundColor: tmpl.bgColor }}
              >
                {tmpl.id === 'tmpl-executive' ? (
                  <TrendingUp size={16} style={{ color: tmpl.color }} />
                ) : (
                  <Users size={16} style={{ color: tmpl.color }} />
                )}
              </div>
              <div>
                <p className="font-['Cabin',sans-serif] font-bold text-[14px] text-[#0a2333]">{tmpl.name}</p>
                <p className="font-['Cabin',sans-serif] font-medium text-[12px] text-[#62748e]">{tmpl.description}</p>
              </div>
            </button>
          ))}
          <button
            onClick={() => dispatch({ type: 'TOGGLE_WIDGET_LIBRARY' })}
            className="w-full rounded-lg bg-[rgba(10,35,51,0.05)] flex items-center justify-center gap-2 px-4 py-2 hover:bg-[rgba(10,35,51,0.08)] transition-colors"
          >
            <LayoutDashboard size={16} className="text-[#62748e]" />
            <span className="font-['Cabin',sans-serif] text-[14px] text-[#0a2333]">Browse all templates</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Resize Handle (Triangle) ─────────────────────────────────

function ResizeHandle({ onResizeStart }: { onResizeStart: (e: React.MouseEvent) => void }) {
  return (
    <div
      className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-10 group/resize"
      onMouseDown={onResizeStart}
      title="Drag to resize"
    >
      <svg width="14" height="14" viewBox="0 0 6 6" fill="none" className="absolute bottom-[3px] right-[3px]">
        <path d="M6 0H0L6 6V0Z" fill="#1D293D" opacity="0.5" />
      </svg>
    </div>
  );
}

// ── KPI Widget Card ─────────────────────────────────────────

function KpiCard({
  widget, onRemove, isEditMode, extraHeight,
  onResizeStart, isDragging, isDragOver,
}: {
  widget: Widget;
  onRemove?: () => void;
  isEditMode?: boolean;
  extraHeight?: number;
  onResizeStart?: (e: React.MouseEvent) => void;
  isDragging?: boolean;
  isDragOver?: boolean;
}) {
  const iconMap: Record<string, React.ReactNode> = {
    'w-eligible-members': <Users size={16} className="text-[#62748e]" />,
    'w-active-members': <CheckCircle size={16} className="text-[#62748e]" />,
    'w-engagement-rate': <ArrowUpRight size={16} className="text-[#62748e]" />,
    'w-gmv': <DollarSign size={16} className="text-[#62748e]" />,
    'w-total-orders': <Zap size={16} className="text-[#62748e]" />,
    'w-entitlement-util': <Star size={16} className="text-[#62748e]" />,
    'w-satisfaction': <Star size={16} className="text-[#62748e]" />,
  };

  const editElevation = isEditMode
    ? 'shadow-[0_8px_24px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.08)] -translate-y-0.5'
    : '';

  return (
    <div
      className={`bg-white rounded-xl border relative group min-w-0 transition-all duration-150 select-none ${
        isDragOver
          ? 'border-[#0a2333] border-2 ring-2 ring-[#0a2333]/10'
          : 'border-[#e2e8f0]'
      } ${isDragging ? 'opacity-40' : 'opacity-100'} ${editElevation}`}
      style={{ height: extraHeight ? `calc(100% + ${extraHeight}px)` : undefined }}
    >
      {/* Drag grip (edit mode only) */}
      {isEditMode && (
        <div className="absolute top-2 left-2 text-[#cad5e2] cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <GripVertical size={14} />
        </div>
      )}

      <div className="p-4 flex flex-col gap-1 h-full">
        {onRemove && (
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all z-10"
          >
            <X size={14} className="text-[#62748e]" />
          </button>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {iconMap[widget.id] ?? <BarChart size={16} className="text-[#62748e]" />}
            <span className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">{widget.name}</span>
          </div>
          {!isEditMode && (
            <button className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical size={14} className="text-[#62748e]" />
            </button>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-['Cabin',sans-serif] font-bold text-[28px] text-[#0a2333] leading-tight">
            {widget.mockValue ?? '—'}
          </span>
          {widget.mockTrend !== undefined && (
            <span className={`flex items-center gap-0.5 font-['Cabin',sans-serif] text-[12px] ${widget.mockTrend >= 0 ? 'text-[#008236]' : 'text-[#d4183d]'}`}>
              {widget.mockTrend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {Math.abs(widget.mockTrend)}%
            </span>
          )}
        </div>
        <p className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">
          {widget.mockSubtext ?? widget.description}
        </p>
        {/* Mini chart line */}
        <svg className="w-full h-6 mt-1" viewBox="0 0 200 24" fill="none">
          <path
            d="M0 20 C30 18, 50 12, 80 14 S130 6, 160 10 S180 4, 200 2"
            stroke="#CAD5E2"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Resize handle */}
      {isEditMode && onResizeStart && <ResizeHandle onResizeStart={onResizeStart} />}
    </div>
  );
}

// ── Chart Placeholder ───────────────────────────────────────

function ChartPlaceholder({
  widget, onRemove, isEditMode, extraHeight,
  onResizeStart, isDragging, isDragOver,
}: {
  widget: Widget;
  onRemove?: () => void;
  isEditMode?: boolean;
  extraHeight?: number;
  onResizeStart?: (e: React.MouseEvent) => void;
  isDragging?: boolean;
  isDragOver?: boolean;
}) {
  const editElevation = isEditMode
    ? 'shadow-[0_8px_24px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.08)] -translate-y-0.5'
    : '';

  return (
    <div
      className={`bg-white rounded-xl border relative group transition-all duration-150 select-none ${
        isDragOver ? 'border-[#0a2333] border-2 ring-2 ring-[#0a2333]/10' : 'border-[#e2e8f0]'
      } ${isDragging ? 'opacity-40' : 'opacity-100'} ${editElevation}`}
    >
      {/* Drag grip */}
      {isEditMode && (
        <div className="absolute top-2 left-2 text-[#cad5e2] cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <GripVertical size={14} />
        </div>
      )}

      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all z-10"
        >
          <X size={14} className="text-[#62748e]" />
        </button>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <BarChart size={16} className="text-[#62748e]" />
          <span className="font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a2333]">{widget.name}</span>
        </div>
        <div
          className="bg-[#f9fafb] rounded-lg flex items-center justify-center border border-dashed border-[#e2e8f0]"
          style={{ height: `${128 + (extraHeight ?? 0)}px` }}
        >
          <p className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">Chart visualization placeholder</p>
        </div>
      </div>

      {/* Resize handle */}
      {isEditMode && onResizeStart && <ResizeHandle onResizeStart={onResizeStart} />}
    </div>
  );
}

// ── Table Widget ────────────────────────────────────────────

function TableWidget({
  widget, onRemove, isEditMode, extraHeight,
  onResizeStart, isDragging, isDragOver,
}: {
  widget: Widget;
  onRemove?: () => void;
  isEditMode?: boolean;
  extraHeight?: number;
  onResizeStart?: (e: React.MouseEvent) => void;
  isDragging?: boolean;
  isDragOver?: boolean;
}) {
  const editElevation = isEditMode
    ? 'shadow-[0_8px_24px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.08)] -translate-y-0.5'
    : '';

  return (
    <div
      className={`bg-white rounded-xl border relative group transition-all duration-150 select-none ${
        isDragOver ? 'border-[#0a2333] border-2 ring-2 ring-[#0a2333]/10' : 'border-[#e2e8f0]'
      } ${isDragging ? 'opacity-40' : 'opacity-100'} ${editElevation}`}
    >
      {/* Drag grip */}
      {isEditMode && (
        <div className="absolute top-2 left-2 text-[#cad5e2] cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <GripVertical size={14} />
        </div>
      )}

      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all z-10"
        >
          <X size={14} className="text-[#62748e]" />
        </button>
      )}
      <div className="p-4">
        <h3 className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333] mb-3">{widget.name}</h3>
        <div className="overflow-x-auto" style={{ maxHeight: extraHeight ? `${300 + extraHeight}px` : undefined }}>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#e2e8f0]">
                {['Month', 'New Users', 'Active Users', 'Total Users', 'Total Orders', 'Entitlement', 'Purchased', 'Value', 'Utilization', 'Conversion Rate'].map(h => (
                  <th key={h} className="py-2 px-3 font-['Cabin',sans-serif] font-medium text-[12px] text-[#62748e] whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MONTHLY_ACTIVITY_DATA.map(row => (
                <tr key={row.month} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                  <td className="py-2.5 px-3 font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{row.month}</td>
                  <td className="py-2.5 px-3 font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{row.newUsers.toLocaleString()}</td>
                  <td className="py-2.5 px-3 font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{row.activeUsers.toLocaleString()}</td>
                  <td className="py-2.5 px-3 font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{row.totalUsers.toLocaleString()}</td>
                  <td className="py-2.5 px-3 font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{row.totalOrders}</td>
                  <td className="py-2.5 px-3 font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{row.entitlement.toLocaleString()}</td>
                  <td className="py-2.5 px-3 font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{row.purchased}</td>
                  <td className="py-2.5 px-3 font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{row.value}</td>
                  <td className="py-2.5 px-3 font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{row.utilization}</td>
                  <td className="py-2.5 px-3 font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{row.conversionRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resize handle */}
      {isEditMode && onResizeStart && <ResizeHandle onResizeStart={onResizeStart} />}
    </div>
  );
}

// ── Draggable Widget Wrapper ─────────────────────────────────

function DraggableWidget({
  widgetId, index, children, onDrop, draggingId, setDraggingId, dragOverId, setDragOverId,
}: {
  widgetId: string;
  index: number;
  children: React.ReactNode;
  onDrop: (fromId: string, toId: string) => void;
  draggingId: string | null;
  setDraggingId: (id: string | null) => void;
  dragOverId: string | null;
  setDragOverId: (id: string | null) => void;
}) {
  return (
    <div
      draggable
      onDragStart={e => {
        setDraggingId(widgetId);
        e.dataTransfer.effectAllowed = 'move';
      }}
      onDragEnd={() => {
        setDraggingId(null);
        setDragOverId(null);
      }}
      onDragOver={e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragOverId !== widgetId) setDragOverId(widgetId);
      }}
      onDragLeave={() => {
        if (dragOverId === widgetId) setDragOverId(null);
      }}
      onDrop={e => {
        e.preventDefault();
        if (draggingId && draggingId !== widgetId) {
          onDrop(draggingId, widgetId);
        }
        setDraggingId(null);
        setDragOverId(null);
      }}
      className="cursor-grab active:cursor-grabbing"
    >
      {children}
    </div>
  );
}

// ── Main Canvas ─────────────────────────────────────────────

export function DashboardCanvas() {
  const { state, dispatch, activeDashboard } = useApp();
  const isEditMode = state.isEditMode;

  const widgetIds = activeDashboard?.widgets ?? state.selectedWidgetIds;
  const widgets = widgetIds.map(id => ALL_WIDGETS.find(w => w.id === id)).filter(Boolean) as Widget[];

  // Drag state
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  // Resize state: map widgetId → extra height added via drag
  const [extraHeights, setExtraHeights] = useState<Record<string, number>>({});
  const resizingRef = useRef<{ id: string; startY: number; startH: number } | null>(null);

  // Reset heights when leaving edit mode
  useEffect(() => {
    if (!isEditMode) setExtraHeights({});
  }, [isEditMode]);

  // Global mousemove / mouseup for resize
  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!resizingRef.current) return;
      const { id, startY, startH } = resizingRef.current;
      const delta = e.clientY - startY;
      const newH = Math.max(0, startH + delta);
      setExtraHeights(prev => ({ ...prev, [id]: newH }));
    }
    function onMouseUp() {
      resizingRef.current = null;
    }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const handleResizeStart = useCallback((widgetId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resizingRef.current = {
      id: widgetId,
      startY: e.clientY,
      startH: extraHeights[widgetId] ?? 0,
    };
  }, [extraHeights]);

  const handleDrop = useCallback((fromId: string, toId: string) => {
    const currentIds = activeDashboard?.widgets ?? state.selectedWidgetIds;
    const fromIdx = currentIds.indexOf(fromId);
    const toIdx = currentIds.indexOf(toId);
    if (fromIdx === -1 || toIdx === -1) return;
    const newOrder = [...currentIds];
    newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, fromId);
    dispatch({ type: 'REORDER_WIDGETS', payload: newOrder });
  }, [activeDashboard, state.selectedWidgetIds, dispatch]);

  const handleRemove = (widgetId: string) => {
    if (activeDashboard) {
      dispatch({ type: 'REMOVE_WIDGET_FROM_DASHBOARD', payload: { dashboardId: activeDashboard.id, widgetId } });
    }
  };

  if (widgets.length === 0) {
    return <EmptyState />;
  }

  const kpiWidgets = widgets.filter(w => w.type === 'KPI');
  const chartWidgets = widgets.filter(w => w.type === 'CHART');
  const tableWidgets = widgets.filter(w => w.type === 'TABLE');

  // In view mode: original grid layout
  if (!isEditMode) {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        {/* KPI Cards Grid */}
        {kpiWidgets.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mb-4">
            {kpiWidgets.map(w => (
              <KpiCard key={w.id} widget={w} onRemove={() => handleRemove(w.id)} />
            ))}
          </div>
        )}
        {/* Chart Widgets */}
        {chartWidgets.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {chartWidgets.map(w => (
              <ChartPlaceholder key={w.id} widget={w} onRemove={() => handleRemove(w.id)} />
            ))}
          </div>
        )}
        {/* Table Widgets */}
        {tableWidgets.length > 0 && (
          <div className="flex flex-col gap-4">
            {tableWidgets.map(w => (
              <TableWidget key={w.id} widget={w} onRemove={() => handleRemove(w.id)} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── EDIT MODE: unified sortable + resizable grid ──────────
  // KPI: 4-col grid (col-span-1 each)
  // Chart: 2-col grid (col-span-1 = half-width)
  // Table: full width (col-span-4)
  // All interleaved in one 4-column CSS grid

  const renderWidget = (w: Widget) => {
    const extraH = extraHeights[w.id] ?? 0;
    const isDragging = draggingId === w.id;
    const isDragOver = dragOverId === w.id && draggingId !== w.id;

    const commonProps = {
      widget: w,
      onRemove: () => handleRemove(w.id),
      isEditMode: true,
      extraHeight: extraH,
      onResizeStart: (e: React.MouseEvent) => handleResizeStart(w.id, e),
      isDragging,
      isDragOver,
    };

    let inner: React.ReactNode;
    if (w.type === 'KPI') inner = <KpiCard {...commonProps} />;
    else if (w.type === 'CHART') inner = <ChartPlaceholder {...commonProps} />;
    else inner = <TableWidget {...commonProps} />;

    const colSpan =
      w.type === 'KPI' ? 'col-span-1' :
      w.type === 'CHART' ? 'col-span-2' :
      'col-span-4';

    return (
      <div key={w.id} className={colSpan}>
        <DraggableWidget
          widgetId={w.id}
          index={widgets.indexOf(w)}
          onDrop={handleDrop}
          draggingId={draggingId}
          setDraggingId={setDraggingId}
          dragOverId={dragOverId}
          setDragOverId={setDragOverId}
        >
          {inner}
        </DraggableWidget>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#f0f4f8]">
      {/* Edit mode hint */}
      <div className="mb-4 flex items-center gap-2 text-[#62748e]">
        <GripVertical size={14} />
        <span className="font-['Cabin',sans-serif] text-[12px]">
          Drag widgets to reorder · Drag the corner triangle to resize
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {widgets.map(w => renderWidget(w))}
      </div>
    </div>
  );
}
