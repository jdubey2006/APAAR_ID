import React, { useState } from 'react';
import { 
  Copy, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight, 
  Eye, 
  X, 
  UserCheck, 
  Search,
  Filter,
  Check,
  Scale
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DuplicateCase } from '../../types';
import { CrossInstitutionGraph } from './CrossInstitutionGraph';

export const DuplicateIntelligenceCenter: React.FC = () => {
  const { 
    duplicateCases, 
    handleDuplicateResolution, 
    selectedDuplicate, 
    setSelectedDuplicate,
    addToast 
  } = useApp();

  const [activeTabFilter, setActiveTabFilter] = useState<'All' | 'Potential' | 'Confirmed' | 'Under Review' | 'Resolved'>('All');
  const [activeCompareCase, setActiveCompareCase] = useState<DuplicateCase>(duplicateCases[0]);

  // Metrics
  const stats = {
    potential: 1284,
    confirmed: 482,
    underReview: 391,
    resolved: 411
  };

  const filteredCases = duplicateCases.filter(c => {
    if (activeTabFilter === 'All') return true;
    return c.status === activeTabFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                IDENTITY INTEGRITY CELL
              </span>
              <span className="text-xs text-slate-400">• Anti-Fraud Detection Engine</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Duplicate Intelligence Center
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Automated identity collision detection preventing ghost enrolments, seat blocking, and duplicate scholarship disbursements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Match Algorithm:</span>
            <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">
              Biometric Hash + Fuzzy Levenshtein
            </span>
          </div>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          onClick={() => setActiveTabFilter('Potential')}
          className="bg-white dark:bg-navy-900 p-4 rounded-xl border border-red-200 dark:border-red-800/60 shadow-2xs hover:shadow-md cursor-pointer transition"
        >
          <div className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
            Potential Duplicates
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.potential.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-400">High-confidence matches</span>
        </div>

        <div 
          onClick={() => setActiveTabFilter('Confirmed')}
          className="bg-white dark:bg-navy-900 p-4 rounded-xl border border-amber-200 dark:border-amber-800/60 shadow-2xs hover:shadow-md cursor-pointer transition"
        >
          <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
            Confirmed Duplicates
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.confirmed.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-400">Statutory breaches marked</span>
        </div>

        <div 
          onClick={() => setActiveTabFilter('Under Review')}
          className="bg-white dark:bg-navy-900 p-4 rounded-xl border border-blue-200 dark:border-blue-800/60 shadow-2xs hover:shadow-md cursor-pointer transition"
        >
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            Under Review
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.underReview.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-400">Pending nodal officer inquiry</span>
        </div>

        <div 
          onClick={() => setActiveTabFilter('Resolved')}
          className="bg-white dark:bg-navy-900 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/60 shadow-2xs hover:shadow-md cursor-pointer transition"
        >
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
            Resolved Cases
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.resolved.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-400">Successfully validated</span>
        </div>
      </div>

      {/* Side-by-Side Similarity Comparison Canvas (Real-world scenario) */}
      <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                ACTIVE INVESTIGATION
              </span>
              <span className="text-xs text-slate-400 font-mono">Case #{activeCompareCase.id}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
              Side-by-Side Biometric & Academic Record Comparison
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Similarity Metric:</span>
            <div className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-black text-xs border border-red-300 dark:border-red-800">
              {activeCompareCase.similarityScore}% Match
            </div>
          </div>
        </div>

        {/* Side-by-side Cards: Student A vs Student B */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Student A Card */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2.5 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
              <span className="font-bold text-blue-600 dark:text-blue-400">RECORD ALPHA (Primary)</span>
              <span className="font-mono text-slate-400 text-[10px]">Enrolment: {activeCompareCase.studentA.enrolmentNo}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Student Name:</span>
              <span className="font-bold text-slate-900 dark:text-white">{activeCompareCase.studentA.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date of Birth:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{activeCompareCase.studentA.dob}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Institution:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{activeCompareCase.studentA.institution}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Programme:</span>
              <span className="text-slate-700 dark:text-slate-300">{activeCompareCase.studentA.programme}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Admission Year:</span>
              <span className="font-mono text-slate-900 dark:text-white">{activeCompareCase.studentA.admissionYear}</span>
            </div>
          </div>

          {/* Student B Card */}
          <div className="p-4 rounded-xl bg-red-50/40 dark:bg-red-950/20 border border-red-200 dark:border-red-800/60 space-y-2.5 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-red-200 dark:border-red-800">
              <span className="font-bold text-red-600 dark:text-red-400">RECORD BETA (Flagged Collision)</span>
              <span className="font-mono text-slate-400 text-[10px]">Enrolment: {activeCompareCase.studentB.enrolmentNo}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Student Name:</span>
              <span className="font-bold text-slate-900 dark:text-white">{activeCompareCase.studentB.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date of Birth:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{activeCompareCase.studentB.dob}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Institution:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{activeCompareCase.studentB.institution}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Programme:</span>
              <span className="text-slate-700 dark:text-slate-300">{activeCompareCase.studentB.programme}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Admission Year:</span>
              <span className="font-mono text-slate-900 dark:text-white">{activeCompareCase.studentB.admissionYear}</span>
            </div>
          </div>
        </div>

        {/* Reasons Checklist */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            Match Detection Diagnostic Reasons:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {activeCompareCase.reasons.map((r, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Check className="w-3.5 h-3.5 text-red-500 shrink-0 font-bold" />
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Decision Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2">
          <button
            onClick={() => handleDuplicateResolution(activeCompareCase.id, 'dismiss')}
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition"
          >
            Mark as Not Duplicate
          </button>
          <button
            onClick={() => handleDuplicateResolution(activeCompareCase.id, 'review')}
            className="px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 text-xs font-bold transition"
          >
            Escalate for Nodal Review
          </button>
          <button
            onClick={() => handleDuplicateResolution(activeCompareCase.id, 'confirm')}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition"
          >
            Confirm Duplicate & Freeze Second Enrolment
          </button>
        </div>
      </div>

      {/* Cross-Institution Visual Graph */}
      <CrossInstitutionGraph />

      {/* Duplicate Cases Registry Table */}
      <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Flagged Identity Clusters ({filteredCases.length} Cases)
          </h3>
          <span className="text-xs text-slate-400">Click any row to load side-by-side comparison</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5">Case ID</th>
                <th className="p-3.5">APAAR ID</th>
                <th className="p-3.5">Candidate Alpha</th>
                <th className="p-3.5">Candidate Beta</th>
                <th className="p-3.5">Similarity</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCases.map(c => (
                <tr 
                  key={c.id}
                  onClick={() => setActiveCompareCase(c)}
                  className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/50 cursor-pointer transition ${
                    activeCompareCase.id === c.id ? 'bg-blue-50/50 dark:bg-blue-950/40' : ''
                  }`}
                >
                  <td className="p-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">
                    {c.id}
                  </td>
                  <td className="p-3.5 font-mono text-slate-700 dark:text-slate-300">
                    {c.apaarId}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 dark:text-white">{c.studentA.name}</div>
                    <div className="text-[11px] text-slate-400">{c.studentA.institution}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 dark:text-white">{c.studentB.name}</div>
                    <div className="text-[11px] text-slate-400">{c.studentB.institution}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-black text-red-600 dark:text-red-400 text-xs">
                      {c.similarityScore}%
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.status === 'Confirmed' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                      c.status === 'Potential' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCompareCase(c);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-semibold rounded-lg"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Compare</span>
                    </button>
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
