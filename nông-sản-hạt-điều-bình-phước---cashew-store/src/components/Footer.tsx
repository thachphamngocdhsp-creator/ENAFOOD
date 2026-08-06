import React from 'react';
import { PhoneCall, Mail, MapPin, ShieldCheck, Award, Heart, Truck } from 'lucide-react';
import { FAQS } from '../data/reviews';

interface FooterProps {
  onSelectCategory: (catId: string) => void;
  onOpenAIModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenAIModal }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-amber-900/40 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: About Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                🌰
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight leading-tight">
                  HẠT ĐIỀU <span className="text-amber-500">BÌNH PHƯỚC</span>
                </h3>
                <p className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                  Thương Hiệu Nông Sản OCOP 4 Sao
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Chuyên cung cấp hạt điều rang củi truyền thống, hạt điều tẩm vị sáng tạo và bơ hạt điều nguyên chất 100% chính gốc Bù Đăng, Bình Phước.
            </p>

            <div className="flex items-center gap-3 text-xs text-stone-300 pt-1">
              <span className="p-2 bg-stone-800 rounded-lg border border-stone-700 font-bold text-amber-400">
                OCOP 4★
              </span>
              <span className="p-2 bg-stone-800 rounded-lg border border-stone-700 font-bold text-emerald-400">
                ISO 22000
              </span>
            </div>
          </div>

          {/* Col 2: Category Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm border-b border-stone-800 pb-2">
              Danh Mục Sản Phẩm
            </h4>
            <ul className="space-y-2 text-stone-400 font-medium">
              <li>
                <button onClick={() => onSelectCategory('rang-muoi')} className="hover:text-amber-400 transition-colors">
                  🥜 Hạt Điều Rang Muối Củi Vỏ Lụa
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('tam-vi')} className="hover:text-amber-400 transition-colors">
                  🌶️ Hạt Điều Tẩm Tỏi Ớt / Mật Ong
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('nguyen-vi')} className="hover:text-amber-400 transition-colors">
                  🥛 Hạt Điều Nấu Sữa & Eatclean W240
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('qua-bieu')} className="hover:text-amber-400 transition-colors">
                  🎁 Hộp Quà Biếu Cao Cấp Hoàng Gia
                </button>
              </li>
              <li>
                <button onClick={onOpenAIModal} className="text-amber-400 hover:underline font-bold flex items-center gap-1">
                  ✨ Nhờ AI Tư Vấn Chọn Loại Nhanh
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Policy & FAQ Highlights */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm border-b border-stone-800 pb-2">
              Cam Kết & Chính Sách
            </h4>
            <ul className="space-y-2 text-stone-400 font-medium">
              <li className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-500 shrink-0" /> Free ship đơn hàng từ 300.000đ
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> Cam kết 100% không hôi dầu, vỡ
              </li>
              <li className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500 shrink-0" /> 1 Đổi 1 hoàn tiền trong 7 ngày
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm border-b border-stone-800 pb-2">
              Liên Hệ Nhà Vườn
            </h4>
            <div className="space-y-2 text-stone-400 font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Thôn 3, Xã Đức Liễu, Huyện Bù Đăng, Tỉnh Bình Phước</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Hotline/Zalo đặt hàng: <strong className="text-white">0988.234.567</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Email: lienhe@hatdieubinhphuoc.vn</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion Section */}
        <div className="pt-8 border-t border-stone-800 space-y-4">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">
            ❓ Câu Hỏi Thường Gặp (FAQs)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-1">
                <p className="font-bold text-amber-400">Q: {faq.question}</p>
                <p className="text-stone-300 font-light leading-relaxed">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
          <p>© 2026 Nông Sản Hạt Điều Bình Phước. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Đặc sản chính gốc Bình Phước <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> Vị ngon đậm đà truyền thống
          </p>
        </div>
      </div>
    </footer>
  );
};
