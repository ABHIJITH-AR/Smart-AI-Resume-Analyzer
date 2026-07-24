import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Upload, Zap, BarChart2, ShieldCheck, FileCheck } from 'lucide-react';
import { SAMPLE_RESUMES, SampleResume } from '../data/sampleResumes';

interface HeroProps {
  onStartAnalysis: () => void;
  onSelectSample: (sample: SampleResume) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAnalysis, onSelectSample }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/80 via-purple-50/40 to-white dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-900 transition-colors duration-300">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-400/20 via-indigo-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 border border-blue-200 dark:border-blue-900 shadow-sm backdrop-blur-md mb-8 transition-transform hover:scale-105">
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Next-Gen AI ATS Intelligence
          </span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
          Smart AI{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Resume Analyzer
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Upload your resume and receive instant AI-powered insights, ATS score, skill analysis, and personalized improvement suggestions.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onStartAnalysis}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 shadow-lg shadow-blue-500/25 active:scale-95 transition-all group"
          >
            <Upload className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Analyze Resume</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Quick Sample Resume Pickers */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Or test with a 1-click sample resume:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SAMPLE_RESUMES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onSelectSample(sample)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/90 dark:bg-slate-800/90 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-105 hover:border-blue-300"
              >
                <FileCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{sample.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Feature Highlights Banner Cards */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 text-left space-y-2 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">ATS Match Engine</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">0-100 compatibility score calculated against real HR filters.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 text-left space-y-2 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <BarChart2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Skill Gap Detection</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Identifies missing technical & soft skills for target roles.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 text-left space-y-2 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Bullet Point Rewrites</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">AI rewrites experience with high-impact quantified metrics.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 text-left space-y-2 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Job Description Match</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Compare resume against specific job listings for 100% fit.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
