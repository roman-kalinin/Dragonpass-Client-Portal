import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import {
  LayoutDashboard, Users, MoreVertical, X,
  ArrowUpRight, ArrowDownRight, Star, CheckCircle, Zap,
  DollarSign, BarChart, GripVertical,
} from 'lucide-react';
import { useApp } from '../store';
import { ALL_WIDGETS, MONTHLY_ACTIVITY_DATA } from '../data';
import { Widget } from '../types';
import { getChartForWidget } from './charts/ChartVisualizations';

// ── Helpers ─────────────────────────────────────────────────

function getColSpan(widget: Widget): number {
  if (widget.type === 'TABLE') return 4;
  if (widget.type === 'CHART') return 2;
  return 1;
}

function getColSpanClass(widget: Widget): string {
  if (widget.type === 'TABLE') return 'col-span-4';
  if (widget.type === 'CHART') return 'col-span-2';
  return 'col-span-1';
}

// ── Empty State ─────────────────────────────────────────────

function EmptyState() {
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
  onResizeStart, isDragging,
}: {
  widget: Widget;
  onRemove?: () => void;
  isEditMode?: boolean;
  extraHeight?: number;
  onResizeStart?: (e: React.MouseEvent) => void;
  isDragging?: boolean;
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

  return (
    <div
      className={`bg-white rounded-xl border border-[#e2e8f0] relative group min-w-0 select-none transition-shadow duration-200 ${
        isDragging ? 'shadow-lg shadow-black/15 scale-[1.02] z-50 ring-2 ring-[#0a2333]/10' : ''
      }`}
      style={{ height: extraHeight ? `calc(100% + ${extraHeight}px)` : undefined }}
    >
      {isEditMode && (
        <div className="absolute top-2 left-2 text-[#cad5e2] cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <GripVertical size={14} />
        </div>
      )}

      <div className="p-4 flex flex-col gap-1 h-full">
        {onRemove && (
          <button
            onClick={onRemove}
            className="cursor-pointer absolute top-2 right-2 w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all z-10"
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
            <button className="cursor-pointer w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
        <svg className="w-full h-6 mt-1" viewBox="0 0 200 24" fill="none">
          <path
            d="M0 20 C30 18, 50 12, 80 14 S130 6, 160 10 S180 4, 200 2"
            stroke="#CAD5E2"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {isEditMode && onResizeStart && <ResizeHandle onResizeStart={onResizeStart} />}
    </div>
  );
}

// ── Chart Placeholder ───────────────────────────────────────

function ChartPlaceholder({
  widget, onRemove, isEditMode, extraHeight,
  onResizeStart, isDragging,
}: {
  widget: Widget;
  onRemove?: () => void;
  isEditMode?: boolean;
  extraHeight?: number;
  onResizeStart?: (e: React.MouseEvent) => void;
  isDragging?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-xl border border-[#e2e8f0] relative group select-none transition-shadow duration-200 ${
        isDragging ? 'shadow-lg shadow-black/15 scale-[1.02] z-50 ring-2 ring-[#0a2333]/10' : ''
      }`}
    >
      {isEditMode && (
        <div className="absolute top-2 left-2 text-[#cad5e2] cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <GripVertical size={14} />
        </div>
      )}

      {onRemove && (
        <button
          onClick={onRemove}
          className="cursor-pointer absolute top-2 right-2 w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all z-10"
        >
          <X size={14} className="text-[#62748e]" />
        </button>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <BarChart size={16} className="text-[#62748e]" />
          <span className="font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a2333]">{widget.name}</span>
        </div>
        <div style={{ minHeight: `${128 + (extraHeight ?? 0)}px` }}>
          {getChartForWidget(widget.id) ?? (
            <div
              className="bg-[#f9fafb] rounded-lg flex items-center justify-center border border-dashed border-[#e2e8f0]"
              style={{ height: `${128 + (extraHeight ?? 0)}px` }}
            >
              <p className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">Chart visualization placeholder</p>
            </div>
          )}
        </div>
      </div>

      {isEditMode && onResizeStart && <ResizeHandle onResizeStart={onResizeStart} />}
    </div>
  );
}

// ── Table Widget ────────────────────────────────────────────

function TableWidget({
  widget, onRemove, isEditMode, extraHeight,
  onResizeStart, isDragging,
}: {
  widget: Widget;
  onRemove?: () => void;
  isEditMode?: boolean;
  extraHeight?: number;
  onResizeStart?: (e: React.MouseEvent) => void;
  isDragging?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-xl border border-[#e2e8f0] relative group select-none transition-shadow duration-200 ${
        isDragging ? 'shadow-lg shadow-black/15 scale-[1.02] z-50 ring-2 ring-[#0a2333]/10' : ''
      }`}
    >
      {isEditMode && (
        <div className="absolute top-2 left-2 text-[#cad5e2] cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <GripVertical size={14} />
        </div>
      )}

      {onRemove && (
        <button
          onClick={onRemove}
          className="cursor-pointer absolute top-2 right-2 w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all z-10"
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

      {isEditMode && onResizeStart && <ResizeHandle onResizeStart={onResizeStart} />}
    </div>
  );
}

// ── Drag State ──────────────────────────────────────────────

interface DragState {
  widgetId: string;
  dropIndex: number;
  mouseX: number;
  mouseY: number;
  offsetX: number;
  offsetY: number;
  sourceRect: DOMRect;
}

// ── Drop Index Calculation ──────────────────────────────────

function computeDropIndex(
  mouseX: number,
  mouseY: number,
  gridEl: HTMLElement,
  displayWidgets: Widget[],
  draggedColSpan: number,
): number {
  const gridRect = gridEl.getBoundingClientRect();
  const gap = 16;
  const cols = 4;
  const colWidth = (gridRect.width - (cols - 1) * gap) / cols;

  // Build row layout from display widgets (excluding dragged)
  const rows: { widgets: { widget: Widget; colStart: number; colSpan: number }[]; y: number; height: number }[] = [];
  let currentCol = 0;
  let currentRow: { widget: Widget; colStart: number; colSpan: number }[] = [];

  for (const w of displayWidgets) {
    const cs = getColSpan(w);
    if (currentCol + cs > cols) {
      rows.push({ widgets: currentRow, y: 0, height: 0 });
      currentRow = [];
      currentCol = 0;
    }
    currentRow.push({ widget: w, colStart: currentCol, colSpan: cs });
    currentCol += cs;
  }
  if (currentRow.length > 0) {
    rows.push({ widgets: currentRow, y: 0, height: 0 });
  }

  // Get actual row positions from grid children
  const children = Array.from(gridEl.children) as HTMLElement[];
  let childIdx = 0;
  for (const row of rows) {
    let rowY = Infinity;
    let rowBottom = 0;
    for (let i = 0; i < row.widgets.length; i++) {
      if (childIdx < children.length) {
        const rect = children[childIdx].getBoundingClientRect();
        rowY = Math.min(rowY, rect.top);
        rowBottom = Math.max(rowBottom, rect.bottom);
        childIdx++;
      }
    }
    row.y = rowY;
    row.height = rowBottom - rowY;
  }

  // Find which row the mouse is in — use row boundaries, not midpoints
  // This prevents the placeholder from jumping when the cursor barely moves
  let targetRowIdx = rows.length; // default: after all rows
  for (let r = 0; r < rows.length; r++) {
    const rowTop = rows[r].y;
    const rowBottom = rows[r].y + rows[r].height;
    if (mouseY >= rowTop && mouseY <= rowBottom) {
      targetRowIdx = r;
      break;
    }
    // If mouse is between rows (in the gap), snap to the closer row
    if (r < rows.length - 1) {
      const nextRowTop = rows[r + 1].y;
      if (mouseY > rowBottom && mouseY < nextRowTop) {
        const gapMid = (rowBottom + nextRowTop) / 2;
        targetRowIdx = mouseY < gapMid ? r : r + 1;
        break;
      }
    }
    // If mouse is above the first row
    if (r === 0 && mouseY < rowTop) {
      targetRowIdx = 0;
      break;
    }
  }

  // Calculate flat index offset for the target row
  let flatOffset = 0;
  for (let r = 0; r < targetRowIdx && r < rows.length; r++) {
    flatOffset += rows[r].widgets.length;
  }

  // If mouse is past all rows, insert at end
  if (targetRowIdx >= rows.length) {
    return displayWidgets.length;
  }

  // Find position within the row
  const row = rows[targetRowIdx];
  const relX = mouseX - gridRect.left;

  // Check each widget boundary in the row
  for (let i = 0; i < row.widgets.length; i++) {
    const item = row.widgets[i];
    const itemMidX = item.colStart * (colWidth + gap) + (item.colSpan * colWidth + (item.colSpan - 1) * gap) / 2;
    if (relX < itemMidX) {
      return flatOffset + i;
    }
  }

  return flatOffset + row.widgets.length;
}

// ── Main Canvas ─────────────────────────────────────────────

export function DashboardCanvas() {
  const { state, dispatch, activeDashboard } = useApp();
  const isEditMode = state.isEditMode;

  const widgetIds = activeDashboard?.widgets ?? state.selectedWidgetIds;
  const widgets = widgetIds.map(id => ALL_WIDGETS.find(w => w.id === id)).filter(Boolean) as Widget[];

  // ── ALL HOOKS MUST BE BEFORE ANY EARLY RETURNS ─────────────

  const [drag, setDrag] = useState<DragState | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [extraHeights, setExtraHeights] = useState<Record<string, number>>({});
  const resizingRef = useRef<{ id: string; startY: number; startH: number } | null>(null);
  const prevRectsRef = useRef<Map<string, DOMRect>>(new Map());
  const prevDragRef = useRef(drag);

  useEffect(() => {
    if (!isEditMode) {
      setExtraHeights({});
      setDrag(null);
    }
  }, [isEditMode]);

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

  const handleDragStart = useCallback((widgetId: string, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[title="Drag to resize"]')) return;

    e.preventDefault();
    const draggedWidget = widgets.find(w => w.id === widgetId);
    if (!draggedWidget) return;

    const widgetEl = (e.currentTarget as HTMLElement);
    const sourceRect = widgetEl.getBoundingClientRect();
    const offsetX = e.clientX - sourceRect.left;
    const offsetY = e.clientY - sourceRect.top;

    const originalIndex = widgets.indexOf(draggedWidget);
    setDrag({
      widgetId,
      dropIndex: originalIndex,
      mouseX: e.clientX,
      mouseY: e.clientY,
      offsetX,
      offsetY,
      sourceRect,
    });

    function onPointerMove(ev: PointerEvent) {
      if (!gridRef.current) return;

      const otherWidgets = widgets.filter(w => w.id !== widgetId);
      const draggedW = widgets.find(w => w.id === widgetId);
      if (!draggedW) return;

      const newDropIndex = computeDropIndex(
        ev.clientX,
        ev.clientY,
        gridRef.current,
        otherWidgets,
        getColSpan(draggedW),
      );

      setDrag(prev => prev ? { ...prev, dropIndex: newDropIndex, mouseX: ev.clientX, mouseY: ev.clientY } : null);
    }

    function onPointerUp() {
      setDrag(currentDrag => {
        if (currentDrag) {
          const currentIds = activeDashboard?.widgets ?? state.selectedWidgetIds;
          const otherIds = currentIds.filter(id => id !== currentDrag.widgetId);
          const newOrder = [...otherIds];
          newOrder.splice(currentDrag.dropIndex, 0, currentDrag.widgetId);
          dispatch({ type: 'REORDER_WIDGETS', payload: newOrder });
        }
        return null;
      });
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('keydown', onKeyDown);
    }

    function onKeyDown(ev: KeyboardEvent) {
      if (ev.key === 'Escape') {
        setDrag(null);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('keydown', onKeyDown);
      }
    }

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('keydown', onKeyDown);
  }, [widgets, activeDashboard, state.selectedWidgetIds, dispatch]);

  // FLIP: capture positions before drag state changes trigger re-render
  const flipPendingRef = useRef(false);
  if (prevDragRef.current !== drag && gridRef.current) {
    const map = new Map<string, DOMRect>();
    const children = gridRef.current.children;
    for (let i = 0; i < children.length; i++) {
      const el = children[i] as HTMLElement;
      const key = el.dataset.flipKey;
      if (key) map.set(key, el.getBoundingClientRect());
    }
    prevRectsRef.current = map;
    prevDragRef.current = drag;
    flipPendingRef.current = true;
  }

  // FLIP: after DOM update, animate from old to new positions (only when drag changed)
  useLayoutEffect(() => {
    if (!flipPendingRef.current || !gridRef.current || !isEditMode) return;
    flipPendingRef.current = false;
    const prevRects = prevRectsRef.current;
    if (prevRects.size === 0) return;

    const children = gridRef.current.children;
    for (let i = 0; i < children.length; i++) {
      const el = children[i] as HTMLElement;
      const key = el.dataset.flipKey;
      if (!key || key === '__placeholder__') continue;
      const prev = prevRects.get(key);
      if (!prev) continue;
      const curr = el.getBoundingClientRect();
      const dx = prev.left - curr.left;
      const dy = prev.top - curr.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) continue;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      el.style.transition = 'none';
      el.offsetHeight; // force reflow
      el.style.transform = '';
      el.style.transition = 'transform 200ms ease';
    }
  });

  // ── END HOOKS ──────────────────────────────────────────────

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

  // View mode — no remove buttons, no edit controls
  if (!isEditMode) {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        {kpiWidgets.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mb-4">
            {kpiWidgets.map(w => (
              <KpiCard key={w.id} widget={w} />
            ))}
          </div>
        )}
        {chartWidgets.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {chartWidgets.map(w => (
              <ChartPlaceholder key={w.id} widget={w} />
            ))}
          </div>
        )}
        {tableWidgets.length > 0 && (
          <div className="flex flex-col gap-4">
            {tableWidgets.map(w => (
              <TableWidget key={w.id} widget={w} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── EDIT MODE ──────────────────────────────────────────────

  const draggedWidget = drag ? widgets.find(w => w.id === drag.widgetId) : null;
  const otherWidgets = drag ? widgets.filter(w => w.id !== drag.widgetId) : widgets;

  // Build the grid display list: other widgets + placeholder at drop index
  type DisplayItem = { kind: 'widget'; widget: Widget } | { kind: 'placeholder'; colSpan: number };
  const displayList: DisplayItem[] = otherWidgets.map(w => ({ kind: 'widget' as const, widget: w }));

  if (drag && draggedWidget) {
    const insertAt = Math.min(drag.dropIndex, displayList.length);
    displayList.splice(insertAt, 0, { kind: 'placeholder', colSpan: getColSpan(draggedWidget) });
  }

  const colSpanClass = (cs: number) =>
    cs === 4 ? 'col-span-4' : cs === 2 ? 'col-span-2' : 'col-span-1';

  const placeholderHeight = draggedWidget?.type === 'TABLE' ? '120px' : draggedWidget?.type === 'CHART' ? '180px' : '140px';

  // Floating overlay position
  const floatingStyle = drag ? {
    position: 'fixed' as const,
    left: drag.mouseX - drag.offsetX,
    top: drag.mouseY - drag.offsetY,
    width: drag.sourceRect.width,
    zIndex: 9999,
    pointerEvents: 'none' as const,
    cursor: 'grabbing',
  } : undefined;

  // Render the floating dragged widget
  function renderWidget(w: Widget, extraH: number, isDragging: boolean) {
    const commonProps = {
      widget: w,
      onRemove: isDragging ? undefined : () => handleRemove(w.id),
      isEditMode: true,
      extraHeight: extraH,
      onResizeStart: isDragging ? undefined : (e: React.MouseEvent) => handleResizeStart(w.id, e),
      isDragging,
    };
    if (w.type === 'KPI') return <KpiCard {...commonProps} />;
    if (w.type === 'CHART') return <ChartPlaceholder {...commonProps} />;
    return <TableWidget {...commonProps} />;
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-4 flex items-center gap-2 text-[#62748e]">
        <GripVertical size={14} />
        <span className="font-['Cabin',sans-serif] text-[12px]">
          Drag widgets to reorder · Drag the corner triangle to resize
        </span>
      </div>

      <div ref={gridRef} className="grid grid-cols-4 gap-4">
        {displayList.map((item, idx) => {
          if (item.kind === 'placeholder') {
            return (
              <div
                key="__placeholder__"
                data-flip-key="__placeholder__"
                className={`${colSpanClass(item.colSpan)} rounded-xl bg-[#d1fae5]/50`}
                style={{ minHeight: placeholderHeight }}
              />
            );
          }

          const w = item.widget;
          const extraH = extraHeights[w.id] ?? 0;

          return (
            <div
              key={w.id}
              data-flip-key={w.id}
              className={`${getColSpanClass(w)}`}
              onMouseDown={e => handleDragStart(w.id, e)}
              style={{ cursor: 'grab' }}
            >
              {renderWidget(w, extraH, false)}
            </div>
          );
        })}
      </div>

      {/* Floating dragged widget overlay */}
      {drag && draggedWidget && (
        <div style={floatingStyle}>
          {renderWidget(draggedWidget, extraHeights[draggedWidget.id] ?? 0, true)}
        </div>
      )}
    </div>
  );
}
