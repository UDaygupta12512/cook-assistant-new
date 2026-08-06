"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import { useRouter } from "@/i18n/routing";
import {
    Siren,
    Clock,
    Flame,
    Zap,
    CheckCircle2,
    RefreshCw,
    ChefHat,
    Sparkles,
    Utensils,
    Package,
    ArrowRight,
    Loader2,
} from "lucide-react";
import { useDietaryStore } from "@/store/useDietaryStore";

type EmergencyRecipe = {
    id: string;
    name: string;
    time: string;
    appliance: "Microwave" | "Air Fryer" | "Toaster" | "Stovetop" | "No-Cook";
    calories: number;
    protein: number;
    equipment: string;
    ingredients: string[];
    steps: string[];
};

const EMERGENCY_RECIPES: EmergencyRecipe[] = [
    {
        id: "e1",
        name: "5-Minute Microwave Mac & Cheese",
        time: "5 mins",
        appliance: "Microwave",
        calories: 420,
        protein: 16,
        equipment: "1 Large Microwave Mug",
        ingredients: ["1/2 cup macaroni", "1/2 cup water", "1/4 cup milk", "1/2 cup shredded cheese", "Pinch of salt"],
        steps: [
            "Add macaroni, water, and salt into mug. Microwave on high for 3 minutes until tender.",
            "Stir in milk and shredded cheese.",
            "Microwave for another 30-45 seconds until bubbling and creamy. Stir and eat immediately.",
        ],
    },
    {
        id: "e2",
        name: "Crispy Air Fryer Pita Pizza",
        time: "6 mins",
        appliance: "Air Fryer",
        calories: 380,
        protein: 18,
        equipment: "Air Fryer",
        ingredients: ["1 pita bread", "2 tbsp pizza sauce or ketchup", "1/2 cup mozzarella", "Pinch oregano"],
        steps: [
            "Spread sauce over pita bread and top generously with mozzarella cheese and oregano.",
            "Place in air fryer basket at 380°F (190°C) for 4-5 minutes until cheese is blistered and crust is crunchy.",
            "Slice into 4 triangles and devour.",
        ],
    },
    {
        id: "e3",
        name: "1-Pan Garlic Butter Chili Eggs",
        time: "4 mins",
        appliance: "Stovetop",
        calories: 310,
        protein: 15,
        equipment: "1 Small Skillet",
        ingredients: ["2 large eggs", "1 tbsp butter", "1 tsp chili crisp or red flakes", "1 clove garlic (sliced)", "1 slice toast"],
        steps: [
            "Melt butter in skillet over medium heat. Sizzle sliced garlic and chili flakes for 30 seconds.",
            "Crack eggs directly into the foaming chili butter.",
            "Spoon hot butter over whites for 2 minutes until set with runny yolks. Slide onto toast.",
        ],
    },
    {
        id: "e4",
        name: "2-Minute Peanut Butter Banana Roll",
        time: "2 mins",
        appliance: "No-Cook",
        calories: 340,
        protein: 12,
        equipment: "Plate",
        ingredients: ["1 tortilla or flatbread", "2 tbsp peanut butter", "1 ripe banana", "Drizzle of honey or cinnamon"],
        steps: [
            "Spread peanut butter evenly across tortilla.",
            "Place whole peeled banana near the edge, drizzle honey.",
            "Roll tightly, cut into sushi-style bites, and eat immediately.",
        ],
    },
    {
        id: "e5",
        name: "3-Minute Sesame Soy Ramen Hack",
        time: "4 mins",
        appliance: "Microwave",
        calories: 450,
        protein: 14,
        equipment: "1 Microwave Bowl",
        ingredients: ["1 pack instant ramen", "1 tbsp soy sauce", "1 tsp sesame oil", "1 egg", "Scallions"],
        steps: [
            "Submerge ramen block in water; microwave for 2.5 minutes.",
            "Drain 80% water. Crack egg into hot noodles and whisk vigorously until velvety.",
            "Stir in soy sauce and sesame oil. Slurp hot.",
        ],
    },
    {
        id: "e6",
        name: "Ultimate High-Protein Avocado Toast",
        time: "3 mins",
        appliance: "Toaster",
        calories: 360,
        protein: 16,
        equipment: "Toaster & Fork",
        ingredients: ["2 slices bread", "1 ripe avocado", "3 tbsp cottage cheese or feta", "Chili flakes & lemon"],
        steps: [
            "Toast bread to golden crisp.",
            "Mash avocado directly with cottage cheese, salt, and lemon juice.",
            "Spread thick on hot toast and dust with chili flakes.",
        ],
    },
    {
        id: "e7",
        name: "6-Minute Air Fryer Buffalo Chicken Tenders",
        time: "7 mins",
        appliance: "Air Fryer",
        calories: 410,
        protein: 36,
        equipment: "Air Fryer",
        ingredients: ["200g chicken tenderloins", "1 tbsp olive oil", "2 tbsp buffalo sauce", "Garlic powder"],
        steps: [
            "Toss chicken in olive oil, garlic powder, salt, and half the buffalo sauce.",
            "Air fry at 400°F (200°C) for 6 minutes, flipping halfway.",
            "Toss in remaining hot sauce and eat with ranch or raw veggies.",
        ],
    },
    {
        id: "e8",
        name: "No-Cook Greek Salad Protein Pita Pocket",
        time: "3 mins",
        appliance: "No-Cook",
        calories: 350,
        protein: 15,
        equipment: "Knife & Bowl",
        ingredients: ["1 pita pocket", "1/2 cup canned chickpeas (rinsed)", "1/3 cup diced cucumber", "2 tbsp feta", "1 tbsp olive oil"],
        steps: [
            "Toss chickpeas, cucumber, feta, and olive oil with a pinch of salt.",
            "Slit pita pocket open and stuff completely with the mixture.",
        ],
    },
];

