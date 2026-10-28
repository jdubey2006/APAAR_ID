export type UserRole = 
  | 'aicte_admin'
  | 'verification_officer'
  | 'institution_admin'
  | 'student'
  | 'external_verifier';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institutionId?: string;
  institutionName?: string;
  avatarUrl?: string;
  designation: string;
  lastLogin: string;
}

export interface Institution {
  id: string;
  aicteId: string;
  name: string;
  code: string;
  state: string;
  city: string;
  type: 'Central Govt' | 'State Govt' | 'Govt-Aided' | 'Private' | 'Deemed';
  approvedIntake: number;
  actualEnrolment: number;
  supernumerary: number;
  excessEnrolment: number;
  apaarCoverageRate: number; // percentage, e.g. 97.4
  verifiedRecordsCount: number;
  complianceStatus: 'Compliant' | 'Needs Attention' | 'Non-Compliant';
  dataQualityScore: number; // e.g. 94.8
  lastSync: string;
  programmesCount: number;
  contactEmail: string;
}

export interface Student {
  id: string;
  enrollmentNumber: string;
  apaarId: string; // 12-digit APAAR format e.g. "9842-1024-4821"
  name: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  institutionId: string;
  institutionName: string;
  programme: string;
  course: string;
  admissionYear: number;
  currentSemester: number;
  category: 'General' | 'OBC-NCL' | 'SC' | 'ST' | 'EWS';
  quotaType: 'State Quota' | 'All India' | 'Management' | 'Supernumerary-NRI' | 'Supernumerary-JK';
  verificationStatus: 'Verified' | 'Pending' | 'Flagged' | 'Rejected';
  verificationId: string; // e.g. "VS-2026-849201"
  verifiedOn?: string;
  academicScoreCgpa: number;
  digiLockerLinked: boolean;
  abcAccountId?: string;
  contactHash: string;
}

export interface ValidationIssue {
  id: string;
  severity: 'Critical' | 'Error' | 'Warning';
  studentId: string;
  studentName: string;
  apaarId: string;
  institutionId: string;
  institutionName: string;
  issueType: 
    | 'Duplicate APAAR ID' 
    | 'Cross-Institution Match' 
    | 'Excess Intake Admission' 
    | 'Invalid APAAR Checksum' 
    | 'Category Quota Mismatch' 
    | 'Supernumerary Overlimit' 
    | 'Missing Date of Birth' 
    | 'Unapproved Programme';
  description: string;
  detectedAt: string;
  status: 'Open' | 'Under Review' | 'Resolved' | 'Dismissed';
}

export interface DuplicateCase {
  id: string;
  apaarId: string;
  similarityScore: number; // e.g. 96.8
  status: 'Potential' | 'Confirmed' | 'Under Review' | 'Resolved';
  reasons: string[];
  studentA: {
    studentId: string;
    name: string;
    dob: string;
    institution: string;
    programme: string;
    enrolmentNo: string;
    admissionYear: number;
  };
  studentB: {
    studentId: string;
    name: string;
    dob: string;
    institution: string;
    programme: string;
    enrolmentNo: string;
    admissionYear: number;
  };
  flaggedDate: string;
  resolutionNotes?: string;
}

export interface AnomalyRecord {
  id: string;
  title: string;
  institution: string;
  state: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  riskScore: number; // 0-100
  type: 'Sudden Intake Spike' | 'Excess Admission Pattern' | 'Cross-State Duplication' | 'Demographic Skew' | 'Repeated Identity Hash';
  explanation: string;
  metrics: string;
  detectedDate: string;
  status: 'Active' | 'Investigating' | 'Mitigated';
}

export interface StateAnalytics {
  state: string;
  institutions: number;
  students: number;
  apaarLinkageRate: number;
  verificationRate: number;
  anomaliesCount: number;
  excessEnrolments: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  resource: string;
  ipAddress: string;
  result: 'Success' | 'Denied' | 'Warning';
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  read: boolean;
  linkTab?: string;
}

export interface ApiKeyItem {
  id: string;
  name: string;
  keyPrefix: string;
  createdDate: string;
  lastUsed: string;
  status: 'Active' | 'Revoked';
  rateLimit: string;
}

export interface StudentConsent {
  id: string;
  studentName: string;
  apaarId: string;
  institution: string;
  purpose: string;
  status: 'Granted' | 'Pending' | 'Revoked' | 'Expired';
  grantedDate: string;
  expiryDate: string;
  authorizedParty: string;
}
