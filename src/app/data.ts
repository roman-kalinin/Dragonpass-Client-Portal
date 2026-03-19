// ============================================================
// Dashboard Builder - Mock Data & Initial State
// ============================================================

import { Widget, WidgetCategory, Dashboard, DateRange } from './types';

// ── Widget Definitions ──────────────────────────────────────

export const ALL_WIDGETS: Widget[] = [
  // Overview Category
  { id: 'w-eligible-members', name: 'Eligible Members', description: 'Total count of members eligible for program benefits', type: 'KPI', category: 'overview', mockValue: '12.4K', mockSubtext: 'Total eligible users', mockTrend: 2.3 },
  { id: 'w-total-orders', name: 'Total Orders', description: 'Cumulative order count across all channels', type: 'KPI', category: 'overview', mockValue: '5.2K', mockSubtext: 'Total orders placed', mockTrend: 5.1 },
  { id: 'w-active-members', name: 'Active Members', description: 'Members who logged in within the last 30 days', type: 'KPI', category: 'overview', mockValue: '8.9K', mockSubtext: 'Currently active users', mockTrend: -1.5 },
  { id: 'w-fcr', name: 'FCR', description: 'First contact resolution rate for support tickets', type: 'KPI', category: 'overview', mockValue: '87.3%', mockSubtext: 'Resolution rate', mockTrend: 1.2 },
  { id: 'w-dau', name: 'DAU', description: 'Daily active users across all platform touchpoints', type: 'KPI', category: 'overview', mockValue: '3.1K', mockSubtext: 'Daily active users', mockTrend: -0.8 },
  { id: 'w-order-breakdown', name: 'Order Breakdown', description: 'Orders segmented by type, channel, and status', type: 'CHART', category: 'overview' },
  { id: 'w-orders-by-category', name: 'Orders by Category', description: 'Order distribution across product and service categories', type: 'CHART', category: 'overview' },

  // Financial Category
  { id: 'w-gmv', name: 'GMV', description: 'Gross merchandise value across all transactions', type: 'KPI', category: 'financial', mockValue: '£2.4M', mockSubtext: 'Gross merchandise value', mockTrend: 8.2 },
  { id: 'w-revenue', name: 'Revenue', description: 'Total revenue from all sources', type: 'KPI', category: 'financial', mockValue: '£1.8M', mockSubtext: 'Total revenue', mockTrend: 6.5 },
  { id: 'w-arpu', name: 'ARPU', description: 'Average revenue per user per month', type: 'KPI', category: 'financial', mockValue: '£24.50', mockSubtext: 'Avg revenue per user', mockTrend: 3.1 },
  { id: 'w-ltv', name: 'LTV', description: 'Customer lifetime value estimate', type: 'KPI', category: 'financial', mockValue: '£340', mockSubtext: 'Lifetime value', mockTrend: 4.7 },
  { id: 'w-cac', name: 'CAC', description: 'Customer acquisition cost', type: 'KPI', category: 'financial', mockValue: '£18.20', mockSubtext: 'Acquisition cost', mockTrend: -2.1 },
  { id: 'w-margin', name: 'Margin', description: 'Gross profit margin percentage', type: 'KPI', category: 'financial', mockValue: '34.2%', mockSubtext: 'Gross margin', mockTrend: 1.8 },
  { id: 'w-refund-rate', name: 'Refund Rate', description: 'Percentage of orders refunded', type: 'KPI', category: 'financial', mockValue: '2.1%', mockSubtext: 'Refund rate', mockTrend: -0.3 },
  { id: 'w-revenue-trend', name: 'Revenue Trend', description: 'Monthly revenue over time', type: 'CHART', category: 'financial' },
  { id: 'w-revenue-by-channel', name: 'Revenue by Channel', description: 'Revenue breakdown by sales channel', type: 'CHART', category: 'financial' },
  { id: 'w-cost-breakdown', name: 'Cost Breakdown', description: 'Operational cost distribution', type: 'CHART', category: 'financial' },
  { id: 'w-profit-loss', name: 'Profit & Loss', description: 'Monthly profit and loss statement', type: 'TABLE', category: 'financial' },
  { id: 'w-transaction-log', name: 'Transaction Log', description: 'Recent transactions with details', type: 'TABLE', category: 'financial' },

  // Member Engagement Category
  { id: 'w-engagement-rate', name: 'Engagement Rate', description: 'User engagement rate across platform', type: 'KPI', category: 'member-engagement', mockValue: '71.6%', mockSubtext: 'User engagement rate', mockTrend: 2.4 },
  { id: 'w-session-duration', name: 'Avg Session Duration', description: 'Average time users spend per session', type: 'KPI', category: 'member-engagement', mockValue: '8m 42s', mockSubtext: 'Avg session time', mockTrend: 1.1 },
  { id: 'w-retention', name: 'Retention Rate', description: '30-day user retention rate', type: 'KPI', category: 'member-engagement', mockValue: '68.4%', mockSubtext: '30-day retention', mockTrend: 0.7 },
  { id: 'w-churn', name: 'Churn Rate', description: 'Monthly user churn percentage', type: 'KPI', category: 'member-engagement', mockValue: '4.2%', mockSubtext: 'Monthly churn', mockTrend: -0.5 },
  { id: 'w-nps', name: 'NPS Score', description: 'Net Promoter Score', type: 'KPI', category: 'member-engagement', mockValue: '72', mockSubtext: 'Net promoter score', mockTrend: 3.0 },
  { id: 'w-entitlement-util', name: 'Entitlement Utilization', description: 'Entitlement usage rate', type: 'KPI', category: 'member-engagement', mockValue: '67.3%', mockSubtext: 'Entitlement usage rate', mockTrend: 1.9 },
  { id: 'w-satisfaction', name: 'Customer Satisfaction', description: 'Average satisfaction score', type: 'KPI', category: 'member-engagement', mockValue: '4.5/5', mockSubtext: 'Average satisfaction score', mockTrend: 0.2 },
  { id: 'w-engagement-funnel', name: 'Engagement Funnel', description: 'User journey funnel visualization', type: 'CHART', category: 'member-engagement' },
  { id: 'w-cohort-analysis', name: 'Cohort Analysis', description: 'User cohort retention over time', type: 'TABLE', category: 'member-engagement' },
  { id: 'w-activity-summary', name: 'Monthly Activity Summary', description: 'Comprehensive monthly activity metrics', type: 'TABLE', category: 'member-engagement' },

  // Program Performance
  { id: 'w-program-roi', name: 'Program ROI', description: 'Return on investment for loyalty programs', type: 'KPI', category: 'program-performance', mockValue: '312%', mockSubtext: 'Program ROI', mockTrend: 12.5 },
  { id: 'w-redemption-rate', name: 'Redemption Rate', description: 'Points/rewards redemption percentage', type: 'KPI', category: 'program-performance', mockValue: '54.8%', mockSubtext: 'Redemption rate', mockTrend: 3.2 },
  { id: 'w-tier-distribution', name: 'Tier Distribution', description: 'Member distribution across program tiers', type: 'CHART', category: 'program-performance' },
  { id: 'w-points-economy', name: 'Points Economy', description: 'Points earned vs redeemed over time', type: 'CHART', category: 'program-performance' },
  { id: 'w-partner-performance', name: 'Partner Performance', description: 'Performance metrics by partner', type: 'TABLE', category: 'program-performance' },
  { id: 'w-conversion-rate', name: 'Conversion Rate', description: 'Program signup conversion rate', type: 'KPI', category: 'program-performance', mockValue: '19.5%', mockSubtext: 'Conversion rate', mockTrend: 1.8 },
  { id: 'w-points-balance', name: 'Points Balance', description: 'Total outstanding points liability', type: 'KPI', category: 'program-performance', mockValue: '£890K', mockSubtext: 'Points liability', mockTrend: 5.4 },
  { id: 'w-program-cost', name: 'Program Cost', description: 'Total program operational cost', type: 'KPI', category: 'program-performance', mockValue: '£125K', mockSubtext: 'Operational cost', mockTrend: -1.2 },
  { id: 'w-benefit-usage', name: 'Benefit Usage', description: 'Benefit utilization by type', type: 'CHART', category: 'program-performance' },

  // Supply
  { id: 'w-inventory', name: 'Inventory Level', description: 'Current inventory status', type: 'KPI', category: 'supply', mockValue: '94.2%', mockSubtext: 'Stock level', mockTrend: -0.8 },
  { id: 'w-fulfillment', name: 'Fulfillment Rate', description: 'Order fulfillment success rate', type: 'KPI', category: 'supply', mockValue: '97.8%', mockSubtext: 'Fulfillment rate', mockTrend: 0.3 },
  { id: 'w-supplier-perf', name: 'Supplier Performance', description: 'Supplier delivery metrics', type: 'TABLE', category: 'supply' },
  { id: 'w-stock-alerts', name: 'Stock Alerts', description: 'Low stock and reorder notifications', type: 'TABLE', category: 'supply' },
  { id: 'w-supply-chain', name: 'Supply Chain Overview', description: 'End-to-end supply chain visualization', type: 'CHART', category: 'supply' },
];

