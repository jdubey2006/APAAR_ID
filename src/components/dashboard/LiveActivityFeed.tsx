import React from 'react';
import { Activity, CheckCircle, AlertTriangle, ShieldAlert, RefreshCw, FileUp, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LiveActivityFeed: React.FC = () => {
  const { setActiveTab } = useApp();

  const activities = [
    {
      id: 1,
      type: 'success',
      title: '142 Student Records Verified',
      desc: 'PSG College of Technology completed biometric DigiLocker linkage for 2024 B.Tech ECE cohort.',
      time: '12 sec ago',
      tab: 'apaar-verify'
    },
    {
      id: 2,
      type: 'critical',
      title: 'Simultaneous Duplicate APAAR Detected',
      desc: 'Candidate registered at COEP Tech Univ matched with active enrollment at VJTI Mumbai (96.8% similarity).',
      time: '2 min ago',
      tab: 'duplicates'
    },
    {
      id: 3,
      type: 'success',
      title: 'Institution Dataset Submission Received',
      desc: 'College of Engineering Pune uploaded batch COEP-2024-SEM4 (1,245 student records).',
      time: '5 min ago',
      tab: 'upload'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Excess Admission Flagged',
      desc: 'HBTU Kanpur actual admission reached 982 against sanctioned quota ceiling of 968 (+14 excess).',
      time: '14 min ago',
      tab: 'compliance'
    },
    {
      id: 5,
      type: 'success',
      title: 'Batch Validation Cleared',
      desc: 'Thapar Institute of Engg & Tech: 2,075 records verified with 99.4% APAAR linkage rate.',
      time: '26 min ago',
      tab: 'validation'
    },
    {
      id: 6,
      type: 'info',
      title: 'DigiLocker ABC Bridge Synchronized',
      desc: '1,42,890 academic credit tokens synchronized with Academic Bank of Credits gateway.',
      time: '48 min ago',
      tab: 'integrations'
    }
  ];

  return (
    <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Live System Activity & Ingestion Stream
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Real-time audit events across AICTE central cluster
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('audit')}
          className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
        >
          <span>Open Full Audit Trail</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {activities.map(item => (
          <div
            key={item.id}
            onClick={() => setActiveTab(item.tab)}
            className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer transition text-left flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                  item.type === 'critical' ? 'text-red-600 dark:text-red-400' :
                  item.type === 'warning' ? 'text-amber-600 dark:text-amber-400' :
                  item.type === 'info' ? 'text-blue-600 dark:text-blue-400' :
                  'text-emerald-600 dark:text-emerald-400'
                }`}>
                  {item.type === 'critical' ? <ShieldAlert className="w-3.5 h-3.5" /> :
                   item.type === 'warning' ? <AlertTriangle className="w-3.5 h-3.5" /> :
                   item.type === 'info' ? <RefreshCw className="w-3.5 h-3.5" /> :
                   <CheckCircle className="w-3.5 h-3.5" />}
                  <span>{item.title}</span>
                </span>
                <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                  {item.time}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
