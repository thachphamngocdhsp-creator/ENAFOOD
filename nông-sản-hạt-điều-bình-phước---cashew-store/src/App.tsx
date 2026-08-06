import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
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
import { Product, CartItem, WeightOption, Order, Coupon } from './types';
import { Filter, Sparkles, Award, ShieldCheck, Flame } from 'lucide-react';

export default function App() {
  // Navigation & Filter state
  const [activeTab, setActiveTab] = useState<string>('shop');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProcessingFilter, setSelectedProcessingFilter] = useState<string>('all');
  const [priceSort, setPriceSort] = useState<'asc' | 'desc' | 'popular'>('popular');

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    // Initial sample item
    {
      id: 'hd-rang-muoi-vo-lua_500g',
      product: PRODUCTS[0],
      selectedWeight: '500g',
      unitPrice: 155000,
      quantity: 1,
    },
  ]);

  // Orders history
  const [orders, setOrders] = useState<Order[]>([]);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
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

  // Filtered Products Calculation
  const filteredProducts = PRODUCTS.filter((p) => {
    // Tab filter
    if (activeTab !== 'shop' && activeTab !== 'recipes' && activeTab !== 'blog') {
      if (p.categoryId !== activeTab) return false;
    }
    // Processing Method filter
    if (selectedProcessingFilter !== 'all') {
      if (p.processingMethod !== selectedProcessingFilter) return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
      const matchDesc = p.shortDescription.toLowerCase().includes(q);
      if (!matchName && !matchTags && !matchDesc) return false;
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
    <div className="min-h-screen bg-stone-100/70 text-stone-900 font-sans antialiased flex flex-col justify-between">
      {/* Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAIModal={() => setIsAIModalOpen(true)}
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
        favoriteCount={0}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 space-y-8">
        {/* Hero Section */}
        {activeTab === 'shop' && (
          <HeroBanner
            onOpenAIModal={() => setIsAIModalOpen(true)}
            onSelectCategory={(catId) => setActiveTab(catId)}
          />
        )}

        {/* Categories Bar */}
        {activeTab === 'shop' && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
                Danh Mục Hạt Điều Bình Phước
              </h2>
              <span className="text-xs text-stone-500 font-medium">100% Thu hoạch chính gốc Bù Đăng</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className="group relative bg-white rounded-2xl p-3.5 border border-stone-200/80 shadow-xs hover:shadow-md cursor-pointer transition-all flex items-center gap-3 overflow-hidden"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-12 h-12 rounded-xl object-cover group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h3 className="font-bold text-xs text-stone-900 group-hover:text-amber-800 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] text-stone-400 font-medium">{cat.count} loại sản phẩm</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* View Content based on activeTab */}
        {activeTab === 'recipes' ? (
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
          /* Products Catalog View */
          <section className="space-y-6">
            {/* Filter & Sorting Controls */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
                <Filter className="w-4 h-4 text-amber-600" />
                <span>Lọc chế biến:</span>
                <select
                  value={selectedProcessingFilter}
                  onChange={(e) => setSelectedProcessingFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-stone-300 bg-stone-50 text-xs font-semibold focus:outline-hidden"
                >
                  <option value="all">Tất cả phương pháp</option>
                  <option value="Rang Củi Vỏ Lụa">Rang Củi Vỏ Lụa</option>
                  <option value="Rang Muối Tách Vỏ">Rang Muối Tách Vỏ</option>
                  <option value="Tẩm Vị Tỏi Ớt">Tẩm Tỏi Ớt</option>
                  <option value="Tẩm Mật Ong">Tẩm Mật Ong</option>
                  <option value="Nguyên Vị Tự Nhiên">Nguyên Vị (Nấu sữa)</option>
                  <option value="Hộp Quà Biếu">Hộp Quà Biếu</option>
                </select>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
                <span>Sắp xếp:</span>
                <select
                  value={priceSort}
                  onChange={(e: any) => setPriceSort(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-stone-300 bg-stone-50 text-xs font-semibold focus:outline-hidden"
                >
                  <option value="popular">Bán chạy & Yêu thích nhất</option>
                  <option value="asc">Giá: Thấp đến Cao</option>
                  <option value="desc">Giá: Cao đến Thấp</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-stone-400 space-y-2 border border-stone-200">
                <div className="text-4xl">🌰</div>
                <h3 className="font-bold text-stone-700">Không tìm thấy sản phẩm hạt điều phù hợp!</h3>
                <p className="text-xs">Vui lòng chọn lại bộ lọc hoặc tìm từ khóa khác.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
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
      />

      {/* Modals & Slide-overs */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, weight, qty) => {
          handleAddToCart(prod, weight, qty);
          setSelectedProduct(null);
          setIsCartOpen(true);
        }}
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
