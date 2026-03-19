import { useState, useEffect } from 'react';
import { PageShell } from '../shared/PageShell';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { SettingsProductsTab } from './tabs/SettingsProductsTab';
import { SettingsCategoriesTab } from './tabs/SettingsCategoriesTab';
import { SettingsTeamTab } from './tabs/SettingsTeamTab';
import { DevelopersTab } from './tabs/DevelopersTab';
import { SettingsGeneralTab } from './tabs/SettingsGeneralTab';

interface SettingsPageProps {
  activeView: string;
  onNavigate: (id: string) => void;
}

export function SettingsPage({ activeView, onNavigate }: SettingsPageProps) {
  // Parse initial tab from activeView (e.g. "settings:categories")
  const subRoute = activeView.split(':')[1];
  const initialTab = ['products', 'categories', 'team', 'developers', 'general'].includes(subRoute) ? subRoute : 'developers';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync tab when activeView changes (e.g. navigating back from product detail to settings:categories)
  useEffect(() => {
    const sub = activeView.split(':')[1];
    if (sub && ['products', 'categories', 'team', 'developers', 'general'].includes(sub)) {
      setActiveTab(sub);
    }
  }, [activeView]);

  // Mark onboarding step 1 complete when Developers tab is viewed
  useEffect(() => {
    if (activeTab === 'developers') {
      try {
        const steps = JSON.parse(localStorage.getItem('dp_checklist_steps') || '[]') as string[];
        if (!steps.includes('review-keys')) {
          steps.push('review-keys');
          localStorage.setItem('dp_checklist_steps', JSON.stringify(steps));
        }
      } catch { /* ignore */ }
    }
  }, [activeTab]);

  // Mark onboarding step 3 complete when Categories tab is viewed
  useEffect(() => {
    if (activeTab === 'categories') {
      try {
        const steps = JSON.parse(localStorage.getItem('dp_checklist_steps') || '[]') as string[];
        if (!steps.includes('browse-catalog')) {
          steps.push('browse-catalog');
          localStorage.setItem('dp_checklist_steps', JSON.stringify(steps));
        }
      } catch { /* ignore */ }
    }
  }, [activeTab]);

  return (
    <PageShell activeView={activeView} onNavigate={onNavigate}>
      {/* Page header */}
      <div className="px-8 pt-5 shrink-0">
        <h1 className="font-['Cabin',sans-serif] font-bold text-[22px] text-[#0a2333]">Settings</h1>
        <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282] mt-0.5 mb-4">
          Manage your account, team, and developer settings
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-transparent h-auto border-b border-[#e5e7eb] rounded-none w-full justify-start gap-0 p-0 -mb-px">
            {[
              { value: 'products', label: 'Products' },
              { value: 'categories', label: 'Categories' },
              { value: 'team', label: 'Team' },
              { value: 'developers', label: 'Developers' },
              { value: 'general', label: 'General' },
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
        {activeTab === 'products' && <SettingsProductsTab />}
        {activeTab === 'categories' && <SettingsCategoriesTab onNavigate={onNavigate} />}
        {activeTab === 'team' && <SettingsTeamTab />}
        {activeTab === 'developers' && <DevelopersTab />}
        {activeTab === 'general' && <SettingsGeneralTab />}
      </div>
    </PageShell>
  );
}
