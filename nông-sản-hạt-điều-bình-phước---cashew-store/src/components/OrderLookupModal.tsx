import React, { useState } from 'react';
import { X, Search, PackageCheck, Truck, CheckCircle, Clock } from 'lucide-react';
import { Order } from '../types';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({ isOpen, onClose, orders }) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [searchDone, setSearchDone] = useState(false);

  const matchedOrders = query.trim()
    ? orders.filter(
        (o) =>
          o.trackingCode.toLowerCase().includes(query.trim().toLowerCase()) ||
          o.phone.includes(query.trim()) ||
          o.customerName.toLowerCase().includes(query.trim().toLowerCase())
      )
    : orders;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 p-6 max-h-[85vh] flex flex-col space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <PackageCheck className="w-6 h-6 text-amber-600" />
          <h3 className="text-lg font-bold text-stone-900">Tra Cứu Tiến Độ Đơn Hàng</h3>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Nhập Mã Vận Đơn (VD: HD-123456) hoặc Số điện thoại..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchDone(true);
              }}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:bg-white focus:border-amber-600 outline-hidden"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* Orders List */}
        <div className="overflow-y-auto flex-1 space-y-3 pr-1 divide-y divide-stone-100">
          {matchedOrders.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-xs space-y-1">
              <p>Không tìm thấy đơn hàng trùng khớp với thông tin của bạn.</p>
              <p className="text-[11px] text-stone-400">Vui lòng kiểm tra lại Mã vận đơn hoặc SĐT đã đăng ký khi mua hàng.</p>
            </div>
          ) : (
            matchedOrders.map((ord) => (
              <div key={ord.id} className="pt-3 first:pt-0 space-y-2 text-xs">
                <div className="flex items-center justify-between bg-stone-50 p-3 rounded-2xl border border-stone-200">
                  <div>
                    <div className="font-extrabold text-amber-900 flex items-center gap-1.5">
                      <span>Mã VD: {ord.trackingCode}</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-md">
                        {ord.createdAt}
                      </span>
                    </div>
                    <div className="text-stone-600 font-medium mt-0.5">
                      Khách hàng: <strong>{ord.customerName}</strong> ({ord.phone})
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[11px] flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Đang vận chuyển
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-100 space-y-1.5">
                  <div className="font-semibold text-stone-700">Sản phẩm trong đơn:</div>
                  {ord.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-stone-600 text-[11px]">
                      <span>• {it.productName} ({it.weight} x {it.quantity})</span>
                      <span className="font-bold">{(it.price * it.quantity).toLocaleString('vi-VN')}đ</span>
                    </div>
                  ))}
                  <div className="pt-1 border-t border-stone-100 flex justify-between font-extrabold text-amber-950 text-xs">
                    <span>Tổng tiền:</span>
                    <span>{ord.total.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
