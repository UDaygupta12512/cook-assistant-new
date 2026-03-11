import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const MIN_STEPS = 8;
const MAX_STEPS = 12;

type GeneratedStep = {
  step: number;
  english: string;
  hindi: string;
};

type NutritionFacts = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
};

type GeneratedRecipePayload = {
  name: string;
  hindi: string;
  origin: string;
  description: string;
  descriptionHindi: string;
  difficulty: "Easy" | "Medium" | "Hard";
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  ingredientsHindi: string[];
  steps: GeneratedStep[];
  tips: string[];
  tipsHindi: string[];
  nutrition: NutritionFacts;
};

const DEFAULT_NUTRITION: NutritionFacts = {
  calories: 420,
  protein: 18,
  carbs: 42,
  fat: 14,
  fiber: 6,
  sugar: 5,
  sodium: 520,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function cleanModelJson(rawText: string): string {
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
  }

  const objectMatch = cleaned.match(/\{[\s\S]*\}/);
  return objectMatch ? objectMatch[0] : cleaned;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((entry) => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function toNumber(value: unknown, fallback: number): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function normalizeNutrition(value: unknown): NutritionFacts {
  if (!isRecord(value)) return DEFAULT_NUTRITION;

  return {
    calories: toNumber(value.calories, DEFAULT_NUTRITION.calories),
    protein: toNumber(value.protein, DEFAULT_NUTRITION.protein),
    carbs: toNumber(value.carbs, DEFAULT_NUTRITION.carbs),
    fat: toNumber(value.fat, DEFAULT_NUTRITION.fat),
    fiber: toNumber(value.fiber, DEFAULT_NUTRITION.fiber),
    sugar: toNumber(value.sugar, DEFAULT_NUTRITION.sugar),
    sodium: toNumber(value.sodium, DEFAULT_NUTRITION.sodium),
  };
}

function normalizeStepValue(step: unknown, index: number, dishName: string): GeneratedStep | null {
  if (typeof step === "string") {
    const text = step.trim();
    if (!text) return null;

    return {
      step: index + 1,
      english: text,
      hindi: text,
    };
  }

  if (!isRecord(step)) return null;

  const englishRaw = typeof step.english === "string"
    ? step.english
    : typeof step.instruction === "string"
      ? step.instruction
      : "";
  const english = englishRaw.trim();

  if (!english) return null;

  const hindi = typeof step.hindi === "string" && step.hindi.trim()
    ? step.hindi.trim()
    : english;

  return {
    step: index + 1,
    english,
    hindi,
  };
}

function ensureDetailedStepText(step: string): string {
  if (step.length >= 70) return step;
  return `${step} Keep the heat at medium and monitor color, aroma, and texture carefully, adjusting seasoning before moving to the next step.`;
}

function normalizeSteps(stepsValue: unknown, dishName: string): GeneratedStep[] {
  const parsed = Array.isArray(stepsValue)
    ? stepsValue
      .map((step, index) => normalizeStepValue(step, index, dishName))
      .filter((step): step is GeneratedStep => Boolean(step))
    : [];

  const fallbackTemplates = [
    `Prepare all ingredients for ${dishName} by washing, trimming, and measuring each component before heating the pan.`,
    `Heat oil in a heavy pan over medium flame and add aromatics, stirring until fragrant and lightly golden.`,
    `Add your primary ingredients in stages so they cook evenly and absorb the seasoning base without burning.`,
    `Introduce spices and salt gradually, tasting as you go to maintain balanced flavor and controlled heat.`,
    `Simmer or cook covered for several minutes, stirring every 1-2 minutes to prevent sticking and uneven cooking.`,
    `Check doneness by texture and aroma, then adjust seasoning with salt, acidity, or sweetness as needed.`,
    `Finish on low heat for 2-3 minutes to let flavors integrate and moisture level settle.`,
    `Plate hot, garnish for freshness, and rest briefly so the dish stabilizes before serving.`,
  ];

  while (parsed.length < MIN_STEPS) {
    const template = fallbackTemplates[parsed.length % fallbackTemplates.length];
    parsed.push({
      step: parsed.length + 1,
      english: template,
      hindi: template,
    });
  }

  return parsed
    .slice(0, MAX_STEPS)
    .map((step, index) => ({
      step: index + 1,
      english: ensureDetailedStepText(step.english),
      hindi: step.hindi,
    }));
}

function getDifficulty(value: unknown): "Easy" | "Medium" | "Hard" {
  if (typeof value !== "string") return "Medium";
  const normalized = value.trim().toLowerCase();
  if (normalized === "easy") return "Easy";
  if (normalized === "hard") return "Hard";
  return "Medium";
}

function normalizeRecipe(raw: unknown, dishName: string, ingredientsList: string[]): GeneratedRecipePayload {
  const fallbackIngredients = ingredientsList.length > 0
    ? ingredientsList
    : ["2 tbsp oil", "1 onion", "2 cloves garlic", "salt to taste", "spices as needed"];

  if (!isRecord(raw)) {
    return {
      name: dishName,
      hindi: dishName,
      origin: "Global Cuisine",
      description: `A custom recipe for ${dishName} generated from your selected constraints.`,
      descriptionHindi: `यह ${dishName} के लिए एक कस्टम रेसिपी है।`,
      difficulty: "Medium",
      prepTime: "15 min",
      cookTime: "25 min",
      servings: 4,
      ingredients: fallbackIngredients,
      ingredientsHindi: fallbackIngredients,
      steps: normalizeSteps([], dishName),
      tips: [
        "Prep all ingredients before you start cooking for better timing and consistency.",
        "Taste near the end and adjust salt, acidity, and heat in small increments.",
      ],
      tipsHindi: [
        "पकाने से पहले सारी सामग्री तैयार रखें ताकि समय और स्वाद बेहतर रहे।",
        "अंत में स्वाद चखकर नमक और मसाले थोड़े-थोड़े करके संतुलित करें।",
      ],
      nutrition: DEFAULT_NUTRITION,
    };
  }

  const ingredients = toStringArray(raw.ingredients);
  const ingredientsHindi = toStringArray(raw.ingredientsHindi);
  const tips = toStringArray(raw.tips);
  const tipsHindi = toStringArray(raw.tipsHindi);

  const finalizedIngredients = ingredients.length > 0 ? ingredients : fallbackIngredients;
  const finalizedHindiIngredients = ingredientsHindi.length > 0
    ? ingredientsHindi
    : finalizedIngredients;

  return {
    name: typeof raw.name === "string" && raw.name.trim() ? raw.name.trim() : dishName,
    hindi: typeof raw.hindi === "string" && raw.hindi.trim() ? raw.hindi.trim() : dishName,
    origin: typeof raw.origin === "string" && raw.origin.trim() ? raw.origin.trim() : "Global Cuisine",
    description: typeof raw.description === "string" && raw.description.trim()
      ? raw.description.trim()
      : `A flavor-packed ${dishName} tailored to your preferences.`,
    descriptionHindi: typeof raw.descriptionHindi === "string" && raw.descriptionHindi.trim()
      ? raw.descriptionHindi.trim()
      : (typeof raw.description === "string" && raw.description.trim() ? raw.description.trim() : `यह ${dishName} का स्वादिष्ट संस्करण है।`),
    difficulty: getDifficulty(raw.difficulty),
    prepTime: typeof raw.prepTime === "string" && raw.prepTime.trim() ? raw.prepTime.trim() : "15 min",
    cookTime: typeof raw.cookTime === "string" && raw.cookTime.trim() ? raw.cookTime.trim() : "25 min",
    servings: Math.max(1, Math.round(toNumber(raw.servings, 4))),
    ingredients: finalizedIngredients,
    ingredientsHindi: finalizedHindiIngredients,
    steps: normalizeSteps(raw.steps, dishName),
    tips: tips.length > 0 ? tips : [
      "Use medium heat for better control and even flavor development.",
      "Rest the dish for 2 minutes before serving to let flavors settle.",
    ],
    tipsHindi: tipsHindi.length > 0 ? tipsHindi : (tips.length > 0 ? tips : [
      "मीडियम आंच पर पकाने से स्वाद और नियंत्रण बेहतर रहता है।",
      "परोसने से पहले डिश को 2 मिनट आराम दें ताकि स्वाद सेट हो जाए।",
    ]),
    nutrition: normalizeNutrition(raw.nutrition),
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dishName = typeof body.dishName === "string" ? body.dishName.trim() : "";
    const dietaryGoal = typeof body.dietaryGoal === "string" ? body.dietaryGoal.trim() : "Standard";
    const spiceLevel = typeof body.spiceLevel === "string" ? body.spiceLevel.trim() : "Medium";
    const mealType = typeof body.mealType === "string" ? body.mealType.trim() : "Any";
    const ingredientsList = Array.isArray(body.ingredientsList)
      ? body.ingredientsList.filter((item: unknown): item is string => typeof item === "string" && item.trim().length > 0)
      : [];

    if (!dishName) {
      return NextResponse.json({ error: "dishName is required" }, { status: 400 });
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "AI_KEY_MISSING" }, { status: 503 });
    }

    const constraints: string[] = [];
    if (dietaryGoal && dietaryGoal !== "Standard") {
      constraints.push(`MUST be adapted for a "${dietaryGoal}" dietary profile`);
    }
    if (spiceLevel && spiceLevel !== "Medium") {
      constraints.push(`MUST have a "${spiceLevel}" spice level`);
    }
    if (mealType && mealType !== "Any") {
      constraints.push(`MUST be suitable for a "${mealType}" meal`);
    }

    const dietaryNote = constraints.length > 0
      ? `The recipe constraints are: ${constraints.join(" AND ")}.`
      : "";

    const ingredientsNote = ingredientsList.length > 0
      ? `It is imperative that this recipe prominently features these ingredients: ${ingredientsList.join(", ")}.`
      : "";

    const prompt = `You are a world-class chef and culinary instructor. Generate a detailed, authentic recipe for "${dishName}".

CRITICAL ACCURACY RULES:
- The recipe MUST be specifically and authentically for "${dishName}" — not a similar or related dish.
- Use the traditional, well-known preparation method for "${dishName}". Do NOT substitute or confuse it with any other dish.
- For example: Rasmalai must use chenna discs soaked in saffron rabri. Rasgulla must use chenna balls cooked in sugar syrup. Gulab Jamun must use khoya dumplings deep-fried and soaked in sugar syrup. Each dish has its own unique technique — do NOT mix them up.
- The ingredients and steps MUST match what "${dishName}" actually is. If you are unsure about a dish, describe it as accurately as possible based on its most widely known version.
${dietaryNote}
${ingredientsNote}

Return ONLY valid JSON (no markdown, no code fences) in this schema:
{
  "name": "Dish name in English",
  "hindi": "Dish name in Hindi (Devanagari)",
  "origin": "Cuisine origin",
  "description": "Two-sentence English description of what ${dishName} specifically is",
  "descriptionHindi": "Same description in Hindi",
  "difficulty": "Easy|Medium|Hard",
  "prepTime": "X min",
  "cookTime": "Y min",
  "servings": 4,
  "ingredients": ["Exact quantity + ingredient"],
  "ingredientsHindi": ["Ingredient in Hindi with quantity"],
  "steps": [
    {"step": 1, "english": "Detailed instruction", "hindi": "Same in Hindi"}
  ],
  "tips": ["Chef tip"],
  "tipsHindi": ["Chef tip in Hindi"],
  "nutrition": {
    "calories": 500,
    "protein": 20,
    "carbs": 45,
    "fat": 15,
    "fiber": 5,
    "sugar": 5,
    "sodium": 600
  }
}

Requirements:
- Include 8-12 ingredients with exact measurements that are correct for "${dishName}".
- Include ${MIN_STEPS}-${MAX_STEPS} detailed steps with concrete time/heat cues specific to how "${dishName}" is traditionally prepared.
- Include 3-4 chef tips specific to "${dishName}".
- Keep Hindi text in Devanagari.
- Be specific and practical (avoid vague directions).
- Double-check: every ingredient and step must be relevant to "${dishName}", not to a different dish.`;

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let normalizedRecipe: GeneratedRecipePayload;
    let source: "gemini" | "fallback" = "gemini";

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const parsed = JSON.parse(cleanModelJson(text)) as unknown;
      normalizedRecipe = normalizeRecipe(parsed, dishName, ingredientsList);
    } catch (modelError) {
      console.error("AI generation parse fallback:", modelError);
      normalizedRecipe = normalizeRecipe({}, dishName, ingredientsList);
      source = "fallback";
    }

    return NextResponse.json({ recipe: normalizedRecipe, source });
  } catch (error: unknown) {
    console.error("Recipe generation error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate recipe", details: message },
      { status: 500 }
    );
  }
}
