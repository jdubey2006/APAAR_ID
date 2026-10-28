import React, { useState } from 'react';
import { 
  QrCode, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Upload, 
  FileCheck2, 
  Lock, 
  Building2, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DigitalCredentialCard } from './DigitalCredentialCard';
import { Student } from '../../types';

export const APAARVerificationPortal: React.FC = () => {
  const { students, addToast, setPublicVerifyId } = useApp();

  const [searchVal, setSearchVal] = useState('VS-2026-849201');
  const [isSearching, setIsSearching] = useState(false);
  const [matchedStudent, setMatchedStudent] = useState<Student | null>(students[0]);

  const handleVerify = () => {
    setIsSearching(true);
    setTimeout(() => {
      const match = students.find(s => 
        s.verificationId.toLowerCase() === searchVal.trim().toLowerCase() ||
        s.apaarId === searchVal.trim() ||
        s.enrollmentNumber.toLowerCase() === searchVal.trim().toLowerCase() ||
        s.name.toLowerCase().includes(searchVal.trim().toLowerCase())
      );
      setMatchedStudent(match || null);
      setIsSearching(false);
      if (match) {
        addToast('Verification Successful', `Record confirmed for ${match.name}`, 'success');
      } else {
        addToast('No Record Found', 'Identifier not found in central registry', 'error');
      }
    }, 500);
  };

  const handleScanSimulation = () => {
    setSearchVal('VS-2026-849201');
    handleVerify();
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                SOVEREIGN VERIFICATION PORTAL
              </span>
              <span className="text-xs text-slate-400">• High-Assurance Credential Engine</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Verify Academic Identity
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Instant cryptographic verification of APAAR-linked diplomas, degree credentials, and institutional accreditation.
            </p>
          </div>

          <button
            onClick={() => setPublicVerifyId('VS-2026-849201')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
          >
            <span>Open Public Standalone Gateway</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Input Verification Search Bar */}
      <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-8 flex gap-2">
            <input
              type="text"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              placeholder="Enter APAAR ID (e.g. 9842-1024-4821) or Verification ID (e.g. VS-2026-849201)..."
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white font-mono focus:outline-hidden focus:border-blue-500"
            />
            <button
              onClick={handleVerify}
              disabled={isSearching || !searchVal.trim()}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs disabled:opacity-50 flex items-center gap-1.5"
            >
              {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Verify Record</span>
            </button>
          </div>

          <div className="md:col-span-4 flex items-center justify-end gap-2">
            <button
              onClick={handleScanSimulation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition"
            >
              <QrCode className="w-4 h-4 text-blue-600" />
              <span>Simulate QR Scan</span>
            </button>
          </div>
        </div>

        {/* Quick Sample Query Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
          <span className="font-semibold text-slate-400">Sample Records:</span>
          <button 
            onClick={() => { setSearchVal('VS-2026-849201'); handleVerify(); }}
            className="hover:underline font-mono text-blue-600 dark:text-blue-400"
          >
            Aarav Mehta (VS-2026-849201)
          </button>
          <span>•</span>
          <button 
            onClick={() => { setSearchVal('VS-2026-761294'); handleVerify(); }}
            className="hover:underline font-mono text-blue-600 dark:text-blue-400"
          >
            Ananya Deshmukh (VS-2026-761294)
          </button>
          <span>•</span>
          <button 
            onClick={() => { setSearchVal('VS-2026-614388'); handleVerify(); }}
            className="hover:underline font-mono text-blue-600 dark:text-blue-400"
          >
            Kavya Narayanan (VS-2026-614388)
          </button>
        </div>
      </div>

      {/* Loading state or Verified Digital Credential View */}
      {isSearching ? (
        <div className="bg-white dark:bg-navy-900 p-12 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Securely checking academic record against AICTE master cluster...
          </h4>
          <p className="text-xs text-slate-400">
            Validating sovereign ECDSA checksums and Aadhaar cryptographic tokens.
          </p>
        </div>
      ) : matchedStudent ? (
        <div className="space-y-6 animate-fade-in">
          {/* Trust Attributes Checklist Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">Record Exists</div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400">AICTE Central Master</span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">Institution Approved</div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400">Accredited Unit</span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">APAAR Linked</div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400">ABC Token Synced</span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">Zero Collisions</div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400">No Concurrent Clashes</span>
            </div>
          </div>

          {/* High-Fidelity Government Digital Credential Card */}
          <DigitalCredentialCard 
            student={matchedStudent}
            onOpenPublicVerify={(id) => setPublicVerifyId(id)}
          />
        </div>
      ) : (
        <div className="bg-white dark:bg-navy-900 p-8 rounded-2xl border border-red-300 dark:border-red-800 text-center space-y-2">
          <h4 className="text-base font-bold text-red-600">No Record Found</h4>
          <p className="text-xs text-slate-400">
            No matching student record located for query "{searchVal}".
          </p>
        </div>
      )}
    </div>
  );
};
