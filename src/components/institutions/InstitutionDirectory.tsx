import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Download, 
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Institution } from '../../types';
import { InstitutionProfileModal } from './InstitutionProfileModal';

export const InstitutionDirectory: React.FC = () => {
  const { institutions, selectedInstitution, setSelectedInstitution, addToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCompliance, setSelectedCompliance] = useState<string>('All');

  const states = ['All', ...Array.from(new Set(institutions.map(i => i.state)))];
  const types = ['All', ...Array.from(new Set(institutions.map(i => i.type)))];
  const complianceOptions = ['All', 'Compliant', 'Needs Attention', 'Non-Compliant'];

  const filtered = institutions.filter(inst => {
    const matchesSearch = 
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.aicteId.includes(searchQuery) ||
      inst.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === 'All' || inst.state === selectedState;
    const matchesType = selectedType === 'All' || inst.type === selectedType;
    const matchesCompliance = selectedCompliance === 'All' || inst.complianceStatus === selectedCompliance;

    return matchesSearch && matchesState && matchesType && matchesCompliance;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                AICTE ACCREDITATION CELL
              </span>
              <span className="text-xs text-slate-400">• Approved Technical Institutions</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Approved Institution Directory
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Comprehensive registry of 4,862 AICTE-approved colleges monitoring live enrolment, APAAR adoption, and compliance.
            </p>
          </div>

          <button
            onClick={() => addToast('Registry Exported', 'Master Institutional Directory exported to CSV', 'success')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Directory</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-navy-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* State Filter */}
          <select
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-slate-300 font-semibold focus:outline-hidden"
          >
            {states.map(s => <option key={s} value={s}>State: {s}</option>)}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-slate-300 font-semibold focus:outline-hidden"
          >
            {types.map(t => <option key={t} value={t}>Type: {t}</option>)}
          </select>

          {/* Compliance Filter */}
          <select
            value={selectedCompliance}
            onChange={e => setSelectedCompliance(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-slate-300 font-semibold focus:outline-hidden"
          >
            {complianceOptions.map(c => <option key={c} value={c}>Compliance: {c}</option>)}
          </select>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name, AICTE ID, or city..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
          />
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5">Institution Name</th>
                <th className="p-3.5">AICTE ID</th>
                <th className="p-3.5">State & Location</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Approved Intake</th>
                <th className="p-3.5">Enrolment</th>
                <th className="p-3.5">APAAR Coverage</th>
                <th className="p-3.5">Quality Score</th>
                <th className="p-3.5">Compliance</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(inst => (
                <tr 
                  key={inst.id}
                  onClick={() => setSelectedInstitution(inst)}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 cursor-pointer transition"
                >
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {inst.name}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Code: {inst.code} • {inst.programmesCount} Programmes
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                    {inst.aicteId}
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{inst.state}</div>
                    <div className="text-[11px] text-slate-400">{inst.city}</div>
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300">
                    {inst.type}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">
                    {inst.approvedIntake.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5 font-mono font-black text-slate-900 dark:text-white">
                    {inst.actualEnrolment.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5">
                    <span className="font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      {inst.apaarCoverageRate}%
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                    {inst.dataQualityScore}%
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInstitution(inst);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Profile</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Institution Profile Modal */}
      {selectedInstitution && (
        <InstitutionProfileModal 
          institution={selectedInstitution}
          onClose={() => setSelectedInstitution(null)}
        />
      )}
    </div>
  );
};
