import React, { useState } from 'react';
import { RECIPES } from '../data/recipes';
import { Recipe } from '../types';
import { Clock, Flame, Users, ChefHat, X, ChevronRight } from 'lucide-react';

export const RecipeSection: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <section className="my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-amber-600" />
            Công Thức Món Ngon & Sữa Hạt Từ Hạt Điều
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Khám phá các món ăn bổ dưỡng, sữa hạt mịn màng thực hiện dễ dàng tại nhà
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RECIPES.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className="group bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
          >
            <div className="aspect-16/10 overflow-hidden relative">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 right-2.5 bg-stone-900/80 text-amber-300 font-semibold text-[10px] px-2.5 py-1 rounded-full backdrop-blur-xs">
                {recipe.difficulty}
              </span>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-[11px] text-stone-500 mb-1 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> {recipe.prepTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-600" /> {recipe.calories}
                  </span>
                </div>

                <h3 className="font-bold text-stone-900 text-sm group-hover:text-amber-800 transition-colors line-clamp-2">
                  {recipe.title}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2 mt-1">{recipe.summary}</p>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800">
                <span>Xem công thức chi tiết</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 p-6 max-h-[88vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-4 right-4 p-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/9 rounded-2xl overflow-hidden">
              <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-full object-cover" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-stone-900">{selectedRecipe.title}</h3>
              <p className="text-xs text-stone-500 mt-1">{selectedRecipe.summary}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2 text-xs">
                <h4 className="font-bold text-amber-900 uppercase">🥣 Nguyên Liệu Chuẩn Bị:</h4>
                <ul className="space-y-1 text-stone-700 list-disc list-inside">
                  {selectedRecipe.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                <h4 className="font-bold text-stone-900 uppercase">⏱️ Thông Số Món Ăn:</h4>
                <p>• Thời gian thực hiện: <strong>{selectedRecipe.prepTime}</strong></p>
                <p>• Độ khó: <strong>{selectedRecipe.difficulty}</strong></p>
                <p>• Khẩu phần: <strong>{selectedRecipe.servings}</strong></p>
                <p>• Lượng calo: <strong>{selectedRecipe.calories}</strong></p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <h4 className="font-bold text-stone-900 text-sm uppercase border-b pb-1">👩‍🍳 Các Bước Chế Biến:</h4>
              <ol className="space-y-2 list-decimal list-inside leading-relaxed">
                {selectedRecipe.steps.map((step, i) => (
                  <li key={i} className="pl-1">
                    <span className="font-semibold text-stone-900">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
