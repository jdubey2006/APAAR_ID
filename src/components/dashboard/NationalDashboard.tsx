import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Link2, 
  CheckCircle, 
  AlertTriangle, 
  Copy, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Filter, 
  Download, 
  RefreshCw,
  Info,
  Scale,
  Activity,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { RegionalMapAnalytics } from './RegionalMapAnalytics';
import { LiveActivityFeed } from './LiveActivityFeed';
import { DataPipelineVisualizer } from './DataPipelineVisualizer';

export const NationalDashboard: React.FC = () => {
  const { 
    institutions, 
    students, 
    duplicateCases, 
    anomalies, 
    validationIssues, 
    setActiveTab, 
    addToast 
  } = useApp();

  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '12m'>('12m');

  // Realistic 12-Month Enrolment Growth Dataset
  const trendData = [
    { month: 'Mar 25', total: 1420000, apaar: 1120000, verified: 1040000 },
    { month: 'Apr 25', total: 1460000, apaar: 1210000, verified: 1110000 },
    { month: 'May 25', total: 1510000, apaar: 1300000, verified: 1220000 },
    { month: 'Jun 25', total: 1580000, apaar: 1420000, verified: 1340000 },
    { month: 'Jul 25', total: 1650000, apaar: 1510000, verified: 1420000 },
    { month: 'Aug 25', total: 1710000, apaar: 1600000, verified: 1500000 },
    { month: 'Sep 25', total: 1740000, apaar: 1650000, verified: 1560000 },
    { month: 'Oct 25', total: 1770000, apaar: 1690000, verified: 1600000 },
    { month: 'Nov 25', total: 1795000, apaar: 1720000, verified: 1630000 },
    { month: 'Dec 25', total: 1815000, apaar: 1750000, verified: 1650000 },
    { month: 'Jan 26', total: 1832000, apaar: 1780000, verified: 1670000 },
    { month: 'Feb 26', total: 1842690, apaar: 1796430, verified: 1684201 },
  ];

  // Institution Compliance Pie Data
  const complianceData = [
    { name: 'Compliant', value: 4320, color: '#10B981' },
    { name: 'Needs Attention', value: 418, color: '#F59E0B' },
    { name: 'Non-Compliant', value: 124, color: '#EF4444' },
  ];

  // Admission vs Approved Intake comparison across key institute types
  const intakeComparisonData = [
    { category: 'Central Govt', approved: 85000, enrolled: 84200, excess: 0 },
    { category: 'State Govt', approved: 420000, enrolled: 424500, excess: 4500 },
    { category: 'Govt-Aided', approved: 260000, enrolled: 259400, excess: 0 },
    { category: 'Private Univ', approved: 980000, enrolled: 989600, excess: 9600 },
    { category: 'Deemed Univ', approved: 180000, enrolled: 181200, excess: 1200 },
  ];

  // Interactive KPI Cards
  const kpis = [
    {
      title: 'Total Institutions',
      value: '4,862',
      change: '+3.4% this month',
      isPositive: true,
      subtext: 'AICTE Approved Units',
      icon: Building2,
      color: 'blue',
      tab: 'institutions'
    },
    {
      title: 'Registered Students',
      value: '18,42,690',
      change: '+6.1% YoY',
      isPositive: true,
      subtext: 'Central Registry Ingestion',
      icon: Users,
      color: 'indigo',
      tab: 'students'
    },
    {
      title: 'APAAR Linked',
      value: '17,96,430',
      change: '97.49% Coverage',
      isPositive: true,
      subtext: 'Target: 99.00%',
      icon: Link2,
      color: 'emerald',
      tab: 'students'
    },
    {
      title: 'Verified Records',
      value: '16,84,201',
      change: '91.4% Fully Cleared',
      isPositive: true,
      subtext: 'DigiLocker + NAD Synced',
      icon: CheckCircle,
      color: 'teal',
      tab: 'apaar-verify'
    },
    {
      title: 'Validation Issues',
      value: '12,483',
      change: '-14% vs last week',
      isPositive: true,
      subtext: 'Rule Engine Flags',
      icon: AlertTriangle,
      color: 'amber',
      tab: 'validation'
    },
    {
      title: 'Duplicate Records',
      value: '1,284',
      change: '482 Confirmed',
      isPositive: false,
      subtext: 'Inter-College Collisions',
      icon: Copy,
      color: 'red',
      tab: 'duplicates'
    },
    {
      title: 'Excess Enrolments',
      value: '327',
      change: 'Statutory Breaches',
      isPositive: false,
      subtext: 'Above Sanctioned Cap',
      icon: Scale,
      color: 'rose',
      tab: 'compliance'
    },
    {
      title: 'Pending Verification',
      value: '8,920',
      change: 'Queue: < 48 hrs SLA',
      isPositive: true,
      subtext: 'Under Nodal Review',
      icon: Clock,
      color: 'purple',
      tab: 'validation'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              NATIONAL APAAR INFRASTRUCTURE
            </span>
            <span className="text-xs text-slate-400">• Updated 12 seconds ago</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            National Student Data Overview
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time monitoring of APAAR-linked student records across AICTE-approved institutions nationwide.
          </p>
        </div>

        {/* Quick Toolbar */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            {(['30d', '90d', '12m'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1 rounded-md font-semibold transition ${
                  timeRange === t 
                    ? 'bg-white dark:bg-navy-900 text-blue-600 dark:text-blue-400 shadow-2xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => addToast('Live Report Generated', 'National APAAR Compliance Dossier compiled (PDF)', 'success')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </div>
      </div>

      {/* AI-Assisted Insights Smart Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-navy-900 to-indigo-950 text-white p-4 rounded-2xl border border-blue-500/30 shadow-md">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-cyan-300 border border-blue-400/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              AI-Assisted Autonomous Risk Intelligence
            </span>
          </div>
          <span className="text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded">
            Live Stream v2.6.3
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div 
            onClick={() => setActiveTab('compliance')}
            className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl border border-white/10 cursor-pointer transition"
          >
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>Excess Enrolment Risk</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              <strong>12 institutions</strong> have exceeded 95% of approved statutory intake ceiling.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('anomalies')}
            className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl border border-white/10 cursor-pointer transition"
          >
            <div className="flex items-center gap-1.5 text-rose-300 font-semibold mb-1">
              <Activity className="w-3.5 h-3.5 shrink-0" />
              <span>Intake Bursts</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              <strong>3 institutions</strong> show abnormal &gt;30% intake acceleration in management quota.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('students')}
            className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl border border-white/10 cursor-pointer transition"
          >
            <div className="flex items-center gap-1.5 text-emerald-300 font-semibold mb-1">
              <CheckCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Linkage Velocity</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              National APAAR linkage reached <strong>97.49%</strong> (+4.2% over previous quarter).
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('duplicates')}
            className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl border border-white/10 cursor-pointer transition"
          >
            <div className="flex items-center gap-1.5 text-cyan-300 font-semibold mb-1">
              <Copy className="w-3.5 h-3.5 shrink-0" />
              <span>Dual Enrollment Flags</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              <strong>284 records</strong> require manual verification for concurrent university registration.
            </p>
          </div>
        </div>
      </div>

      {/* Top 8 KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab(kpi.tab)}
              className="bg-white dark:bg-navy-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition truncate">
                  {kpi.title}
                </span>
                <div className={`p-1.5 rounded-lg ${
                  kpi.color === 'blue' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400' :
                  kpi.color === 'indigo' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400' :
                  kpi.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400' :
                  kpi.color === 'teal' ? 'bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400' :
                  kpi.color === 'amber' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400' :
                  kpi.color === 'red' ? 'bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400' :
                  kpi.color === 'rose' ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400' :
                  'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {kpi.value}
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className={`font-semibold flex items-center gap-0.5 ${
                  kpi.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                  <TrendingUp className="w-3 h-3" />
                  {kpi.change}
                </span>
                <span className="text-slate-400 truncate hidden xl:inline">
                  {kpi.subtext}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Analytics Section: 12-Month Enrolment Trend & Institutional Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrolment Growth Line Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Student Enrolment & APAAR Linkage Velocity</span>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                  97.49% Linked
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tracking total registrations, validated APAAR IDs, and digital credentials over 12 months
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                Total Enrolled
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                APAAR Linked
              </span>
              <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                Verified
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickFormatter={val => `${(val / 100000).toFixed(1)}L`} 
                />
                <Tooltip 
                  formatter={(val: any) => [Number(val).toLocaleString('en-IN') + ' students']}
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: '#334155', 
                    borderRadius: '0.75rem', 
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  name="Total Enrolment" 
                  stroke="#2563eb" 
                  strokeWidth={2.5} 
                  dot={false}
                  activeDot={{ r: 5 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="apaar" 
                  name="APAAR Linked" 
                  stroke="#10b981" 
                  strokeWidth={2.5} 
                  dot={false} 
                />
                <Line 
                  type="monotone" 
                  dataKey="verified" 
                  name="Verified Credentials" 
                  stroke="#8b5cf6" 
                  strokeWidth={2} 
                  strokeDasharray="4 4"
                  dot={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Institution Compliance Radial/Donut (1 Col) */}
        <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Institution Compliance
              </h3>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                88.8% Fully Compliant
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Based on APAAR coverage &gt;95% and zero excess admissions
            </p>

            <div className="h-48 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={complianceData}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {complianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val: any) => [`${val} Institutions`]}
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderRadius: '0.5rem', 
                      color: '#fff',
                      fontSize: '11px' 
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  4,862
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  Institutions
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown legend */}
          <div className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
            {complianceData.map(c => (
              <div key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-slate-700 dark:text-slate-300">{c.name}</span>
                </div>
                <div className="font-bold text-slate-900 dark:text-white">
                  {c.value.toLocaleString('en-IN')}{' '}
                  <span className="text-slate-400 font-normal">
                    ({((c.value / 4862) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admission vs Approved Intake Bar Chart & APAAR Linkage Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admission vs Approved Intake (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Approved Intake vs Actual Enrolment</span>
                <span className="text-[10px] font-bold text-red-600 bg-red-100 dark:bg-red-950 dark:text-red-300 px-2 py-0.5 rounded">
                  Excess Enrolment Flagged
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Comparing sanctioned regulatory ceiling vs actual candidate enrolment across college sectors
              </p>
            </div>

            <button
              onClick={() => setActiveTab('compliance')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View Excess Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={intakeComparisonData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickFormatter={val => `${(val / 1000).toFixed(0)}k`} 
                />
                <Tooltip 
                  formatter={(val: any) => [Number(val).toLocaleString('en-IN') + ' students']}
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderRadius: '0.5rem', 
                    color: '#fff',
                    fontSize: '11px' 
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="approved" name="Sanctioned Intake" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="enrolled" name="Actual Enrolment" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="excess" name="Excess Admission Violation" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* National APAAR Progress & Target (1 col) */}
        <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                National APAAR Target
              </h3>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                Target: 99.0%
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              "One Nation, One Student ID" saturation trajectory
            </p>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 mb-4 text-center">
              <div className="text-3xl font-black text-slate-900 dark:text-white">
                97.49%
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center justify-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>17,96,430 of 18,42,690 Students Linked</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mt-3">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: '97.49%' }}
                />
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Pending Linkage:</span>
                <span className="font-semibold text-slate-900 dark:text-white">46,260 (2.51%)</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>DigiLocker Synced:</span>
                <span className="font-semibold text-slate-900 dark:text-white">16,84,201 (91.4%)</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>ABC Token Accounts:</span>
                <span className="font-semibold text-slate-900 dark:text-white">15,92,410 (86.4%)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('students')}
            className="w-full mt-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg transition text-center"
          >
            Review Pending Student Profiles
          </button>
        </div>
      </div>

      {/* Regional Analytics & India Map Heatmap */}
      <RegionalMapAnalytics />

      {/* Live System Activity Ticker */}
      <LiveActivityFeed />
    </div>
  );
};
