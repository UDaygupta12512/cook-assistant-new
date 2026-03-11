import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { ingredient, goal } = await req.json();
    const safeIngredient = typeof ingredient === "string" ? ingredient.trim() : "";
    const safeGoal = typeof goal === "string" ? goal.trim() : "General Health";

    if (!safeIngredient) {
      return NextResponse.json({ error: "ingredient is required" }, { status: 400 });
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "AI_KEY_MISSING" }, { status: 503 });
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a professional nutritionist and culinary expert. Suggest 4 healthy ingredient swaps for "${safeIngredient}" for someone with goal: "${safeGoal}".

Return ONLY valid JSON with no markdown:
{
  "original": {
    "name": "${safeIngredient}",
    "calories": 100,
    "protein": 1,
    "carbs": 15,
    "fat": 5,
    "fiber": 0,
    "sugar": 10,
    "concern": "Main health concern about this ingredient"
  },
  "swaps": [
    {
      "name": "Swap ingredient name",
      "emoji": "🥑",
      "subtext": "Brief tagline e.g. 'Heart-healthy fat source'",
      "calories": 80,
      "protein": 2,
      "carbs": 8,
      "fat": 6,
      "fiber": 4,
      "sugar": 1,
      "ratio": "Use 3/4 cup for every 1 cup of ${safeIngredient}",
      "benefit": "One clear health benefit sentence",
      "bestFor": ["Baking", "Smoothies"],
      "tasteNote": "Brief note on how it changes the taste/texture",
      "calorieSavings": 20
    }
  ]
}

Rules:
- Provide exactly 4 swaps, ordered from most to least recommended for goal "${safeGoal}"
- All nutrition values are per 100g
- calorieSavings = calories of original minus this swap (can be negative if swap has more calories)
- Make swaps genuinely healthier and realistic to cook with
- emoji should match the ingredient visually
- bestFor should list 2-3 cooking uses where the swap works best`;

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
    console.error("Healthy swaps error:", error);
    return NextResponse.json({ error: "Failed to generate swaps" }, { status: 500 });
  }
}
