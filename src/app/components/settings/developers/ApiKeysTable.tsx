import { useState } from 'react';
import { Copy, Check, MoreHorizontal, Eye, RotateCw, XCircle } from 'lucide-react';
import type { ApiKey } from '../../../types/portalTypes';

interface ApiKeysTableProps {
  keys: ApiKey[];
  onReveal: (id: string) => void;
  onRotate: (id: string) => void;
  onRevoke: (id: string) => void;
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 rounded hover:bg-[#f3f4f6] transition-colors"
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? (
        <Check size={13} className="text-green-600" />
      ) : (
        <Copy size={13} className="text-[#9ca3af]" />
      )}
    </button>
  );
}

export function ApiKeysTable({ keys, onReveal, onRotate, onRevoke }: ApiKeysTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb]">
      {/* Header */}
      <div className="border-b border-[#e5e7eb] bg-[#f9fafb]">
        <div className="grid grid-cols-[1fr_2fr_1fr_1fr_100px_48px] gap-4 px-4 py-3">
          {['Name', 'Key', 'Created', 'Last Used', 'Status', ''].map(h => (
            <span key={h} className="font-['Cabin',sans-serif] font-semibold text-[11px] text-[#6a7282] uppercase tracking-wider">
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* Rows */}
      {keys.map(apiKey => (
        <div
          key={apiKey.id}
          className={`grid grid-cols-[1fr_2fr_1fr_1fr_100px_48px] gap-4 px-4 py-3.5 border-b border-[#e5e7eb] items-center ${
            apiKey.status === 'revoked' ? 'opacity-50' : ''
          }`}
        >
          <span className="font-['Cabin',sans-serif] text-[13px] text-[#0a2333] font-medium">
            {apiKey.name}
          </span>

          <div className="flex items-center gap-2 min-w-0">
            <code className="font-mono text-[12px] text-[#45556c] truncate">
              {apiKey.maskedKey}
            </code>
            <CopyButton value={apiKey.fullKey || apiKey.maskedKey} />
          </div>

          <span className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282]">
            {apiKey.createdAt}
          </span>

          <span className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282]">
            {apiKey.lastUsedAt || 'Never'}
          </span>

          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-['Cabin',sans-serif] w-fit ${
            apiKey.status === 'active'
              ? 'bg-[#dcfce7] text-[#166534]'
              : 'bg-[#fee2e2] text-[#991b1b]'
          }`}>
            {apiKey.status === 'active' ? 'Active' : 'Revoked'}
          </span>

          <div className="relative">
            <button
              onClick={() => setOpenMenuId(openMenuId === apiKey.id ? null : apiKey.id)}
              className="p-1.5 rounded hover:bg-[#f3f4f6] transition-colors"
              disabled={apiKey.status === 'revoked'}
            >
              <MoreHorizontal size={14} className="text-[#6a7282]" />
            </button>

            {openMenuId === apiKey.id && apiKey.status !== 'revoked' && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
                <div className="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg border border-[#e5e7eb] shadow-lg py-1 min-w-[160px]">
                  {apiKey.type === 'secret' && apiKey.canReveal && (
                    <button
                      onClick={() => { onReveal(apiKey.id); setOpenMenuId(null); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-['Cabin',sans-serif] text-[#0a2333] hover:bg-[#f9fafb] transition-colors text-left"
                    >
                      <Eye size={14} className="text-[#6a7282]" />
                      Reveal
                    </button>
                  )}
                  <button
                    onClick={() => { onRotate(apiKey.id); setOpenMenuId(null); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-['Cabin',sans-serif] text-[#0a2333] hover:bg-[#f9fafb] transition-colors text-left"
                  >
                    <RotateCw size={14} className="text-[#6a7282]" />
                    Rotate
                  </button>
                  <button
                    onClick={() => { onRevoke(apiKey.id); setOpenMenuId(null); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-['Cabin',sans-serif] text-[#dc2626] hover:bg-[#fef2f2] transition-colors text-left"
                  >
                    <XCircle size={14} className="text-[#dc2626]" />
                    Revoke
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      {keys.length === 0 && (
        <div className="px-4 py-8 text-center font-['Cabin',sans-serif] text-[14px] text-[#9ca3af]">
          No API keys for this environment.
        </div>
      )}
    </div>
  );
}
