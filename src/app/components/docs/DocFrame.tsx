import type { ReactNode } from 'react';
import { AppProvider } from '../../store';
import { EnvironmentProvider } from '../../contexts/EnvironmentContext';

interface DocFrameProps {
  environment?: 'test' | 'production';
  children: ReactNode;
}

export function DocFrame({ environment = 'production', children }: DocFrameProps) {
  return (
    <EnvironmentProvider defaultEnvironment={environment} skipStorage>
      <AppProvider>
        {children}
      </AppProvider>
    </EnvironmentProvider>
  );
}
