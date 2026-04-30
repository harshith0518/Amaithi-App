// src/layouts/MainLayout.jsx
import { useState } from 'react';
import { Book, MessageSquare, User, Menu, X, Feather } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLinks = () => (
    <>
      <a href="/journal" className="flex items-center gap-2 text-amaithi-muted hover:text-amaithi-primary transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50/50">
        <Book size={20} /> <span className="font-medium">Journal</span>
      </a>
      <a href="/chat" className="flex items-center gap-2 text-amaithi-muted hover:text-amaithi-primary transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50/50">
        <MessageSquare size={20} /> <span className="font-medium">Companion</span>
      </a>
      <a href="/profile" className="flex items-center gap-2 text-amaithi-muted hover:text-amaithi-primary transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50/50">
        <User size={20} /> <span className="font-medium">Profile</span>
      </a>
    </>
  );

  return (
    <div className="min-h-screen bg-amaithi-bg bg-gradient-to-br from-indigo-50/30 via-white to-teal-50/30 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar - Glassmorphism */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-gradient-to-tr from-amaithi-primary to-amaithi-secondary p-2 rounded-xl text-white shadow-soft">
                <Feather size={20} strokeWidth={2.5} />
              </div>
              
              <a href="/" className="flex items-center gap-2 text-amaithi-muted hover:text-amaithi-primary transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50/50">
        <User size={20} /> <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 tracking-tight">
                Amaithi
              </span>
      </a>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-2">
              <NavLinks />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-amaithi-muted">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-fade-in">
        {children}
      </main>
    </div>
  );
}