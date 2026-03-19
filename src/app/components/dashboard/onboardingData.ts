import type { OnboardingStep } from '../../types/portalTypes';

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'review-keys',
    title: 'Review your test API keys',
    description: 'Your test credentials are ready.',
    linkTo: 'settings',
    linkLabel: 'Go to Settings > Developers',
  },
  {
    id: 'first-api-call',
    title: 'Make your first test API call',
    description: 'Use your test keys to make a sample request.',
    linkTo: 'external-docs',
    linkLabel: 'View API Documentation',
  },
  {
    id: 'browse-catalog',
    title: 'Browse available products',
    description: 'Explore the product categories to see what you can offer your customers.',
    linkTo: 'settings:categories',
    linkLabel: 'Go to Settings > Categories',
  },
  {
    id: 'request-prod',
    title: 'Request production access',
    description: "When you're ready to go live, request your production credentials.",
    linkTo: 'settings',
    linkLabel: 'Go to Settings > Developers',
  },
];
