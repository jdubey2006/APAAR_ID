import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  XCircle,
  FileText,
  Search
} from 'lucide-react';
import { INITIAL_CONSENTS } from '../../data/mockData';
import { StudentConsent } from '../../types';
import { useApp } from '../../context/AppContext';

export const ConsentPrivacyCenter: React.FC = () => {
  const { addToast } = useApp();
  const [consents, setConsents] = useState<StudentConsent[]>(INITIAL_CONSENTS);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Granted' | 'Pending' | 'Revoked'>('All');

  const filtered = consents.filter(c => {
    if (statusFilter === 'All') return true;
    return c.status === statusFilter;
  });

  const handleRevokeConsent = (id: string) => {
    setConsents(prev => prev.map(c => c.id === id ? { ...c, status: 'Revoked' } : c));
    addToast('Consent Revoked', 'Student consent status updated to Revoked. Third-party access terminated.', 'warning');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                DPDP ACT 2023 COMPLIANCE
              </span>
              <span className="text-xs text-slate-400">• Consent Architecture</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Consent & Privacy Center
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Granular consent lifecycle management enforcing explicit authorization for third-party background checks and ABC credit transfers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>DPDP Sovereign Standard</span>
            </span>
          </div>
        </div>
      </div>

      {/* 4 Consent Principles Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="font-bold text-slate-900 dark:text-white mb-1">Purpose Limitation</div>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
            Data processed exclusively for academic validation and statutory quota oversight.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="font-bold text-slate-900 dark:text-white mb-1">Masked By Default</div>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
            12-digit APAAR numbers masked on all public screens; cryptographic reveal requires justification.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="font-bold text-slate-900 dark:text-white mb-1">Right to Withdraw</div>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
            Students retain irrevocable authority to revoke external employer background verification access.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="font-bold text-slate-900 dark:text-white mb-1">Zero-Knowledge Verification</div>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
            Public verification reveals only binary validation without exposing sensitive demographic attributes.
          </p>
        </div>
      </div>

      {/* Consent Records Table */}
      <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Active Student Data Sharing Authorizations
          </h3>
          <div className="flex items-center gap-2">
            {(['All', 'Granted', 'Pending', 'Revoked'] as const).map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5">Student Scholar</th>
                <th className="p-3.5">APAAR ID</th>
                <th className="p-3.5">Authorized Verifier</th>
                <th className="p-3.5">Designated Purpose</th>
                <th className="p-3.5">Valid Until</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 dark:text-white">{c.studentName}</div>
                    <div className="text-[11px] text-slate-400">{c.institution}</div>
                  </td>
                  <td className="p-3.5 font-mono text-slate-600 dark:text-slate-300">
                    {c.apaarId}
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">
                    {c.authorizedParty}
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                    {c.purpose}
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-slate-500">
                    {c.expiryDate}
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.status === 'Granted' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      c.status === 'Pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    {c.status === 'Granted' && (
                      <button
                        onClick={() => handleRevokeConsent(c.id)}
                        className="px-2.5 py-1 rounded bg-red-50 dark:bg-red-950/60 hover:bg-red-100 text-red-600 dark:text-red-400 font-bold transition text-[11px]"
                      >
                        Revoke Consent
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
