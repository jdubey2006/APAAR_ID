import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  RefreshCw, 
  Download, 
  Table, 
  Check, 
  ShieldCheck, 
  AlertTriangle,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const DataSubmissionWizard: React.FC = () => {
  const { addToast, addAuditLog, addUploadedStudents, setActiveTab } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedFile, setSelectedFile] = useState<string>('COEP_UG_BTech_2024_Cohort.xlsx');
  const [fileSize, setFileSize] = useState<string>('4.8 MB');
  const [recordCount, setRecordCount] = useState<number>(48291);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationProgress, setValidationProgress] = useState<number>(0);

  // Column Mappings with auto-detection state
  const [columnMappings, setColumnMappings] = useState([
    { source: 'Institution Enrollment No', target: 'enrollment_number', matched: true, type: 'String' },
    { source: 'Student Name', target: 'student_name', matched: true, type: 'String' },
    { source: 'APAAR ID / ABC ID', target: 'apaar_id', matched: true, type: '12-Digit Numeric' },
    { source: 'Date of Birth (DOB)', target: 'dob', matched: true, type: 'YYYY-MM-DD' },
    { source: 'Gender', target: 'gender', matched: true, type: 'Categorical' },
    { source: 'Degree Programme', target: 'programme', matched: true, type: 'String' },
    { source: 'Branch / Course', target: 'course', matched: true, type: 'String' },
    { source: 'Year of Admission', target: 'admission_year', matched: true, type: 'Integer (YYYY)' },
    { source: 'Social Category', target: 'category', matched: true, type: 'Categorical' },
    { source: 'NRI Quota Status', target: 'nri_status', matched: true, type: 'Boolean' },
    { source: 'OCI Status', target: 'oci_status', matched: true, type: 'Boolean' },
    { source: 'Foreign National (FN)', target: 'fn_status', matched: true, type: 'Boolean' },
    { source: 'Approved Intake Quota', target: 'approved_intake', matched: true, type: 'Integer' },
    { source: 'Actual Enrolment Number', target: 'actual_enrolment', matched: true, type: 'Integer' },
    { source: 'Supernumerary Quota', target: 'supernumerary', matched: true, type: 'Integer' },
  ]);

  // Validation Results state
  const validationSummary = {
    total: 48291,
    valid: 47823,
    warnings: 312,
    errors: 156,
    critical: 0
  };

  const handleStartValidation = () => {
    setIsValidating(true);
    setValidationProgress(15);

    const interval = setInterval(() => {
      setValidationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsValidating(false);
          setCurrentStep(4);
          addToast('Validation Complete', '48,291 records processed by Rule Engine.', 'success');
          return 100;
        }
        return prev + 25;
      });
    }, 350);
  };

  const handleFinalSubmit = () => {
    addUploadedStudents(100);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback if canvas is not ready
    }
    setCurrentStep(6);
    addAuditLog('BATCH_DATASET_COMMITTED', 'Submitted batch COEP-2024-SEM4 (48,291 records validated)', 'Low');
  };

  const steps = [
    { num: 1, label: 'Upload File' },
    { num: 2, label: 'Map Columns' },
    { num: 3, label: 'Validate Data' },
    { num: 4, label: 'Resolve Issues' },
    { num: 5, label: 'Submit' },
    { num: 6, label: 'Confirmation' },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                INSTITUTIONAL INGESTION
              </span>
              <span className="text-xs text-slate-400">• Multi-Step Onboarding Wizard</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Student Data Submission
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Secure batch ingestion for AICTE-approved institutions with automated schema mapping and APAAR validation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => addToast('Template Downloaded', 'AICTE canonical CSV template downloaded', 'info')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Schema Template</span>
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>API Ingestion Docs</span>
            </button>
          </div>
        </div>

        {/* Wizard Stepper Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between overflow-x-auto pb-2">
          {steps.map((st, idx) => {
            const isCompleted = currentStep > st.num;
            const isCurrent = currentStep === st.num;

            return (
              <div key={st.num} className="flex items-center shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted ? 'bg-emerald-600 text-white shadow-xs' :
                    isCurrent ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/40 shadow-xs' :
                    'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : st.num}
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className={`text-xs font-bold ${
                      isCurrent ? 'text-blue-600 dark:text-blue-400' :
                      isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-400'
                    }`}>
                      {st.label}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">
                      Step 0{st.num}
                    </div>
                  </div>
                </div>

                {idx < steps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-2 sm:mx-4 transition-all ${
                    isCompleted ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Upload File */}
      {currentStep === 1 && (
        <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Step 1: Select Student Cohort Dataset
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Supported formats: CSV, XLSX, JSON, or automated ERP sync.
            </p>
          </div>

          {/* Drag & Drop Box */}
          <div className="border-2 border-dashed border-blue-300 dark:border-blue-700/60 rounded-2xl p-8 sm:p-12 text-center bg-blue-50/30 dark:bg-blue-950/20 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 transition cursor-pointer">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 shadow-xs">
              <UploadCloud className="w-8 h-8" />
            </div>

            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Drag & Drop Student Dataset here
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Drop your university spreadsheet or click to browse files from your local system.
            </p>

            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-600 dark:text-slate-300">
                .CSV
              </span>
              <span className="px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-600 dark:text-slate-300">
                .XLSX
              </span>
              <span className="px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-600 dark:text-slate-300">
                .JSON
              </span>
            </div>
          </div>

          {/* Selected File Card Demonstration */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{selectedFile}</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Ready
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {fileSize} • 48,291 parsed rows • MD5: 9a78fbc1203498ad
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
            >
              <span>Continue to Mapping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Map Columns */}
      {currentStep === 2 && (
        <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Step 2: Map Institutional Columns</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  15/15 Automatically Matched
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Our smart parser mapped your institutional headers to canonical AICTE data attributes.
              </p>
            </div>

            <button
              onClick={() => addToast('Auto-Detection Refreshed', '15 columns verified against AICTE schema', 'info')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Re-scan Headers</span>
            </button>
          </div>

          {/* Mapping Table */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">File Column (Source)</th>
                  <th className="p-3">Data Type</th>
                  <th className="p-3">Canonical AICTE Field (Target)</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {columnMappings.map((col, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                      {col.source}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      {col.type}
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                        {col.target}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Matched</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-1 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
            >
              <span>Confirm & Start Validation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Validate Data */}
      {currentStep === 3 && (
        <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 text-center">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Step 3: Automated 12-Point Data Integrity Engine
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Executing cryptographic checksum verification, duplicate APAAR matching, and statutory intake enforcement.
            </p>
          </div>

          {/* Validation Process Box */}
          <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 max-w-xl mx-auto space-y-5">
            {isValidating ? (
              <>
                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto animate-spin">
                  <RefreshCw className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Validating {recordCount.toLocaleString('en-IN')} student records...
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Checking Luhn-10 APAAR format, cross-institution duplicate graph, and intake quotas.
                  </p>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${validationProgress}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-slate-500 font-bold">{validationProgress}% Completed</span>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Ready to execute automated validation checks
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Batch: {selectedFile} (48,291 candidate rows ready)
                  </p>
                </div>
                <button
                  onClick={handleStartValidation}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md hover:scale-102"
                >
                  Run Automated Integrity Checks
                </button>
              </>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-1 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Resolve Issues */}
      {currentStep === 4 && (
        <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Step 4: Validation Engine Results & Resolution
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Engine analyzed 48,291 records. 47,823 passed all statutory and format rules.
            </p>
          </div>

          {/* KPI Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                {validationSummary.valid.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold">
                ✓ Fully Valid (99.03%)
              </span>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <div className="text-xl font-black text-amber-600 dark:text-amber-400">
                {validationSummary.warnings}
              </div>
              <span className="text-[11px] text-amber-800 dark:text-amber-300 font-semibold">
                ⚠ Warnings (Non-Blocking)
              </span>
            </div>

            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800">
              <div className="text-xl font-black text-red-600 dark:text-red-400">
                {validationSummary.errors}
              </div>
              <span className="text-[11px] text-red-800 dark:text-red-300 font-semibold">
                🔴 Formatting Errors
              </span>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <div className="text-xl font-black text-blue-600 dark:text-blue-400">
                0
              </div>
              <span className="text-[11px] text-blue-800 dark:text-blue-300 font-semibold">
                🛡 Critical Fraud Blocks
              </span>
            </div>
          </div>

          {/* Actionable Preview of Flagged Issues */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Sample Flagged Records Requiring Attention:
              </span>
              <span className="text-[11px] text-blue-600 dark:text-blue-400">
                Will be held in Nodal Review Queue
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Row #104: Student "Rahul K. Sharma"</span>
                  <div className="text-red-600 dark:text-red-400 text-[11px]">
                    Duplicate APAAR 9842-1024-4821 matched with Aarav Mehta at COEP Tech Univ.
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                  Hold for Review
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Row #812: Student "Debojit Barman"</span>
                  <div className="text-amber-600 dark:text-amber-400 text-[11px]">
                    DOB format YYYY/DD/MM deviates from ISO-8601 standard; auto-corrected to 2006-04-18.
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Auto-Resolved
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-1 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setCurrentStep(5)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
            >
              <span>Proceed to Ingestion Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Final Submission */}
      {currentStep === 5 && (
        <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Step 5: Final Review & Submission
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Confirm commit of 47,823 validated student records into AICTE Central Master Repository.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400">Submitting Institution:</span>
              <span className="font-bold text-slate-900 dark:text-white">College of Engineering Pune (AICTE ID: 1-3324567891)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400">Total Validated Records:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">47,823 Verified Records</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400">Held for Nodal Review:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">468 Records (Disputed / Mismatched)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400">Cryptographic Digest:</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">SHA256: 8a91f3c0b29...</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500 dark:text-slate-400">Statutory Compliance:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Compliant with AICTE Approval Process Handbook</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setCurrentStep(4)}
              className="inline-flex items-center gap-1 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleFinalSubmit}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-md hover:scale-102"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sign & Ingest into Central Registry</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: Confirmation Screen */}
      {currentStep === 6 && (
        <div className="bg-white dark:bg-navy-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-5 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              TRANSACTION COMMITTED
            </span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mt-2">
              Student Records Successfully Ingested!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Batch COEP-2024-SEM4 has been cryptographically signed and synchronized with the AICTE Master APAAR Registry and DigiLocker bridge.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 max-w-sm mx-auto text-xs space-y-1.5 text-left">
            <div className="flex justify-between">
              <span className="text-slate-500">Transaction ID:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">TXN-AICTE-2026-98124</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Committed Records:</span>
              <span className="font-bold text-emerald-600">47,823 Students</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Timestamp:</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">Today, Just now</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              View Updated National Dashboard
            </button>
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold transition"
            >
              Upload Another Batch
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
