import { GoogleGenAI } from "@google/genai";
import { ThumbnailStyle, GenerateConfig } from '../types';
import { STYLE_PROMPTS } from '../constants';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }
  return new GoogleGenAI({ apiKey });
};

export const enhancePrompt = async (rawPrompt: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert YouTube strategist. Rewrite the following video idea into a detailed visual description for a high-CTR thumbnail. Keep it concise but descriptive of visual elements.
      
      Video Idea: "${rawPrompt}"
      
      Output ONLY the visual description string in English, regardless of the input language.`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    return rawPrompt; // Fallback to original
  }
};

export const generateThumbnailImage = async (config: GenerateConfig): Promise<string> => {
  const ai = getAiClient();
  const styleKeywords = STYLE_PROMPTS[config.style];
  
  const parts: any[] = [];
  let finalPrompt = "";

  if (config.referenceImage) {
    // Image-to-Image Mode
    const [header, base64Data] = config.referenceImage.split(',');
    const mimeType = header.match(/:(.*?);/)?.[1] || 'image/png';
    
    parts.push({ inlineData: { mimeType, data: base64Data } });
    
    finalPrompt = `Transform this image into a YouTube thumbnail.
    Style to apply: ${config.style}.
    Visual modifiers: ${styleKeywords}.
    Context: ${config.prompt || "Maintain the subject but change the style."}.
    Ensure the result is high quality 16:9.`;
  } else {
    // Text-to-Image Mode
    finalPrompt = `Create a YouTube thumbnail image. Aspect ratio 16:9. 
    Style: ${config.style}.
    Visual modifiers: ${styleKeywords}.
    Subject: ${config.prompt}.`;
  }

  if (config.includeTextInAI && config.aiText) {
    finalPrompt += ` The image MUST clearly feature the text: "${config.aiText}" in a large, readable font.`;
  }

  parts.push({ text: finalPrompt });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Default to flash-image for speed/cost balance
      contents: {
        parts: parts,
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          // imageSize: "1K" // Flash image doesn't support explicit size, it defaults.
        }
      }
    });

    // Extract image
    // Note: Gemini 2.5 Flash Image returns content in parts.
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Thumbnail generation error:", error);
    throw error;
  }
};

export const removeBackground = async (imageSrc: string): Promise<string> => {
  const ai = getAiClient();
  
  // Basic parsing of data URL
  const [header, base64Data] = imageSrc.split(',');
  const mimeType = header.match(/:(.*?);/)?.[1] || 'image/png';

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { mimeType, data: base64Data } },
          { text: "Extract the main subject from this image and place it on a transparent background. Return the image as a PNG." }
        ]
      }
    });

     if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }
    throw new Error("No processed image returned.");

  } catch (error) {
    console.error("Background removal error:", error);
    throw error;
  }
};