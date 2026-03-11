import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

type SeasoningFix = {
    fix: string;
    explanation: string;
};

function buildFallbackFix(problem: string, ingredients: string[]): SeasoningFix {
    const normalizedProblem = problem.toLowerCase();
    const ingredientText = ingredients.join(" ").toLowerCase();
    const hasDairy = /(milk|cream|yogurt|butter|cheese|coconut milk)/.test(ingredientText);
    const hasStarch = /(rice|pasta|potato|bean|lentil|bread|noodle)/.test(ingredientText);

    if (/(salty|too much salt|oversalted)/.test(normalizedProblem)) {
        return {
            fix: hasStarch
                ? "Add 1/2 to 1 cup of an unsalted starch or extra vegetables, then loosen with a few tablespoons of water or stock and simmer for 2-3 minutes."
                : "Add 2-4 tablespoons of unsalted water or stock, then balance with a small squeeze of lemon or 1/4 teaspoon sugar if the flavor still feels harsh.",
            explanation: "Dilution lowers the salt concentration, while starches and gentle sweetness help soften sharp salinity on the palate.",
        };
    }

    if (/(sour|acidic|too tangy|too acidic)/.test(normalizedProblem)) {
        return {
            fix: hasDairy
                ? "Stir in 1 tablespoon cream, yogurt, or butter, then add a pinch of sugar and simmer gently for 1 minute before tasting again."
                : "Add 1/4 teaspoon sugar or honey and 1 tablespoon olive oil or butter, then cook for 1 minute and retaste.",
            explanation: "Fat coats the palate and sweetness counterbalances excess acidity, making the dish taste rounder and less sharp.",
        };
    }

    if (/(bland|flat|needs flavor|no flavor)/.test(normalizedProblem)) {
        return {
            fix: "Add a pinch of salt first, then layer in 1 teaspoon lemon juice or vinegar and a small amount of toasted spice, garlic, or fresh herbs to wake the dish up.",
            explanation: "Salt boosts existing flavor, acid adds brightness, and aromatics create contrast so the dish tastes fuller and more vivid.",
        };
    }

    if (/(spicy|too hot|too much chili)/.test(normalizedProblem)) {
        return {
            fix: hasDairy
                ? "Fold in 1-2 tablespoons yogurt, cream, or butter and serve with a neutral side like rice or bread to spread the heat out."
                : "Add a small splash of coconut milk or a little extra bulk like rice, beans, or potatoes, then simmer briefly before serving.",
            explanation: "Fat and extra volume dilute capsaicin, which reduces the intensity of perceived heat in each bite.",
        };
    }

    if (/(bitter)/.test(normalizedProblem)) {
        return {
            fix: "Add a pinch of salt and 1/4 teaspoon sugar or honey, then stir in a small knob of butter or olive oil before tasting again.",
            explanation: "Bitterness feels stronger when a dish lacks balance, and salt, sweetness, and fat help smooth that rough edge.",
        };
    }

    if (/(dry|overcooked|tough)/.test(normalizedProblem)) {
        return {
            fix: "Add 2-3 tablespoons warm stock, water, or sauce plus 1 tablespoon fat, cover, and let it sit off the heat for 2 minutes to relax the texture.",
            explanation: "Gentle moisture and fat help rehydrate the surface and improve mouthfeel without pushing the food further into overcooked territory.",
        };
    }

    return {
        fix: "Adjust in small steps: add a pinch of salt, a few drops of acid, and a touch of fat, tasting after each change until the dish feels balanced.",
        explanation: "Most flavor problems come from imbalance, so controlled adjustments to seasoning, brightness, and richness usually restore harmony.",
    };
}

export async function POST(req: NextRequest) {
    try {
        const { recipeTitle, ingredients, problem } = await req.json();
        const ingredientList = Array.isArray(ingredients)
            ? ingredients.filter((ingredient: unknown): ingredient is string => typeof ingredient === "string" && ingredient.trim().length > 0)
            : [];

        if (!recipeTitle || !problem) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (!GEMINI_API_KEY) {
            return NextResponse.json({ success: true, source: "fallback", ...buildFallbackFix(problem, ingredientList) });
        }

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are an elite MasterChef and culinary scientist. The user is cooking "${recipeTitle}" but they made a mistake.
Problem they are experiencing: "${problem}"
Current ingredients they are using: ${ingredientList.join(", ")}

Analyze the chemical and flavor imbalance causing this issue. Provide a precise, actionable "Seasoning Fix" to save their dish. 
Use precise measurements (e.g. "Add 1/2 tsp of white sugar and 1 tbsp of heavy cream"). Provide exactly one solid recommendation and a brief molecular/flavor explanation of WHY it works.

Respond in exactly this JSON format:
{
  "fix": "Specific instruction on how to fix it (1-2 sentences)",
  "explanation": "Brief explanation of the culinary science behind this fix (1 sentence)"
}
Respond ONLY with the raw JSON object, no formatting or markdown.`;

        const result = await model.generateContent(prompt);
        let text = result.response.text().trim();

        if (text.startsWith("```")) {
            text = text.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
        }

        const fixData = JSON.parse(text) as Partial<SeasoningFix>;

        if (!fixData.fix || !fixData.explanation) {
            return NextResponse.json({ success: true, source: "fallback", ...buildFallbackFix(problem, ingredientList) });
        }

        return NextResponse.json({ success: true, ...fixData });
    } catch (error) {
        console.error("Seasoning fixer error:", error);
        const details = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ success: true, source: "fallback", details, ...buildFallbackFix("", []) });
    }
}
