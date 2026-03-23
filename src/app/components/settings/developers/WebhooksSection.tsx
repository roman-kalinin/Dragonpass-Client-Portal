import { Webhook } from 'lucide-react';
import { SectionHeading } from '../../shared/SectionHeading';
import { Badge } from '../../shared/Badge';
import { ComingSoon } from '../../shared/ComingSoon';

export function WebhooksSection() {
  return (
    <div>
      <SectionHeading>
        Webhooks
        <Badge variant="available" className="ml-2">Coming Soon</Badge>
      </SectionHeading>
      <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282] mb-3">
        Configure webhook endpoints for real-time event delivery.
      </p>
      <ComingSoon
        icon={<Webhook size={24} className="text-[#9ca3af] mx-auto mb-2" />}
        message="Webhook configuration will be available in a future release."
        className="p-6"
      />
    </div>
  );
}
