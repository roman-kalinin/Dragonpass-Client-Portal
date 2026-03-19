import type { ApiKey } from '../../../types/portalTypes';

export const MOCK_API_KEYS: ApiKey[] = [
  {
    id: 'key-1',
    name: 'Publishable key',
    type: 'publishable',
    keyPrefix: 'dp_test_pk_',
    maskedKey: 'dp_test_pk_4f2a8b9c1d3e5f7a',
    fullKey: 'dp_test_pk_4f2a8b9c1d3e5f7a',
    environment: 'test',
    status: 'active',
    createdAt: '2026-03-12',
    lastUsedAt: '2 hours ago',
    canReveal: false,
  },
  {
    id: 'key-2',
    name: 'Secret key',
    type: 'secret',
    keyPrefix: 'dp_test_sk_',
    maskedKey: 'dp_test_sk_••••••••••••',
    fullKey: 'dp_test_sk_9a8b7c6d5e4f3a2b1c0d',
    environment: 'test',
    status: 'active',
    createdAt: '2026-03-12',
    lastUsedAt: null,
    canReveal: true,
  },
];
