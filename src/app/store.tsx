// ============================================================
// Dashboard Builder - State Management (React Context)
// ============================================================

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { AppState, Dashboard, DateRange } from './types';
import {
  SYSTEM_DASHBOARDS,
  SAVED_DASHBOARDS,
  INITIAL_CATEGORIES,
  DEFAULT_DATE_RANGE,
  ALL_WIDGETS,
  DASHBOARD_TEMPLATES,
} from './data';

// ── Action Types ────────────────────────────────────────────

type Action =
  | { type: 'SET_ACTIVE_DASHBOARD'; payload: string | null }
  | { type: 'SET_SIDEBAR_VIEW'; payload: 'navigation' | 'widget-library' }
  | { type: 'TOGGLE_WIDGET_LIBRARY' }
  | { type: 'CLOSE_WIDGET_LIBRARY' }
  | { type: 'ENTER_EDIT_MODE' }
  | { type: 'EXIT_EDIT_MODE' }
  | { type: 'REORDER_WIDGETS'; payload: string[] }
  | { type: 'CREATE_DASHBOARD' }
  | { type: 'DELETE_DASHBOARD'; payload: string }
  | { type: 'UPDATE_DASHBOARD_NAME'; payload: { id: string; name: string } }
  | { type: 'UPDATE_DASHBOARD_DESCRIPTION'; payload: { id: string; description: string } }
  | { type: 'TOGGLE_WIDGET_SELECTION'; payload: string }
  | { type: 'ADD_WIDGETS_TO_DASHBOARD' }
  | { type: 'REMOVE_WIDGET_FROM_DASHBOARD'; payload: { dashboardId: string; widgetId: string } }
  | { type: 'SET_PREVIEW_WIDGET'; payload: string | null }
  | { type: 'SET_WIDGET_SEARCH'; payload: string }
  | { type: 'SET_DASHBOARD_SEARCH'; payload: string }
  | { type: 'SET_GLOBAL_SEARCH'; payload: string }
  | { type: 'SET_DATE_RANGE'; payload: DateRange }
  | { type: 'TOGGLE_CATEGORY'; payload: string }
  | { type: 'SAVE_DASHBOARD' }
  | { type: 'SAVE_COMPLETE' }
  | { type: 'EXPORT_DASHBOARD' }
  | { type: 'EXPORT_COMPLETE' }
  | { type: 'SHOW_DELETE_CONFIRM'; payload: string | null }
  | { type: 'SHOW_UNSAVED_WARNING'; payload: boolean }
  | { type: 'SET_PENDING_NAVIGATION'; payload: string | null }
  | { type: 'DISCARD_CHANGES_AND_NAVIGATE' }
  | { type: 'SET_TOAST'; payload: { message: string; type: 'success' | 'error' | 'info' } | null }
  | { type: 'APPLY_TEMPLATE'; payload: string }
  | { type: 'CLEAR_WIDGET_SELECTIONS' };

// ── Initial State ───────────────────────────────────────────

const initialState: AppState = {
  sidebarView: 'navigation',
  activeDashboardId: null,
  isEditMode: false,
  dashboards: [...SYSTEM_DASHBOARDS, ...SAVED_DASHBOARDS],
  widgetLibraryOpen: false,
  widgetCategories: INITIAL_CATEGORIES,
  selectedWidgetIds: [],
  previewWidgetId: null,
  widgetSearchQuery: '',
  dashboardSearchQuery: '',
  globalSearchQuery: '',
  dateRange: DEFAULT_DATE_RANGE,
  isLoading: false,
  isSaving: false,
  isExporting: false,
  hasUnsavedChanges: false,
  showDeleteConfirm: null,
  showUnsavedWarning: false,
  pendingNavigationId: null,
  toastMessage: null,
  toastType: 'info',
};

