import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, ComposedChart, FunnelChart, Funnel, LabelList,
} from 'recharts';

const COLORS = {
  navy: '#0a2333',
  teal: '#34d399',
  tealLight: '#a7f3d0',
  tealDark: '#065f46',
  slate: '#62748e',
  mint: '#6ee7b7',
  dark: '#152c3c',
  gray: '#cad5e2',
};

const FONT = { fontFamily: "'Cabin', sans-serif", fontSize: 11, fill: '#62748e' };

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
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={orderBreakdownData} barGap={2} barSize={24}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="day" tick={FONT} axisLine={false} tickLine={false} />
        <YAxis tick={FONT} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ fontFamily: "'Cabin', sans-serif", fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} cursor={{ fill: '#f9fafb', stroke: 'none' }} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontFamily: "'Cabin', sans-serif", fontSize: 12 }} />
        <Bar dataKey="entitlement" name="Entitlement Orders" stackId="a" fill={COLORS.teal} radius={[0, 0, 0, 0]} />
        <Bar dataKey="purchased" name="Purchased Orders" stackId="a" fill={COLORS.navy} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
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
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={reachData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="month" tick={FONT} axisLine={false} tickLine={false} />
        <YAxis tick={FONT} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ fontFamily: "'Cabin', sans-serif", fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} cursor={{ fill: '#f9fafb', stroke: 'none' }} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontFamily: "'Cabin', sans-serif", fontSize: 12 }} />
        <Line type="monotone" dataKey="eligible" name="Eligible" stroke={COLORS.gray} strokeWidth={2} dot={{ r: 4, fill: '#fff', stroke: COLORS.gray, strokeWidth: 2 }} />
        <Line type="monotone" dataKey="active" name="Active" stroke={COLORS.navy} strokeWidth={2} dot={{ r: 4, fill: '#fff', stroke: COLORS.navy, strokeWidth: 2 }} />
        <Line type="monotone" dataKey="new" name="New" stroke={COLORS.teal} strokeWidth={2} dot={{ r: 4, fill: '#fff', stroke: COLORS.teal, strokeWidth: 2 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ── User Engagement Funnel ───────────────────────────────
const funnelData = [
  { name: 'Eligible Users', value: 100, fill: COLORS.navy },
  { name: 'Active Users', value: 87, fill: COLORS.dark },
  { name: 'Users With Orders', value: 52, fill: COLORS.teal },
  { name: 'Repeat Users', value: 30, fill: COLORS.tealLight },
];

export function EngagementFunnelChart() {
  return (
    <div className="flex items-center gap-6 h-[200px]">
      <div className="flex-1 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip contentStyle={{ fontFamily: "'Cabin', sans-serif", fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} cursor={{ fill: '#f9fafb', stroke: 'none' }} />
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
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={budgetData} barGap={4} barSize={20}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="month" tick={FONT} axisLine={false} tickLine={false} />
        <YAxis tick={FONT} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(1)}k`} />
        <Tooltip contentStyle={{ fontFamily: "'Cabin', sans-serif", fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} cursor={{ fill: '#f9fafb', stroke: 'none' }} formatter={(v: number) => `$${v.toLocaleString()}`} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontFamily: "'Cabin', sans-serif", fontSize: 12 }} />
        <Bar dataKey="forecast" name="Forecast" fill={COLORS.tealLight} radius={[4, 4, 0, 0]} />
        <Bar dataKey="actual" name="Actual" fill={COLORS.navy} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Channel Distribution (Donut) ─────────────────────────
const channelData = [
  { name: 'WhatsApp', value: 45, color: COLORS.navy },
  { name: 'Phone', value: 25, color: COLORS.teal },
  { name: 'Email', value: 20, color: COLORS.tealLight },
  { name: 'Chat', value: 10, color: '#3b82f6' },
];

export function ChannelDistributionChart() {
  return (
    <div className="flex items-center gap-4 h-[200px]">
      <div className="flex-1 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={channelData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
              {channelData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ fontFamily: "'Cabin', sans-serif", fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} cursor={{ fill: '#f9fafb', stroke: 'none' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col gap-3 shrink-0 pr-2">
        {channelData.map(d => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
            <span className="font-['Cabin',sans-serif] text-[12px] text-[#0a2333]">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
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
        <XAxis dataKey="category" tick={FONT} axisLine={false} tickLine={false} />
        <YAxis yAxisId="left" tick={FONT} axisLine={false} tickLine={false} />
        <YAxis yAxisId="right" orientation="right" tick={FONT} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
        <Tooltip contentStyle={{ fontFamily: "'Cabin', sans-serif", fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} cursor={{ fill: '#f9fafb', stroke: 'none' }} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontFamily: "'Cabin', sans-serif", fontSize: 12 }} />
        <Bar yAxisId="left" dataKey="orders" name="Orders" fill={COLORS.navy} radius={[4, 4, 0, 0]} barSize={32} />
        <Line yAxisId="right" type="monotone" dataKey="gmv" name="GMV" stroke={COLORS.teal} strokeWidth={2} dot={{ r: 4, fill: '#fff', stroke: COLORS.teal, strokeWidth: 2 }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

// ── Entitlement Utilization (Horizontal Bars) ────────────
const utilizationData = [
  { name: 'Airport Transfer', icon: '✈️', value: 64, color: COLORS.navy },
  { name: 'Airport Transfer', icon: '🚗', value: 64, color: COLORS.navy },
  { name: 'Fast track', icon: '🚀', value: 92, color: COLORS.teal },
  { name: 'Wellness', icon: '💆', value: 45, color: '#f59e0b' },
  { name: 'Wellness', icon: '🍽️', value: 76, color: COLORS.tealDark },
];

export function EntitlementUtilizationChart() {
  return (
    <div className="flex flex-col gap-3">
      {utilizationData.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-[14px] w-5 text-center shrink-0">{item.icon}</span>
          <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] w-[120px] shrink-0">{item.name}</span>
          <div className="flex-1 h-3 bg-[#f1f5f9] rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
          </div>
          <span className="font-['Cabin',sans-serif] font-medium text-[13px] text-[#0a2333] w-[36px] text-right shrink-0">{item.value}%</span>
        </div>
      ))}
    </div>
  );
}

// ── Entitlement Value Utilization (Gauge/Donut) ──────────
export function EntitlementValueChart() {
  const used = 1800;
  const total = 2700;
  const pct = ((used / total) * 100).toFixed(1);
  const gaugeData = [
    { name: 'Used', value: used, color: COLORS.teal },
    { name: 'Remaining', value: total - used, color: '#f1f5f9' },
  ];

  return (
    <div className="flex flex-col items-center gap-1 h-[200px] justify-center">
      <div className="relative w-[160px] h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={gaugeData} cx="50%" cy="50%" innerRadius={55} outerRadius={72} startAngle={90} endAngle={-270} paddingAngle={0} dataKey="value" stroke="none">
              {gaugeData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-['Cabin',sans-serif] font-bold text-[28px] text-[#34d399]">{pct}%</span>
        </div>
      </div>
      <span className="font-['Cabin',sans-serif] text-[12px] text-[#62748e]">${used.toLocaleString()} of ${total.toLocaleString()} allocated</span>
    </div>
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
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={revenueTrendData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="month" tick={FONT} axisLine={false} tickLine={false} />
        <YAxis tick={FONT} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
        <Tooltip contentStyle={{ fontFamily: "'Cabin', sans-serif", fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} cursor={{ fill: '#f9fafb', stroke: 'none' }} formatter={(v: number) => `$${v.toLocaleString()}`} />
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.teal} stopOpacity={0.2} />
            <stop offset="95%" stopColor={COLORS.teal} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="revenue" name="Revenue" stroke={COLORS.teal} strokeWidth={2} fill="url(#revenueGradient)" dot={{ r: 4, fill: '#fff', stroke: COLORS.teal, strokeWidth: 2 }} />
      </AreaChart>
    </ResponsiveContainer>
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
