import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, Loader2, Lightbulb } from 'lucide-react';

interface AIConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const AIConsultantModal: React.FC<AIConsultantModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Xin chào quý khách! Tôi là AI Chuyên Gia Tư Vấn Hạt Điều & Nông Sản Bình Phước. Quý khách đang tìm loại hạt điều để ăn kiêng KETO, chọn quà biếu sếp hay cần công thức nấu sữa hạt thơm ngon?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    'Tư vấn loại hạt điều làm quà biếu sếp sang trọng',
    'Công thức nấu sữa hạt điều không cần lọc bã',
    'Người ăn kiêng KETO nên dùng loại hạt điều nào?',
    'Hạt điều tẩm vị tỏi ớt và mật ong loại nào ăn cuốn hơn?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = textToSend || input.trim();
    if (!prompt || isLoading) return;

    const userMsg: Message = { sender: 'user', text: prompt };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.result) {
        setMessages((prev) => [...prev, { sender: 'ai', text: data.result }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: 'Rất tiếc, đã có lỗi kết nối với máy chủ AI. Quý khách vui lòng thử lại!',
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Không thể phản hồi ngay lúc này. Vui lòng kiểm tra lại kết nối.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6 h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-700 via-amber-800 to-stone-900 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/30 border border-amber-300/40 text-amber-200 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-1.5">
                AI Tư Vấn Hạt Điều & Nông Sản
              </h3>
              <p className="text-[11px] text-amber-200/80">Trợ lý AI Gemini hỗ trợ chọn loại & công thức ngon</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/60">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 max-w-[88%] ${
                m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 font-bold ${
                  m.sender === 'user'
                    ? 'bg-amber-700 text-white'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-800" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-amber-700 text-white rounded-tr-none'
                    : 'bg-white text-stone-800 border border-stone-200/80 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2 items-center text-xs text-amber-800 font-semibold p-2">
              <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
              <span>Chuyên gia AI đang soạn câu trả lời tư vấn...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="p-2.5 bg-amber-50/80 border-t border-amber-200/60 text-xs">
          <div className="text-[11px] font-bold text-amber-900 mb-1.5 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" /> Câu hỏi gợi ý nhanh:
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(qp)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-amber-950 hover:bg-amber-100 text-[11px] shrink-0 font-medium transition-colors"
              >
                {qp}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-3 bg-white border-t border-stone-200 flex gap-2">
          <input
            type="text"
            placeholder="Hỏi AI về cách chọn hạt điều, dinh dưỡng, cách làm sữa hạt..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-stone-50/50 focus:bg-white focus:border-amber-600 outline-hidden"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Gửi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
