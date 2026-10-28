import React, { useState } from 'react';
import { MapPin, Building2, Users, CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, Search } from 'lucide-react';
import { STATE_ANALYTICS } from '../../data/mockData';
import { StateAnalytics } from '../../types';
import { useApp } from '../../context/AppContext';

export const RegionalMapAnalytics: React.FC = () => {
  const { setActiveTab } = useApp();
  const [selectedState, setSelectedState] = useState<StateAnalytics>(STATE_ANALYTICS[0]); // Maharashtra by default
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStates = STATE_ANALYTICS.filter(s => 
    s.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <MapPin className="w-3.5 h-3.5" />
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              State-Wise Regional Analytics & APAAR Heatmap
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Interactive state monitoring of institution compliance, APAAR penetration, and regulatory anomalies
          </p>
        </div>

        {/* State Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search state (e.g. Gujarat)..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive State Cards Grid (Heatmap Matrix) - 7 cols */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-96 overflow-y-auto pr-1">
          {filteredStates.map(stateItem => {
            const isSelected = selectedState.state === stateItem.state;
            const isHighLinkage = stateItem.apaarLinkageRate >= 98;
            const hasAnomalies = stateItem.anomaliesCount > 10;

            return (
              <div
                key={stateItem.state}
                onClick={() => setSelectedState(stateItem)}
                className={`p-3 rounded-xl border cursor-pointer transition-all text-left relative overflow-hidden ${
                  isSelected 
                    ? 'bg-blue-50/80 dark:bg-blue-950/60 border-blue-500 shadow-sm ring-1 ring-blue-500' 
                    : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {/* Heatmap level bar indicator */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    stateItem.apaarLinkageRate >= 98 ? 'bg-emerald-500' :
                    stateItem.apaarLinkageRate >= 95 ? 'bg-blue-500' : 'bg-amber-500'
                  }`}
                />

                <div className="flex items-center justify-between mb-1 mt-0.5">
                  <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                    {stateItem.state}
                  </span>
                  {hasAnomalies && (
                    <span className="w-2 h-2 rounded-full bg-amber-500" title={`${stateItem.anomaliesCount} issues detected`} />
                  )}
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
                  <div className="flex justify-between">
                    <span>Institutions:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{stateItem.institutions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>APAAR:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{stateItem.apaarLinkageRate}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected State Executive Detail Card - 5 cols */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-navy-950 text-white p-5 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-start justify-between pb-3 border-b border-slate-800 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                  REGIONAL DOSSIER
                </span>
                <span className="text-[10px] text-slate-400">AICTE Nodal Zone</span>
              </div>
              <h4 className="text-lg font-black text-white mt-1">
                {selectedState.state}
              </h4>
            </div>

            <div className="text-right">
              <div className="text-xl font-black text-emerald-400">
                {selectedState.apaarLinkageRate}%
              </div>
              <span className="text-[10px] text-slate-400">APAAR Linkage</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Institutions</div>
              <div className="text-lg font-bold text-white mt-0.5">
                {selectedState.institutions.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-slate-400">AICTE Approved</span>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Enrolled Students</div>
              <div className="text-lg font-bold text-white mt-0.5">
                {selectedState.students.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-slate-400">Registered Cohort</span>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Verification Rate</div>
              <div className="text-lg font-bold text-cyan-300 mt-0.5">
                {selectedState.verificationRate}%
              </div>
              <span className="text-[10px] text-slate-400">DigiLocker Cleared</span>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Flagged Issues</div>
              <div className="text-lg font-bold text-amber-400 mt-0.5">
                {selectedState.anomaliesCount + selectedState.excessEnrolments}
              </div>
              <span className="text-[10px] text-slate-400">
                {selectedState.excessEnrolments} Excess Admissions
              </span>
            </div>
          </div>

          <div className="bg-blue-950/40 p-3 rounded-xl border border-blue-800/40 text-[11px] text-slate-300 mb-4">
            <span className="text-cyan-300 font-semibold">Regional Status: </span>
            {selectedState.apaarLinkageRate >= 98 
              ? 'Meets national high-compliance benchmarks with automated ABC credit synchronization enabled.'
              : 'Requires targeted institutional follow-up camps for Aadhaar biometric re-authentication.'}
          </div>

          <button
            onClick={() => setActiveTab('institutions')}
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <span>View {selectedState.state} Approved Institutions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
