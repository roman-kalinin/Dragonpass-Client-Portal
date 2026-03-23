import { useEnvironment } from '../../../contexts/EnvironmentContext';
import { EntitlementCard } from '../EntitlementCard';
import { EntitlementsEmptyState } from '../EntitlementsEmptyState';
import { MOCK_ENTITLEMENTS } from '../mockEntitlements';

interface ActiveEntitlementsTabProps {
  onManage: (id: string) => void;
  onBrowseCategories: () => void;
}

export function ActiveEntitlementsTab({ onManage, onBrowseCategories }: ActiveEntitlementsTabProps) {
  const { environment } = useEnvironment();
  const entitlements = MOCK_ENTITLEMENTS.filter(e => e.environment === environment);

  if (entitlements.length === 0) {
    return <EntitlementsEmptyState onBrowseCategories={onBrowseCategories} />;
  }

  return (
    <div className="py-4 grid grid-cols-3 gap-4">
      {entitlements.map(entitlement => (
        <EntitlementCard
          key={entitlement.id}
          entitlement={entitlement}
          onManage={onManage}
        />
      ))}
    </div>
  );
}
