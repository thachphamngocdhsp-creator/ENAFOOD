import React, { useState } from 'react';
import { Product, WeightOption } from '../types';
import { Star, ShoppingCart, Eye, Check, ShieldAlert } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, weight: WeightOption) => void;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenDetail,
}) => {
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(
    product.weights[1]?.weight || product.weights[0].weight
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
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isBestSeller && (
            <span className="bg-amber-600 text-white font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
              🔥 Bán Chạy
            </span>
          )}
          {product.grade && (
            <span className="bg-stone-900/80 text-amber-300 font-semibold text-[10px] px-2 py-0.5 rounded-md backdrop-blur-xs">
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
          title="Xem nhanh chi tiết"
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
              📍 {product.origin.split(',')[0]}
            </span>
            <div className="flex items-center gap-1 font-semibold text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-stone-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-stone-900 text-sm sm:text-base line-clamp-2 group-hover:text-amber-800 transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-2 mt-1 font-light leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Weight Selector Pills */}
        <div className="pt-1">
          <div className="text-[11px] font-semibold text-stone-400 mb-1.5 uppercase tracking-wider">
            Chọn trọng lượng:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.weights.map((w) => (
              <button
                key={w.weight}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWeight(w.weight);
                }}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                  selectedWeight === w.weight
                    ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs'
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
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-600 hover:bg-amber-700 text-white'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Đã Thêm!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Chọn Mua</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
