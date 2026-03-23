import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface EnvironmentContextValue {
  environment: 'test' | 'production';
  setEnvironment: (env: 'test' | 'production') => void;
  isTestMode: boolean;
  bannerDismissed: boolean;
  dismissBanner: () => void;
}

const EnvironmentContext = createContext<EnvironmentContextValue | null>(null);

interface EnvironmentProviderProps {
  children: ReactNode;
  defaultEnvironment?: 'test' | 'production';
  skipStorage?: boolean;
}

export function EnvironmentProvider({ children, defaultEnvironment = 'production', skipStorage = false }: EnvironmentProviderProps) {
  const [environment, setEnvironment] = useState<'test' | 'production'>(defaultEnvironment);
  const [bannerDismissed, setBannerDismissed] = useState(() => {
    if (skipStorage) return false;
    return sessionStorage.getItem('dp_banner_dismissed') === 'true';
  });

  const handleSetEnvironment = useCallback((env: 'test' | 'production') => {
    setEnvironment(env);
    if (env === 'production') {
      setBannerDismissed(false);
      if (!skipStorage) sessionStorage.removeItem('dp_banner_dismissed');
    }
  }, [skipStorage]);

  const dismissBanner = useCallback(() => {
    setBannerDismissed(true);
    if (!skipStorage) sessionStorage.setItem('dp_banner_dismissed', 'true');
  }, [skipStorage]);

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
