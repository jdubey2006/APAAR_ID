import React, { useState } from 'react';
import { 
  BrainCircuit, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  TrendingUp, 
  Info, 
  ArrowRight, 
  Activity, 
  Building2,
  FileSearch,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnomalyRecord } from '../../types';

export const AnomalyDetectionCenter: React.FC = () => {
  const { anomalies, addToast, setActiveTab } = useApp();
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [activeAnomaly, setActiveAnomaly] = useState<AnomalyRecord>(anomalies[0]);

  const filtered = anomalies.filter(a => {
    if (selectedRiskFilter === 'All') return true;
    return a.riskLevel === selectedRiskFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                AI-ASSISTED RISK ANALYSIS
              </span>
              <span className="text-xs text-slate-400">• Prototype Predictive Intelligence</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Intelligent Anomaly Detection Center
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Machine learning pattern clustering evaluating sudden enrolment surges, demographic skews, and statutory intake violations.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-xs font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Autonomous Neural Scoring Model v3.2</span>
          </div>
        </div>
      </div>

      {/* 3 Risk Severity Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div 
          onClick={() => setSelectedRiskFilter('High')}
          className="bg-white dark:bg-navy-900 p-5 rounded-xl border border-red-200 dark:border-red-900/60 shadow-2xs hover:shadow-md cursor-pointer transition flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
              High Risk Anomalies
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {anomalies.filter(a => a.riskLevel === 'High').length}
            </div>
            <span className="text-[11px] text-slate-400">Immediate Show-Cause Required</span>
          </div>
          <div className="p-3 rounded-xl bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>

        <div 
          onClick={() => setSelectedRiskFilter('Medium')}
          className="bg-white dark:bg-navy-900 p-5 rounded-xl border border-amber-200 dark:border-amber-900/60 shadow-2xs hover:shadow-md cursor-pointer transition flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Medium Risk Anomalies
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {anomalies.filter(a => a.riskLevel === 'Medium').length}
            </div>
            <span className="text-[11px] text-slate-400">Statistical quota drifts</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div 
          onClick={() => setSelectedRiskFilter('Low')}
          className="bg-white dark:bg-navy-900 p-5 rounded-xl border border-blue-200 dark:border-blue-900/60 shadow-2xs hover:shadow-md cursor-pointer transition flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Low Risk Anomalies
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {anomalies.filter(a => a.riskLevel === 'Low').length}
            </div>
            <span className="text-[11px] text-slate-400">Demographic or linkage lag</span>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            <Activity className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Featured Anomaly In-Depth Diagnosis */}
      <div className="bg-gradient-to-br from-slate-900 via-navy-900 to-indigo-950 text-white p-6 rounded-2xl border border-purple-500/40 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40 uppercase">
              {activeAnomaly.riskLevel} Risk Anomaly Detected
            </span>
            <h3 className="text-base font-bold text-white mt-1">
              {activeAnomaly.title}
            </h3>
            <div className="text-xs text-slate-400 mt-0.5">
              Institution: {activeAnomaly.institution} • State: {activeAnomaly.state}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-black text-red-400 font-mono">
                {activeAnomaly.riskScore}/100
              </div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                AI Anomaly Score
              </span>
            </div>
          </div>
        </div>

        {/* Diagnostic Explanation */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-xs leading-relaxed space-y-2">
          <div className="font-bold text-cyan-300 flex items-center gap-1.5">
            <Info className="w-4 h-4" />
            <span>Diagnostic Rationale:</span>
          </div>
          <p className="text-slate-200">
            {activeAnomaly.explanation}
          </p>
          <div className="pt-2 flex items-center gap-2 text-amber-300 font-mono text-[11px]">
            <span>Trigger Metric:</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 font-bold">
              {activeAnomaly.metrics}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400 font-mono">
            Flagged on: {activeAnomaly.detectedDate}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => addToast('Notice Issued', `Show-cause regulatory notice dispatched to ${activeAnomaly.institution}`, 'warning')}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition shadow-xs"
            >
              Issue Show-Cause Notice
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition"
            >
              View Intake Quota Center
            </button>
          </div>
        </div>
      </div>

      {/* Anomaly Records Table */}
      <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Active Anomaly Stream ({filtered.length} Flagged Incidents)
          </h3>
          <span className="text-xs text-slate-400">Click row to inspect diagnostic score</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5">Risk Level</th>
                <th className="p-3.5">Score</th>
                <th className="p-3.5">Institution</th>
                <th className="p-3.5">Anomaly Category</th>
                <th className="p-3.5">Key Trigger Metric</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(anom => (
                <tr 
                  key={anom.id}
                  onClick={() => setActiveAnomaly(anom)}
                  className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/50 cursor-pointer transition ${
                    activeAnomaly.id === anom.id ? 'bg-purple-50/50 dark:bg-purple-950/40' : ''
                  }`}
                >
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      anom.riskLevel === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                      anom.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {anom.riskLevel} Risk
                    </span>
                  </td>
                  <td className="p-3.5 font-mono font-black text-slate-900 dark:text-white">
                    {anom.riskScore}/100
                  </td>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                    {anom.institution}
                  </td>
                  <td className="p-3.5 text-slate-700 dark:text-slate-300">
                    {anom.type}
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                    {anom.metrics}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 font-semibold text-slate-600 dark:text-slate-300">
                      {anom.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveAnomaly(anom);
                      }}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-lg text-xs hover:bg-slate-200"
                    >
                      Diagnose
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
