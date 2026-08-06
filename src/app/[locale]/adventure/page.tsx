"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import { type Recipe } from "@/lib/recipe-data";
import { useDietaryStore } from "@/store/useDietaryStore";
import {
    Compass,
    ChevronRight,
    ChefHat,
    Sparkles,
    CheckCircle2,
    RotateCcw,
    Flame,
    Utensils,
    Clock,
    Heart,
    BookOpen,
    ArrowRight,
    Loader2,
} from "lucide-react";

type ChoiceInfo = {
    id: string;
    title: string;
    desc: string;
    icon: string;
    bgImage: string;
};

const STEPS: { title: string; question: string; choices: ChoiceInfo[] }[] = [
    {
        title: "The Foundation",
        question: "What's the base of your culinary adventure today?",
        choices: [
            { id: "noodles", title: "Hand-Pulled Noodles", desc: "Long, satisfying artisanal carbs", icon: "🍜", bgImage: "from-amber-400 to-orange-500" },
            { id: "rice", title: "Fluffy Jasmine Rice", desc: "The perfect flavor sponge", icon: "🍚", bgImage: "from-blue-400 to-indigo-500" },
            { id: "quinoa", title: "Ancient Quinoa", desc: "Nutty, high-protein superfood", icon: "🌾", bgImage: "from-emerald-400 to-teal-500" },
            { id: "flatbread", title: "Charred Naan / Flatbread", desc: "Warm, pillowy, woodfired crust", icon: "🫓", bgImage: "from-yellow-400 to-amber-600" },
        ],
    },
    {
        title: "The Protagonist",
        question: "Who is the star of this dish?",
        choices: [
            { id: "chicken", title: "Juicy Chicken Thighs", desc: "Tender, high-protein classic", icon: "🍗", bgImage: "from-red-400 to-rose-500" },
            { id: "tofu", title: "Crispy Golden Tofu", desc: "Plant-based umami perfection", icon: "🌱", bgImage: "from-emerald-400 to-teal-500" },
            { id: "shrimp", title: "Succulent Jumbo Shrimp", desc: "Sweet, briny taste of the sea", icon: "🍤", bgImage: "from-pink-400 to-fuchsia-500" },
            { id: "paneer", title: "Spiced Malai Paneer", desc: "Rich, creamy cottage cheese cubes", icon: "🧀", bgImage: "from-amber-400 to-orange-500" },
        ],
    },
    {
        title: "The Plot Twist",
        question: "How do you want the story to unfold?",
        choices: [
            { id: "spicy", title: "Fiery Chili Garlic Glaze", desc: "Wok-charred heat & fermented aromatics", icon: "🌶️", bgImage: "from-orange-500 to-red-600" },
            { id: "creamy", title: "Velvety Coconut Herb Sauce", desc: "Luxurious richness with lime leaves", icon: "🥥", bgImage: "from-yellow-200 to-amber-400" },
            { id: "tangy", title: "Zesty Citrus Ponzu", desc: "Bright yuzu, ginger & tamari contrast", icon: "🍋", bgImage: "from-yellow-400 to-lime-500" },
            { id: "smoky", title: "Smoky Black Pepper & Truffle", desc: "Deep earthy woods & cracked peppercorn", icon: "🪵", bgImage: "from-zinc-500 to-zinc-800" },
        ],
    },
];

type AdventureRecipe = {
    name: string;
    story: string;
    cookTime: string;
    servings: number;
    difficulty: "Easy" | "Medium" | "Hard";
    ingredients: { name: string; amount: string; unit: string }[];
    steps: string[];
    chefSecret: string;
};

