import React from 'react';
import { Language } from '../types';
import { 
  Building2, Globe2, ShieldCheck, Factory, Award, CheckCircle2, 
  Package, PhoneCall, Mail, MapPin, ExternalLink, Sparkles, Target, 
  Layers, Users2, TrendingUp, HelpCircle
} from 'lucide-react';

interface AboutEnaGreenProps {
  language: Language;
}

export const AboutEnaGreen: React.FC<AboutEnaGreenProps> = ({ language }) => {
  const isVi = language === 'vi';

  return (
    <div className="space-y-10 py-2 max-w-7xl mx-auto">
      {/* Header Title Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
          <Building2 className="w-3.5 h-3.5 text-amber-700" />
          <span>ENA GREEN CO., LTD — {isVi ? 'Thành viên của ENA GROUP' : 'Member of ENA GROUP'}</span>
        </div>
        
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
          {isVi 
            ? 'Hồ Sơ Doanh Nghiệp & Năng Lực Xuất Khẩu ENA GREEN' 
            : 'ENA GREEN Corporate Profile & Export Capabilities'}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-medium">
          {isVi 
            ? 'Xuất khẩu hạt điều, gia vị & thực phẩm cao cấp từ Việt Nam' 
            : 'Exporting Premium Cashew Nuts, Spices & Food Products from Vietnam'}
        </p>
      </div>

      {/* SECTION 1: TRANG CHỦ (HOMEPAGE OVERVIEW) */}
      <section className="bg-gradient-to-br from-amber-900 via-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-800/40 relative overflow-hidden space-y-6">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="text-xs font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-2">
            <span className="bg-amber-400 text-stone-900 px-2 py-0.5 rounded font-black text-[11px]">1</span>
            <span>{isVi ? 'Trang chủ (Homepage)' : 'Homepage Overview'}</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black leading-snug text-amber-50">
            {isVi 
              ? 'Đối tác xuất khẩu hạt điều, gia vị & thực phẩm đáng tin cậy từ Việt Nam' 
              : 'Reliable Export Partner for Cashew Nuts, Spices & Food Products from Vietnam'}
          </h2>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-4xl">
            {isVi ? (
              <>
                Là thành viên của <strong className="text-amber-300 font-bold">ENA GROUP</strong>, ENA GREEN cung cấp các sản phẩm nông sản chất lượng cao với chuỗi cung ứng ổn định và tiêu chuẩn quốc tế.
              </>
            ) : (
              <>
                As a member of <strong className="text-amber-300 font-bold">ENA GROUP</strong>, ENA GREEN provides high-quality agricultural products with a stable supply chain and international standards.
              </>
            )}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <a href="#san-pham" className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs shadow-md transition-all inline-flex items-center gap-2">
              <span>👉 {isVi ? 'Xem sản phẩm' : 'View Products'}</span>
            </a>
            <a href="#lien-he" className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs border border-stone-700 transition-all inline-flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>{isVi ? 'Liên hệ ngay' : 'Contact Us'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2 & 3: GIỚI THIỆU ENA GREEN & ENA GROUP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECTION 2: GIỚI THIỆU ENA GREEN */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
          <div className="text-xs font-extrabold uppercase tracking-widest text-amber-800 flex items-center gap-2">
            <span className="bg-amber-800 text-white px-2 py-0.5 rounded font-black text-[11px]">2</span>
            <span>{isVi ? 'Giới thiệu ENA GREEN' : 'About ENA GREEN'}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
            {isVi 
              ? 'Công ty sản xuất, chế biến & thương mại quốc tế nông sản' 
              : 'Processing & International Agriculture Trading Company'}
          </h3>

          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            {isVi 
              ? 'ENA GREEN là công ty thành viên của ENA GROUP, hoạt động trong lĩnh vực sản xuất, chế biến và thương mại quốc tế nông sản.' 
              : 'ENA GREEN is a subsidiary of ENA GROUP, operating in the production, processing, and international trading of agricultural commodities.'}
          </p>

          <div className="space-y-2 pt-1">
            <p className="text-xs font-bold text-stone-900">
              {isVi ? 'Kế thừa nền tảng từ ENA GROUP, ENA GREEN sở hữu:' : 'Inheriting strong foundations from ENA GROUP, ENA GREEN possesses:'}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-stone-700">
              <li className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{isVi ? 'Nguồn lực mạnh mẽ' : 'Strong Resources'}</span>
              </li>
              <li className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{isVi ? 'Kinh nghiệm vận hành' : 'Operational Expertise'}</span>
              </li>
              <li className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{isVi ? 'Mạng lưới đối tác' : 'Global Network'}</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-800 space-y-2">
            <p className="font-bold text-stone-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-700" />
              <span>{isVi ? 'Chuỗi cung ứng khép kín:' : 'Closed-Loop Supply Chain:'}</span>
            </p>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-stone-700">
              <span className="px-2.5 py-1 bg-white rounded-lg border border-stone-200 shadow-2xs">1. {isVi ? 'Nguyên liệu' : 'Raw Material'}</span>
              <span>→</span>
              <span className="px-2.5 py-1 bg-white rounded-lg border border-stone-200 shadow-2xs">2. {isVi ? 'Sản xuất' : 'Processing'}</span>
              <span>→</span>
              <span className="px-2.5 py-1 bg-white rounded-lg border border-stone-200 shadow-2xs">3. {isVi ? 'Kiểm soát chất lượng' : 'Quality Control'}</span>
              <span>→</span>
              <span className="px-2.5 py-1 bg-white rounded-lg border border-stone-200 shadow-2xs">4. {isVi ? 'Xuất khẩu' : 'Global Export'}</span>
            </div>
            <p className="text-stone-600 text-[11px] pt-1">
              {isVi 
                ? 'Đảm bảo sản phẩm ổn định, chất lượng cao cho khách hàng toàn cầu. ENA GREEN hướng đến trở thành đối tác lâu dài và đáng tin cậy cho các nhà nhập khẩu quốc tế.' 
                : 'Ensuring stable and top-tier products for worldwide clients. ENA GREEN aims to be a long-term trusted partner for international importers.'}
            </p>
          </div>
        </section>

        {/* SECTION 3: ENA GROUP - CÔNG TY MẸ */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
          <div className="text-xs font-extrabold uppercase tracking-widest text-amber-800 flex items-center gap-2">
            <span className="bg-amber-800 text-white px-2 py-0.5 rounded font-black text-[11px]">3</span>
            <span>{isVi ? 'ENA GROUP – Công ty mẹ' : 'ENA GROUP – Parent Company'}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
            {isVi 
              ? 'Hệ sinh thái doanh nghiệp Nông nghiệp, Thực phẩm & Thương mại Quốc tế' 
              : 'Business Ecosystem in Agriculture, Food & International Trade'}
          </h3>

          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            {isVi 
              ? 'ENA GROUP là hệ sinh thái doanh nghiệp hoạt động trong lĩnh vực nông nghiệp, thực phẩm và thương mại quốc tế. ENA GREEN là đơn vị xuất khẩu chiến lược của tập đoàn.' 
              : 'ENA GROUP is an enterprise ecosystem operating in agriculture, food, and international trade. ENA GREEN serves as the strategic export arm of the group.'}
          </p>

          <div className="space-y-2 pt-1">
            <p className="text-xs font-bold text-stone-900">
              {isVi ? 'Các lợi thế chiến lược từ tập đoàn:' : 'Strategic advantages provided by the group:'}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
              <li className="p-3 bg-stone-50 rounded-xl border border-stone-200 font-medium flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">{isVi ? 'Năng lực cung ứng quy mô lớn' : 'Large Supply Capacity'}</strong>
                  <span className="text-[11px] text-stone-500">{isVi ? 'Đáp ứng các đơn hàng FCL lớn' : 'Handling large FCL shipments'}</span>
                </div>
              </li>

              <li className="p-3 bg-stone-50 rounded-xl border border-stone-200 font-medium flex items-start gap-2">
                <Factory className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">{isVi ? 'Nguồn nguyên liệu ổn định' : 'Stable Raw Sources'}</strong>
                  <span className="text-[11px] text-stone-500">{isVi ? 'Thu mua trực tiếp nông dân' : 'Direct farm sourcing'}</span>
                </div>
              </li>

              <li className="p-3 bg-stone-50 rounded-xl border border-stone-200 font-medium flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">{isVi ? 'Uy tín cao với đối tác' : 'High Global Reputation'}</strong>
                  <span className="text-[11px] text-stone-500">{isVi ? 'Bảo chứng từ tập đoàn ENA' : 'Backed by ENA GROUP'}</span>
                </div>
              </li>

              <li className="p-3 bg-stone-50 rounded-xl border border-stone-200 font-medium flex items-start gap-2">
                <Globe2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">{isVi ? 'Phát triển bền vững, dài hạn' : 'Sustainable Growth'}</strong>
                  <span className="text-[11px] text-stone-500">{isVi ? 'Đầu tư công nghệ lâu dài' : 'Long-term technology focus'}</span>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* SECTION 4 & 5: TẦM NHÌN, SỨ MỆNH & GIÁ TRỊ CỐT LÕI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SECTION 4: TẦM NHÌN & SỨ MỆNH */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
          <div className="text-xs font-extrabold uppercase tracking-widest text-amber-800 flex items-center gap-2">
            <span className="bg-amber-800 text-white px-2 py-0.5 rounded font-black text-[11px]">4</span>
            <span>{isVi ? 'Tầm nhìn & Sứ mệnh' : 'Vision & Mission'}</span>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-1.5">
              <h4 className="font-extrabold text-amber-900 text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-700" />
                <span>{isVi ? 'Tầm nhìn' : 'Vision'}</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                {isVi 
                  ? 'Trở thành thương hiệu uy tín toàn cầu trong lĩnh vực xuất khẩu hạt điều, gia vị và thực phẩm, đại diện cho chất lượng nông sản Việt Nam.' 
                  : 'To become a trusted global brand in the export of cashew nuts, spices, and food products, representing the fine quality of Vietnamese agriculture.'}
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>{isVi ? 'Sứ mệnh' : 'Mission'}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span>{isVi ? 'Cung cấp sản phẩm chất lượng cao đạt tiêu chuẩn quốc tế' : 'Provide high-quality products meeting international standards'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span>{isVi ? 'Nâng cao giá trị nông sản Việt Nam trên thị trường toàn cầu' : 'Elevate the value of Vietnamese agricultural produce globally'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span>{isVi ? 'Xây dựng chuỗi cung ứng minh bạch và bền vững trong hệ sinh thái ENA GROUP' : 'Build a transparent and sustainable supply chain in ENA GROUP'}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5: GIÁ TRỊ CỐT LÕI */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
          <div className="text-xs font-extrabold uppercase tracking-widest text-amber-800 flex items-center gap-2">
            <span className="bg-amber-800 text-white px-2 py-0.5 rounded font-black text-[11px]">5</span>
            <span>{isVi ? 'Giá trị cốt lõi' : 'Core Values'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <div className="font-black text-amber-800 text-sm">{isVi ? '1. Chất lượng' : '1. Quality'}</div>
              <p className="text-stone-600 font-medium">{isVi ? 'Cam kết tiêu chuẩn cao nhất' : 'Uncompromising high standards'}</p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <div className="font-black text-amber-800 text-sm">{isVi ? '2. Uy tín' : '2. Prestige'}</div>
              <p className="text-stone-600 font-medium">{isVi ? 'Hợp tác lâu dài, đáng tin cậy' : 'Long-term trusted partnership'}</p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <div className="font-black text-amber-800 text-sm">{isVi ? '3. Trách nhiệm' : '3. Responsibility'}</div>
              <p className="text-stone-600 font-medium">{isVi ? 'Với khách hàng & cộng đồng' : 'To customers & community'}</p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <div className="font-black text-amber-800 text-sm">{isVi ? '4. Bền vững' : '4. Sustainability'}</div>
              <p className="text-stone-600 font-medium">{isVi ? 'Phát triển cùng hệ sinh thái' : 'Growth with ecosystem'}</p>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 6: SẢN PHẨM (FULL PORTFOLIO BREAKDOWN) */}
      <section id="san-pham" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
        <div className="text-xs font-extrabold uppercase tracking-widest text-amber-800 flex items-center gap-2">
          <span className="bg-amber-800 text-white px-2 py-0.5 rounded font-black text-[11px]">6</span>
          <span>{isVi ? 'Sản phẩm xuất khẩu chính' : 'Main Export Product Lines'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 6.1 Hạt điều xuất khẩu (Cashew Kernels) */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌰</span>
              <h4 className="font-extrabold text-stone-900 text-sm">
                6.1 {isVi ? 'Hạt điều xuất khẩu (Cashew Kernels)' : 'Export Cashew Kernels'}
              </h4>
            </div>
            <p className="text-xs text-stone-600">
              {isVi 
                ? 'Cung cấp đầy đủ các dòng nhân hạt điều đạt tiêu chuẩn quốc tế, phù hợp cho nhà nhập khẩu, nhà chế biến và hệ thống bán lẻ.' 
                : 'Complete range of cashew kernels meeting global standards for importers, processors, and retail chains.'}
            </p>

            <div className="space-y-2 text-xs text-stone-700">
              <div>
                <strong className="text-amber-900 block">{isVi ? '• Nhân trắng nguyên hạt (White Whole – WW):' : '• White Whole (WW):'}</strong>
                <span className="text-[11px] text-stone-600">W180 (Lớn nhất, cao cấp), W210 (Jumbo), W240 (Kích thước lớn), W320 (Tiêu chuẩn, bán chạy nhất), W450 (Kích thước nhỏ, giá cạnh tranh).</span>
              </div>

              <div>
                <strong className="text-amber-900 block">{isVi ? '• Nhân điều cháy xém (Scorched Whole – SW):' : '• Scorched Whole (SW):'}</strong>
                <span className="text-[11px] text-stone-600">SW180, SW210, SW240, SW320 (Màu vàng nâu nhẹ, giá tốt hơn WW).</span>
              </div>

              <div>
                <strong className="text-amber-900 block">{isVi ? '• Nhân điều vỡ (Pieces):' : '• Broken Pieces:'}</strong>
                <span className="text-[11px] text-stone-600">LP (Miếng lớn), SP (Miếng nhỏ), BB (Vụn nhỏ), DW (Nhân nguyên không hoàn hảo).</span>
              </div>

              <div>
                <strong className="text-amber-900 block">{isVi ? '• Phân loại đặc biệt:' : '• Special Grades:'}</strong>
                <span className="text-[11px] text-stone-600">Hạt điều hữu cơ (Organic), Hạt điều thô (Raw), Sản phẩm theo yêu cầu.</span>
              </div>

              <div className="pt-1 border-t border-amber-200/60 text-[11px] text-stone-600">
                <strong>{isVi ? 'Thông số kỹ thuật:' : 'Technical Specs:'}</strong> Độ ẩm ≤ 5%, Tạp chất ≤ 0.5%, Đóng gói: Hút chân không / Lon thiếc / Thùng carton / OEM.
              </div>
            </div>
          </div>

          {/* 6.2 Hạt điều chế biến */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🥜</span>
              <h4 className="font-extrabold text-stone-900 text-sm">
                6.2 {isVi ? 'Hạt điều chế biến' : 'Processed Cashews'}
              </h4>
            </div>
            <p className="text-xs text-stone-600">
              {isVi 
                ? 'Sản phẩm hạt điều rang củi, tẩm vị thơm ngon đóng gói bán lẻ & OEM cho các thương hiệu quốc tế.' 
                : 'Wood roasted and gourmet flavored cashews for retail distribution and international private label.'}
            </p>

            <ul className="space-y-1.5 text-xs text-stone-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>{isVi ? 'Hạt điều rang muối (Vỏ lụa & Tách vỏ)' : 'Salted Roasted Cashews (With Husk & Skinless)'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>{isVi ? 'Hạt điều tẩm vị (mật ong, wasabi, phô mai, tỏi ớt...)' : 'Flavored Cashews (Honey, Wasabi, Cheese, Garlic Chili...)'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>{isVi ? 'Hỗn hợp hạt (Mixed nuts & Trail mixes)' : 'Mixed Nuts & Trail Mixes'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>{isVi ? 'Đóng gói OEM / Private Label theo yêu cầu' : 'OEM / Private Label Packaging on request'}</span>
              </li>
            </ul>
          </div>

          {/* 6.3 Gia vị (Spices) */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌶️</span>
              <h4 className="font-extrabold text-stone-900 text-sm">
                6.3 {isVi ? 'Gia vị xuất khẩu (Spices)' : 'Export Spices'}
              </h4>
            </div>

            <ul className="space-y-1.5 text-xs text-stone-700">
              <li>• {isVi ? 'Tiêu đen / Tiêu trắng (Black / White Pepper)' : 'Black / White Pepper'}</li>
              <li>• {isVi ? 'Ớt khô / Ớt bột (Dried Chili / Chili Powder)' : 'Dried Chili / Chili Powder'}</li>
              <li>• {isVi ? 'Quế & Hồi xuất khẩu (Cinnamon & Star Anise)' : 'Cinnamon & Star Anise'}</li>
              <li>• {isVi ? 'Gừng, tỏi sấy (Dried Ginger & Garlic)' : 'Dried Ginger & Garlic'}</li>
              <li>• {isVi ? 'Gia vị xay & phối trộn theo yêu cầu (Custom Spice Blends)' : 'Custom Spice Blends'}</li>
            </ul>

            <div className="p-2.5 bg-amber-100/60 rounded-xl text-[11px] font-bold text-amber-900 border border-amber-200">
              👉 {isVi ? 'Hỗ trợ: Xuất khẩu số lượng lớn – OEM – Private Label' : 'Support: Bulk Export – OEM – Private Label'}
            </div>
          </div>

          {/* 6.4 Các sản phẩm khác – Hạt & Bánh kẹo */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🥭🍿</span>
              <h4 className="font-extrabold text-stone-900 text-sm">
                6.4 {isVi ? 'Các sản phẩm khác – Hạt & Bánh kẹo & Trái cây sấy' : 'Other Nuts, Snacks & Dried Fruits'}
              </h4>
            </div>

            <div className="space-y-2 text-xs text-stone-700">
              <div>
                <strong className="text-stone-900 block">• {isVi ? 'Các loại hạt:' : 'Other Nuts:'}</strong>
                <span>{isVi ? 'Hạnh nhân, Óc chó, Mắc ca, Đậu phộng, Hỗn hợp hạt.' : 'Almonds, Walnuts, Macadamia, Peanuts, Mixed Nuts.'}</span>
              </div>

              <div>
                <strong className="text-stone-900 block">• {isVi ? 'Snack, Bánh kẹo & Trái cây sấy:' : 'Snacks & Dried Fruit:'}</strong>
                <span>{isVi ? 'Xoài sấy dẻo, Mít sấy giòn, Chuối, Khoai môn, Snack từ hạt, Bánh kẹo đóng gói, Bộ quà tặng, OEM.' : 'Soft dried mango, crispy jackfruit, banana chips, taro, nut snacks, gift sets, OEM.'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 & 8: NĂNG LỰC, CHẤT LƯỢNG & THỊ TRƯỜNG */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECTION 7: NĂNG LỰC & CHẤT LƯỢNG */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
          <div className="text-xs font-extrabold uppercase tracking-widest text-amber-800 flex items-center gap-2">
            <span className="bg-amber-800 text-white px-2 py-0.5 rounded font-black text-[11px]">7</span>
            <span>{isVi ? 'Năng lực & Chất lượng' : 'Capacity & Quality Control'}</span>
          </div>

          <p className="text-xs text-stone-600">
            {isVi ? 'Với sự hỗ trợ từ ENA GROUP, ENA GREEN sở hữu:' : 'Supported by ENA GROUP, ENA GREEN operates with:'}
          </p>

          <ul className="space-y-2 text-xs text-stone-800">
            <li className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-xl border border-stone-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isVi ? 'Nguồn nguyên liệu ổn định thu hoạch tại Bình Phước' : 'Stable raw material sourced directly from Binh Phuoc'}</span>
            </li>
            <li className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-xl border border-stone-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isVi ? 'Hệ thống nhà máy & dây chuyền sản xuất hiện đại' : 'Modern factory facility and automated processing line'}</span>
            </li>
            <li className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-xl border border-stone-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isVi ? 'Kiểm soát chất lượng nghiêm ngặt từng lô hàng' : 'Strict batch-by-batch quality control'}</span>
            </li>
            <li className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-xl border border-stone-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isVi ? 'Khả năng đáp ứng đơn hàng lớn và dài hạn' : 'Capacity to handle large and long-term FCL contracts'}</span>
            </li>
          </ul>

          <div className="pt-2">
            <div className="text-xs font-bold text-stone-900 mb-2">{isVi ? 'Chứng nhận quốc tế:' : 'Global Certifications:'}</div>
            <div className="flex flex-wrap gap-2 text-xs font-extrabold text-emerald-800">
              <span className="px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-200">✓ HACCP</span>
              <span className="px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-200">✓ ISO 22000</span>
              <span className="px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-200">✓ FDA Registered</span>
              <span className="px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-200">✓ HALAL / EU</span>
            </div>
          </div>
        </section>

        {/* SECTION 8: THỊ TRƯỜNG XUẤT KHẨU */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
          <div className="text-xs font-extrabold uppercase tracking-widest text-amber-800 flex items-center gap-2">
            <span className="bg-amber-800 text-white px-2 py-0.5 rounded font-black text-[11px]">8</span>
            <span>{isVi ? 'Thị trường xuất khẩu' : 'Global Export Markets'}</span>
          </div>

          <p className="text-xs text-stone-600">
            {isVi ? 'ENA GREEN tự hào phục vụ các đối tác nhập khẩu tại:' : 'ENA GREEN proudly serves partners across:'}
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 text-center space-y-1">
              <div className="text-2xl">🇺🇸</div>
              <strong className="text-amber-900 block font-bold">{isVi ? 'Mỹ (USA)' : 'USA'}</strong>
              <span className="text-[11px] text-stone-500">{isVi ? 'Đạt chuẩn FDA' : 'FDA Compliant'}</span>
            </div>

            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 text-center space-y-1">
              <div className="text-2xl">🇪🇺</div>
              <strong className="text-amber-900 block font-bold">{isVi ? 'Châu Âu (EU)' : 'Europe (EU)'}</strong>
              <span className="text-[11px] text-stone-500">{isVi ? 'Chuẩn ISO/HACCP' : 'EU Standards'}</span>
            </div>

            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 text-center space-y-1">
              <div className="text-2xl">🇦🇪</div>
              <strong className="text-amber-900 block font-bold">{isVi ? 'Trung Đông' : 'Middle East'}</strong>
              <span className="text-[11px] text-stone-500">{isVi ? 'UAE, Saudi Arabia' : 'Halal Certified'}</span>
            </div>

            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 text-center space-y-1">
              <div className="text-2xl">🇯🇵 🇰🇷 🇨🇳</div>
              <strong className="text-amber-900 block font-bold">{isVi ? 'Châu Á' : 'Asia'}</strong>
              <span className="text-[11px] text-stone-500">{isVi ? 'Nhật, Hàn, Trung Quốc' : 'Japan, Korea, China'}</span>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 9 & 10: DỊCH VỤ & TẠI SAO CHỌN ENA GREEN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECTION 9: DỊCH VỤ */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
          <div className="text-xs font-extrabold uppercase tracking-widest text-amber-800 flex items-center gap-2">
            <span className="bg-amber-800 text-white px-2 py-0.5 rounded font-black text-[11px]">9</span>
            <span>{isVi ? 'Dịch vụ xuất khẩu' : 'Export Services'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <strong className="text-stone-900 block font-bold">{isVi ? '1. Xuất khẩu số lượng lớn (Bulk Export)' : '1. Bulk Export'}</strong>
              <span className="text-stone-500 text-[11px]">{isVi ? 'Flexi-bag 22.68kg, Lon thiếc 11.34kg, Carton 10kg.' : 'Flexi-bag 22.68kg, Tin 11.34kg, Carton 10kg.'}</span>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <strong className="text-stone-900 block font-bold">{isVi ? '2. OEM / Private Label' : '2. OEM / Private Label'}</strong>
              <span className="text-stone-500 text-[11px]">{isVi ? 'In ấn logo, thiết kế lon PET, túi zip theo yêu cầu.' : 'Custom packaging design with client branding.'}</span>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <strong className="text-stone-900 block font-bold">{isVi ? '3. Tùy chỉnh sản phẩm & bao bì' : '3. Custom Formulas & Packaging'}</strong>
              <span className="text-stone-500 text-[11px]">{isVi ? 'Điều chỉnh công thức tẩm vị và kích thước quy cách.' : 'Adjusting recipes and package dimensions.'}</span>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <strong className="text-stone-900 block font-bold">{isVi ? '4. Hỗ trợ chứng từ xuất khẩu' : '4. Export Documentation'}</strong>
              <span className="text-stone-500 text-[11px]">{isVi ? 'C/O, Phytosanitary, Fumigation, Health Certificate.' : 'Full C/O, Phytosanitary, Health Cert support.'}</span>
            </div>
          </div>
        </section>

        {/* SECTION 10: TẠI SAO CHỌN ENA GREEN */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
          <div className="text-xs font-extrabold uppercase tracking-widest text-amber-800 flex items-center gap-2">
            <span className="bg-amber-800 text-white px-2 py-0.5 rounded font-black text-[11px]">10</span>
            <span>{isVi ? 'Tại sao chọn ENA GREEN' : 'Why Choose ENA GREEN'}</span>
          </div>

          <ul className="space-y-2 text-xs text-stone-800">
            <li className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 flex items-center gap-2.5 font-semibold">
              <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">1</span>
              <span>{isVi ? 'Thành viên của ENA GROUP – nền tảng uy tín vững chắc' : 'Member of ENA GROUP – solid corporate foundation'}</span>
            </li>
            <li className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 flex items-center gap-2.5 font-semibold">
              <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">2</span>
              <span>{isVi ? 'Danh mục sản phẩm đa dạng (Nhân điều, Tẩm vị, Gia vị, Trái cây sấy)' : 'Diverse product portfolio (Kernels, Spiced, Spices, Dried Fruit)'}</span>
            </li>
            <li className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 flex items-center gap-2.5 font-semibold">
              <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">3</span>
              <span>{isVi ? 'Nguồn cung ổn định & Giá thành xuất khẩu cạnh tranh' : 'Stable supply chain & competitive export pricing'}</span>
            </li>
            <li className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 flex items-center gap-2.5 font-semibold">
              <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">4</span>
              <span>{isVi ? 'Kinh nghiệm xuất khẩu quốc tế dày dặn tới >50 quốc gia' : 'Rich global export experience serving >50 countries'}</span>
            </li>
          </ul>
        </section>
      </div>

      {/* SECTION 11: LIÊN HỆ (CONTACT INFORMATION) */}
      <section id="lien-he" className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-xl space-y-6">
        <div className="text-xs font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-2">
          <span className="bg-amber-400 text-stone-950 px-2 py-0.5 rounded font-black text-[11px]">11</span>
          <span>{isVi ? 'Thông tin liên hệ' : 'Contact Information'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              ENA GREEN CO., LTD
            </h3>
            <p className="text-xs text-amber-300/90 font-semibold uppercase tracking-wider">
              ({isVi ? 'Thành viên của ENA GROUP' : 'Member of ENA GROUP'})
            </p>

            <div className="space-y-3 text-xs text-stone-300 pt-2">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>📍 <strong>{isVi ? 'Quốc gia:' : 'Location:'}</strong> Việt Nam</span>
              </div>

              <div className="flex items-center gap-3">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                <span>📞 <strong>Hotline/WhatsApp:</strong> (+84) xxx xxx xxx</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>✉️ <strong>Email:</strong> info@enagreen.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Globe2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>🌐 <strong>Website:</strong> www.enagreen.com</span>
              </div>
            </div>

            <div className="p-4 bg-stone-800/80 rounded-2xl border border-stone-700/80 text-xs text-amber-200 font-bold flex items-center gap-2">
              <span>👉</span>
              <span>
                {isVi 
                  ? 'Hợp tác cùng đối tác uy tín được bảo chứng bởi ENA GROUP' 
                  : 'Partner with a trusted enterprise backed by ENA GROUP'}
              </span>
            </div>
          </div>

          <div className="md:col-span-5 bg-stone-800/60 p-6 rounded-2xl border border-stone-700 space-y-3">
            <h4 className="font-bold text-amber-300 text-sm">{isVi ? 'Gửi Yêu Cầu Báo Giá Xuất Khẩu' : 'Request B2B Export Quote'}</h4>
            <form className="space-y-2 text-xs" onSubmit={(e) => { e.preventDefault(); alert(isVi ? 'Cảm ơn bạn! Yêu cầu liên hệ đã được gửi tới ENA GREEN.' : 'Thank you! Your quote inquiry has been submitted to ENA GREEN.'); }}>
              <input type="text" placeholder={isVi ? "Họ và tên / Name" : "Name"} className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:outline-hidden focus:border-amber-400" required />
              <input type="email" placeholder="Email" className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:outline-hidden focus:border-amber-400" required />
              <input type="tel" placeholder={isVi ? "Số điện thoại / WhatsApp" : "Phone / WhatsApp"} className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:outline-hidden focus:border-amber-400" required />
              <textarea placeholder={isVi ? "Sản phẩm quan tâm (W180, W320, Gia vị, Trái cây sấy, OEM...)" : "Inquiry details (W180, Spices, OEM...)"} rows={2} className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:outline-hidden focus:border-amber-400"></textarea>
              <button type="submit" className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black rounded-xl transition-all">
                {isVi ? 'Gửi Yêu Cầu Ngay' : 'Submit Export Request'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
