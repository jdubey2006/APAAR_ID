import React from 'react';
import { 
  Building2, 
  UploadCloud, 
  FileCheck, 
  Link2, 
  Copy, 
  BrainCircuit, 
  ShieldCheck, 
  Database, 
  BarChart3, 
  FileText,
  CheckCircle2,
  ArrowRight,
  Server,
  Zap,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DataPipelineVisualizer: React.FC = () => {
  const { setActiveTab } = useApp();

  const pipelineStages = [
    {
      id: 'step-1',
      title: '1. Institution ERP',
      subtitle: 'Source Systems',
      icon: Building2,
      tab: 'institutions',
      metrics: '4,862 Connected',
      status: 'Active',
      color: 'blue'
    },
    {
      id: 'step-2',
      title: '2. Secure Upload',
      subtitle: 'TLS 1.3 Ingestion',
      icon: UploadCloud,
      tab: 'upload',
      metrics: 'CSV / Excel / API',
      status: 'Active',
      color: 'indigo'
    },
    {
      id: 'step-3',
      title: '3. Schema Validation',
      subtitle: 'Type & Range Check',
      icon: FileCheck,
      tab: 'validation',
      metrics: 'Canonical AICTE',
      status: 'Active',
      color: 'cyan'
    },
    {
      id: 'step-4',
      title: '4. APAAR Validation',
      subtitle: 'Luhn Mod-10 Check',
      icon: Link2,
      tab: 'validation',
      metrics: '97.49% Match',
      status: 'Active',
      color: 'teal'
    },
    {
      id: 'step-5',
      title: '5. Duplicate Detection',
      subtitle: 'Biometric Hash Clash',
      icon: Copy,
      tab: 'duplicates',
      metrics: '1,284 Potential',
      status: 'High Alert',
      color: 'red'
    },
    {
      id: 'step-6',
      title: '6. Anomaly AI Engine',
      subtitle: 'Quota Spikes & Skew',
      icon: BrainCircuit,
      tab: 'anomalies',
      metrics: 'Risk Score 0-100',
      status: 'Active',
      color: 'purple'
    },
    {
      id: 'step-7',
      title: '7. Nodal Verification',
      subtitle: 'Approval & DigiLocker',
      icon: ShieldCheck,
      tab: 'apaar-verify',
      metrics: '16.84L Verified',
      status: 'Active',
      color: 'emerald'
    },
    {
      id: 'step-8',
      title: '8. Central Repository',
      subtitle: 'AICTE Master DB',
      icon: Database,
      tab: 'dashboard',
      metrics: '18.4M Records',
      status: 'Active',
      color: 'blue'
    },
    {
      id: 'step-9',
      title: '9. National Analytics',
      subtitle: 'Regional Intelligence',
      icon: BarChart3,
      tab: 'analytics',
      metrics: '28 States / UTs',
      status: 'Active',
      color: 'amber'
    },
    {
      id: 'step-10',
      title: '10. Compliance Reports',
      subtitle: 'Audit & Disbursal',
      icon: FileText,
      tab: 'reports',
      metrics: 'PDF / CSV Export',
      status: 'Active',
      color: 'emerald'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                SYSTEM ARCHITECTURE
              </span>
              <span className="text-xs text-slate-400">• End-to-End Ingestion Flow</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              AICTE APAAR Data Processing Pipeline
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Visual architectural journey from heterogeneous institutional ERP uploads to verifiable national credentials.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <Zap className="w-4 h-4 fill-current" />
              <span>Pipeline: Healthy</span>
            </div>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-slate-600 dark:text-slate-300">Throughput: 12,500 rec/sec</span>
          </div>
        </div>
      </div>

      {/* Visual Animated Pipeline Diagram */}
      <div className="bg-gradient-to-br from-slate-900 via-navy-900 to-indigo-950 p-6 rounded-2xl border border-blue-500/30 shadow-2xl text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-6 flex items-center justify-between">
          <span>Real-Time Node Architecture Flow</span>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded">
            Interactive Node Click to Inspect
          </span>
        </div>

        {/* 10-Stage Pipeline Grid with Animated Connecting Lines */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 relative z-10">
          {pipelineStages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveTab(stage.tab)}
                className="bg-white/5 hover:bg-white/15 p-4 rounded-xl border border-white/10 hover:border-blue-400/60 cursor-pointer transition-all duration-300 hover:scale-103 group flex flex-col justify-between relative shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-blue-500/20 text-cyan-300 border border-blue-400/30 group-hover:bg-blue-500 group-hover:text-white transition">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 font-mono">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition line-clamp-1">
                    {stage.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">
                    {stage.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px]">
                  <span className="text-cyan-200 font-medium">{stage.metrics}</span>
                  <span className="inline-flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {stage.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pipeline Ingestion Summary Metrics */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Active Queue</div>
            <div className="text-base font-bold text-white mt-0.5">8,920 records</div>
            <span className="text-[10px] text-slate-400">Average latency: 420ms</span>
          </div>
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Validation Pass Rate</div>
            <div className="text-base font-bold text-emerald-400 mt-0.5">99.04%</div>
            <span className="text-[10px] text-slate-400">0.96% flagged for review</span>
          </div>
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-semibold">DigiLocker Bridge</div>
            <div className="text-base font-bold text-cyan-300 mt-0.5">Connected (200 OK)</div>
            <span className="text-[10px] text-slate-400">Biometric tokenized auth</span>
          </div>
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-semibold">System Uptime</div>
            <div className="text-base font-bold text-white mt-0.5">99.98%</div>
            <span className="text-[10px] text-slate-400">AICTE Central Cloud</span>
          </div>
        </div>
      </div>
    </div>
  );
};
