// src/pages/ProfilePage.jsx
import React from 'react';
import { User, Settings, Flame, BookOpen, Calendar, Camera, ShieldCheck, LogOut, Feather } from 'lucide-react';

const StatBox = ({ icon: Icon, label, value, colorClass }: { icon: React.ComponentType<{ size?: number }>, label: string, value: string, colorClass: string }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft flex items-center gap-5">
    <div className={`w-12 h-12 rounded-2xl ${colorClass} flex items-center justify-center text-white`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-[2.5rem] shadow-glass border border-white/50 p-8 sm:p-12 relative overflow-hidden">
        {/* Abstract Pattern */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
          <Feather size={200} />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          {/* Avatar Upload UI */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-indigo-100 to-teal-100 border-4 border-white shadow-soft flex items-center justify-center overflow-hidden">
              <User size={60} className="text-indigo-300" />
              <img src="/api/placeholder/128/128" alt="Profile" className="hidden group-hover:block object-cover w-full h-full" />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-slate-600 hover:text-indigo-600 transition-colors">
              <Camera size={18} />
            </button>
          </div>

          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold text-slate-800">Sarah Jenkins</h1>
            <p className="text-slate-500 font-medium">Finding balance since January 2024</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full border border-teal-100 uppercase tracking-wider">Premium Member</span>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100 uppercase tracking-wider">Consistency King</span>
            </div>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl font-semibold border border-slate-200 hover:bg-slate-100 transition-all">
            <Settings size={18} /> Edit Profile
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatBox icon={Flame} label="Current Streak" value="12 Days" colorClass="bg-orange-500" />
        <StatBox icon={BookOpen} label="Total Entries" value="48" colorClass="bg-indigo-500" />
        <StatBox icon={Calendar} label="Days Active" value="124" colorClass="bg-teal-500" />
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Account Settings */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-soft">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <ShieldCheck size={22} className="text-teal-500" /> Security & Privacy
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <p className="font-bold text-slate-700 text-sm">Biometric Lock</p>
                <p className="text-xs text-slate-500">Require FaceID to open Journal</p>
              </div>
              <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <p className="font-bold text-slate-700 text-sm">Auto-Export Data</p>
                <p className="text-xs text-slate-500">Weekly PDF of your insights</p>
              </div>
              <div className="w-12 h-6 bg-slate-200 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Support & Actions */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Support Amaithi</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Amaithi is built for the community. Your feedback helps us build a more mindful future.
            </p>
          </div>
          <div className="space-y-3">
            <button className="w-full py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-100 transition-colors">
              Share Feedback
            </button>
            <button className="w-full py-3 text-red-500 rounded-xl font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}