import React from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  ArrowRight,
  ShieldAlert,
  BarChart2,
  FileCheck2,
  QrCode,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DemoStepInfo {
  step: number;
  title: string;
  badge: string;
  tab: string;
  problem: string;
  solution: string;
  evaluatorTakeaway: string;
}

const DEMO_STEPS: DemoStepInfo[] = [
  {
    step: 1,
    title: 'Problem Overview & Ecosystem Vision',
    badge: 'National Scale Challenge',
    tab: 'dashboard',
    problem: '4,800+ AICTE institutions submit fragmented data without uniform student identifiers, leading to duplicate enrolment, ghost admissions, and zero real-time verifiability.',
    solution: 'VIDYASetu establishes a sovereign APAAR-linked digital infrastructure linking National Academic Bank of Credits, DigiLocker, and AICTE central repositories.',
    evaluatorTakeaway: 'Immediate bird-eye clarity on national APAAR linkage (97.49%), active institutions, and real-time anomaly monitoring.'
  },
  {
    step: 2,
    title: 'Institution Data Submission Center',
    badge: 'Standardized Ingestion',
    tab: 'upload',
    problem: 'Institutions use heterogeneous ERP formats (CSV, Excel, JSON) with non-standard column headers and incomplete demographic data.',
    solution: 'Universal multi-format drag-and-drop wizard with automated schema validation and template generation.',
    evaluatorTakeaway: 'Frictionless onboarding for institutions with instant format conversion and pre-submission error checking.'
  },
  {
    step: 3,
    title: 'Smart Column & Schema Mapping',
    badge: 'Interoperability Engine',
    tab: 'upload',
    problem: 'Institution-specific field naming creates database incompatibilities across universities.',
    solution: 'Automated semantic column detection mapping local fields (e.g. "Candidate Name", "Intake Quota") to AICTE canonical schema.',
    evaluatorTakeaway: 'No institutional IT overhaul required; VIDYASetu maps existing ERP exports seamlessly.'
  },
  {
    step: 4,
    title: 'Automated 12-Point Validation Engine',
    badge: 'Automated Integrity',
    tab: 'validation',
    problem: 'Manual inspection cannot catch subtle errors across 18.4 million student records.',
    solution: '12 simultaneous automated checks: APAAR checksum (Luhn-10), duplicate IDs, cross-institution matches, statutory quotas, and age criteria.',
    evaluatorTakeaway: '48,291 records processed in seconds; categorizes into 47,823 Valid, 312 Warnings, and 156 Critical Errors.'
  },
  {
    step: 5,
    title: 'Duplicate Intelligence Center',
    badge: 'Identity Fraud Prevention',
    tab: 'duplicates',
    problem: 'Students taking simultaneous full-time admissions across multiple institutions to block seats or siphon dual scholarships.',
    solution: 'Fuzzy matching and biometric contact hashing detects 96.8% identical identities across state boundaries.',
    evaluatorTakeaway: 'Demonstrates real-world detection: Rahul Sharma at COEP vs Rahul K. Sharma at VJTI with identical APAAR & DOB.'
  },
  {
    step: 6,
    title: 'Cross-Institution Network Graph',
    badge: 'Graph Intelligence',
    tab: 'duplicates',
    problem: 'Inter-institutional student syndicates and ghost enrollments are invisible in tabular views.',
    solution: 'Interactive network graph tracing concurrent student nodes across disparate colleges and regulatory zones.',
    evaluatorTakeaway: 'High visual impact for evaluators demonstrating complex inter-university relationship mapping.'
  },
  {
    step: 7,
    title: 'AI-Assisted Anomaly Detection',
    badge: 'Regulatory Intelligence',
    tab: 'anomalies',
    problem: 'Subtle institutional violations like sudden management quota spikes go undetected until annual audits.',
    solution: 'Machine learning risk scoring (0-100) flagging statistical anomalies, intake bursts, and demographic skews in real time.',
    evaluatorTakeaway: 'AI-assisted risk cards with clear explanations (e.g. Risk Score: 92/100 at HBTU for +3.3% excess capacity).'
  },
  {
    step: 8,
    title: 'AICTE National Command Dashboard',
    badge: 'Executive Oversight',
    tab: 'dashboard',
    problem: 'Regulators lack live visibility into national admission compliance and APAAR adoption velocity.',
    solution: 'Comprehensive national command center with sparklines, 12-month trends, compliance donuts, and live event tickers.',
    evaluatorTakeaway: 'Demonstrates enterprise-grade government tech ready for Ministry of Education presentation.'
  },
  {
    step: 9,
    title: 'Admission Compliance & Excess Monitoring',
    badge: 'Statutory Enforcement',
    tab: 'compliance',
    problem: 'Institutions secretly admitting students beyond AICTE approved intake caps, violating regulatory orders.',
    solution: 'Automated intake monitoring comparing statutory approved caps against live verified enrollments + supernumerary limits.',
    evaluatorTakeaway: 'Instant warning flags when actual > approved, safeguarding student degrees from derecognition.'
  },
  {
    step: 10,
    title: 'Verifiable Student Record & Masked APAAR',
    badge: 'Privacy-by-Design',
    tab: 'students',
    problem: 'Unrestricted exposure of sensitive 12-digit student identifiers violates DPDP Act and Supreme Court privacy guidelines.',
    solution: 'Privacy-by-Design with masked APAAR (XXXX XXXX 4821) and audited cryptographic reveal credentials for authorized nodal officers.',
    evaluatorTakeaway: 'Evaluators see compliance with Indian Data Protection norms and secure role-based access control.'
  },
  {
    step: 11,
    title: 'Digital Credential & Cryptographic QR',
    badge: 'Tamper-Proof Verification',
    tab: 'apaar-verify',
    problem: 'Paper marksheets and degree certificates take weeks to verify and are vulnerable to physical forgery.',
    solution: 'Instant tamper-proof digital credential featuring ECDSA cryptographic seal, QR code, and DigiLocker integration.',
    evaluatorTakeaway: 'One-click verification for employers and universities in under 2 seconds.'
  },
  {
    step: 12,
    title: 'Public Verification & Immutable Audit Trail',
    badge: 'Accountability & Trust',
    tab: 'audit',
    problem: 'Third parties need to verify credentials without accessing private databases; regulators need accountability.',
    solution: 'Public zero-knowledge verification endpoint combined with an immutable chronological security audit trail.',
    evaluatorTakeaway: 'Every action logged with IP, timestamp, and risk score. Full regulatory trust lifecycle complete.'
  }
];

