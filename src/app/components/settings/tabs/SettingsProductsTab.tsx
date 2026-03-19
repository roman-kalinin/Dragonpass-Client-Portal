import { Monitor, Globe, Puzzle, MessageCircle } from 'lucide-react';

const channels = [
  { icon: Monitor, name: 'Mobile App White Label', status: 'LIVE', description: 'Branded mobile application for your customers' },
  { icon: Globe, name: 'Website White Label', status: 'LIVE', description: 'Branded web portal for your customers' },
  { icon: Puzzle, name: 'API', status: 'INACTIVE', description: 'RESTful API for third-party integrations' },
  { icon: MessageCircle, name: 'Digital Concierge Chat', status: 'INACTIVE', description: 'AI-powered chat concierge service' },
];

const statusStyles: Record<string, string> = {
  LIVE: 'bg-[#dcfce7] text-[#166534]',
  INACTIVE: 'bg-[#f3f4f6] text-[#374151]',
  REQUESTED: 'bg-[#FEF3C7] text-[#92400E]',
};

export function SettingsProductsTab() {
  return (
    <div className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {channels.map(channel => {
          const Icon = channel.icon;
          return (
            <div key={channel.name} className="bg-white rounded-xl border border-[#e5e7eb] p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#f1f5f9] flex items-center justify-center">
                    <Icon size={18} className="text-[#0a2333]" />
                  </div>
                  <div>
                    <h4 className="font-['Cabin',sans-serif] font-semibold text-[14px] text-[#0a2333]">{channel.name}</h4>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-['Cabin',sans-serif] ${statusStyles[channel.status]}`}>
                      {channel.status}
                    </span>
                  </div>
                </div>
              </div>
              <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282]">{channel.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
