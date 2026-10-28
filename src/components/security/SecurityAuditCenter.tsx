import React from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Lock, 
  Users, 
  AlertTriangle, 
  Activity, 
  Server,
  Key
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SecurityAuditCenter: React.FC = () => {
  const permissionsList = [
    { key: 'view_students', label: 'View Student Directory' },
    { key: 'create_students', label: 'Create / Add Student Records' },
    { key: 'edit_students', label: 'Edit Student Information' },
    { key: 'delete_students', label: 'Delete Student Records' },
    { key: 'verify_students', label: 'Verify Credentials & Seal' },
    { key: 'upload_data', label: 'Bulk Dataset Upload' },
    { key: 'approve_data', label: 'Approve Submission Batches' },
    { key: 'view_analytics', label: 'Access National Analytics' },
    { key: 'generate_reports', label: 'Compile Regulatory Reports' },
    { key: 'manage_institutions', label: 'Manage Institutions & Intake' },
    { key: 'manage_apis', label: 'Manage API Keys & Connectors' },
    { key: 'view_audit_logs', label: 'Inspect Security Audit Logs' },
    { key: 'manage_users', label: 'Manage Platform Users' },
    { key: 'configure_validation', label: 'Configure Rule Engine Thresholds' },
  ];

  const rolePermissions: Record<string, string[]> = {
    aicte_admin: permissionsList.map(p => p.key), // All permissions
    verification_officer: [
      'view_students',
      'verify_students',
      'approve_data',
      'view_analytics',
      'generate_reports',
      'view_audit_logs'
    ],
    institution_admin: [
      'view_students',
      'create_students',
      'edit_students',
      'upload_data',
      'view_analytics',
      'generate_reports'
    ],
    student: [
      'view_students' // Own profile only
    ],
    external_verifier: [
      'verify_students' // Limited verification lookup
    ]
  };

  const roles = [
    { id: 'aicte_admin', name: 'AICTE Super Admin' },
    { id: 'verification_officer', name: 'Verification Officer' },
    { id: 'institution_admin', name: 'Institution Admin' },
    { id: 'student', name: 'Student Scholar' },
    { id: 'external_verifier', name: 'Authorized Verifier' }
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                ZERO TRUST ARCHITECTURE
              </span>
              <span className="text-xs text-slate-400">• Security & Access Governance</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Security Center & Role-Based Access Control (RBAC)
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Comprehensive role permission matrix enforcing the principle of least privilege, session monitoring, and cryptographic boundary defense.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                98/100
              </div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                Security Posture Score
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Health Metrics 4-Pack */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-slate-400 text-[10px] uppercase font-semibold">Active Sessions</span>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            1,482
          </div>
          <span className="text-[10px] text-emerald-600 font-medium">✓ MFA Enforced</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-slate-400 text-[10px] uppercase font-semibold">Failed Auth Attempts</span>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            3 (Last 24h)
          </div>
          <span className="text-[10px] text-slate-400">Rate limited & blocked</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-slate-400 text-[10px] uppercase font-semibold">Data Encryption</span>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            AES-256-GCM
          </div>
          <span className="text-[10px] text-slate-400">At-rest & TLS 1.3 in-transit</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-slate-400 text-[10px] uppercase font-semibold">API Throughput</span>
          <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mt-1">
            12.5k req/s
          </div>
          <span className="text-[10px] text-slate-400">Avg response: 48ms</span>
        </div>
      </div>

      {/* RBAC Permission Matrix */}
      <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>Role-Based Access Control (RBAC) Permission Matrix</span>
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            Enforced via JSON Web Token Claims
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5">Permission Capability</th>
                {roles.map(r => (
                  <th key={r.id} className="p-3.5 text-center whitespace-nowrap">
                    {r.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {permissionsList.map(perm => (
                <tr key={perm.key} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">
                    {perm.label}
                  </td>
                  {roles.map(r => {
                    const hasPerm = rolePermissions[r.id].includes(perm.key);
                    return (
                      <td key={r.id} className="p-3.5 text-center">
                        {hasPerm ? (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 mx-auto">
                            <Check className="w-3.5 h-3.5 font-bold" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-300 dark:bg-slate-800 dark:text-slate-600 mx-auto">
                            <X className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
