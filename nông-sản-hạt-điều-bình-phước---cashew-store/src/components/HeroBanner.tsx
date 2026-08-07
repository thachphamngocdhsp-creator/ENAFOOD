import React from 'react';
import { ShieldCheck, Award, Flame, Sparkles, ArrowRight, HeartHandshake, Building2 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeroBannerProps {
  onOpenAIModal: () => void;
  onSelectCategory: (catId: string) => void;
  language: Language;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenAIModal, onSelectCategory, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-amber-950 to-stone-950 text-stone-100 rounded-3xl border border-amber-900/40 shadow-xl">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Text */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold backdrop-blur-xs">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>ENA GREEN CO., LTD • {language === 'vi' ? 'Thành Viên ENA GROUP' : 'Member of ENA GROUP'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
            {language === 'vi' ? (
              <>
                Hạt Điều & Trái Cây Sấy <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                  Xuất Khẩu Thượng Hạng Bình Phước
                </span>
              </>
            ) : (
              <>
                Vietnamese Cashew Nuts <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                  & Premium Dried Fruits Export
                </span>
              </>
            )}
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
            {t.aboutSub}. {t.factoryCapDesc}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectCategory('shop')}
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-900/40 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>{language === 'vi' ? 'Khám Phá 3 Dạng Sản Phẩm' : 'Browse 3 Product Categories'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAIModal}
              className="px-5 py-3 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-amber-300 border border-amber-500/30 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 backdrop-blur-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.aiConsultant}</span>
            </button>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-amber-900/50 text-[11px]">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-stone-300 font-medium">{language === 'vi' ? 'Rang củi vỏ lụa W240' : 'Wood Roasted W240'}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-stone-300 font-medium">HACCP, ISO, FDA Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-stone-300 font-medium">{language === 'vi' ? 'Phân loại AFI W180-W450' : 'AFI Graded W180-W450'}</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="text-stone-300 font-medium">{language === 'vi' ? 'Đóng gói OEM Flexi-bag' : 'Flexi-bag OEM Export'}</span>
            </div>
          </div>
        </div>

        {/* Right Featured Image / Card Showcase */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/20">
              <img
                src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1000&q=80"
                alt="ENA GREEN Cashew"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-stone-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-amber-500/30 shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-extrabold text-base">
                B2B
              </div>
              <div>
                <p className="text-xs font-bold text-white">{language === 'vi' ? 'Nhà Máy Chế Biến ENA GREEN' : 'ENA GREEN Export Factory'}</p>
                <p className="text-[11px] text-amber-300/80">ISO 22000 • HACCP Codex • FDA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
