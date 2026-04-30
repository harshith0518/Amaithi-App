// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="text-center py-20 animate-fade-in">
      <div className="inline-flex p-6 bg-white rounded-[2rem] shadow-soft mb-8">
        <Compass size={64} className="text-indigo-400 animate-pulse" />
      </div>
      <h1 className="text-4xl font-bold text-slate-800 mb-4">Are you lost?</h1>
      <p className="text-slate-500 max-w-md mx-auto mb-10 text-lg">
        This path doesn't seem to lead anywhere quiet. Let's get you back to your sanctuary.
      </p>
      <Link 
        to="/" 
        className="px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
      >
        Return Home
      </Link>
    </div>
  );
}