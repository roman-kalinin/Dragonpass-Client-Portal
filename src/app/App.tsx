import { useState } from 'react';
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
import { BookOpen, Users } from 'lucide-react';

function DashboardBuilder({ activeView, onNavigate, onShowDocs }: { activeView: string; onNavigate: (id: string) => void; onShowDocs: () => void }) {
  const { state } = useApp();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f9fafb]">
      <TopBar />
      <TestModeBanner />

      <div className="flex flex-1 overflow-hidden">
        <IconNav activeView={activeView} onNavigate={onNavigate} />

        {state.sidebarView === 'navigation' && <Sidebar />}
        {state.sidebarView === 'widget-library' && <WidgetLibrary />}

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden w-full max-w-[1440px] mx-auto">
            <DashboardToolbar />

            {/* Getting Started Card above canvas */}
            <div className="flex-1 overflow-auto">
              <div className="px-6 pt-4">
                <GettingStartedCard onNavigate={onNavigate} />
              </div>
              <DashboardCanvas />
            </div>
          </div>
        </div>
      </div>

      <UnsavedChangesDialog />
      <DeleteConfirmDialog />
      <Toast />

      <button
        onClick={onShowDocs}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-[#0a2333] text-white rounded-xl px-4 py-3 shadow-lg hover:bg-[#152c3c] transition-colors"
        title="View Developer Documentation"
      >
        <BookOpen size={16} />
        <span className="font-['Cabin',sans-serif] font-medium text-[13px]">Dev Docs</span>
      </button>
    </div>
  );
}

function MembersPlaceholderPage({ activeView, onNavigate }: { activeView: string; onNavigate: (id: string) => void }) {
  return (
    <PageShell activeView={activeView} onNavigate={onNavigate}>
      <div className="px-8 py-5 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="font-['Cabin',sans-serif] font-bold text-[22px] text-[#0a2333]">Members</h1>
          <TestModeBadge />
        </div>
        <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282] mt-0.5">
          Manage your member base and engagement
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-[400px]">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#f1f5f9] flex items-center justify-center mb-4">
            <Users size={28} className="text-[#6a7282]" />
          </div>
          <h2 className="font-['Cabin',sans-serif] font-bold text-[18px] text-[#0a2333] mb-2">
            Members — Coming Soon
          </h2>
          <p className="font-['Cabin',sans-serif] text-[14px] text-[#6a7282]">
            Member management and engagement tools will be available in a future release.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

function AppShell({ activeView, onNavigate, onShowDocs }: { activeView: string; onNavigate: (id: string) => void; onShowDocs: () => void }) {
  const view = activeView.split(':')[0];
  switch (view) {
    case 'orders':
      return <OrderManagementPage activeView={activeView} onNavigate={onNavigate} />;
    case 'analytics':
      return <AnalyticsPage activeView={activeView} onNavigate={onNavigate} />;
    case 'entitlements':
      return <EntitlementsPage activeView={activeView} onNavigate={onNavigate} />;
    case 'settings':
      return <SettingsPage activeView={activeView} onNavigate={onNavigate} />;
    case 'members':
      return <MembersPlaceholderPage activeView={activeView} onNavigate={onNavigate} />;
    default:
      return <DashboardBuilder activeView={activeView} onNavigate={onNavigate} onShowDocs={onShowDocs} />;
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
          onShowDocs={() => setShowDocs(true)}
        />
      </AppProvider>
    </EnvironmentProvider>
  );
}
