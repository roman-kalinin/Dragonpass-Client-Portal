import { useState, useCallback } from 'react';
import { Rocket, X, ChevronRight, CheckCircle, Circle, ExternalLink } from 'lucide-react';
import { useEnvironment } from '../../contexts/EnvironmentContext';
import { ONBOARDING_STEPS } from './onboardingData';

interface GettingStartedCardProps {
  onNavigate: (view: string) => void;
}

function getCompletedSteps(): string[] {
  try {
    return JSON.parse(localStorage.getItem('dp_checklist_steps') || '[]');
  } catch {
    return [];
  }
}

function isDismissed(): boolean {
  return localStorage.getItem('dp_checklist_dismissed') === 'true';
}

export function GettingStartedCard({ onNavigate }: GettingStartedCardProps) {
  const { isTestMode } = useEnvironment();
  const [dismissed, setDismissed] = useState(isDismissed);
  const [completedSteps] = useState(getCompletedSteps);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    localStorage.setItem('dp_checklist_dismissed', 'true');
  }, []);

  if (!isTestMode || dismissed) return null;

  const completedCount = ONBOARDING_STEPS.filter(s => completedSteps.includes(s.id)).length;
  const progressPct = (completedCount / ONBOARDING_STEPS.length) * 100;

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 mb-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#f1f5f9] flex items-center justify-center">
            <Rocket size={18} className="text-[#0a2333]" />
          </div>
          <div>
            <h2 className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333]">
              Getting Started with Dragonpass API
            </h2>
            <p className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282]">
              {completedCount} of {ONBOARDING_STEPS.length} complete
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="p-1 rounded hover:bg-[#f3f4f6] transition-colors"
        >
          <X size={16} className="text-[#9ca3af]" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-[#e5e7eb] rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-[#0a2333] rounded-full transition-all"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-1">
        {ONBOARDING_STEPS.map((step, i) => {
          const isComplete = completedSteps.includes(step.id);
          const handleClick = () => {
            if (step.linkTo === 'external-docs') {
              window.open('https://docs.dragonpass.com', '_blank');
            } else {
              onNavigate(step.linkTo);
            }
          };

          return (
            <div
              key={step.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#f9fafb] transition-colors cursor-pointer"
              onClick={handleClick}
            >
              {isComplete ? (
                <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
              ) : (
                <Circle size={18} className="text-[#d1d5db] mt-0.5 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-['Cabin',sans-serif] text-[11px] text-[#9ca3af] font-medium">{i + 1}.</span>
                  <span className={`font-['Cabin',sans-serif] text-[14px] font-medium ${isComplete ? 'text-[#6a7282] line-through' : 'text-[#0a2333]'}`}>
                    {step.title}
                  </span>
                </div>
                <p className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282] mt-0.5 ml-5">
                  {step.description}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="font-['Cabin',sans-serif] text-[12px] text-[#0a2333]">
                  {step.linkLabel}
                </span>
                {step.linkTo === 'external-docs' ? (
                  <ExternalLink size={12} className="text-[#6a7282]" />
                ) : (
                  <ChevronRight size={14} className="text-[#6a7282]" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
