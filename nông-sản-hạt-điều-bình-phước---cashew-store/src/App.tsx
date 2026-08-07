import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { HomeIntroSection } from './components/HomeIntroSection';
import { ProductCard } from './components/ProductCard';
import { ProductTypeSelector } from './components/ProductTypeSelector';
import { TechnicalSpecTable } from './components/TechnicalSpecTable';
import { DownloadSourceModal } from './components/DownloadSourceModal';
import { AboutEnaGreen } from './components/AboutEnaGreen';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderLookupModal } from './components/OrderLookupModal';
import { AIConsultantModal } from './components/AIConsultantModal';
import { SuaHatCalculator } from './components/SuaHatCalculator';
import { RecipeSection } from './components/RecipeSection';
import { Footer } from './components/Footer';

import { PRODUCTS } from './data/products';
import { CATEGORIES } from './data/categories';
import { BLOG_POSTS } from './data/blog';
import { TRANSLATIONS } from './data/translations';
import { Product, CartItem, WeightOption, Order, Coupon, Language, ProductTypeFolder, ViewMode } from './types';
import { Filter, Sparkles, Award, ShieldCheck, Flame, LayoutGrid, Table, Download, Folder } from 'lucide-react';

export default function App() {
  // Navigation, Language & Filter state
  const [activeTab, setActiveTab] = useState<string>('shop');
  const [language, setLanguage] = useState<Language>('vi');
  const [selectedProductType, setSelectedProductType] = useState<ProductTypeFolder | 'all'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProcessingFilter, setSelectedProcessingFilter] = useState<string>('all');
  const [priceSort, setPriceSort] = useState<'asc' | 'desc' | 'popular'>('popular');

  const t = TRANSLATIONS[language];

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'raw-w180_500g',
      product: PRODUCTS[0],
      selectedWeight: '500g',
      unitPrice: 165000,
      quantity: 1,
    },
  ]);

  // Orders history
  const [orders, setOrders] = useState<Order[]>([]);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isOrderLookupOpen, setIsOrderLookupOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (product: Product, weight: WeightOption, quantity = 1) => {
    const weightObj = product.weights.find((w) => w.weight === weight) || product.weights[0];
    const itemId = `${product.id}_${weight}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === itemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevCart,
        {
          id: itemId,
          product,
          selectedWeight: weight,
          unitPrice: weightObj.price,
          quantity,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
    setCompletedOrder(newOrder);
  };

  // Product Counts for 3 Types
  const productCounts = {
    all: PRODUCTS.length,
    raw_cashew: PRODUCTS.filter((p) => p.productType === 'raw_cashew').length,
    spiced_cashew: PRODUCTS.filter((p) => p.productType === 'spiced_cashew').length,
    spices: PRODUCTS.filter((p) => p.productType === 'spices').length,
    dried_fruit: PRODUCTS.filter((p) => p.productType === 'dried_fruit').length,
    other_nuts: PRODUCTS.filter((p) => p.productType === 'other_nuts').length,
  };

  // Filtered Products Calculation
  const filteredProducts = PRODUCTS.filter((p) => {
    // 3 Main Product Types Filter (Folder Selector)
    if (selectedProductType !== 'all') {
      if (p.productType !== selectedProductType) return false;
    }

    // Processing Method filter
    if (selectedProcessingFilter !== 'all') {
      if (p.processingMethod !== selectedProcessingFilter) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNameVi = p.name.toLowerCase().includes(q);
      const matchNameEn = p.nameEn.toLowerCase().includes(q);
      const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
      const matchDesc = p.shortDescription.toLowerCase().includes(q);
      if (!matchNameVi && !matchNameEn && !matchTags && !matchDesc) return false;
    }
    return true;
  }).sort((a, b) => {
    if (priceSort === 'asc') return a.price - b.price;
    if (priceSort === 'desc') return b.price - a.price;
    return b.reviewCount - a.reviewCount; // popular
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-100/80 text-stone-900 font-sans antialiased flex flex-col justify-between">
      {/* Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAIModal={() => setIsAIModalOpen(true)}
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedProductType={selectedProductType}
        setSelectedProductType={setSelectedProductType}
        language={language}
        onLanguageChange={setLanguage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
        favoriteCount={0}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Hero Section */}
        {activeTab === 'shop' && (
          <>
            <HeroBanner
              onOpenAIModal={() => setIsAIModalOpen(true)}
              onSelectCategory={() => setActiveTab('shop')}
              language={language}
            />
            <HomeIntroSection
              language={language}
              onSelectCategory={() => setActiveTab('shop')}
              onOpenAIModal={() => setIsAIModalOpen(true)}
            />
          </>
        )}

        {/* 3 Main Product Category Selector Folders */}
        {activeTab === 'shop' && (
          <ProductTypeSelector
            selectedType={selectedProductType}
            onSelectType={(type) => setSelectedProductType(type)}
            language={language}
            productCounts={productCounts}
          />
        )}

        {/* View Content based on activeTab */}
        {activeTab === 'about' ? (
          <AboutEnaGreen language={language} />
        ) : activeTab === 'recipes' ? (
          <div className="space-y-8">
            <SuaHatCalculator />
            <RecipeSection />
          </div>
        ) : activeTab === 'blog' ? (
          <section className="space-y-6">
            <div className="border-b pb-3">
              <h2 className="text-2xl font-bold text-stone-900">Mẹo Hay & Kiến Thức Hạt Điều</h2>
              <p className="text-xs text-stone-500">Kinh nghiệm phân biệt hạt điều Bình Phước chuẩn, giá trị dinh dưỡng và cách bảo quản</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BLOG_POSTS.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 shadow-xs">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-xl" />
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-stone-900 text-lg leading-snug">{post.title}</h3>
                  <p className="text-xs text-stone-600 line-clamp-3">{post.summary}</p>
                  <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-400 flex justify-between">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* Products Catalog View with View Mode Toggle */
          <section className="space-y-6">
            {/* Filter & View Mode Controls Bar */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
              {/* Left: View Mode Toggle */}
              <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === 'grid'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>{t.viewModeGrid}</span>
                </button>

                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === 'table'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>{t.viewModeTable}</span>
                </button>
              </div>

              {/* Right: Sort and Filter */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
                  <Filter className="w-4 h-4 text-amber-600" />
                  <span>{t.sortBy}</span>
                  <select
                    value={priceSort}
                    onChange={(e: any) => setPriceSort(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-stone-300 bg-stone-50 text-xs font-semibold focus:outline-hidden"
                  >
                    <option value="popular">{t.sortPopular}</option>
                    <option value="asc">{t.sortPriceAsc}</option>
                    <option value="desc">{t.sortPriceDesc}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Display products according to view mode */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-stone-400 space-y-2 border border-stone-200">
                <div className="text-4xl">🌰</div>
                <h3 className="font-bold text-stone-700">
                  {language === 'vi' ? 'Không tìm thấy sản phẩm phù hợp!' : 'No products found matching your search!'}
                </h3>
                <p className="text-xs">
                  {language === 'vi' ? 'Vui lòng chọn lại thư mục hoặc tìm từ khóa khác.' : 'Please select a different category or change search criteria.'}
                </p>
              </div>
            ) : viewMode === 'table' ? (
              <TechnicalSpecTable
                products={filteredProducts}
                language={language}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onAddToCart={(prod, weight) => handleAddToCart(prod, weight)}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    language={language}
                    onAddToCart={(prod, weight) => handleAddToCart(prod, weight)}
                    onOpenDetail={(prod) => setSelectedProduct(prod)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Sua Hat Calculator Section on Shop Home */}
        {activeTab === 'shop' && <SuaHatCalculator />}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(catId) => setActiveTab(catId)}
        onOpenAIModal={() => setIsAIModalOpen(true)}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        language={language}
      />

      {/* Modals & Slide-overs */}
      <ProductDetailModal
        product={selectedProduct}
        language={language}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, weight, qty) => {
          handleAddToCart(prod, weight, qty);
          setSelectedProduct(null);
          setIsCartOpen(true);
        }}
      />

      <DownloadSourceModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        language={language}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={(coupon) => {
          setAppliedCoupon(coupon);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        appliedCoupon={appliedCoupon}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      <AIConsultantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
      />

      <OrderLookupModal
        isOpen={isOrderLookupOpen}
        onClose={() => setIsOrderLookupOpen(false)}
        orders={orders}
      />
    </div>
  );
}
