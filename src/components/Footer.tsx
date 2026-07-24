import React from 'react';
import { FileText } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <span className="text-xl font-bold text-white">Smart AI Resume Analyzer</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering job seekers worldwide with instant AI resume evaluation, ATS compliance scoring, keyword optimization, and real-time skill gap detection.
            </p>
          </div>

          {/* Core Product Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Core Platform
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => setActiveTab('analyzer')} className="hover:text-blue-400 transition-colors">
                  AI Resume Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('analyzer')} className="hover:text-blue-400 transition-colors">
                  ATS Score Checker
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('compare')} className="hover:text-blue-400 transition-colors">
                  Multi-Resume Comparison
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Resources & Guide
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-blue-400 transition-colors">
                  How ATS Algorithms Work
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-blue-400 transition-colors">
                  Action Verbs Library
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-blue-400 transition-colors">
                  Resume Formatting Tips
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-blue-400 transition-colors">
                  24/7 AI Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Smart AI Resume Analyzer. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
