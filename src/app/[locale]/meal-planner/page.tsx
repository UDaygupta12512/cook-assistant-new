"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import { useDietaryStore } from "@/store/useDietaryStore";
import {
    Calendar,
    Flame,
    Sparkles,
    RefreshCw,
    ShoppingBag,
    ChefHat,
    Clock,
    CheckCircle2,
    Zap,
    Plus,
    X,
    ChevronRight,
    ArrowRight,
    Copy,
    Share2,
} from "lucide-react";
import type { MealItem, DayPlan, WeeklyMealPlan } from "@/app/api/meal-plan/route";
import { ALL_RECIPES } from "@/lib/recipe-data";

const STORAGE_KEY = "cook-meal-planner-data";

const MEAL_ICONS: Record<string, { icon: string; title: string; color: string; bg: string }> = {
    breakfast: { icon: "🍳", title: "Breakfast", color: "text-amber-500", bg: "bg-amber-500/10 border-amber-200 dark:border-amber-900/40" },
    lunch: { icon: "🥗", title: "Lunch", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-200 dark:border-emerald-900/40" },
    dinner: { icon: "🥩", title: "Dinner", color: "text-rose-500", bg: "bg-rose-500/10 border-rose-200 dark:border-rose-900/40" },
    snack: { icon: "🍎", title: "Snack", color: "text-purple-500", bg: "bg-purple-500/10 border-purple-200 dark:border-purple-900/40" },
};

const DEFAULT_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function MealPlannerPage() {
    const navbarTranslations = useNavbarTranslations();
    const { profile } = useDietaryStore();

    const [mealPlan, setMealPlan] = useState<WeeklyMealPlan | null>(null);
    const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
    const [isGenerating, setIsGenerating] = useState(false);
    const [calorieTarget, setCalorieTarget] = useState<number>(2100);
    const [showGroceryModal, setShowGroceryModal] = useState(false);
    const [copiedGrocery, setCopiedGrocery] = useState(false);
    const [customItemModal, setCustomItemModal] = useState<{ dayIdx: number; slot: "breakfast" | "lunch" | "dinner" | "snack" } | null>(null);
    const [customName, setCustomName] = useState("");
    const [customCalories, setCustomCalories] = useState("450");
    const [customProtein, setCustomProtein] = useState("30");

    // Load from localStorage or initialize
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (parsed?.days?.length === 7) {
                        setMealPlan(parsed);
                        return;
                    }
                }
            } catch (err) {
                console.error("Failed to load saved meal plan:", err);
            }
            // If no valid stored plan, auto-generate on first visit
            generatePlan();
        }
    }, []);

    // Save to localStorage when updated
    useEffect(() => {
        if (mealPlan && typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mealPlan));
        }
    }, [mealPlan]);

    const generatePlan = async () => {
        setIsGenerating(true);
        try {
            // Check pantry items
            let pantryList: string[] = [];
            if (typeof window !== "undefined") {
                const pStored = localStorage.getItem("cook-pantry-items");
                if (pStored) {
                    try {
                        const parsed = JSON.parse(pStored);
                        if (Array.isArray(parsed)) {
                            pantryList = parsed.map((item: { name: string }) => item.name);
                        }
                    } catch {}
                }
            }

            const res = await fetch("/api/meal-plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    goal: profile?.goal || "High Protein",
                    targetCalories: calorieTarget,
                    pantryItems: pantryList.slice(0, 8),
                }),
            });

            if (res.ok) {
                const json = await res.json();
                if (json.data) {
                    setMealPlan(json.data);
                }
            }
        } catch (err) {
            console.error("Failed to generate meal plan:", err);
        } finally {
            setIsGenerating(false);
        }
    };

    const currentDayPlan: DayPlan | undefined = mealPlan?.days?.[selectedDayIndex];

    // Compute weekly averages
    const weeklySummary = useMemo(() => {
        if (!mealPlan?.days || mealPlan.days.length === 0) return { avgCal: 0, avgProt: 0, avgCarbs: 0, avgFat: 0 };
        const total = mealPlan.days.reduce(
            (acc, d) => ({
                cal: acc.cal + d.totalCalories,
                prot: acc.prot + d.totalProtein,
                carbs: acc.carbs + d.totalCarbs,
                fat: acc.fat + d.totalFat,
            }),
            { cal: 0, prot: 0, carbs: 0, fat: 0 }
        );
        const count = mealPlan.days.length;
        return {
            avgCal: Math.round(total.cal / count),
            avgProt: Math.round(total.prot / count),
            avgCarbs: Math.round(total.carbs / count),
            avgFat: Math.round(total.fat / count),
        };
    }, [mealPlan]);

    // Grocery List Aggregator
    const groceryList = useMemo(() => {
        if (!mealPlan?.days) return [];
        const itemsMap: Record<string, number> = {};
        mealPlan.days.forEach((day) => {
            ["breakfast", "lunch", "dinner", "snack"].forEach((slotKey) => {
                const meal = day[slotKey as keyof DayPlan] as MealItem;
                if (meal?.ingredients) {
                    meal.ingredients.forEach((ing) => {
                        const trimmed = ing.trim();
                        if (trimmed) {
                            itemsMap[trimmed] = (itemsMap[trimmed] || 0) + 1;
                        }
                    });
                }
            });
        });
        return Object.entries(itemsMap).map(([name, count]) => ({ name, count }));
    }, [mealPlan]);

    const copyGroceryText = () => {
        const text = groceryList.map((item) => `• ${item.name} (${item.count} meals)`).join("\n");
        navigator.clipboard.writeText(`🛒 Chef AI - Weekly Grocery List\n\n${text}`);
        setCopiedGrocery(true);
        setTimeout(() => setCopiedGrocery(false), 2000);
    };

    const handleSaveCustomItem = () => {
        if (!customItemModal || !mealPlan) return;
        const { dayIdx, slot } = customItemModal;
        const updatedDays = [...mealPlan.days];
        const day = { ...updatedDays[dayIdx] };

        const newMeal: MealItem = {
            name: customName.trim() || "Custom Meal",
            description: "Custom user meal",
            calories: Number(customCalories) || 400,
            protein: Number(customProtein) || 25,
            carbs: 40,
            fat: 15,
            prepTime: "15 mins",
            ingredients: [customName.trim() || "Ingredients"],
        };

        day[slot] = newMeal;
        day.totalCalories = day.breakfast.calories + day.lunch.calories + day.dinner.calories + day.snack.calories;
        day.totalProtein = day.breakfast.protein + day.lunch.protein + day.dinner.protein + day.snack.protein;
        day.totalCarbs = day.breakfast.carbs + day.lunch.carbs + day.dinner.carbs + day.snack.carbs;
        day.totalFat = day.breakfast.fat + day.lunch.fat + day.dinner.fat + day.snack.fat;

        updatedDays[dayIdx] = day;
        setMealPlan({ ...mealPlan, days: updatedDays });
        setCustomItemModal(null);
        setCustomName("");
    };

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <NavbarClient translations={navbarTranslations} />

            <main className="flex-1 container mx-auto px-4 py-8 pt-24 max-w-7xl">
                {/* Header Banner */}
                <div className="relative overflow-hidden bg-gradient-to-br from-primary/95 via-orange-600 to-amber-500 rounded-[2.5rem] shadow-2xl p-8 md:p-12 text-white mb-10">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                <Sparkles className="w-4 h-4" /> AI Nutrition Engine
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
                                7-Day Smart Meal Planner
                            </h1>
                            <p className="text-white/90 text-base md:text-lg max-w-xl">
                                Fully synchronized macro targets, dynamic AI recipe recommendations, and one-click grocery lists for your dietary goal ({profile?.goal || "High Protein"}).
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={generatePlan}
                                disabled={isGenerating}
                                className="flex items-center gap-2 px-6 py-3.5 bg-white text-primary rounded-2xl font-bold shadow-lg hover:bg-white/95 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                            >
                                <RefreshCw className={`w-5 h-5 ${isGenerating ? "animate-spin" : ""}`} />
                                {isGenerating ? "Synthesizing AI Plan..." : "Auto-Generate Week with AI"}
                            </button>
                            <button
                                onClick={() => setShowGroceryModal(true)}
                                className="flex items-center gap-2 px-5 py-3.5 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-2xl font-bold hover:bg-white/30 transition-all"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Grocery List ({groceryList.length})
                            </button>
                        </div>
                    </div>
                </div>

                {/* Macro Target & Quick Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-border shadow-sm flex items-center gap-4">
                        <div className="p-3.5 rounded-2xl bg-orange-500/10 text-orange-500">
                            <Flame className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-semibold uppercase">Weekly Daily Avg</p>
                            <p className="text-2xl font-black text-foreground">{weeklySummary.avgCal} <span className="text-sm font-medium text-muted-foreground">kcal</span></p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-border shadow-sm flex items-center gap-4">
                        <div className="p-3.5 rounded-2xl bg-blue-500/10 text-blue-500">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-semibold uppercase">Target Protein</p>
                            <p className="text-2xl font-black text-foreground">{weeklySummary.avgProt}g <span className="text-xs text-emerald-500 font-bold">/ day</span></p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-border shadow-sm flex items-center gap-4">
                        <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-500">
                            <ChefHat className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-semibold uppercase">Dietary Goal</p>
                            <p className="text-xl font-extrabold text-foreground truncate">{profile?.goal || "High Protein"}</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-border shadow-sm flex items-center gap-4">
                        <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-500">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-semibold uppercase">Planner Status</p>
                            <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">7/7 Days Ready</p>
                        </div>
                    </div>
                </div>

                {/* Day Navigation Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
                    {DEFAULT_DAYS.map((dayName, idx) => {
                        const dayData = mealPlan?.days?.[idx];
                        const isSelected = selectedDayIndex === idx;
                        return (
                            <button
                                key={dayName}
                                onClick={() => setSelectedDayIndex(idx)}
                                className={`flex-1 min-w-[120px] p-4 rounded-2xl border text-left transition-all relative ${
                                    isSelected
                                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105 z-10 font-bold"
                                        : "bg-white dark:bg-zinc-900 border-border text-foreground hover:border-primary/50"
                                }`}
                            >
                                <p className={`text-xs uppercase font-semibold ${isSelected ? "text-white/80" : "text-muted-foreground"}`}>
                                    Day {idx + 1}
                                </p>
                                <p className="text-base font-extrabold">{dayName}</p>
                                <p className={`text-xs mt-1 font-mono font-bold ${isSelected ? "text-white/90" : "text-primary"}`}>
                                    {dayData?.totalCalories || calorieTarget} kcal
                                </p>
                            </button>
                        );
                    })}
                </div>

                {/* Main Day Content */}
                {currentDayPlan ? (
                    <div className="space-y-6">
                        {/* Day Header Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-border shadow-sm">
                            <div>
                                <h2 className="text-2xl font-black text-foreground flex items-center gap-3">
                                    <Calendar className="w-6 h-6 text-primary" />
                                    {currentDayPlan.day}'s Culinary Schedule
                                </h2>
                                <p className="text-muted-foreground text-sm mt-1">
                                    Estimated Nutrition: {currentDayPlan.totalCalories} kcal • {currentDayPlan.totalProtein}g Protein • {currentDayPlan.totalCarbs}g Carbs • {currentDayPlan.totalFat}g Fat
                                </p>
                            </div>

                            {/* Macro Progress Bar */}
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold">
                                    P: {currentDayPlan.totalProtein}g
                                </span>
                                <span className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold">
                                    C: {currentDayPlan.totalCarbs}g
                                </span>
                                <span className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-mono text-xs font-bold">
                                    F: {currentDayPlan.totalFat}g
                                </span>
                            </div>
                        </div>

                        {/* 4 Meal Slot Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(["breakfast", "lunch", "dinner", "snack"] as const).map((slotKey) => {
                                const meal = currentDayPlan[slotKey];
                                const slotMeta = MEAL_ICONS[slotKey];

                                return (
                                    <motion.div
                                        key={slotKey}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-border shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2.5">
                                                    <span className="text-2xl">{slotMeta.icon}</span>
                                                    <div>
                                                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                            {slotMeta.title}
                                                        </span>
                                                        <h3 className="text-lg font-bold text-foreground leading-snug">
                                                            {meal?.name || "No meal assigned"}
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1.5 bg-secondary/80 px-3 py-1.5 rounded-xl">
                                                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                                                    <span className="text-xs font-semibold text-muted-foreground">{meal?.prepTime || "15 mins"}</span>
                                                </div>
                                            </div>

                                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                                {meal?.description}
                                            </p>

                                            {/* Ingredients chips */}
                                            {meal?.ingredients && meal.ingredients.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mb-4">
                                                    {meal.ingredients.map((ing, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-2.5 py-0.5 rounded-full bg-secondary text-xs text-foreground/80 font-medium"
                                                        >
                                                            {ing}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-3">
                                                <span className="font-extrabold text-foreground text-sm font-mono">
                                                    {meal?.calories} <span className="text-xs text-muted-foreground font-sans">kcal</span>
                                                </span>
                                                <span className="text-xs font-semibold text-blue-500 font-mono">
                                                    {meal?.protein}g protein
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => setCustomItemModal({ dayIdx: selectedDayIndex, slot: slotKey })}
                                                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                                            >
                                                Edit / Swap <ChevronRight className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white dark:bg-zinc-900 rounded-3xl border border-border">
                        <RefreshCw className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-foreground">Preparing your personalized meal plan...</h3>
                    </div>
                )}

                {/* Grocery List Modal */}
                <AnimatePresence>
                    {showGroceryModal && (
                        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-border"
                            >
                                <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                                    <div className="flex items-center gap-2">
                                        <ShoppingBag className="w-6 h-6 text-primary" />
                                        <h3 className="text-xl font-bold text-foreground">7-Day Grocery List</h3>
                                    </div>
                                    <button
                                        onClick={() => setShowGroceryModal(false)}
                                        className="p-2 rounded-full hover:bg-secondary text-muted-foreground"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <p className="text-xs text-muted-foreground mb-4">
                                    Aggregated across all 28 meals for the upcoming week.
                                </p>

                                <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                                    {groceryList.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between p-3 bg-secondary/50 rounded-2xl"
                                        >
                                            <span className="text-sm font-semibold text-foreground">{item.name}</span>
                                            <span className="text-xs font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">
                                                {item.count} {item.count > 1 ? "meals" : "meal"}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 mt-4 border-t border-border flex gap-3">
                                    <button
                                        onClick={copyGroceryText}
                                        className="flex-1 py-3 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all"
                                    >
                                        {copiedGrocery ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        {copiedGrocery ? "Copied to Clipboard!" : "Copy Grocery List"}
                                    </button>
                                    <button
                                        onClick={() => setShowGroceryModal(false)}
                                        className="px-5 py-3 bg-secondary text-foreground font-bold rounded-2xl hover:bg-secondary/80"
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Edit / Swap Custom Item Modal */}
                <AnimatePresence>
                    {customItemModal && (
                        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-border"
                            >
                                <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                                    <h3 className="text-xl font-bold text-foreground">
                                        Edit {MEAL_ICONS[customItemModal.slot].title}
                                    </h3>
                                    <button
                                        onClick={() => setCustomItemModal(null)}
                                        className="p-2 rounded-full hover:bg-secondary text-muted-foreground"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-muted-foreground block mb-1 uppercase">Meal Name</label>
                                        <input
                                            type="text"
                                            value={customName}
                                            onChange={(e) => setCustomName(e.target.value)}
                                            placeholder="e.g. Grilled Salmon Salad"
                                            className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/30 font-semibold outline-none focus:border-primary text-foreground"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs font-bold text-muted-foreground block mb-1 uppercase">Calories (kcal)</label>
                                            <input
                                                type="number"
                                                value={customCalories}
                                                onChange={(e) => setCustomCalories(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/30 font-semibold outline-none focus:border-primary text-foreground"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-muted-foreground block mb-1 uppercase">Protein (g)</label>
                                            <input
                                                type="number"
                                                value={customProtein}
                                                onChange={(e) => setCustomProtein(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/30 font-semibold outline-none focus:border-primary text-foreground"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 mt-6 border-t border-border flex gap-3">
                                    <button
                                        onClick={handleSaveCustomItem}
                                        className="flex-1 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={() => setCustomItemModal(null)}
                                        className="px-5 py-3 bg-secondary text-foreground font-bold rounded-2xl hover:bg-secondary/80"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
}
