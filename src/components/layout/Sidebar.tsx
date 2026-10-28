import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  QrCode, 
  UploadCloud, 
  CheckSquare, 
  Copy, 
  BrainCircuit, 
  Scale, 
  Building2, 
  BarChart3, 
  FileText, 
  Key, 
  ShieldCheck, 
  FileClock, 
  Settings, 
  HelpCircle,
  Activity,
  UserCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  badgeColor?: string;
  allowedRoles?: string[];
}

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    sidebarCollapsed, 
    validationIssues, 
    duplicateCases, 
    anomalies,
    currentRole
  } = useApp();

  const openValidationCount = validationIssues.filter(v => v.status === 'Open').length;
  const potentialDupCount = duplicateCases.filter(d => d.status === 'Potential').length;
  const highRiskAnomCount = anomalies.filter(a => a.riskLevel === 'High').length;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'National Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Student Records', icon: Users },
    { id: 'apaar-verify', label: 'APAAR Verification', icon: QrCode },
    { id: 'upload', label: 'Data Submission', icon: UploadCloud },
    { 
      id: 'validation', 
      label: 'Validation Center', 
      icon: CheckSquare, 
      badge: openValidationCount, 
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' 
    },
    { 
      id: 'duplicates', 
      label: 'Duplicate Detection', 
      icon: Copy, 
      badge: potentialDupCount, 
      badgeColor: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' 
    },
    { 
      id: 'anomalies', 
      label: 'AI Anomaly Detection', 
      icon: BrainCircuit, 
      badge: highRiskAnomCount, 
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' 
    },
    { id: 'compliance', label: 'Admission Compliance', icon: Scale },
    { id: 'institutions', label: 'Institutions', icon: Building2 },
    { id: 'analytics', label: 'Regional Analytics', icon: BarChart3 },
    { id: 'pipeline', label: 'Data Pipeline Flow', icon: Activity },
    { id: 'reports', label: 'Reports & Compliance', icon: FileText },
    { id: 'integrations', label: 'API & Integrations', icon: Key },
    { id: 'consent', label: 'Consent & Privacy', icon: UserCheck },
    { id: 'security', label: 'Security & RBAC', icon: ShieldCheck },
    { id: 'audit', label: 'Audit Logs', icon: FileClock },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      className={`shrink-0 bg-white dark:bg-navy-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col z-20 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Platform Info Badge */}
      {!sidebarCollapsed && (
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              National Repository
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live v2.6.3
            </span>
          </div>
          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">
            APAAR Central Registry
          </div>
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative ${
                isActive 
                  ? 'bg-blue-600 text-white font-semibold shadow-sm' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`} />
              
              {!sidebarCollapsed && (
                <>
                  <span className="truncate flex-1 text-left">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white text-blue-700' : item.badgeColor
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}

              {sidebarCollapsed && item.badge !== undefined && item.badge > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white dark:ring-navy-900" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Regulatory & SIH Banner */}
      {!sidebarCollapsed && (
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50/70 dark:bg-slate-900/50">
          <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>SIH 2026 • PS 26263</span>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
            AICTE Academic Identity Cell
          </div>
        </div>
      )}
    </aside>
  );
};
