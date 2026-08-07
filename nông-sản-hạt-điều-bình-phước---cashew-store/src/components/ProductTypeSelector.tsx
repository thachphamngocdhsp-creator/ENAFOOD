import React from 'react';
import { ProductTypeFolder, Language } from '../types';
import { Folder, Layers, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface ProductTypeSelectorProps {
  selectedType: ProductTypeFolder | 'all';
  onSelectType: (type: ProductTypeFolder | 'all') => void;
  language: Language;
  productCounts: Record<ProductTypeFolder | 'all', number>;
}

export const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({
  selectedType,
  onSelectType,
  language,
  productCounts,
}) => {
  const isVi = language === 'vi';

  const folders: {
    id: ProductTypeFolder | 'all';
    title: string;
    sub: string;
    icon: string;
    badge: string;
    image: string;
  }[] = [
    {
      id: 'all',
      title: isVi ? 'Tất Cả Danh Mục (All Product Lines)' : 'All Product Lines',
      sub: isVi ? 'Xem tổng hợp 4 dòng sản phẩm nông sản xuất khẩu' : 'Browse complete agricultural range',
      icon: '📦',
      badge: `${productCounts.all || 0} Products`,
      image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'raw_cashew',
      title: isVi ? '6.1 Hạt Điều Xuất Khẩu' : '6.1 Raw Cashew Kernels',
      sub: isVi ? 'Nhân trắng WW (W180 - W450), Scorched SW, Mảnh LP/SP/BB/DW' : 'White Whole WW, Scorched SW, Broken LP/SP/BB/DW',
      icon: '🌰',
      badge: `${productCounts.raw_cashew || 0} Grades`,
      image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'spiced_cashew',
      title: isVi ? '6.2 Hạt Điều Chế Biến' : '6.2 Processed Cashews',
      sub: isVi ? 'Rang muối vỏ lụa & tách vỏ, tẩm vị mật ong, wasabi, phô mai, tỏi ớt' : 'Wood roasted salted, honey, wasabi, cheese, garlic chili',
      icon: '🥜',
      badge: `${productCounts.spiced_cashew || 0} Flavors`,
      image: 'https://images.unsplash.com/photo-1509358211425-24e038063f28?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'spices',
      title: isVi ? '6.3 Gia Vị Xuất Khẩu' : '6.3 Export Spices',
      sub: isVi ? 'Tiêu đen, tiêu trắng, ớt bột, quế, hồi, gừng, tỏi sấy, phối trộn' : 'Black/white pepper, chili, cinnamon, star anise, ginger/garlic',
      icon: '🌶️',
      badge: `${productCounts.spices || 0} Spices`,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'other_nuts',
      title: isVi ? '6.4 Hạt Khác & Trái Cây Sấy' : '6.4 Other Nuts & Dried Fruit',
      sub: isVi ? 'Hạnh nhân, óc chó, mắc ca, xoài sấy dẻo, mít sấy, snack & quà tặng' : 'Almonds, walnuts, macadamia, soft dried mango, jackfruit, gifts',
      icon: '🥭',
      badge: `${productCounts.other_nuts || 0} Items`,
      image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <Folder className="w-5 h-5 text-amber-600" />
            <span>{isVi ? 'Danh Mục Sản Phẩm Theo Section 6' : 'Product Categories (Section 6)'}</span>
          </h2>
          <p className="text-xs text-stone-500 font-medium">
            {isVi ? 'Phân loại 4 dòng sản phẩm chính của ENA GREEN CO., LTD' : 'Categorized by ENA GREEN export product lines'}
          </p>
        </div>

        <span className="self-start sm:self-auto text-xs bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-bold">
          4 Dòng Sản Phẩm ENA GREEN
        </span>
      </div>

      {/* 4 Main Product Folders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {folders.filter(f => f.id !== 'all').map((folder) => {
          const isSelected = selectedType === folder.id;
          return (
            <div
              key={folder.id}
              onClick={() => onSelectType(folder.id)}
              className={`relative group rounded-2xl p-4 cursor-pointer transition-all duration-300 border overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 text-white border-amber-500 shadow-xl ring-2 ring-amber-500/40 -translate-y-1'
                  : 'bg-white hover:bg-stone-50 text-stone-900 border-stone-200 shadow-xs hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-xs ${
                      isSelected ? 'bg-amber-500 text-stone-950' : 'bg-stone-100'
                    }`}>
                      {folder.icon}
                    </div>
                    <div>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                        isSelected ? 'bg-amber-400 text-stone-950' : 'bg-stone-200 text-stone-700'
                      }`}>
                        {folder.badge}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                  )}
                </div>

                <h3 className={`font-bold text-sm leading-snug mt-1 ${
                  isSelected ? 'text-white' : 'text-stone-900 group-hover:text-amber-800'
                }`}>
                  {folder.title}
                </h3>

                <p className={`text-[11px] line-clamp-2 my-2 leading-snug ${
                  isSelected ? 'text-amber-100/90' : 'text-stone-500'
                }`}>
                  {folder.sub}
                </p>
              </div>

              {/* Sample Image */}
              <div className="relative h-16 rounded-xl overflow-hidden border border-stone-200/40 mt-2">
                <img
                  src={folder.image}
                  alt={folder.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-1.5">
                  <span className="text-[9px] font-bold text-white tracking-wide">
                    {isVi ? 'Xem danh mục →' : 'Explore →'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick All Selector Button */}
      <div className="flex justify-center pt-1">
        <button
          onClick={() => onSelectType('all')}
          className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-2 ${
            selectedType === 'all'
              ? 'bg-amber-800 text-white border-amber-800 shadow-md'
              : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{isVi ? 'Hiện Tất Cả 4 Dòng Sản Phẩm' : 'Show All 4 Product Lines'}</span>
        </button>
      </div>
    </section>
  );
};
