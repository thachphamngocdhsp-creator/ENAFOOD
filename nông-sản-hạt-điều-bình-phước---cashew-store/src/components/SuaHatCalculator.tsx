import React, { useState } from 'react';
import { Milk, Sparkles, ChefHat, CheckCircle, Scale } from 'lucide-react';

export const SuaHatCalculator: React.FC = () => {
  const [targetVolumeMl, setTargetVolumeMl] = useState(1000); // 1000ml = 1 Lit
  const [sweetness, setSweetness] = useState<'none' | 'light' | 'medium'>('light');
  const [flavor, setFlavor] = useState<'vanilla' | 'cocoa' | 'matcha' | 'yennmach'>('yennmach');

  // Calculations based on 100g cashews for 1000ml standard creamy milk ratio
  const cashewsGram = Math.round((targetVolumeMl / 1000) * 100);
  const waterMl = Math.round(targetVolumeMl * 0.9);
  
  const honeyGrams =
    sweetness === 'none' ? 0 : sweetness === 'light' ? Math.round((targetVolumeMl / 1000) * 20) : Math.round((targetVolumeMl / 1000) * 35);

  const caloriesTotal = Math.round((cashewsGram * 5.53) + (honeyGrams * 3.04));

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50/40 to-stone-100 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-md my-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
            🥛
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900">
              Công Cụ Tính Tỷ Lệ Nấu Sữa Hạt Điều Chuẩn Sánh Mịn
            </h3>
            <p className="text-xs text-stone-600">
              Tự động định lượng hạt điều tươi Bình Phước W240, nước và lượng ngọt cho cả gia đình
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-bold bg-amber-200/80 text-amber-900 px-3 py-1 rounded-full self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Không Cần Lọc Bã
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Controls */}
        <div className="md:col-span-6 space-y-4 text-xs font-semibold text-stone-700">
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
              1. Dung tích sữa hạt muốn nấu: <span className="text-amber-800 text-sm font-extrabold">{targetVolumeMl} ml</span> ({targetVolumeMl / 1000} Lít)
            </label>
            <input
              type="range"
              min={300}
              max={2000}
              step={100}
              value={targetVolumeMl}
              onChange={(e) => setTargetVolumeMl(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>300ml (1 Ly)</span>
              <span>1000ml (Gia đình 3-4 người)</span>
              <span>2000ml (2 Lít)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                2. Độ Ngọt Mật Ong / Thốt Nốt:
              </label>
              <select
                value={sweetness}
                onChange={(e: any) => setSweetness(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white font-medium"
              >
                <option value="none">Không đường (Eatclean / Keto)</option>
                <option value="light">Ngọt dịu thanh nhẹ (Khuyên dùng)</option>
                <option value="medium">Ngọt vừa vặn dễ uống</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                3. Hương Vị Kết Hợp:
              </label>
              <select
                value={flavor}
                onChange={(e: any) => setFlavor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white font-medium"
              >
                <option value="yennmach">Yến Mạch Cán Dẹt</option>
                <option value="vanilla">Vanilla Nguyên Chất</option>
                <option value="cocoa">Cacao / Chocolate</option>
                <option value="matcha">Trà Xanh Matcha</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="md:col-span-6 bg-white rounded-2xl p-5 border border-amber-300/80 shadow-md space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-600" /> Bảng Công Thức Chuẩn Cho {targetVolumeMl}ml:
            </span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
              ~{caloriesTotal} kcal
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-stone-500 block">Hạt điều tươi W240:</span>
              <strong className="text-amber-900 text-base">{cashewsGram}g</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-500 block">Nước ấm (75°C):</span>
              <strong className="text-stone-900 text-base">{waterMl}ml</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-500 block">Mật ong / Đường thốt nốt:</span>
              <strong className="text-stone-900 text-base">{honeyGrams}g</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-stone-500 block">Muối hồng Himalaya:</span>
              <strong className="text-amber-900 text-base">1/4 thìa cafe</strong>
            </div>
          </div>

          <div className="text-[11px] text-stone-600 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60 space-y-1">
            <p className="font-bold text-amber-900">💡 Mẹo nấu ngon:</p>
            <p>• Ngâm hạt điều tươi 1 tiếng trong nước ấm trước khi xay.</p>
            <p>• Xay công suất lớn trong 2.5 phút cho sữa sánh mịn béo dẻo không cần lọc bã!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
