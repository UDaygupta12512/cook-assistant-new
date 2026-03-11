"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import { type Recipe } from "@/lib/recipe-data";
import { Compass, ChevronRight, ChefHat, Sparkles, CheckCircle2 } from "lucide-react";

type ChoiceInfo = {
    id: string;
    title: string;
    desc: string;
    icon: string;
    bgImage: string;
};

const STEPS = [
    {
        title: "The Foundation",
        question: "What's the base of your culinary adventure today?",
        choices: [
            { id: "noodles", title: "Slurpy Noodles", desc: "Long, satisfying carbs", icon: "🍜", bgImage: "from-amber-400 to-orange-500" },
            { id: "rice", title: "Fluffy Rice", desc: "The perfect flavor sponge", icon: "🍚", bgImage: "from-blue-400 to-indigo-500" },
        ]
    },
    {
        title: "The Protagonist",
        question: "Who is the star of this dish?",
        choices: [
            { id: "chicken", title: "Juicy Chicken", desc: "A reliable classic", icon: "🍗", bgImage: "from-red-400 to-rose-500" },
            { id: "tofu", title: "Crispy Tofu", desc: "Plant-based perfection", icon: "🌱", bgImage: "from-emerald-400 to-teal-500" },
            { id: "shrimp", title: "Succulent Shrimp", desc: "A taste of the sea", icon: "🍤", bgImage: "from-pink-400 to-fuchsia-500" },
        ]
    },
    {
        title: "The Plot Twist",
        question: "How do you want the story to end?",
        choices: [
            { id: "spicy", title: "Fiery & Spicy", desc: "Bring on the heat map", icon: "🌶️", bgImage: "from-orange-500 to-red-600" },
            { id: "creamy", title: "Rich & Creamy", desc: "A luxurious finish", icon: "🥛", bgImage: "from-yellow-200 to-amber-400" },
            { id: "tangy", title: "Zesty & Tangy", desc: "Bright citrus notes", icon: "🍋", bgImage: "from-yellow-400 to-lime-500" },
        ]
    }
];

const ADVENTURE_INGREDIENTS: Record<string, { name: string; nameHindi: string; amount: string; unit: string }> = {
    noodles: { name: "Noodles", nameHindi: "नूडल्स", amount: "200", unit: "g" },
    rice: { name: "Rice", nameHindi: "चावल", amount: "1", unit: "cup" },
    chicken: { name: "Chicken", nameHindi: "चिकन", amount: "250", unit: "g" },
    tofu: { name: "Tofu", nameHindi: "टोफू", amount: "200", unit: "g" },
    shrimp: { name: "Shrimp", nameHindi: "झींगा", amount: "200", unit: "g" },
    spicy: { name: "Chili Sauce", nameHindi: "चिली सॉस", amount: "2", unit: "tbsp" },
    creamy: { name: "Fresh Cream", nameHindi: "फ्रेश क्रीम", amount: "3", unit: "tbsp" },
    tangy: { name: "Lemon Juice", nameHindi: "नींबू का रस", amount: "2", unit: "tbsp" },
};

