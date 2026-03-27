import {
  ResponsiveContainer, FunnelChart, Funnel, LabelList, Tooltip,
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Legend,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  CHART_COLORS, CHART_FONT, TOOLTIP_STYLE, LEGEND_STYLE,
  SimpleBarChart, SimpleLineChart, SimpleAreaChart, DonutChart, HorizontalBars,
} from './ChartPrimitives';

// Re-export primitives for convenience
export { CHART_COLORS, SimpleBarChart, SimpleLineChart, SimpleAreaChart, DonutChart, HorizontalBars } from './ChartPrimitives';

// ── Order Breakdown (Stacked Bar) ────────────────────────
const orderBreakdownData = [
  { day: 'Mon', entitlement: 55, purchased: 15 },
  { day: 'Tue', entitlement: 60, purchased: 20 },
  { day: 'Wed', entitlement: 70, purchased: 25 },
  { day: 'Thu', entitlement: 85, purchased: 10 },
  { day: 'Fri', entitlement: 65, purchased: 30 },
  { day: 'Sat', entitlement: 50, purchased: 15 },
  { day: 'Sun', entitlement: 40, purchased: 10 },
];

export function OrderBreakdownChart() {
  return (
    <SimpleBarChart
      data={orderBreakdownData}
      xKey="day"
      bars={[
        { dataKey: 'entitlement', name: 'Entitlement Orders', fill: CHART_COLORS.teal, stackId: 'a' },
        { dataKey: 'purchased', name: 'Purchased Orders', fill: CHART_COLORS.navy, stackId: 'a' },
      ]}
    />
  );
}

// ── Program Reach & Adoption (Multi-line) ────────────────
const reachData = [
  { month: 'Jan', eligible: 3200, active: 2800, new: 180 },
  { month: 'Feb', eligible: 3400, active: 3100, new: 220 },
  { month: 'Mar', eligible: 3800, active: 3400, new: 350 },
  { month: 'Apr', eligible: 4200, active: 3600, new: 280 },
  { month: 'May', eligible: 4800, active: 3500, new: 400 },
  { month: 'Jun', eligible: 5200, active: 3900, new: 450 },
];

export function ProgramReachChart() {
  return (
    <SimpleLineChart
      data={reachData}
      xKey="month"
      lines={[
        { dataKey: 'eligible', name: 'Eligible', stroke: CHART_COLORS.gray },
        { dataKey: 'active', name: 'Active', stroke: CHART_COLORS.navy },
        { dataKey: 'new', name: 'New', stroke: CHART_COLORS.teal },
      ]}
    />
  );
}

// ── User Engagement Funnel ───────────────────────────────
const funnelData = [
  { name: 'Eligible Users', value: 100, fill: CHART_COLORS.navy },
  { name: 'Active Users', value: 87, fill: CHART_COLORS.dark },
  { name: 'Users With Orders', value: 52, fill: CHART_COLORS.teal },
  { name: 'Repeat Users', value: 30, fill: CHART_COLORS.tealLight },
];

