import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useApp } from '../store';

export function Toast() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    if (state.toastMessage) {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_TOAST', payload: null });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.toastMessage, dispatch]);

  if (!state.toastMessage) return null;

  const icons = {
    success: <CheckCircle size={16} className="text-[#008236]" />,
    error: <XCircle size={16} className="text-[#d4183d]" />,
    info: <Info size={16} className="text-[#1447e6]" />,
  };

  const bgColors = {
    success: 'bg-[#f0fdf4] border-[#bbf7d0]',
    error: 'bg-[#fef2f2] border-[#fecaca]',
    info: 'bg-[#eff6ff] border-[#bedbff]',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2">
      <div className={`flex items-center gap-2 px-4 py-3 rounded-lg border shadow-lg ${bgColors[state.toastType]}`}>
        {icons[state.toastType]}
        <span className="font-['Cabin',sans-serif] text-[14px] text-[#0a2333]">{state.toastMessage}</span>
        <button
          onClick={() => dispatch({ type: 'SET_TOAST', payload: null })}
          className="ml-2 w-5 h-5 rounded flex items-center justify-center hover:bg-black/5"
        >
          <X size={12} className="text-[#62748e]" />
        </button>
      </div>
    </div>
  );
}
