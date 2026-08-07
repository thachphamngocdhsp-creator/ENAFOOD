import React, { useState } from 'react';
import { Product, WeightOption, Language } from '../types';
import { Star, ShoppingCart, Eye, Check, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface ProductCardProps {
  product: Product;
  language: Language;
  onAddToCart: (product: Product, weight: WeightOption) => void;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language,
  onAddToCart,
  onOpenDetail,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(
    product.weights[0]?.weight
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentWeightOption =
    product.weights.find((w) => w.weight === selectedWeight) || product.weights[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedWeight);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const name = language === 'vi' ? product.name : product.nameEn;
  const shortDesc = language === 'vi' ? product.shortDescription : product.shortDescriptionEn;
  const origin = language === 'vi' ? product.origin : product.originEn;

  const discountPercent = currentWeightOption.originalPrice
    ? Math.round(
        ((currentWeightOption.originalPrice - currentWeightOption.price) /
          currentWeightOption.originalPrice) *
          100
      )
    : 0;

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      {/* Image & Badges */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        <img
          src={product.images[0]}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isBestSeller && (
            <span className="bg-amber-600 text-white font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
              🔥 {language === 'vi' ? 'Bán Chạy' : 'Best Seller'}
            </span>
          )}
          {product.grade && (
            <span className="bg-stone-900/90 text-amber-300 font-extrabold text-[10px] px-2 py-0.5 rounded-md backdrop-blur-xs">
              {product.grade}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-rose-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-md">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Quick View Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetail(product);
          }}
          className="absolute bottom-2.5 right-2.5 p-2 bg-white/90 hover:bg-white text-stone-700 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          title={t.viewDetails}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Origin & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="truncate max-w-[150px] font-medium text-amber-800">
              📍 {origin.split(',')[0]}
            </span>
            <div className="flex items-center gap-1 font-semibold text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-stone-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-stone-900 text-sm sm:text-base line-clamp-2 group-hover:text-amber-800 transition-colors leading-snug">
            {name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-2 mt-1 font-light leading-relaxed">
            {shortDesc}
          </p>

          {/* Specs Highlights */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-[10px] bg-stone-100 text-stone-700 font-semibold px-2 py-0.5 rounded-md">
              💧 {t.moisture}: {product.specifications.moisture}
            </span>
            <span className="text-[10px] bg-amber-50 text-amber-900 font-semibold px-2 py-0.5 rounded-md">
              🛡️ {product.specifications.certifications[0]}
            </span>
          </div>
        </div>

        {/* Weight Selector Pills */}
        <div className="pt-1">
          <div className="text-[10px] font-bold text-stone-400 mb-1 uppercase tracking-wider">
            {t.weightOptions}:
          </div>
          <div className="flex flex-wrap gap-1">
            {product.weights.map((w) => (
              <button
                key={w.weight}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWeight(w.weight);
                }}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all ${
                  selectedWeight === w.weight
                    ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-2xs'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300 bg-white'
                }`}
              >
                {w.weight}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing & Add Button */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-base sm:text-lg font-extrabold text-amber-900 leading-tight">
              {currentWeightOption.price.toLocaleString('vi-VN')}đ
            </div>
            {currentWeightOption.originalPrice && (
              <div className="text-xs text-stone-400 line-through">
                {currentWeightOption.originalPrice.toLocaleString('vi-VN')}đ
              </div>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-600 hover:bg-amber-700 text-white'
            }`}
          >
            {addedAnimation ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
            <span>{addedAnimation ? (language === 'vi' ? 'Đã Thêm!' : 'Added!') : t.addToCart}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
