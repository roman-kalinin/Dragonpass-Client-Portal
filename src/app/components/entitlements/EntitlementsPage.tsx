import { useState } from 'react';
import { PageShell } from '../shared/PageShell';
import { TestModeBadge } from '../shared/TestModeBadge';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { ActiveEntitlementsTab } from './tabs/ActiveEntitlementsTab';
import { EntitlementsPerformanceTab } from './tabs/EntitlementsPerformanceTab';
import { ProductDetailView } from './ProductDetailView';
import { EntitlementManageSheet } from './EntitlementManageSheet';

interface EntitlementsPageProps {
  activeView: string;
  onNavigate: (id: string) => void;
}

export function EntitlementsPage({ activeView, onNavigate }: EntitlementsPageProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'performance'>('active');
  const [selectedEntitlementId, setSelectedEntitlementId] = useState<string | null>(null);

  // Support deep-link: entitlements:product:slug
  const parts = activeView.split(':');
  const selectedProductSlug = parts[1] === 'product' ? parts[2] : null;

  if (selectedProductSlug) {
    return (
      <PageShell activeView={activeView} onNavigate={onNavigate}>
        <ProductDetailView
          slug={selectedProductSlug}
          onBack={() => onNavigate('settings:categories')}
          backLabel="Back to Categories"
        />
      </PageShell>
    );
  }

  return (
    <PageShell activeView={activeView} onNavigate={onNavigate}>
      {/* Page header */}
      <div className="px-8 pt-5 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="font-['Cabin',sans-serif] font-bold text-[22px] text-[#0a2333]">Entitlements</h1>
          <TestModeBadge />
        </div>
        <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282] mt-0.5 mb-4">
          Manage your product entitlements and service allocations
        </p>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="bg-transparent h-auto border-b border-[#e5e7eb] rounded-none w-full justify-start gap-0 p-0 -mb-px">
            {[
              { value: 'active', label: 'Active Entitlements' },
              { value: 'performance', label: 'Performance' },
            ].map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none border-0 border-b-2 border-b-transparent data-[state=active]:border-b-[#0a2333] data-[state=active]:bg-transparent data-[state=active]:shadow-none focus-visible:ring-0 focus-visible:outline-none px-4 py-2.5 font-['Cabin',sans-serif] text-[13px] text-[#6a7282] hover:text-[#0a2333] data-[state=active]:text-[#0a2333] data-[state=active]:font-semibold"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto px-8">
        {activeTab === 'active' && (
          <ActiveEntitlementsTab
            onManage={setSelectedEntitlementId}
            onBrowseCategories={() => onNavigate('settings:categories')}
          />
        )}
        {activeTab === 'performance' && (
          <EntitlementsPerformanceTab />
        )}
      </div>

      {/* Manage sheet */}
      <EntitlementManageSheet
        entitlementId={selectedEntitlementId}
        onClose={() => setSelectedEntitlementId(null)}
      />
    </PageShell>
  );
}
