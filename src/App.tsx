import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { TopNavbar } from './components/layout/TopNavbar';
import { Sidebar } from './components/layout/Sidebar';
import { CommandPalette } from './components/layout/CommandPalette';
import { ToastContainer } from './components/common/ToastContainer';
import { JudgeDemoGuide } from './components/presentation/JudgeDemoGuide';
import { VidyaAIAssistant } from './components/ai/VidyaAIAssistant';
import { LandingPage } from './components/presentation/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { PublicVerificationView } from './components/verification/PublicVerificationView';

// View modules
import { NationalDashboard } from './components/dashboard/NationalDashboard';
import { StudentDirectory } from './components/students/StudentDirectory';
import { APAARVerificationPortal } from './components/verification/APAARVerificationPortal';
import { DataSubmissionWizard } from './components/upload/DataSubmissionWizard';
import { ValidationCenter } from './components/validation/ValidationCenter';
import { DuplicateIntelligenceCenter } from './components/duplicates/DuplicateIntelligenceCenter';
import { AnomalyDetectionCenter } from './components/anomalies/AnomalyDetectionCenter';
import { AdmissionCompliance } from './components/compliance/AdmissionCompliance';
import { InstitutionDirectory } from './components/institutions/InstitutionDirectory';
import { RegionalMapAnalytics } from './components/dashboard/RegionalMapAnalytics';
import { DataPipelineVisualizer } from './components/dashboard/DataPipelineVisualizer';
import { ReportsComplianceCenter } from './components/reports/ReportsComplianceCenter';
import { ApiIntegrationsCenter } from './components/integrations/ApiIntegrationsCenter';
import { ConsentPrivacyCenter } from './components/security/ConsentPrivacyCenter';
import { SecurityAuditCenter } from './components/security/SecurityAuditCenter';
import { AuditLogsView } from './components/security/AuditLogsView';
import { SettingsView } from './components/settings/SettingsView';

export const MainAppContent: React.FC = () => {
  const { 
    activeTab, 
    publicVerifyId, 
    setPublicVerifyId 
  } = useApp();

  const [isLandingOpen, setIsLandingOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // If public verification route is active
  if (publicVerifyId) {
    return (
      <PublicVerificationView 
        initialId={publicVerifyId}
        onBackToApp={() => setPublicVerifyId(null)}
      />
    );
  }

  // If public landing page is opened
  if (isLandingOpen) {
    return (
      <LandingPage
        onEnterApp={() => setIsLandingOpen(false)}
        onOpenLogin={() => {
          setIsLandingOpen(false);
          setIsLoginOpen(true);
        }}
        onOpenPublicVerify={() => {
          setIsLandingOpen(false);
          setPublicVerifyId('VS-2026-849201');
        }}
      />
    );
  }

  // If dedicated login page is opened
  if (isLoginOpen) {
    return (
      <LoginPage 
        onLoginSuccess={() => setIsLoginOpen(false)}
      />
    );
  }

  // Render Core Authenticated Dashboard Shell
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 font-sans">
      {/* Left Collapsible Navigation Sidebar */}
      <Sidebar />

      {/* Main Application Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Government Navigation Header */}
        <TopNavbar onOpenLanding={() => setIsLandingOpen(true)} />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && <NationalDashboard />}
          {activeTab === 'students' && <StudentDirectory />}
          {activeTab === 'apaar-verify' && <APAARVerificationPortal />}
          {activeTab === 'upload' && <DataSubmissionWizard />}
          {activeTab === 'validation' && <ValidationCenter />}
          {activeTab === 'duplicates' && <DuplicateIntelligenceCenter />}
          {activeTab === 'anomalies' && <AnomalyDetectionCenter />}
          {activeTab === 'compliance' && <AdmissionCompliance />}
          {activeTab === 'institutions' && <InstitutionDirectory />}
          {activeTab === 'analytics' && <RegionalMapAnalytics />}
          {activeTab === 'pipeline' && <DataPipelineVisualizer />}
          {activeTab === 'reports' && <ReportsComplianceCenter />}
          {activeTab === 'integrations' && <ApiIntegrationsCenter />}
          {activeTab === 'consent' && <ConsentPrivacyCenter />}
          {activeTab === 'security' && <SecurityAuditCenter />}
          {activeTab === 'audit' && <AuditLogsView />}
          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Global Command Palette (Ctrl + K) */}
      <CommandPalette />

      {/* Floating VIDYA AI Assistant */}
      <VidyaAIAssistant />

      {/* Special Presenter Judge Demo Guide HUD */}
      <JudgeDemoGuide />

      {/* Toast Notifications Feedback Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return <MainAppContent />;
}
