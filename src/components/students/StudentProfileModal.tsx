import React, { useState } from 'react';
import { 
  User, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  GraduationCap, 
  QrCode, 
  Calendar, 
  Eye, 
  Lock, 
  Download, 
  Share2, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { Student } from '../../types';
import { useApp } from '../../context/AppContext';

interface Props {
  student: Student;
  onClose: () => void;
  onOpenCredential?: () => void;
}

export const StudentProfileModal: React.FC<Props> = ({ student, onClose, onOpenCredential }) => {
  const { revealedApaarIds, setStudentToRevealApaar, setIsRevealApaarOpen, addToast, setActiveTab } = useApp();
  const [activeTab, setActiveTabLocal] = useState<'identity' | 'academic' | 'verification' | 'audit'>('identity');

  const isRevealed = !!revealedApaarIds[student.id];
  const maskedApaar = isRevealed ? student.apaarId : 'XXXX XXXX ' + student.apaarId.slice(-4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div 
        className="w-full max-w-3xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Strip with Student Academic Badge */}
        <div className="p-6 bg-gradient-to-r from-blue-900 via-navy-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-500/30">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0 border border-white/20">
              {student.name.charAt(0)}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                  {student.programme}
                </span>
                <span className="text-xs text-slate-300">Cohort {student.admissionYear}</span>
              </div>
              <h2 className="text-lg md:text-xl font-black text-white mt-1">
                {student.name}
              </h2>
              <div className="text-xs text-slate-300 mt-0.5">
                {student.course} • {student.institutionName}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                student.verificationStatus === 'Verified' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                student.verificationStatus === 'Flagged' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                {student.verificationStatus === 'Verified' && <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>{student.verificationStatus}</span>
              </span>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">
                ID: {student.verificationId}
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-center gap-2 text-xs">
          {[
            { id: 'identity', label: 'Identity & APAAR' },
            { id: 'academic', label: 'Academic Record' },
            { id: 'verification', label: 'Verifiable Credential' },
            { id: 'audit', label: 'Access Audit History' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTabLocal(tab.id as any)}
              className={`px-3 py-3 font-semibold border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6 text-xs">
          {activeTab === 'identity' && (
            <div className="space-y-4">
              {/* APAAR Identifier Secure Card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/10 via-slate-50 to-blue-50/20 dark:from-navy-950 dark:via-slate-900/50 dark:to-blue-950/20 border border-blue-200 dark:border-blue-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    One Nation One Student ID (APAAR)
                  </span>
                  <div className="text-xl font-mono font-black text-blue-700 dark:text-blue-400 mt-0.5 tracking-wider">
                    {maskedApaar}
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Aadhaar-derived sovereign academic identifier
                  </span>
                </div>

                {!isRevealed ? (
                  <button
                    onClick={() => {
                      setStudentToRevealApaar(student);
                      setIsRevealApaarOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs self-start sm:self-auto"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Reveal Unmasked APAAR</span>
                  </button>
                ) : (
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-1 rounded border border-amber-200 dark:border-amber-800">
                    ✓ Decrypted for Current Session
                  </span>
                )}
              </div>

              {/* Identity Detail Grid */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Institutional Enrollment No</span>
                  <div className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                    {student.enrollmentNumber}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Date of Birth (DOB)</span>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    {student.dob}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Gender</span>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    {student.gender}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Social Category / Quota</span>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    {student.category} ({student.quotaType})
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">DigiLocker Status</span>
                  <div className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{student.digiLockerLinked ? 'Biometrically Linked' : 'Unlinked'}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Academic Bank of Credits</span>
                  <div className="font-mono text-slate-900 dark:text-white font-bold mt-0.5">
                    {student.abcAccountId || 'Pending Tokenization'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Degree Course:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{student.course}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Institution:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{student.institutionName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Current Semester:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">Semester {student.currentSemester}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Cumulative GPA (CGPA):</span>
                  <span className="font-black text-slate-900 dark:text-white font-mono text-sm">{student.academicScoreCgpa} / 10.0</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'verification' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 leading-relaxed">
                <strong>Cryptographic Verification Status: </strong>
                This record is digitally endorsed by AICTE Central Repository. Verification Hash: <code className="font-mono font-bold text-xs">0x8f2a...{student.verificationId}</code>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Verifiable Digital Academic Credential Card
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Generate tamper-proof credential with functional QR verification code.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    setActiveTab('apaar-verify');
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-xs transition flex items-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Open Credential Card</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-slate-500 font-bold mb-2">Immutable Security Audit Trail:</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                <div>• Verified on: {student.verifiedOn || '2026-02-14 16:15:20'} by Dr. Anjali Verma (AICTE RO)</div>
                <div>• Initial Enrollment commit: 2024-08-20 via COEP Registrar Gateway</div>
                <div>• DigiLocker token verified with Aadhaar contact hash {student.contactHash}</div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">
            Verification ID: {student.verificationId}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
