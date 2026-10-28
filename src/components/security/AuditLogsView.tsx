import React, { useState } from 'react';
import { 
  FileClock, 
  Search, 
  Filter, 
  ShieldCheck, 
  Download, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuditLogsView: React.FC = () => {
  const { auditLogs, addToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');

  const filtered = auditLogs.filter(log => {
    const matchesRisk = riskFilter === 'All' || log.riskLevel === riskFilter;
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.includes(searchQuery);

    return matchesRisk && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                SOVEREIGN AUDIT TRAIL
              </span>
              <span className="text-xs text-slate-400">• Immutable Cryptographic Ledger</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              National Security Audit Logs
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Chronological, non-repudiable transaction log recording all student record queries, data ingests, APAAR reveals, and verification events.
            </p>
          </div>

          <button
            onClick={() => addToast('Audit Trail Exported', 'Cryptographically verified security audit dump generated', 'success')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Audit Trail</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-navy-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 dark:text-slate-300">Risk Severity:</span>
          {(['All', 'High', 'Medium', 'Low'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRiskFilter(r)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                riskFilter === r
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search action, user, IP, or resource..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
          />
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5">Timestamp (UTC+5:30)</th>
                <th className="p-3.5">User Identity</th>
                <th className="p-3.5">Action Code</th>
                <th className="p-3.5">Resource Target</th>
                <th className="p-3.5">IP & Origin Gateway</th>
                <th className="p-3.5">Result</th>
                <th className="p-3.5 text-right">Risk Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-mono text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 dark:text-white">{log.user}</div>
                    <div className="text-[10px] text-slate-400">{log.role}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800 text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-700 dark:text-slate-300 max-w-[220px] truncate">
                    {log.resource}
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-slate-500">
                    {log.ipAddress}
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.result === 'Success' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      log.result === 'Denied' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {log.result}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.riskLevel === 'High' ? 'text-red-600 bg-red-50 dark:bg-red-950/60' :
                      log.riskLevel === 'Medium' ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/60' :
                      'text-slate-500 bg-slate-100 dark:bg-slate-800'
                    }`}>
                      {log.riskLevel}
                    </span>
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
