import { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import type { ApiKey } from '../../../types/portalTypes';

interface ApiKeysTableProps {
  keys: ApiKey[];
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
      className="p-1.5 rounded hover:bg-[#f3f4f6] transition-colors"
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

function DownloadButton({ apiKey }: { apiKey: ApiKey }) {
  const disabled = !apiKey.fullKey;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!apiKey.fullKey) return;
    const blob = new Blob([apiKey.fullKey], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${apiKey.name.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={disabled}
      className="p-1.5 rounded hover:bg-[#f3f4f6] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      title={disabled ? 'Key not available for download' : 'Download key'}
    >
      <Download size={13} className="text-[#9ca3af]" />
    </button>
  );
}

export function ApiKeysTable({ keys }: ApiKeysTableProps) {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb]">
      <div className="border-b border-[#e5e7eb] bg-[#f9fafb]">
        <div className="grid grid-cols-[1fr_2fr_1fr_1fr_100px_80px] gap-4 px-4 py-3">
          {['Name', 'Key', 'Created', 'Last Used', 'Status', ''].map(h => (
            <span key={h} className="font-['Cabin',sans-serif] font-semibold text-[11px] text-[#6a7282] uppercase tracking-wider">
              {h}
            </span>
          ))}
        </div>
      </div>

      {keys.map(apiKey => (
        <div
          key={apiKey.id}
          className={`grid grid-cols-[1fr_2fr_1fr_1fr_100px_80px] gap-4 px-4 py-3.5 border-b border-[#e5e7eb] items-center ${
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

          <div className="flex items-center gap-1 justify-end">
            <CopyButton value={apiKey.fullKey || apiKey.maskedKey} />
            <DownloadButton apiKey={apiKey} />
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
