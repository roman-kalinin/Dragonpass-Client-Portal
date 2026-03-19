// ============================================================
// Dashboard Builder - Type Definitions
// ============================================================

export type WidgetType = 'KPI' | 'CHART' | 'TABLE';

export interface Widget {
  id: string;
  name: string;
  description: string;
  type: WidgetType;
  category: string;
  /** Mock data for rendering preview */
  mockValue?: string;
  mockSubtext?: string;
  mockTrend?: number; // percentage, positive = up, negative = down
}

export interface WidgetCategory {
  id: string;
  name: string;
  widgets: Widget[];
  isExpanded: boolean;
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  widgets: string[]; // widget IDs
  createdAt: string;
  updatedAt: string;
  isDirty: boolean; // unsaved changes
}

export interface DateRange {
  label: string;
  value: string;
}

export type SidebarView = 'navigation' | 'widget-library';

export type DashboardState = 'empty' | 'building' | 'populated';

export interface AppState {
  // Navigation
  sidebarView: SidebarView;
  activeDashboardId: string | null;
  
  // Edit Mode
  isEditMode: boolean;
  
  // Dashboards
  dashboards: Dashboard[];
  
  // Widget Library
  widgetLibraryOpen: boolean;
  widgetCategories: WidgetCategory[];
  selectedWidgetIds: string[];
  previewWidgetId: string | null;
  widgetSearchQuery: string;
  
  // Dashboard config
  dashboardSearchQuery: string;
  globalSearchQuery: string;
  dateRange: DateRange;
  
  // UI states
  isLoading: boolean;
  isSaving: boolean;
  isExporting: boolean;
  hasUnsavedChanges: boolean;
  showDeleteConfirm: string | null; // dashboard id to delete
  showUnsavedWarning: boolean;
  pendingNavigationId: string | null;
  toastMessage: string | null;
  toastType: 'success' | 'error' | 'info';
}
