import React, { useState } from 'react';
import { 
  Key, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Copy, 
  RotateCcw, 
  Trash2, 
  Plus, 
  ExternalLink, 
  FileCode, 
  Database, 
  Share2,
  RefreshCw
} from 'lucide-react';
import { INITIAL_API_KEYS } from '../../data/mockData';
import { ApiKeyItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { ApiDocumentation } from './ApiDocumentation';

export const ApiIntegrationsCenter: React.FC = () => {
  const { addToast, addAuditLog } = useApp();
  const [activeTab, setActiveTab] = useState<'integrations' | 'keys' | 'docs'>('integrations');
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>(INITIAL_API_KEYS);

  const integrationServices = [
    {
      name: 'AICTE Central Master Portal',
      desc: 'Real-time synchronization with AICTE Approval Process database and institutional directories.',
      status: 'Connected',
      statusColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
      latency: '24ms',
      lastSync: '2 mins ago'
    },
    {
      name: 'DigiLocker / National Academic Depository',
      desc: 'Aadhaar e-KYC validation, student biometric linkage, and verifiable marksheets.',
      status: 'Connected',
      statusColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
      latency: '82ms',
      lastSync: '12 mins ago'
    },
    {
      name: 'Academic Bank of Credits (ABC)',
      desc: 'Automated credit transfer ledger and One Nation One Student ID credit tokenization.',
      status: 'Connected',
      statusColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
      latency: '45ms',
      lastSync: '5 mins ago'
    },
    {
      name: 'Institution ERP Gateway (COEP / VJTI)',
      desc: 'Live biometric attendance and semester enrollment ingestion webhooks.',
      status: 'Syncing',
      statusColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
      latency: '110ms',
      lastSync: 'Active Now'
    },
    {
      name: 'TCS iON External Verification Gateway',
      desc: 'Authorized third-party background verification for corporate talent onboarding.',
      status: 'Connected',
      statusColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
      latency: '60ms',
      lastSync: '1 hour ago'
    },
    {
      name: 'State CET / Joint Admission Portals',
      desc: 'State quota counselling candidate roll numbers and initial allotment lists.',
      status: 'Attention Required',
      statusColor: 'text-red-500 bg-red-500/10 border-red-500/30',
      latency: '340ms',
      lastSync: '3 days ago'
    }
  ];

  const handleCopyKey = (prefix: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(prefix.replace('...', 'abc91024842xyz'));
      addToast('API Key Copied', 'Authorized bearer token copied to clipboard', 'info');
    }
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'Revoked' } : k));
    addToast('Key Revoked', `API key #${id} access revoked immediately.`, 'warning');
    addAuditLog('API_KEY_REVOCATION', `Revoked credentials for key #${id}`, 'High');
  };

  const handleCreateKey = () => {
    const newKey: ApiKeyItem = {
      id: 'key-' + Date.now(),
      name: 'New Institutional Integration Key',
      keyPrefix: 'vs_live_' + Math.random().toString(36).substring(2, 8) + '...',
      createdDate: 'Today',
      lastUsed: 'Never',
      status: 'Active',
      rateLimit: '10,000 req/hr'
    };
    setApiKeys(prev => [newKey, ...prev]);
    addToast('API Key Generated', 'Production API token provisioned with 10k req/hr quota', 'success');
    addAuditLog('API_KEY_GENERATION', 'Generated new live institutional API credentials', 'Medium');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                INTEROPERABILITY INFRASTRUCTURE
              </span>
              <span className="text-xs text-slate-400">• National API Gateway</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              API & System Integrations
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Secure endpoints bridging university ERP systems, DigiLocker, Academic Bank of Credits, and employer verification gateways.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCreateKey}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Generate API Key</span>
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          {[
            { id: 'integrations', label: 'Ecosystem Connectors' },
            { id: 'keys', label: 'API Keys & Secrets' },
            { id: 'docs', label: 'Interactive Documentation' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                activeTab === t.id
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Connectors Grid */}
      {activeTab === 'integrations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrationServices.map((svc, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between text-left space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {svc.name}
                  </h4>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${svc.statusColor}`}>
                    {svc.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {svc.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Latency: {svc.latency}</span>
                <span>Sync: {svc.lastSync}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: API Keys Management */}
      {activeTab === 'keys' && (
        <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Provisioned Institutional Access Tokens ({apiKeys.length} Keys)
            </h3>
            <span className="text-xs text-slate-400">Scoped with IP Whitelisting & TLS 1.3</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">Key Name</th>
                  <th className="p-3.5">Token Prefix</th>
                  <th className="p-3.5">Rate Limit</th>
                  <th className="p-3.5">Last Used</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {apiKeys.map(k => (
                  <tr key={k.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                      {k.name}
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-blue-600 dark:text-blue-400">
                      {k.keyPrefix}
                    </td>
                    <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400">
                      {k.rateLimit}
                    </td>
                    <td className="p-3.5 text-slate-400">
                      {k.lastUsed}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        k.status === 'Active' 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                          : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      }`}>
                        {k.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleCopyKey(k.keyPrefix)}
                        className="p-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition"
                        title="Copy Key"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      {k.status === 'Active' && (
                        <button
                          onClick={() => handleRevokeKey(k.id)}
                          className="p-1 rounded bg-red-50 dark:bg-red-950/60 hover:bg-red-100 text-red-600 dark:text-red-400 transition"
                          title="Revoke Key"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Interactive OpenAPI Docs */}
      {activeTab === 'docs' && (
        <ApiDocumentation />
      )}
    </div>
  );
};
