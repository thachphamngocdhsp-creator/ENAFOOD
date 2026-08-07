import React from 'react';
import { PhoneCall, Mail, MapPin, ShieldCheck, Award, Heart, Truck, Download } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  onSelectCategory: (catId: string) => void;
  onOpenAIModal: () => void;
  onOpenDownloadModal: () => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenAIModal,
  onOpenDownloadModal,
  language,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-stone-950 text-stone-300 pt-12 pb-8 border-t border-amber-900/40 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                🌰
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight leading-tight">
                  {t.brandTitle}
                </h3>
                <p className="text-[10px] text-amber-500 uppercase tracking-wider font-extrabold">
                  {t.brandSub}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed font-light">
              {t.footerDesc}
            </p>

            <div className="flex items-center gap-2 text-xs">
              <span className="p-1.5 bg-stone-900 rounded-lg border border-stone-800 font-bold text-amber-400 text-[10px]">
                ISO 22000
              </span>
              <span className="p-1.5 bg-stone-900 rounded-lg border border-stone-800 font-bold text-emerald-400 text-[10px]">
                HACCP Codex
              </span>
              <span className="p-1.5 bg-stone-900 rounded-lg border border-stone-800 font-bold text-blue-400 text-[10px]">
                FDA Registered
              </span>
            </div>
          </div>

          {/* Col 2: 3 Core Product Categories */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm border-b border-stone-800 pb-2">
              {t.productFoldersTitle}
            </h4>
            <ul className="space-y-2 text-stone-400 font-medium">
              <li>
                <button onClick={() => onSelectCategory('shop')} className="hover:text-amber-400 transition-colors text-left">
                  🌰 {t.folder1Title}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('shop')} className="hover:text-amber-400 transition-colors text-left">
                  🌶️ {t.folder2Title}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('shop')} className="hover:text-amber-400 transition-colors text-left">
                  🥭 {t.folder3Title}
                </button>
              </li>
              <li>
                <button onClick={onOpenAIModal} className="text-amber-400 hover:underline font-bold flex items-center gap-1">
                  ✨ {t.aiConsultant}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Export & Source Code Download */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm border-b border-stone-800 pb-2">
              {language === 'vi' ? 'Mã Nguồn & Xuất Khẩu' : 'Export & Source Code'}
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenDownloadModal}
                className="w-full py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{t.downloadCode}</span>
              </button>
              <p className="text-[11px] text-stone-500 leading-snug">
                {language === 'vi' ? 'Tải đầy đủ thư mục & file data dự án dạng mã nguồn zip.' : 'Download complete directory structure and data files.'}
              </p>
            </div>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm border-b border-stone-800 pb-2">
              {t.contactUs}
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{t.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-bold text-white">{t.hotline}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-stone-900 text-center text-xs text-stone-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 ENA GREEN CO., LTD - Member of ENA GROUP. All rights reserved.</p>
          <div className="flex gap-4">
            <button onClick={onOpenDownloadModal} className="hover:text-amber-400 underline">
              {t.downloadCodeShort}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
