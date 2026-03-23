import { Monitor, Globe, Puzzle, MessageCircle } from 'lucide-react';
import { Card } from '../../shared/Card';
import { IconBox } from '../../shared/IconBox';
import { Badge } from '../../shared/Badge';

const channels = [
  { icon: Monitor, name: 'Mobile App White Label', status: 'LIVE', description: 'Branded mobile application for your customers' },
  { icon: Globe, name: 'Website White Label', status: 'LIVE', description: 'Branded web portal for your customers' },
  { icon: Puzzle, name: 'API', status: 'INACTIVE', description: 'RESTful API for third-party integrations' },
  { icon: MessageCircle, name: 'Digital Concierge Chat', status: 'INACTIVE', description: 'AI-powered chat concierge service' },
];

const badgeVariant: Record<string, 'confirmed' | 'available' | 'pending'> = {
  LIVE: 'confirmed',
  INACTIVE: 'available',
  REQUESTED: 'pending',
};

export function SettingsProductsTab() {
  return (
    <div className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {channels.map(channel => {
          const Icon = channel.icon;
          return (
            <Card key={channel.name}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <IconBox>
                    <Icon size={18} className="text-[#0a2333]" />
                  </IconBox>
                  <div>
                    <h4 className="font-['Cabin',sans-serif] font-semibold text-[14px] text-[#0a2333]">{channel.name}</h4>
                    <Badge variant={badgeVariant[channel.status] || 'pending'}>{channel.status}</Badge>
                  </div>
                </div>
              </div>
              <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282]">{channel.description}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
