import { AlertTriangle, X } from 'lucide-react';
import { useApp } from '../store';

export function UnsavedChangesDialog() {
  const { state, dispatch } = useApp();

  if (!state.showUnsavedWarning) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[420px] p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#fef3c7] flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-[#d97706]" />
          </div>
          <div className="flex-1">
            <h3 className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333] mb-1">
              Unsaved Changes
            </h3>
            <p className="font-['Cabin',sans-serif] text-[14px] text-[#62748e]">
              You have unsaved changes to your dashboard. Would you like to save before leaving?
            </p>
          </div>
          <button
            onClick={() => dispatch({ type: 'SHOW_UNSAVED_WARNING', payload: false })}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100"
          >
            <X size={16} className="text-[#62748e]" />
          </button>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => dispatch({ type: 'DISCARD_CHANGES_AND_NAVIGATE' })}
            className="h-9 rounded-lg border border-[#d1d5dc] px-4 font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a2333] hover:bg-[#f9fafb] transition-colors"
          >
            Discard
          </button>
          <button
            onClick={() => {
              dispatch({ type: 'SAVE_DASHBOARD' });
              setTimeout(() => {
                dispatch({ type: 'SAVE_COMPLETE' });
                dispatch({ type: 'DISCARD_CHANGES_AND_NAVIGATE' });
              }, 500);
            }}
            className="h-9 rounded-lg bg-[#0a2333] px-4 font-['Cabin',sans-serif] font-medium text-[14px] text-white hover:bg-[#152c3c] transition-colors"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export function DeleteConfirmDialog() {
  const { state, dispatch } = useApp();
  const dashboardToDelete = state.dashboards.find(d => d.id === state.showDeleteConfirm);

  if (!state.showDeleteConfirm || !dashboardToDelete) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[420px] p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#fee2e2] flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-[#d4183d]" />
          </div>
          <div className="flex-1">
            <h3 className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333] mb-1">
              Delete Dashboard
            </h3>
            <p className="font-['Cabin',sans-serif] text-[14px] text-[#62748e]">
              Are you sure you want to delete "{dashboardToDelete.name}"? This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => dispatch({ type: 'SHOW_DELETE_CONFIRM', payload: null })}
            className="h-9 rounded-lg border border-[#d1d5dc] px-4 font-['Cabin',sans-serif] font-medium text-[14px] text-[#0a2333] hover:bg-[#f9fafb] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => dispatch({ type: 'DELETE_DASHBOARD', payload: state.showDeleteConfirm! })}
            className="h-9 rounded-lg bg-[#d4183d] px-4 font-['Cabin',sans-serif] font-medium text-[14px] text-white hover:bg-[#b91c1c] transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
