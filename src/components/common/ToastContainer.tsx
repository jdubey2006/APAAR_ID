import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldAlert, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl shadow-xl border backdrop-blur-md animate-fade-in flex items-start gap-3 transition-all ${
              isSuccess ? 'bg-slate-900/95 text-white border-emerald-500/40' :
              isError ? 'bg-slate-900/95 text-white border-red-500/50' :
              isWarning ? 'bg-slate-900/95 text-white border-amber-500/50' :
              'bg-slate-900/95 text-white border-blue-500/40'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {isError && <ShieldAlert className="w-4 h-4 text-red-400" />}
              {isWarning && <AlertTriangle className="w-4 h-4 text-amber-400" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-blue-400" />}
            </div>

            <div className="flex-1 text-xs">
              <div className="font-bold text-white text-xs">
                {toast.title}
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                {toast.message}
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
