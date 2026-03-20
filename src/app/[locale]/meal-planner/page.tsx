"use client";

import { useState, useEffect } from "react";
import { Plus, X, Calendar as CalendarIcon, ChefHat, Trash2 } from "lucide-react";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MEAL_types = ["Breakfast", "Lunch", "Dinner"];
const MEAL_PLANNER_STORAGE_KEY = "cook-meal-planner";

export default function MealPlannerPage() {
    const navbarTranslations = useNavbarTranslations();

    const [planner, setPlanner] = useState<Record<string, Record<string, string>>>({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeSlot, setActiveSlot] = useState<{ day: string; type: string } | null>(null);
    const [mealInput, setMealInput] = useState("");

    // Load from localStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const stored = localStorage.getItem(MEAL_PLANNER_STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (typeof parsed === "object" && parsed !== null) {
                        setPlanner(parsed);
                    }
                }
            } catch {
                // Ignore parse errors
            }
            setIsLoaded(true);
        }
    }, []);

    // Save to localStorage whenever planner changes
    useEffect(() => {
        if (isLoaded && typeof window !== "undefined") {
            localStorage.setItem(MEAL_PLANNER_STORAGE_KEY, JSON.stringify(planner));
        }
    }, [planner, isLoaded]);

    const addMeal = () => {
        if (activeSlot && mealInput.trim()) {
            setPlanner((prev) => ({
                ...prev,
                [activeSlot.day]: {
                    ...(prev[activeSlot.day] || {}),
                    [activeSlot.type]: mealInput.trim(),
                },
            }));
            setMealInput("");
            setActiveSlot(null);
        }
    };

    const removeMeal = (day: string, type: string) => {
        setPlanner((prev) => {
            const newDay = { ...prev[day] };
            delete newDay[type];
            return { ...prev, [day]: newDay };
        });
    };

    const clearAllMeals = () => {
        setPlanner({});
    };

    const totalMeals = Object.values(planner).reduce(
        (acc, day) => acc + Object.keys(day).length,
        0
    );

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <NavbarClient translations={navbarTranslations} />
            <main className="flex-1 container mx-auto px-4 py-8 pt-24">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground mb-2">Weekly Meal Planner</h1>
                            <p className="text-muted-foreground">
                                Plan your meals for the week ahead to save time and eat healthier.
                                {totalMeals > 0 && (
                                    <span className="ml-2 text-primary font-medium">
                                        ({totalMeals} meal{totalMeals !== 1 ? 's' : ''} planned)
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {totalMeals > 0 && (
                                <button
                                    onClick={clearAllMeals}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Clear All
                                </button>
                            )}
                            <div className="bg-primary/10 p-3 rounded-full">
                                <CalendarIcon className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                        {DAYS.map((day) => (
                            <div key={day} className="flex flex-col gap-3">
                                {/* Day Header */}
                                <div className="bg-secondary/50 p-3 rounded-xl text-center font-bold text-foreground">
                                    {day}
                                </div>

                                {/* Slots */}
                                {MEAL_types.map((type) => {
                                    const meal = planner[day]?.[type];
                                    return (
                                        <div
                                            key={`${day}-${type}`}
                                            className={`min-h-[100px] p-3 rounded-xl border transition-all relative group flex flex-col cursor-pointer ${meal
                                                ? "bg-primary/5 border-primary/20 hover:border-primary/40"
                                                : "bg-white dark:bg-zinc-900 border-border hover:border-primary/50"
                                                }`}
                                            onClick={() => {
                                                setActiveSlot({ day, type });
                                                setMealInput(meal || "");
                                            }}
                                        >
                                            <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground mb-1">
                                                {type}
                                            </span>

                                            {meal ? (
                                                <div className="flex-1 flex flex-col justify-between">
                                                    <span className="font-medium text-sm line-clamp-2 text-foreground">{meal}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeMeal(day, type);
                                                        }}
                                                        className="self-end opacity-0 group-hover:opacity-100 p-1 text-destructive hover:bg-destructive/10 rounded"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Plus className="w-5 h-5 text-muted-foreground" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Input Modal/Overlay (Simple inline implementation for demo) */}
                    {activeSlot && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-border animate-in fade-in zoom-in-95 duration-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">
                                        {planner[activeSlot.day]?.[activeSlot.type] ? "Edit" : "Add"} {activeSlot.type} for {activeSlot.day}
                                    </h3>
                                    <button onClick={() => setActiveSlot(null)} className="p-1 hover:bg-secondary rounded-full">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="What are you cooking?"
                                    value={mealInput}
                                    onChange={(e) => setMealInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && addMeal()}
                                    className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setActiveSlot(null)}
                                        className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={addMeal}
                                        className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                                    >
                                        Save Meal
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
