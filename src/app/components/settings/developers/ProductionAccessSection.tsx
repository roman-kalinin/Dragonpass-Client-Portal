import { useState } from 'react';
import { Lock, CheckCircle } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '../../ui/dialog';
import type { ProductionAccessRequest } from '../../../types/portalTypes';

export function ProductionAccessSection() {
  const [accessState, setAccessState] = useState<ProductionAccessRequest>({
    status: 'not_requested',
  });
  const [showRequestModal, setShowRequestModal] = useState(false);

  const handleSubmitRequest = () => {
    setAccessState({
      status: 'pending',
      requestedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    });
    setShowRequestModal(false);
  };

  return (
    <div>
      <h3 className="font-['Cabin',sans-serif] font-bold text-[15px] text-[#0a2333] mb-1">
        Production Access
      </h3>
      <div className="h-px bg-[#e5e7eb] mb-4" />

      {accessState.status === 'not_requested' && (
        <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#f1f5f9] flex items-center justify-center shrink-0">
              <Lock size={18} className="text-[#6a7282]" />
            </div>
            <div className="flex-1">
              <h4 className="font-['Cabin',sans-serif] font-semibold text-[14px] text-[#0a2333]">
                Production keys require approval
              </h4>
              <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282] mt-1">
                Request production access when you're ready to go live. Your account manager will review and provision your production credentials.
              </p>
              <button
                onClick={() => setShowRequestModal(true)}
                className="mt-4 px-4 py-2 rounded-lg bg-[#0a2333] text-white font-['Cabin',sans-serif] font-medium text-[13px] hover:bg-[#152c3c] transition-colors"
              >
                Request Production Access
              </button>
            </div>
          </div>
        </div>
      )}

      {accessState.status === 'pending' && (
        <div className="bg-[#FFFBEB] border border-[#F59E0B] rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] flex items-center justify-center shrink-0">
              <Lock size={18} className="text-[#D97706]" />
            </div>
            <div className="flex-1">
              <h4 className="font-['Cabin',sans-serif] font-semibold text-[14px] text-[#92400E]">
                Production access requested
              </h4>
              <p className="font-['Cabin',sans-serif] text-[13px] text-[#92400E]/80 mt-1">
                Requested on {accessState.requestedAt}. Your account manager will reach out to manage this.
              </p>
              <button
                disabled
                className="mt-4 px-4 py-2 rounded-lg bg-[#D97706]/20 text-[#92400E] font-['Cabin',sans-serif] font-medium text-[13px] cursor-not-allowed opacity-70"
              >
                Pending Review
              </button>
            </div>
          </div>
        </div>
      )}

      {accessState.status === 'approved' && (
        <div className="bg-[#f0fdf4] border border-[#86efac] rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#dcfce7] flex items-center justify-center shrink-0">
              <CheckCircle size={18} className="text-[#166534]" />
            </div>
            <div>
              <h4 className="font-['Cabin',sans-serif] font-semibold text-[14px] text-[#166534]">
                Production access is active
              </h4>
              <p className="font-['Cabin',sans-serif] text-[13px] text-[#166534]/80 mt-1">
                Your production API keys are available. Switch to the Production environment to view them.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Request confirmation modal */}
      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-['Cabin',sans-serif] text-[#0a2333]">Request Production Access?</DialogTitle>
            <DialogDescription className="font-['Cabin',sans-serif]">
              Your account manager will be notified and will reach out to provision your production credentials. This typically takes 1-2 business days.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setShowRequestModal(false)}
              className="px-4 py-2 rounded-lg border border-[#e5e7eb] font-['Cabin',sans-serif] text-[13px] text-[#45556c] hover:bg-[#f9fafb] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitRequest}
              className="px-4 py-2 rounded-lg bg-[#0a2333] text-white font-['Cabin',sans-serif] font-medium text-[13px] hover:bg-[#152c3c] transition-colors"
            >
              Submit Request
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
