import { ApiDocsCard } from '../developers/ApiDocsCard';
import { ApiKeysSection } from '../developers/ApiKeysSection';
import { ProductionAccessSection } from '../developers/ProductionAccessSection';
import { WebhooksSection } from '../developers/WebhooksSection';

export function DevelopersTab() {
  return (
    <div className="py-6 space-y-8">
      <ApiDocsCard />
      <ApiKeysSection />
      <ProductionAccessSection />
      <WebhooksSection />
    </div>
  );
}
