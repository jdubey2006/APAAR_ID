import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  User, 
  Key, 
  Building2, 
  GraduationCap, 
  QrCode,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp, DEMO_USERS } from '../../context/AppContext';
import { UserRole } from '../../types';

interface Props {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<Props> = ({ onLoginSuccess }) => {
  const { switchRole, currentRole, addToast } = useApp();

  const [email, setEmail] = useState('ramesh.sharma@aicte-india.org');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('aicte_admin');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(DEMO_USERS[role].email);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      switchRole(selectedRole);
      setIsLoading(false);
      onLoginSuccess();
      addToast('Secure Login Successful', `Welcome back, ${DEMO_USERS[selectedRole].name}`, 'success');
    }, 600);
  };

  const handleDigiLockerLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      switchRole('student');
      setIsLoading(false);
      onLoginSuccess();
      addToast('DigiLocker SSO Authenticated', 'Biometrically validated via Aadhaar e-KYC', 'success');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top National Ribbon */}
      <div className="tricolor-stripe w-full" />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-navy-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          
          {/* LEFT SIDE: Government Branding & Digital Public Infrastructure (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 via-navy-900 to-indigo-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-blue-500/30">
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-cyan-300 shadow-md">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight text-white font-sans">
                    VIDYA<span className="text-cyan-400">Setu</span>
                  </h2>
                  <div className="text-[10px] text-slate-300 uppercase font-semibold tracking-wider">
                    AICTE APAAR Platform
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                  SIH 2026 • PS 26263
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  Sovereign National Student Data & Verification Infrastructure
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Centralized, tamper-evident repository powering APAAR academic identity validation, duplicate detection, and admission compliance across all AICTE-approved institutions.
                </p>
              </div>

              {/* 3 Pillars of Security */}
              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>DPDP Act 2023 Compliant (Masked APAAR)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Academic Bank of Credits (ABC) & DigiLocker Bridge</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Automated 12-Point Anomaly & Duplicate Engine</span>
                </div>
              </div>
            </div>

            {/* Bottom Security Footer */}
            <div className="pt-8 border-t border-white/10 relative z-10 text-[11px] text-slate-400 flex items-center justify-between">
              <span>🔒 NIC-Grade 256-Bit TLS 1.3</span>
              <span className="font-mono">v2.6 Prototype</span>
            </div>
          </div>

          {/* RIGHT SIDE: Authentication Card (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Authorized Sign In
                </h3>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  Audit Logged
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sign in with institutional credentials, DigiLocker SSO, or choose a pre-configured role.
              </p>
            </div>

            {/* Quick Demo Role Selector */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Select Pre-Configured Demo Persona:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { role: 'aicte_admin' as const, label: 'AICTE Admin', icon: Building2 },
                  { role: 'verification_officer' as const, label: 'Verif. Officer', icon: ShieldCheck },
                  { role: 'institution_admin' as const, label: 'Institution Admin', icon: GraduationCap },
                  { role: 'student' as const, label: 'Student Scholar', icon: User },
                  { role: 'external_verifier' as const, label: 'External Verifier', icon: QrCode }
                ].map(item => {
                  const Icon = item.icon;
                  const isSelected = selectedRole === item.role;
                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => handleRoleSelect(item.role)}
                      className={`p-2 rounded-xl text-left border transition text-xs flex items-center gap-2 ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-700 dark:text-blue-300 font-bold shadow-2xs'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Institutional ID / Official Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 dark:text-white font-medium focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Security Passphrase / SSO Key
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 dark:text-white font-mono focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Remember session token</span>
                </label>
                <span className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">
                  Forgot Password?
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Authenticating with Central Registry...</span>
                ) : (
                  <>
                    <span>Sign In as {selectedRole.replace('_', ' ').toUpperCase()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Alternative SSO Buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <button
                type="button"
                onClick={handleDigiLockerLogin}
                className="w-full py-2.5 px-3 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition"
              >
                <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">
                  D
                </div>
                <span>Sign in with DigiLocker / MeriPehchaan SSO</span>
              </button>
            </div>

            {/* Security Badges */}
            <div className="pt-2 flex items-center justify-around text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-1">🔒 Secure Auth</span>
              <span>•</span>
              <span className="flex items-center gap-1">🛡 RBAC Enforced</span>
              <span>•</span>
              <span className="flex items-center gap-1">✓ Audit Logged</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
