import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Download,
  BarChart3,
  Layers,
  Zap,
  Check,
  Briefcase,
  BookOpen,
  Award,
  Code,
  UserCheck,
  ChevronRight,
  Copy,
  TrendingUp,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { AnalysisResult, SectionDetail } from '../types';
import { generatePdfReport } from '../utils/pdfGenerator';
import confetti from 'canvas-confetti';

interface AnalysisResultsProps {
  analysis: AnalysisResult;
  onReset: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, onReset }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'jobMatch' | 'sections' | 'skills' | 'rewrites'>('overview');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedBulletIdx, setCopiedBulletIdx] = useState<number | null>(null);

  React.useEffect(() => {
    // Trigger confetti if high score!
    if (analysis.atsScore >= 80) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }
    }
  }, [analysis]);

  const handleCopy = (text: string, isSummary: boolean, idx?: number) => {
    navigator.clipboard.writeText(text);
    if (isSummary) {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    } else if (idx !== undefined) {
      setCopiedBulletIdx(idx);
      setTimeout(() => setCopiedBulletIdx(null), 2000);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40';
    if (score >= 60) return 'text-amber-600 dark:text-amber-400 border-amber-500 bg-amber-50 dark:bg-amber-950/40';
    return 'text-red-600 dark:text-red-400 border-red-500 bg-red-50 dark:bg-red-950/40';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Excellent</span>;
      case 'good':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Good</span>;
      case 'needs_improvement':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Needs Work</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300 flex items-center gap-1"><XCircle className="w-3 h-3" /> Missing</span>;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              {analysis.targetRole || 'Software Professional'}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {analysis.targetSeniority} • {new Date(analysis.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {analysis.fileName}
          </h2>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => generatePdfReport(analysis)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 shadow-md transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            Download PDF Report
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Analyze Another
          </button>
        </div>
      </div>

      {/* Primary Scorecard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* ATS Score Circular Gauge */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg flex flex-col items-center justify-center text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            ATS Compatibility Score
          </p>
          <div className="relative w-32 h-32 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={analysis.atsScore >= 80 ? 'text-emerald-500' : analysis.atsScore >= 60 ? 'text-amber-500' : 'text-red-500'}
                strokeDasharray={`${analysis.atsScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {analysis.atsScore}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">out of 100</span>
            </div>
          </div>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
            {analysis.atsScore >= 80 ? '🎉 Excellent ATS Pass Rate' : analysis.atsScore >= 60 ? '⚡ Good, Needs Keyword Boost' : '⚠️ High Risk of ATS Rejection'}
          </p>
        </div>

        {/* Quality Score */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Quality & Metrics
              </span>
              <Award className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {analysis.qualityScore}<span className="text-sm font-normal text-slate-400">/100</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mt-3">
              <div
                className="bg-purple-600 h-full rounded-full transition-all duration-1000"
                style={{ width: `${analysis.qualityScore}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
            Measures quantification, bullet structure, and impact density.
          </p>
        </div>

        {/* Grammar Score */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Grammar & Tone
              </span>
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {analysis.grammarScore}<span className="text-sm font-normal text-slate-400">/100</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mt-3">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${analysis.grammarScore}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
            {analysis.grammarIssues.length > 0 ? `${analysis.grammarIssues.length} issues identified` : 'Zero major grammar errors detected'}
          </p>
        </div>

        {/* Format Score */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Format & Layout
              </span>
              <Layers className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {analysis.formatScore}<span className="text-sm font-normal text-slate-400">/100</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mt-3">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${analysis.formatScore}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
            Checks section order, headers, and contact info visibility.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Overview & Strengths
        </button>

        {analysis.jobMatch && (
          <button
            onClick={() => setActiveTab('jobMatch')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
              activeTab === 'jobMatch'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Job Match ({analysis.jobMatch.matchPercentage}%)
          </button>
        )}

        <button
          onClick={() => setActiveTab('sections')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
            activeTab === 'sections'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          8 Section Breakdown
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
            activeTab === 'skills'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Code className="w-4 h-4" />
          Skill Gap & Verbs
        </button>

        <button
          onClick={() => setActiveTab('rewrites')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
            activeTab === 'rewrites'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Zap className="w-4 h-4" />
          AI Summary & Bullet Rewrites
        </button>
      </div>

      {/* Tab Content 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Executive Summary */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Executive AI Diagnosis
            </h3>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
              {analysis.overallSummary}
            </p>
          </div>

          {/* Strengths & Weaknesses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <h4 className="text-base font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Key Resume Strengths ({analysis.strengths.length})
              </h4>
              <ul className="space-y-2.5">
                {analysis.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <h4 className="text-base font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Areas Needing Improvement ({analysis.weaknesses.length})
              </h4>
              <ul className="space-y-2.5">
                {analysis.weaknesses.map((wk, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                    <span>{wk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Grammar & Formatting Specific Issues */}
          {analysis.grammarIssues.length > 0 && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-500" />
                Detected Grammar & Phrasing Corrections
              </h4>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {analysis.grammarIssues.map((item, idx) => (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                    <div className="space-y-1">
                      <p className="line-through text-red-500 font-mono">{item.issue}</p>
                      <p className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">→ {item.correction}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase shrink-0 ${
                      item.impact === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.impact} impact
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab Content 2: Job Description Match */}
      {activeTab === 'jobMatch' && analysis.jobMatch && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30">
                  Target Match Evaluation
                </span>
                <h3 className="text-2xl font-black mt-2">
                  {analysis.jobMatch.jobTitle}
                </h3>
              </div>
              <div className="text-center sm:text-right bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10">
                <div className="text-4xl font-black text-purple-300">
                  {analysis.jobMatch.matchPercentage}%
                </div>
                <div className="text-xs text-purple-200 uppercase font-semibold">Match Score</div>
              </div>
            </div>
            <p className="text-sm text-purple-100 leading-relaxed pt-2 border-t border-white/10">
              {analysis.jobMatch.jdFitSummary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched Keywords */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <h4 className="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Matched Keywords ({analysis.jobMatch.matchedKeywords.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.jobMatch.matchedKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  >
                    ✓ {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <h4 className="text-base font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Missing Critical Keywords ({analysis.jobMatch.missingKeywords.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.jobMatch.missingKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                  >
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tailoring Advice */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Tailoring Advice for this Role
            </h4>
            <ul className="space-y-3">
              {analysis.jobMatch.tailoringAdvice.map((adv, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab Content 3: Section Breakdown */}
      {activeTab === 'sections' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(analysis.sections).map(([secKey, rawDetail]) => {
            const detail = rawDetail as SectionDetail;
            const formattedName = secKey.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
            return (
              <div
                key={secKey}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white capitalize">
                    {formattedName}
                  </h4>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(detail.status)}
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {detail.score}/100
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {detail.feedback}
                </p>

                {detail.improvements && detail.improvements.length > 0 && (
                  <div className="pt-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Suggested Fixes:
                    </p>
                    <ul className="space-y-1">
                      {detail.improvements.map((imp, idx) => (
                        <li key={idx} className="text-xs text-blue-600 dark:text-blue-400 flex items-start gap-1.5">
                          <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab Content 4: Skill Gap & Action Verbs */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technical Skills */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-600" />
                Detected Technical Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.skills.technicalSkills.map((sk, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-purple-600" />
                Detected Soft & Functional Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.skills.softSkills.map((sk, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Verbs Recommendation */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Action Verb Enhancements
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase mb-2">
                  Weak / Overused Verbs Found:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.actionVerbs.weakVerbsFound.map((v, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-400 line-through">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase mb-2">
                  Suggested High-Impact Action Verbs:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.actionVerbs.suggestedStrongVerbs.map((v, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400">
                      ★ {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 5: AI Summary & Bullet Rewrites */}
      {activeTab === 'rewrites' && (
        <div className="space-y-6">
          {/* Summary Rewrite */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-950/40 dark:to-purple-950/40 border border-blue-200 dark:border-blue-900 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Recommended Summary Rewrite
              </h3>
              <button
                onClick={() => handleCopy(analysis.aiRecommendations.summaryRewrite, true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shadow-sm hover:bg-blue-50 transition-colors"
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSummary ? 'Copied!' : 'Copy Summary'}</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-blue-100 dark:border-slate-800 text-slate-800 dark:text-slate-100 text-sm font-medium leading-relaxed italic">
              "{analysis.aiRecommendations.summaryRewrite}"
            </div>
          </div>

          {/* Bullet Point Rewrites */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Before & After Experience Bullet Rewrites
            </h3>

            <div className="space-y-4">
              {analysis.aiRecommendations.bulletPointRewrites.map((rw, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-3"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">
                      Original Line:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-mono">
                      "{rw.original}"
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> AI Quantified Rewrite:
                      </span>
                      <button
                        onClick={() => handleCopy(rw.improved, false, idx)}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        {copiedBulletIdx === idx ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-900 dark:text-white font-semibold font-mono bg-emerald-50/60 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60">
                      "{rw.improved}"
                    </p>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                    Why: {rw.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
