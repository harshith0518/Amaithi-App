// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { Feather, Mail, Lock, ArrowRight, User as UserIcon } from 'lucide-react';

type ViewType = 'login' | 'register' | 'forgot';

export default function AuthPage(): React.JSX.Element {
  const [view, setView] = useState<ViewType>('login'); // 'login', 'register', 'forgot'

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Connect to your Django JWT endpoints here
    console.log(`Submitting ${view}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-teal-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-glass border border-white/50 p-8 sm:p-10 animate-fade-in relative overflow-hidden">
        {/* Design Accents */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-100 rounded-full blur-2xl opacity-50"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-teal-400 text-white mb-4 shadow-soft">
            <Feather size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            {view === 'login' ? 'Welcome back' : view === 'register' ? 'Create your sanctuary' : 'Reset password'}
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            {view === 'login' ? 'Continue your journey to inner peace.' : view === 'register' ? 'Your private space for reflection begins here.' : 'We will send you a secure OTP to reset.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {view === 'register' && (
            <div className="relative">
              <UserIcon size={18} className="absolute left-3 top-3.5 text-slate-400" />
              <input type="text" placeholder="Preferred Name" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all" required />
            </div>
          )}
          
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3.5 text-slate-400" />
            <input type="email" placeholder="Email address" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all" required />
          </div>

          {view !== 'forgot' && (
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-3.5 text-slate-400" />
              <input type="password" placeholder="Password" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all" required />
            </div>
          )}

          {view === 'login' && (
            <div className="flex justify-end">
              <button type="button" onClick={() => setView('forgot')} className="text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                Forgot password?
              </button>
            </div>
          )}

          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-xl font-medium hover:bg-slate-800 focus:ring-4 focus:ring-slate-900/20 transition-all shadow-md">
            {view === 'login' ? 'Sign In' : view === 'register' ? 'Begin Journey' : 'Send Reset Link'}
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 text-center relative z-10 text-sm text-slate-500">
          {view === 'login' ? (
            <>New to Amaithi? <button onClick={() => setView('register')} className="text-indigo-600 font-medium hover:underline">Create account</button></>
          ) : (
            <>Already have an account? <button onClick={() => setView('login')} className="text-indigo-600 font-medium hover:underline">Sign in</button></>
          )}
        </div>
      </div>
    </div>
  );
}