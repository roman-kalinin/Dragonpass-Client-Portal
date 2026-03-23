import { Settings } from 'lucide-react';
import { ComingSoon } from '../../shared/ComingSoon';

export function SettingsGeneralTab() {
  return (
    <div className="py-6">
      <ComingSoon
        icon={<Settings size={28} className="text-[#9ca3af] mx-auto mb-3" />}
        message="Company information, notification preferences, and branding options."
      />
    </div>
  );
}
