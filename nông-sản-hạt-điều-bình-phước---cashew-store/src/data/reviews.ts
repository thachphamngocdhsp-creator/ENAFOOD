import { Coupon, Review } from '../types';

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'hd-rang-muoi-vo-lua',
    userName: 'Chị Mai Phương (Hà Nội)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '04/08/2026',
    comment: 'Hạt điều rang củi ngon xuất sắc! Hạt to mẩy, vỏ lụa bóc rất dễ, vị rang muối nhè nhẹ không bị mặn chát. Đóng hộp lịch sự rất thích hợp đem làm quà biếu.',
    verified: true,
  },
  {
    id: 'rev-2',
    productId: 'hd-toi-ot',
    userName: 'Anh Quốc Bảo (TP. Hồ Chí Minh)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '01/08/2026',
    comment: 'Loại tỏi ớt ăn cuốn dã dũng! Tỏi phi thơm lừng, vòm miệng cay cay béo béo. Giao hàng từ Bình Phước xuống TP.HCM mất đúng 1 ngày. Sẽ ủng hộ dài dài!',
    verified: true,
  },
  {
    id: 'rev-3',
    productId: 'hd-nguyen-vi-say-say-kho',
    userName: 'Chị Trần Thu Thủy (Đà Nẵng)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '25/07/2026',
    comment: 'Mình mua loại hạt điều tươi W240 về làm sữa hạt điều yến mạch cho bé nhà mình. Sữa thơm béo ngậy không cần lọc bã. Hạt điều mới không hề bị hôi dầu.',
    verified: true,
  },
  {
    id: 'rev-4',
    productId: 'hop-qua-bieu-hoang-gia',
    userName: 'Chú Hoàng Nam (Đồng Nai)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '20/07/2026',
    comment: 'Hộp quà thiết kế ép kim vô cùng sang trọng. Tôi đặt 10 hộp đi biếu đối tác ai cũng khen hạt điều chuẩn nguồn gốc Bình Phước.',
    verified: true,
  },
];

export const COUPONS: Coupon[] = [
  {
    code: 'HATDIEU10',
    discountType: 'percent',
    discountValue: 10,
    minOrder: 200000,
    description: 'Giảm 10% cho đơn hàng từ 200.000đ',
  },
  {
    code: 'FREESHIP',
    discountType: 'fixed',
    discountValue: 30000,
    minOrder: 300000,
    description: 'Miễn phí vận chuyển (Giảm 30.000đ) cho đơn từ 300.000đ',
  },
  {
    code: 'VIP50K',
    discountType: 'fixed',
    discountValue: 50000,
    minOrder: 500000,
    description: 'Giảm 50.000đ cho đơn hàng từ 500.000đ',
  },
];

export const FAQS = [
  {
    question: 'Hạt điều Bình Phước tại shop có xuất xứ từ đâu?',
    answer: '100% sản phẩm hạt điều của shop được thu hoạch trực tiếp từ các vườn điều đạt chuẩn OCOP tại Bù Đăng, Phú Riềng, tỉnh Bình Phước. Shop cam kết không pha trộn hạt điều nhập khẩu kém chất lượng.',
  },
  {
    question: 'Cách bảo quản hạt điều để giữ độ giòn thơm lâu nhất?',
    answer: 'Nên bảo quản hạt điều trong hũ kín hoặc túi zip đi kèm, để nơi khô ráo, thoáng mát tránh ánh nắng trực tiếp. Bạn cũng có thể để trong ngăn mát tủ lạnh để hạt luôn giòn rụm trong 6-12 tháng.',
  },
  {
    question: 'Phí giao hàng và thời gian nhận hàng như thế nào?',
    answer: 'Đơn hàng từ 300.000đ được FREESHIP toàn quốc. Thời gian giao hàng: TP.HCM & Đông Nam Bộ (1-2 ngày), Các tỉnh miền Trung & Hà Nội (2-3 ngày).',
  },
  {
    question: 'Shop có chính sách đổi trả hàng nếu bị hôi dầu hoặc vỡ hạt không?',
    answer: 'Shop cam kết 1 ĐỔI 1 hoặc HOÀN TIỀN 100% trong vòng 7 ngày nếu sản phẩm có bất kỳ lỗi nào từ nhà sản xuất (hôi dầu, ỉu, vỡ quá 5%).',
  },
];
