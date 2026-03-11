import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

function buildFallbackDetailedSteps(recipeName: string, ingredients: string[]): string[] {
    const leadIngredients = ingredients.slice(0, 5).join(", ");
    const ingredientNote = leadIngredients ? ` using ${leadIngredients}` : "";

    return [
        `Set up your station for ${recipeName}${ingredientNote}: wash, trim, measure, and keep the ingredients grouped in order of use.`,
        `Heat your main pan or pot over medium heat for 1-2 minutes, then add oil or butter and wait until it shimmers before adding aromatics.`,
        `Cook the aromatics gently for 3-4 minutes, stirring often, until they smell sweet and fragrant without browning too fast.`,
        `Add the core ingredients in stages so the densest items start first, then stir to coat everything evenly with the flavor base.`,
        `Season in small additions rather than all at once, tasting after each adjustment so the dish stays balanced and layered.`,
        `Lower the heat to maintain a steady simmer or gentle cook, and stir every 1-2 minutes so nothing sticks or dries out.`,
        `Check texture, moisture, and aroma near the end; add a splash of water, stock, or fat if the mixture looks tight or overly dry.`,
        `Finish by resting the dish for 2 minutes off the heat, then garnish and serve while the flavors are fully integrated.`,
    ];
}

function normalizeDetailedSteps(value: unknown, recipeName: string, ingredients: string[]): string[] {
    const parsed = Array.isArray(value)
        ? value.filter((step): step is string => typeof step === "string" && step.trim().length > 0).map((step) => step.trim())
        : [];

    const fallback = buildFallbackDetailedSteps(recipeName, ingredients);
    const normalized = parsed.length > 0 ? parsed : fallback;

    while (normalized.length < 8) {
        normalized.push(fallback[normalized.length % fallback.length]);
    }

    return normalized.slice(0, 12);
}

export async function POST(req: NextRequest) {
    try {
        const { recipeName, ingredients } = await req.json();
        const safeRecipeName = typeof recipeName === "string" ? recipeName.trim() : "this dish";
        const safeIngredients = Array.isArray(ingredients)
            ? ingredients.filter((ingredient: unknown): ingredient is string => typeof ingredient === "string" && ingredient.trim().length > 0)
            : [];

        if (!safeRecipeName || safeIngredients.length === 0) {
            return NextResponse.json({ error: "recipeName and ingredients are required" }, { status: 400 });
        }

        if (!GEMINI_API_KEY) {
            return NextResponse.json({ steps: buildFallbackDetailedSteps(safeRecipeName, safeIngredients), source: "fallback" });
        }

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are a professional Michelin-star chef and culinary instructor. 
    A user wants to cook "${safeRecipeName}" using the following ingredients: ${safeIngredients.join(", ")}.
The current instructions in the database are too short. Please generate highly detailed, step-by-step cooking instructions. 

RULES:
1. Provide between 8 to 12 highly detailed steps.
2. Include exact temperatures, techniques (e.g., "folding", "simmering", "sautéing until translucent"), and sensory cues (e.g., "wait until it smells nutty", "cook until golden brown").
3. Respond ONLY with a valid JSON array of strings containing the detailed steps. No markdown, no code fences.

Example:
["Step 1: Preheat the oven...", "Step 2: Carefully chop..."]`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        let jsonStr = text.trim();

        // Remove markdown code fences
        if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
        }

        // Extract the JSON array - find the outermost [ and ]
        const startIdx = jsonStr.indexOf('[');
        const endIdx = jsonStr.lastIndexOf(']');
        if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
            jsonStr = jsonStr.slice(startIdx, endIdx + 1);
        }

        // Clean up common JSON issues: trailing commas, control characters
        jsonStr = jsonStr
            .replace(/,\s*]/g, ']')  // Remove trailing commas before ]
            .replace(/[\x00-\x1F\x7F]/g, ' ')  // Replace control chars with space
            .replace(/\n/g, ' ')  // Replace newlines with space inside strings
            .trim();

        const detailedSteps = normalizeDetailedSteps(JSON.parse(jsonStr), safeRecipeName, safeIngredients);

        return NextResponse.json({ steps: detailedSteps });

    } catch (error) {
        console.error("Detailed Steps API Error:", error);
        const details = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({
            steps: buildFallbackDetailedSteps("this dish", []),
            source: "fallback",
            details,
        });
    }
}
