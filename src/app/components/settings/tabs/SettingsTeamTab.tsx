import { Users } from 'lucide-react';
import { ComingSoon } from '../../shared/ComingSoon';

export function SettingsTeamTab() {
  return (
    <div className="py-6">
      <ComingSoon
        icon={<Users size={28} className="text-[#9ca3af] mx-auto mb-3" />}
        message="Manage team members, roles, and permissions."
      />
    </div>
  );
}