export function EngagementFunnelChart() {
  return (
    <div className="flex items-center gap-6 h-[200px]">
      <div className="flex-1 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip {...TOOLTIP_STYLE} />
            <Funnel dataKey="value" data={funnelData} isAnimationActive>
              <LabelList position="right" fill="#62748e" stroke="none" style={{ fontFamily: "'Cabin', sans-serif", fontSize: 11 }} />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col gap-2 shrink-0 pr-2">
        {funnelData.map(d => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="font-['Cabin',sans-serif] font-bold text-[13px]" style={{ color: d.fill }}>{d.value}%</span>
            <span className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Budget vs Actual (Grouped Bar) ───────────────────────
const budgetData = [
  { month: 'Jan', forecast: 2500, actual: 3000 },
  { month: 'Feb', forecast: 3000, actual: 3500 },
  { month: 'Mar', forecast: 5000, actual: 8500 },
  { month: 'Apr', forecast: 4000, actual: 3500 },
  { month: 'May', forecast: 6000, actual: 5500 },
  { month: 'Jun', forecast: 5500, actual: 4500 },
];

export function BudgetVsActualChart() {
  return (
    <SimpleBarChart
      data={budgetData}
      xKey="month"
      barSize={20}
      barGap={4}
      bars={[
        { dataKey: 'forecast', name: 'Forecast', fill: CHART_COLORS.tealLight },
        { dataKey: 'actual', name: 'Actual', fill: CHART_COLORS.navy },
      ]}
      yFormatter={v => `$${(v / 1000).toFixed(1)}k`}
      valueFormatter={v => `$${v.toLocaleString()}`}
    />
  );
}

// ── Channel Distribution (Donut) ─────────────────────────
const channelData = [
  { name: 'WhatsApp', value: 45, color: CHART_COLORS.navy },
  { name: 'Phone', value: 25, color: CHART_COLORS.teal },
  { name: 'Email', value: 20, color: CHART_COLORS.tealLight },
  { name: 'Chat', value: 10, color: '#3b82f6' },
];

export function ChannelDistributionChart() {
  return <DonutChart data={channelData} />;
}

// ── Orders & GMV by Category (Bar + Line Combo) ──────────
const categoryData = [
  { category: 'Lounge', orders: 1200, gmv: 45000 },
  { category: 'Hotel', orders: 3800, gmv: 125000 },
  { category: 'Flight', orders: 2200, gmv: 95000 },
  { category: 'Insurance', orders: 800, gmv: 35000 },
  { category: 'Car', orders: 600, gmv: 28000 },
];

export function OrdersGMVChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <ComposedChart data={categoryData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="category" tick={CHART_FONT} axisLine={false} tickLine={false} />
        <YAxis yAxisId="left" tick={CHART_FONT} axisLine={false} tickLine={false} />
        <YAxis yAxisId="right" orientation="right" tick={CHART_FONT} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
        <Tooltip {...TOOLTIP_STYLE} />
        <Legend {...LEGEND_STYLE} />
        <Bar yAxisId="left" dataKey="orders" name="Orders" fill={CHART_COLORS.navy} radius={[4, 4, 0, 0]} barSize={32} />
        <Line yAxisId="right" type="monotone" dataKey="gmv" name="GMV" stroke={CHART_COLORS.teal} strokeWidth={2} dot={{ r: 4, fill: '#fff', stroke: CHART_COLORS.teal, strokeWidth: 2 }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

// ── Entitlement Utilization (Horizontal Bars) ────────────
const utilizationData = [
  { name: 'Airport Transfer', icon: '✈️', value: 64, color: CHART_COLORS.navy },
  { name: 'Airport Transfer', icon: '🚗', value: 64, color: CHART_COLORS.navy },
  { name: 'Fast track', icon: '🚀', value: 92, color: CHART_COLORS.teal },
  { name: 'Wellness', icon: '💆', value: 45, color: '#f59e0b' },
  { name: 'Wellness', icon: '🍽️', value: 76, color: CHART_COLORS.tealDark },
];

export function EntitlementUtilizationChart() {
  return <HorizontalBars data={utilizationData} />;
}

// ── Entitlement Value Utilization (Gauge/Donut) ──────────
export function EntitlementValueChart() {
  const used = 1800;
  const total = 2700;
  const pct = ((used / total) * 100).toFixed(1);
  const gaugeData = [
    { name: 'Used', value: used, color: CHART_COLORS.teal },
    { name: 'Remaining', value: total - used, color: '#f1f5f9' },
  ];

  return (
    <DonutChart
      data={gaugeData}
      innerRadius={55}
      outerRadius={72}
      showLegend={false}
      centerLabel={
        <span className="font-['Cabin',sans-serif] font-bold text-[28px] text-[#34d399]">{pct}%</span>
      }
    />
  );
}

// ── Revenue Trend (Area Chart) ───────────────────────────
const revenueTrendData = [
  { month: 'Jan', revenue: 32000 },
  { month: 'Feb', revenue: 38000 },
  { month: 'Mar', revenue: 45000 },
  { month: 'Apr', revenue: 42000 },
  { month: 'May', revenue: 52000 },
  { month: 'Jun', revenue: 58000 },
];

export function RevenueTrendChart() {
  return (
    <SimpleAreaChart
      data={revenueTrendData}
      xKey="month"
      dataKey="revenue"
      name="Revenue"
      yFormatter={v => `$${(v / 1000).toFixed(0)}k`}
      valueFormatter={v => `$${v.toLocaleString()}`}
    />
  );
}

// ── Chart Resolver ───────────────────────────────────────
export function getChartForWidget(widgetId: string): React.ReactNode | null {
  switch (widgetId) {
    case 'w-order-breakdown': return <OrderBreakdownChart />;
    case 'w-orders-by-category': return <OrdersGMVChart />;
    case 'w-engagement-funnel': return <EngagementFunnelChart />;
    case 'w-revenue-trend': return <RevenueTrendChart />;
    case 'w-revenue-by-channel': return <ChannelDistributionChart />;
    case 'w-cost-breakdown': return <BudgetVsActualChart />;
    case 'w-tier-distribution': return <EntitlementValueChart />;
    case 'w-benefit-usage': return <EntitlementUtilizationChart />;
    case 'w-points-economy': return <ProgramReachChart />;
    case 'w-supply-chain': return <ProgramReachChart />;
    default: return null;
  }
}
