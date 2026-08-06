import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Gemini AI Setup
let aiClient: GoogleGenAI | null = null;
function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// API Health
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Nông Sản Hạt Điều Bình Phước" });
});

// API AI Consultant for Cashew Nuts & Recipes
app.post("/api/ai-consultant", async (req, res) => {
  try {
    const { prompt, topic } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt parameter" });
    }

    const ai = getAIClient();

    const systemInstruction = `Bạn là Chuyên Gia Tư Vấn Hạt Điều & Nông Sản Bình Phước am hiểu, thân thiện của thương hiệu "Nông Sản Hạt Điều Bình Phước".
Nhiệm vụ của bạn:
1. Tư vấn các loại hạt điều phù hợp nhu cầu khách hàng:
   - Hạt điều Rang củi vỏ lụa W240 A1 (Thơm ngon truyền thống, giòn rụm)
   - Hạt điều Tách vỏ W320 (Tiện lợi ăn liền)
   - Hạt điều Tẩm vị: Tỏi ớt, Mật ong rừng, Phô mai New Zealand
   - Hạt điều tươi sấy W240 (Chuyên nấu sữa hạt, keto, ăn kiêng)
   - Bơ hạt điều nguyên chất 100%
   - Hộp quà biếu Hoàng Gia cao cấp
2. Gợi ý công thức món ăn / sữa hạt / món xào từ hạt điều.
3. Trả lời bằng tiếng Việt lịch sự, thân thiện, súc tích, trình bày rõ ràng với gạch đầu dòng và icon sinh động.`;

    const fullPrompt = topic 
      ? `[Chủ đề: ${topic}] Khách hàng hỏi: ${prompt}`
      : prompt;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || "Xin lỗi, hiện tại tôi chưa thể đưa ra phản hồi. Quý khách vui lòng thử lại!";
    return res.json({ result: text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: "Không thể kết nối dịch vụ tư vấn AI",
      details: error?.message || "Lỗi không xác định",
    });
  }
});

async function startServer() {
  // Vite middleware in dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
  });
}

startServer();
