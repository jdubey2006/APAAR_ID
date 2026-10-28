import React, { useState } from 'react';
import { Network, Building2, User, AlertCircle, ShieldAlert, ArrowRight, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CrossInstitutionGraph: React.FC = () => {
  const { setSelectedDuplicate, duplicateCases, setActiveTab } = useApp();
  const [activeNode, setActiveNode] = useState<string>('stu-collision');

  return (
    <div className="bg-gradient-to-br from-slate-900 via-navy-900 to-indigo-950 p-6 rounded-2xl border border-red-500/40 shadow-2xl text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-red-500/20 text-red-400 border border-red-500/30">
              <Network className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-white tracking-wide">
              Cross-Institution Concurrent Enrolment Graph
            </h3>
          </div>
          <p className="text-xs text-slate-300">
            Real-time topological relationship mapping detecting simultaneous admissions across state jurisdictions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-400/40 animate-pulse">
            High Severity Collision Detected
          </span>
        </div>
      </div>

      {/* Network Graph Interactive Canvas */}
      <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-around gap-6 relative">
          
          {/* Node 1: Institution A (COEP Pune) */}
          <div className="w-full md:w-64 p-4 rounded-xl bg-blue-950/60 border border-blue-500/40 text-center space-y-2 hover:border-blue-400 transition shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 text-blue-300 border border-blue-400/30 flex items-center justify-center mx-auto">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-blue-400">Institution Alpha</div>
              <h5 className="text-xs font-bold text-white mt-0.5">COEP Tech University</h5>
              <div className="text-[11px] text-slate-400 mt-1">State Quota • Pune, MH</div>
            </div>
            <div className="pt-2 border-t border-white/10 text-[10px] text-emerald-400 font-mono">
              Status: Active Enrolment #0104
            </div>
          </div>

          {/* Center Collision Hub: Student Identity Node */}
          <div className="relative flex flex-col items-center">
            {/* Animated connection lines */}
            <div className="hidden md:flex items-center gap-1 text-red-400 font-mono text-[10px] mb-2 font-bold animate-pulse">
              <span>◄ 96.8% CLASH ►</span>
            </div>

            <div 
              onClick={() => setSelectedDuplicate(duplicateCases[0])}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 p-1 shadow-2xl hover:scale-105 transition cursor-pointer ring-8 ring-red-500/20 flex flex-col items-center justify-center text-center"
            >
              <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center p-2">
                <User className="w-6 h-6 text-red-400 mb-1" />
                <span className="text-[11px] font-black text-white leading-tight">
                  APAAR CLASH
                </span>
                <span className="text-[9px] font-mono text-cyan-300 mt-0.5">
                  ..4821
                </span>
                <span className="text-[8px] text-red-300 font-semibold bg-red-950/80 px-1.5 py-0.2 rounded-full mt-1">
                  96.8% MATCH
                </span>
              </div>
            </div>

            <span className="text-[10px] text-slate-300 mt-2 font-medium">
              Same Aadhaar Contact Hash
            </span>
          </div>

          {/* Node 2: Institution B (VJTI Mumbai) */}
          <div className="w-full md:w-64 p-4 rounded-xl bg-purple-950/60 border border-purple-500/40 text-center space-y-2 hover:border-purple-400 transition shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-400/30 flex items-center justify-center mx-auto">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-purple-400">Institution Beta</div>
              <h5 className="text-xs font-bold text-white mt-0.5">VJTI Mumbai</h5>
              <div className="text-[11px] text-slate-400 mt-1">State Quota • Mumbai, MH</div>
            </div>
            <div className="pt-2 border-t border-white/10 text-[10px] text-amber-400 font-mono">
              Status: Active Enrolment #0089
            </div>
          </div>
        </div>

        {/* Diagnostic Explanation Banner */}
        <div className="mt-6 p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="text-red-300">Potential Concurrent Enrolment Detected: </strong>
            <span className="text-slate-200">
              Candidate identity matched across 2 autonomous state institutions for full-time B.Tech 2024-2028 batch. Simultaneous seat blocking violates AICTE Approval Process norms.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
