import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Download, 
  Lock, 
  Unlock,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';
import { StudentProfileModal } from './StudentProfileModal';
import { RevealApaarModal } from './RevealApaarModal';

export const StudentDirectory: React.FC = () => {
  const { 
    students, 
    selectedStudent, 
    setSelectedStudent, 
    revealedApaarIds, 
    studentToRevealApaar, 
    setStudentToRevealApaar, 
    isRevealApaarOpen, 
    setIsRevealApaarOpen,
    addToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Verified' | 'Pending' | 'Flagged'>('All');
  const [programmeFilter, setProgrammeFilter] = useState<string>('All');

  const programmes = ['All', ...Array.from(new Set(students.map(s => s.programme)))];

  const filtered = students.filter(stu => {
    const matchesSearch = 
      stu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stu.apaarId.includes(searchQuery) ||
      stu.enrollmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stu.institutionName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || stu.verificationStatus === statusFilter;
    const matchesProg = programmeFilter === 'All' || stu.programme === programmeFilter;

    return matchesSearch && matchesStatus && matchesProg;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                CENTRAL STUDENT REGISTRY
              </span>
              <span className="text-xs text-slate-400">• One Nation One Student ID (APAAR)</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Student Record Management
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Securely query, verify, and inspect APAAR-linked student credentials across all AICTE-approved institutions.
            </p>
          </div>

          <button
            onClick={() => addToast('Export Generated', 'Masked student cohort exported to CSV (DPDP Compliant)', 'success')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Verified Cohort</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-navy-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-700 dark:text-slate-300">Status:</span>
          {(['All', 'Verified', 'Pending', 'Flagged'] as const).map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {st}
            </button>
          ))}

          <select
            value={programmeFilter}
            onChange={e => setProgrammeFilter(e.target.value)}
            className="ml-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-700 dark:text-slate-300 font-semibold focus:outline-hidden"
          >
            {programmes.map(p => <option key={p} value={p}>Programme: {p}</option>)}
          </select>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search student, APAAR (e.g. 9842), or enrollment no..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
          />
        </div>
      </div>

      {/* Student Registry Table */}
      <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">APAAR ID (Protected)</th>
                <th className="p-3.5">Enrollment No</th>
                <th className="p-3.5">Institution</th>
                <th className="p-3.5">Course / Stream</th>
                <th className="p-3.5">Batch</th>
                <th className="p-3.5">Verification</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(stu => {
                const isRevealed = !!revealedApaarIds[stu.id];
                const displayApaar = isRevealed ? stu.apaarId : 'XXXX XXXX ' + stu.apaarId.slice(-4);

                return (
                  <tr 
                    key={stu.id}
                    onClick={() => setSelectedStudent(stu)}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 cursor-pointer transition"
                  >
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{stu.name}</span>
                        {stu.digiLockerLinked && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="DigiLocker Linked" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">{stu.category} • {stu.gender}</div>
                    </td>
                    <td className="p-3.5 font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[11px] ${isRevealed ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500'}`}>
                          {displayApaar}
                        </span>
                        {!isRevealed ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setStudentToRevealApaar(stu);
                              setIsRevealApaarOpen(true);
                            }}
                            className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded transition"
                            title="Reveal Unmasked APAAR (Audit Logged)"
                          >
                            <Lock className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span className="text-[9px] text-emerald-600 font-bold">Unmasked</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                      {stu.enrollmentNumber}
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300 max-w-[200px] truncate">
                      {stu.institutionName}
                    </td>
                    <td className="p-3.5 text-slate-800 dark:text-slate-200">
                      {stu.course}
                    </td>
                    <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400">
                      {stu.admissionYear}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        stu.verificationStatus === 'Verified' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                        stu.verificationStatus === 'Flagged' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                        'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {stu.verificationStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStudent(stu);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Profile</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <StudentProfileModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {/* Reveal APAAR Confirmation Modal */}
      {isRevealApaarOpen && studentToRevealApaar && (
        <RevealApaarModal
          student={studentToRevealApaar}
          onClose={() => {
            setIsRevealApaarOpen(false);
            setStudentToRevealApaar(null);
          }}
        />
      )}
    </div>
  );
};
