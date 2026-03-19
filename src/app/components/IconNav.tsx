import { LayoutGrid, ShoppingCart, BarChart3, KeyRound, Users, Settings } from 'lucide-react';

const navItems = [
  { icon: LayoutGrid, label: 'Dashboard', id: 'dashboard' },
  { icon: ShoppingCart, label: 'Orders', id: 'orders' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: KeyRound, label: 'Entitlements', id: 'entitlements' },
  { icon: Users, label: 'Members', id: 'members' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

interface IconNavProps {
  activeView?: string;
  onNavigate?: (id: string) => void;
}

export function IconNav({ activeView = 'dashboard', onNavigate }: IconNavProps) {
  const handleClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    }
  };

  const isActive = (id: string) => activeView === id || activeView.startsWith(id + ':');

  return (
    <div className="bg-white w-[73px] flex flex-col border-r border-[rgba(0,0,0,0.04)] shrink-0">
      {/* Top nav group */}
      <div className="flex flex-col items-center py-3 border-b border-dashed border-[#cad5e2]">
        {navItems.slice(0, 3).map(item => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`w-[52px] h-[52px] rounded-md flex items-center justify-center transition-colors ${
              isActive(item.id) ? 'bg-[#0a2333]' : 'hover:bg-gray-100'
            }`}
            title={item.label}
          >
            <item.icon
              size={16}
              className={isActive(item.id) ? 'text-white' : 'text-[#45556C]'}
            />
          </button>
        ))}
      </div>
      {/* Middle nav group */}
      <div className="flex flex-col items-center py-3 border-b border-dashed border-[#cad5e2]">
        {navItems.slice(3, 5).map(item => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`w-[52px] h-[52px] rounded-md flex items-center justify-center transition-colors ${
              isActive(item.id) ? 'bg-[#0a2333]' : 'hover:bg-gray-100'
            }`}
            title={item.label}
          >
            <item.icon
              size={16}
              className={isActive(item.id) ? 'text-white' : 'text-[#45556C]'}
            />
          </button>
        ))}
      </div>
      {/* Bottom */}
      <div className="flex-1" />
      <div className="flex flex-col items-center py-3 border-t border-dashed border-[#cad5e2]">
        <button
          onClick={() => handleClick('settings')}
          className={`w-[52px] h-[52px] rounded-md flex items-center justify-center transition-colors ${
            isActive('settings') ? 'bg-[#0a2333]' : 'hover:bg-gray-100'
          }`}
          title="Settings"
        >
          <Settings size={16} className={isActive('settings') ? 'text-white' : 'text-[#45556C]'} />
        </button>
      </div>
    </div>
  );
}
