import { useState } from 'react';
import { ArrowLeft, Package, Key, ToggleLeft, LayoutDashboard } from 'lucide-react';
import type { FlowTab } from './types';
import { FlowViewer } from './FlowViewer';
import { benefitsFrames } from './flows/BenefitsFlow';
import { apiKeysFrames } from './flows/ApiKeysFlow';
import { environmentFrames } from './flows/EnvironmentFlow';
import { dashboardFrames } from './flows/DashboardFlow';

const tabs: FlowTab[] = [
  { id: 'benefits', label: 'Benefits', icon: Package, frames: benefitsFrames },
  { id: 'api-keys', label: 'API Keys', icon: Key, frames: apiKeysFrames },
  { id: 'environment', label: 'Environment', icon: ToggleLeft, frames: environmentFrames },
  { id: 'dashboard', label: 'Dashboard Builder', icon: LayoutDashboard, frames: dashboardFrames },
];

export function DocsLayout({ onBack }: { onBack: () => void }) {
  const [activeTabId, setActiveTabId] = useState('benefits');
  const activeTab = tabs.find(t => t.id === activeTabId) ?? tabs[0];

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f9fafb]">
      {/* Header */}
      <div className="shrink-0 bg-white border-b border-[#e5e7eb]">
        <div className="px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors"
          >
            <ArrowLeft size={14} className="text-[#0a2333]" />
          </button>
          <div>
            <h1 className="font-['Cabin',sans-serif] font-bold text-[18px] text-[#0a2333]">
              Dragonpass — Design Handoff
            </h1>
            <p className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282]">
              Flow documentation · Component states · Visual reference
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 flex gap-0">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`cursor-pointer flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors font-['Cabin',sans-serif] text-[13px] ${
                  isActive
                    ? 'border-[#0a2333] text-[#0a2333] font-semibold'
                    : 'border-transparent text-[#6a7282] hover:text-[#0a2333]'
                }`}
              >
                <Icon size={14} />
                {tab.label}
                <span className={`ml-1 text-[10px] tabular-nums ${isActive ? 'text-[#0a2333]/50' : 'text-[#9ca3af]'}`}>
                  {tab.frames.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <FlowViewer frames={activeTab.frames} />
    </div>
  );
}
