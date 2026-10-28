import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  Sparkles,
  Printer,
  Table
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReportsComplianceCenter: React.FC = () => {
  const { addToast, addAuditLog, institutions } = useApp();

  const [selectedReport, setSelectedReport] = useState('APAAR Linkage & Saturation Report');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState<'PDF' | 'CSV' | 'Excel'>('PDF');
  const [dateRange, setDateRange] = useState('2025-26 Academic Year');

  const reportTypes = [
    { title: 'Student Data Report', desc: 'Complete demographic and academic records across institutions', records: '18,42,690 Rows' },
    { title: 'APAAR Linkage & Saturation Report', desc: 'Coverage velocity and state-wise unlinked deficit', records: '97.49% Target' },
    { title: 'Duplicate Detection Dossier', desc: 'Cross-institution concurrent enrolment collisions', records: '1,284 Cases' },
    { title: 'Excess Enrolment Statutory Report', desc: 'Institutions exceeding sanctioned intake ceilings', records: '327 Breaches' },
    { title: 'Institution Compliance Master', desc: 'Accreditation compliance and data quality ratings', records: '4,862 Institutions' },
    { title: 'State-wise Regional Analytics', desc: 'Geographic heatmaps, institution density, and quotas', records: '28 States / UTs' },
    { title: 'Verification & Credential Audit', desc: 'Third-party employer verifications and QR lookups', records: '16.84L Cleared' },
    { title: 'National Security Audit Log', desc: 'Cryptographic access history and APAAR reveal logs', records: 'Tamper-Evident' }
  ];

  const handleGenerate = (format: 'PDF' | 'CSV' | 'Excel') => {
    addToast('Generating Report...', `Compiling ${selectedReport} (${format})`, 'info');
    setTimeout(() => {
      addToast('Report Ready for Download', `${selectedReport} compiled successfully as ${format}.`, 'success');
      addAuditLog('REPORT_GENERATED', `${selectedReport} generated in ${format} format for ${selectedState}`, 'Low');
    }, 700);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                STATUTORY REPORTING ENGINE
              </span>
              <span className="text-xs text-slate-400">• Ministry & Regulatory Exports</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Reports & Compliance Intelligence
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Compile statutory dossiers, admission audits, and APAAR adoption benchmarks formatted for government submissions.
            </p>
          </div>
        </div>
      </div>

      {/* Report Types Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {reportTypes.map((rep, idx) => {
          const isSelected = selectedReport === rep.title;
          return (
            <div
              key={idx}
              onClick={() => setSelectedReport(rep.title)}
              className={`p-4 rounded-xl border cursor-pointer transition text-left flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50/80 dark:bg-blue-950/60 border-blue-500 shadow-sm ring-1 ring-blue-500'
                  : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{rep.records}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  {rep.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {rep.desc}
                </p>
              </div>

              {isSelected && (
                <div className="mt-3 pt-2 border-t border-blue-200 dark:border-blue-800 text-[10px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Selected for Export</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Filter Parameters & Export Actions */}
      <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Configure Report Generation: </span>
          <span className="text-blue-600 dark:text-blue-400 font-mono">{selectedReport}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-slate-500 font-semibold mb-1">State Scope:</label>
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200 font-medium"
            >
              <option value="All">All 28 States & 8 UTs (National Master)</option>
              <option value="Maharashtra">Maharashtra (Western Region)</option>
              <option value="Karnataka">Karnataka (South Region)</option>
              <option value="Tamil Nadu">Tamil Nadu (Southern Region)</option>
              <option value="Uttar Pradesh">Uttar Pradesh (Northern Region)</option>
              <option value="Delhi">Delhi NCR</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-semibold mb-1">Date Range:</label>
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200 font-medium"
            >
              <option value="2025-26 Academic Year">2025-26 Academic Year (Active)</option>
              <option value="2024-25 Academic Year">2024-25 Academic Year</option>
              <option value="Last 90 Days">Last 90 Days Dynamic Feed</option>
              <option value="All Time">All Time Since APAAR Inception</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-semibold mb-1">Export Format:</label>
            <div className="flex gap-2">
              {(['PDF', 'CSV', 'Excel'] as const).map(fmt => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`flex-1 py-2 rounded-lg font-bold text-xs transition ${
                    selectedFormat === fmt
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => handleGenerate(selectedFormat)}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md flex items-center gap-2 hover:scale-102"
          >
            <Download className="w-4 h-4" />
            <span>Generate & Download {selectedFormat}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
