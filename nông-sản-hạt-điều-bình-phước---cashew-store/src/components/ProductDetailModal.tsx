import React, { useState } from 'react';
import { Product, WeightOption, Language } from '../types';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw, CheckCircle2, Flame, Award, FileSpreadsheet } from 'lucide-react';
import { REVIEWS } from '../data/reviews';
import { TRANSLATIONS } from '../data/translations';

interface ProductDetailModalProps {
  product: Product | null;
  language: Language;
  onClose: () => void;
  onAddToCart: (product: Product, weight: WeightOption, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  language,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const t = TRANSLATIONS[language];
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(
    product.weights[0]?.weight
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'specs' | 'nutrition'>('info');

  const currentOption =
    product.weights.find((w) => w.weight === selectedWeight) || product.weights[0];

  const name = language === 'vi' ? product.name : product.nameEn;
  const description = language === 'vi' ? product.description : product.descriptionEn;
  const origin = language === 'vi' ? product.origin : product.originEn;
  const processing = language === 'vi' ? product.processingMethod : product.processingMethodEn;

  const handleAddToCart = () => {
    onAddToCart(product, selectedWeight, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 border border-stone-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 lg:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Gallery Image */}
            <div className="space-y-3">
              <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner">
                <img
                  src={product.images[0]}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badges / Certifications */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold text-stone-600">
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 flex flex-col items-center">
                  <Flame className="w-4 h-4 text-amber-600 mb-1" />
                  <span className="truncate max-w-full text-[10px]">{processing}</span>
                </div>
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col items-center text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
                  <span className="text-[10px]">{product.specifications.certifications[0]}</span>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 border border-stone-200 flex flex-col items-center">
                  <Award className="w-4 h-4 text-stone-600 mb-1" />
                  <span className="text-[10px] font-bold">{product.grade || 'Export Grade'}</span>
                </div>
              </div>
            </div>

            {/* Info & Purchase Options */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 mb-1">
                  <span>📍 {t.origin}: {origin}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug">
                  {name}
                </h2>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold ml-1 text-stone-800">{product.rating}</span>
                  </div>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-500">{product.reviewCount} {language === 'vi' ? 'Đánh giá' : 'Reviews'}</span>
                </div>
              </div>

              {/* Price Box */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-stone-500 block uppercase font-semibold">
                    {language === 'vi' ? 'Giá Theo Trọng Lượng Đã Chọn:' : 'Price for Selected Size:'}
                  </span>
                  <div className="text-2xl font-black text-amber-900">
                    {currentOption.price.toLocaleString('vi-VN')}đ
                  </div>
                </div>
                {currentOption.originalPrice && (
                  <span className="text-sm text-stone-400 line-through font-medium">
                    {currentOption.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                )}
              </div>

              {/* Weight Options */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block uppercase tracking-wider">
                  {t.weightOptions}:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.weights.map((w) => (
                    <button
                      key={w.weight}
                      onClick={() => setSelectedWeight(w.weight)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                        selectedWeight === w.weight
                          ? 'border-amber-600 bg-amber-50 text-amber-950 ring-2 ring-amber-500/20 shadow-xs'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div>{w.weight}</div>
                      <div className="text-[11px] text-amber-700 font-extrabold mt-0.5">
                        {w.price.toLocaleString('vi-VN')}đ
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white shadow-2xs font-bold text-stone-700 hover:bg-stone-100"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-stone-900 text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white shadow-2xs font-bold text-stone-700 hover:bg-stone-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.addToCart}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Details Tabs: Info, Specs, Nutrition */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <div className="flex border-b border-stone-200 gap-4 text-sm font-bold">
              <button
                onClick={() => setActiveTab('info')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'info'
                    ? 'border-amber-600 text-amber-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {language === 'vi' ? 'Mô Tả Chi Tiết' : 'Detailed Description'}
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'specs'
                    ? 'border-amber-600 text-amber-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>{language === 'vi' ? 'Thông Số Xuất Khẩu B2B' : 'B2B Technical Specs'}</span>
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'nutrition'
                    ? 'border-amber-600 text-amber-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {language === 'vi' ? 'Giá Trị Dinh Dưỡng' : 'Nutrition Facts'}
              </button>
            </div>

            {activeTab === 'info' && (
              <div className="text-xs text-stone-600 leading-relaxed space-y-3">
                <p>{description}</p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div><strong>{t.moisture}:</strong> {product.specifications.moisture}</div>
                <div><strong>{t.brokenRate}:</strong> {product.specifications.brokenRate}</div>
                <div><strong>{t.foreignMatter}:</strong> {product.specifications.foreignMatter}</div>
                <div><strong>{t.shelfLife}:</strong> {product.specifications.shelfLife}</div>
                <div className="sm:col-span-2"><strong>{t.packaging}:</strong> {product.specifications.packaging}</div>
                <div className="sm:col-span-2 flex items-center gap-2">
                  <strong>{t.certifications}:</strong>
                  <div className="flex gap-1">
                    {product.specifications.certifications.map(c => (
                      <span key={c} className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-md text-[10px]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                  <div className="text-stone-500">Calories</div>
                  <div className="font-bold text-amber-900 mt-1">{product.nutritionInfo.calories}</div>
                </div>
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                  <div className="text-stone-500">Protein</div>
                  <div className="font-bold text-amber-900 mt-1">{product.nutritionInfo.protein}</div>
                </div>
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                  <div className="text-stone-500">Fat</div>
                  <div className="font-bold text-amber-900 mt-1">{product.nutritionInfo.fat}</div>
                </div>
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                  <div className="text-stone-500">Carbs</div>
                  <div className="font-bold text-amber-900 mt-1">{product.nutritionInfo.carbs}</div>
                </div>
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                  <div className="text-stone-500">Fiber</div>
                  <div className="font-bold text-amber-900 mt-1">{product.nutritionInfo.fiber}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
