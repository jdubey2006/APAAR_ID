import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  Institution, 
  Student, 
  ValidationIssue, 
  DuplicateCase, 
  AnomalyRecord, 
  AuditLog, 
  NotificationItem 
} from '../types';
import { 
  INITIAL_INSTITUTIONS, 
  INITIAL_STUDENTS, 
  INITIAL_VALIDATION_ISSUES, 
  INITIAL_DUPLICATES, 
  INITIAL_ANOMALIES, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

export const DEMO_USERS: Record<UserRole, User> = {
  aicte_admin: {
    id: 'user-admin',
    name: 'Dr. Ramesh Sharma',
    email: 'ramesh.sharma@aicte-india.org',
    role: 'aicte_admin',
    designation: 'National Director (Digital Governance & APAAR Cell)',
    institutionName: 'AICTE Headquarters, New Delhi',
    lastLogin: 'Today, 09:30 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  verification_officer: {
    id: 'user-vo',
    name: 'Dr. Anjali Verma',
    email: 'anjali.verma@aicte-ro.org',
    role: 'verification_officer',
    designation: 'Senior Verification Officer',
    institutionName: 'AICTE Western Regional Office, Mumbai',
    lastLogin: 'Today, 10:15 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  institution_admin: {
    id: 'user-inst',
    name: 'Prof. Suresh Patil',
    email: 'suresh.patil@coep.ac.in',
    role: 'institution_admin',
    designation: 'Registrar & Institutional Nodal Officer',
    institutionId: 'inst-1',
    institutionName: 'College of Engineering Pune (COEP Tech Univ)',
    lastLogin: 'Today, 11:00 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  student: {
    id: 'user-stu',
    name: 'Aarav Mehta',
    email: 'aarav.mehta24@coep.ac.in',
    role: 'student',
    designation: 'Undergraduate Scholar (B.Tech CSE)',
    institutionId: 'inst-1',
    institutionName: 'College of Engineering Pune (COEP Tech Univ)',
    lastLogin: 'Yesterday, 08:45 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
  },
  external_verifier: {
    id: 'user-verif',
    name: 'Rajesh K. Nair',
    email: 'rajesh.nair@tcs.com',
    role: 'external_verifier',
    designation: 'Lead Background Verification Officer',
    institutionName: 'Tata Consultancy Services Enterprise Gateway',
    lastLogin: 'Today, 02:10 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
};

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

interface AppContextType {
  currentUser: User;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  
  // Data entities
  institutions: Institution[];
  students: Student[];
  validationIssues: ValidationIssue[];
  duplicateCases: DuplicateCase[];
  anomalies: AnomalyRecord[];
  auditLogs: AuditLog[];
  notifications: NotificationItem[];
  
  // Modals & inspectables
  selectedStudent: Student | null;
  setSelectedStudent: (s: Student | null) => void;
  selectedInstitution: Institution | null;
  setSelectedInstitution: (i: Institution | null) => void;
  selectedDuplicate: DuplicateCase | null;
  setSelectedDuplicate: (d: DuplicateCase | null) => void;
  isRevealApaarOpen: boolean;
  setIsRevealApaarOpen: (v: boolean) => void;
  studentToRevealApaar: Student | null;
  setStudentToRevealApaar: (s: Student | null) => void;
  revealedApaarIds: Record<string, boolean>;
  revealStudentApaar: (studentId: string) => void;
  
  // Global search & command palette
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  
  // AI Assistant drawer
  isVidyaAIOpen: boolean;
  setIsVidyaAIOpen: (v: boolean) => void;
  
  // Judge Demo Guide
  isJudgeDemoActive: boolean;
  setIsJudgeDemoActive: (v: boolean) => void;
  judgeDemoStep: number;
  setJudgeDemoStep: (s: number) => void;
  nextJudgeDemoStep: () => void;
  prevJudgeDemoStep: () => void;
  stopJudgeDemo: () => void;
  
  // Actions & Mutations
  addAuditLog: (action: string, resource: string, riskLevel?: 'Low' | 'Medium' | 'High', result?: 'Success' | 'Denied' | 'Warning') => void;
  addToast: (title: string, message: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
  toasts: Toast[];
  removeToast: (id: string) => void;
  resolveValidationIssue: (id: string) => void;
  handleDuplicateResolution: (id: string, action: 'confirm' | 'dismiss' | 'review') => void;
  addUploadedStudents: (count: number) => void;
  
  // Simulations
  simulate100Uploads: () => void;
  simulateDuplicateDetection: () => void;
  simulateExcessEnrolment: () => void;
  simulateValidationFailure: () => void;
  resetDemoData: () => void;

  // Standalone public verify mode
  publicVerifyId: string | null;
  setPublicVerifyId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('aicte_admin');
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS.aicte_admin);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Entities
  const [institutions, setInstitutions] = useState<Institution[]>(INITIAL_INSTITUTIONS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>(INITIAL_VALIDATION_ISSUES);
  const [duplicateCases, setDuplicateCases] = useState<DuplicateCase[]>(INITIAL_DUPLICATES);
  const [anomalies, setAnomalies] = useState<AnomalyRecord[]>(INITIAL_ANOMALIES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals & inspectables
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [selectedDuplicate, setSelectedDuplicate] = useState<DuplicateCase | null>(null);
  const [isRevealApaarOpen, setIsRevealApaarOpen] = useState<boolean>(false);
  const [studentToRevealApaar, setStudentToRevealApaar] = useState<Student | null>(null);
  const [revealedApaarIds, setRevealedApaarIds] = useState<Record<string, boolean>>({});

  // Command palette & Search
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // AI Assistant
  const [isVidyaAIOpen, setIsVidyaAIOpen] = useState<boolean>(false);

  // Judge Demo Guide
  const [isJudgeDemoActive, setIsJudgeDemoActive] = useState<boolean>(false);
  const [judgeDemoStep, setJudgeDemoStep] = useState<number>(1);

  // Public verification route simulation
  const [publicVerifyId, setPublicVerifyId] = useState<string | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Dark mode class sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Keyboard shortcut Ctrl+K / Cmd+K for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const addToast = (title: string, message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addAuditLog = (
    action: string, 
    resource: string, 
    riskLevel: 'Low' | 'Medium' | 'High' = 'Low', 
    result: 'Success' | 'Denied' | 'Warning' = 'Success'
  ) => {
    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const newLog: AuditLog = {
      id: 'aud-' + Math.random().toString(36).substring(2, 9),
      timestamp: formatted,
      user: `${currentUser.name} (${currentUser.role.replace('_', ' ').toUpperCase()})`,
      role: currentUser.designation,
      action,
      resource,
      ipAddress: '14.139.60.22 (Current Session)',
      result,
      riskLevel
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(DEMO_USERS[role]);
    addToast('Role Switched', `Logged in as ${DEMO_USERS[role].name} (${role.replace('_', ' ').toUpperCase()})`, 'info');
    addAuditLog('ROLE_SWITCH', `Switched context to ${role}`, 'Low');
    
    // Auto-adjust default view based on role
    if (role === 'student') {
      setActiveTab('students');
      setSelectedStudent(students[0]); // Aarav Mehta
    } else if (role === 'external_verifier') {
      setActiveTab('apaar-verify');
    } else if (role === 'institution_admin') {
      setActiveTab('upload');
    } else {
      setActiveTab('dashboard');
    }
  };

  const revealStudentApaar = (studentId: string) => {
    setRevealedApaarIds(prev => ({ ...prev, [studentId]: true }));
    addToast('Security Audit', `Sensitive APAAR decrypted for inspection by ${currentUser.name}`, 'warning');
    addAuditLog('REVEAL_SENSITIVE_APAAR', `Decrypted APAAR token for Student #${studentId}`, 'Medium');
  };

  const resolveValidationIssue = (id: string) => {
    setValidationIssues(prev => prev.map(issue => issue.id === id ? { ...issue, status: 'Resolved' } : issue));
    addToast('Issue Resolved', 'Validation record status marked as Resolved and synchronized.', 'success');
    addAuditLog('RESOLVE_VALIDATION_ISSUE', `Issue #${id} cleared by verification officer`, 'Low');
  };

  const handleDuplicateResolution = (id: string, action: 'confirm' | 'dismiss' | 'review') => {
    const statusMap = {
      confirm: 'Confirmed' as const,
      dismiss: 'Resolved' as const,
      review: 'Under Review' as const
    };
    setDuplicateCases(prev => prev.map(c => c.id === id ? { ...c, status: statusMap[action] } : c));
    addToast('Duplicate Case Updated', `Case #${id} transitioned to: ${statusMap[action]}`, action === 'confirm' ? 'warning' : 'success');
    addAuditLog('DUPLICATE_CASE_RESOLUTION', `Case #${id} marked as ${statusMap[action]}`, action === 'confirm' ? 'High' : 'Low');
  };

  const addUploadedStudents = (count: number) => {
    setInstitutions(prev => prev.map(inst => {
      if (inst.id === 'inst-1') {
        return {
          ...inst,
          actualEnrolment: inst.actualEnrolment + count,
          apaarCoverageRate: 98.7,
          lastSync: 'Just now'
        };
      }
      return inst;
    }));
    addToast('Batch Submission Synced', `${count} student records verified and added to AICTE central repository`, 'success');
    addAuditLog('BATCH_RECORD_INGESTION', `Dataset of ${count} students committed to Central APAAR Registry`, 'Low');
  };

  // Simulations for demonstration
  const simulate100Uploads = () => {
    addUploadedStudents(100);
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      title: 'Bulk Upload Received',
      message: 'COEP Pune submitted 100 fresh B.Tech First-Year records with 98% APAAR linkage.',
      time: 'Just now',
      type: 'success',
      read: false,
      linkTab: 'upload'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const simulateDuplicateDetection = () => {
    const newDup: DuplicateCase = {
      id: 'dup-sim-' + Date.now(),
      apaarId: '9842-9988-1122',
      similarityScore: 98.2,
      status: 'Potential',
      reasons: [
        'Matching Biometric Contact Token',
        'Duplicate Enrollment in Computer Engineering at 2 Tier-1 Institutes',
        'Same Father Name and Residential Aadhaar Address'
      ],
      studentA: {
        studentId: 'stu-sim-1',
        name: 'Sameer Joshi',
        dob: '2005-05-10',
        institution: 'IIT Delhi Cluster',
        programme: 'B.Tech Computer Science',
        enrolmentNo: '2024-IITD-CS-041',
        admissionYear: 2024
      },
      studentB: {
        studentId: 'stu-sim-2',
        name: 'Sameer M. Joshi',
        dob: '2005-05-10',
        institution: 'COEP Tech Univ',
        programme: 'B.Tech Computer Engineering',
        enrolmentNo: '2024-COEP-CS-0288',
        admissionYear: 2024
      },
      flaggedDate: 'Just now'
    };
    setDuplicateCases(prev => [newDup, ...prev]);
    const newNotif: NotificationItem = {
      id: 'notif-dup-' + Date.now(),
      title: 'CRITICAL: Concurrent Duplicate Flagged',
      message: 'APAAR 9842-9988-1122 matched across IIT Delhi and COEP Tech Univ (98.2% similarity score).',
      time: 'Just now',
      type: 'critical',
      read: false,
      linkTab: 'duplicates'
    };
    setNotifications(prev => [newNotif, ...prev]);
    addToast('Duplicate Detection Triggered', 'New 98.2% similarity case detected by Rule Engine', 'error');
    addAuditLog('AI_DUPLICATE_ALERT', 'Simultaneous enrollment detected for APAAR 9842-9988-1122', 'High');
  };

  const simulateExcessEnrolment = () => {
    setInstitutions(prev => prev.map(inst => {
      if (inst.id === 'inst-5') {
        return {
          ...inst,
          actualEnrolment: 2490,
          excessEnrolment: 30,
          complianceStatus: 'Non-Compliant'
        };
      }
      return inst;
    }));
    const newNotif: NotificationItem = {
      id: 'notif-exc-' + Date.now(),
      title: 'Statutory Excess Admission Violation',
      message: 'Delhi Technological University (DTU) reported 30 excess admissions beyond statutory quota.',
      time: 'Just now',
      type: 'critical',
      read: false,
      linkTab: 'compliance'
    };
    setNotifications(prev => [newNotif, ...prev]);
    addToast('Excess Enrolment Alert', 'DTU flagged for +30 excess admissions over statutory cap', 'warning');
    addAuditLog('EXCESS_ENROLMENT_FLAG', 'Statutory intake breach logged for Delhi Technological University', 'High');
  };

  const simulateValidationFailure = () => {
    const newIssue: ValidationIssue = {
      id: 'val-sim-' + Date.now(),
      severity: 'Critical',
      studentId: 'stu-sim-err',
      studentName: 'Kunal Singhania',
      apaarId: '1234-5678-0000',
      institutionId: 'inst-1',
      institutionName: 'College of Engineering Pune (COEP Tech Univ)',
      issueType: 'Invalid APAAR Checksum',
      description: 'Luhn mod-10 cryptographic checksum check failed on APAAR identifier. Possible forgery or transcription error.',
      detectedAt: 'Just now',
      status: 'Open'
    };
    setValidationIssues(prev => [newIssue, ...prev]);
    addToast('Validation Engine Alert', 'Critical checksum failure detected in candidate batch submission', 'error');
    addAuditLog('CHECKSUM_VALIDATION_FAILURE', 'Invalid Luhn checksum on APAAR 1234-5678-0000', 'High');
  };

  const resetDemoData = () => {
    setInstitutions(INITIAL_INSTITUTIONS);
    setStudents(INITIAL_STUDENTS);
    setValidationIssues(INITIAL_VALIDATION_ISSUES);
    setDuplicateCases(INITIAL_DUPLICATES);
    setAnomalies(INITIAL_ANOMALIES);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setRevealedApaarIds({});
    addToast('Demo Environment Reset', 'All institution, student, and compliance metrics restored to default demo state.', 'info');
    addAuditLog('DEMO_RESET', 'Master mock database state restored to SIH-26263 baseline', 'Low');
  };

  // Judge Demo Guide navigation
  const nextJudgeDemoStep = () => {
    if (judgeDemoStep < 12) {
      const nextStep = judgeDemoStep + 1;
      setJudgeDemoStep(nextStep);
      handleStepNavigation(nextStep);
    } else {
      setIsJudgeDemoActive(false);
      addToast('Demo Completed', 'You have walked through the complete national student data verification workflow!', 'success');
    }
  };

  const prevJudgeDemoStep = () => {
    if (judgeDemoStep > 1) {
      const prevStep = judgeDemoStep - 1;
      setJudgeDemoStep(prevStep);
      handleStepNavigation(prevStep);
    }
  };

  const stopJudgeDemo = () => {
    setIsJudgeDemoActive(false);
    setJudgeDemoStep(1);
  };

  const handleStepNavigation = (step: number) => {
    switch (step) {
      case 1:
        setActiveTab('dashboard');
        break;
      case 2:
      case 3:
      case 4:
        setActiveTab('upload');
        break;
      case 5:
        setActiveTab('duplicates');
        break;
      case 6:
        setActiveTab('duplicates');
        break;
      case 7:
        setActiveTab('anomalies');
        break;
      case 8:
        setActiveTab('dashboard');
        break;
      case 9:
        setActiveTab('compliance');
        break;
      case 10:
        setActiveTab('students');
        setSelectedStudent(students[0]);
        break;
      case 11:
        setActiveTab('apaar-verify');
        break;
      case 12:
        setActiveTab('audit');
        break;
      default:
        setActiveTab('dashboard');
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        switchRole,
        activeTab,
        setActiveTab,
        darkMode,
        toggleDarkMode,
        sidebarCollapsed,
        setSidebarCollapsed,
        institutions,
        students,
        validationIssues,
        duplicateCases,
        anomalies,
        auditLogs,
        notifications,
        selectedStudent,
        setSelectedStudent,
        selectedInstitution,
        setSelectedInstitution,
        selectedDuplicate,
        setSelectedDuplicate,
        isRevealApaarOpen,
        setIsRevealApaarOpen,
        studentToRevealApaar,
        setStudentToRevealApaar,
        revealedApaarIds,
        revealStudentApaar,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        searchQuery,
        setSearchQuery,
        isVidyaAIOpen,
        setIsVidyaAIOpen,
        isJudgeDemoActive,
        setIsJudgeDemoActive,
        judgeDemoStep,
        setJudgeDemoStep,
        nextJudgeDemoStep,
        prevJudgeDemoStep,
        stopJudgeDemo,
        addAuditLog,
        addToast,
        toasts,
        removeToast,
        resolveValidationIssue,
        handleDuplicateResolution,
        addUploadedStudents,
        simulate100Uploads,
        simulateDuplicateDetection,
        simulateExcessEnrolment,
        simulateValidationFailure,
        resetDemoData,
        publicVerifyId,
        setPublicVerifyId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
