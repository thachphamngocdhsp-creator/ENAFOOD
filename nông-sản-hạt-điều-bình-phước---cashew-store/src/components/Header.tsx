import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, PhoneCall, Truck, ChevronRight, Menu, X, PackageCheck, Download, Code, Building2, Folder, ShieldCheck } from 'lucide-react';
import { Product, Language, ProductTypeFolder } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { LanguageToggle } from './LanguageToggle';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenAIModal: () => void;
  onOpenOrderLookup: () => void;
  onOpenDownloadModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedProductType: ProductTypeFolder | 'all';
  setSelectedProductType: (type: ProductTypeFolder | 'all') => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
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
  onOpenDownloadModal,
  activeTab,
  setActiveTab,
  selectedProductType,
  setSelectedProductType,
  language,
  onLanguageChange,
  searchQuery,
  setSearchQuery,
  products,
  onSelectProduct,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const t = TRANSLATIONS[language];

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.processingMethod.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-amber-100/60">
      {/* Top Banner Notice with Language Switcher */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-stone-900 text-amber-50 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>{t.topNotice}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-1 text-[11px] text-amber-200">
              <Truck className="w-3.5 h-3.5" /> {t.freeShippingNotice}
            </span>
            <span className="hidden md:inline text-amber-600">|</span>
            {/* Language Switcher */}
            <LanguageToggle language={language} onLanguageChange={onLanguageChange} />
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
              onClick={() => {
                setActiveTab('shop');
                setSelectedProductType('all');
              }}
              className="cursor-pointer flex items-center gap-2.5 group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-bold text-2xl shadow-md group-hover:scale-105 transition-transform">
                🌰
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight leading-tight group-hover:text-amber-800 transition-colors">
                  {t.brandTitle}
                </h1>
                <p className="text-[9px] sm:text-[10px] text-amber-700 font-extrabold tracking-wider uppercase">
                  {t.brandSub}
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md relative">
            <div className="relative">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
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
                      <p className="text-xs font-medium text-stone-800 truncate">
                        {language === 'vi' ? p.name : p.nameEn}
                      </p>
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

          {/* Action Header Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Download Code Button (User Request: "Tải toàn bộ file về") */}
            <button
              type="button"
              onClick={onOpenDownloadModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-all transform hover:-translate-y-0.5"
              title={t.downloadCode}
            >
              <Download className="w-3.5 h-3.5 text-emerald-200" />
              <span className="hidden sm:inline">{t.downloadCodeShort}</span>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAIModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span className="hidden sm:inline">{t.aiConsultant}</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-amber-50 hover:bg-amber-100/80 text-amber-900 px-3.5 py-2 rounded-full transition-colors border border-amber-200/80"
            >
              <ShoppingBag className="w-5 h-5 text-amber-700" />
              <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-[10px] text-stone-500 uppercase font-semibold">{t.cart}</span>
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

        {/* Primary Navigation Bar (3 Product Folders + Company Pages) */}
        <nav className="hidden lg:flex items-center justify-between gap-1 mt-3 pt-2 border-t border-stone-100 text-xs font-semibold text-stone-600">
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setActiveTab('shop');
                setSelectedProductType('all');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'shop' && selectedProductType === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'hover:bg-amber-50 hover:text-amber-800'
              }`}
            >
              <span>🏪 {t.navShop}</span>
            </button>

            {/* 3 Main Product Category Folders Buttons */}
            <button
              onClick={() => {
                setActiveTab('shop');
                setSelectedProductType('raw_cashew');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'shop' && selectedProductType === 'raw_cashew'
                  ? 'bg-amber-700 text-white shadow-xs font-bold'
                  : 'bg-amber-50/80 text-amber-950 hover:bg-amber-100'
              }`}
            >
              <span>🌰 {t.navRawCashew}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('shop');
                setSelectedProductType('spiced_cashew');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'shop' && selectedProductType === 'spiced_cashew'
                  ? 'bg-amber-700 text-white shadow-xs font-bold'
                  : 'bg-amber-50/80 text-amber-950 hover:bg-amber-100'
              }`}
            >
              <span>🌶️ {t.navSpicedCashew}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('shop');
                setSelectedProductType('dried_fruit');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'shop' && selectedProductType === 'dried_fruit'
                  ? 'bg-amber-700 text-white shadow-xs font-bold'
                  : 'bg-amber-50/80 text-amber-950 hover:bg-amber-100'
              }`}
            >
              <span>🥭 {t.navDriedFruit}</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('about')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'about'
                  ? 'bg-amber-800 text-white font-bold'
                  : 'hover:bg-amber-50 text-stone-700'
              }`}
            >
              🏢 {t.navAbout}
            </button>

            <button
              onClick={() => setActiveTab('recipes')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'recipes'
                  ? 'bg-amber-800 text-white font-bold'
                  : 'hover:bg-amber-50 text-stone-700'
              }`}
            >
              📖 {t.navRecipes}
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'blog'
                  ? 'bg-amber-800 text-white font-bold'
                  : 'hover:bg-amber-50 text-stone-700'
              }`}
            >
              💡 {t.navBlog}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-stone-50 border-t border-stone-200 px-4 py-3 space-y-2 text-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-stone-500 uppercase">{language === 'vi' ? 'Chọn Ngôn Ngữ:' : 'Select Language:'}</span>
            <LanguageToggle language={language} onLanguageChange={onLanguageChange} />
          </div>

          <button
            onClick={() => {
              setActiveTab('shop');
              setSelectedProductType('all');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-stone-200 font-bold"
          >
            🏪 {t.navShop}
          </button>
          <button
            onClick={() => {
              setActiveTab('shop');
              setSelectedProductType('raw_cashew');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-stone-200 text-amber-900 font-semibold"
          >
            🌰 {t.navRawCashew}
          </button>
          <button
            onClick={() => {
              setActiveTab('shop');
              setSelectedProductType('spiced_cashew');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-stone-200 text-amber-900 font-semibold"
          >
            🌶️ {t.navSpicedCashew}
          </button>
          <button
            onClick={() => {
              setActiveTab('shop');
              setSelectedProductType('dried_fruit');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-stone-200 text-amber-900 font-semibold"
          >
            🥭 {t.navDriedFruit}
          </button>

          <button
            onClick={() => {
              setActiveTab('about');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-stone-200"
          >
            🏢 {t.navAbout}
          </button>

          <button
            onClick={() => {
              onOpenDownloadModal();
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 rounded-lg bg-emerald-100 text-emerald-900 font-bold"
          >
            📦 {t.downloadCode}
          </button>
        </div>
      )}
    </header>
  );
};
