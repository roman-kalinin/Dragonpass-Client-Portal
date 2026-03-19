import { Settings } from 'lucide-react';

export function SettingsGeneralTab() {
  return (
    <div className="py-6">
      <div className="bg-[#f9fafb] border border-[#e5e7eb] border-dashed rounded-xl p-12 flex items-center justify-center">
        <div className="text-center">
          <Settings size={28} className="text-[#9ca3af] mx-auto mb-3" />
          <h3 className="font-['Cabin',sans-serif] font-semibold text-[16px] text-[#0a2333] mb-1">General Settings</h3>
          <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282]">
            Company information, notification preferences, and branding options.
          </p>
        </div>
      </div>
    </div>
  );
}
