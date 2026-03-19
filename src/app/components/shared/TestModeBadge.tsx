import { useEnvironment } from '../../contexts/EnvironmentContext';

export function TestModeBadge() {
  const { isTestMode } = useEnvironment();
  if (!isTestMode) return null;

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold font-['Cabin',sans-serif] bg-[#FEF3C7] text-[#92400E] uppercase tracking-wide">
      TEST
    </span>
  );
}
