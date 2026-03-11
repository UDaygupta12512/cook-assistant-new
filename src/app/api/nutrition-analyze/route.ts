import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { foodName, servingSize } = await req.json();
    const safeName = typeof foodName === "string" ? foodName.trim() : "";
    const safeServing = typeof servingSize === "string" ? servingSize.trim() : "1 serving (100g)";

    if (!safeName) {
      return NextResponse.json({ error: "foodName is required" }, { status: 400 });
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "AI_KEY_MISSING" }, { status: 503 });
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a professional dietitian and nutritional scientist. Analyze the nutritional content of "${safeName}" for a serving size of "${safeServing}".

Return ONLY valid JSON with no markdown or code fences:
{
  "foodName": "Clean name of the food",
  "servingSize": "Serving size used",
  "healthScore": 7,
  "healthLabel": "Good",
  "calories": 250,
  "macros": {
    "protein": { "grams": 12, "percent": 20, "label": "Protein" },
    "carbs": { "grams": 30, "percent": 48, "label": "Carbohydrates" },
    "fat": { "grams": 8, "percent": 32, "label": "Fat" }
  },
  "micronutrients": [
    { "name": "Fiber", "value": "4g", "dailyPercent": 14, "icon": "fiber" },
    { "name": "Sugar", "value": "6g", "dailyPercent": 12, "icon": "sugar" },
    { "name": "Sodium", "value": "320mg", "dailyPercent": 14, "icon": "sodium" },
    { "name": "Calcium", "value": "80mg", "dailyPercent": 8, "icon": "calcium" },
    { "name": "Iron", "value": "2mg", "dailyPercent": 11, "icon": "iron" },
    { "name": "Vitamin C", "value": "15mg", "dailyPercent": 17, "icon": "vitamin" }
  ],
  "dietCompatibility": [
    { "diet": "Keto", "compatible": false, "reason": "High carbs" },
    { "diet": "Vegan", "compatible": true, "reason": "Plant-based" },
    { "diet": "High Protein", "compatible": false, "reason": "Low protein" },
    { "diet": "Low Carb", "compatible": false, "reason": "High carbs" },
    { "diet": "Gluten-Free", "compatible": true, "reason": "No gluten" },
    { "diet": "Diabetic-Friendly", "compatible": false, "reason": "High sugar" }
  ],
  "healthInsights": [
    "Rich in complex carbohydrates for sustained energy",
    "Good source of dietary fiber supporting digestive health",
    "Contains essential vitamins and minerals"
  ],
  "warnings": ["High in sodium", "Contains refined sugars"],
  "goodFor": ["Energy boost", "Post-workout recovery", "Digestive health"],
  "avoidIf": ["Watching sodium intake", "Diabetic", "Low-carb diet"]
}

Rules:
- healthScore is 1-10 (10 = extremely healthy, 1 = very unhealthy)
- healthLabel: "Excellent" (9-10), "Very Good" (7-8), "Good" (5-6), "Fair" (3-4), "Poor" (1-2)
- All nutrition values must be realistic and accurate for "${safeName}"
- percent in macros = percentage of total calories that macro contributes
- dailyPercent in micronutrients = % of daily recommended value
- Be accurate to the actual food, not generic`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    let jsonStr = text;
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
    }
    const startIdx = jsonStr.indexOf("{");
    const endIdx = jsonStr.lastIndexOf("}");
    if (startIdx !== -1 && endIdx !== -1) {
      jsonStr = jsonStr.slice(startIdx, endIdx + 1);
    }

    const data = JSON.parse(jsonStr);
    return NextResponse.json({ data, source: "gemini" });
  } catch (error) {
    console.error("Nutrition analyze error:", error);
    return NextResponse.json({ error: "Failed to analyze nutrition" }, { status: 500 });
  }
}
