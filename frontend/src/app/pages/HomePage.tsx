// src/pages/HomePage.jsx
import React from 'react';
import { Feather, Sparkles, Brain, Shield, BarChart3, ArrowRight, MessageCircle } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  title: string;
  description: string;
  colorClass: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, colorClass }) => (
  <div className="p-8 bg-white/60 backdrop-blur-md border border-white/40 rounded-[2rem] shadow-soft hover:shadow-glass transition-all duration-500 group">
    <div className={`w-14 h-14 rounded-2xl ${colorClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
      <Icon size={28} className="text-white" />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-[15px]">{description}</p>
  </div>
);

export default function HomePage() {
  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="relative text-center pt-10">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 -left-20 w-72 h-72 bg-indigo-200/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-teal-100/30 rounded-full blur-[100px] animate-pulse delay-700"></div>

        <div className="relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-full text-indigo-600 text-sm font-medium shadow-sm animate-fade-in">
            <Sparkles size={16} />
            <span>AI-Powered Emotional Intelligence</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]">
            Find stillness in the <br /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-teal-500">
              noise of life.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-500 leading-relaxed">
            Amaithi is your private sanctuary. Journal your thoughts, track your emotions, 
            and chat with an AI companion designed to understand you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold text-lg hover:bg-slate-800 hover:scale-[1.02] transition-all shadow-xl flex items-center gap-2">
              Start Journaling <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold text-lg hover:bg-slate-50 transition-all">
              Meet your Companion
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800">Designed for your well-being</h2>
          <p className="text-slate-500 mt-2">Everything you need to navigate your internal world.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Feather} 
            title="Mindful Journaling" 
            description="A distraction-free writing experience with auto-save and mood-tagging." 
            colorClass="bg-indigo-500"
          />
          <FeatureCard 
            icon={Brain} 
            title="Emotional Insights" 
            description="AI analyzes your entries to spot patterns in your mood and stress levels." 
            colorClass="bg-teal-500"
          />
          <FeatureCard 
            icon={MessageCircle} 
            title="AI Companion" 
            description="A non-judgmental space to talk through your feelings in real-time." 
            colorClass="bg-purple-500"
          />
          <FeatureCard 
            icon={BarChart3} 
            title="Weekly Summaries" 
            description="Receive a beautiful digest of your emotional growth and milestones." 
            colorClass="bg-pink-500"
          />
          <FeatureCard 
            icon={Shield} 
            title="End-to-End Privacy" 
            description="Your reflections are yours alone. Encrypted, secure, and permanent." 
            colorClass="bg-slate-800"
          />
          <div className="p-8 bg-gradient-to-br from-indigo-600 to-teal-500 rounded-[2rem] flex flex-col justify-center text-white shadow-xl">
             <h3 className="text-2xl font-bold mb-2">Ready to begin?</h3>
             <p className="text-indigo-100 mb-6">Join 10,000+ others finding their peace.</p>
             <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
               Get Started Free
             </button>
          </div>
        </div>
      </section>
    </div>
  );
}