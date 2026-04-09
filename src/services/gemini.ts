export async function generateLegalDocument(
  docType: string, 
  details: Record<string, string>,
  onChunk?: (chunk: string) => void,
  language: string = "English"
) {
  try {
    const response = await fetch("/api/generate-document", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ docType, details, language }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate document");
    }

    const data = await response.json();
    const fullText = data.text || "";

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