export const INITIAL_CATEGORIES: WidgetCategory[] = [
  { id: 'overview', name: 'Overview', widgets: ALL_WIDGETS.filter(w => w.category === 'overview'), isExpanded: true },
  { id: 'financial', name: 'Financial', widgets: ALL_WIDGETS.filter(w => w.category === 'financial'), isExpanded: false },
  { id: 'member-engagement', name: 'Member Engagement', widgets: ALL_WIDGETS.filter(w => w.category === 'member-engagement'), isExpanded: false },
  { id: 'program-performance', name: 'Program Performance', widgets: ALL_WIDGETS.filter(w => w.category === 'program-performance'), isExpanded: false },
  { id: 'supply', name: 'Supply', widgets: ALL_WIDGETS.filter(w => w.category === 'supply'), isExpanded: false },
];

// ── System Dashboards ───────────────────────────────────────

export const SYSTEM_DASHBOARDS: Dashboard[] = [
  { id: 'sys-overview', name: 'Overview', description: 'High-level business overview', isSystem: true, widgets: ['w-eligible-members', 'w-active-members', 'w-total-orders', 'w-gmv'], createdAt: '2025-01-01', updatedAt: '2025-03-01', isDirty: false },
  { id: 'sys-financial', name: 'Financial', description: 'Financial metrics and reports', isSystem: true, widgets: ['w-gmv', 'w-revenue', 'w-arpu', 'w-margin', 'w-revenue-trend'], createdAt: '2025-01-01', updatedAt: '2025-03-01', isDirty: false },
  { id: 'sys-engagement', name: 'User Engagement', description: 'User engagement analytics', isSystem: true, widgets: ['w-engagement-rate', 'w-session-duration', 'w-retention', 'w-nps'], createdAt: '2025-01-01', updatedAt: '2025-03-01', isDirty: false },
  { id: 'sys-program', name: 'Program Performance', description: 'Loyalty program metrics', isSystem: true, widgets: ['w-program-roi', 'w-redemption-rate', 'w-tier-distribution'], createdAt: '2025-01-01', updatedAt: '2025-03-01', isDirty: false },
  { id: 'sys-supply', name: 'Supply', description: 'Supply chain overview', isSystem: true, widgets: ['w-inventory', 'w-fulfillment', 'w-supplier-perf'], createdAt: '2025-01-01', updatedAt: '2025-03-01', isDirty: false },
];

