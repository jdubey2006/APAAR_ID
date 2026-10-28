import React, { useState } from 'react';
import { 
  CheckSquare, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Search, 
  Filter, 
  Eye, 
  ArrowRight, 
  ShieldCheck, 
  X,
  FileCheck2,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ValidationIssue } from '../../types';

export const ValidationCenter: React.FC = () => {
  const { 
    validationIssues, 
    resolveValidationIssue, 
    setSelectedDuplicate, 
    duplicateCases, 
    setActiveTab, 
    addToast 
  } = useApp();

  const [selectedIssue, setSelectedIssue] = useState<ValidationIssue | null>(null);
  const [severityFilter, setSeverityFilter] = useState<'All' | 'Critical' | 'Error' | 'Warning'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const automatedChecks = [
    { name: '1. Required Fields Check', status: 'Passed', icon: CheckCircle2 },
    { name: '2. APAAR Luhn-10 Format', status: 'Passed', icon: CheckCircle2 },
    { name: '3. Internal Duplicate Records', status: 'Passed', icon: CheckCircle2 },
    { name: '4. Global Duplicate APAAR IDs', status: 'Warning', icon: AlertTriangle },
    { name: '5. Admission vs Approved Intake', status: 'Warning', icon: AlertTriangle },
    { name: '6. Cross-Institution Duplication', status: 'Action Required', icon: ShieldAlert },
    { name: '7. Statutory Category Quota', status: 'Passed', icon: CheckCircle2 },
    { name: '8. Institution AICTE Validity', status: 'Passed', icon: CheckCircle2 },
    { name: '9. Missing Date of Birth / Aadhaar', status: 'Warning', icon: AlertTriangle },
    { name: '10. Cross-Field Consistency', status: 'Passed', icon: CheckCircle2 },
    { name: '11. Enrollment Year Bounds', status: 'Passed', icon: CheckCircle2 },
    { name: '12. Programme Canonical Mapping', status: 'Passed', icon: CheckCircle2 },
  ];

  const filteredIssues = validationIssues.filter(issue => {
    const matchesSeverity = severityFilter === 'All' || issue.severity === severityFilter;
    const matchesQuery = 
      issue.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.apaarId.includes(searchQuery) ||
      issue.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.issueType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesQuery;
  });

  const handleInvestigate = (issue: ValidationIssue) => {
    if (issue.issueType.includes('Duplicate') || issue.issueType.includes('Cross-Institution')) {
      const match = duplicateCases.find(d => d.apaarId === issue.apaarId);
      if (match) {
        setSelectedDuplicate(match);
        setActiveTab('duplicates');
        return;
      }
    }
    setSelectedIssue(issue);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                STATUTORY RULE ENGINE
              </span>
              <span className="text-xs text-slate-400">• Automated Integrity Audit</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Validation Center
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Automated 12-point statutory checks covering APAAR formats, cross-institution duplication, and approved quota adherence.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Total Flagged:</span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold text-xs border border-amber-300 dark:border-amber-800">
              {validationIssues.filter(i => i.status === 'Open').length} Open Issues
            </span>
          </div>
        </div>
      </div>

      {/* 12 Statutory Checks Matrix Strip */}
      <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-blue-600" />
            <span>AICTE Statutory Rules Execution Suite (12 / 12 Active)</span>
          </h3>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Continuous Real-time Evaluation
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          {automatedChecks.map((check, idx) => {
            const Icon = check.icon;
            const isAlert = check.status === 'Action Required';
            const isWarn = check.status === 'Warning';

            return (
              <div 
                key={idx}
                className={`p-2.5 rounded-xl border flex flex-col justify-between ${
                  isAlert ? 'bg-red-50/50 dark:bg-red-950/30 border-red-200 dark:border-red-800' :
                  isWarn ? 'bg-amber-50/50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800' :
                  'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60'
                }`}
              >
                <div className="font-semibold text-slate-800 dark:text-slate-200 text-[11px] line-clamp-1 mb-1">
                  {check.name}
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className={`font-bold ${
                    isAlert ? 'text-red-600 dark:text-red-400' :
                    isWarn ? 'text-amber-600 dark:text-amber-400' :
                    'text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {check.status}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${
                    isAlert ? 'text-red-500' : isWarn ? 'text-amber-500' : 'text-emerald-500'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filterable Validation Issues Table */}
      <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Table Filters Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Severity:</span>
            {(['All', 'Critical', 'Error', 'Warning'] as const).map(sev => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  severityFilter === sev
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by student, APAAR, or institution..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
            />
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5">Severity</th>
                <th className="p-3.5">Student</th>
                <th className="p-3.5">APAAR ID</th>
                <th className="p-3.5">Institution</th>
                <th className="p-3.5">Issue Detail</th>
                <th className="p-3.5">Detected</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredIssues.map(issue => {
                const isCritical = issue.severity === 'Critical';
                const isError = issue.severity === 'Error';
                const isResolved = issue.status === 'Resolved';

                return (
                  <tr key={issue.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                    <td className="p-3.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                        isCritical ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                        isError ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      }`}>
                        {isCritical ? '🔴 Critical' : isError ? '🟠 Error' : '🟡 Warning'}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                      {issue.studentName}
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                      {issue.apaarId}
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300 max-w-[200px] truncate">
                      {issue.institutionName}
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {issue.issueType}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {issue.description}
                      </div>
                    </td>
                    <td className="p-3.5 text-[11px] text-slate-400 whitespace-nowrap font-mono">
                      {issue.detectedAt}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        isResolved 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {issue.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleInvestigate(issue)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold rounded-lg transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Investigate</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Investigation Details Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-900 to-navy-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold">
                  Validation Issue Dossier #{selectedIssue.id}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedIssue(null)}
                className="p-1 text-slate-400 hover:text-white rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Student Name:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedIssue.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">APAAR ID:</span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{selectedIssue.apaarId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Institution:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedIssue.institutionName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Issue Category:</span>
                  <span className="font-bold text-red-600 dark:text-red-400">{selectedIssue.issueType}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200 leading-relaxed">
                <strong>Rule Diagnostic Report:</strong> {selectedIssue.description}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    resolveValidationIssue(selectedIssue.id);
                    setSelectedIssue(null);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-xs transition"
                >
                  Resolve & Synchronize
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
