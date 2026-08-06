import React from 'react';
import { Order } from '../types';
import { CheckCircle2, Copy, Truck, Package, PhoneCall, X } from 'lucide-react';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 p-6 text-center space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <h3 className="text-xl font-black text-stone-900">Đặt Hàng Thành Công!</h3>
          <p className="text-xs text-stone-500 mt-1">
            Cảm ơn quý khách <strong className="text-stone-800">{order.customerName}</strong> đã ủng hộ Nông Sản Hạt Điều Bình Phước.
          </p>
        </div>

        {/* Tracking & Receipt Box */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-left space-y-2 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-amber-200/60">
            <span className="text-stone-500">Mã vận đơn:</span>
            <span className="font-extrabold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md font-mono">
              {order.trackingCode}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-stone-500">Người nhận:</span>
            <span className="font-semibold text-stone-800">{order.customerName} ({order.phone})</span>
          </div>

          <div className="flex justify-between">
            <span className="text-stone-500">Địa chỉ:</span>
            <span className="font-semibold text-stone-800 truncate max-w-[200px]">{order.address}, {order.district}, {order.province}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-stone-500">Hình thức thanh toán:</span>
            <span className="font-bold text-amber-900 uppercase">
              {order.paymentMethod === 'cod' ? 'Thanh toán COD khi nhận hàng' : 'Chuyển khoản VietQR'}
            </span>
          </div>

          <div className="flex justify-between pt-2 border-t border-amber-200/60 font-extrabold text-sm text-amber-950">
            <span>Tổng số tiền:</span>
            <span>{order.total.toLocaleString('vi-VN')}đ</span>
          </div>
        </div>

        <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs text-stone-600 text-left space-y-1">
          <p className="font-bold text-stone-800">🚚 Thông tin đóng gói & vận chuyển:</p>
          <p>• Hàng sẽ được đóng hũ/túi chống sốc cẩn thận và bàn giao cho đơn vị vận chuyển trong 2-4 giờ.</p>
          <p>• Quý khách có thể theo dõi đơn hàng bằng Mã vận đơn <strong className="text-amber-800">{order.trackingCode}</strong> trên mục Tra Cứu Đơn Hàng.</p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-colors"
        >
          Hoàn Tất & Tiếp Tục Mua Sắm
        </button>
      </div>
    </div>
  );
};
