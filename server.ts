import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Initialization
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  // API Routes
  app.post("/api/generate-document", async (req, res) => {
    const { docType, details, language } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    const prompt = `
      You are an expert legal counsel. Generate a professional, legally-binding ${docType} in ${language} based on the following details:
      ${Object.entries(details || {}).map(([key, value]) => `- ${key}: ${value}`).join("\n")}

      Requirements:
      1. Use professional legal terminology appropriate for ${language}.
      2. Include standard clauses relevant to ${docType}.
      3. Ensure the document is well-structured with clear headings and numbered sections.
      4. Do not include any placeholder text like "[Insert Date Here]". Use the provided details or leave a clean blank line if a detail is missing but necessary.
      5. The output should be in Markdown format for better readability.
      6. Add a disclaimer at the end in ${language} stating that this is an AI-generated document and should be reviewed by a legal professional.
      7. If the language is Hindi, use formal Hindi (Shuddh Hindi) appropriate for legal documents.
    `;

    try {
      const result = await (genAI as any).models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      });
      
      const text = result.text || "";
      res.json({ text });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate document" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    try {
      const result = await (genAI as any).models.generateContent({ 
        model: "gemini-3-flash-preview",
        contents: [
          ...history,
          { role: "user", parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: "You are a helpful legal document assistant for LexiGen AI. You help users understand legal terms, choose templates, and fill out forms. You do not provide actual legal advice but guide them through the LexiGen platform. Keep responses professional and concise."
        }
      });

      const text = result.text || "";
      res.json({ text });
    } catch (error: any) {
      console.error("Chat Gemini Error:", error);
      res.status(500).json({ error: error.message || "Failed to process chat" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
