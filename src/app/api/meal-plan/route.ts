import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export type MealItem = {
    name: string;
    description: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    prepTime: string;
    ingredients: string[];
};

export type DayPlan = {
    day: string;
    breakfast: MealItem;
    lunch: MealItem;
    dinner: MealItem;
    snack: MealItem;
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
};

export type WeeklyMealPlan = {
    goal: string;
    targetCalories: number;
    days: DayPlan[];
};

const FALLBACK_TEMPLATES: Record<string, { breakfast: MealItem[]; lunch: MealItem[]; dinner: MealItem[]; snack: MealItem[] }> = {
    "High Protein": {
        breakfast: [
            { name: "Egg White Spinach Omelet & Turkey Bacon", description: "Fluffy egg whites with sautéed spinach and lean turkey bacon.", calories: 380, protein: 38, carbs: 12, fat: 18, prepTime: "12 mins", ingredients: ["Egg whites", "Spinach", "Turkey bacon", "Olive oil"] },
            { name: "Greek Yogurt Power Parfait", description: "Thick Greek yogurt with vanilla whey protein, blueberries, and sliced almonds.", calories: 420, protein: 42, carbs: 28, fat: 12, prepTime: "5 mins", ingredients: ["Greek yogurt", "Whey protein", "Blueberries", "Almonds"] },
            { name: "Protein Oatmeal with Peanut Butter", description: "Rolled oats cooked with protein powder topped with creamy peanut butter.", calories: 450, protein: 35, carbs: 48, fat: 14, prepTime: "8 mins", ingredients: ["Oats", "Whey protein", "Peanut butter", "Almond milk"] },
            { name: "Smoked Salmon & Cottage Cheese Toast", description: "Whole grain toast topped with whipped cottage cheese and wild smoked salmon.", calories: 390, protein: 36, carbs: 24, fat: 15, prepTime: "7 mins", ingredients: ["Whole grain bread", "Cottage cheese", "Smoked salmon", "Dill"] },
            { name: "Tofu Scramble with Nutritional Yeast", description: "Crumbled firm tofu spiced with turmeric, peppers, and black beans.", calories: 360, protein: 30, carbs: 22, fat: 16, prepTime: "10 mins", ingredients: ["Firm tofu", "Bell pepper", "Black beans", "Nutritional yeast"] },
            { name: "Chia Seed Protein Pudding", description: "Overnight chia seeds soaked in protein almond milk with cinnamon.", calories: 370, protein: 32, carbs: 26, fat: 14, prepTime: "5 mins", ingredients: ["Chia seeds", "Almond milk", "Protein powder", "Cinnamon"] },
            { name: "Breakfast Chicken & Avocado Burrito", description: "Low-carb tortilla loaded with grilled chicken strips, eggs, and smashed avocado.", calories: 480, protein: 44, carbs: 20, fat: 22, prepTime: "15 mins", ingredients: ["Chicken breast", "Eggs", "Low-carb wrap", "Avocado"] },
        ],
        lunch: [
            { name: "Grilled Lemon Herb Chicken Quinoa Bowl", description: "Charred chicken breast served over fluffy quinoa with cucumbers and tahini.", calories: 560, protein: 48, carbs: 45, fat: 18, prepTime: "20 mins", ingredients: ["Chicken breast", "Quinoa", "Cucumber", "Tahini", "Lemon"] },
            { name: "Seared Tuna Steak & Edamame Salad", description: "Sesame crusted ahi tuna with edamame, mixed greens, and ginger-soy dressing.", calories: 520, protein: 50, carbs: 22, fat: 16, prepTime: "15 mins", ingredients: ["Tuna steak", "Edamame", "Mixed greens", "Sesame oil", "Soy sauce"] },
            { name: "Spiced Turkey & Lentil Skillet", description: "Lean ground turkey simmered with brown lentils, diced tomatoes, and cumin.", calories: 540, protein: 46, carbs: 40, fat: 16, prepTime: "22 mins", ingredients: ["Ground turkey", "Lentils", "Tomatoes", "Cumin", "Onion"] },
            { name: "Grilled Flank Steak with Sweet Potato", description: "Tender sliced steak served with roasted sweet potato wedges and chimichurri.", calories: 590, protein: 48, carbs: 38, fat: 22, prepTime: "25 mins", ingredients: ["Flank steak", "Sweet potato", "Parsley", "Garlic", "Olive oil"] },
            { name: "Mediterranean Chickpea & Chicken Salad", description: "Roasted chicken with kalamata olives, chickpeas, feta, and olive oil vinaigrette.", calories: 530, protein: 44, carbs: 36, fat: 20, prepTime: "15 mins", ingredients: ["Chicken breast", "Chickpeas", "Feta cheese", "Olives", "Cucumber"] },
            { name: "Chili Lime Tofu & Brown Rice Bowl", description: "Crispy pan-fried tofu cubes with black beans, sweet corn, and lime cilantro rice.", calories: 510, protein: 36, carbs: 54, fat: 16, prepTime: "20 mins", ingredients: ["Firm tofu", "Brown rice", "Black beans", "Corn", "Lime"] },
            { name: "Salmon Poke Bowl with Cauliflower Rice", description: "Fresh cubed salmon with avocado, edamame, nori, and spicy sriracha mayo.", calories: 550, protein: 42, carbs: 18, fat: 32, prepTime: "15 mins", ingredients: ["Salmon fillet", "Cauliflower rice", "Edamame", "Avocado", "Sriracha"] },
        ],
        dinner: [
            { name: "Garlic Butter Baked Salmon & Asparagus", description: "Pan-roasted Atlantic salmon finished with garlic herb butter and tender asparagus.", calories: 620, protein: 48, carbs: 10, fat: 38, prepTime: "20 mins", ingredients: ["Salmon fillet", "Asparagus", "Butter", "Garlic", "Lemon"] },
            { name: "Rosemary Roasted Pork Tenderloin", description: "Juicy pork tenderloin medallions with roasted Brussels sprouts and roasted carrots.", calories: 580, protein: 52, carbs: 24, fat: 22, prepTime: "30 mins", ingredients: ["Pork tenderloin", "Brussels sprouts", "Carrots", "Rosemary"] },
            { name: "Slow Cooker Beef Bolognese over High-Protein Pasta", description: "Rich slow-simmered beef ragu spooned over red lentil penne with parmesan.", calories: 640, protein: 54, carbs: 46, fat: 24, prepTime: "35 mins", ingredients: ["Lean ground beef", "Tomato passata", "Lentil pasta", "Parmesan", "Garlic"] },
            { name: "Pan-Seared Sea Bass with Lemon Caper Sauce", description: "Crispy skin sea bass fillet with steamed broccolini and lemon reduction.", calories: 510, protein: 46, carbs: 12, fat: 28, prepTime: "20 mins", ingredients: ["Sea bass", "Broccolini", "Capers", "Lemon", "Olive oil"] },
            { name: "Grilled Chimichurri Chicken Breast", description: "Herb-marinated chicken breast served with grilled zucchini and sautéed garlic kale.", calories: 540, protein: 52, carbs: 14, fat: 26, prepTime: "25 mins", ingredients: ["Chicken breast", "Zucchini", "Kale", "Chimichurri herbs"] },
            { name: "Shrimp & Broccoli Garlic Stir-Fry", description: "Jumbo shrimp sautéed with crisp broccoli florets and ginger garlic tamari sauce.", calories: 480, protein: 46, carbs: 20, fat: 16, prepTime: "15 mins", ingredients: ["Shrimp", "Broccoli", "Garlic", "Ginger", "Tamari"] },
            { name: "Herb Roasted Turkey Breast with Green Beans", description: "Oven-roasted turkey breast with blistered almond green beans.", calories: 530, protein: 50, carbs: 16, fat: 22, prepTime: "28 mins", ingredients: ["Turkey breast", "Green beans", "Almonds", "Olive oil"] },
        ],
        snack: [
            { name: "Cottage Cheese & Honey Walnuts", description: "High-protein cottage cheese with a sprinkle of crushed walnuts.", calories: 210, protein: 22, carbs: 12, fat: 8, prepTime: "2 mins", ingredients: ["Cottage cheese", "Walnuts", "Honey"] },
            { name: "Hard Boiled Eggs & Paprika", description: "Two pasture-raised hard boiled eggs dusted with sea salt and smoked paprika.", calories: 150, protein: 13, carbs: 1, fat: 10, prepTime: "8 mins", ingredients: ["Eggs", "Smoked paprika", "Sea salt"] },
            { name: "Chocolate Protein Shake with Almond Butter", description: "Whey isolate blended with cold water, ice, and almond butter.", calories: 230, protein: 28, carbs: 6, fat: 9, prepTime: "3 mins", ingredients: ["Whey isolate", "Almond butter", "Almond milk"] },
            { name: "Edamame with Flaky Sea Salt", description: "Steamed whole edamame pods tossed in coarse sea salt.", calories: 160, protein: 14, carbs: 12, fat: 6, prepTime: "5 mins", ingredients: ["Edamame", "Sea salt"] },
            { name: "Beef Jerky & String Cheese", description: "Naturally cured lean beef jerky paired with mozzarella string cheese.", calories: 190, protein: 24, carbs: 4, fat: 7, prepTime: "1 min", ingredients: ["Beef jerky", "Mozzarella string cheese"] },
            { name: "Roasted Garlic Hummus & Celery", description: "Savory chickpea hummus scooped with crisp celery batons.", calories: 170, protein: 8, carbs: 16, fat: 9, prepTime: "3 mins", ingredients: ["Hummus", "Celery"] },
            { name: "Pumpkin Seeds & Dark Chocolate Square", description: "Roasted pepitas paired with 85% dark chocolate.", calories: 200, protein: 9, carbs: 10, fat: 14, prepTime: "1 min", ingredients: ["Pumpkin seeds", "Dark chocolate"] },
        ],
    },
};

