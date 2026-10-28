import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  ShieldCheck, 
  Play, 
  RotateCcw, 
  Sparkles, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle,
  Menu,
  Sliders,
  ExternalLink,
  Lock
} from 'lucide-react';
import { useApp, DEMO_USERS } from '../../context/AppContext';
import { UserRole } from '../../types';

export const TopNavbar: React.FC<{ onOpenLanding?: () => void }> = ({ onOpenLanding }) => {
  const { 
    currentUser, 
    currentRole, 
    switchRole, 
    darkMode, 
    toggleDarkMode, 
    sidebarCollapsed, 
    setSidebarCollapsed,
    setIsCommandPaletteOpen,
    notifications,
    setIsVidyaAIOpen,
    setIsJudgeDemoActive,
    resetDemoData,
    simulate100Uploads,
    simulateDuplicateDetection,
    simulateExcessEnrolment,
    simulateValidationFailure,
    setActiveTab
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [simMenuOpen, setSimMenuOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex flex-col bg-white/95 dark:bg-navy-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
      {/* Top Government Disclaimer & Demo Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            DEMO MODE
          </span>
          <span className="text-slate-300 hidden sm:inline">
            SIH 2026 Problem Statement PS-26263 • AICTE APAAR Prototype
          </span>
          <span className="text-slate-400 text-[11px] hidden md:inline">
            (Fictional demonstration data only)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Simulation Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSimMenuOpen(!simMenuOpen)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition"
              title="Simulate real-time events for live presentation"
            >
              <Sliders className="w-3 h-3 text-cyan-400" />
              <span>Simulation Controls</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {simMenuOpen && (
              <div 
                className="absolute right-0 mt-1.5 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-2 z-50 animate-fade-in text-xs"
                onMouseLeave={() => setSimMenuOpen(false)}
              >
                <div className="text-[10px] uppercase tracking-wider text-slate-400 px-2 py-1 font-semibold">
                  Trigger Live Simulation
                </div>
                <button
                  onClick={() => { simulate100Uploads(); setSimMenuOpen(false); }}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                >
                  <span>+100 Student Ingestion</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1 rounded">Batch</span>
                </button>
                <button
                  onClick={() => { simulateDuplicateDetection(); setSimMenuOpen(false); }}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                >
                  <span>Trigger 98.2% Duplicate</span>
                  <span className="text-[10px] text-red-400 bg-red-950 px-1 rounded">Critical</span>
                </button>
                <button
                  onClick={() => { simulateExcessEnrolment(); setSimMenuOpen(false); }}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                >
                  <span>Trigger Excess Intake Breach</span>
                  <span className="text-[10px] text-amber-400 bg-amber-950 px-1 rounded">+30 Intake</span>
                </button>
                <button
                  onClick={() => { simulateValidationFailure(); setSimMenuOpen(false); }}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                >
                  <span>Luhn Checksum Failure</span>
                  <span className="text-[10px] text-purple-400 bg-purple-950 px-1 rounded">Rule</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={resetDemoData}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition"
            title="Reset data to initial prototype state"
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          {onOpenLanding && (
            <button
              onClick={onOpenLanding}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-900/60 hover:bg-blue-800/80 text-blue-200 text-xs border border-blue-700/50 transition"
            >
              <span>Landing Page</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Tricolor National Identity Ribbon */}
      <div className="tricolor-stripe w-full" />

      {/* Main Navigation Bar */}
      <div className="h-16 px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Left: Sidebar Toggle & Branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* National Emblem & Shield Badge */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-navy-950 flex items-center justify-center shadow-md border border-blue-700/40 relative overflow-hidden group-hover:scale-105 transition-transform">
              <div className="absolute inset-0 bg-blue-600/10" />
              <ShieldCheck className="w-6 h-6 text-blue-400 relative z-10" />
              <div className="absolute -bottom-1 w-full h-1 bg-amber-500" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white font-sans">
                  VIDYA<span className="text-blue-600 dark:text-blue-400">Setu</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  AICTE APAAR
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block truncate max-w-xs md:max-w-md">
                National Student Data Intelligence & Verification Platform
              </p>
            </div>
          </div>
        </div>

        {/* Center: Command Palette Global Search (Ctrl + K) */}
        <div className="flex-1 max-w-md mx-2 hidden lg:block">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 rounded-lg border border-slate-200 dark:border-slate-700 transition shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search Student, APAAR, Institution, or Verification ID...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-slate-600 dark:text-slate-300 shadow-2xs">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile search trigger */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Special Judge Demo Guide Launcher */}
          <button
            onClick={() => setIsJudgeDemoActive(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-102 active:scale-98 animate-pulse-slow"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Judge Demo</span>
          </button>

          {/* Floating AI Assistant Trigger */}
          <button
            onClick={() => setIsVidyaAIOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition"
            title="Ask VIDYA AI regulatory & compliance questions"
          >
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="hidden md:inline">VIDYA AI</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white dark:ring-navy-900" />
              )}
            </button>

            {notifDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-80 md:w-96 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl p-3 z-50 animate-fade-in"
                onMouseLeave={() => setNotifDropdownOpen(false)}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white">Live Alerts</span>
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                      {notifications.length}
                    </span>
                  </div>
                  <button 
                    onClick={() => setActiveTab('audit')}
                    className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View Audit Trail
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 mt-1">
                  {notifications.map(n => (
                    <div 
                      key={n.id}
                      onClick={() => {
                        if (n.linkTab) setActiveTab(n.linkTab);
                        setNotifDropdownOpen(false);
                      }}
                      className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-lg cursor-pointer transition text-left"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className={`text-xs font-semibold ${
                          n.type === 'critical' ? 'text-red-600 dark:text-red-400' :
                          n.type === 'warning' ? 'text-amber-600 dark:text-amber-400' :
                          n.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' :
                          'text-blue-600 dark:text-blue-400'
                        }`}>
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-2">
                        {n.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle Dark/Light Mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Role Switcher & User Profile */}
          <div className="relative border-l border-slate-200 dark:border-slate-800 pl-2 sm:pl-3">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition text-left"
            >
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-slate-700"
              />
              <div className="hidden xl:block text-left">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[140px]">
                  {currentUser.name}
                </div>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {currentRole.replace('_', ' ')}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {roleDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl p-3 z-50 animate-fade-in"
                onMouseLeave={() => setRoleDropdownOpen(false)}
              >
                <div className="pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {currentUser.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {currentUser.designation}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Digitally Authenticated (NIC-SSO)</span>
                  </div>
                </div>

                <div className="text-[10px] uppercase font-bold text-slate-400 px-1 py-1">
                  Switch Active Role (Demo)
                </div>

                <div className="space-y-1">
                  {(Object.keys(DEMO_USERS) as UserRole[]).map(r => {
                    const u = DEMO_USERS[r];
                    const isActive = currentRole === r;
                    return (
                      <button
                        key={r}
                        onClick={() => {
                          switchRole(r);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition ${
                          isActive 
                            ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold' 
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div>
                          <div>{u.name}</div>
                          <div className="text-[10px] text-slate-400 capitalize">{r.replace('_', ' ')}</div>
                        </div>
                        {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
