import { useState } from 'react';
import { BookOpen, Layers, GitBranch, AlertTriangle, MousePointer, Shield, ArrowLeft } from 'lucide-react';
import { DocArchitecture } from './DocArchitecture';
import { DocStates } from './DocStates';
import { DocFlows } from './DocFlows';
import { DocEdgeCases } from './DocEdgeCases';
import { DocInteractions } from './DocInteractions';
import { DocErrorsA11y } from './DocErrorsA11y';

const tabs = [
  { id: 'architecture', label: 'Architecture', icon: Layers },
  { id: 'states', label: 'States & Transitions', icon: GitBranch },
  { id: 'flows', label: 'User Flows', icon: BookOpen },
  { id: 'edge-cases', label: 'Edge Cases & Missing States', icon: AlertTriangle },
  { id: 'interactions', label: 'Interaction Specs', icon: MousePointer },
  { id: 'errors-a11y', label: 'Errors, A11y & Performance', icon: Shield },
];

export function DocsLayout({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('architecture');

  const renderContent = () => {
    switch (activeTab) {
      case 'architecture': return <DocArchitecture />;
      case 'states': return <DocStates />;
      case 'flows': return <DocFlows />;
      case 'edge-cases': return <DocEdgeCases />;
      case 'interactions': return <DocInteractions />;
      case 'errors-a11y': return <DocErrorsA11y />;
      default: return <DocArchitecture />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#f8fafc] overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-[#e2e8f0] px-8 py-5 flex items-center gap-6 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[14px] font-['Cabin',sans-serif] text-[#62748e] hover:text-[#0a2333] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to App
        </button>
        <div className="w-px h-6 bg-[#e2e8f0]" />
        <div>
          <h1 className="font-['Cabin',sans-serif] font-bold text-[22px] text-[#0a2333] leading-tight">
            Dashboard Builder — Developer Documentation
          </h1>
          <p className="font-['Cabin',sans-serif] text-[13px] text-[#62748e] mt-0.5">
            Comprehensive state & behavior specification · Visual reference for implementation
          </p>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-[#008236]" />
          <span className="font-['Cabin',sans-serif] text-[12px] text-[#008236] font-medium">
            15 states implemented · 0 missing
          </span>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="bg-white border-b border-[#e2e8f0] px-8 flex gap-1 shrink-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors font-['Cabin',sans-serif] text-[13px] font-medium ${
              activeTab === tab.id
                ? 'border-[#0a2333] text-[#0a2333]'
                : 'border-transparent text-[#62748e] hover:text-[#0a2333] hover:border-[#cad5e2]'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}
