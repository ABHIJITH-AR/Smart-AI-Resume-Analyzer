import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, Clock, AlertCircle } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Resume Analysis',
    message: '',
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!formData.name || !formData.email || !formData.message) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.toLowerCase().trim())) {
      setErrorMsg('Please enter a valid email address (e.g. name@example.com)');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#0877ff]/15 text-[#0877ff] border border-[#0877ff]/30">
          <Mail className="w-4 h-4 text-[#0877ff]" />
          24/7 AI & Platform Support
        </div>
        <h2 className="text-3xl font-black text-white">
          Contact Career & Platform Support
        </h2>
        <p className="text-sm text-slate-400">
          Have questions about your ATS evaluation report or platform subscription? Reach out anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact info cards */}
        <div className="p-6 rounded-3xl bg-[#0d0d0d] border border-[#262626] shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0877ff]/15 text-[#0877ff] flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base">Email Support</h3>
          <p className="text-xs text-slate-400">Direct Helpdesk Support</p>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3" /> Average response: &lt; 2 hours
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-[#0d0d0d] border border-[#262626] shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0877ff]/15 text-[#0877ff] flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base">24/7 AI Career Coach</h3>
          <p className="text-xs text-slate-400">Available 24/7 inside your dashboard</p>
          <span className="text-[10px] text-[#0877ff] font-semibold">
            Instant Guidance Always Online
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-[#0d0d0d] border border-[#262626] shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-950/50 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base">System Status</h3>
          <p className="text-xs text-slate-400">All Systems Operational</p>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            ● 99.9% Uptime
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="p-8 rounded-3xl bg-[#0d0d0d] border border-[#262626] shadow-xl">
        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Message Received!
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Thank you for reaching out, {formData.name}. Our career support team will review your inquiry and respond shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-[#0877ff] hover:bg-[#0062d6]"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Name"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#262626] bg-black text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0877ff]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#262626] bg-black text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0877ff]/50"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Subject
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#262626] bg-black text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0877ff]/50"
              >
                <option value="Resume Analysis">Resume Analysis</option>
                <option value="ATS Score Inquiry">ATS Score Inquiry</option>
                <option value="Billing & Subscription">Billing & Subscription</option>
                <option value="Feature Suggestion">Feature Suggestion</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Your Message
              </label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we assist you with your resume optimization?"
                className="w-full p-4 rounded-xl border border-[#262626] bg-black text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0877ff]/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl text-sm font-bold text-white bg-[#0877ff] hover:bg-[#0062d6] shadow-lg shadow-[#0877ff]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
