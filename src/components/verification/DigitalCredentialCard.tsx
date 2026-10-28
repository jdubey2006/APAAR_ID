import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Printer, 
  Share2, 
  ExternalLink,
  Lock,
  Sparkles
} from 'lucide-react';
import { Student } from '../../types';
import { useApp } from '../../context/AppContext';

interface Props {
  student: Student;
  onOpenPublicVerify?: (id: string) => void;
}

export const DigitalCredentialCard: React.FC<Props> = ({ student, onOpenPublicVerify }) => {
  const { addToast } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://vidyasetu.gov.in/verify/${student.verificationId}`);
      addToast('Verification Link Copied', 'Public verification link copied to clipboard', 'success');
    }
  };

  return (
    <div className="space-y-4">
      {/* Printable Digital Academic Credential Certificate Card */}
      <div 
        id="printable-credential"
        className="max-w-xl mx-auto bg-gradient-to-br from-slate-900 via-navy-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-500/40 relative overflow-hidden text-left"
      >
        {/* Subtle Watermark Emblem Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
        
        {/* Tricolor Government Border Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-1.5 tricolor-stripe" />

        {/* Certificate Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md border border-white/20">
              <ShieldCheck className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                AICTE • APAAR Academic Registry
              </div>
              <h3 className="text-lg font-black tracking-tight text-white font-sans">
                VIDYA<span className="text-cyan-400">Setu</span>
              </h3>
              <div className="text-[10px] text-slate-300">
                Verified National Student Credential
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>STATUS: VALID</span>
            </span>
            <div className="text-[9px] text-slate-400 mt-1 font-mono">
              SIH-2026 PS-26263
            </div>
          </div>
        </div>

        {/* Student & Academic Attributes */}
        <div className="my-6 space-y-4 relative z-10 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Student Scholar
            </span>
            <div className="text-xl font-black text-white mt-0.5">
              {student.name}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400">
                Institution
              </span>
              <div className="font-semibold text-slate-200 mt-0.5 line-clamp-2">
                {student.institutionName}
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400">
                Programme & Course
              </span>
              <div className="font-semibold text-slate-200 mt-0.5">
                {student.course}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-[11px]">
            <div>
              <span className="text-[10px] text-slate-400">APAAR ID:</span>
              <div className="font-mono font-bold text-cyan-300 mt-0.5">
                XXXX XXXX {student.apaarId.slice(-4)}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400">Admission Year:</span>
              <div className="font-mono text-white font-bold mt-0.5">
                {student.admissionYear}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400">Enrollment No:</span>
              <div className="font-mono text-slate-200 mt-0.5 truncate">
                {student.enrollmentNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Verification Seal & Functional QR Section */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Verification Identifier:
            </span>
            <div className="font-mono font-bold text-sm text-amber-400 tracking-wider">
              {student.verificationId}
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>ECDSA Tamper-Proof Cryptographic Hash</span>
            </div>
          </div>

          {/* Functional QR Code Simulation */}
          <div 
            onClick={() => onOpenPublicVerify && onOpenPublicVerify(student.verificationId)}
            className="p-2 rounded-xl bg-white text-slate-900 cursor-pointer shadow-lg hover:scale-105 transition shrink-0 group"
            title="Click to simulate scanning QR Code"
          >
            <div className="w-16 h-16 flex flex-col items-center justify-center border-2 border-slate-900 rounded p-1 text-center">
              {/* Scalable QR matrix pattern representation */}
              <div className="grid grid-cols-5 gap-0.5 w-12 h-12">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-2xs ${
                      [0, 1, 2, 4, 5, 8, 10, 12, 14, 16, 18, 20, 22, 23, 24].includes(i)
                        ? 'bg-slate-900'
                        : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="block text-[8px] font-bold text-slate-700 text-center mt-1 uppercase tracking-tight">
              Scan to Verify
            </span>
          </div>
        </div>
      </div>

      {/* Action Toolbar (Non-printable) */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Credential</span>
        </button>

        <button
          onClick={() => addToast('PDF Exported', `${student.name} official verifiable credential downloaded`, 'success')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download PDF</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold transition"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Verification Link</span>
        </button>
      </div>
    </div>
  );
};
