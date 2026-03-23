import type { Frame } from '../types';
import { DocFrame } from '../DocFrame';
import { DocPageShell } from '../DocPageShell';
import { PageHeader } from '../../shared/PageHeader';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { ApiKeysTable } from '../../settings/developers/ApiKeysTable';
import { ApiDocsCard } from '../../settings/developers/ApiDocsCard';
import { WebhooksSection } from '../../settings/developers/WebhooksSection';
import { MOCK_API_KEYS } from '../../settings/developers/mockApiKeys';
import { Info, X, Lock, CheckCircle, AlertTriangle, Eye, RotateCw, XCircle, Copy, Check } from 'lucide-react';

function SettingsShell({ env = 'test' as const, children }: { env?: 'test' | 'production'; children: React.ReactNode }) {
  return (
    <DocFrame environment={env}>
      <DocPageShell activeView="settings:developers" onNavigate={() => {}}>
        <div className="flex flex-col flex-1 overflow-hidden w-full max-w-[1440px] mx-auto">
          <PageHeader title="Settings" description="Manage your account, team, and developer settings" className="pb-0" />
          <div className="px-8 shrink-0">
            <Tabs value="developers">
              <TabsList className="bg-transparent h-auto border-b border-[#e5e7eb] rounded-none w-full justify-start gap-0 p-0 -mb-px">
                {[
                  { value: 'products', label: 'Products' },
                  { value: 'categories', label: 'Categories' },
                  { value: 'team', label: 'Team' },
                  { value: 'developers', label: 'Developers' },
                  { value: 'general', label: 'General' },
                ].map(tab => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-none border-0 border-b-2 border-b-transparent data-[state=active]:border-b-[#0a2333] data-[state=active]:bg-transparent data-[state=active]:shadow-none focus-visible:ring-0 focus-visible:outline-none px-4 py-2.5 font-['Cabin',sans-serif] text-[13px] text-[#6a7282] hover:text-[#0a2333] data-[state=active]:text-[#0a2333] data-[state=active]:font-semibold"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div className="flex-1 overflow-auto px-8">
            <div className="py-6 space-y-8">
              {children}
            </div>
          </div>
        </div>
      </DocPageShell>
    </DocFrame>
  );
}

function InfoBanner() {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl border border-[#93c5fd] bg-[#eff6ff]">
      <Info size={16} className="text-[#2563eb] shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-['Cabin',sans-serif] text-[13px] text-[#1e40af]">
          These are your test credentials. Use them to integrate and test the Dragonpass API. When you're ready for production, request access below.
        </p>
      </div>
      <button className="w-5 h-5 flex items-center justify-center rounded hover:bg-blue-100">
        <X size={12} className="text-[#93c5fd]" />
      </button>
    </div>
  );
}

function ConfirmDialog({ title, message, confirmLabel, variant = 'default' }: {
  title: string; message: string; confirmLabel: string; variant?: 'default' | 'destructive';
}) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[420px] p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${variant === 'destructive' ? 'bg-[#fee2e2]' : 'bg-[#fef3c7]'}`}>
            <AlertTriangle size={20} className={variant === 'destructive' ? 'text-[#d4183d]' : 'text-[#d97706]'} />
          </div>
          <div className="flex-1">
            <h3 className={`font-['Cabin',sans-serif] font-bold text-[16px] mb-1 ${variant === 'destructive' ? 'text-[#d4183d]' : 'text-[#0a2333]'}`}>
              {title}
            </h3>
            <p className="font-['Cabin',sans-serif] text-[14px] text-[#62748e]">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="h-9 px-4 rounded-lg border border-[#d1d5dc] font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a2333]">
            Cancel
          </button>
          <button className={`h-9 px-4 rounded-lg font-['Cabin',sans-serif] font-medium text-[14px] text-white ${
            variant === 'destructive' ? 'bg-[#d4183d]' : 'bg-[#0a2333]'
          }`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function KeyActionMenuOpen() {
  return (
    <div className="relative inline-block">
      <div className="w-8 h-8 flex items-center justify-center rounded-md bg-[#f3f4f6] text-[#0a2333]">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="3" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="13" r="1.5"/></svg>
      </div>
      <div className="absolute right-0 top-9 z-20 w-40 bg-white border border-[#e5e7eb] rounded-xl shadow-lg py-1">
        <div className="flex items-center gap-2.5 px-3 py-2 font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">
          <Eye size={13} className="text-[#6a7282]" /> Reveal
        </div>
        <div className="flex items-center gap-2.5 px-3 py-2 font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">
          <RotateCw size={13} className="text-[#6a7282]" /> Rotate
        </div>
        <div className="border-t border-[#e5e7eb] my-1" />
        <div className="flex items-center gap-2.5 px-3 py-2 font-['Cabin',sans-serif] text-[13px] text-[#dc2626]">
          <XCircle size={13} className="text-[#dc2626]" /> Revoke
        </div>
      </div>
    </div>
  );
}

function ProductionAccessState({ status }: { status: 'not_requested' | 'pending' | 'approved' }) {
  if (status === 'not_requested') {
    return (
      <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-xl p-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#f3f4f6] flex items-center justify-center shrink-0">
          <Lock size={18} className="text-[#6a7282]" />
        </div>
        <div className="flex-1">
          <h4 className="font-['Cabin',sans-serif] font-semibold text-[15px] text-[#0a2333] mb-1">Production keys require approval</h4>
          <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282] mb-4">Request production access when you're ready to go live. Your account manager will review and approve.</p>
          <button className="bg-[#0a2333] text-white rounded-lg px-4 py-2 font-['Cabin',sans-serif] font-medium text-[13px]">
            Request Production Access
          </button>
        </div>
      </div>
    );
  }
  if (status === 'pending') {
    return (
      <div className="bg-[#FFFBEB] border border-[#F59E0B] rounded-xl p-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center shrink-0">
          <Lock size={18} className="text-[#D97706]" />
        </div>
        <div className="flex-1">
          <h4 className="font-['Cabin',sans-serif] font-semibold text-[15px] text-[#92400E] mb-1">Production access requested</h4>
          <p className="font-['Cabin',sans-serif] text-[13px] text-[#92400E]/80 mb-4">Requested on 23 Mar 2026. Your account manager will reach out within 1–2 business days.</p>
          <button disabled className="bg-[#FEF3C7] text-[#92400E] rounded-lg px-4 py-2 font-['Cabin',sans-serif] font-medium text-[13px] opacity-60 cursor-not-allowed">
            Pending Review
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#f0fdf4] border border-[#86efac] rounded-xl p-6 flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-[#dcfce7] flex items-center justify-center shrink-0">
        <CheckCircle size={18} className="text-[#16a34a]" />
      </div>
      <div className="flex-1">
        <h4 className="font-['Cabin',sans-serif] font-semibold text-[15px] text-[#166534] mb-1">Production access is active</h4>
        <p className="font-['Cabin',sans-serif] text-[13px] text-[#166534]/80">Your production API keys are available. Switch to the Production environment to view them.</p>
      </div>
    </div>
  );
}

function RevealedKeyRow() {
  const key = MOCK_API_KEYS.find(k => k.type === 'secret')!;
  return (
    <div className="border border-[#e5e7eb] rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
            <th className="text-left px-4 py-2 font-['Cabin',sans-serif] text-[11px] text-[#6a7282] font-semibold uppercase tracking-wider">Name</th>
            <th className="text-left px-4 py-2 font-['Cabin',sans-serif] text-[11px] text-[#6a7282] font-semibold uppercase tracking-wider">Key</th>
            <th className="text-left px-4 py-2 font-['Cabin',sans-serif] text-[11px] text-[#6a7282] font-semibold uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-3 font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">{key.name}</td>
            <td className="px-4 py-3">
              <code className="font-mono text-[12px] text-[#0a2333] bg-[#f3f4f6] px-2 py-1 rounded">{key.fullKey}</code>
            </td>
            <td className="px-4 py-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-['Cabin',sans-serif] bg-[#dcfce7] text-[#166534]">active</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function CreateKeyStep1() {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[480px] p-6">
        <h2 className="font-['Cabin',sans-serif] font-bold text-[18px] text-[#0a2333] mb-1">Create new API key</h2>
        <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282] mb-6">Generate a new API key for the test environment.</p>
        <div className="space-y-4">
          <div>
            <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium block mb-1.5">Key name</label>
            <input type="text" placeholder="e.g. Production backend" className="w-full h-9 px-3 rounded-lg border border-[#e5e7eb] text-[13px] font-['Cabin',sans-serif] bg-[#f9fafb]" />
          </div>
          <div>
            <label className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium block mb-1.5">Key type</label>
            <div className="h-9 px-3 flex items-center rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] font-['Cabin',sans-serif] text-[13px] text-[#6a7282]">Standard (full access)</div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="h-9 px-4 rounded-lg border border-[#d1d5dc] font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a2333]">Cancel</button>
          <button disabled className="h-9 px-4 rounded-lg bg-[#0a2333] font-['Cabin',sans-serif] font-medium text-[14px] text-white opacity-50 cursor-not-allowed">Generate Key</button>
        </div>
      </div>
    </div>
  );
}

function CreateKeyStep2() {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[480px] p-6">
        <h2 className="font-['Cabin',sans-serif] font-bold text-[18px] text-[#0a2333] mb-1">API key created</h2>
        <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282] mb-6">Copy your key now — you won't be able to see it again.</p>
        <div className="bg-[#f3f4f6] rounded-lg p-3 flex items-center justify-between mb-4">
          <code className="font-mono text-[12px] text-[#0a2333] break-all">dp_test_sk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6</code>
          <div className="w-8 h-8 flex items-center justify-center rounded-md text-[#16a34a]">
            <Check size={14} />
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer mb-6">
          <input type="checkbox" checked readOnly className="rounded border-[#d1d5db]" />
          <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333]">I have saved this key securely</span>
        </label>
        <div className="flex justify-end">
          <button className="h-9 px-4 rounded-lg bg-[#0a2333] font-['Cabin',sans-serif] font-medium text-[14px] text-white">Done</button>
        </div>
      </div>
    </div>
  );
}

export const apiKeysFrames: Frame[] = [
  {
    id: 'api-keys-table',
    title: 'Test Environment — Keys Table',
    description: 'Default view showing 2 API keys: publishable (visible) and secret (masked). Action menu (⋮) per row. All Settings tabs visible.',
    category: 'Key Management',
    render: () => (
      <SettingsShell env="test">
        <ApiDocsCard />
        <ApiKeysTable keys={MOCK_API_KEYS} onReveal={() => {}} onRotate={() => {}} onRevoke={() => {}} />
        <ProductionAccessState status="not_requested" />
        <WebhooksSection />
      </SettingsShell>
    ),
  },
  {
    id: 'api-keys-banner',
    title: 'First-Visit Info Banner',
    description: 'Blue info banner shown on first visit in test environment. Dismissible via X button. Appears above keys table.',
    category: 'Key Management',
    render: () => (
      <SettingsShell env="test">
        <ApiDocsCard />
        <div className="space-y-4">
          <InfoBanner />
          <ApiKeysTable keys={MOCK_API_KEYS} onReveal={() => {}} onRotate={() => {}} onRevoke={() => {}} />
        </div>
        <ProductionAccessState status="not_requested" />
        <WebhooksSection />
      </SettingsShell>
    ),
  },
  {
    id: 'api-keys-revealed',
    title: 'Secret Key — Revealed',
    description: 'Secret key fully visible after clicking "Reveal". Shows full key string in monospace.',
    category: 'Key Management',
    render: () => (
      <SettingsShell env="test">
        <ApiDocsCard />
        <RevealedKeyRow />
        <ProductionAccessState status="not_requested" />
        <WebhooksSection />
      </SettingsShell>
    ),
  },
  {
    id: 'api-keys-create-step1',
    title: 'Create Key — Step 1',
    description: 'Modal with key name input and type selector. "Generate Key" button disabled until name is filled.',
    category: 'Key Creation',
    render: () => (
      <SettingsShell env="test">
        <ApiDocsCard />
        <ApiKeysTable keys={MOCK_API_KEYS} onReveal={() => {}} onRotate={() => {}} onRevoke={() => {}} />
        <ProductionAccessState status="not_requested" />
        <WebhooksSection />
        <CreateKeyStep1 />
      </SettingsShell>
    ),
  },
  {
    id: 'api-keys-create-step2',
    title: 'Create Key — Step 2',
    description: 'Key generated. Copy button shows check state. "Done" enabled after confirming key is saved.',
    category: 'Key Creation',
    render: () => (
      <SettingsShell env="test">
        <ApiDocsCard />
        <ApiKeysTable keys={MOCK_API_KEYS} onReveal={() => {}} onRotate={() => {}} onRevoke={() => {}} />
        <ProductionAccessState status="not_requested" />
        <WebhooksSection />
        <CreateKeyStep2 />
      </SettingsShell>
    ),
  },
  {
    id: 'api-keys-menu',
    title: 'Key Action Menu — Open',
    description: 'Row menu showing Reveal, Rotate, and Revoke options. Revoke is red with a divider above it.',
    category: 'Key Actions',
    render: () => (
      <SettingsShell env="test">
        <ApiDocsCard />
        <div className="space-y-4">
          <div className="flex items-start gap-6">
            <div>
              <h4 className="font-['Cabin',sans-serif] font-semibold text-[13px] text-[#0a2333] uppercase tracking-wider mb-3">Action Menu</h4>
              <KeyActionMenuOpen />
            </div>
          </div>
          <ApiKeysTable keys={MOCK_API_KEYS} onReveal={() => {}} onRotate={() => {}} onRevoke={() => {}} />
        </div>
        <ProductionAccessState status="not_requested" />
        <WebhooksSection />
      </SettingsShell>
    ),
  },
  {
    id: 'api-keys-rotate',
    title: 'Rotate Confirmation',
    description: 'Confirmation dialog warning that rotating will invalidate the current key immediately.',
    category: 'Key Actions',
    render: () => (
      <SettingsShell env="test">
        <ApiDocsCard />
        <ApiKeysTable keys={MOCK_API_KEYS} onReveal={() => {}} onRotate={() => {}} onRevoke={() => {}} />
        <ProductionAccessState status="not_requested" />
        <WebhooksSection />
        <ConfirmDialog
          title="Rotate API Key?"
          message="This will invalidate the current key immediately. Any integrations using this key will stop working. Are you sure?"
          confirmLabel="Rotate Key"
        />
      </SettingsShell>
    ),
  },
  {
    id: 'api-keys-revoke',
    title: 'Revoke Confirmation',
    description: 'Red destructive dialog. Revoking is permanent and cannot be undone.',
    category: 'Key Actions',
    render: () => (
      <SettingsShell env="test">
        <ApiDocsCard />
        <ApiKeysTable keys={MOCK_API_KEYS} onReveal={() => {}} onRotate={() => {}} onRevoke={() => {}} />
        <ProductionAccessState status="not_requested" />
        <WebhooksSection />
        <ConfirmDialog
          title="Revoke API Key?"
          message="This action is permanent and cannot be undone. Any integrations using this key will stop working immediately."
          confirmLabel="Revoke Key"
          variant="destructive"
        />
      </SettingsShell>
    ),
  },
  {
    id: 'api-keys-prod-not-requested',
    title: 'Production — Not Requested',
    description: 'Lock icon with "Request Production Access" CTA button. Shown before user requests production keys.',
    category: 'Production Access',
    render: () => (
      <SettingsShell env="production">
        <ApiDocsCard />
        <ProductionAccessState status="not_requested" />
        <WebhooksSection />
      </SettingsShell>
    ),
  },
  {
    id: 'api-keys-prod-pending',
    title: 'Production — Pending',
    description: 'Amber banner showing request is under review. CTA disabled with "Pending Review" label.',
    category: 'Production Access',
    render: () => (
      <SettingsShell env="production">
        <ApiDocsCard />
        <ProductionAccessState status="pending" />
        <WebhooksSection />
      </SettingsShell>
    ),
  },
  {
    id: 'api-keys-prod-approved',
    title: 'Production — Approved',
    description: 'Green banner confirming production access is active. Prompts to switch to Production environment.',
    category: 'Production Access',
    render: () => (
      <SettingsShell env="production">
        <ApiDocsCard />
        <ProductionAccessState status="approved" />
        <ApiKeysTable keys={MOCK_API_KEYS} onReveal={() => {}} onRotate={() => {}} onRevoke={() => {}} />
        <WebhooksSection />
      </SettingsShell>
    ),
  },
  {
    id: 'api-keys-empty',
    title: 'Empty Table',
    description: 'No API keys exist for the current environment. Centered placeholder text.',
    category: 'Empty States',
    render: () => (
      <SettingsShell env="production">
        <ApiDocsCard />
        <div className="border border-[#e5e7eb] rounded-lg p-8 text-center">
          <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282]">No API keys for this environment.</p>
        </div>
        <WebhooksSection />
      </SettingsShell>
    ),
  },
];
