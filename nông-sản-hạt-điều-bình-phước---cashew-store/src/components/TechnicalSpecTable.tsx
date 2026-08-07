import React from 'react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ShieldCheck, FileSpreadsheet, Eye, ShoppingCart, CheckCircle } from 'lucide-react';

interface TechnicalSpecTableProps {
  products: Product[];
  language: Language;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, weight: any) => void;
}

export const TechnicalSpecTable: React.FC<TechnicalSpecTableProps> = ({
  products,
  language,
  onSelectProduct,
  onAddToCart,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden space-y-4 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div>
          <h3 className="text-lg font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-amber-700" />
            <span>{language === 'vi' ? 'Bảng Thông Số Kỹ Thuật & Tiêu Chuẩn Xuất Khẩu (B2B Spec Sheet)' : 'B2B Technical Specifications & Export Standards'}</span>
          </h3>
          <p className="text-xs text-stone-500">
            {language === 'vi' 
              ? 'Thông số đạt tiêu chuẩn AFI (Mỹ), VINACAS (Việt Nam) và EU Food Safety Standards'
              : 'Specifications strictly matching AFI (USA), VINACAS, and EU Food Safety Standards'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>HACCP • ISO 22000 • FDA</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
              <th className="py-3 px-3 min-w-[180px]">{language === 'vi' ? 'Sản Phẩm & Cấp Hạt' : 'Product & Grade'}</th>
              <th className="py-3 px-3">{t.origin}</th>
              <th className="py-3 px-3">{t.moisture}</th>
              <th className="py-3 px-3">{t.brokenRate}</th>
              <th className="py-3 px-3">{t.foreignMatter}</th>
              <th className="py-3 px-3 min-w-[160px]">{t.packaging}</th>
              <th className="py-3 px-3 min-w-[140px]">{t.certifications}</th>
              <th className="py-3 px-3 text-right min-w-[140px]">{language === 'vi' ? 'Giá Tham Khảo' : 'Price / Action'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.map((p) => {
              const name = language === 'vi' ? p.name : p.nameEn;
              const origin = language === 'vi' ? p.origin : p.originEn;
              return (
                <tr key={p.id} className="hover:bg-amber-50/50 transition-colors group">
                  <td className="py-3 px-3 font-medium">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={name}
                        className="w-10 h-10 rounded-lg object-cover shrink-0 border border-stone-200"
                      />
                      <div>
                        <span className="font-bold text-stone-900 group-hover:text-amber-800 transition-colors block leading-tight">
                          {name}
                        </span>
                        {p.grade && (
                          <span className="inline-block mt-0.5 text-[10px] bg-amber-100 text-amber-900 font-extrabold px-1.5 py-0.2 rounded-md">
                            {p.grade}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-stone-600 font-medium">
                    {origin}
                  </td>

                  <td className="py-3 px-3">
                    <span className="font-mono text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md font-semibold">
                      {p.specifications.moisture}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <span className="font-mono text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md font-semibold">
                      {p.specifications.brokenRate}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <span className="font-mono text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md font-semibold">
                      {p.specifications.foreignMatter}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-stone-600 text-[11px] leading-snug">
                    {p.specifications.packaging}
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex flex-wrap gap-1">
                      {p.specifications.certifications.map((cert) => (
                        <span key={cert} className="text-[9px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-1.5 py-0.2 rounded-md">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <div className="space-y-1">
                      <div className="font-extrabold text-amber-700 text-sm">
                        {p.price.toLocaleString('vi-VN')} đ
                      </div>
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(p)}
                          className="p-1.5 text-stone-600 hover:text-amber-800 bg-stone-100 hover:bg-amber-100 rounded-lg transition-all"
                          title={t.viewDetails}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onAddToCart(p, p.weights[0].weight)}
                          className="px-2 py-1 text-[11px] font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-all flex items-center gap-1 shadow-xs"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>{t.addToCart}</span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
