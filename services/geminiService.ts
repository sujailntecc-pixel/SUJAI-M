import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResultData } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisPrompt = `You are a specialized botanist AI. Your task is to analyze the image of a plant leaf. Provide a concise and clear report in JSON format. The JSON object must contain these top-level keys:
1.  'plant_name': The common or scientific name of the plant.
2.  'health_condition': A short descriptive string (e.g., 'Healthy', 'Minor Nutrient Deficiency').
3.  'future_outlook': A one or two-sentence prediction of the plant's future.
4.  'advanced_disadvantages': A string array listing potential problems or diseases.
5.  'health_tips': A string array of actionable care tips.
6.  'botanical_information': A detailed paragraph about the plant's botanical characteristics, family, and typical habitat.
7.  'accuracy_report': A confidence score for the analysis (e.g., 'High confidence (95%)').
8.  'botany_reaction_report': A report on how this plant species typically reacts to common treatments, environmental changes, or stressors.
9.  'tamil_translation': An object containing the Tamil translation for all other fields: 'plant_name', 'health_condition', 'future_outlook', 'advanced_disadvantages', 'health_tips', 'botanical_information', 'accuracy_report', and 'botany_reaction_report'.`;

const tamilTranslationSchema = {
  type: Type.OBJECT,
  properties: {
    plant_name: { type: Type.STRING },
    health_condition: { type: Type.STRING },
    future_outlook: { type: Type.STRING },
    advanced_disadvantages: { type: Type.ARRAY, items: { type: Type.STRING } },
    health_tips: { type: Type.ARRAY, items: { type: Type.STRING } },
    botanical_information: { type: Type.STRING },
    accuracy_report: { type: Type.STRING },
    botany_reaction_report: { type: Type.STRING },
  },
  required: ['plant_name', 'health_condition', 'future_outlook', 'advanced_disadvantages', 'health_tips', 'botanical_information', 'accuracy_report', 'botany_reaction_report']
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    plant_name: {
      type: Type.STRING,
      description: "The common or scientific name of the plant identified from the leaf."
    },
    health_condition: {
      type: Type.STRING,
      description: "A short, descriptive summary of the plant's current health status."
    },
    future_outlook: {
      type: Type.STRING,
      description: "A brief prediction of the plant's health trajectory."
    },
    advanced_disadvantages: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of potential issues, diseases, pests, or deficiencies."
    },
    health_tips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of actionable tips for improving or maintaining the plant's health."
    },
    botanical_information: {
      type: Type.STRING,
      description: "Detailed botanical information about the plant."
    },
    accuracy_report: {
      type: Type.STRING,
      description: "A confidence score for the overall analysis, e.g., 'High (95%)'."
    },
    botany_reaction_report: {
      type: Type.STRING,
      description: "A report on how the plant species typically reacts to treatments and environmental changes."
    },
    tamil_translation: tamilTranslationSchema
  },
  required: ['plant_name', 'health_condition', 'future_outlook', 'advanced_disadvantages', 'health_tips', 'botanical_information', 'accuracy_report', 'botany_reaction_report', 'tamil_translation']
};

export const analyzePlantLeaf = async (imageData: string, mimeType: string): Promise<AnalysisResultData> => {
  try {
    const imagePart = {
      inlineData: {
        data: imageData,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: analysisPrompt,
    };
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      }
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    return parsedData as AnalysisResultData;

  } catch (error) {
    console.error("Error analyzing plant leaf:", error);
    throw new Error("Failed to analyze the plant leaf. The model may have returned an unexpected format.");
  }
};