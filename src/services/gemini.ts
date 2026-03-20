import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export type CreativeMode = 'brainstorming' | 'naming' | 'tagline' | 'outline' | 'default';

const SYSTEM_INSTRUCTIONS: Record<CreativeMode, string> = {
  brainstorming: "You are a brainstorming expert. Generate a wide variety of creative, out-of-the-box ideas based on the prompt. Use bullet points and bold text for emphasis.",
  naming: "You are a branding specialist. Generate a list of catchy, memorable, and relevant names for the project described in the prompt. Categorize them by vibe (e.g., Modern, Classic, Playful).",
  tagline: "You are a high-end copywriter. Generate a list of powerful, concise, and evocative taglines for the prompt. Focus on emotional impact and clarity.",
  outline: "You are a content strategist. Create a detailed and structured content outline based on the prompt. Use hierarchical headers and brief descriptions for each section.",
  default: "You are a creative director and high-end copywriter. Your responses should be bold, concise, and inspiring. Use markdown for structure."
};

export async function generateCreativeResponse(prompt: string, mode: CreativeMode = 'default') {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS[mode],
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}
