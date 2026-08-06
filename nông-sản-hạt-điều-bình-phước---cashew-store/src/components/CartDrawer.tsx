import React, { useState } from 'react';
import { CartItem, Coupon } from '../types';
import { X, Trash2, Tag, Truck, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { COUPONS } from '../data/reviews';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (appliedCoupon: Coupon | null) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const handleApplyCoupon = (c: Coupon) => {
    if (subtotal < c.minOrder) {
      setCouponError(`Đơn hàng tối thiểu ${c.minOrder.toLocaleString('vi-VN')}đ để dùng mã này`);
      return;
    }
    setAppliedCoupon(c);
    setCouponError('');
  };

  const handleManualApply = () => {
    const found = COUPONS.find((c) => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (!found) {
      setCouponError('Mã giảm giá không hợp lệ');
      return;
    }
    handleApplyCoupon(found);
  };

  const discountAmount = appliedCoupon
    ? appliedCoupon.discountType === 'percent'
      ? Math.round((subtotal * appliedCoupon.discountValue) / 100)
      : appliedCoupon.discountValue
    : 0;

  const freeShippingThreshold = 300000;
  const freeShipProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Cart Header */}
          <div className="p-4 sm:p-6 bg-stone-900 text-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛒</span>
              <h3 className="font-bold text-lg">Giỏ Hàng Của Bạn</h3>
              <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} hũ/gói
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-amber-50 p-3 px-4 border-b border-amber-200/80 text-xs text-amber-900">
            {remainingForFreeShip > 0 ? (
              <p className="font-medium">
                🚚 Mua thêm <strong className="text-amber-700">{remainingForFreeShip.toLocaleString('vi-VN')}đ</strong> để được <span className="font-bold text-emerald-700">Miễn Phí Vận Chuyển</span> toàn quốc!
              </p>
            ) : (
              <p className="font-bold text-emerald-700 flex items-center gap-1">
                🎉 Đơn hàng của bạn đã đủ điều kiện MIỄN PHÍ VẬN CHUYỂN!
              </p>
            )}
            <div className="w-full bg-amber-200/80 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-amber-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${freeShipProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-stone-100">
            {cartItems.length === 0 ? (
              <div className="py-12 text-center text-stone-400 space-y-3">
                <div className="text-4xl">🌰</div>
                <p className="font-bold text-stone-600">Giỏ hàng đang trống!</p>
                <p className="text-xs max-w-xs mx-auto">
                  Hãy chọn loại hạt điều rang muối củi hay hạt điều tẩm vị thơm ngon để bổ sung năng lượng nhé.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-3 items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-[11px] text-amber-800 font-semibold mt-0.5">
                      Phân loại: <span className="bg-amber-100 px-1.5 py-0.5 rounded-md text-amber-950">{item.selectedWeight}</span>
                    </div>
                    <div className="text-xs font-extrabold text-stone-800 mt-1">
                      {item.unitPrice.toLocaleString('vi-VN')}đ
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-stone-200 rounded-lg text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-stone-600 hover:bg-stone-100 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold text-stone-800">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-stone-600 hover:bg-stone-100 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                      title="Xóa khỏi giỏ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Coupon Code & Summary Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3">
              {/* Coupons List */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-stone-600 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-amber-600" /> Chọn hoặc nhập Mã Giảm Giá:
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px]">
                  {COUPONS.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => handleApplyCoupon(c)}
                      className={`px-2 py-1 rounded-lg border shrink-0 transition-all font-semibold ${
                        appliedCoupon?.code === c.code
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                          : 'border-stone-200 hover:border-amber-400 bg-white text-stone-700'
                      }`}
                    >
                      {c.code} ({c.description.split('(')[0]})
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Mã giảm giá..."
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white uppercase font-bold"
                  />
                  <button
                    onClick={handleManualApply}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 text-white text-xs font-bold hover:bg-stone-900"
                  >
                    Áp dụng
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>}
              </div>

              {/* Order Totals Breakdown */}
              <div className="pt-2 border-t border-stone-200 text-xs space-y-1">
                <div className="flex justify-between text-stone-600">
                  <span>Tạm tính:</span>
                  <span className="font-semibold text-stone-800">{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Mã giảm giá ({appliedCoupon?.code}):</span>
                    <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Phí giao hàng:</span>
                  <span className="font-semibold text-stone-800">
                    {subtotal >= freeShippingThreshold ? (
                      <span className="text-emerald-700 font-bold">Miễn phí</span>
                    ) : (
                      '30.000đ'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-amber-900 pt-1 border-t border-stone-200">
                  <span>Tổng thanh toán:</span>
                  <span>
                    {(
                      subtotal -
                      discountAmount +
                      (subtotal >= freeShippingThreshold ? 0 : 30000)
                    ).toLocaleString('vi-VN')}
                    đ
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onProceedToCheckout(appliedCoupon)}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Tiến Hành Đặt Hàng</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