export const JudgeDemoGuide: React.FC = () => {
  const { 
    isJudgeDemoActive, 
    judgeDemoStep, 
    nextJudgeDemoStep, 
    prevJudgeDemoStep, 
    stopJudgeDemo 
  } = useApp();

  if (!isJudgeDemoActive) return null;

  const currentInfo = DEMO_STEPS.find(s => s.step === judgeDemoStep) || DEMO_STEPS[0];
  const progressPercent = Math.round((judgeDemoStep / DEMO_STEPS.length) * 100);

  return (
    <div className="fixed bottom-4 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-112 md:w-128 max-w-lg bg-slate-900/95 text-white rounded-2xl shadow-2xl border border-blue-500/40 backdrop-blur-xl animate-slide-up overflow-hidden">
      {/* Top Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-blue-900/90 via-navy-900 to-indigo-950 flex items-center justify-between border-b border-blue-500/30">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-wide text-white uppercase flex items-center gap-2">
              <span>SIH 2026 Judge Walkthrough</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Step {judgeDemoStep} of {DEMO_STEPS.length}
              </span>
            </span>
          </div>
        </div>

        <button
          onClick={stopJudgeDemo}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition"
          title="Exit Judge Demo Mode"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1">
        <div 
          className="bg-gradient-to-r from-amber-400 via-blue-500 to-emerald-400 h-1 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step Content */}
      <div className="p-4 space-y-3 text-xs">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>{currentInfo.title}</span>
          </h4>
          <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
            {currentInfo.badge}
          </span>
        </div>

        {/* Problem vs Solution Split */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
          <div className="bg-red-950/40 p-2.5 rounded-xl border border-red-800/40">
            <div className="flex items-center gap-1.5 font-bold text-red-300 mb-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>National Challenge:</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{currentInfo.problem}</p>
          </div>

          <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/40">
            <div className="flex items-center gap-1.5 font-bold text-emerald-300 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>VIDYASetu Innovation:</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{currentInfo.solution}</p>
          </div>
        </div>

        {/* Evaluator Highlight */}
        <div className="bg-blue-950/50 p-2.5 rounded-xl border border-blue-800/50 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <strong className="text-cyan-300 font-semibold">Judge Presentation Note: </strong>
            <span className="text-slate-200">{currentInfo.evaluatorTakeaway}</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="px-4 py-2.5 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={prevJudgeDemoStep}
          disabled={judgeDemoStep === 1}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-1.5">
          {DEMO_STEPS.map(s => (
            <span 
              key={s.step}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                s.step === judgeDemoStep 
                  ? 'w-4 bg-blue-400' 
                  : s.step < judgeDemoStep ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextJudgeDemoStep}
          className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-102"
        >
          <span>{judgeDemoStep === DEMO_STEPS.length ? 'Finish Demo' : 'Next Step'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
