import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Building2, Globe2, ShieldCheck, ArrowRight, PhoneCall, Sparkles, CheckCircle2, Package, Award } from 'lucide-react';

interface HomeIntroSectionProps {
  language: Language;
  onSelectCategory: (catId: string) => void;
  onOpenAIModal: () => void;
}

export const HomeIntroSection: React.FC<HomeIntroSectionProps> = ({
  language,
  onSelectCategory,
  onOpenAIModal,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
      {/* Header Badge & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
            <Building2 className="w-3.5 h-3.5 text-amber-700" />
            <span>ENA GREEN CO., LTD — {language === 'vi' ? 'Thành viên của ENA GROUP' : 'Member of ENA GROUP'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-tight">
            {language === 'vi' 
              ? 'Xuất khẩu hạt điều, gia vị & thực phẩm cao cấp từ Việt Nam' 
              : 'Exporting Premium Cashew Nuts, Spices & Food Products from Vietnam'}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>ISO 22000 • HACCP • FDA • HALAL</span>
        </div>
      </div>

      {/* Main Core Introduction Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-gradient-to-br from-amber-50/80 via-stone-50 to-amber-100/50 p-6 rounded-2xl border border-amber-200/60">
        <div className="lg:col-span-8 space-y-3">
          <div className="text-xs font-extrabold text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
            <Globe2 className="w-4 h-4 text-amber-600" />
            <span>{language === 'vi' ? '1. Trang chủ (Homepage) — ENA GREEN' : '1. Homepage Overview — ENA GREEN'}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
            {language === 'vi'
              ? 'Đối tác xuất khẩu hạt điều, gia vị & thực phẩm đáng tin cậy từ Việt Nam'
              : 'Reliable Export Partner for Cashew Nuts, Spices & Food Products from Vietnam'}
          </h3>

          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
            {language === 'vi' ? (
              <>
                Là thành viên của <strong className="text-stone-900 font-extrabold">ENA GROUP</strong>, <strong>ENA GREEN</strong> cung cấp các sản phẩm nông sản chất lượng cao với chuỗi cung ứng ổn định và tiêu chuẩn quốc tế.
              </>
            ) : (
              <>
                As a proud member of <strong className="text-stone-900 font-extrabold">ENA GROUP</strong>, <strong>ENA GREEN</strong> provides high-quality agricultural products with a stable supply chain and international standards.
              </>
            )}
          </p>

          {/* Call to action links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectCategory('shop')}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>👉 {language === 'vi' ? 'Xem sản phẩm' : 'View Products'}</span>
            </button>

            <span className="text-stone-300 font-light">|</span>

            <button
              onClick={onOpenAIModal}
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'vi' ? 'Liên hệ & Báo giá Sỉ' : 'Contact & Wholesale Quote'}</span>
            </button>
          </div>
        </div>

        {/* Highlight Stats Badges */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-3 text-center text-xs">
          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
            <div className="font-black text-amber-800 text-lg">15,000m²</div>
            <div className="text-[10px] text-stone-500 font-medium">{language === 'vi' ? 'Nhà máy Bình Phước' : 'Binh Phuoc Factory'}</div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
            <div className="font-black text-amber-800 text-lg">1,200T</div>
            <div className="text-[10px] text-stone-500 font-medium">{language === 'vi' ? 'Công suất/tháng' : 'Capacity / Month'}</div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
            <div className="font-black text-amber-800 text-lg">50+</div>
            <div className="text-[10px] text-stone-500 font-medium">{language === 'vi' ? 'Quốc gia xuất khẩu' : 'Export Markets'}</div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
            <div className="font-black text-amber-800 text-lg">100%</div>
            <div className="text-[10px] text-stone-500 font-medium">{language === 'vi' ? 'Nông sản Việt Nam' : 'Vietnamese Origin'}</div>
          </div>
        </div>
      </div>

      {/* Core Product Lines Preview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div 
          onClick={() => onSelectCategory('shop')}
          className="p-4 rounded-2xl bg-stone-50 hover:bg-amber-50/60 border border-stone-200 hover:border-amber-300 transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-base font-bold">
            🌰
          </div>
          <h4 className="font-bold text-stone-900 text-sm group-hover:text-amber-800 transition-colors">
            {language === 'vi' ? '1. Nhân Điều Thô Xuất Khẩu' : '1. Raw Cashew Kernels'}
          </h4>
          <p className="text-xs text-stone-500 leading-snug">
            {language === 'vi' 
              ? 'Phân loại AFI W180, W210, W240, W320, W450, SW, LP, SP, BB, DW tiêu chuẩn xuất khẩu.'
              : 'AFI graded W180, W210, W240, W320, W450, SW, LP, SP, BB, DW for global trade.'}
          </p>
        </div>

        <div 
          onClick={() => onSelectCategory('shop')}
          className="p-4 rounded-2xl bg-stone-50 hover:bg-amber-50/60 border border-stone-200 hover:border-amber-300 transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-base font-bold">
            🌶️
          </div>
          <h4 className="font-bold text-stone-900 text-sm group-hover:text-amber-800 transition-colors">
            {language === 'vi' ? '2. Gia Vị & Hạt Điều Tẩm Vị' : '2. Spices & Seasoned Cashews'}
          </h4>
          <p className="text-xs text-stone-500 leading-snug">
            {language === 'vi'
              ? 'Hạt điều rang củi vỏ lụa, tẩm mật ong, tỏi ớt, wasabi, phô mai và các loại gia vị đặc sản.'
              : 'Wood-roasted salted, honey, chili garlic, wasabi, cheese seasoned gourmet cashew.'}
          </p>
        </div>

        <div 
          onClick={() => onSelectCategory('shop')}
          className="p-4 rounded-2xl bg-stone-50 hover:bg-amber-50/60 border border-stone-200 hover:border-amber-300 transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-base font-bold">
            🥭
          </div>
          <h4 className="font-bold text-stone-900 text-sm group-hover:text-amber-800 transition-colors">
            {language === 'vi' ? '3. Thực Phẩm & Trái Cây Sấy' : '3. Dried Fruit & Food Products'}
          </h4>
          <p className="text-xs text-stone-500 leading-snug">
            {language === 'vi'
              ? 'Xoài sấy dẻo, mít sấy giòn, chuối, khoai, hạt sen & thực phẩm sấy cao cấp.'
              : 'Soft dried mango, crispy jackfruit, banana, lotus seeds & premium dried snacks.'}
          </p>
        </div>
      </div>
    </section>
  );
};
