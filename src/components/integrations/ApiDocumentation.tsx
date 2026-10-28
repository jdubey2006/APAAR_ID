import React, { useState } from 'react';
import { Code, Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ApiDocumentation: React.FC = () => {
  const { addToast } = useApp();
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyCode = (snippet: string, name: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(snippet);
      setCopiedEndpoint(name);
      addToast('Copied to Clipboard', `${name} snippet copied.`, 'info');
      setTimeout(() => setCopiedEndpoint(null), 2000);
    }
  };

  const endpoints = [
    {
      method: 'POST',
      path: '/api/v1/verify',
      tag: 'Verification',
      desc: 'Verify a student academic credential using their 12-digit APAAR ID or Verification Token.',
      curl: `curl -X POST "https://api.vidyasetu.gov.in/api/v1/verify" \\
  -H "Authorization: Bearer vs_live_98a72b..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "verification_id": "VS-2026-849201",
    "apaar_id": "9842-1024-4821"
  }'`,
      response: `{
  "status": "VERIFIED",
  "verification_id": "VS-2026-849201",
  "student": {
    "name": "Aarav Mehta",
    "institution_aicte_id": "1-3324567891",
    "institution_name": "College of Engineering Pune",
    "programme": "Undergraduate Degree",
    "course": "B.Tech Computer Engineering",
    "admission_year": 2024,
    "apaar_masked": "XXXX XXXX 4821"
  },
  "cryptographic_seal": "0x8f2a9918b4..."
}`
    },
    {
      method: 'POST',
      path: '/api/v1/bulk-upload',
      tag: 'Ingestion',
      desc: 'Submit a batch of student enrollment records from institutional ERP for automated validation.',
      curl: `curl -X POST "https://api.vidyasetu.gov.in/api/v1/bulk-upload" \\
  -H "Authorization: Bearer vs_live_98a72b..." \\
  -F "file=@students_cohort_2024.csv" \\
  -F "institution_aicte_id=1-3324567891" \\
  -F "batch_code=2024-SEM4"`,
      response: `{
  "transaction_id": "TXN-AICTE-2026-98124",
  "records_received": 1245,
  "records_validated": 1210,
  "warnings": 35,
  "critical_duplicate_collisions": 0,
  "status": "COMMITTED"
}`
    },
    {
      method: 'GET',
      path: '/api/v1/institutions/{id}/compliance',
      tag: 'Compliance',
      desc: 'Retrieve real-time statutory intake utilization, supernumerary counts, and APAAR coverage.',
      curl: `curl -X GET "https://api.vidyasetu.gov.in/api/v1/institutions/1-3324567891/compliance" \\
  -H "Authorization: Bearer vs_live_98a72b..."`,
      response: `{
  "aicte_id": "1-3324567891",
  "institution_name": "College of Engineering Pune",
  "approved_intake": 1200,
  "actual_enrolment": 1245,
  "supernumerary_quota": 35,
  "excess_enrolment": 10,
  "apaar_coverage_percent": 98.4,
  "compliance_status": "Needs Attention"
}`
    }
  ];

  return (
    <div className="space-y-6 text-xs">
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Interactive OpenAPI / Swagger Documentation
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
          REST endpoints allowing seamless ERP integration for autonomous student record synchronization.
        </p>
      </div>

      <div className="space-y-4">
        {endpoints.map((ep, idx) => (
          <div 
            key={idx}
            className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-navy-900 overflow-hidden shadow-xs"
          >
            {/* Endpoint Header Bar */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] ${
                  ep.method === 'POST' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-emerald-600 text-white'
                }`}>
                  {ep.method}
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white text-xs">
                  {ep.path}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-semibold">
                  {ep.tag}
                </span>
              </div>

              <button
                onClick={() => copyCode(ep.curl, ep.path)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {copiedEndpoint === ep.path ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEndpoint === ep.path ? 'Copied' : 'Copy cURL'}</span>
              </button>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-slate-600 dark:text-slate-300">{ep.desc}</p>

              {/* cURL Request */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Request Sample (cURL):</span>
                <pre className="p-3 rounded-xl bg-slate-950 text-cyan-300 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                  {ep.curl}
                </pre>
              </div>

              {/* Response Preview */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Response JSON (200 OK):</span>
                <pre className="p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                  {ep.response}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
