import React, { useState, useRef } from 'react';
import {
  Layers,
  Sparkles,
  Trophy,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Upload,
  FileText,
  FileCheck,
} from 'lucide-react';
import { compareResumesApi } from '../services/api';
import { ComparisonResult } from '../types';
import { extractTextFromFile } from '../utils/pdfExtractor';

export const CompareView: React.FC = () => {
  const [resumeSlots, setResumeSlots] = useState<
    { id: string; name: string; text: string; loading?: boolean }[]
  >([
    { id: '1', name: '', text: '' },
  ]);

  const [jobDescription, setJobDescription] = useState<string>('');
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleAddSlot = () => {
    if (resumeSlots.length >= 4) return;
    setResumeSlots((prev) => [
      ...prev,
      { id: Date.now().toString(), name: '', text: '' },
    ]);
  };

  const handleRemoveSlot = (idx: number) => {
    if (resumeSlots.length <= 1) return;
    setResumeSlots((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSlotChange = (
    idx: number,
    field: 'name' | 'text' | 'loading',
    value: any
  ) => {
    setResumeSlots((prev) =>
      prev.map((slot, i) => (i === idx ? { ...slot, [field]: value } : slot))
    );
  };

  const handleFileUpload = async (idx: number, file: File) => {
    if (!file) return;
    handleSlotChange(idx, 'loading', true);
    try {
      const text = await extractTextFromFile(file);
      setResumeSlots((prev) =>
        prev.map((slot, i) =>
          i === idx
            ? {
                ...slot,
                name: slot.name || file.name,
                text: text || '',
                loading: false,
              }
            : slot
        )
      );
    } catch (err) {
      console.error('Failed to extract text:', err);
      handleSlotChange(idx, 'loading', false);
    }
  };

  const handleRunComparison = async () => {
    setErrorMsg(null);
    if (resumeSlots.some((s) => !s.text.trim())) {
      setErrorMsg('Please ensure all candidate slots contain resume text or uploaded documents.');
      return;
    }

    setIsComparing(true);
    try {
      const formattedSlots = resumeSlots.map((slot, idx) => ({
        ...slot,
        name: slot.name.trim() || `Candidate #${idx + 1}`,
      }));

      const result = await compareResumesApi({
        resumes: formattedSlots,
        jobDescription: jobDescription || undefined,
      });
      setComparison(result);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to compare resumes.');
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md">
          <Layers className="w-4 h-4" />
          Side-By-Side Resume Benchmarking
        </div>
        <h2 className="text-3xl font-black">Multiple Resume Comparison</h2>
        <p className="text-sm text-blue-100 max-w-2xl">
          Evaluate 2 to 3 versions of your resume or compare candidate CVs to see which candidate scores highest for ATS compatibility and job fit.
        </p>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumeSlots.map((slot, idx) => (
          <div
            key={slot.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                {slot.name.trim() || `Candidate Resume #${idx + 1}`}
              </span>
              <div className="flex items-center gap-1">
                {resumeSlots.length > 1 ? (
                  <button
                    onClick={() => handleRemoveSlot(idx)}
                    className="px-2 py-1 text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded-lg transition-colors border border-red-900/50 flex items-center gap-1 text-xs font-semibold"
                    title="Delete resume slot"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                ) : slot.text ? (
                  <button
                    onClick={() => handleSlotChange(idx, 'text', '')}
                    className="px-2 py-1 text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded-lg transition-colors border border-red-900/50 flex items-center gap-1 text-xs font-semibold"
                    title="Delete text content"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Text</span>
                  </button>
                ) : null}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Candidate / File Name
              </label>
              <input
                type="text"
                value={slot.name}
                onChange={(e) => handleSlotChange(idx, 'name', e.target.value)}
                placeholder={`Candidate #${idx + 1} Name`}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Upload PDF / Document or Paste Text
              </label>

              {/* Hidden file input */}
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                ref={(el) => (fileInputRefs.current[slot.id] = el)}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(idx, e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              <div className="mb-2.5">
                <button
                  type="button"
                  disabled={slot.loading}
                  onClick={() => fileInputRefs.current[slot.id]?.click()}
                  className="w-full py-2.5 px-3 rounded-xl border border-dashed border-blue-500/50 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  {slot.loading ? (
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-blue-500" />
                      <span>Upload PDF / DOCX / TXT</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                rows={7}
                value={slot.text}
                onChange={(e) => handleSlotChange(idx, 'text', e.target.value)}
                placeholder="Or paste resume content here..."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>
        ))}
      </div>

      {resumeSlots.length < 4 && (
        <div className="text-center">
          <button
            onClick={handleAddSlot}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-blue-400 bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Another Candidate Resume
          </button>
        </div>
      )}

      {/* Target Job Description Input */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Target Job Description (Optional Benchmark Target)
        </label>
        <textarea
          rows={3}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description to benchmark all candidate resumes against the same role..."
          className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Compare CTA */}
      <button
        onClick={handleRunComparison}
        disabled={isComparing}
        className="w-full py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 shadow-xl shadow-blue-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
      >
        {isComparing ? (
          <>
            <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
            <span>Comparing Resumes...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Run Multi-Resume Comparison</span>
          </>
        )}
      </button>

      {/* Comparison Results Card */}
      {comparison && (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-6">
          {/* Winner Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-blue-500/20 border border-amber-400/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm uppercase tracking-wider">
              <Trophy className="w-5 h-5 text-amber-500" />
              Highest Scoring Resume Selected:
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {comparison.winnerId}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {comparison.winnerReason}
            </p>
          </div>

          {/* Scores Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparison.resumes.map((r) => (
              <div
                key={r.id}
                className={`p-5 rounded-2xl border ${
                  r.name === comparison.winnerId || r.id === comparison.winnerId
                    ? 'border-amber-400 bg-amber-50/30 dark:bg-amber-950/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate max-w-[150px]">
                    {r.name}
                  </h4>
                  {(r.name === comparison.winnerId || r.id === comparison.winnerId) && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      ★ Winner
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">ATS Score:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{r.atsScore}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Quality Index:</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{r.qualityScore}/100</span>
                  </div>
                  {r.matchPercentage !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Job Match:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{r.matchPercentage}%</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Key Differences */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Key Strategic Differences Identified
            </h4>
            <ul className="space-y-2">
              {comparison.keyDifferences.map((diff, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{diff}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
