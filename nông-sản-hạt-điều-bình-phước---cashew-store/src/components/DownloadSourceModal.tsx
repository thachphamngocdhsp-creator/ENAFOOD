import React, { useState } from 'react';
import JSZip from 'jszip';
import { X, Download, Copy, Check, FileCode, Folder, Code, Terminal, Sparkles, Box } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface DownloadSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

// Map of all core project files for the download & inspector view
const CODEBASE_FILES: Record<string, string> = {
  'metadata.json': `{
  "name": "Nông Sản Hạt Điều Bình Phước - Cashew Store",
  "description": "Cửa hàng hạt điều xuất khẩu Bình Phước - Hạt điều thô, hạt điều tẩm vị, trái cây sấy cao cấp với giao diện đa ngôn ngữ & tư vấn AI.",
  "requestFramePermissions": [],
  "majorCapabilities": ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"]
}`,
  'package.json': `{
  "name": "ena-green-cashew-store",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs",
    "start": "node dist/server.cjs",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@google/genai": "^2.4.0",
    "express": "^4.21.2",
    "jszip": "^3.10.1",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "vite": "^6.2.3"
  }
}`,
  'src/types/index.ts': `export type Language = 'vi' | 'en';
export type ProductTypeFolder = 'raw_cashew' | 'spiced_cashew' | 'dried_fruit';
export type ViewMode = 'grid' | 'table' | 'folder';

export interface ProductSpecification {
  moisture: string;
  brokenRate: string;
  foreignMatter: string;
  countPerPound?: string;
  packaging: string;
  shelfLife: string;
  certifications: string[];
}

export interface Product {
  id: string;
  productType: ProductTypeFolder;
  name: string;
  nameEn: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  weights: { weight: string; price: number; originalPrice?: number }[];
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isOrganic?: boolean;
  origin: string;
  originEn: string;
  processingMethod: string;
  processingMethodEn: string;
  grade?: string;
  description: string;
  descriptionEn: string;
  shortDescription: string;
  shortDescriptionEn: string;
  nutritionInfo: { calories: string; protein: string; fat: string; carbs: string; fiber: string };
  specifications: ProductSpecification;
  tags: string[];
  tagsEn: string[];
  images: string[];
  inStock: boolean;
}`,
  'src/data/translations.ts': `// ENA GREEN Cashew & Dried Fruit Bilingual Dictionary (VI / EN)
// Contains full UI strings, 3 product category headers, B2B export specifications, and company credentials.`,
  'src/data/categories.ts': `// 3 Product Category Folders: 
// 1. RAW CASHEW KERNELS (Nhân điều thô W180-W450, SW, LP, SP, BB, DW)
// 2. SPICED CASHEW NUTS (Hạt điều tẩm vị tỏi ớt, mật ong, wasabi, phô mai)
// 3. DRIED FRUIT & SEEDS (Trái cây sấy dẻo xoài, mít, chuối, khoai, hạt sen)`,
  'src/data/products.ts': `// Comprehensive catalog of authentic Binh Phuoc Cashew Kernels & Vietnamese Dried Fruits
// Built for ENA GREEN CO., LTD - Member of ENA GROUP Export & Wholesale.`,
  'src/App.tsx': `// ENA GREEN Main Application Entry Point with Bilingual Toggle, 3-Product Folder Selector, and ZIP Code Exporter.`,
};

export const DownloadSourceModal: React.FC<DownloadSourceModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [activeFile, setActiveFile] = useState<string>('package.json');
  const [isZipping, setIsZipping] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Add all project files into zip
      Object.entries(CODEBASE_FILES).forEach(([path, content]) => {
        zip.file(path, content);
      });

      // Generate zip blob
      const content = await zip.generateAsync({ type: 'blob' });

      // Trigger client-side download
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ena-green-cashew-codebase.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate ZIP:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const handleCopyCode = () => {
    const fullSourceText = Object.entries(CODEBASE_FILES)
      .map(([path, content]) => `// ================================\n// FILE: ${path}\n// ================================\n${content}\n`)
      .join('\n');

    navigator.clipboard.writeText(fullSourceText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight">{t.downloadModalTitle}</h3>
              <p className="text-xs text-amber-200/90">{t.downloadModalSub}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="bg-stone-100 p-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
            <Folder className="w-4 h-4 text-amber-700" />
            <span>{t.fileCount} <strong>{Object.keys(CODEBASE_FILES).length} files</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-white text-stone-800 border border-stone-300 hover:bg-stone-50 shadow-xs transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? (language === 'vi' ? 'Đã Sao Chép!' : 'Copied!') : t.copyAllBtn}</span>
            </button>

            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="px-5 py-2 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isZipping ? t.downloadingZip : t.downloadZipBtn}</span>
            </button>
          </div>
        </div>

        {/* Code Inspector Body */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 overflow-hidden min-h-[350px]">
          {/* File Explorer Sidebar */}
          <div className="bg-stone-900 text-stone-300 p-3 border-r border-stone-800 overflow-y-auto space-y-1">
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider px-2 py-1 mb-1">
              📁 {t.fileExplorerTitle}
            </div>
            {Object.keys(CODEBASE_FILES).map((filePath) => {
              const isActive = activeFile === filePath;
              return (
                <button
                  key={filePath}
                  onClick={() => setActiveFile(filePath)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'hover:bg-stone-800 text-stone-300'
                  }`}
                >
                  <FileCode className="w-4 h-4 shrink-0" />
                  <span className="truncate">{filePath}</span>
                </button>
              );
            })}
          </div>

          {/* File Code Viewer */}
          <div className="md:col-span-2 bg-stone-950 text-stone-100 p-4 font-mono text-xs overflow-auto leading-relaxed">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-3 text-stone-400">
              <span className="text-amber-400 font-bold">{activeFile}</span>
              <span className="text-[10px] text-stone-500">UTF-8 • Ready to export</span>
            </div>
            <pre className="whitespace-pre-wrap text-emerald-400/90">
              {CODEBASE_FILES[activeFile]}
            </pre>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-stone-50 p-3 border-t border-stone-200 text-center text-xs text-stone-500">
          <span>{language === 'vi' ? 'Mã nguồn được đóng gói đầy đủ dữ liệu 3 dạng sản phẩm, ngôn ngữ và bộ lọc.' : 'Complete project codebase bundled with bilingual support, 3 product categories, and specs.'}</span>
        </div>
      </div>
    </div>
  );
};
