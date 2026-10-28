import React, { useState } from 'react';
import { 
  Building2, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Link2, 
  Users, 
  Scale, 
  FileText, 
  Activity, 
  Key, 
  FileClock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Download
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { Institution } from '../../types';
import { useApp } from '../../context/AppContext';

interface Props {
  institution: Institution;
  onClose: () => void;
}

export const InstitutionProfileModal: React.FC<Props> = ({ institution, onClose }) => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'admissions' | 'apaar' | 'validation' | 'analytics' | 'submissions' | 'audit' | 'api'>('overview');

  const programmeBreakdown = [
    { name: 'Computer Engg', intake: 240, enrolled: 245, apaarLinked: 242 },
    { name: 'Info Technology', intake: 180, enrolled: 180, apaarLinked: 178 },
    { name: 'Electronics & Comm', intake: 180, enrolled: 178, apaarLinked: 175 },
    { name: 'Mechanical Engg', intake: 180, enrolled: 184, apaarLinked: 181 },
    { name: 'Civil Engg', intake: 120, enrolled: 118, apaarLinked: 115 },
    { name: 'Electrical Engg', intake: 120, enrolled: 119, apaarLinked: 116 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div 
        className="w-full max-w-4xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Strip with Institution Identity */}
        <div className="p-6 bg-gradient-to-r from-blue-900 via-navy-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-500/30">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-cyan-300 shadow-md shrink-0">
              <Building2 className="w-7 h-7" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                  AICTE ID: {institution.aicteId}
                </span>
                <span className="text-xs text-slate-300">{institution.type}</span>
              </div>
              <h2 className="text-lg md:text-xl font-black text-white mt-1">
                {institution.name}
              </h2>
              <div className="text-xs text-slate-300 mt-0.5">
                {institution.city}, {institution.state} • Nodal Contact: {institution.contactEmail}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {institution.dataQualityScore}%
              </div>
              <span className="text-[10px] text-slate-300 uppercase font-semibold">
                Data Quality Score
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 9 Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-center gap-1 overflow-x-auto text-xs">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'students', label: 'Students' },
            { id: 'admissions', label: 'Admissions' },
            { id: 'apaar', label: 'APAAR Coverage' },
            { id: 'validation', label: 'Validation' },
            { id: 'analytics', label: 'Analytics' },
            { id: 'submissions', label: 'Submissions' },
            { id: 'audit', label: 'Audit Trail' },
            { id: 'api', label: 'API Integration' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6 text-xs">
          {activeTab === 'overview' && (
            <>
              {/* Institution High-Level KPI Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">Sanctioned Intake</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    {institution.approvedIntake.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-slate-400">Approved Seats</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">Actual Enrolled</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    {institution.actualEnrolment.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-slate-400">+{institution.supernumerary} Supernumerary</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">APAAR Coverage</div>
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {institution.apaarCoverageRate}%
                  </div>
                  <span className="text-[10px] text-emerald-600">High Saturation</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">Verified Records</div>
                  <div className="text-lg font-bold text-cyan-600 dark:text-cyan-400 mt-0.5">
                    {institution.verifiedRecordsCount.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-slate-400">DigiLocker Synced</span>
                </div>
              </div>

              {/* Excess Enrolment Alert Notice if Applicable */}
              {institution.excessEnrolment > 0 && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-red-800 dark:text-red-300">
                      Excess Admission Violation Alert:
                    </span>
                    <p className="text-red-700 dark:text-red-200 text-xs mt-0.5">
                      This institution has admitted <strong>+{institution.excessEnrolment} excess students</strong> above statutory AICTE sanctioned intake and permissible supernumerary quota. Review required before degree endorsement.
                    </p>
                  </div>
                </div>
              )}

              {/* Programme Breakdown Chart */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Programme-Wise Intake & APAAR Linkage
                  </h4>
                  <span className="text-[11px] text-slate-400">Active Academic Year 2024-2028</span>
                </div>

                <div className="h-56 w-full bg-slate-50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={programmeBreakdown} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                      <YAxis stroke="#94a3b8" fontSize={10} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0f172a', 
                          borderRadius: '0.5rem', 
                          color: '#fff',
                          fontSize: '11px' 
                        }}
                      />
                      <Bar dataKey="intake" name="Sanctioned Intake" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="enrolled" name="Actual Enrolment" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="apaarLinked" name="APAAR Linked" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {activeTab !== 'overview' && (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700">
              <Building2 className="w-8 h-8 text-blue-500 mx-auto mb-2 opacity-60" />
              <h4 className="font-bold text-slate-900 dark:text-white capitalize">
                {activeTab} Dossier for {institution.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                Detailed real-time records synchronized with AICTE Master Registry (AICTE ID: {institution.aicteId}).
              </p>
              <button
                onClick={() => addToast('Dossier Downloaded', `${institution.name} complete regulatory audit pack exported`, 'info')}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Detailed Regulatory Dossier</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">
            Last Synced: {institution.lastSync}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
