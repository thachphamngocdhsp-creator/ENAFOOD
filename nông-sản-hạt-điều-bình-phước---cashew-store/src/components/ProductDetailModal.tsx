import React, { useState } from 'react';
import { Product, WeightOption, Review } from '../types';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw, CheckCircle2, Flame, Award } from 'lucide-react';
import { REVIEWS } from '../data/reviews';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, weight: WeightOption, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(
    product.weights[1]?.weight || product.weights[0].weight
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'nutrition' | 'reviews'>('info');

  const currentOption =
    product.weights.find((w) => w.weight === selectedWeight) || product.weights[0];

  const productReviews = REVIEWS.filter((r) => r.productId === product.id);

  const handleAddToCart = () => {
    onAddToCart(product, selectedWeight, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 border border-stone-100 max-h-[90vh] flex flex-col"
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
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badges / Certifications */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold text-stone-600">
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-200/60 flex flex-col items-center">
                  <Flame className="w-4 h-4 text-amber-600 mb-1" />
                  <span>{product.processingMethod}</span>
                </div>
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200/60 flex flex-col items-center text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
                  <span>OCOP 4 Sao</span>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 border border-stone-200 flex flex-col items-center">
                  <Award className="w-4 h-4 text-stone-600 mb-1" />
                  <span>{product.grade || 'Loại A1'}</span>
                </div>
              </div>
            </div>

            {/* Info & Purchase Options */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 mb-1">
                  <span>📍 Xuất xứ: {product.origin}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold ml-1 text-stone-800">{product.rating}</span>
                  </div>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-500">{product.reviewCount} Đánh giá đã xác thực</span>
                </div>
              </div>

              {/* Price Box */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-stone-500 block uppercase font-semibold">
                    Giá niêm yết ({selectedWeight})
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-900">
                    {currentOption.price.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                {currentOption.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    {currentOption.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                )}
              </div>

              {/* Weight Options */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  1. Chọn Quy Cách Trọng Lượng:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.weights.map((w) => (
                    <button
                      key={w.weight}
                      onClick={() => setSelectedWeight(w.weight)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                        selectedWeight === w.weight
                          ? 'border-amber-600 bg-amber-100/60 text-amber-950 ring-2 ring-amber-500/20 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <div className="font-bold">{w.weight}</div>
                      <div className="text-[11px] text-amber-800">{w.price.toLocaleString('vi-VN')}đ</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  2. Số Lượng Số Hũ/Gói:
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2 font-bold text-stone-600 hover:bg-stone-200"
                    >
                      -
                    </button>
                    <span className="px-4 font-bold text-stone-800">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2 font-bold text-stone-600 hover:bg-stone-200"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Còn hàng (Sẵn sàng giao)
                  </span>
                </div>
              </div>

              {/* Add To Cart & Buy Now */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-lg shadow-amber-900/20 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Thêm Vào Giỏ Hàng</span>
                </button>
              </div>

              {/* Service Guarantees */}
              <div className="pt-3 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-600" />
                  <span>Giao hỏa tốc 2H (Nội thành)</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-amber-600" />
                  <span>1 Đổi 1 trong 7 ngày</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Tabs: Information, Nutrition, Customer Reviews */}
          <div className="border-t border-stone-200 pt-6">
            <div className="flex border-b border-stone-200 gap-6 text-sm font-bold text-stone-500">
              <button
                onClick={() => setActiveTab('info')}
                className={`pb-3 border-b-2 transition-colors ${
                  activeTab === 'info'
                    ? 'border-amber-600 text-amber-900 font-bold'
                    : 'border-transparent hover:text-stone-800'
                }`}
              >
                Mô Tả Sản Phẩm
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={`pb-3 border-b-2 transition-colors ${
                  activeTab === 'nutrition'
                    ? 'border-amber-600 text-amber-900 font-bold'
                    : 'border-transparent hover:text-stone-800'
                }`}
              >
                Giá Trị Dinh Dưỡng
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 border-b-2 transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-amber-600 text-amber-900 font-bold'
                    : 'border-transparent hover:text-stone-800'
                }`}
              >
                Đánh Giá Khách Hàng ({productReviews.length})
              </button>
            </div>

            <div className="py-4 text-sm text-stone-700 leading-relaxed">
              {activeTab === 'info' && (
                <div className="space-y-3">
                  <p className="whitespace-pre-line">{product.description}</p>
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200/80 space-y-1 text-xs">
                    <p className="font-bold text-amber-900">💡 Hướng dẫn bảo quản hạt điều:</p>
                    <p>• Để nơi khô ráo, thoáng mát. Sau khi mở bao bì, đậy nắp hũ kín hoặc dùng túi zip.</p>
                    <p>• Bảo quản tủ lạnh giúp hạt điều giòn thơm suốt 12 tháng không lo hôi dầu.</p>
                  </div>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div className="max-w-md bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2">
                  <h4 className="font-bold text-stone-900 border-b pb-2">Bảng Dinh Dưỡng Trong 100g Hạt Điều</h4>
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span>Năng lượng (Calories)</span>
                    <span className="font-bold">{product.nutritionInfo.calories}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span>Đạm (Protein)</span>
                    <span className="font-bold">{product.nutritionInfo.protein}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span>Chất béo (Healthy Fats)</span>
                    <span className="font-bold">{product.nutritionInfo.fat}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span>Tinh bột (Carbs)</span>
                    <span className="font-bold">{product.nutritionInfo.carbs}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Chất xơ (Fiber)</span>
                    <span className="font-bold">{product.nutritionInfo.fiber}</span>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {productReviews.length === 0 ? (
                    <p className="text-stone-500 italic">Chưa có nhận xét cho sản phẩm này. Hãy là người đầu tiên mua và trải nghiệm!</p>
                  ) : (
                    productReviews.map((rev) => (
                      <div key={rev.id} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={rev.avatar} alt={rev.userName} className="w-7 h-7 rounded-full object-cover" />
                            <span className="font-bold text-stone-900 text-xs">{rev.userName}</span>
                            {rev.verified && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded-md">
                                Đã mua hàng
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-stone-400">{rev.date}</span>
                        </div>
                        <div className="flex text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs text-stone-700">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