export const SAVED_DASHBOARDS: Dashboard[] = [
  { id: 'saved-1', name: 'Program Performance', description: 'Custom program view', isSystem: false, widgets: ['w-program-roi', 'w-redemption-rate', 'w-conversion-rate'], createdAt: '2025-02-10', updatedAt: '2025-02-28', isDirty: false },
  { id: 'saved-2', name: 'Supply', description: 'Supply metrics', isSystem: false, widgets: ['w-inventory', 'w-fulfillment'], createdAt: '2025-02-15', updatedAt: '2025-02-20', isDirty: false },
];

export const DATE_RANGES: DateRange[] = [
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last 90 Days', value: '90d' },
  { label: 'Last 12 Months', value: '12m' },
  { label: 'Year to Date', value: 'ytd' },
  { label: 'Custom Range', value: 'custom' },
];

export const DEFAULT_DATE_RANGE: DateRange = { label: 'Last 30 Days', value: '30d' };

// ── Table Mock Data ─────────────────────────────────────────

export const MONTHLY_ACTIVITY_DATA = [
  { month: '2025-02', newUsers: 1240, activeUsers: 8120, totalUsers: 12360, totalOrders: 420, entitlement: 1100, purchased: 780, value: '£180k', utilization: '70.9%', conversionRate: '18.2%' },
  { month: '2025-03', newUsers: 1310, activeUsers: 8430, totalUsers: 12740, totalOrders: 450, entitlement: 1150, purchased: 820, value: '£195k', utilization: '71.3%', conversionRate: '19.1%' },
  { month: '2025-04', newUsers: 1280, activeUsers: 8710, totalUsers: 13000, totalOrders: 480, entitlement: 1200, purchased: 860, value: '£210k', utilization: '71.7%', conversionRate: '19.5%' },
  { month: '2025-05', newUsers: 1350, activeUsers: 8980, totalUsers: 13330, totalOrders: 500, entitlement: 1250, purchased: 900, value: '£225k', utilization: '72.0%', conversionRate: '20.1%' },
  { month: '2025-06', newUsers: 1410, activeUsers: 9240, totalUsers: 13650, totalOrders: 520, entitlement: 1300, purchased: 940, value: '£240k', utilization: '72.3%', conversionRate: '20.6%' },
  { month: '2025-07', newUsers: 1480, activeUsers: 9500, totalUsers: 13980, totalOrders: 540, entitlement: 1350, purchased: 980, value: '£255k', utilization: '72.6%', conversionRate: '21.1%' },
];

// ── Template Definitions ────────────────────────────────────

export interface DashboardTemplate {
  id: string;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  widgetIds: string[];
}

export const DASHBOARD_TEMPLATES: DashboardTemplate[] = [
  {
    id: 'tmpl-executive',
    name: 'Executive Overview',
    description: 'High-level KPIs and trends',
    color: '#008236',
    bgColor: '#f0fdf4',
    widgetIds: ['w-eligible-members', 'w-active-members', 'w-engagement-rate', 'w-gmv', 'w-total-orders', 'w-entitlement-util', 'w-satisfaction'],
  },
  {
    id: 'tmpl-growth',
    name: 'Growth Tracking',
    description: 'User acquisition and retention',
    color: '#8200DB',
    bgColor: '#faf5ff',
    widgetIds: ['w-active-members', 'w-dau', 'w-retention', 'w-churn', 'w-engagement-funnel'],
  },
];
