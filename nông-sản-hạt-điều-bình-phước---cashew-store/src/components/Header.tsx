import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, Heart, PhoneCall, Truck, ChevronRight, Menu, X, PackageCheck } from 'lucide-react';
import { Product } from '../types';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenAIModal: () => void;
  onOpenOrderLookup: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  favoriteCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenAIModal,
  onOpenOrderLookup,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  products,
  onSelectProduct,
  favoriteCount,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.processingMethod.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-amber-100/60">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 text-amber-50 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>🔥 100% Hạt điều rang củi chính gốc Bình Phước - Tươi mới mỗi ngày</span>
          </div>
          <div className="flex items-center gap-4 text-amber-100/90 text-[11px]">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> Miễn phí giao hàng từ 300K
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5" /> Hotline/Zalo Sỉ & Lẻ: 0988.234.567
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-amber-800 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div
              onClick={() => setActiveTab('shop')}
              className="cursor-pointer flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                🌰
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight leading-tight group-hover:text-amber-800 transition-colors">
                  HẠT ĐIỀU <span className="text-amber-600">BÌNH PHƯỚC</span>
                </h1>
                <p className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                  Đặc Sản Nông Sản Thượng Hạng
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-lg relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm hạt điều rang muối, tỏi ớt, làm sữa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-stone-200 bg-stone-50/80 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm text-stone-800 outline-hidden transition-all"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-600"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Live Search Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-xl border border-stone-100 p-2 z-50 divide-y divide-stone-100">
                <div className="p-2 text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  Gợi ý sản phẩm phù hợp
                </div>
                {searchResults.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-amber-50/60 rounded-xl cursor-pointer transition-colors"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-stone-800 truncate">{p.name}</p>
                      <p className="text-[11px] text-amber-700 font-semibold">
                        {p.price.toLocaleString('vi-VN')}đ / 500g
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-300" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Assistant Button */}
            <button
              onClick={onOpenAIModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin-slow" />
              <span className="hidden sm:inline">AI Tư Vấn</span>
            </button>

            {/* Order Lookup Button */}
            <button
              onClick={onOpenOrderLookup}
              className="p-2 text-stone-600 hover:text-amber-700 hover:bg-stone-100 rounded-full transition-colors relative"
              title="Tra cứu đơn hàng"
            >
              <PackageCheck className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-amber-50 hover:bg-amber-100/80 text-amber-900 px-3.5 py-2 rounded-full transition-colors border border-amber-200/80"
            >
              <ShoppingBag className="w-5 h-5 text-amber-700" />
              <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-[10px] text-stone-500 uppercase font-semibold">Giỏ hàng</span>
                <span className="text-xs font-bold text-amber-800">
                  {cartTotal > 0 ? `${cartTotal.toLocaleString('vi-VN')}đ` : '0đ'}
                </span>
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="hidden lg:flex items-center gap-1 mt-3 pt-2 border-t border-stone-100 text-xs font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('shop')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              activeTab === 'shop'
                ? 'bg-amber-700 text-white font-semibold shadow-xs'
                : 'hover:bg-amber-50 hover:text-amber-800'
            }`}
          >
            🏪 Tát Cả Sản Phẩm
          </button>
          <button
            onClick={() => setActiveTab('rang-muoi')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              activeTab === 'rang-muoi'
                ? 'bg-amber-700 text-white font-semibold shadow-xs'
                : 'hover:bg-amber-50 hover:text-amber-800'
            }`}
          >
            🥜 Hạt Điều Rang Muối
          </button>
          <button
            onClick={() => setActiveTab('tam-vi')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              activeTab === 'tam-vi'
                ? 'bg-amber-700 text-white font-semibold shadow-xs'
                : 'hover:bg-amber-50 hover:text-amber-800'
            }`}
          >
            🌶️ Hạt Điều Tẩm Vị
          </button>
          <button
            onClick={() => setActiveTab('nguyen-vi')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              activeTab === 'nguyen-vi'
                ? 'bg-amber-700 text-white font-semibold shadow-xs'
                : 'hover:bg-amber-50 hover:text-amber-800'
            }`}
          >
            🥛 Hạt Điều Nấu Sữa & Eatclean
          </button>
          <button
            onClick={() => setActiveTab('qua-bieu')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              activeTab === 'qua-bieu'
                ? 'bg-amber-700 text-white font-semibold shadow-xs'
                : 'hover:bg-amber-50 hover:text-amber-800'
            }`}
          >
            🎁 Hộp Quà Biếu Sang Trọng
          </button>
          <button
            onClick={() => setActiveTab('recipes')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              activeTab === 'recipes'
                ? 'bg-amber-700 text-white font-semibold shadow-xs'
                : 'hover:bg-amber-50 hover:text-amber-800'
            }`}
          >
            📖 Công Thức & Sữa Hạt
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              activeTab === 'blog'
                ? 'bg-amber-700 text-white font-semibold shadow-xs'
                : 'hover:bg-amber-50 hover:text-amber-800'
            }`}
          >
            💡 Mẹo Hay & Kiến Thức
          </button>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-stone-50 border-t border-stone-200 px-4 py-3 space-y-2 text-sm">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Tìm kiếm hạt điều..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white"
            />
          </div>
          <button
            onClick={() => {
              setActiveTab('shop');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-stone-200 font-medium"
          >
            🏪 Tất Cả Sản Phẩm
          </button>
          <button
            onClick={() => {
              setActiveTab('rang-muoi');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-stone-200"
          >
            🥜 Hạt Điều Rang Muối Củi
          </button>
          <button
            onClick={() => {
              setActiveTab('tam-vi');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-stone-200"
          >
            🌶️ Hạt Điều Tẩm Vị
          </button>
          <button
            onClick={() => {
              setActiveTab('nguyen-vi');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-stone-200"
          >
            🥛 Hạt Điều Nấu Sữa & Eatclean
          </button>
          <button
            onClick={() => {
              setActiveTab('qua-bieu');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-stone-200"
          >
            🎁 Hộp Quà Biếu Sang Trọng
          </button>
          <button
            onClick={() => {
              setActiveTab('recipes');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-stone-200"
          >
            📖 Công Thức & Sữa Hạt
          </button>
          <button
            onClick={() => {
              setActiveTab('blog');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-stone-200"
          >
            💡 Mẹo Hay & Kiến Thức
          </button>
          <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenOrderLookup();
                setIsMobileMenuOpen(false);
              }}
              className="text-amber-800 font-semibold flex items-center gap-1.5"
            >
              <PackageCheck className="w-4 h-4" /> Tra Cứu Đơn Hàng
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