export default function HangryPage() {
    const navbarTranslations = useNavbarTranslations();
    const router = useRouter();
    const { profile } = useDietaryStore();

    const [selectedAppliance, setSelectedAppliance] = useState<string>("All");
    const [activeRecipe, setActiveRecipe] = useState<EmergencyRecipe>(EMERGENCY_RECIPES[0]);
    const [pantryItems, setPantryItems] = useState<string[]>([]);
    const [aiIngredients, setAiIngredients] = useState("");
    const [isGeneratingAi, setIsGeneratingAi] = useState(false);

    // Load pantry
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const stored = localStorage.getItem("cook-pantry-items");
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (Array.isArray(parsed)) {
                        setPantryItems(parsed.map((p: any) => p.name));
                    }
                }
            } catch {}
        }
    }, []);

    const filteredRecipes = useMemo(() => {
        if (selectedAppliance === "All") return EMERGENCY_RECIPES;
        return EMERGENCY_RECIPES.filter((r) => r.appliance === selectedAppliance);
    }, [selectedAppliance]);

    const handleRandomEmergency = () => {
        const pool = filteredRecipes.length > 0 ? filteredRecipes : EMERGENCY_RECIPES;
        const rand = pool[Math.floor(Math.random() * pool.length)];
        setActiveRecipe(rand);
    };

    const handleGenerateAiEmergency = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!aiIngredients.trim()) return;

        setIsGeneratingAi(true);
        try {
            const list = aiIngredients.split(",").map((s) => s.trim()).filter(Boolean);
            const res = await fetch("/api/generate-recipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    dishName: `5-Minute ${list.slice(0, 2).join(" & ")} Emergency Express`,
                    dietaryGoal: profile?.goal || "Standard",
                    ingredientsList: list,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                if (data.recipe) {
                    const r = data.recipe;
                    const customEmergency: EmergencyRecipe = {
                        id: `ai-${Date.now()}`,
                        name: r.name || "AI 5-Minute Emergency Express",
                        time: "5 mins",
                        appliance: "Stovetop",
                        calories: 380,
                        protein: 20,
                        equipment: "1 Pan / Bowl",
                        ingredients: (r.ingredients || []).map((ing: any) => (typeof ing === "string" ? ing : `${ing.amount || "1"} ${ing.unit || ""} ${ing.name || ""}`)),
                        steps: (r.steps || []).map((s: any) => (typeof s === "string" ? s : s.english || s.hindi || "")),
                    };
                    setActiveRecipe(customEmergency);
                }
            }
        } catch (err) {
            console.error("Failed to generate AI emergency recipe:", err);
        } finally {
            setIsGeneratingAi(false);
            setAiIngredients("");
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <NavbarClient translations={navbarTranslations} />

            <main className="flex-1 container mx-auto px-4 py-8 pt-24 max-w-6xl">
                {/* Panic Banner */}
                <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl mb-10">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3 animate-pulse">
                                <Siren className="w-4 h-4 text-amber-300" /> Hangry Emergency Protocol
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
                                Starving? We Got You in 5 Mins.
                            </h1>
                            <p className="text-white/90 text-base md:text-lg max-w-xl">
                                Ultra-fast speed recipes categorized by what appliance is closest to you. Zero fluff, maximum flavor.
                            </p>
                        </div>

                        <button
                            onClick={handleRandomEmergency}
                            className="px-6 py-4 bg-white text-red-600 rounded-2xl font-black shadow-xl hover:bg-white/90 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 self-start md:self-auto"
                        >
                            <Zap className="w-5 h-5 fill-current" /> Panic Roulette (Pick For Me)
                        </button>
                    </div>
                </div>

                {/* Appliance Filter Bar */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
                    {["All", "Microwave", "Air Fryer", "Toaster", "Stovetop", "No-Cook"].map((app) => (
                        <button
                            key={app}
                            onClick={() => setSelectedAppliance(app)}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                                selectedAppliance === app
                                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30 scale-105"
                                    : "bg-secondary text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {app === "Microwave" && "⚡ "}
                            {app === "Air Fryer" && "💨 "}
                            {app === "Toaster" && "🍞 "}
                            {app === "Stovetop" && "🍳 "}
                            {app === "No-Cook" && "❄️ "}
                            {app}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Recipe List */}
                    <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-2">
                        {filteredRecipes.map((r) => {
                            const isSelected = activeRecipe.id === r.id;
                            return (
                                <div
                                    key={r.id}
                                    onClick={() => setActiveRecipe(r)}
                                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                                        isSelected
                                            ? "bg-red-500/10 border-red-500 dark:border-red-600 shadow-md"
                                            : "bg-white dark:bg-zinc-900 border-border hover:border-red-300"
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                                            {r.appliance}
                                        </span>
                                        <span className="text-xs font-extrabold text-red-500 flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" /> {r.time}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-foreground text-sm leading-snug">{r.name}</h4>
                                    <p className="text-xs text-muted-foreground mt-1">{r.calories} kcal • {r.protein}g protein</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: Active Recipe Viewer */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            key={activeRecipe.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 border border-border shadow-xl space-y-6"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-black uppercase tracking-wider mb-2">
                                        ⚡ {activeRecipe.time} Express • {activeRecipe.equipment}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black text-foreground">{activeRecipe.name}</h2>
                                </div>

                                <div className="text-right">
                                    <span className="text-2xl font-black text-foreground">{activeRecipe.calories}</span>{" "}
                                    <span className="text-xs font-medium text-muted-foreground block">kcal</span>
                                </div>
                            </div>

                            {/* Ingredients */}
                            <div>
                                <h3 className="text-sm font-extrabold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                                    <Package className="w-4 h-4 text-primary" /> Required Quick Ingredients
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {activeRecipe.ingredients.map((ing, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 rounded-xl bg-secondary text-xs font-semibold text-foreground border border-border/50"
                                        >
                                            {ing}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Panic Steps */}
                            <div>
                                <h3 className="text-sm font-extrabold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                                    <Flame className="w-4 h-4 text-red-500" /> Panic Instructions
                                </h3>
                                <div className="space-y-3">
                                    {activeRecipe.steps.map((st, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-3.5 bg-secondary/30 rounded-2xl border border-border/40">
                                            <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                                {idx + 1}
                                            </span>
                                            <p className="text-sm text-foreground font-medium">{st}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Direct Cook Assistant Button */}
                            <div className="pt-4 border-t border-border flex gap-4">
                                <button
                                    onClick={() => router.push(`/how-to-cook?dish=${encodeURIComponent(activeRecipe.name)}`)}
                                    className="flex-1 py-4 bg-red-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:bg-red-600 transition-all hover:scale-105 active:scale-95"
                                >
                                    <Utensils className="w-5 h-5" /> Start Cooking Assistant
                                </button>
                            </div>
                        </motion.div>

                        {/* AI Panic Rescue Input */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-border shadow-sm">
                            <h3 className="text-base font-bold text-foreground mb-1 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-amber-500" /> AI Panic Custom Rescue
                            </h3>
                            <p className="text-xs text-muted-foreground mb-4">
                                Have 2 random items in your fridge? Type them here and AI will generate an instant 5-minute meal.
                            </p>

                            <form onSubmit={handleGenerateAiEmergency} className="flex gap-2">
                                <input
                                    type="text"
                                    value={aiIngredients}
                                    onChange={(e) => setAiIngredients(e.target.value)}
                                    placeholder="e.g. Eggs, Tortilla, Hot Sauce"
                                    className="flex-1 px-4 py-3 rounded-xl border border-border bg-secondary/30 text-sm font-semibold outline-none focus:border-red-500 text-foreground"
                                />
                                <button
                                    type="submit"
                                    disabled={isGeneratingAi || !aiIngredients.trim()}
                                    className="px-5 py-3 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 disabled:opacity-50 flex items-center gap-1.5 transition-all"
                                >
                                    {isGeneratingAi ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                                    Rescue
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
