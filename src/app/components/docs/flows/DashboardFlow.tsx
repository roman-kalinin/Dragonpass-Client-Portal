import { useEffect } from 'react';
import type { Frame } from '../types';
import { DocFrame } from '../DocFrame';
import { useApp } from '../../../store';
import { TopBar } from '../../TopBar';
import { IconNav } from '../../IconNav';
import { Sidebar } from '../../Sidebar';
import { WidgetLibrary } from '../../WidgetLibrary';
import { DashboardToolbar } from '../../DashboardToolbar';
import { DashboardCanvas } from '../../DashboardCanvas';
import { GettingStartedCard } from '../../dashboard/GettingStartedCard';
import { AlertTriangle, X, GripVertical } from 'lucide-react';

function DashboardInner({ setup, children }: { setup?: (dispatch: Function) => void; children?: React.ReactNode }) {
  const { state, dispatch } = useApp();

  useEffect(() => {
    if (setup) setup(dispatch);
  }, []);

  return (
    <div className="flex flex-col overflow-hidden bg-[#f9fafb]" style={{ width: 1440, height: 900 }}>
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <IconNav activeView="analytics" onNavigate={() => {}} />
        {state.sidebarView === 'navigation' && <Sidebar />}
        {state.sidebarView === 'widget-library' && <WidgetLibrary />}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden w-full max-w-[1440px] mx-auto">
            <DashboardToolbar />
            <div className="flex-1 overflow-auto relative">
              {children}
              <DashboardCanvas />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardFrame({ setup, children }: { setup?: (dispatch: Function) => void; children?: React.ReactNode }) {
  return (
    <DocFrame>
      <DashboardInner setup={setup}>{children}</DashboardInner>
    </DocFrame>
  );
}

function UnsavedChangesDialogStatic() {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[420px] p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#fef3c7] flex items-center justify-center">
            <AlertTriangle size={20} className="text-[#d97706]" />
          </div>
          <div className="flex-1">
            <h3 className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333] mb-1">Unsaved Changes</h3>
            <p className="font-['Cabin',sans-serif] text-[14px] text-[#62748e]">
              You have unsaved changes to your dashboard. Would you like to save before leaving?
            </p>
          </div>
          <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100">
            <X size={16} className="text-[#62748e]" />
          </button>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="h-9 px-4 rounded-lg border border-[#d1d5dc] font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a2333]">Discard</button>
          <button className="h-9 px-4 rounded-lg bg-[#0a2333] font-['Cabin',sans-serif] font-medium text-[14px] text-white">Save & Continue</button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmDialogStatic() {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[420px] p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#fee2e2] flex items-center justify-center">
            <AlertTriangle size={20} className="text-[#d4183d]" />
          </div>
          <div className="flex-1">
            <h3 className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333] mb-1">Delete Dashboard</h3>
            <p className="font-['Cabin',sans-serif] text-[14px] text-[#62748e]">
              Are you sure you want to delete "Program Performance"? This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="h-9 px-4 rounded-lg border border-[#d1d5dc] font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a2333]">Cancel</button>
          <button className="h-9 px-4 rounded-lg bg-[#d4183d] font-['Cabin',sans-serif] font-medium text-[14px] text-white">Delete</button>
        </div>
      </div>
    </div>
  );
}

