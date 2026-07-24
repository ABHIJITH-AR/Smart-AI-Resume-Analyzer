import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Briefcase,
  Sparkles,
  CheckCircle,
  AlertCircle,
  X,
  FileCheck,
  ChevronDown,
  Edit3,
  Trash2,
  Send,
} from 'lucide-react';
import { SAMPLE_RESUMES, SampleResume } from '../data/sampleResumes';
import { extractTextFromFile } from '../utils/pdfExtractor';

interface UploadZoneProps {
  onAnalyze: (data: {
    resumeText: string;
    fileName: string;
    targetRole?: string;
    targetSeniority?: string;
    jobDescription?: string;
  }) => void;
  isLoading: boolean;
  prefillSample?: SampleResume | null;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onAnalyze,
  isLoading,
  prefillSample,
}) => {
  const [activeInputTab, setActiveInputTab] = useState<'upload' | 'paste'>('upload');
  const [fileName, setFileName] = useState<string>(prefillSample ? prefillSample.fileName : '');
  const [resumeText, setResumeText] = useState<string>(prefillSample ? prefillSample.text : '');
  const [targetRole, setTargetRole] = useState<string>(prefillSample ? prefillSample.role : '');
  const [targetSeniority, setTargetSeniority] = useState<string>(prefillSample ? prefillSample.seniority : 'Mid-Level');
  const [jobDescription, setJobDescription] = useState<string>(prefillSample?.sampleJobDescription || '');
  const [showJdInput, setShowJdInput] = useState<boolean>(!!prefillSample?.sampleJobDescription);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isExtractingText, setIsExtractingText] = useState<boolean>(false);
  const [parsingError, setParsingError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync when prefillSample prop changes
  React.useEffect(() => {
    if (prefillSample) {
      setFileName(prefillSample.fileName);
      setResumeText(prefillSample.text);
      setTargetRole(prefillSample.role);
      setTargetSeniority(prefillSample.seniority);
      if (prefillSample.sampleJobDescription) {
        setJobDescription(prefillSample.sampleJobDescription);
        setShowJdInput(true);
      }
    }
  }, [prefillSample]);

  const handleFileChange = async (file: File) => {
    setParsingError(null);
    if (!file) return;

    setIsExtractingText(true);
    setFileName(file.name);

    try {
      const extractedText = await extractTextFromFile(file);
      if (extractedText && extractedText.length >= 20) {
        setResumeText(extractedText);
      } else {
        setParsingError('Extracted text was too short. Please try another file or paste text directly.');
      }
    } catch (err: any) {
      console.error('File reading error:', err);
      setParsingError('Failed to extract text from file. Please copy and paste text manually.');
    } finally {
      setIsExtractingText(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSample = (sample: SampleResume) => {
    setFileName(sample.fileName);
    setResumeText(sample.text);
    setTargetRole(sample.role);
    setTargetSeniority(sample.seniority);
    if (sample.sampleJobDescription) {
      setJobDescription(sample.sampleJobDescription);
      setShowJdInput(true);
    }
    setParsingError(null);
  };

  const handleClearResume = () => {
    setResumeText('');
    setFileName('');
    setParsingError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim() || resumeText.trim().length < 20) {
      setParsingError('Please upload a resume file or paste text with at least 20 characters.');
      return;
    }
    onAnalyze({
      resumeText,
      fileName: fileName || 'Uploaded_Resume.pdf',
      targetRole: targetRole || 'Software Professional',
      targetSeniority,
      jobDescription: showJdInput ? jobDescription : undefined,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-300">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-200 animate-pulse" />
              Upload & Analyze Your Resume
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1">
              Supports PDF, DOCX, and TXT formats up to 10MB
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-blue-100 hidden md:inline">Presets:</span>
            {SAMPLE_RESUMES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSelectSample(s)}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
                title={`Load ${s.title}`}
              >
                {s.role.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Target Role & Seniority Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Target Job Title / Role
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Frontend Developer, Product Manager"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Seniority Level
              </label>
              <select
                value={targetSeniority}
                onChange={(e) => setTargetSeniority(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="Entry-Level">Entry-Level / Junior (0-2 yrs)</option>
                <option value="Mid-Level">Mid-Level (3-5 yrs)</option>
                <option value="Senior">Senior (6-10 yrs)</option>
                <option value="Lead / Executive">Lead / Manager / Executive (10+ yrs)</option>
              </select>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <button
              type="button"
              onClick={() => setActiveInputTab('upload')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeInputTab === 'upload'
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Upload className="w-4 h-4" />
              File Upload (PDF/DOCX)
            </button>
            <button
              type="button"
              onClick={() => setActiveInputTab('paste')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeInputTab === 'paste'
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              Paste Text / View Parsed
            </button>
          </div>

          {/* Drag & Drop Upload Zone */}
          {activeInputTab === 'upload' ? (
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf,.docx,.doc,.txt"
                onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                className="hidden"
              />

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-200 ${
                  isDragOver
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 scale-[1.01]'
                    : resumeText
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20'
                    : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 bg-slate-50/50 dark:bg-slate-800/50'
                }`}
              >
                {isExtractingText ? (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Reading & Extracting Resume Text...
                    </p>
                  </div>
                ) : resumeText ? (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-800 dark:text-slate-100">
                        {fileName || 'Resume Loaded'}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {resumeText.length} characters loaded • Click or drag to replace
                      </p>
                    </div>

                    {/* Resume Action Buttons */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 pt-2"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveInputTab('paste')}
                        className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 flex items-center gap-1 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit Resume
                      </button>
                      <button
                        type="button"
                        onClick={handleClearResume}
                        className="px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 text-xs font-semibold hover:bg-red-200 dark:hover:bg-red-900 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete Resume
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner">
                      <Upload className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-800 dark:text-slate-100">
                        Drag and drop your resume file here
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        PDF, DOCX, or TXT (Max size 10MB) or <span className="text-blue-600 dark:text-blue-400 underline font-semibold">browse computer</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Resume Content Text
                </label>
                {resumeText && (
                  <button
                    type="button"
                    onClick={handleClearResume}
                    className="text-xs text-red-500 hover:text-red-400 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete / Clear Resume Text
                  </button>
                )}
              </div>
              <textarea
                rows={10}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste full resume text here..."
                className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          )}

          {/* Error Message */}
          {parsingError && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{parsingError}</span>
            </div>
          )}

          {/* Job Description Match Toggle & Box */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
            <button
              type="button"
              onClick={() => setShowJdInput(!showJdInput)}
              className="flex items-center justify-between w-full py-2 text-left text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Target Job Description Match (Optional for Match Score)
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-medium">
                {showJdInput ? 'Hide JD' : '+ Add Job Listing'}
              </span>
            </button>

            {showJdInput && (
              <div className="mt-3 space-y-2">
                <textarea
                  rows={5}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste target job description or requirements here to check keyword match percentage, missing skills, and tailoring advice..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isLoading || !resumeText.trim()}
            className={`w-full py-4 rounded-2xl text-base font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
              isLoading || !resumeText.trim()
                ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 shadow-blue-500/25 active:scale-[0.99]'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                <span>Running AI Analysis...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Analyze Resume Now</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
