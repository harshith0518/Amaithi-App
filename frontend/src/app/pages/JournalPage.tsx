// src/pages/JournalPage.jsx
import { useState, useEffect } from 'react';
import { Sparkles, Clock } from 'lucide-react';

export default function JournalPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('☁️ Calm');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState('Just now');

  const moods = ['☀️ Joyful', '☁️ Calm', '🌧️ Sad', '⛈️ Anxious', '🔥 Frustrated'];

  // Mock Auto-save Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || content) {
        setIsSaving(true);
        setTimeout(() => {
          setIsSaving(false);
          setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 800);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [title, content]);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-glass border border-white/40 p-8 sm:p-12 animate-slide-up relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Top Bar: Meta & Actions */}
      <div className="flex flex-wrap items-center justify-between mb-12 gap-4">
        <div className="flex items-center gap-3">
          <select 
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-1.5 pl-3 pr-8 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer transition-shadow hover:shadow-sm"
          >
            {moods.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <div className="flex items-center text-xs text-amaithi-muted gap-1.5 font-medium">
            <Clock size={14} />
            {isSaving ? 'Saving...' : `Saved ${lastSaved}`}
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors">
            <Sparkles size={16} /> AI Reflect
          </button>
        </div>
      </div>

      {/* The Editor Canvas */}
      <div className="flex flex-col gap-6">
        <input
          type="text"
          placeholder="Untitled Reflection..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-4xl sm:text-5xl font-bold text-amaithi-text placeholder:text-slate-300 focus:outline-none bg-transparent w-full resize-none tracking-tight leading-tight"
        />
        
        <textarea
          placeholder="What's on your mind today? Start writing, and feel the noise fade away..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[400px] text-lg text-slate-700 leading-relaxed placeholder:text-slate-400 focus:outline-none bg-transparent resize-none overflow-hidden"
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + 'px';
          }}
        />
      </div>

      {/* Floating Word Count */}
      <div className="absolute bottom-6 right-8 text-xs text-slate-400 font-medium">
        {content.trim().split(/\s+/).filter(Boolean).length} words
      </div>
    </div>
  );
}