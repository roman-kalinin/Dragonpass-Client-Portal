import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './store';
import { EnvironmentProvider } from './contexts/EnvironmentContext';
import { TopBar } from './components/TopBar';
import { IconNav } from './components/IconNav';
import { TestModeBanner } from './components/shared/TestModeBanner';
import { Sidebar } from './components/Sidebar';
import { WidgetLibrary } from './components/WidgetLibrary';
import { DashboardToolbar } from './components/DashboardToolbar';
import { DashboardCanvas } from './components/DashboardCanvas';
import { UnsavedChangesDialog, DeleteConfirmDialog } from './components/UnsavedChangesDialog';
import { Toast } from './components/Toast';
import { DocsLayout } from './components/docs/DocsLayout';
import { OrderManagementPage } from './components/orders/OrderManagementPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { EntitlementsPage } from './components/entitlements/EntitlementsPage';
import { AnalyticsPage } from './components/analytics/AnalyticsPage';
import { GettingStartedCard } from './components/dashboard/GettingStartedCard';
import { TestModeBadge } from './components/shared/TestModeBadge';
import { PageShell } from './components/shared/PageShell';
import { PageHeader } from './components/shared/PageHeader';
import { EmptyState } from './components/shared/EmptyState';
import { BookOpen, Users, LayoutGrid } from 'lucide-react';
import { AnalyticsSkeleton, DashboardSkeleton } from './components/shared/Skeleton';

function DashboardBuilder({ activeView, onNavigate }: { activeView: string; onNavigate: (id: string) => void }) {
  const { state } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f9fafb]">
      <TopBar />
      <TestModeBanner />

      <div className="flex flex-1 overflow-hidden">
        <IconNav activeView={activeView} onNavigate={onNavigate} />

        {!loading && state.sidebarView === 'navigation' && <Sidebar />}
        {!loading && state.sidebarView === 'widget-library' && <WidgetLibrary />}

        <div className="flex-1 flex flex-col overflow-hidden">
          {loading ? (
            <AnalyticsSkeleton />
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden w-full max-w-[1440px] mx-auto">
              <DashboardToolbar />
              <div className="flex-1 overflow-auto">
                <div className="px-6 pt-4">
                  <GettingStartedCard onNavigate={onNavigate} />
                </div>
                <DashboardCanvas />
              </div>
            </div>
          )}
        </div>
      </div>

      <UnsavedChangesDialog />
      <DeleteConfirmDialog />
      <Toast />

    </div>
  );
}

function DashboardComingSoonPage({ activeView, onNavigate }: { activeView: string; onNavigate: (id: string) => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageShell activeView={activeView} onNavigate={onNavigate}>
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <PageHeader title="Dashboard" description="Your personalized overview and insights">
            <TestModeBadge />
          </PageHeader>
          <div className="flex-1">
            <EmptyState
              icon={<LayoutGrid size={28} className="text-[#6a7282]" />}
              title="Dashboard — Coming Soon"
              description="Customizable dashboards and reporting tools will be available in a future release."
            />
          </div>
        </>
      )}
    </PageShell>
  );
}

function MembersPlaceholderPage({ activeView, onNavigate }: { activeView: string; onNavigate: (id: string) => void }) {
  return (
    <PageShell activeView={activeView} onNavigate={onNavigate}>
      <PageHeader title="Members" description="Manage your member base and engagement">
        <TestModeBadge />
      </PageHeader>
      <div className="flex-1">
        <EmptyState
          icon={<Users size={28} className="text-[#6a7282]" />}
          title="Members — Coming Soon"
          description="Member management and engagement tools will be available in a future release."
        />
      </div>
    </PageShell>
  );
}

function AppShell({ activeView, onNavigate }: { activeView: string; onNavigate: (id: string) => void }) {
  const view = activeView.split(':')[0];
  switch (view) {
    case 'orders':
      return <OrderManagementPage activeView={activeView} onNavigate={onNavigate} />;
    case 'analytics':
      return <DashboardBuilder activeView={activeView} onNavigate={onNavigate} />;
    case 'entitlements':
      return <EntitlementsPage activeView={activeView} onNavigate={onNavigate} />;
    case 'settings':
      return <SettingsPage activeView={activeView} onNavigate={onNavigate} />;
    case 'members':
      return <MembersPlaceholderPage activeView={activeView} onNavigate={onNavigate} />;
    default:
      return <DashboardComingSoonPage activeView={activeView} onNavigate={onNavigate} />;
  }
}

export default function App() {
  const [showDocs, setShowDocs] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  if (showDocs) {
    return <DocsLayout onBack={() => setShowDocs(false)} />;
  }

  return (
    <EnvironmentProvider>
      <AppProvider>
        <AppShell
          activeView={activeView}
          onNavigate={setActiveView}
        />
        <button
          onClick={() => setShowDocs(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#0a2333] text-white rounded-xl px-4 py-3 shadow-lg hover:bg-[#152c3c] transition-colors cursor-pointer"
          title="View Developer Documentation"
        >
          <BookOpen size={16} />
          <span className="font-['Cabin',sans-serif] font-medium text-[13px]">Dev Docs</span>
        </button>
      </AppProvider>
    </EnvironmentProvider>
  );
}
