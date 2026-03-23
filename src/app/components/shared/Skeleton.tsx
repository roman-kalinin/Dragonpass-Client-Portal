function Bone({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-[#e5e7eb] rounded animate-pulse ${className}`} />
  );
}

export function TableSkeleton({ rows = 6, cols = 7 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
      {/* Header */}
      <div className="flex gap-4 px-6 py-3 border-b border-[#e5e7eb]">
        {Array.from({ length: cols }).map((_, i) => (
          <Bone key={i} className="h-3 rounded-full" style={{ width: `${60 + Math.random() * 40}px` }} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 px-6 py-4 border-b border-[#f3f4f6] last:border-0">
          {Array.from({ length: cols }).map((_, c) => (
            <Bone key={c} className="h-3.5 rounded-full" style={{ width: `${50 + Math.random() * 60}px` }} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Bone2({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`bg-[#e5e7eb] rounded animate-pulse ${className}`} style={style} />;
}

export function OrdersSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-8 animate-in fade-in duration-300">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col gap-2">
          <Bone2 className="h-6 w-[140px] rounded-lg" />
          <Bone2 className="h-4 w-[280px] rounded-lg" />
        </div>
        <div className="flex gap-3">
          <Bone2 className="h-9 w-[120px] rounded-lg" />
          <Bone2 className="h-9 w-[100px] rounded-lg" />
        </div>
      </div>
      {/* Filter bar */}
      <div className="flex gap-3 mb-2">
        <Bone2 className="h-9 w-[240px] rounded-lg" />
        <Bone2 className="h-9 w-[100px] rounded-lg" />
        <Bone2 className="h-9 w-[100px] rounded-lg" />
      </div>
      {/* Table */}
      <TableSkeleton rows={8} cols={7} />
    </div>
  );
}

export function EntitlementsSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-8 animate-in fade-in duration-300">
      <div className="flex flex-col gap-2">
        <Bone2 className="h-6 w-[160px] rounded-lg" />
        <Bone2 className="h-4 w-[300px] rounded-lg" />
      </div>
      {/* Tab bar */}
      <div className="flex gap-6 border-b border-[#e5e7eb] pb-0">
        <Bone2 className="h-4 w-[80px] rounded-lg mb-3" />
        <Bone2 className="h-4 w-[100px] rounded-lg mb-3" />
        <Bone2 className="h-4 w-[90px] rounded-lg mb-3" />
      </div>
      {/* Cards grid */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#e5e7eb] p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Bone2 className="w-10 h-10 rounded-lg" />
              <div className="flex flex-col gap-1.5 flex-1">
                <Bone2 className="h-4 w-[70%] rounded-lg" />
                <Bone2 className="h-3 w-[50%] rounded-lg" />
              </div>
            </div>
            <Bone2 className="h-3 w-full rounded-lg" />
            <Bone2 className="h-3 w-[80%] rounded-lg" />
            <div className="flex justify-between mt-2">
              <Bone2 className="h-5 w-[60px] rounded-full" />
              <Bone2 className="h-8 w-[80px] rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnalyticsSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-6 animate-in fade-in duration-300">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Bone2 className="h-6 w-[180px] rounded-lg" />
          <Bone2 className="h-4 w-[260px] rounded-lg" />
        </div>
        <div className="flex gap-3">
          <Bone2 className="h-9 w-[130px] rounded-lg" />
          <Bone2 className="h-9 w-[80px] rounded-lg" />
          <Bone2 className="h-9 w-[80px] rounded-lg" />
        </div>
      </div>
      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#e5e7eb] p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Bone2 className="w-4 h-4 rounded" />
              <Bone2 className="h-3 w-[80px] rounded-lg" />
            </div>
            <Bone2 className="h-7 w-[100px] rounded-lg" />
            <Bone2 className="h-3 w-[60px] rounded-lg" />
            <Bone2 className="h-5 w-full rounded-lg mt-1" />
          </div>
        ))}
      </div>
      {/* Chart row */}
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#e5e7eb] p-4 flex flex-col gap-3">
            <Bone2 className="h-4 w-[140px] rounded-lg" />
            <Bone2 className="h-[180px] w-full rounded-lg" />
          </div>
        ))}
      </div>
      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-4 flex flex-col gap-3">
        <Bone2 className="h-4 w-[160px] rounded-lg" />
        <TableSkeleton rows={4} cols={6} />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-8 animate-in fade-in duration-300">
      <div className="flex flex-col gap-2">
        <Bone2 className="h-6 w-[140px] rounded-lg" />
        <Bone2 className="h-4 w-[240px] rounded-lg" />
      </div>
      {/* Getting started card */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 flex flex-col gap-3">
        <Bone2 className="h-5 w-[200px] rounded-lg" />
        <Bone2 className="h-3 w-[350px] rounded-lg" />
        <div className="flex gap-3 mt-2">
          <Bone2 className="h-9 w-[120px] rounded-lg" />
          <Bone2 className="h-9 w-[120px] rounded-lg" />
          <Bone2 className="h-9 w-[120px] rounded-lg" />
        </div>
      </div>
      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#e5e7eb] p-5 flex flex-col gap-3">
            <Bone2 className="h-4 w-[100px] rounded-lg" />
            <Bone2 className="h-8 w-[80px] rounded-lg" />
            <Bone2 className="h-3 w-[140px] rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
