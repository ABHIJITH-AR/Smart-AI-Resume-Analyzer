import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  HelpCircle,
  ChevronDown,
  Layers,
  CheckCircle2,
  Cpu,
  FileCheck2,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the AI calculate my ATS score?',
      a: 'Our engine is trained on standard Applicant Tracking System (ATS) filtering rules used by Fortune 500 companies (Taleo, Greenhouse, Workday, Lever). It evaluates header formatting, keyword density relative to industry standards, contact detail placement, bullet point quantification, and section structure.',
    },
    {
      q: 'Will my resume information remain private and secure?',
      a: 'Yes. Resume contents are parsed server-side in real-time and processed purely for generating your report. We do not sell or share candidate data with third parties.',
    },
    {
      q: 'How does Job Description matching work?',
      a: 'When you paste a target job description, our AI extracts required skills, core competencies, and critical keywords, comparing them directly against your uploaded resume to calculate an exact keyword overlap percentage and missing skill list.',
    },
    {
      q: 'Can I download the analysis report as a PDF?',
      a: 'Yes! Every analysis comes with a downloadable executive PDF report containing your ATS scorecard, strengths, weaknesses, and rewritten action bullets.',
    },
    {
      q: 'Which file formats are supported?',
      a: 'We support PDF, DOCX, and plain TXT files up to 10MB.',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
          <Cpu className="w-4 h-4 text-purple-500" />
          The Science Behind Smart AI Resume Analyzer
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Beating the ATS Gatekeepers with AI Precision
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Over 75% of job applications are filtered out by automated ATS scanners before a human recruiter ever sees them. Smart AI Resume Analyzer bridges that gap with real-time feedback.
        </p>
      </div>

      {/* How It Works Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
            1
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Document Parsing & Token Extraction
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Extracts raw text, bullet hierarchies, dates, contact details, and technical skill matrices cleanly.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-lg">
            2
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Advanced AI Evaluation
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Evaluates quantification, action verb strength, grammar consistency, and section completeness.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
            3
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Actionable Optimization Roadmap
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Generates specific bullet point rewrites, missing skill recommendations, and job match alignment advice.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          Frequently Asked Questions
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {openFaq === idx && (
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-1">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
