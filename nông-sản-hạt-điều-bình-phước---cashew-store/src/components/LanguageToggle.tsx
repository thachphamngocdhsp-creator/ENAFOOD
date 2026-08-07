import React from 'react';
import { Language } from '../types';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  variant?: 'light' | 'dark' | 'header';
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  language,
  onLanguageChange,
  variant = 'header',
}) => {
  return (
    <div className="inline-flex items-center gap-1.5 bg-amber-950/20 p-1 rounded-xl border border-amber-700/40 backdrop-blur-xs">
      <Globe className="w-3.5 h-3.5 text-amber-300 ml-1" />
      <button
        type="button"
        onClick={() => onLanguageChange('vi')}
        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
          language === 'vi'
            ? 'bg-amber-500 text-stone-950 shadow-xs'
            : 'text-stone-300 hover:text-white'
        }`}
      >
        <span>🇻🇳</span>
        <span>VI</span>
      </button>
      <button
        type="button"
        onClick={() => onLanguageChange('en')}
        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
          language === 'en'
            ? 'bg-amber-500 text-stone-950 shadow-xs'
            : 'text-stone-300 hover:text-white'
        }`}
      >
        <span>🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  );
};
