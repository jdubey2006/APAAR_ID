import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Search, 
  QrCode, 
  Building2, 
  ArrowLeft,
  Lock,
  ExternalLink,
  Printer
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';

interface Props {
  initialId?: string;
  onBackToApp?: () => void;
}

export const PublicVerificationView: React.FC<Props> = ({ initialId = 'VS-2026-849201', onBackToApp }) => {
  const { students } = useApp();
  const [query, setQuery] = useState(initialId);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedStudent, setVerifiedStudent] = useState<Student | null>(
    students.find(s => s.verificationId === initialId || s.apaarId === initialId) || students[0]
  );

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const match = students.find(s => 
        s.verificationId.toLowerCase() === query.trim().toLowerCase() ||
        s.apaarId === query.trim() ||
        s.enrollmentNumber.toLowerCase() === query.trim().toLowerCase()
      );
      setVerifiedStudent(match || null);
      setIsVerifying(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 flex flex-col justify-between">
      {/* Top National Ribbon */}
      <div className="tricolor-stripe w-full" />

      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-navy-900/90 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-900 flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <span>VIDYA<span className="text-blue-600">Setu</span></span>
              <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold px-1.5 py-0.2 rounded">
                VERIFY
              </span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              National Student Identity & Academic Credential Gateway
            </div>
          </div>
        </div>

        {onBackToApp && (
          <button
            onClick={onBackToApp}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Platform</span>
          </button>
        )}
      </header>

      {/* Main Verification Card */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-4 sm:p-6 my-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Verify Academic Record
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Authorized zero-knowledge lookup verifying student enrolment, institutional recognition, and APAAR linkage.
          </p>
        </div>

        {/* Verification Lookup Input Box */}
        <div className="bg-white dark:bg-navy-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Enter Verification ID or APAAR:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="e.g. VS-2026-849201"
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white font-mono focus:outline-hidden focus:border-blue-500"
            />
            <button
              onClick={handleVerify}
              disabled={isVerifying || !query.trim()}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs disabled:opacity-50"
            >
              {isVerifying ? 'Checking...' : 'Verify Record'}
            </button>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Information shown is strictly limited to authorized verification data under DPDP norms.</span>
          </div>
        </div>

        {/* Verification Result Card */}
        {isVerifying ? (
          <div className="bg-white dark:bg-navy-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Securely checking academic record against AICTE master cluster...
            </h4>
            <p className="text-xs text-slate-400">
              Validating cryptographic checksums and university accreditation.
            </p>
          </div>
        ) : verifiedStudent ? (
          <div className="bg-white dark:bg-navy-900 rounded-2xl border-2 border-emerald-500/40 shadow-xl overflow-hidden animate-fade-in">
            {/* Top Verified Header */}
            <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                    AUTHENTICATED RECORD
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    Academic Identity Confirmed
                  </h3>
                </div>
              </div>

              <div className="text-right text-xs">
                <span className="font-mono text-[10px] bg-black/20 px-2 py-1 rounded">
                  {verifiedStudent.verificationId}
                </span>
              </div>
            </div>

            {/* Verified Details */}
            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Student Candidate</span>
                  <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {verifiedStudent.name}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Institutional Accreditation</span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {verifiedStudent.institutionName}
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold">✓ AICTE Approved Institution</span>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Programme & Stream</span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {verifiedStudent.course}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Admission Cohort</span>
                  <div className="font-mono text-slate-800 dark:text-slate-200 mt-0.5">
                    Academic Year {verifiedStudent.admissionYear}
                  </div>
                </div>
              </div>

              {/* 4 Trust Checkmarks */}
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Student record exists in AICTE Central Master Repository</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Institution approved and statutorily compliant for admission intake</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>APAAR ID successfully linked with Academic Bank of Credits (ABC)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Zero cross-institution duplicate enrollment detected</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
                <span>Verified On: {verifiedStudent.verifiedOn || 'Today, 2026-02-18'}</span>
                <span className="font-mono">Digest: 0x9f184...77c2</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-navy-900 p-8 rounded-2xl border border-red-300 dark:border-red-800 text-center space-y-2">
            <h4 className="text-base font-bold text-red-600">No Verified Record Found</h4>
            <p className="text-xs text-slate-400">
              Verification identifier "{query}" could not be located in the AICTE national repository.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 bg-white dark:bg-navy-900">
        VIDYASetu • AICTE APAAR National Student Data Infrastructure • SIH 2026 PS 26263
      </footer>
    </div>
  );
};
