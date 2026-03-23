import { ShoppingCart, ExternalLink } from 'lucide-react';
import { EmptyState } from '../shared/EmptyState';
import { Button } from '../shared/Button';

export function OrdersEmptyState() {
  return (
    <div className="flex-1">
      <EmptyState
        icon={<ShoppingCart size={28} className="text-[#6a7282]" />}
        title="No orders yet"
        description="Orders will appear here once you start making API calls. Try creating a test order to see how it works."
      >
        <div className="flex flex-col items-center gap-3">
          <Button variant="primary" onClick={() => window.open('https://docs.dragonpass.com', '_blank')}>
            View API Documentation
            <ExternalLink size={13} />
          </Button>
          <Button variant="text" onClick={() => window.open('https://docs.dragonpass.com/orders/create', '_blank')}>
            See example request
            <ExternalLink size={11} />
          </Button>
        </div>
      </EmptyState>
    </div>
  );
}
