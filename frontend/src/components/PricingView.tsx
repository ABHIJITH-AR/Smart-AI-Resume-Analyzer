import React, { useState } from 'react';
import { Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface PricingViewProps {
  onSelectPlan: (plan: string) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      id: 'free',
      name: 'Free Starter',
      badge: 'Basic Entry',
      priceMonthly: '$0',
      priceAnnual: '$0',
      description: 'Ideal for quick resume checkups and basic ATS feedback.',
      features: [
        '5 AI Resume Analyses per month',
        'Basic ATS Compatibility Score',
        'Grammar & Format check',
        '3 Sample Resume Presets',
        'Standard PDF Report export',
      ],
      popular: false,
      cta: 'Get Started Free',
    },
    {
      id: 'pro',
      name: 'Pro Job Hunter',
      badge: 'Most Popular',
      priceMonthly: '$19',
      priceAnnual: '$12',
      description: 'Everything you need to land interviews 3x faster.',
      features: [
        'Unlimited AI Resume Analyses',
        'Advanced 3.6 ATS Scoring Engine',
        'Job Description Keyword Matcher',
        'Quantified Bullet Point Rewriter',
        'Multi-Resume Comparison (up to 3)',
        'Skill Gap & Action Verb Optimizer',
        'Priority 24/7 AI Career Support',
      ],
      popular: true,
      cta: 'Upgrade to Pro Hunter',
    },
    {
      id: 'enterprise',
      name: 'Executive / Career Coach',
      badge: 'For Pros & Agencies',
      priceMonthly: '$49',
      priceAnnual: '$35',
      description: 'Designed for career coaches, recruiters, and executives.',
      features: [
        'All Pro Job Hunter Features',
        'Unlimited Multi-Resume Comparisons',
        'Custom Branded PDF Reports',
        'API Access for Bulk Resumes',
        'Dedicated Career Advisor AI Assistant',
        'Guaranteed 99.9% ATS Pass Rate Guarantee',
      ],
      popular: false,
      cta: 'Contact Enterprise Sales',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#0877ff]/15 text-[#0877ff] border border-[#0877ff]/30">
          <Sparkles className="w-4 h-4 text-[#0877ff]" />
          Simple, Transparent Pricing
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
          Invest in Your Next Career Move
        </h2>
        <p className="text-base text-slate-300">
          Land more job interviews with AI-optimized ATS resumes. Upgrade or cancel anytime.
        </p>

        {/* Annual / Monthly Toggle */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <span className={`text-xs sm:text-sm font-semibold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 rounded-full bg-[#0877ff] p-1 transition-colors flex items-center cursor-pointer"
          >
            <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <span className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
            Annual Billing
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              Save 35%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
              plan.popular
                ? 'bg-[#0d0d0d] text-white border-2 border-[#0877ff] shadow-2xl scale-[1.03] z-10'
                : 'bg-[#0d0d0d] text-white border border-[#262626] shadow-xl'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0877ff] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                {plan.badge}
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${plan.popular ? 'text-[#0877ff]' : 'text-slate-400'}`}>
                  {plan.name}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">
                    {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    / month {isAnnual ? '(billed annually)' : ''}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  {plan.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#262626] space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Included Features:
                </p>
                <ul className="space-y-2.5">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <Check className="w-4 h-4 shrink-0 mt-0.5 text-[#0877ff]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan(plan.id)}
              className={`w-full py-3.5 rounded-2xl text-sm font-bold mt-8 transition-all active:scale-95 shadow-md cursor-pointer ${
                plan.popular
                  ? 'bg-[#0877ff] hover:bg-[#0062d6] text-white'
                  : 'bg-black border border-[#262626] hover:bg-[#171717] text-white'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