// ── Reducer ─────────────────────────────────────────────────

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_ACTIVE_DASHBOARD': {
      const dashboard = state.dashboards.find(d => d.id === action.payload);
      return {
        ...state,
        activeDashboardId: action.payload,
        selectedWidgetIds: dashboard ? [...dashboard.widgets] : [],
        widgetLibraryOpen: false,
        sidebarView: 'navigation',
        isEditMode: false,
      };
    }

    case 'SET_SIDEBAR_VIEW':
      return { ...state, sidebarView: action.payload };

    case 'TOGGLE_WIDGET_LIBRARY':
      return {
        ...state,
        widgetLibraryOpen: !state.widgetLibraryOpen,
        sidebarView: !state.widgetLibraryOpen ? 'widget-library' : 'navigation',
      };

    case 'CLOSE_WIDGET_LIBRARY':
      return { ...state, widgetLibraryOpen: false, sidebarView: 'navigation' };

    case 'ENTER_EDIT_MODE':
      return {
        ...state,
        isEditMode: true,
        sidebarView: 'widget-library',
        widgetLibraryOpen: true,
      };

    case 'EXIT_EDIT_MODE':
      return {
        ...state,
        isEditMode: false,
        sidebarView: 'navigation',
        widgetLibraryOpen: false,
      };

    case 'REORDER_WIDGETS': {
      const newOrder = action.payload;
      return {
        ...state,
        selectedWidgetIds: newOrder,
        dashboards: state.activeDashboardId
          ? state.dashboards.map(d =>
              d.id === state.activeDashboardId ? { ...d, widgets: newOrder, isDirty: true } : d
            )
          : state.dashboards,
        hasUnsavedChanges: true,
      };
    }

    case 'CREATE_DASHBOARD': {
      const newId = `new-${Date.now()}`;
      const newDashboard: Dashboard = {
        id: newId,
        name: 'New Dashboard',
        description: '',
        isSystem: false,
        widgets: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDirty: true,
      };
      return {
        ...state,
        dashboards: [...state.dashboards, newDashboard],
        activeDashboardId: newId,
        selectedWidgetIds: [],
        hasUnsavedChanges: true,
      };
    }

    case 'DELETE_DASHBOARD': {
      const filtered = state.dashboards.filter(d => d.id !== action.payload);
      return {
        ...state,
        dashboards: filtered,
        activeDashboardId: state.activeDashboardId === action.payload ? null : state.activeDashboardId,
        showDeleteConfirm: null,
        toastMessage: 'Dashboard deleted',
        toastType: 'success',
      };
    }

    case 'UPDATE_DASHBOARD_NAME': {
      return {
        ...state,
        dashboards: state.dashboards.map(d =>
          d.id === action.payload.id ? { ...d, name: action.payload.name, isDirty: true } : d
        ),
        hasUnsavedChanges: true,
      };
    }

    case 'UPDATE_DASHBOARD_DESCRIPTION': {
      return {
        ...state,
        dashboards: state.dashboards.map(d =>
          d.id === action.payload.id ? { ...d, description: action.payload.description, isDirty: true } : d
        ),
        hasUnsavedChanges: true,
      };
    }

    case 'TOGGLE_WIDGET_SELECTION': {
      const id = action.payload;
      const isSelected = state.selectedWidgetIds.includes(id);
      const newSelected = isSelected
        ? state.selectedWidgetIds.filter(wid => wid !== id)
        : [...state.selectedWidgetIds, id];
      
      // Also update the active dashboard's widgets
      const updatedDashboards = state.activeDashboardId
        ? state.dashboards.map(d =>
            d.id === state.activeDashboardId ? { ...d, widgets: newSelected, isDirty: true } : d
          )
        : state.dashboards;
      
      return {
        ...state,
        selectedWidgetIds: newSelected,
        dashboards: updatedDashboards,
        hasUnsavedChanges: true,
        previewWidgetId: !isSelected ? id : state.previewWidgetId,
      };
    }

    case 'ADD_WIDGETS_TO_DASHBOARD': {
      if (!state.activeDashboardId) return state;
      return {
        ...state,
        dashboards: state.dashboards.map(d =>
          d.id === state.activeDashboardId ? { ...d, widgets: [...state.selectedWidgetIds], isDirty: true } : d
        ),
        hasUnsavedChanges: true,
      };
    }

    case 'REMOVE_WIDGET_FROM_DASHBOARD': {
      const { dashboardId, widgetId } = action.payload;
      const newWidgets = state.selectedWidgetIds.filter(w => w !== widgetId);
      return {
        ...state,
        selectedWidgetIds: newWidgets,
        dashboards: state.dashboards.map(d =>
          d.id === dashboardId ? { ...d, widgets: newWidgets, isDirty: true } : d
        ),
        hasUnsavedChanges: true,
      };
    }

    case 'SET_PREVIEW_WIDGET':
      return { ...state, previewWidgetId: action.payload };

    case 'SET_WIDGET_SEARCH':
      return { ...state, widgetSearchQuery: action.payload };

    case 'SET_DASHBOARD_SEARCH':
      return { ...state, dashboardSearchQuery: action.payload };

    case 'SET_GLOBAL_SEARCH':
      return { ...state, globalSearchQuery: action.payload };

    case 'SET_DATE_RANGE':
      return { ...state, dateRange: action.payload };

    case 'TOGGLE_CATEGORY':
      return {
        ...state,
        widgetCategories: state.widgetCategories.map(c =>
          c.id === action.payload ? { ...c, isExpanded: !c.isExpanded } : c
        ),
      };

    case 'SAVE_DASHBOARD':
      return { ...state, isSaving: true };

    case 'SAVE_COMPLETE':
      return {
        ...state,
        isSaving: false,
        hasUnsavedChanges: false,
        dashboards: state.dashboards.map(d =>
          d.id === state.activeDashboardId ? { ...d, isDirty: false, updatedAt: new Date().toISOString() } : d
        ),
        toastMessage: 'Dashboard saved successfully',
        toastType: 'success',
      };

    case 'EXPORT_DASHBOARD':
      return { ...state, isExporting: true };

    case 'EXPORT_COMPLETE':
      return {
        ...state,
        isExporting: false,
        toastMessage: 'Dashboard exported successfully',
        toastType: 'success',
      };

    case 'SHOW_DELETE_CONFIRM':
      return { ...state, showDeleteConfirm: action.payload };

    case 'SHOW_UNSAVED_WARNING':
      return { ...state, showUnsavedWarning: action.payload };

    case 'SET_PENDING_NAVIGATION':
      return { ...state, pendingNavigationId: action.payload };

    case 'DISCARD_CHANGES_AND_NAVIGATE': {
      const targetId = state.pendingNavigationId;
      const dashboard = state.dashboards.find(d => d.id === targetId);
      return {
        ...state,
        activeDashboardId: targetId,
        selectedWidgetIds: dashboard ? [...dashboard.widgets] : [],
        hasUnsavedChanges: false,
        showUnsavedWarning: false,
        pendingNavigationId: null,
        widgetLibraryOpen: false,
        sidebarView: 'navigation',
      };
    }

    case 'SET_TOAST':
      return {
        ...state,
        toastMessage: action.payload?.message ?? null,
        toastType: action.payload?.type ?? 'info',
      };

    case 'APPLY_TEMPLATE': {
      const template = DASHBOARD_TEMPLATES.find(t => t.id === action.payload);
      if (!template || !state.activeDashboardId) return state;
      return {
        ...state,
        selectedWidgetIds: [...template.widgetIds],
        dashboards: state.dashboards.map(d =>
          d.id === state.activeDashboardId
            ? { ...d, widgets: [...template.widgetIds], isDirty: true }
            : d
        ),
        hasUnsavedChanges: true,
      };
    }

    case 'CLEAR_WIDGET_SELECTIONS':
      return { ...state, selectedWidgetIds: [], previewWidgetId: null };

    default:
      return state;
  }
}

// ── Context ─────────────────────────────────────────────────

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  // Computed helpers
  activeDashboard: Dashboard | null;
  systemDashboards: Dashboard[];
  savedDashboards: Dashboard[];
  filteredDashboards: { system: Dashboard[]; saved: Dashboard[] };
  getWidget: (id: string) => typeof ALL_WIDGETS[0] | undefined;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const activeDashboard = state.dashboards.find(d => d.id === state.activeDashboardId) ?? null;
  const systemDashboards = state.dashboards.filter(d => d.isSystem);
  const savedDashboards = state.dashboards.filter(d => !d.isSystem);

  const filteredDashboards = {
    system: systemDashboards.filter(d =>
      d.name.toLowerCase().includes(state.dashboardSearchQuery.toLowerCase())
    ),
    saved: savedDashboards.filter(d =>
      d.name.toLowerCase().includes(state.dashboardSearchQuery.toLowerCase())
    ),
  };

  const getWidget = useCallback((id: string) => ALL_WIDGETS.find(w => w.id === id), []);

  return (
    <AppContext.Provider value={{ state, dispatch, activeDashboard, systemDashboards, savedDashboards, filteredDashboards, getWidget }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}