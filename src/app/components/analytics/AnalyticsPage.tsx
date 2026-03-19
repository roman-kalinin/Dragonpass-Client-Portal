import { PageShell } from '../shared/PageShell';
import { TestModeBadge } from '../shared/TestModeBadge';
import { AnalyticsEmptyState } from './AnalyticsEmptyState';

interface AnalyticsPageProps {
  activeView: string;
  onNavigate: (id: string) => void;
}

export function AnalyticsPage({ activeView, onNavigate }: AnalyticsPageProps) {
  return (
    <PageShell activeView={activeView} onNavigate={onNavigate}>
      <div className="px-8 py-5 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="font-['Cabin',sans-serif] font-bold text-[22px] text-[#0a2333]">Analytics</h1>
          <TestModeBadge />
        </div>
        <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282] mt-0.5">
          View performance metrics and trends across your products
        </p>
      </div>
      <AnalyticsEmptyState />
    </PageShell>
  );
}