export default function AdventurePage() {
    const navbarTranslations = useNavbarTranslations();
    const router = useRouter();
    const { profile } = useDietaryStore();

    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState<string[]>([]);
    const [isCooking, setIsCooking] = useState(false);
    const [loadingPhrase, setLoadingPhrase] = useState("Consulting the MasterChef...");
    const [finalRecipe, setFinalRecipe] = useState<AdventureRecipe | null>(null);
    const [savedToCookbook, setSavedToCookbook] = useState(false);

    const handleSelect = (choiceId: string) => {
        const newSelections = [...selections, choiceId];
        setSelections(newSelections);

        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            generateAdventureRecipe(newSelections);
        }
    };

    const generateAdventureRecipe = async (finalSelections: string[]) => {
        setIsCooking(true);
        setFinalRecipe(null);

        const phrases = [
            "Harmonizing flavor profiles...",
            "Simulating wok heat & Maillard reaction...",
            "Crafting authentic chef instructions...",
            "Finalizing culinary masterpiece...",
        ];
        let pIdx = 0;
        const interval = setInterval(() => {
            setLoadingPhrase(phrases[pIdx % phrases.length]);
            pIdx++;
        }, 900);

        try {
            const [base, prot, twist] = finalSelections;
            const dishTitle = `${twist.charAt(0).toUpperCase() + twist.slice(1)} ${prot.charAt(0).toUpperCase() + prot.slice(1)} with ${base.charAt(0).toUpperCase() + base.slice(1)}`;

            const res = await fetch("/api/generate-recipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    dishName: dishTitle,
                    dietaryGoal: profile?.goal || "Standard",
                    ingredientsList: [base, prot, twist, "Garlic", "Ginger", "Olive Oil", "Soy Sauce"],
                }),
            });

            if (res.ok) {
                const data = await res.json();
                if (data.recipe) {
                    const r = data.recipe;
                    setFinalRecipe({
                        name: r.name || dishTitle,
                        story: r.description || `An adventurous culinary creation balancing ${prot} with ${base} enveloped in a rich ${twist} infusion.`,
                        cookTime: r.cookTime || "25 mins",
                        servings: r.servings || 2,
                        difficulty: r.difficulty || "Medium",
                        ingredients: (r.ingredients || []).map((ing: any) => ({
                            name: typeof ing === "string" ? ing : (ing.name || ing.english || "Ingredient"),
                            amount: typeof ing === "string" ? "1" : (ing.amount || "1"),
                            unit: typeof ing === "string" ? "portion" : (ing.unit || "unit"),
                        })),
                        steps: (r.steps || []).map((st: any) => (typeof st === "string" ? st : (st.english || st.hindi || ""))),
                        chefSecret: r.tips?.[0] || "Sear on high heat to lock in natural moisture before glazing with the sauce.",
                    });
                }
            }
        } catch (err) {
            console.error("Adventure generation error:", err);
        } finally {
            clearInterval(interval);
            setIsCooking(false);
        }
    };

    const resetAdventure = () => {
        setCurrentStep(0);
        setSelections([]);
        setFinalRecipe(null);
        setSavedToCookbook(false);
    };

    const handleSaveToCookbook = () => {
        if (!finalRecipe || typeof window === "undefined") return;

        try {
            const stored = localStorage.getItem("cook-my-recipes") || "[]";
            const existing = JSON.parse(stored);

            const newRecipe: Recipe = {
                id: Math.floor(100000 + Math.random() * 900000),
                title: finalRecipe.name,
                titleHindi: finalRecipe.name,
                description: finalRecipe.story,
                descriptionHindi: finalRecipe.story,
                category: "Dinner",
                categoryHindi: "रात का खाना",
                difficulty: finalRecipe.difficulty,
                prepTime: "10 mins",
                cookTime: finalRecipe.cookTime,
                totalTime: finalRecipe.cookTime,
                servings: finalRecipe.servings,
                rating: 4.9,
                image: "✨",
                color: "bg-purple-100 text-purple-600",
                tags: ["AI Generated", "Adventure", profile?.goal || "High Protein"],
                ingredients: finalRecipe.ingredients.map((ing) => ({
                    name: ing.name,
                    nameHindi: ing.name,
                    amount: ing.amount,
                    unit: ing.unit,
                })),
                steps: finalRecipe.steps,
                stepsHindi: finalRecipe.steps,
                nutrition: { calories: 520, protein: 36, carbs: 48, fat: 18, fiber: 5, sugar: 4, sodium: 580 },
                chefTips: [finalRecipe.chefSecret],
                chefTipsHindi: [finalRecipe.chefSecret],
                substitutions: [],
            };

            localStorage.setItem("cook-my-recipes", JSON.stringify([...existing, newRecipe]));
            setSavedToCookbook(true);
        } catch (err) {
            console.error("Failed to save recipe:", err);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <NavbarClient translations={navbarTranslations} />

            <main className="flex-1 container mx-auto px-4 py-8 pt-24 max-w-5xl flex flex-col items-center justify-center min-h-[80vh]">
                {/* Hero Title */}
                <div className="text-center mb-10 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-bold mb-4">
                        <Compass className="w-5 h-5 animate-spin-slow" />
                        Culinary Adventure Mode
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-2">
                        Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-amber-500">Masterpiece</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Choose your canvas, hero, and flavor climax. Our AI Chef will synthesize an authentic, Michelin-grade fusion recipe in seconds.
                    </p>
                </div>

                {/* Step Indicator */}
                {!finalRecipe && !isCooking && (
                    <div className="flex items-center gap-3 mb-8">
                        {STEPS.map((step, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div
                                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                                        currentStep === idx
                                            ? "bg-primary text-white scale-110 shadow-lg shadow-primary/30"
                                            : currentStep > idx
                                            ? "bg-emerald-500 text-white"
                                            : "bg-secondary text-muted-foreground"
                                    }`}
                                >
                                    {currentStep > idx ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                                </div>
                                <span className={`text-xs font-semibold hidden sm:inline ${currentStep === idx ? "text-foreground font-bold" : "text-muted-foreground"}`}>
                                    {step.title}
                                </span>
                                {idx < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground/50" />}
                            </div>
                        ))}
                    </div>
                )}

                {/* Step Cards Selection */}
                {!finalRecipe && !isCooking && (
                    <div className="w-full">
                        <h2 className="text-2xl font-black text-center text-foreground mb-6">
                            {STEPS[currentStep].question}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {STEPS[currentStep].choices.map((choice) => (
                                <motion.button
                                    key={choice.id}
                                    whileHover={{ scale: 1.03, y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSelect(choice.id)}
                                    className="group bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-border hover:border-primary shadow-sm hover:shadow-xl transition-all text-left flex flex-col justify-between h-56"
                                >
                                    <div>
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${choice.bgImage} flex items-center justify-center text-3xl shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                                            {choice.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                            {choice.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                            {choice.desc}
                                        </p>
                                    </div>
                                    <div className="flex items-center text-xs font-bold text-primary gap-1 group-hover:translate-x-1 transition-transform">
                                        Choose <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {isCooking && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16 px-8 bg-white dark:bg-zinc-900 rounded-3xl border border-border shadow-xl max-w-md w-full"
                    >
                        <div className="relative w-20 h-20 mx-auto mb-6">
                            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center text-white shadow-lg">
                                <ChefHat className="w-10 h-10 animate-bounce" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-black text-foreground mb-2">Simulating Culinary Alchemy</h3>
                        <p className="text-muted-foreground font-medium">{loadingPhrase}</p>
                    </motion.div>
                )}

                {/* Final Generated Masterpiece */}
                {finalRecipe && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 border border-border shadow-2xl space-y-8"
                    >
                        {/* Title & Badge */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                <Sparkles className="w-4 h-4" /> AI Generated Masterpiece
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
                                {finalRecipe.name}
                            </h2>
                            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                                {finalRecipe.story}
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/50 rounded-2xl">
                            <div className="text-center">
                                <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                                <p className="text-xs text-muted-foreground font-medium">Cook Time</p>
                                <p className="text-sm font-bold text-foreground">{finalRecipe.cookTime}</p>
                            </div>
                            <div className="text-center">
                                <Utensils className="w-5 h-5 text-primary mx-auto mb-1" />
                                <p className="text-xs text-muted-foreground font-medium">Servings</p>
                                <p className="text-sm font-bold text-foreground">{finalRecipe.servings} Portions</p>
                            </div>
                            <div className="text-center">
                                <Flame className="w-5 h-5 text-primary mx-auto mb-1" />
                                <p className="text-xs text-muted-foreground font-medium">Difficulty</p>
                                <p className="text-sm font-bold text-foreground">{finalRecipe.difficulty}</p>
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                                <ChefHat className="w-5 h-5 text-primary" /> Measured Ingredients
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                                {finalRecipe.ingredients.map((ing, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-secondary/30 rounded-xl border border-border/50">
                                        <span className="text-sm font-semibold text-foreground">{ing.name}</span>
                                        <span className="text-xs font-mono font-bold text-primary">{ing.amount} {ing.unit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Step-by-Step Instructions */}
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-primary" /> Chef Instructions
                            </h3>
                            <div className="space-y-3">
                                {finalRecipe.steps.map((step, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 bg-secondary/20 rounded-2xl border border-border/40">
                                        <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                            {idx + 1}
                                        </span>
                                        <p className="text-sm text-foreground leading-relaxed">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chef's Secret Tip */}
                        <div className="p-5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border-l-4 border-amber-500 rounded-r-2xl">
                            <h4 className="text-sm font-extrabold text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4" /> MasterChef's Secret Technique
                            </h4>
                            <p className="text-xs md:text-sm text-muted-foreground">{finalRecipe.chefSecret}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 border-t border-border flex flex-wrap gap-4">
                            <button
                                onClick={handleSaveToCookbook}
                                className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all"
                            >
                                <Heart className={`w-5 h-5 ${savedToCookbook ? "fill-white" : ""}`} />
                                {savedToCookbook ? "Saved to My Recipes! ✓" : "Save Recipe to Cookbook"}
                            </button>
                            <button
                                onClick={() => router.push(`/how-to-cook?dish=${encodeURIComponent(finalRecipe.name)}`)}
                                className="flex-1 py-4 bg-secondary text-foreground font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-secondary/80 transition-all"
                            >
                                <Utensils className="w-5 h-5" />
                                Cook with Voice & Audio
                            </button>
                            <button
                                onClick={resetAdventure}
                                className="px-6 py-4 bg-transparent border border-border text-muted-foreground font-bold rounded-2xl flex items-center gap-2 hover:bg-secondary transition-all"
                            >
                                <RotateCcw className="w-4 h-4" /> Reset
                            </button>
                        </div>
                    </motion.div>
                )}
            </main>

            <Footer />
        </div>
    );
}
