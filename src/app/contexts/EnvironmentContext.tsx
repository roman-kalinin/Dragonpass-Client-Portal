import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface EnvironmentContextValue {
  environment: 'test' | 'production';
  setEnvironment: (env: 'test' | 'production') => void;
  isTestMode: boolean;
  bannerDismissed: boolean;
  dismissBanner: () => void;
}

const EnvironmentContext = createContext<EnvironmentContextValue | null>(null);

export function EnvironmentProvider({ children }: { children: ReactNode }) {
  const [environment, setEnvironment] = useState<'test' | 'production'>('production');
  const [bannerDismissed, setBannerDismissed] = useState(() => {
    return sessionStorage.getItem('dp_banner_dismissed') === 'true';
  });

  const handleSetEnvironment = useCallback((env: 'test' | 'production') => {
    setEnvironment(env);
    if (env === 'production') {
      setBannerDismissed(false);
      sessionStorage.removeItem('dp_banner_dismissed');
    }
  }, []);

  const dismissBanner = useCallback(() => {
    setBannerDismissed(true);
    sessionStorage.setItem('dp_banner_dismissed', 'true');
  }, []);

  return (
    <EnvironmentContext.Provider
      value={{
        environment,
        setEnvironment: handleSetEnvironment,
        isTestMode: environment === 'test',
        bannerDismissed,
        dismissBanner,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
}

export function useEnvironment() {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error('useEnvironment must be used within EnvironmentProvider');
  }
  return context;
}
