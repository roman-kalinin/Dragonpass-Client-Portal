import { Webhook } from 'lucide-react';

export function WebhooksSection() {
  return (
    <div>
      <h3 className="font-['Cabin',sans-serif] font-bold text-[15px] text-[#0a2333] mb-1">
        Webhooks
        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-['Cabin',sans-serif] bg-[#f3f4f6] text-[#6a7282]">
          Coming Soon
        </span>
      </h3>
      <div className="h-px bg-[#e5e7eb] mb-4" />
      <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282] mb-3">
        Configure webhook endpoints for real-time event delivery.
      </p>
      <div className="bg-[#f9fafb] border border-[#e5e7eb] border-dashed rounded-xl p-6 flex items-center justify-center">
        <div className="text-center">
          <Webhook size={24} className="text-[#9ca3af] mx-auto mb-2" />
          <p className="font-['Cabin',sans-serif] text-[13px] text-[#9ca3af]">
            Webhook configuration will be available in a future release.
          </p>
        </div>
      </div>
    </div>
  );
}
