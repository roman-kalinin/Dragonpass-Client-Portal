import type { ReactNode } from 'react';
import { TopBar } from '../TopBar';
import { IconNav } from '../IconNav';
import { TestModeBanner } from './TestModeBanner';
import { Toast } from '../Toast';

interface PageShellProps {
  activeView: string;
  onNavigate: (id: string) => void;
  children: ReactNode;
}

export function PageShell({ activeView, onNavigate, children }: PageShellProps) {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f9fafb]">
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
