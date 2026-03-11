import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

function isCookingTopic(message: string): boolean {
    return /(cook|recipe|ingredient|bake|fry|roast|boil|saute|sauté|simmer|dish|meal|food|kitchen|spice|season|sauce|oven|pan|rice|pasta|chicken|vegetable|flavor|substitute|replace|alternative|marinate|grill|steam|braise|poach|blanch|healthy|diet|protein|carb|vegan|vegetarian|keto|prep|how long|minutes|temperature|degrees)/i.test(message);
}

function buildLocalChefReply(message: string, dietaryGoal: string): string {
    const query = message.toLowerCase();

    if (!isCookingTopic(query)) {
        return `I can help with recipes, ingredients, and cooking techniques. Tell me what dish or ingredient you’re working with, and I’ll tailor the advice for your ${dietaryGoal} goal.`;
    }

    if (/(salty|too much salt|oversalted)/.test(query)) {
        return "If a dish is too salty, dilute it with unsalted liquid or extra bulk ingredients, then retaste before adding anything else.";
    }

    if (/(bland|flat|no flavor)/.test(query)) {
        return "For a bland dish, add salt first, then brighten it with a little acid and finish with fresh herbs or toasted spices for depth.";
    }

    if (/(crispy|crunchy|brown better)/.test(query)) {
        return "For better browning, dry the surface well, avoid crowding the pan, and cook over medium-high heat so moisture can escape quickly.";
    }

    if (/(substitute|replace|alternative|instead of)/.test(query)) {
        return `For substitutions adapted to your ${dietaryGoal} goal: milk → almond/oat milk, butter → olive oil or coconut oil, eggs → flax eggs or aquafaba, sugar → stevia or monk fruit. What specific ingredient do you need to substitute?`;
    }

    if (/(how long|time|minutes|hours)/.test(query)) {
        return "Cooking times vary: pasta (8-12 min), rice (15-20 min), chicken breast (6-8 min/side), roasted vegetables (25-40 min at 200°C/400°F). What are you cooking specifically?";
    }

    if (/(temperature|degrees|oven|heat)/.test(query)) {
        return "Common temperatures: baking (175-190°C/350-375°F), roasting (200-220°C/400-425°F), searing (high heat), simmering (low-medium). What dish needs the temperature?";
    }

    if (/(rice)/.test(query)) {
        return "For fluffier rice, rinse it well, use the right water ratio (1.5:1 for long grain), and rest it covered for 10 minutes before fluffing.";
    }

    if (/(chicken)/.test(query)) {
        return "Cook chicken until the thickest part reaches 74°C/165°F, then rest it briefly so the juices redistribute instead of running out.";
    }

    if (/(pasta)/.test(query)) {
        return "Boil pasta in well-salted water until just al dente, then finish it in the sauce with a splash of pasta water for better texture and cling.";
    }

    if (/(marinate|marinade)/.test(query)) {
        return "Marinate chicken or pork for 30 min to 2 hours, beef for 2-8 hours, and fish/seafood for just 15-30 minutes (acid breaks down delicate proteins quickly).";
    }

    if (/(egg|eggs)/.test(query)) {
        return "For perfect eggs: soft boil (6-7 min), hard boil (10-12 min), scrambled (low heat, stir constantly), fried (medium heat, 2-3 min).";
    }

    return `Share the dish name, main ingredients, and what result you want. I’ll help you troubleshoot it and keep it aligned with your ${dietaryGoal} goal.`;
}

export async function POST(req: NextRequest) {
    try {
        const { message, dietaryGoal, conversationHistory } = await req.json();
        const safeMessage = typeof message === "string" ? message.trim() : "";
        const safeGoal = typeof dietaryGoal === "string" && dietaryGoal.trim() ? dietaryGoal.trim() : "Standard";
        const history = Array.isArray(conversationHistory) ? conversationHistory.slice(-6) : [];

        if (!safeMessage) {
            return NextResponse.json({ error: "message is required" }, { status: 400 });
        }

        if (!GEMINI_API_KEY) {
            return NextResponse.json({ reply: buildLocalChefReply(safeMessage, safeGoal), source: "fallback" });
        }

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Build conversation context string
        let conversationContext = "";
        if (history.length > 0) {
            conversationContext = "\n\nRecent conversation history:\n" +
                history.map((h: { role: string; content: string }) =>
                    `${h.role === 'user' ? 'User' : 'Chef AI'}: ${h.content}`
                ).join("\n");
        }

        const prompt = `You are a professional, friendly, and helpful AI Chef for a culinary application.
The user's current dietary goal is: ${safeGoal}.
You must answer all culinary, cooking, ingredient, and recipe-related questions the user asks. Adapt your advice to match their dietary goal when applicable. Feel free to use emojis sparingly.

If the user asks something completely unrelated to food, politely steer the conversation back to cooking.

Keep responses concise but helpful (2-4 sentences for simple questions, more for recipes).
${conversationContext}

User's Current Query: "${safeMessage}"`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return NextResponse.json({ reply: text });

    } catch (error) {
        console.error("Chat API Error:", error);
        const details = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ reply: buildLocalChefReply("", "Standard"), source: "fallback", details });
    }
}
