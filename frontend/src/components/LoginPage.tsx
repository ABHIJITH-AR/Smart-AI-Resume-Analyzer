import React, { useState } from 'react';
import { Sparkles, User as UserIcon, Lock, Mail, ArrowRight, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { loginUserApi, registerUserApi } from '../services/api';
import { User } from '../types';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setErrorMsg('Please enter a valid email address (e.g. user@example.com)');
        setLoading(false);
        return;
      }

      if (mode === 'login') {
        const user = await loginUserApi(email, password);
        onLoginSuccess(user);
      } else {
        const regRes = await registerUserApi(name, email, password);
        setSuccessMsg(regRes.message || 'Registration successful! Please sign in with your account.');
        setMode('login');
        setPassword('');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0877ff]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login/Register Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-[#0d0d0d] border border-[#262626] shadow-2xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
        {/* Logo & Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0877ff] to-blue-400 p-0.5 mx-auto shadow-lg shadow-[#0877ff]/20">
            <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#0877ff]" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {mode === 'login' ? 'Sign In' : 'Register'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto">
            {mode === 'login'
              ? 'Sign in to access resume evaluations and ATS optimization tools.'
              : 'Create your account to start analyzing resumes with AI.'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl bg-black p-1 text-xs font-semibold border border-[#262626]">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-2.5 rounded-lg transition-all ${
              mode === 'login' ? 'bg-[#0877ff] text-white font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-2.5 rounded-lg transition-all ${
              mode === 'register' ? 'bg-[#0877ff] text-white font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Banners */}
        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#262626] bg-black text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#0877ff]/50"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#262626] bg-black text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#0877ff]/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#262626] bg-black text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#0877ff]/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-[#0877ff] hover:bg-[#0062d6] shadow-lg shadow-[#0877ff]/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In' : 'Register'}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </>
            )}
          </button>
        </form>

        {/* Toggle Footer Link */}
        {mode === 'login' ? (
          <div className="text-center text-xs text-slate-400 pt-3 border-t border-[#262626]">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="text-[#0877ff] font-bold hover:underline"
            >
              Register now
            </button>
          </div>
        ) : (
          <div className="text-center text-xs text-slate-400 pt-3 border-t border-[#262626]">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="text-[#0877ff] font-bold hover:underline"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
