import type { ReactNode } from 'react';
import { TopBar } from '../TopBar';
import { IconNav } from '../IconNav';
import { TestModeBanner } from '../shared/TestModeBanner';
import { Toast } from '../Toast';

interface DocPageShellProps {
  activeView: string;
  onNavigate: (id: string) => void;
  children: ReactNode;
}

export function DocPageShell({ activeView, onNavigate, children }: DocPageShellProps) {
  return (
    <div className="flex flex-col overflow-hidden bg-[#f9fafb]" style={{ width: 1440, height: 900 }}>
      <TopBar />
      <TestModeBanner />
      <div className="flex flex-1 overflow-hidden">
        <IconNav activeView={activeView} onNavigate={onNavigate} />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden w-full">
            {children}
          </div>
        </main>
      </div>
      <Toast />
    </div>
  );
}
