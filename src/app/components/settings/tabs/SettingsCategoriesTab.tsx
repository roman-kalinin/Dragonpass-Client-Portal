import { Plane, Building2, Sofa, Car, UtensilsCrossed, Zap, Smartphone, Ticket, Heart, ChevronRight } from 'lucide-react';

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
            <div key={cat.name} className="bg-white rounded-xl border border-[#e5e7eb] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#f1f5f9] flex items-center justify-center">
                    <Icon size={16} className="text-[#0a2333]" />
                  </div>
                  <span className="font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a2333]">{cat.name}</span>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-['Cabin',sans-serif] ${
                  cat.active ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#f3f4f6] text-[#374151]'
                }`}>
                  {cat.active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
              <button
                onClick={() => onNavigate?.(`entitlements:product:${cat.slug}`)}
                className="inline-flex items-center gap-1 mt-3 ml-12 font-['Cabin',sans-serif] text-[12px] text-[#6a7282] hover:text-[#0a2333] transition-colors"
              >
                View Details
                <ChevronRight size={12} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
