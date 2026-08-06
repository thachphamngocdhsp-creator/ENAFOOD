import React from 'react';
import { ShieldCheck, Award, Flame, Sparkles, ArrowRight, HeartHandshake } from 'lucide-react';

interface HeroBannerProps {
  onOpenAIModal: () => void;
  onSelectCategory: (catId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenAIModal, onSelectCategory }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900 text-stone-100 rounded-3xl my-4 mx-4 sm:mx-6 lg:mx-8 border border-amber-900/40 shadow-xl">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold backdrop-blur-xs">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Nông Sản Bình Phước - Chứng Nhận OCOP 4 Sao</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Hạt Điều Rang Củi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
              Giòn Rụm & Bùi Béo Tự Nhiên
            </span>
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
            Thu hoạch từ nhà vườn Bù Đăng, Bình Phước. Chế biến theo phương pháp rang củi truyền thống muối biển nhè nhẹ dưới 1%. Cam kết hạt tròn đầy, 100% không hôi dầu, bóc lụa cực kỳ tiện lợi.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectCategory('shop')}
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-lg shadow-amber-900/40 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Xem Sản Phẩm Hot</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAIModal}
              className="px-5 py-3 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-amber-300 border border-amber-500/30 font-semibold text-sm transition-colors flex items-center gap-2 backdrop-blur-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Nhờ AI Tư Vấn Chọn Loại</span>
            </button>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-amber-900/50 text-xs">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-stone-300 font-medium">Rang củi chuẩn vị</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-stone-300 font-medium">Không phụ gia, hôi dầu</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-stone-300 font-medium">Đạt chuẩn ISO & OCOP</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-rose-400 shrink-0" />
              <span className="text-stone-300 font-medium">1 Đổi 1 trong 7 ngày</span>
            </div>
          </div>
        </div>

        {/* Right Featured Image / Card Showcase */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/20">
              <img
                src="https://images.unsplash.com/photo-1509358211425-24e038063f28?auto=format&fit=crop&w=1000&q=80"
                alt="Hạt điều rang củi Bình Phước"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-stone-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-amber-500/30 shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-extrabold text-lg">
                4.9★
              </div>
              <div>
                <p className="text-xs font-bold text-white">Hơn 5.000+ Khách Hàng Tin Dùng</p>
                <p className="text-[11px] text-amber-300/80">Đánh giá 5 sao uy tín</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
