import { Search, Bell } from 'lucide-react';
import { useApp } from '../store';
import { useEnvironment } from '../contexts/EnvironmentContext';

function EnvironmentToggle() {
  const { environment, setEnvironment } = useEnvironment();

  return (
    <div className="flex items-center h-9 rounded-lg border border-[#e5e7eb] overflow-hidden">
      <button
        onClick={() => setEnvironment('production')}
        className={`cursor-pointer h-full px-3 text-[12px] font-['Cabin',sans-serif] font-medium transition-colors ${
          environment === 'production'
            ? 'bg-[#0a2333] text-white'
            : 'bg-white text-[#6a7282] hover:bg-[#f9fafb]'
        }`}
      >
        Production
      </button>
      <button
        onClick={() => setEnvironment('test')}
        className={`cursor-pointer h-full px-3 text-[12px] font-['Cabin',sans-serif] font-medium transition-colors ${
          environment === 'test'
            ? 'bg-[#FEF3C7] text-[#D97706] border-l border-[#F59E0B]'
            : 'bg-white text-[#6a7282] hover:bg-[#f9fafb] border-l border-[#e5e7eb]'
        }`}
      >
        Test
      </button>
    </div>
  );
}

export function TopBar() {
  const { state, dispatch } = useApp();

  return (
    <div className="bg-white flex h-16 items-center justify-between px-6 py-3.5 border-b border-[#e2e8f0] shrink-0 z-20">
      {/* Left: Logo + Search */}
      <div className="flex gap-6 items-center">
        <div className="w-[164px] shrink-0">
          <span className="font-['Cabin',sans-serif] font-bold text-[20px] text-[#1e2939]">
            Dragonpass
          </span>
          <span className="text-[#FB2C36] font-bold ml-0">&#x2022;</span>
        </div>
        <div className="relative h-9 w-[448px]">
          <div className="absolute left-2.5 top-2.5">
            <Search size={16} className="text-[#0a2333]" />
          </div>
          <input
            type="text"
            placeholder="Search by name, ID, location..."
            value={state.globalSearchQuery}
            onChange={e => dispatch({ type: 'SET_GLOBAL_SEARCH', payload: e.target.value })}
            className="h-full w-full rounded-md pl-9 pr-3 py-1 text-[14px] text-[#0a2333] placeholder:text-[#6a7282] border border-transparent focus:border-[#d1d5dc] focus:outline-none font-['Cabin',sans-serif] bg-transparent"
          />
        </div>
      </div>

      {/* Right: Stats + Environment Toggle + Notification */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <span className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333]">42</span>
            <span className="font-['Cabin',sans-serif] text-[14px] text-[#6a7282]">Requests today</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333]">12m</span>
            <span className="font-['Cabin',sans-serif] text-[14px] text-[#6a7282]">Avg. resolution time</span>
          </div>
        </div>
        <EnvironmentToggle />
        <button className="cursor-pointer relative rounded-md w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors">
          <Bell size={20} className="text-[#525252]" />
        </button>
      </div>
    </div>
  );
}
