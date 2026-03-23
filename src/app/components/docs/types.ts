import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface Frame {
  id: string;
  title: string;
  description: string;
  category?: string;
  render: () => ReactNode;
}

export interface FlowTab {
  id: string;
  label: string;
  icon: LucideIcon;
  frames: Frame[];
}
