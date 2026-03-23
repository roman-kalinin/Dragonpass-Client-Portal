import { Package } from 'lucide-react';
import { EmptyState } from '../shared/EmptyState';
import { Button } from '../shared/Button';

interface EntitlementsEmptyStateProps {
  onBrowseCategories: () => void;
}

export function EntitlementsEmptyState({ onBrowseCategories }: EntitlementsEmptyStateProps) {
  return (
    <EmptyState
      icon={<Package size={28} className="text-[#6a7282]" />}
      title="No active entitlements yet"
      description="Browse the categories in Settings to explore available products and request entitlements for your account."
    >
      <Button variant="primary" onClick={onBrowseCategories}>
        Browse Categories in Settings
      </Button>
    </EmptyState>
  );
}
