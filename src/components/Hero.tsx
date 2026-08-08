import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Upload, Zap, BarChart2, ShieldCheck, FileCheck } from 'lucide-react';
import { SAMPLE_RESUMES, SampleResume } from '../data/sampleResumes';

interface HeroProps {
  onStartAnalysis: () => void;
  onSelectSample: (sample: SampleResume) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAnalysis, onSelectSample }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-28 bg-black transition-colors duration-300">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#0877ff]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#0877ff]/10 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d0d0d] border border-[#0877ff]/30 shadow-sm backdrop-blur-md mb-8 transition-transform hover:scale-105">
          <Sparkles className="w-4 h-4 text-[#0877ff] animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs sm:text-sm font-semibold text-[#0877ff]">
            Next-Gen AI ATS Intelligence
          </span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          Smart AI{' '}
          <span className="text-[#0877ff]">
            Resume Analyzer
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Upload your resume and receive instant AI-powered insights, ATS score, skill analysis, and personalized improvement suggestions.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onStartAnalysis}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#0877ff] hover:bg-[#0062d6] shadow-lg shadow-[#0877ff]/25 active:scale-95 transition-all group cursor-pointer"
          >
            <Upload className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform text-white" />
            <span>Analyze Resume</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-white" />
          </button>
        </div>

        {/* Quick Sample Resume Pickers */}
        <div className="mt-8 pt-6 border-t border-[#262626] max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Or test with a 1-click sample resume:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SAMPLE_RESUMES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onSelectSample(sample)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#0d0d0d] hover:bg-[#171717] text-slate-200 border border-[#262626] shadow-sm transition-all hover:scale-105 hover:border-[#0877ff]/50 cursor-pointer"
              >
                <FileCheck className="w-3.5 h-3.5 text-[#0877ff]" />
                <span>{sample.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Feature Highlights Banner Cards */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="p-4 rounded-2xl bg-[#0d0d0d] backdrop-blur-md border border-[#262626] text-left space-y-2 shadow-sm hover:border-[#0877ff]/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#0877ff]/15 flex items-center justify-center text-[#0877ff]">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">ATS Match Engine</h3>
            <p className="text-xs text-slate-400">0-100 compatibility score calculated against real HR filters.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0d0d0d] backdrop-blur-md border border-[#262626] text-left space-y-2 shadow-sm hover:border-[#0877ff]/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#0877ff]/15 flex items-center justify-center text-[#0877ff]">
              <BarChart2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Skill Gap Detection</h3>
            <p className="text-xs text-slate-400">Identifies missing technical & soft skills for target roles.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0d0d0d] backdrop-blur-md border border-[#262626] text-left space-y-2 shadow-sm hover:border-[#0877ff]/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#0877ff]/15 flex items-center justify-center text-[#0877ff]">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Bullet Point Rewrites</h3>
            <p className="text-xs text-slate-400">AI rewrites experience with high-impact quantified metrics.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0d0d0d] backdrop-blur-md border border-[#262626] text-left space-y-2 shadow-sm hover:border-[#0877ff]/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#0877ff]/15 flex items-center justify-center text-[#0877ff]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Job Description Match</h3>
            <p className="text-xs text-slate-400">Compare resume against specific job listings for 100% fit.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
