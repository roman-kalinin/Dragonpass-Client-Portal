import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '../../ui/dialog';

interface CreateKeyModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (key: { name: string; fullKey: string }) => void;
  environment: 'test' | 'production';
}

export function CreateKeyModal({ open, onClose, onCreated, environment }: CreateKeyModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [keyName, setKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const prefix = environment === 'test' ? 'dp_test_sk_' : 'dp_live_sk_';

  const handleGenerate = () => {
    const randomPart = Array.from({ length: 24 }, () =>
      'abcdef0123456789'.charAt(Math.floor(Math.random() * 16))
    ).join('');
    const fullKey = prefix + randomPart;
    setGeneratedKey(fullKey);
    setStep(2);
  };

  const handleDone = () => {
    onCreated({ name: keyName, fullKey: generatedKey });
    handleClose();
  };

  const handleClose = () => {
    setStep(1);
    setKeyName('');
    setGeneratedKey('');
    setSaved(false);
    setCopied(false);
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-md">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-['Cabin',sans-serif] text-[#0a2333]">Create API Key</DialogTitle>
              <DialogDescription className="font-['Cabin',sans-serif]">
                Create a new secret API key for the {environment} environment.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div>
                <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium block mb-1.5">
                  Key name
                </label>
                <input
                  type="text"
                  value={keyName}
                  onChange={e => setKeyName(e.target.value)}
                  placeholder="e.g. Production backend"
                  maxLength={64}
                  className="w-full h-9 px-3 rounded-lg border border-[#e5e7eb] text-[13px] font-['Cabin',sans-serif] text-[#0a2333] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#0a2333]"
                />
              </div>
              <div>
                <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium block mb-1.5">
                  Key type
                </label>
                <div className="h-9 px-3 rounded-lg border border-[#e5e7eb] flex items-center font-['Cabin',sans-serif] text-[13px] text-[#6a7282] bg-[#f9fafb]">
                  Standard (full access)
                </div>
              </div>
            </div>

            <DialogFooter>
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-lg border border-[#e5e7eb] font-['Cabin',sans-serif] text-[13px] text-[#45556c] hover:bg-[#f9fafb] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={!keyName.trim()}
                className="px-4 py-2 rounded-lg bg-[#0a2333] text-white font-['Cabin',sans-serif] font-medium text-[13px] hover:bg-[#152c3c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Key
              </button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-['Cabin',sans-serif] text-[#0a2333]">Save your secret key</DialogTitle>
              <DialogDescription className="font-['Cabin',sans-serif]">
                This key will only be shown once. Copy it now and store it securely.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-lg p-3 flex items-center justify-between gap-2">
                <code className="font-mono text-[12px] text-[#0a2333] break-all flex-1">
                  {generatedKey}
                </code>
                <button
                  onClick={handleCopy}
                  className="shrink-0 p-1.5 rounded hover:bg-white transition-colors"
                >
                  {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} className="text-[#6a7282]" />}
                </button>
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saved}
                  onChange={e => setSaved(e.target.checked)}
                  className="mt-0.5 rounded border-[#d1d5db] text-[#0a2333] focus:ring-[#0a2333]"
                />
                <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">
                  I have saved this key securely
                </span>
              </label>
            </div>

            <DialogFooter>
              <button
                onClick={handleDone}
                disabled={!saved}
                className="px-4 py-2 rounded-lg bg-[#0a2333] text-white font-['Cabin',sans-serif] font-medium text-[13px] hover:bg-[#152c3c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Done
              </button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
