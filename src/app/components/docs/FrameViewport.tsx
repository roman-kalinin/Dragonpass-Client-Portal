import { useRef, useState, useEffect, type ReactNode } from 'react';

const TARGET_W = 1440;
const TARGET_H = 900;

interface FrameViewportProps {
  children: ReactNode;
}

export function FrameViewport({ children }: FrameViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      const s = Math.min(width / TARGET_W, height / TARGET_H, 1);
      setScale(Math.max(0.2, s));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex-1 overflow-hidden bg-[#f3f4f6] relative">
      <div
        className="absolute top-0 left-0"
        style={{
          width: TARGET_W * scale,
          height: TARGET_H * scale,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: TARGET_W,
            height: TARGET_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
