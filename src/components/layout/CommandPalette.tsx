import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Users, Building2, QrCode, FileClock, ArrowRight, ShieldCheck, Play } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen, 
    students, 
    institutions, 
    setSelectedStudent, 
    setSelectedInstitution,
    setActiveTab,
    setIsJudgeDemoActive,
    simulate100Uploads,
    simulateDuplicateDetection
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.apaarId.includes(query) ||
    s.enrollmentNumber.toLowerCase().includes(query.toLowerCase()) ||
    s.verificationId.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredInstitutions = institutions.filter(i => 
    i.name.toLowerCase().includes(query.toLowerCase()) ||
    i.aicteId.includes(query) ||
    i.city.toLowerCase().includes(query.toLowerCase()) ||
    i.state.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a student name, APAAR (e.g. 9842), institution, or command..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Quick Actions */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
              Quick Shortcuts & Demonstrations
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              <button
                onClick={() => {
                  setIsCommandPaletteOpen(false);
                  setIsJudgeDemoActive(true);
                }}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-200 text-left transition border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
              >
                <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-600">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Start SIH Judge Walkthrough</div>
                  <div className="text-[10px] text-slate-400">12-step guided prototype tour</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsCommandPaletteOpen(false);
                  setActiveTab('apaar-verify');
                }}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-left transition"
              >
                <div className="p-1.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                  <QrCode className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Verify Academic Identity</div>
                  <div className="text-[10px] text-slate-400">Instant APAAR / QR verification</div>
                </div>
              </button>
            </div>
          </div>

          {/* Students Group */}
          {filteredStudents.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center justify-between">
                <span>Student Records</span>
                <span>{filteredStudents.length} matches</span>
              </div>
              <div className="space-y-1">
                {filteredStudents.map(student => (
                  <div
                    key={student.id}
                    onClick={() => {
                      setSelectedStudent(student);
                      setActiveTab('students');
                      setIsCommandPaletteOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/70 cursor-pointer transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{student.name}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                            APAAR: {student.apaarId}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {student.course} • {student.institutionName}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Institutions Group */}
          {filteredInstitutions.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center justify-between">
                <span>Institutions</span>
                <span>{filteredInstitutions.length} matches</span>
              </div>
              <div className="space-y-1">
                {filteredInstitutions.map(inst => (
                  <div
                    key={inst.id}
                    onClick={() => {
                      setSelectedInstitution(inst);
                      setActiveTab('institutions');
                      setIsCommandPaletteOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/70 cursor-pointer transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-600">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {inst.name}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          AICTE ID: {inst.aicteId} • {inst.city}, {inst.state} • Intake: {inst.actualEnrolment}/{inst.approvedIntake}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredStudents.length === 0 && filteredInstitutions.length === 0 && query && (
            <div className="text-center py-8 text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="font-medium">No results found for "{query}"</p>
              <p className="text-[11px] mt-1">Try searching by student name, APAAR (e.g. 9842), or institution name</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Navigate with mouse or keyboard</span>
          <span className="font-mono text-[10px]">VIDYASetu Search v2.6</span>
        </div>
      </div>
      <div className="fixed inset-0 -z-10" onClick={() => setIsCommandPaletteOpen(false)} />
    </div>
  );
};
