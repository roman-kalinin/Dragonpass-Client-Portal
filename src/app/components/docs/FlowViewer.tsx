import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Frame } from './types';
import { FrameViewport } from './FrameViewport';

interface FlowViewerProps {
  frames: Frame[];
}

export function FlowViewer({ frames }: FlowViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset to first frame when flow changes
  useEffect(() => setActiveIndex(0), [frames]);

  const goPrev = useCallback(() => setActiveIndex(i => Math.max(0, i - 1)), []);
  const goNext = useCallback(() => setActiveIndex(i => Math.min(frames.length - 1, i + 1)), [frames.length]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goPrev, goNext]);

  const active = frames[activeIndex];
  if (!active) return null;

  // Build category groups for sidebar
  const categories: { label: string | null; frames: { frame: Frame; globalIndex: number }[] }[] = [];
  let currentCat: string | null = null;
  frames.forEach((f, i) => {
    if (f.category !== currentCat) {
      currentCat = f.category ?? null;
      categories.push({ label: currentCat, frames: [] });
    }
    categories[categories.length - 1].frames.push({ frame: f, globalIndex: i });
  });

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      <div className="w-[280px] shrink-0 border-r border-[#e5e7eb] bg-white flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-[#e5e7eb] shrink-0">
          <span className="font-['Cabin',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-wider font-semibold">
            {frames.length} frames
          </span>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {categories.map((cat, ci) => (
            <div key={ci}>
              {cat.label && (
                <div className="px-4 pt-3 pb-1">
                  <span className="font-['Cabin',sans-serif] text-[10px] text-[#9ca3af] uppercase tracking-wider font-semibold">
                    {cat.label}
                  </span>
                </div>
              )}
              {cat.frames.map(({ frame, globalIndex }) => (
                <button
                  key={frame.id}
                  onClick={() => setActiveIndex(globalIndex)}
                  className={`cursor-pointer w-full text-left px-4 py-2 flex items-start gap-2.5 transition-colors ${
                    globalIndex === activeIndex
                      ? 'bg-[#0a2333] text-white'
                      : 'text-[#0a2333] hover:bg-[#f9fafb]'
                  }`}
                >
                  <span
                    className={`font-['Cabin',sans-serif] text-[11px] font-semibold mt-0.5 w-5 shrink-0 text-right ${
                      globalIndex === activeIndex ? 'text-white/60' : 'text-[#9ca3af]'
                    }`}
                  >
                    {globalIndex + 1}
                  </span>
                  <span className="font-['Cabin',sans-serif] text-[12px] font-medium leading-tight">
                    {frame.title}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Viewport */}
        <FrameViewport key={active.id}>
          {active.render()}
        </FrameViewport>

        {/* Footer: info + nav */}
        <div className="shrink-0 border-t border-[#e5e7eb] bg-white px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-['Cabin',sans-serif] font-bold text-[14px] text-[#0a2333] truncate">
              {active.title}
            </h3>
            <p className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282] mt-0.5 line-clamp-2">
              {active.description}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={goPrev}
              disabled={activeIndex === 0}
              className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282] tabular-nums w-12 text-center">
              {activeIndex + 1} / {frames.length}
            </span>
            <button
              onClick={goNext}
              disabled={activeIndex === frames.length - 1}
              className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
