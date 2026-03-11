"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Leaf,
    Search,
    Loader2,
    AlertCircle,
    TrendingDown,
    TrendingUp,
    ChefHat,
    Lightbulb,
    ArrowRight,
    Flame,
    Zap,
} from "lucide-react";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OriginalIngredient {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    concern: string;
}

interface SwapItem {
    name: string;
    emoji: string;
    subtext: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    ratio: string;
    benefit: string;
    bestFor: string[];
    tasteNote: string;
    calorieSavings: number;
}

interface SwapResult {
    original: OriginalIngredient;
    swaps: SwapItem[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GOALS = [
    "General Health",
    "Weight Loss",
    "Muscle Gain",
    "Keto",
    "Vegan",
    "Heart Health",
    "Diabetic-Friendly",
] as const;

type Goal = (typeof GOALS)[number];

const POPULAR_SEARCHES = [
    "Butter",
    "White Sugar",
    "White Rice",
    "Cream",
    "White Bread",
    "Salt",
    "Mayonnaise",
    "Whole Milk",
];

const COOKING_TIPS = [
    {
        icon: Leaf,
        title: "Start small",
        tip: "Replace 50% of an ingredient first to let your palate adjust before going full swap.",
    },
    {
        icon: Zap,
        title: "Taste as you go",
        tip: "Healthier swaps can alter sweetness, saltiness, or moisture — adjust seasonings gradually.",
    },
    {
        icon: ChefHat,
        title: "Texture matters",
        tip: "Some swaps change texture (e.g., applesauce for oil makes baked goods denser). Embrace the difference!",
    },
];

// ─── Nutrition Row Component ──────────────────────────────────────────────────

function NutritionRow({
    label,
    value,
    unit = "g",
}: {
    label: string;
    value: number;
    unit?: string;
}) {
    return (
        <div className="flex justify-between items-center py-1 text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-semibold text-foreground">
                {value}
                {unit}
            </span>
        </div>
    );
}

// ─── Macro Indicator Dots ─────────────────────────────────────────────────────

function MacroDots({
    protein,
    carbs,
    fat,
}: {
    protein: number;
    carbs: number;
    fat: number;
}) {
    return (
        <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                <span className="text-muted-foreground">
                    P <span className="font-bold text-foreground">{protein}g</span>
                </span>
            </span>
            <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span className="text-muted-foreground">
                    C <span className="font-bold text-foreground">{carbs}g</span>
                </span>
            </span>
            <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                <span className="text-muted-foreground">
                    F <span className="font-bold text-foreground">{fat}g</span>
                </span>
            </span>
        </div>
    );
}

// ─── Swap Card Component ──────────────────────────────────────────────────────

function SwapCard({ swap, index }: { swap: SwapItem; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                    <span className="text-4xl leading-none">{swap.emoji}</span>
                    <div>
                        <h3 className="font-bold text-foreground text-base leading-tight">
                            {swap.name}
                        </h3>
                        <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                            {swap.subtext}
                        </p>
                    </div>
                </div>

                {/* Calorie savings badge */}
                {swap.calorieSavings > 0 ? (
                    <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                        <TrendingDown className="w-3 h-3" />
                        -{swap.calorieSavings} kcal
                    </span>
                ) : (
                    <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-xs font-bold">
                        <TrendingUp className="w-3 h-3" />
                        +{Math.abs(swap.calorieSavings)} kcal
                    </span>
                )}
            </div>

            {/* Calories */}
            <div className="flex items-center gap-1.5 mb-3">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-sm font-semibold text-foreground">
                    {swap.calories} kcal
                </span>
                <span className="text-xs text-muted-foreground">/ 100g</span>
            </div>

            {/* Macro indicator dots */}
            <div className="mb-3 pb-3 border-b border-emerald-200 dark:border-emerald-800">
                <MacroDots protein={swap.protein} carbs={swap.carbs} fat={swap.fat} />
            </div>

            {/* Benefit */}
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {swap.benefit}
            </p>

            {/* Substitution ratio */}
            <div className="flex items-start gap-2 bg-emerald-100/60 dark:bg-emerald-900/30 rounded-xl px-3 py-2 mb-3">
                <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-emerald-800 dark:text-emerald-300 leading-snug">
                    {swap.ratio}
                </p>
            </div>

            {/* Taste note */}
            <p className="text-xs text-muted-foreground italic mb-3">
                Taste: {swap.tasteNote}
            </p>

            {/* Best For tags */}
            <div className="flex flex-wrap gap-1.5">
                {swap.bestFor.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-white dark:bg-zinc-800 border border-emerald-200 dark:border-emerald-700 text-xs text-emerald-700 dark:text-emerald-400 font-medium"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HealthySwapsPage() {
    const navbarTranslations = useNavbarTranslations();

    const [ingredient, setIngredient] = useState("");
    const [goal, setGoal] = useState<Goal>("General Health");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<SwapResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFindSwaps = async (searchIngredient?: string) => {
        const query = searchIngredient ?? ingredient;
        if (!query.trim()) return;

        if (searchIngredient) {
            setIngredient(searchIngredient);
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await fetch("/api/healthy-swaps", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ingredient: query.trim(), goal }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(
                    errData.error || `Request failed with status ${res.status}`
                );
            }

            const json = await res.json();

            if (!json.data || !json.data.original || !json.data.swaps) {
                throw new Error("Unexpected response format from server.");
            }

            setResult(json.data as SwapResult);
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Something went wrong. Please try again.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleFindSwaps();
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <NavbarClient translations={navbarTranslations} />

            <main className="flex-1 container mx-auto px-4 py-8 pt-24">
                <div className="max-w-4xl mx-auto">

                    {/* ── Hero Section ─────────────────────────────────────────── */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-200 dark:border-emerald-800 mb-6">
                            <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                Smarter Cooking Choices
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
                            Healthy Ingredient{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">
                                Swaps
                            </span>
                        </h1>

                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Replace unhealthy ingredients with smarter alternatives &mdash; without
                            sacrificing taste.
                        </p>
                    </div>

                    {/* ── Input Section ────────────────────────────────────────── */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-border shadow-sm p-6 md:p-8 mb-6">
                        <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                            <Search className="w-5 h-5 text-emerald-600" />
                            What would you like to swap?
                        </h2>

                        <div className="flex flex-col md:flex-row gap-3 mb-4">
                            {/* Ingredient Input */}
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) => setIngredient(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter ingredient to replace (e.g., butter, white sugar, cream...)"
                                className="flex-1 px-4 py-3 border-2 border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 transition-colors text-base"
                            />

                            {/* Goal Dropdown */}
                            <select
                                value={goal}
                                onChange={(e) => setGoal(e.target.value as Goal)}
                                aria-label="Health goal"
                                className="md:w-52 px-4 py-3 border-2 border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer appearance-none text-base"
                            >
                                {GOALS.map((g) => (
                                    <option key={g} value={g}>
                                        {g}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Find Swaps Button */}
                        <button
                            type="button"
                            onClick={() => handleFindSwaps()}
                            disabled={!ingredient.trim() || isLoading}
                            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Finding swaps...
                                </>
                            ) : (
                                <>
                                    <Leaf className="w-5 h-5" />
                                    Find Swaps
                                </>
                            )}
                        </button>
                    </div>

                    {/* ── Popular Search Chips ─────────────────────────────────── */}
                    {!result && !isLoading && (
                        <div className="mb-8">
                            <p className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5 text-amber-500" />
                                Popular searches
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {POPULAR_SEARCHES.map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() => handleFindSwaps(item)}
                                        className="px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 text-sm text-emerald-700 dark:text-emerald-400 font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:border-emerald-400 transition-all"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── Loading State ─────────────────────────────────────────── */}
                    <AnimatePresence>
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-border"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 mb-5 shadow-lg">
                                    <Leaf className="w-8 h-8 text-white animate-pulse" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Analysing ingredient...</h3>
                                <p className="text-muted-foreground">
                                    Our AI nutritionist is finding the best swaps for{" "}
                                    <span className="font-semibold text-foreground">{ingredient}</span>
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Error State ───────────────────────────────────────────── */}
                    <AnimatePresence>
                        {error && !isLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-start gap-3 p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive mb-6"
                            >
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold">Could not load swaps</p>
                                    <p className="text-sm mt-0.5 text-destructive/80">{error}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Results ───────────────────────────────────────────────── */}
                    <AnimatePresence>
                        {result && !isLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                            >
                                {/* Original Ingredient Card */}
                                <div className="border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/20 rounded-2xl p-5 mb-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <AlertCircle className="w-4 h-4 text-rose-500" />
                                        <span className="text-sm font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide">
                                            Original Ingredient
                                        </span>
                                    </div>

                                    <div className="flex flex-col md:flex-row md:items-start gap-5">
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-extrabold text-foreground capitalize mb-1">
                                                {result.original.name}
                                            </h2>
                                            <p className="text-sm text-rose-600 dark:text-rose-400 font-medium leading-snug">
                                                Why swap? {result.original.concern}
                                            </p>
                                        </div>

                                        {/* Nutrition facts */}
                                        <div className="md:w-56 bg-white dark:bg-zinc-900 rounded-xl border border-rose-200 dark:border-rose-800 px-4 py-3 text-sm">
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                                                Per 100g
                                            </p>
                                            <div className="space-y-0.5 divide-y divide-rose-100 dark:divide-rose-900">
                                                <NutritionRow
                                                    label="Calories"
                                                    value={result.original.calories}
                                                    unit=" kcal"
                                                />
                                                <NutritionRow
                                                    label="Protein"
                                                    value={result.original.protein}
                                                />
                                                <NutritionRow
                                                    label="Carbs"
                                                    value={result.original.carbs}
                                                />
                                                <NutritionRow
                                                    label="Fat"
                                                    value={result.original.fat}
                                                />
                                                <NutritionRow
                                                    label="Fiber"
                                                    value={result.original.fiber}
                                                />
                                                <NutritionRow
                                                    label="Sugar"
                                                    value={result.original.sugar}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Swap Cards Grid */}
                                <div className="mb-2">
                                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                        <Leaf className="w-5 h-5 text-emerald-500" />
                                        Healthier Alternatives for{" "}
                                        <span className="text-emerald-600 dark:text-emerald-400 capitalize">
                                            {result.original.name}
                                        </span>
                                        <span className="ml-1 text-sm font-medium text-muted-foreground">
                                            ({goal})
                                        </span>
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                        {result.swaps.map((swap, idx) => (
                                            <SwapCard key={swap.name} swap={swap} index={idx} />
                                        ))}
                                    </div>
                                </div>

                                {/* How To Use Tips */}
                                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-border p-6">
                                    <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                                        <Lightbulb className="w-5 h-5 text-amber-500" />
                                        How to use healthy swaps
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {COOKING_TIPS.map((tip) => {
                                            const Icon = tip.icon;
                                            return (
                                                <div
                                                    key={tip.title}
                                                    className="flex flex-col gap-2 p-4 rounded-xl bg-secondary/40 border border-border"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
                                                            <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                                        </div>
                                                        <span className="font-semibold text-sm text-foreground">
                                                            {tip.title}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                                        {tip.tip}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <Footer />
        </div>
    );
}