function DragInProgressOverlay() {
  return (
    <div className="absolute inset-0 z-40 pointer-events-none p-6">
      <div className="mb-4 flex items-center gap-2 text-[#62748e]">
        <GripVertical size={14} />
        <span className="font-['Cabin',sans-serif] text-[12px]">
          Drag widgets to reorder · Drag the corner triangle to resize
        </span>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {/* Row 1: 3 KPIs + green placeholder */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 col-span-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">Eligible Members</span>
          </div>
          <span className="font-['Cabin',sans-serif] font-bold text-[28px] text-[#0a2333]">12,340</span>
        </div>
        <div className="col-span-1 rounded-xl bg-[#d1fae5]/50 border-2 border-dashed border-[#34d399]" style={{ minHeight: 140 }} />
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 col-span-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">Total Orders</span>
          </div>
          <span className="font-['Cabin',sans-serif] font-bold text-[28px] text-[#0a2333]">1,850</span>
        </div>
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 col-span-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">GMV</span>
          </div>
          <span className="font-['Cabin',sans-serif] font-bold text-[28px] text-[#0a2333]">£2.4M</span>
        </div>
      </div>
      {/* Floating dragged widget */}
      <div
        className="absolute shadow-lg shadow-black/15 rounded-xl border border-[#e2e8f0] bg-white p-4 ring-2 ring-[#0a2333]/10"
        style={{ width: 220, top: 80, left: 280, transform: 'rotate(-2deg)' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <GripVertical size={14} className="text-[#cad5e2]" />
          <span className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">Active Members</span>
        </div>
        <span className="font-['Cabin',sans-serif] font-bold text-[28px] text-[#0a2333]">8,980</span>
        <p className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">vs previous period</p>
      </div>
    </div>
  );
}

function ResizeHandleOverlay() {
  return (
    <div className="absolute inset-0 z-40 pointer-events-none p-6">
      <div className="grid grid-cols-4 gap-4">
        {/* One KPI card with visible resize handle */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 col-span-1 relative" style={{ height: 180 }}>
          <div className="flex items-center gap-2 mb-1">
            <GripVertical size={14} className="text-[#cad5e2]" />
            <span className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">Active Members</span>
          </div>
          <span className="font-['Cabin',sans-serif] font-bold text-[28px] text-[#0a2333]">8,980</span>
          <p className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">vs previous period</p>
          {/* Resize handle triangle */}
          <div className="absolute bottom-0 right-0 w-6 h-6">
            <svg width="16" height="16" viewBox="0 0 6 6" fill="none" className="absolute bottom-[3px] right-[3px]">
              <path d="M6 0H0L6 6V0Z" fill="#1D293D" opacity="0.7" />
            </svg>
          </div>
          {/* Annotation arrow */}
          <div className="absolute -bottom-8 right-2 font-['Cabin',sans-serif] text-[11px] text-[#d97706] font-semibold flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2 L6 8 M3 5 L6 2 L9 5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Drag to resize
          </div>
        </div>
        {/* Other cards at normal size for contrast */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 col-span-1 opacity-40">
          <span className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">Total Orders</span>
          <div className="font-['Cabin',sans-serif] font-bold text-[28px] text-[#0a2333] mt-1">1,850</div>
        </div>
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 col-span-1 opacity-40">
          <span className="font-['Cabin',sans-serif] text-[13px] text-[#62748e]">GMV</span>
          <div className="font-['Cabin',sans-serif] font-bold text-[28px] text-[#0a2333] mt-1">£2.4M</div>
        </div>
      </div>
    </div>
  );
}

export const dashboardFrames: Frame[] = [
  // ── Navigation ──
  {
    id: 'dash-sidebar',
    title: 'Sidebar — System + Saved',
    description: 'Full sidebar showing system dashboards (non-editable) and saved views with unsaved indicator dots. "Select a dashboard" empty state in canvas.',
    category: 'Navigation',
    render: () => <DashboardFrame />,
  },
  {
    id: 'dash-system-selected',
    title: 'System Dashboard — Selected',
    description: 'System dashboard selected (Overview). Shows 4 KPI cards with sparklines. "Edit Dashboard" button is disabled for system dashboards.',
    category: 'Navigation',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'sys-overview' });
      }} />
    ),
  },
  {
    id: 'dash-financial-selected',
    title: 'Financial Dashboard',
    description: 'Financial system dashboard with KPIs (GMV, Revenue, ARPU, Margin) and Revenue Trend chart. Demonstrates chart widget rendering.',
    category: 'Navigation',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'sys-financial' });
      }} />
    ),
  },
  {
    id: 'dash-saved-selected',
    title: 'Saved Dashboard — Selected',
    description: 'User-created dashboard selected. "Edit Dashboard" button is enabled. Shows widgets the user has added.',
    category: 'Navigation',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'saved-1' });
      }} />
    ),
  },
  {
    id: 'dash-search-results',
    title: 'Dashboard Search — Results',
    description: 'Typing in sidebar search filters both System and Saved sections. Non-matching dashboards are hidden.',
    category: 'Navigation',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_DASHBOARD_SEARCH', payload: 'Over' });
      }} />
    ),
  },
  {
    id: 'dash-search-empty',
    title: 'Dashboard Search — No Results',
    description: 'No dashboards match the search query. Shows italic "No dashboards match" message in both sections.',
    category: 'Navigation',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_DASHBOARD_SEARCH', payload: 'xyz' });
      }} />
    ),
  },
  // ── Onboarding ──
  {
    id: 'dash-getting-started',
    title: 'Getting Started Checklist',
    description: 'Onboarding card with 4-step checklist. Shows progress bar and links to key actions. Appears in test mode.',
    category: 'Onboarding',
    render: () => (
      <DocFrame environment="test">
        <DashboardInner setup={(dispatch) => {
          dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'sys-overview' });
        }}>
          <div className="px-6 pt-4">
            <GettingStartedCard onNavigate={() => {}} />
          </div>
        </DashboardInner>
      </DocFrame>
    ),
  },
  // ── Widget Library ──
  {
    id: 'dash-widget-library',
    title: 'Widget Library — Open',
    description: 'Full widget library panel with categories (Overview, Financial, etc.), widget list with type badges (KPI/CHART/TABLE), preview pane with sparkline.',
    category: 'Widget Library',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'saved-1' });
        setTimeout(() => dispatch({ type: 'ENTER_EDIT_MODE' }), 50);
      }} />
    ),
  },
  {
    id: 'dash-widget-search',
    title: 'Widget Search — Results',
    description: 'Typing in widget search filters across all categories. Only matching widgets shown.',
    category: 'Widget Library',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'saved-1' });
        setTimeout(() => {
          dispatch({ type: 'ENTER_EDIT_MODE' });
          dispatch({ type: 'SET_WIDGET_SEARCH', payload: 'Revenue' });
        }, 50);
      }} />
    ),
  },
  {
    id: 'dash-widget-search-empty',
    title: 'Widget Search — No Results',
    description: 'No widgets match the search query. Shows "No widgets found" with clear search link.',
    category: 'Widget Library',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'saved-1' });
        setTimeout(() => {
          dispatch({ type: 'ENTER_EDIT_MODE' });
          dispatch({ type: 'SET_WIDGET_SEARCH', payload: 'xyzabc' });
        }, 50);
      }} />
    ),
  },
  {
    id: 'dash-widget-selected',
    title: 'Widget Selected',
    description: 'Widget checked in the library — green check icon replaces type icon, row gets green gradient highlight. Preview pane shows selected widget.',
    category: 'Widget Library',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'saved-1' });
        setTimeout(() => {
          dispatch({ type: 'ENTER_EDIT_MODE' });
          dispatch({ type: 'TOGGLE_WIDGET_SELECTION', payload: 'w-active-members' });
          dispatch({ type: 'TOGGLE_WIDGET_SELECTION', payload: 'w-total-orders' });
        }, 50);
      }} />
    ),
  },
  // ── Toolbar ──
  {
    id: 'dash-view-toolbar',
    title: 'View Mode Toolbar',
    description: 'Toolbar shows dashboard title + description, Edit Dashboard (disabled for system), Share, Export, and More (⋮) buttons.',
    category: 'Toolbar',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'saved-1' });
      }} />
    ),
  },
  {
    id: 'dash-edit-toolbar',
    title: 'Edit Mode Toolbar',
    description: 'Editable name/description inputs, date range selector, and Save button. Widget library sidebar replaces navigation sidebar.',
    category: 'Toolbar',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'saved-1' });
        setTimeout(() => dispatch({ type: 'ENTER_EDIT_MODE' }), 50);
      }} />
    ),
  },
  // ── Drag & Resize ──
  {
    id: 'dash-drag-in-progress',
    title: 'Drag In Progress',
    description: 'Widget being dragged floats above grid with shadow + rotation. Green dashed placeholder shows drop position. Other widgets shift to make room.',
    category: 'Drag & Resize',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'sys-overview' });
        setTimeout(() => dispatch({ type: 'ENTER_EDIT_MODE' }), 50);
      }}>
        <DragInProgressOverlay />
      </DashboardFrame>
    ),
  },
  {
    id: 'dash-resize-handle',
    title: 'Resize Handle Visible',
    description: 'Corner triangle appears on widget hover in edit mode. Drag down to extend widget height. Only available in edit mode.',
    category: 'Drag & Resize',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'sys-overview' });
        setTimeout(() => dispatch({ type: 'ENTER_EDIT_MODE' }), 50);
      }}>
        <ResizeHandleOverlay />
      </DashboardFrame>
    ),
  },
  // ── Async States ──
  {
    id: 'dash-save-loading',
    title: 'Save — In Progress',
    description: 'Save button shows spinner and is disabled while saving. Full dashboard context visible behind the saving state.',
    category: 'Async States',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'saved-1' });
        setTimeout(() => {
          dispatch({ type: 'ENTER_EDIT_MODE' });
          setTimeout(() => dispatch({ type: 'SAVE_DASHBOARD' }), 50);
        }, 50);
      }} />
    ),
  },
  {
    id: 'dash-export-loading',
    title: 'Export — In Progress',
    description: 'Export button shows spinner and is disabled while exporting. Full dashboard with toolbar visible.',
    category: 'Async States',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'saved-1' });
        setTimeout(() => dispatch({ type: 'EXPORT_DASHBOARD' }), 100);
      }} />
    ),
  },
  // ── Dialogs ──
  {
    id: 'dash-unsaved-dialog',
    title: 'Unsaved Changes Dialog',
    description: 'Modal when navigating away with unsaved changes. Options: Discard or Save & Continue. Dashboard visible behind overlay.',
    category: 'Dialogs',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'saved-1' });
      }}>
        <UnsavedChangesDialogStatic />
      </DashboardFrame>
    ),
  },
  {
    id: 'dash-delete-dialog',
    title: 'Delete Confirmation',
    description: 'Red destructive dialog. Deleting a dashboard is permanent and cannot be undone. Dashboard visible behind overlay.',
    category: 'Dialogs',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'saved-1' });
      }}>
        <DeleteConfirmDialogStatic />
      </DashboardFrame>
    ),
  },
  // ── Feedback ──
  {
    id: 'dash-toast-success',
    title: 'Toast — Success',
    description: 'Green success toast in bottom-right. Auto-dismisses after 3 seconds. Shown after save, export, etc.',
    category: 'Feedback',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'saved-1' });
        setTimeout(() => {
          dispatch({ type: 'SET_TOAST', payload: { message: 'Dashboard saved successfully', type: 'success' } });
        }, 100);
      }} />
    ),
  },
  {
    id: 'dash-toast-error',
    title: 'Toast — Error',
    description: 'Red error toast for failed operations. Same position and auto-dismiss behavior as success toast.',
    category: 'Feedback',
    render: () => (
      <DashboardFrame setup={(dispatch) => {
        dispatch({ type: 'SET_ACTIVE_DASHBOARD', payload: 'saved-1' });
        setTimeout(() => {
          dispatch({ type: 'SET_TOAST', payload: { message: 'Failed to save. Please try again.', type: 'error' } });
        }, 100);
      }} />
    ),
  },
];
