import React, { useState } from 'react';
import { 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Search, 
  Filter, 
  Download, 
  Building2, 
  ArrowRight,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Institution } from '../../types';

export const AdmissionCompliance: React.FC = () => {
  const { institutions, setSelectedInstitution, setActiveTab, addToast } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const excessCount = institutions.filter(i => i.excessEnrolment > 0).length;
  const compliantCount = institutions.filter(i => i.complianceStatus === 'Compliant').length;
  const attentionCount = institutions.filter(i => i.complianceStatus === 'Needs Attention').length;

  const filtered = institutions.filter(inst => {
    const matchesStatus = 
      filterStatus === 'All' ? true :
      filterStatus === 'Excess' ? inst.excessEnrolment > 0 :
      inst.complianceStatus === filterStatus;

    const matchesSearch = 
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.aicteId.includes(searchQuery) ||
      inst.state.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                REGULATORY INTAKE CEILING
              </span>
              <span className="text-xs text-slate-400">• Statutory Seat Verification</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Admission Compliance & Excess Monitoring
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Automated institutional audit comparing approved AICTE intake caps against live student enrolments and supernumerary quotas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => addToast('Compliance Audit Exported', 'Statutory intake audit dossier exported to CSV', 'success')}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Compliance Audit</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div 
          onClick={() => setFilterStatus('Compliant')}
          className="bg-white dark:bg-navy-900 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/60 shadow-2xs hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Statutorily Compliant
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {compliantCount} Institutions
          </div>
          <span className="text-[11px] text-slate-400">Within sanctioned intake ceiling</span>
        </div>

        <div 
          onClick={() => setFilterStatus('Excess')}
          className="bg-white dark:bg-navy-900 p-4 rounded-xl border border-red-200 dark:border-red-800/60 shadow-2xs hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
              Excess Admission Breaches
            </span>
            <ShieldAlert className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-black text-red-600 dark:text-red-400">
            {excessCount} Institutions
          </div>
          <span className="text-[11px] text-slate-400">Enrolment &gt; Sanctioned Quota</span>
        </div>

        <div 
          onClick={() => setFilterStatus('Needs Attention')}
          className="bg-white dark:bg-navy-900 p-4 rounded-xl border border-amber-200 dark:border-amber-800/60 shadow-2xs hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              High Capacity Saturation
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {attentionCount} Institutions
          </div>
          <span className="text-[11px] text-slate-400">&gt;98% seat utilization</span>
        </div>
      </div>

      {/* Compliance Registry Table */}
      <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Filter:</span>
            {['All', 'Compliant', 'Needs Attention', 'Excess'].map(f => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  filterStatus === f
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search institution or AICTE ID..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5">Institution Name</th>
                <th className="p-3.5">AICTE ID</th>
                <th className="p-3.5">State</th>
                <th className="p-3.5">Sanctioned Intake</th>
                <th className="p-3.5">Supernumerary</th>
                <th className="p-3.5">Actual Enrolment</th>
                <th className="p-3.5">Excess</th>
                <th className="p-3.5">Utilization %</th>
                <th className="p-3.5">Compliance Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(inst => {
                const hasExcess = inst.excessEnrolment > 0;
                const utilization = ((inst.actualEnrolment / inst.approvedIntake) * 100).toFixed(1);

                return (
                  <tr 
                    key={inst.id}
                    className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition ${
                      hasExcess ? 'bg-red-50/30 dark:bg-red-950/20' : ''
                    }`}
                  >
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {inst.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {inst.type} • {inst.city}
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                      {inst.aicteId}
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">
                      {inst.state}
                    </td>
                    <td className="p-3.5 font-bold font-mono text-slate-900 dark:text-white">
                      {inst.approvedIntake.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3.5 font-mono text-slate-500">
                      +{inst.supernumerary}
                    </td>
                    <td className="p-3.5 font-black font-mono text-slate-900 dark:text-white">
                      {inst.actualEnrolment.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3.5">
                      {hasExcess ? (
                        <span className="font-black text-red-600 dark:text-red-400 font-mono text-xs">
                          +{inst.excessEnrolment} Excess
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono">0</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className={`font-mono font-bold ${
                        Number(utilization) > 100 ? 'text-red-600' :
                        Number(utilization) > 95 ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {utilization}%
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inst.complianceStatus === 'Non-Compliant' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                        inst.complianceStatus === 'Needs Attention' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}>
                        {inst.complianceStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedInstitution(inst);
                          setActiveTab('institutions');
                        }}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold"
                      >
                        Inspect Profile
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
