import React from 'react';

type ViewState = 'home' | 'privacy' | 'terms' | 'contact';

interface FooterProps {
  onNavigate?: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, view: ViewState) => {
    e.preventDefault();
    if (onNavigate) onNavigate(view);
  };

  return (
    <footer className="w-full border-t border-white/5 bg-[#0a0a0a] mt-12 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-red-600 to-orange-600 rounded flex items-center justify-center font-display font-bold text-white text-xs">
            T
            </div>
            <span className="font-display font-bold text-gray-300 tracking-wide">THUMBGEN AI</span>
        </div>

        <div className="text-xs text-gray-500">
           &copy; {new Date().getFullYear()} ThumbGen AI. All rights reserved.
        </div>

        <nav className="flex gap-6">
            <button onClick={(e) => handleNav(e, 'privacy')} className="text-xs text-gray-500 hover:text-white transition-colors bg-transparent border-0 cursor-pointer">Privacy Policy</button>
            <button onClick={(e) => handleNav(e, 'terms')} className="text-xs text-gray-500 hover:text-white transition-colors bg-transparent border-0 cursor-pointer">Terms of Service</button>
            <button onClick={(e) => handleNav(e, 'contact')} className="text-xs text-gray-500 hover:text-white transition-colors bg-transparent border-0 cursor-pointer">Contact</button>
        </nav>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-4 text-[10px] text-gray-700 text-center md:text-left">
          <p>Disclaimer: This tool uses Google Gemini API. Not affiliated with YouTube or Google.</p>
      </div>
    </footer>
  );
};