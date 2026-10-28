import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Link2, 
  Activity, 
  CheckSquare, 
  QrCode, 
  BrainCircuit, 
  Key, 
  Building2, 
  Users, 
  Award, 
  ExternalLink,
  Lock,
  Sparkles,
  ChevronRight,
  Database
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Props {
  onEnterApp: () => void;
  onOpenLogin: () => void;
  onOpenPublicVerify: () => void;
}

export const LandingPage: React.FC<Props> = ({ onEnterApp, onOpenLogin, onOpenPublicVerify }) => {
  const { setIsJudgeDemoActive } = useApp();

  const features = [
    {
      title: 'APAAR-Based Identity',
      desc: 'One Nation, One Student ID unifying higher education credentials and Academic Bank of Credits (ABC) ledger.',
      icon: Link2,
      color: 'blue'
    },
    {
      title: 'Real-Time Monitoring',
      desc: 'Continuous statutory intake oversight preventing excess admissions and regulatory non-compliance.',
      icon: Activity,
      color: 'emerald'
    },
    {
      title: 'Automated 12-Point Validation',
      desc: 'Instant rule engine detecting Luhn-10 format flaws, quota mismatches, and data inconsistency.',
      icon: CheckSquare,
      color: 'purple'
    },
    {
      title: 'Duplicate Intelligence Center',
      desc: 'Fuzzy string matching and biometric contact hashing stopping concurrent full-time admissions across colleges.',
      icon: ShieldCheck,
      color: 'red'
    },
    {
      title: 'AI-Assisted Anomaly Detection',
      desc: 'Machine learning anomaly scoring (0-100) flagging sudden intake surges and demographic skews.',
      icon: BrainCircuit,
      color: 'amber'
    },
    {
      title: 'Interoperable Open APIs',
      desc: 'RESTful connectors for institutional ERP systems, DigiLocker, and background verification agencies.',
      icon: Key,
      color: 'cyan'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Tricolor National Identity Header Line */}
      <div className="tricolor-stripe w-full" />

      {/* Top Navigation */}
      <header className="px-6 md:px-12 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-navy-950 flex items-center justify-center text-white shadow-md border border-blue-500/30">
            <ShieldCheck className="w-6 h-6 text-cyan-300" />
          </div>
          <div>
            <div className="text-base font-black tracking-tight text-white flex items-center gap-2">
              <span>VIDYA<span className="text-blue-500">Setu</span></span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded border border-blue-400/30">
                AICTE APAAR
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              National Student Data Intelligence & Verification Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPublicVerify}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Verify Academic Record</span>
          </button>

          <button
            onClick={() => {
              onEnterApp();
              setIsJudgeDemoActive(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
          >
            <span>▶ Start Judge Demo</span>
          </button>

          <button
            onClick={onOpenLogin}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition"
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Smart India Hackathon 2026 • Problem Statement PS-26263</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
          One Academic Identity.{' '}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            One Trusted Student Record.
          </span>
        </h1>

        <p className="text-sm md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Sovereign, interoperable, and verifiable student data infrastructure for AICTE-approved institutions—preventing duplicate admissions, excess intake, and credential fraud.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={onEnterApp}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all hover:scale-102 flex items-center gap-2"
          >
            <span>Explore National Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onEnterApp();
              setIsJudgeDemoActive(true);
            }}
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>5-Minute Judge Presentation Tour</span>
          </button>
        </div>

        {/* 4 National Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 text-left">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 shadow-lg">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">AICTE Institutions</span>
            <div className="text-2xl md:text-3xl font-black text-white mt-1">4,862+</div>
            <span className="text-[10px] text-emerald-400 font-semibold">Active Technical Units</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 shadow-lg">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Student Cohorts</span>
            <div className="text-2xl md:text-3xl font-black text-white mt-1">18.4M+</div>
            <span className="text-[10px] text-cyan-400 font-semibold">Central Master Registry</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 shadow-lg">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">APAAR Coverage</span>
            <div className="text-2xl md:text-3xl font-black text-emerald-400 mt-1">97.49%</div>
            <span className="text-[10px] text-slate-400">Target: 99.00%</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 shadow-lg">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Platform Availability</span>
            <div className="text-2xl md:text-3xl font-black text-cyan-300 mt-1">99.98%</div>
            <span className="text-[10px] text-slate-400">Zero-Trust SLA</span>
          </div>
        </div>

        <div className="text-[10px] text-slate-500 font-mono">
          * Metrics displayed represent mock demonstration dataset calibrated for SIH 2026 PS-26263 evaluation.
        </div>
      </section>

      {/* Feature Architecture Cards */}
      <section className="px-6 md:px-12 py-16 bg-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              National Infrastructure Components
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Built for Scale, Trust, and Real-Time Verification
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between text-left space-y-3 shadow-md"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-cyan-400 border border-blue-400/20 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Architecture Pipeline Flow Summary */}
      <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto text-center space-y-6">
        <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
          Seamless Regulatory Pipeline Flow
        </div>
        <h3 className="text-2xl font-black text-white">
          From Institutional ERP to Sovereign Digital Credential
        </h3>
        
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-slate-300">
          <span className="px-3 py-1.5 rounded-lg bg-slate-800">1. Institution Ingestion</span>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <span className="px-3 py-1.5 rounded-lg bg-slate-800">2. Schema Mapping</span>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <span className="px-3 py-1.5 rounded-lg bg-slate-800">3. 12-Point Validation</span>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <span className="px-3 py-1.5 rounded-lg bg-slate-800">4. Duplicate & Anomaly AI</span>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <span className="px-3 py-1.5 rounded-lg bg-blue-600 text-white">5. Verifiable Credential</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 border-t border-slate-800 bg-slate-950 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-bold text-slate-300">
            VIDYASetu • AICTE APAAR Student Data & Verification Platform
          </div>
          <div>SIH 2026 Prototype • Problem Statement 26263 • AICTE Academic Identity Cell</div>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <button onClick={onOpenPublicVerify} className="hover:text-white">Public Verification</button>
          <span>•</span>
          <button onClick={onOpenLogin} className="hover:text-white">Authorized Login</button>
          <span>•</span>
          <span className="font-mono text-[11px]">v2.6.3 Sovereign DPI</span>
        </div>
      </footer>
    </div>
  );
};
