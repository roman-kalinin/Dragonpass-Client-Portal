import { useState } from 'react';
import { Info, Plus, X } from 'lucide-react';
import { useEnvironment } from '../../../contexts/EnvironmentContext';
import { ApiKeysTable } from './ApiKeysTable';
import { CreateKeyModal } from './CreateKeyModal';
import { MOCK_API_KEYS } from './mockApiKeys';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '../../ui/dialog';
import type { ApiKey } from '../../../types/portalTypes';

export function ApiKeysSection() {
  const { environment } = useEnvironment();
  const [keys, setKeys] = useState<ApiKey[]>(MOCK_API_KEYS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBanner, setShowBanner] = useState(() => {
    return sessionStorage.getItem('dp_keys_banner_shown') !== 'true';
  });

  // Confirmation dialogs
  const [rotateId, setRotateId] = useState<string | null>(null);
  const [revokeId, setRevokeId] = useState<string | null>(null);

  const filteredKeys = keys.filter(k => k.environment === environment);

  const handleReveal = (id: string) => {
    setKeys(prev => prev.map(k =>
      k.id === id ? { ...k, maskedKey: k.fullKey || k.maskedKey, canReveal: false } : k
    ));
  };

  const handleRotateConfirm = () => {
    if (!rotateId) return;
    const randomPart = Array.from({ length: 24 }, () =>
      'abcdef0123456789'.charAt(Math.floor(Math.random() * 16))
    ).join('');
    const prefix = environment === 'test' ? 'dp_test_sk_' : 'dp_live_sk_';
    const newKey = prefix + randomPart;

    setKeys(prev => prev.map(k =>
      k.id === rotateId ? { ...k, maskedKey: newKey, fullKey: newKey, canReveal: false } : k
    ));
    setRotateId(null);
  };

  const handleRevokeConfirm = () => {
    if (!revokeId) return;
    setKeys(prev => prev.map(k =>
      k.id === revokeId ? { ...k, status: 'revoked' as const } : k
    ));
    setRevokeId(null);
  };

  const handleCreated = (created: { name: string; fullKey: string }) => {
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name: created.name,
      type: 'secret',
      keyPrefix: environment === 'test' ? 'dp_test_sk_' : 'dp_live_sk_',
      maskedKey: created.fullKey.slice(0, 12) + '••••••••••••',
      fullKey: created.fullKey,
      environment,
      status: 'active',
      createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      lastUsedAt: null,
      canReveal: true,
    };
    setKeys(prev => [...prev, newKey]);
  };

  const dismissBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem('dp_keys_banner_shown', 'true');
  };

  return (
    <div>
      <h3 className="font-['Cabin',sans-serif] font-bold text-[15px] text-[#0a2333] mb-1">
        API Keys
      </h3>
      <div className="h-px bg-[#e5e7eb] mb-4" />
      <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282] mb-4">
        Your API keys for the <span className="font-semibold capitalize">{environment}</span> environment.
      </p>

      {/* First-visit info banner */}
      {showBanner && environment === 'test' && (
        <div className="bg-[#eff6ff] border border-[#93c5fd] rounded-lg p-3 mb-4 flex items-start justify-between">
          <div className="flex items-start gap-2">
            <Info size={14} className="text-[#2563eb] mt-0.5 shrink-0" />
            <p className="font-['Cabin',sans-serif] text-[13px] text-[#1e40af]">
              These are your test credentials. Use them to integrate and test the Dragonpass API. When you're ready for production, request access below.
            </p>
          </div>
          <button onClick={dismissBanner} className="shrink-0 ml-2">
            <X size={14} className="text-[#2563eb]" />
          </button>
        </div>
      )}

      <ApiKeysTable
        keys={filteredKeys}
        onReveal={handleReveal}
        onRotate={setRotateId}
        onRevoke={setRevokeId}
      />

      <button
        onClick={() => setShowCreateModal(true)}
        className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#e5e7eb] font-['Cabin',sans-serif] font-medium text-[13px] text-[#0a2333] hover:bg-[#f9fafb] transition-colors"
      >
        <Plus size={14} />
        Create New Key
      </button>

      <CreateKeyModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={handleCreated}
        environment={environment}
      />

      {/* Rotate confirmation */}
      <Dialog open={rotateId !== null} onOpenChange={(o) => !o && setRotateId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-['Cabin',sans-serif] text-[#0a2333]">Rotate API Key?</DialogTitle>
            <DialogDescription className="font-['Cabin',sans-serif]">
              Rotating this key will invalidate the current key immediately. Any integrations using this key will stop working. Are you sure?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setRotateId(null)}
              className="px-4 py-2 rounded-lg border border-[#e5e7eb] font-['Cabin',sans-serif] text-[13px] text-[#45556c] hover:bg-[#f9fafb] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleRotateConfirm}
              className="px-4 py-2 rounded-lg bg-[#0a2333] text-white font-['Cabin',sans-serif] font-medium text-[13px] hover:bg-[#152c3c] transition-colors"
            >
              Rotate Key
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revoke confirmation */}
      <Dialog open={revokeId !== null} onOpenChange={(o) => !o && setRevokeId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-['Cabin',sans-serif] text-[#dc2626]">Revoke API Key?</DialogTitle>
            <DialogDescription className="font-['Cabin',sans-serif]">
              Revoking this key is permanent and cannot be undone. Any integrations using this key will stop working immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setRevokeId(null)}
              className="px-4 py-2 rounded-lg border border-[#e5e7eb] font-['Cabin',sans-serif] text-[13px] text-[#45556c] hover:bg-[#f9fafb] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleRevokeConfirm}
              className="px-4 py-2 rounded-lg bg-[#dc2626] text-white font-['Cabin',sans-serif] font-medium text-[13px] hover:bg-[#b91c1c] transition-colors"
            >
              Revoke Key
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