const DEFAULT_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function buildFallbackMealPlan(goal: string, targetCalories: number): WeeklyMealPlan {
    const template = FALLBACK_TEMPLATES[goal] || FALLBACK_TEMPLATES["High Protein"];

    const days: DayPlan[] = DEFAULT_DAYS.map((dayName, idx) => {
        const b = template.breakfast[idx % template.breakfast.length];
        const l = template.lunch[idx % template.lunch.length];
        const d = template.dinner[idx % template.dinner.length];
        const s = template.snack[idx % template.snack.length];

        const totalCalories = b.calories + l.calories + d.calories + s.calories;
        const totalProtein = b.protein + l.protein + d.protein + s.protein;
        const totalCarbs = b.carbs + l.carbs + d.carbs + s.carbs;
        const totalFat = b.fat + l.fat + d.fat + s.fat;

        return {
            day: dayName,
            breakfast: b,
            lunch: l,
            dinner: d,
            snack: s,
            totalCalories,
            totalProtein,
            totalCarbs,
            totalFat,
        };
    });

    return {
        goal: goal || "Balanced",
        targetCalories: targetCalories || 2000,
        days,
    };
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { goal = "High Protein", targetCalories = 2000, pantryItems = [] } = body;

        const safeGoal = typeof goal === "string" ? goal : "High Protein";
        const safeCalories = typeof targetCalories === "number" ? targetCalories : 2000;
        const safePantry = Array.isArray(pantryItems) ? pantryItems.join(", ") : "";

        if (!GEMINI_API_KEY) {
            return NextResponse.json({
                success: true,
                source: "fallback",
                data: buildFallbackMealPlan(safeGoal, safeCalories),
            });
        }

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are an elite nutritionist and executive chef.
Generate a complete 7-Day Meal Plan (Monday through Sunday) tailored for:
- Dietary Goal: ${safeGoal}
- Target Daily Calories: ~${safeCalories} kcal
- Preferred/Available Pantry Items to incorporate when possible: ${safePantry || "Standard pantry"}

For each day (Monday to Sunday), generate exactly 4 meals:
1. "breakfast"
2. "lunch"
3. "dinner"
4. "snack"

For each meal, provide:
- "name": string
- "description": string (1 concise sentence)
- "calories": number (approximate)
- "protein": number (grams)
- "carbs": number (grams)
- "fat": number (grams)
- "prepTime": string (e.g. "15 mins")
- "ingredients": array of strings (3 to 6 items)

Respond ONLY with a valid JSON object matching this exact schema:
{
  "goal": "${safeGoal}",
  "targetCalories": ${safeCalories},
  "days": [
    {
      "day": "Monday",
      "breakfast": { "name": "...", "description": "...", "calories": 400, "protein": 30, "carbs": 40, "fat": 12, "prepTime": "10 mins", "ingredients": ["..."] },
      "lunch": { ... },
      "dinner": { ... },
      "snack": { ... },
      "totalCalories": 1950,
      "totalProtein": 140,
      "totalCarbs": 160,
      "totalFat": 65
    },
    ... (all 7 days: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)
  ]
}
Do not wrap in markdown or backticks. Return raw JSON.`;

        const result = await model.generateContent(prompt);
        let text = result.response.text().trim();

        if (text.startsWith("```")) {
            text = text.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
        }

        const data = JSON.parse(text) as WeeklyMealPlan;

        if (!data || !Array.isArray(data.days) || data.days.length === 0) {
            return NextResponse.json({
                success: true,
                source: "fallback",
                data: buildFallbackMealPlan(safeGoal, safeCalories),
            });
        }

        return NextResponse.json({
            success: true,
            source: "gemini",
            data,
        });
    } catch (error) {
        console.error("Meal Plan API Error:", error);
        return NextResponse.json({
            success: true,
            source: "fallback",
            data: buildFallbackMealPlan("Balanced", 2000),
        });
    }
}
