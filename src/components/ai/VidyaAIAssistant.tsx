import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User as UserIcon, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  FileText,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actionTab?: string;
  actionLabel?: string;
}

export const VidyaAIAssistant: React.FC = () => {
  const { 
    isVidyaAIOpen, 
    setIsVidyaAIOpen, 
    institutions, 
    students, 
    duplicateCases, 
    anomalies, 
    validationIssues,
    setActiveTab,
    setSelectedStudent,
    setSelectedInstitution
  } = useApp();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'Namaste! I am VIDYA AI, your intelligent regulatory intelligence assistant for AICTE APAAR data. You can query national admissions, inspect duplicate identities, analyze compliance risks, or investigate anomaly scores.',
      timestamp: 'Just now'
    }
  ]);

  if (!isVidyaAIOpen) return null;

  const quickQuestions = [
    'Which institutions have excess enrolment?',
    'Show institutions with APAAR coverage below 95%',
    'How many duplicate records were detected?',
    'Why was student Rahul K. Sharma flagged?',
    'Generate national compliance summary'
  ];

  const handleSend = (questionText?: string) => {
    const q = questionText || input.trim();
    if (!q) return;

    const userMsg: Message = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: q,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!questionText) setInput('');

    // Generate smart context-aware answer from dataset
    setTimeout(() => {
      let reply: Message;
      const lower = q.toLowerCase();

      if (lower.includes('excess') || lower.includes('intake')) {
        const excessInstitutions = institutions.filter(i => i.excessEnrolment > 0);
        reply = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: `Based on real-time statutory intake audits, ${excessInstitutions.length} institutions currently have excess enrolments beyond their AICTE sanctioned intake + supernumerary quotas:\n\n` +
            excessInstitutions.map(i => `• ${i.name}: ${i.actualEnrolment} admitted vs ${i.approvedIntake} approved (+${i.excessEnrolment} excess)`).join('\n') +
            `\n\nHBTU Kanpur has the highest excess (+14 students) requiring immediate show-cause review.`,
          timestamp: 'Just now',
          actionTab: 'compliance',
          actionLabel: 'Open Admission Compliance Center'
        };
      } else if (lower.includes('coverage') || lower.includes('below') || lower.includes('apaar')) {
        const lowCoverage = institutions.filter(i => i.apaarCoverageRate < 95);
        reply = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: `Institutions with APAAR coverage below statutory benchmark (95%):\n\n` +
            lowCoverage.map(i => `• ${i.name} (${i.state}): ${i.apaarCoverageRate}% coverage (${i.approvedIntake - i.verifiedRecordsCount} pending records)`).join('\n') +
            `\n\nAssam Engineering College and HBTU Kanpur require local Aadhaar-Mobile verification camps to meet the 99% national mandate.`,
          timestamp: 'Just now',
          actionTab: 'institutions',
          actionLabel: 'View Institutions Directory'
        };
      } else if (lower.includes('duplicate') || lower.includes('rahul')) {
        const activeDuplicates = duplicateCases.filter(d => d.status === 'Potential');
        reply = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: `Rule Engine has flagged ${duplicateCases.length} duplicate identity clusters (${activeDuplicates.length} potential high-risk collisions).\n\nKey finding: Candidate "Rahul K. Sharma" (VJTI Mumbai) shares APAAR 9842-1024-4821 and identical DOB with "Aarav Mehta" (COEP Pune) with a 96.8% biometric similarity score. Simultaneous full-time admission detected.`,
          timestamp: 'Just now',
          actionTab: 'duplicates',
          actionLabel: 'Inspect Duplicate Center'
        };
      } else if (lower.includes('flagged') || lower.includes('why')) {
        reply = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: `Student Rahul K. Sharma (#stu-2) at VJTI was flagged due to Rule CR-2026-APAAR-SIMULTANEOUS:\n\n1. APAAR 9842-1024-4821 was already verified for Aarav Mehta at COEP Tech University.\n2. Identical Date of Birth: 14 Aug 2005.\n3. Contact hash clash detected: e7f89d42c019a823.\n4. Both are registered as full-time undergraduate students for academic year 2024-2028.`,
          timestamp: 'Just now',
          actionTab: 'duplicates',
          actionLabel: 'Review Side-by-Side Comparison'
        };
      } else {
        reply = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: `National Academic Data Intelligence Summary (PS-26263):\n\n• Total Institutions Monitored: 4,862 (97.49% National APAAR Coverage)\n• Registered Students: 18,42,690 across 28 States & UTs\n• Active Anomalies: ${anomalies.filter(a => a.status === 'Active').length} high-priority regulatory investigations\n• Open Validation Issues: ${validationIssues.filter(v => v.status === 'Open').length} records pending resolution\n• AI-Assisted Recommendation: Enforce biometric migration validation before releasing 2026-Q1 scholarship disbursement.`,
          timestamp: 'Just now',
          actionTab: 'dashboard',
          actionLabel: 'Return to Executive Dashboard'
        };
      }

      setMessages(prev => [...prev, reply]);
    }, 450);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-112 md:w-128 bg-white dark:bg-navy-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-fade-in">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-900 to-navy-950 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-cyan-300">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold flex items-center gap-1.5">
              <span>VIDYA AI Assistant</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/30 text-cyan-300 font-normal">
                Prototype v2.6
              </span>
            </h3>
            <p className="text-[11px] text-slate-300">
              Regulatory Intelligence & Data Analytics Copilot
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsVidyaAIOpen(false)}
          className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Security & Disclaimer Notice */}
      <div className="bg-amber-50 dark:bg-amber-950/40 px-4 py-2 text-[11px] text-amber-800 dark:text-amber-300 border-b border-amber-200 dark:border-amber-800/50 flex items-center gap-2">
        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
        <span>Demonstration Intelligence Assistant • Analyzes mock prototype data</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map(msg => (
          <div 
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}

            <div className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-xs' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs border border-slate-200 dark:border-slate-700/60 shadow-xs'
            }`}>
              <div className="whitespace-pre-line text-xs font-sans">
                {msg.text}
              </div>

              {msg.actionTab && (
                <button
                  onClick={() => {
                    setActiveTab(msg.actionTab!);
                    setIsVidyaAIOpen(false);
                  }}
                  className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-500/20 text-blue-700 dark:text-blue-300 hover:bg-blue-500/30 text-[11px] font-semibold transition"
                >
                  <span>{msg.actionLabel}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}

              <div className={`text-[10px] mt-1.5 text-right ${
                msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
              }`}>
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                <UserIcon className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
          <HelpCircle className="w-3 h-3" />
          <span>Quick Evaluator Prompts</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask VIDYA AI about admissions, APAAR, compliance..."
          className="flex-1 bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white rounded-lg px-3 py-2 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-blue-500"
        />
        <button
          onClick={() => handleSend()}
          className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-50"
          disabled={!input.trim()}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
