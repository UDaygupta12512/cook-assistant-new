import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

export async function POST(req: NextRequest) {
    if (!GEMINI_API_KEY) {
        return NextResponse.json({ error: 'AI_KEY_MISSING' }, { status: 503 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const base64Image = buffer.toString('base64');
        const mimeType = file.type;

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `You are a world-class culinary AI with perfect ingredient recognition.

Analyze this image carefully. It could be:
- A photo of a fridge or pantry
- A photo of raw ingredients on a counter
- A photo of a cooked dish
- A photo of vegetables, fruits, meats, or groceries
- Any food-related image

Your task:
1. If it shows RAW INGREDIENTS: list every visible food item (e.g. "Tomato", "Onion", "Chicken Breast", "Milk", "Eggs").
2. If it shows a COOKED DISH: identify the dish and list the likely ingredients used to make it (e.g. for a pizza: "Pizza Dough", "Mozzarella", "Tomato Sauce", "Basil").
3. If it shows a GROCERY BAG or SHELF: list visible food products.

Rules:
- Return between 3 and 15 ingredients.
- Use simple English names (e.g. "Potato" not "Solanum tuberosum").
- Do NOT include non-food items like plates, containers, or utensils.
- Be specific when possible (e.g. "Red Bell Pepper" not just "Vegetable").

Respond ONLY with a valid JSON array of strings. No markdown, no explanation, no code fences.
Example: ["Tomato", "Onion", "Garlic", "Chicken", "Rice"]`;

        const imageParts = [
            {
                inlineData: {
                    data: base64Image,
                    mimeType
                }
            }
        ];

        const result = await model.generateContent([prompt, ...imageParts]);
        const text = result.response.text();

        // Robust JSON extraction
        let jsonStr = text.trim();
        // Remove code fences if present
        if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
        }
        // Extract the JSON array - find the outermost [ and ]
        const startIdx = jsonStr.indexOf('[');
        const endIdx = jsonStr.lastIndexOf(']');
        if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
            jsonStr = jsonStr.slice(startIdx, endIdx + 1);
        }

        // Clean up common JSON issues
        jsonStr = jsonStr
            .replace(/,\s*]/g, ']')  // Remove trailing commas
            .replace(/[\x00-\x1F\x7F]/g, ' ')  // Replace control chars
            .trim();

        let ingredients: string[];
        try {
            ingredients = JSON.parse(jsonStr);
        } catch {
            // If JSON parsing fails, split by common delimiters
            ingredients = jsonStr
                .replace(/[\[\]"']/g, '')
                .split(/[,\n]+/)
                .map((s: string) => s.trim())
                .filter((s: string) => s.length > 1 && s.length < 50);
        }

        // Deduplicate and clean
        const unique = [...new Set(ingredients.map((i: string) => i.trim()).filter((i: string) => i.length > 0))];

        return NextResponse.json({ ingredients: unique });

    } catch (error: any) {
        console.error('Vision API error:', error);
        return NextResponse.json({ error: 'Failed to analyze image', details: error.message }, { status: 500 });
    }
}

