import { useState } from 'react';
import { Lock, CheckCircle } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '../../ui/dialog';
import { SectionHeading } from '../../shared/SectionHeading';
import { IconBox } from '../../shared/IconBox';
import { Button } from '../../shared/Button';
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
      <SectionHeading>Production Access</SectionHeading>

      {accessState.status === 'not_requested' && (
        <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-xl p-5">
          <div className="flex items-start gap-3">
            <IconBox>
              <Lock size={18} className="text-[#6a7282]" />
            </IconBox>
            <div className="flex-1">
              <h4 className="font-['Cabin',sans-serif] font-semibold text-[14px] text-[#0a2333]">
                Production keys require approval
              </h4>
              <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282] mt-1">
                Request production access when you're ready to go live. Your account manager will review and provision your production credentials.
              </p>
              <Button variant="primary" className="mt-4" onClick={() => setShowRequestModal(true)}>
                Request Production Access
              </Button>
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
            <Button variant="ghost" onClick={() => setShowRequestModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmitRequest}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
