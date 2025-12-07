import { GoogleGenAI, Type } from "@google/genai";
import { ConfigState } from "../types";
import { CVAR_DEFINITIONS } from "../constants";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment");
  }
  return new GoogleGenAI({ apiKey });
};

const cleanJson = (text: string) => {
  let cleaned = text.trim();
  // Remove markdown code blocks if present
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```/, '').replace(/```$/, '');
  }
  return cleaned.trim();
};

export const generateConfigFromPrompt = async (
  userPrompt: string, 
  currentConfig: ConfigState,
  lang: 'en' | 'zh'
): Promise<{ settings: ConfigState; explanation: string }> => {
  const ai = getAiClient();
  
  // Dynamically build the available keys and schema properties from the definitions
  const schemaProperties: Record<string, any> = {};
  const availableKeys: string[] = [];

  CVAR_DEFINITIONS.forEach(def => {
    schemaProperties[def.id] = { type: Type.NUMBER };
    availableKeys.push(def.id);
  });

  const languageInstruction = lang === 'zh' 
    ? "The 'explanation' field MUST be in Simplified Chinese (简体中文)." 
    : "The 'explanation' field MUST be in English.";

  const systemInstruction = `
    You are an expert Unreal Engine 4/5 graphics optimization engineer specializing in the game "Tower of Fantasy" (Hotta).
    Your task is to interpret a user's request (e.g., hardware specs, "max fps", "best visuals", "ultrawide") and output a JSON configuration.
    
    ${languageInstruction}

    The available configuration keys are: ${availableKeys.join(', ')}.
    
    CRITICAL RULES:
    1. You MUST return a valid JSON object.
    2. You MUST populate 'recommendedSettings' with key-value pairs for ALL settings that should be changed to meet the user's request.
    3. You MUST change at least 3-5 settings in 'recommendedSettings' to ensure the user sees a difference. Do NOT return an empty object.
    4. 'sg*' keys (0-4) are base scalability settings. Use them for general quality.
    5. 'frameRateLimit' (0=unlimited) controls FPS.
    6. For pure performance, turn off 'volumetricFog' (0) and lower 'vegetationDensity' (e.g. 0.5 or 0).
    7. For resolution/ultrawide requests, set 'resolutionX' and 'resolutionY' explicitly (e.g. 2560x1440, 3440x1440).
    8. 'explanation' should briefly explain WHAT you changed and WHY.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `User Request: "${userPrompt}". Current Config: ${JSON.stringify(currentConfig)}`,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: ["recommendedSettings", "explanation"],
        properties: {
          recommendedSettings: {
            type: Type.OBJECT,
            properties: schemaProperties
          },
          explanation: {
            type: Type.STRING
          }
        }
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");

  try {
    const cleanedText = cleanJson(text);
    const json = JSON.parse(cleanedText);
    
    // Normalize keys (Handle common AI hallucinations)
    const normalizedSettings: ConfigState = {};
    const mapping: Record<string, string> = {
        'ResolutionSizeX': 'resolutionX',
        'ResolutionSizeY': 'resolutionY',
        'r.ScreenPercentage': 'screenPercentage',
        'sg.ViewDistanceQuality': 'sgViewDistance',
        'sg.ShadowQuality': 'sgShadows',
        'sg.AntiAliasingQuality': 'sgAntiAliasing',
        'sg.EffectsQuality': 'sgEffects',
        'sg.FoliageQuality': 'sgFoliage',
    };

    const rawSettings = json.recommendedSettings || {};
    Object.keys(rawSettings).forEach(key => {
        // If key exists in definitions, keep it.
        // If key is in mapping, map it.
        const mappedKey = mapping[key] || key;
        
        // Double check if mappedKey exists in definitions to be safe
        const def = CVAR_DEFINITIONS.find(d => d.id === mappedKey);
        
        if (def) {
            normalizedSettings[mappedKey] = rawSettings[key];
        }
    });

    return {
      settings: normalizedSettings,
      explanation: json.explanation || "Configuration generated based on your prompt."
    };
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("AI returned invalid data format.");
  }
};