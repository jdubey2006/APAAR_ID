import React, { useState } from 'react';
import { Lock, ShieldAlert, X, Eye, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';

interface Props {
  student: Student;
  onClose: () => void;
}

export const RevealApaarModal: React.FC<Props> = ({ student, onClose }) => {
  const { revealStudentApaar, currentUser } = useApp();
  const [justification, setJustification] = useState('Official Statutory Verification Audit');
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    revealStudentApaar(student.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-md bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-900 to-navy-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold">
              Decrypt Sensitive APAAR Identifier
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-amber-800 dark:text-amber-200 leading-relaxed text-[11px]">
              <strong>Privacy Protection Notice (DPDP Act Compliance): </strong>
              Unmasking candidate APAAR identifiers generates an immutable entry in the AICTE National Security Audit Trail with your User ID ({currentUser.name}) and IP address.
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              Audit Justification:
            </label>
            <select
              value={justification}
              onChange={e => setJustification(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:outline-hidden"
            >
              <option value="Official Statutory Verification Audit">Official Statutory Verification Audit</option>
              <option value="Duplicate Collision Investigation">Duplicate Collision Investigation</option>
              <option value="Court / Regulatory Subpoena Compliance">Court / Regulatory Subpoena Compliance</option>
              <option value="Institutional Scholarship Verification">Institutional Scholarship Verification</option>
            </select>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
            Student: <strong className="text-slate-900 dark:text-white">{student.name}</strong> ({student.institutionName})
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={e => setConfirmed(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
              I certify that I am authorized to inspect this student's unmasked APAAR identifier.
            </span>
          </label>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              disabled={!confirmed}
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold disabled:opacity-40 transition shadow-xs flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Decrypt & Log Action</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
