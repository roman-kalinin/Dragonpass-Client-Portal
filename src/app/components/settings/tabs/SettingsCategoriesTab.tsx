import { Plane, Building2, Sofa, Car, UtensilsCrossed, Zap, Smartphone, Ticket, Heart, ChevronRight } from 'lucide-react';
import { Card } from '../../shared/Card';
import { IconBox } from '../../shared/IconBox';
import { Badge } from '../../shared/Badge';

const categories = [
  { icon: Plane, name: 'Flights', slug: 'flights', active: true },
  { icon: Building2, name: 'Hotels', slug: 'hotels', active: true },
  { icon: Sofa, name: 'Airport Lounge', slug: 'airport-lounge', active: true },
  { icon: Car, name: 'Airport Transfer', slug: 'airport-transfer', active: true },
  { icon: UtensilsCrossed, name: 'Airport Dining', slug: 'airport-dining', active: false },
  { icon: Zap, name: 'Airport Fast Track', slug: 'fast-track', active: true },
  { icon: Smartphone, name: 'eSIMs', slug: 'esims', active: true },
  { icon: Ticket, name: 'Tickets', slug: 'tickets', active: false },
  { icon: Heart, name: 'Health & Wellness', slug: 'health-wellness', active: false },
];

interface SettingsCategoriesTabProps {
  onNavigate?: (id: string) => void;
}

export function SettingsCategoriesTab({ onNavigate }: SettingsCategoriesTabProps) {
  return (
    <div className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <Card key={cat.name} padding="sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <IconBox size="sm">
                    <Icon size={16} className="text-[#0a2333]" />
                  </IconBox>
                  <span className="font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a2333]">{cat.name}</span>
                </div>
                <Badge variant={cat.active ? 'confirmed' : 'available'}>
                  {cat.active ? 'ACTIVE' : 'INACTIVE'}
                </Badge>
              </div>
              <button
                onClick={() => onNavigate?.(`entitlements:product:${cat.slug}`)}
                className="inline-flex items-center gap-1 mt-3 ml-12 font-['Cabin',sans-serif] text-[12px] text-[#6a7282] hover:text-[#0a2333] transition-colors"
              >
                View Details
                <ChevronRight size={12} />
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