export default function AdventurePage() {
    const navbarTranslations = useNavbarTranslations();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState<string[]>([]);
    const [isCooking, setIsCooking] = useState(false);
    const [finalDish, setFinalDish] = useState<{ name: string, desc: string, steps: string[] } | null>(null);

    const handleSelect = (choiceId: string) => {
        const newSelections = [...selections, choiceId];
        setSelections(newSelections);

        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            generateFinalDish(newSelections);
        }
    };

    const generateFinalDish = (finalSelections: string[]) => {
        setIsCooking(true);
        setTimeout(() => {
            const [base, prot, vibe] = finalSelections;

            let name = "";
            let desc = "";
            let steps = [];

            if (vibe === "spicy") name += "Volcano ";
            if (vibe === "creamy") name += "Velvet ";
            if (vibe === "tangy") name += "Sunshine ";

            if (prot === "chicken") name += "Chicken ";
            if (prot === "tofu") name += "Tofu ";
            if (prot === "shrimp") name += "Shrimp ";

            if (base === "noodles") name += "Stir-Fry Noodles";
            if (base === "rice") name += "Rice Bowl";

            desc = `A highly customized culinary adventure featuring ${base} topped with ${prot}, finished in a ${vibe} signature sauce.`;

            steps = [
                `Prepare your ${base} according to the ancient scrolls (package instructions).`,
                `Sear the ${prot} until it achieves main-character energy.`,
                `Craft the ${vibe} sauce by combining secret ingredients.`,
                `Toss everything together and garnish with triumph.`,
            ];

            setFinalDish({ name, desc, steps });
            setIsCooking(false);
        }, 1500);
    };

    const resetAdventure = () => {
        setCurrentStep(0);
        setSelections([]);
        setFinalDish(null);
    };

    const handleMarkAsConquered = () => {
        if (!finalDish || typeof window === "undefined") return;

        const recipeId = Math.floor(100000 + Math.random() * 900000);
        const ingredients = selections
            .map((selection) => ADVENTURE_INGREDIENTS[selection])
            .filter(Boolean)
            .map((ingredient) => ({
                name: ingredient.name,
                nameHindi: ingredient.nameHindi,
                amount: ingredient.amount,
                unit: ingredient.unit,
            }));

        const recipe: Recipe = {
            id: recipeId,
            title: finalDish.name,
            titleHindi: finalDish.name,
            description: finalDish.desc,
            descriptionHindi: finalDish.desc,
            category: "Dinner",
            categoryHindi: "रात का खाना",
            prepTime: "15 min",
            cookTime: "20 min",
            totalTime: "35 min",
            servings: 2,
            rating: 5,
            image: "🧭",
            color: "bg-indigo-100 text-indigo-600",
            difficulty: "Medium",
            ingredients,
            steps: finalDish.steps,
            stepsHindi: finalDish.steps,
            chefTips: [
                "Prep the base and protein before heating the pan so the final assembly stays fast and smooth.",
                "Taste the finishing sauce before serving and adjust salt, acid, or heat in very small steps.",
            ],
            chefTipsHindi: [
                "पैन गर्म करने से पहले बेस और प्रोटीन तैयार रखें ताकि अंतिम पकाने की प्रक्रिया तेज रहे।",
                "परोसने से पहले सॉस का स्वाद चखें और नमक, खट्टापन या तीखापन धीरे-धीरे संतुलित करें।",
            ],
            substitutions: [],
            nutrition: {
                calories: 520,
                protein: 24,
                carbs: 48,
                fat: 18,
                fiber: 5,
                sugar: 6,
                sodium: 620,
            },
            tags: ["Adventure", ...selections],
        };

        localStorage.setItem(`cook-ai-recipe-${recipe.id}`, JSON.stringify(recipe));
        router.push(`/recipes/${recipe.id}`);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <NavbarClient translations={navbarTranslations} />

            <main className="flex-1 flex flex-col pt-24 pb-12">
                <div className="container mx-auto max-w-4xl px-4 flex flex-col flex-1">

                    {/* Header */}
                    <div className="text-center mb-12 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-500 rounded-full font-bold mb-4">
                            <Compass className="w-5 h-5 -rotate-45" />
                            Choose Your Own Recipe
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-2">
                            Culinary <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Adventures</span>
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg">
                            Build your meal step by step. Your choices shape the final masterpiece!
                        </p>
                    </div>

                    {isCooking && (
                        <div className="flex-1 flex flex-col items-center justify-center min-h-[40vh] animate-pulse">
                            <ChefHat className="w-24 h-24 text-indigo-500 mb-6" />
                            <h2 className="text-3xl font-bold text-foreground mb-2">Writing your story...</h2>
                            <p className="text-muted-foreground">The AI Chef is weaving your choices into a recipe.</p>
                        </div>
                    )}

                    {!isCooking && !finalDish && (
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="mb-8 overflow-hidden rounded-full bg-secondary h-2 max-w-md mx-auto w-full">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                    initial={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                                    animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                                />
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="flex flex-col items-center"
                                >
                                    <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-2 font-mono">Chapter {currentStep + 1}</h2>
                                    <h3 className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-10">{STEPS[currentStep].question}</h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl">
                                        {STEPS[currentStep].choices.map((choice) => (
                                            <button
                                                key={choice.id}
                                                onClick={() => handleSelect(choice.id)}
                                                className={`relative overflow-hidden group rounded-[2rem] p-8 text-left border-2 border-transparent hover:border-indigo-500/30 bg-white dark:bg-zinc-900 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1`}
                                            >
                                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${choice.bgImage} opacity-10 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-500`} />
                                                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform origin-left">{choice.icon}</div>
                                                <h4 className="text-xl font-bold text-foreground mb-2">{choice.title}</h4>
                                                <p className="text-sm text-muted-foreground">{choice.desc}</p>

                                                <div className="mt-8 flex items-center text-indigo-500 font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">
                                                    Select <ChevronRight className="w-4 h-4 ml-1" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )}

                    {finalDish && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-zinc-900 border border-border rounded-[2rem] overflow-hidden shadow-2xl max-w-2xl mx-auto w-full"
                        >
                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-10 text-white text-center relative overflow-hidden">
                                <Sparkles className="absolute top-4 right-4 text-white/20 w-32 h-32" />
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold border border-white/30 mb-6 shadow-sm shadow-black/10">
                                    <CheckCircle2 className="w-4 h-4" /> Your Legend Awaits
                                </div>
                                <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{finalDish.name}</h2>
                                <p className="text-lg text-indigo-100">{finalDish.desc}</p>
                            </div>

                            <div className="p-8 md:p-10">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Compass className="text-indigo-500 w-6 h-6" /> The Path
                                </h3>
                                <div className="space-y-6">
                                    {finalDish.steps.map((step, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 font-bold flex items-center justify-center flex-shrink-0">
                                                {i + 1}
                                            </div>
                                            <p className="text-foreground font-medium pt-1 leading-relaxed">{step}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 flex gap-4">
                                    <button
                                        onClick={resetAdventure}
                                        className="flex-1 py-4 bg-secondary font-bold text-foreground rounded-2xl hover:bg-secondary/80 transition-colors"
                                    >
                                        Embark Again
                                    </button>
                                    <button
                                        onClick={handleMarkAsConquered}
                                        className="flex-1 py-4 bg-indigo-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                                    >
                                        Mark as Conquered
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </div>
            </main>
            <Footer />
        </div>
    );
}
