import React, { useState } from 'react';
import { CartItem, Coupon, Order } from '../types';
import { X, CheckCircle2, QrCode, CreditCard, Truck, ShieldCheck, Copy, Check } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedCoupon,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('Bình Phước');
  const [district, setDistrict] = useState('Bù Đăng');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vietqr' | 'momo'>('cod');
  const [copiedCode, setCopiedCode] = useState(false);
  const [formError, setFormError] = useState('');

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const discountAmount = appliedCoupon
    ? appliedCoupon.discountType === 'percent'
      ? Math.round((subtotal * appliedCoupon.discountValue) / 100)
      : appliedCoupon.discountValue
    : 0;

  const shippingFee = subtotal >= 300000 ? 0 : 30000;
  const totalAmount = subtotal - discountAmount + shippingFee;

  const trackingCode = `HD-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setFormError('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng');
      return;
    }

    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      customerName,
      phone,
      province,
      district,
      address,
      note,
      items: cartItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        weight: item.selectedWeight,
        quantity: item.quantity,
        price: item.unitPrice,
      })),
      subtotal,
      discount: discountAmount,
      shippingFee,
      total: totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'received',
      createdAt: new Date().toLocaleString('vi-VN'),
      trackingCode,
    };

    onOrderSuccess(newOrder);
  };

  const copyBankInfo = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-amber-800 to-stone-900 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">Thông Tin Đặt Hàng & Thanh Toán</h3>
            <p className="text-xs text-amber-200/80">Xác nhận đơn hàng nông sản hạt điều Bình Phước</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmitOrder} className="overflow-y-auto p-6 space-y-6 flex-1">
          {formError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
              ⚠️ {formError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Info Form */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-stone-800 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                <Truck className="w-4 h-4 text-amber-600" /> 1. Địa Chỉ Nhận Hàng
              </h4>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Họ và tên người nhận <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50/50 focus:bg-white focus:border-amber-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Số điện thoại liên hệ <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Ví dụ: 0988 123 456"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50/50 focus:bg-white focus:border-amber-600 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Tỉnh / Thành</label>
                  <input
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Quận / Huyện</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Địa chỉ chi tiết (Số nhà, Đường/Xóm, Phường/Xã) <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Số nhà 12, Đường Lê Hồng Phong, Ấp 2..."
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50/50 focus:bg-white focus:border-amber-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Ghi chú giao hàng (Không bắt buộc)</label>
                <input
                  type="text"
                  placeholder="Giao giờ hành chính / Gọi trước khi giao..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50/50 outline-hidden"
                />
              </div>
            </div>

            {/* Payment Method & Order Summary */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-stone-800 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                <CreditCard className="w-4 h-4 text-amber-600" /> 2. Hình Thức Thanh Toán
              </h4>

              <div className="space-y-2 text-xs">
                {/* COD Option */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-amber-600 bg-amber-50/80 font-bold text-amber-950 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white text-stone-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-amber-600"
                  />
                  <div>
                    <div className="font-bold text-stone-900">💵 Thanh toán khi nhận hàng (COD)</div>
                    <div className="text-[11px] text-stone-500 font-normal">
                      Kiểm tra hạt điều đúng chất lượng rồi mới trả tiền cho shipper.
                    </div>
                  </div>
                </label>

                {/* VietQR Bank Option */}
                <label
                  onClick={() => setPaymentMethod('vietqr')}
                  className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'vietqr'
                      ? 'border-amber-600 bg-amber-50/80 font-bold text-amber-950 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white text-stone-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'vietqr'}
                    onChange={() => setPaymentMethod('vietqr')}
                    className="accent-amber-600"
                  />
                  <div>
                    <div className="font-bold text-stone-900 flex items-center gap-1">
                      <QrCode className="w-4 h-4 text-amber-700" /> Chuyển khoản VietQR Ngân Hàng (Quét mã QR)
                    </div>
                    <div className="text-[11px] text-stone-500 font-normal">
                      Xử lý nhanh, tự động xác nhận đơn trong 30 giây.
                    </div>
                  </div>
                </label>
              </div>

              {/* VietQR QR Code Display if selected */}
              {paymentMethod === 'vietqr' && (
                <div className="p-4 rounded-2xl bg-stone-900 text-stone-100 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400">Mã QR Chuyển Khoản Ngân Hàng</span>
                    <button
                      type="button"
                      onClick={() => copyBankInfo(trackingCode)}
                      className="text-[11px] text-amber-300 hover:underline flex items-center gap-1"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      Sao chép nội dung
                    </button>
                  </div>
                  <div className="flex items-center gap-4 bg-stone-800 p-3 rounded-xl border border-stone-700">
                    <div className="w-24 h-24 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VietQR_HATDIEUBINHPHUOC_NOIDUNG_${trackingCode}`}
                        alt="Mã QR Thanh Toán"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="space-y-1 text-[11px]">
                      <p><span className="text-stone-400">Ngân hàng:</span> MB Bank / Vietcombank</p>
                      <p><span className="text-stone-400">Số tài khoản:</span> <strong className="text-amber-300">0988234567</strong></p>
                      <p><span className="text-stone-400">Chủ tài khoản:</span> HẠT ĐIỀU BÌNH PHƯỚC</p>
                      <p><span className="text-stone-400">Số tiền:</span> <strong className="text-emerald-400 font-bold">{totalAmount.toLocaleString('vi-VN')}đ</strong></p>
                      <p><span className="text-stone-400">Nội dung CK:</span> <span className="bg-stone-700 px-1 rounded text-amber-300 font-bold">{trackingCode}</span></p>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Final Summary */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                <div className="font-bold text-stone-800 mb-1">Tóm tắt đơn hàng ({cartItems.length} mặt hàng)</div>
                <div className="max-h-24 overflow-y-auto space-y-1 divide-y divide-stone-100 pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="pt-1 flex justify-between">
                      <span className="truncate max-w-[200px]">
                        {item.product.name} ({item.selectedWeight} x {item.quantity})
                      </span>
                      <span className="font-semibold text-stone-800">
                        {(item.unitPrice * item.quantity).toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-200 pt-2 space-y-1">
                  <div className="flex justify-between text-stone-500">
                    <span>Tạm tính:</span>
                    <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Mã giảm giá:</span>
                      <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-500">
                    <span>Phí vận chuyển:</span>
                    <span>{shippingFee === 0 ? 'Miễn phí' : '30.000đ'}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-amber-900 pt-1">
                    <span>Tổng cộng:</span>
                    <span>{totalAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>

              {/* Submit Order Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                XÁC NHẬN ĐẶT HÀNG NGAY ({totalAmount.toLocaleString('vi-VN')}đ)
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
