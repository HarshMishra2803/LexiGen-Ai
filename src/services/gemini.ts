import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateLegalDocument(
  docType: string, 
  details: Record<string, string>,
  onChunk?: (chunk: string) => void,
  language: string = "English"
) {
  const prompt = `
    You are an expert legal counsel. Generate a professional, legally-binding ${docType} in ${language} based on the following details:
    ${Object.entries(details).map(([key, value]) => `- ${key}: ${value}`).join("\n")}

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
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    const fullText = response.text || "";

    // Simulate streaming for UI if onChunk is provided
    if (onChunk) {
      const words = fullText.split(" ");
      let currentText = "";
      for (let i = 0; i < words.length; i++) {
        currentText += words[i] + " ";
        onChunk(currentText);
        // Small delay to simulate streaming effect
        if (i % 5 === 0) await new Promise(r => setTimeout(r, 10));
      }
    }

    return fullText || "Failed to generate document.";
  } catch (error) {
    console.error("Error generating document:", error);
    throw new Error("Failed to generate legal document. Please try again.");
  }
}
