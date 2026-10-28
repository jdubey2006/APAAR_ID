import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Building2, 
  ShieldCheck, 
  Bell, 
  Lock, 
  CheckSquare, 
  Key, 
  UserCheck, 
  Sliders,
  CheckCircle2,
  Save
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { currentUser, addToast, currentRole } = useApp();
  const [activeSection, setActiveSection] = useState<'profile' | 'validation' | 'notifications' | 'privacy'>('profile');

  // Validation rules configuration
  const [rules, setRules] = useState({
    autoDuplicateThreshold: 90,
    enforceLuhnChecksum: true,
    blockExcessAdmissions: true,
    requireDigiLockerForScholarship: true,
    maxAllowedSupernumeraryPercent: 5
  });

  const handleSave = () => {
    addToast('Settings Saved', 'System configurations updated across AICTE central cluster', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                ADMINISTRATION & CONFIGURATION
              </span>
              <span className="text-xs text-slate-400">• Institutional Parameters</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Platform Settings & Rule Engine Thresholds
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Configure organizational profiles, automated validation tolerances, and DPDP privacy settings.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          {[
            { id: 'profile', label: 'User Profile & Identity' },
            { id: 'validation', label: 'Validation Rules & Thresholds' },
            { id: 'notifications', label: 'Notification Preferences' },
            { id: 'privacy', label: 'DPDP Privacy Policies' }
          ].map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                activeSection === sec.id
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section 1: User Profile */}
      {activeSection === 'profile' && (
        <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-md"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {currentUser.name}
              </h3>
              <div className="text-slate-500 dark:text-slate-400 text-xs">
                {currentUser.designation}
              </div>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Active Role: {currentRole.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Email Address:</label>
              <input
                type="text"
                readOnly
                value={currentUser.email}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Assigned Institution / Bureau:</label>
              <input
                type="text"
                readOnly
                value={currentUser.institutionName || 'AICTE Headquarters'}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white font-semibold"
              />
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Validation Engine Rules */}
      {activeSection === 'validation' && (
        <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Statutory Rule Engine Parameters
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs">
            Tune algorithmic detection thresholds across all institutional uploads.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Duplicate Detection Threshold</span>
                <p className="text-slate-500 text-[11px]">Minimum similarity percentage to trigger concurrent enrolment flag.</p>
              </div>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">90.0%</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Enforce Luhn Mod-10 Checksum on APAAR</span>
                <p className="text-slate-500 text-[11px]">Immediately reject invalid 12-digit formatting upon ingestion.</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[10px]">
                ENABLED
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Hard Block on Excess Admissions</span>
                <p className="text-slate-500 text-[11px]">Prevent institutional batch finalization if admitted candidates exceed sanctioned intake.</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[10px]">
                ENABLED
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Section 3 & 4 fallback */}
      {activeSection !== 'profile' && activeSection !== 'validation' && (
        <div className="bg-white dark:bg-navy-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-center space-y-2 text-xs">
          <Settings className="w-8 h-8 text-blue-500 mx-auto opacity-50" />
          <h4 className="font-bold text-slate-900 dark:text-white capitalize">
            {activeSection} Configuration
          </h4>
          <p className="text-slate-500 max-w-sm mx-auto">
            Governed by AICTE Digital Infrastructure Guidelines and Ministry of Education cybersecurity protocols.
          </p>
        </div>
      )}
    </div>
  );
};
