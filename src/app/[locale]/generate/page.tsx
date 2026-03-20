"use client";

import { useState } from "react";
import { Sparkles, ChefHat, Loader2, Search, Plus, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { type Recipe } from "@/lib/recipe-data";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import { findBestRecipesByIngredients, generateHowToCookRecipe } from "@/lib/culinary-engine";
import { ALL_RECIPES } from "@/lib/recipe-data";

import { useDietaryStore } from "@/store/useDietaryStore";

export default function GenerateRecipePage() {
    const navbarTranslations = useNavbarTranslations();
    const { profile } = useDietaryStore();
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [currentInput, setCurrentInput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
    const [hasGenerated, setHasGenerated] = useState(false);

    const [spiceLevel, setSpiceLevel] = useState("Medium");
    const [mealType, setMealType] = useState("Any");

    const popularIngredients = [
        "Chicken", "Rice", "Onion", "Garlic", "Tomato", "Pasta", "Egg", "Milk", "Cheese", "Potato", "Beef", "Beans"
    ];

    const handleAddIngredient = (e?: React.FormEvent, ing?: string) => {
        if (e) e.preventDefault();
        const valueToAdd = ing || currentInput;
        if (valueToAdd.trim() && !ingredients.includes(valueToAdd.trim())) {
            setIngredients([...ingredients, valueToAdd.trim()]);
            if (!ing) setCurrentInput("");
        }
    };

    const removeIngredient = (ingToRemove: string) => {
        setIngredients(ingredients.filter(ing => ing !== ingToRemove));
    };

    const handleGenerate = async () => {
        if (ingredients.length === 0) return;

        setIsGenerating(true);

        // Simulate AI generation time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Use centralized matching that also respects allergies/dislikes.
        const matches = findBestRecipesByIngredients(ingredients, {
            profile,
            limit: 10,
            minMatchRatio: 0.15
        });

        // Enhanced AI generator: ALWAYS Dynamically create a custom recipe via Gemini API
        const dishName = ingredients.slice(0, 3).join(" & ") + " Surprise";
        let aiRecipeData = null;

        try {
            const res = await fetch("/api/generate-recipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    dishName,
                    dietaryGoal: profile?.goal || 'Standard',
                    spiceLevel,
                    mealType,
                    ingredientsList: ingredients
                }),
            });
            if (res.ok) {
                const data = await res.json();
                if (data.recipe && data.source === "gemini") {
                    aiRecipeData = data.recipe;
                }
            }
        } catch (error) {
            console.error("AI API Error on generate page:", error);
        }

        let dynamic: any;
        if (aiRecipeData) {
            dynamic = {
                name: aiRecipeData.name,
                hindi: aiRecipeData.hindi || aiRecipeData.name,
                description: aiRecipeData.description,
                descriptionHindi: aiRecipeData.descriptionHindi || aiRecipeData.description,
                prepTime: aiRecipeData.prepTime || "15 min",
                cookTime: aiRecipeData.cookTime || "25 min",
                servings: aiRecipeData.servings || 4,
                difficulty: aiRecipeData.difficulty || "Medium",
                // Ensure ingredients are strings
                ingredients: aiRecipeData.ingredients || [],
                // Ensure steps follow the {english, hindi} setup expected below
                steps: (aiRecipeData.steps || []).map((s: any) => ({
                    english: typeof s === 'string' ? s : (s.english || ''),
                    hindi: typeof s === 'string' ? s : (s.hindi || '')
                })),
                tips: aiRecipeData.tips || [],
                tipsHindi: aiRecipeData.tipsHindi || [],
                nutrition: aiRecipeData.nutrition || { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0 }
            };
        } else {
            // Local Fallback
            const localFallback = generateHowToCookRecipe(dishName, profile?.goal || 'Standard', profile);
            dynamic = {
                name: localFallback.name,
                hindi: localFallback.hindi,
                description: localFallback.description,
                descriptionHindi: localFallback.descriptionHindi,
                prepTime: localFallback.prepTime,
                cookTime: localFallback.cookTime,
                servings: localFallback.servings,
                difficulty: localFallback.difficulty,
                ingredients: localFallback.ingredients,
                steps: localFallback.steps, // already has english and hindi fields
                tips: localFallback.tips || [],
                tipsHindi: localFallback.tipsHindi || [],
                nutrition: { calories: 450, protein: 15, carbs: 40, fat: 12, fiber: 4, sugar: 5, sodium: 400 } // Local Fallback Default
            };
        }

        const aiRecipe: Recipe = {
            id: Math.floor(100000 + Math.random() * 900000), // Ensure robust 6 digit ID
            title: dynamic.name,
            titleHindi: dynamic.hindi,
            description: dynamic.description,
            descriptionHindi: dynamic.descriptionHindi,
            category: "Dinner",
            categoryHindi: "रात का खाना",
            prepTime: dynamic.prepTime,
            cookTime: dynamic.cookTime,
            totalTime: (() => {
                const parse = (raw: string | number): number => {
                    if (typeof raw === 'number') return raw;
                    if (!raw) return 0;
                    const s = String(raw).toLowerCase().trim();
                    let total = 0;
                    const hrMatch = s.match(/(\d+)\s*h/);
                    const minMatch = s.match(/(\d+)\s*m/);
                    if (hrMatch) total += parseInt(hrMatch[1]) * 60;
                    if (minMatch) total += parseInt(minMatch[1]);
                    if (!hrMatch && !minMatch) { const n = parseInt(s); if (!isNaN(n)) total = n; }
                    return total;
                };
                const total = parse(dynamic.prepTime) + parse(dynamic.cookTime);
                return total >= 60 ? `${Math.floor(total / 60)}h ${total % 60}m` : `${total} min`;
            })(),
            servings: dynamic.servings,
            rating: 5.0,
            image: "✨",
            color: "bg-purple-100 text-purple-600",
            difficulty: dynamic.difficulty,
            ingredients: dynamic.ingredients.map((i: string | any) => {
                if (typeof i === 'string') {
                    // Try to parse "2 cups flour" format
                    const match = i.match(/^([\d./]+)\s*([\w]+)?\s+(.+)$/);
                    if (match) {
                        return { name: match[3], amount: match[1], unit: match[2] || "" };
                    }
                    return { name: i, amount: "", unit: "" };
                }
                return {
                    name: i.name || i.english || '',
                    amount: i.amount || "",
                    unit: i.unit || ""
                };
            }),
            steps: dynamic.steps.map((s: any) => s.english || s),
            stepsHindi: dynamic.steps.map((s: any) => s.hindi || s),
            chefTips: dynamic.tips,
            chefTipsHindi: dynamic.tipsHindi,
            substitutions: [],
            nutrition: dynamic.nutrition,
            tags: ["AI Generated", "Unique", profile?.goal || "Standard", ...ingredients].filter(Boolean)
        };

        // Cache the dynamically generated recipe in localStorage so `/recipes/[id]` can read it!
        if (typeof window !== 'undefined') {
            localStorage.setItem(`cook-ai-recipe-${aiRecipe.id}`, JSON.stringify(aiRecipe));
        }

        // Put the AI Generated recipe first, followed by DB matches
        setGeneratedRecipes([aiRecipe, ...matches]);

        setHasGenerated(true);
        setIsGenerating(false);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <NavbarClient translations={navbarTranslations} />
            <main className="flex-1 container mx-auto px-4 py-8 pt-24 border-none">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-200 dark:border-purple-800 mb-6">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">AI-Powered Generator</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
                            AI Recipe <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Generator</span>
                        </h1>
                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                            Enter the ingredients you have on hand, and our AI will comb through our database to assemble personalized, delicious recipes tailored just for you.
                        </p>
                    </div>

                    {/* Input Area */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-border shadow-sm p-8 mb-8">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <ChefHat className="w-5 h-5 text-primary" />
                            What&apos;s in your kitchen?
                        </h2>

                        <form onSubmit={handleAddIngredient} className="relative mb-6">
                            <input
                                type="text"
                                value={currentInput}
                                onChange={(e) => setCurrentInput(e.target.value)}
                                placeholder="E.g. Chicken, Rice, Tomatoes..."
                                className="w-full pl-4 pr-12 py-4 border-2 border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-primary transition-colors text-lg"
                            />
                            <button
                                type="submit"
                                disabled={!currentInput.trim()}
                                aria-label="Add ingredient"
                                className="absolute right-2 top-2 bottom-2 aspect-square bg-primary text-primary-foreground rounded-lg flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </form>

                        {/* Suggestions */}
                        {ingredients.length === 0 && (
                            <div className="mb-6 animate-fade-in">
                                <p className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-1">
                                    <Sparkles className="w-4 h-4 text-purple-500" />
                                    Popular ingredients
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {popularIngredients.map((ing) => (
                                        <button
                                            key={ing}
                                            onClick={() => handleAddIngredient(undefined, ing)}
                                            className="px-3 py-1.5 border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-colors bg-secondary/50"
                                        >
                                            + {ing}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Added Ingredients Tags */}
                        {ingredients.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {ingredients.map((ing, idx) => (
                                    <span key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                                        {ing}
                                        <button
                                            onClick={() => removeIngredient(ing)}
                                            aria-label={`Remove ${ing}`}
                                            className="hover:text-destructive transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Customization Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div>
                                <label className="block text-sm font-bold text-muted-foreground mb-2">Spice Level</label>
                                <select
                                    value={spiceLevel}
                                    onChange={(e) => setSpiceLevel(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors cursor-pointer appearance-none"
                                >
                                    <option value="Mild">Mild 🌿</option>
                                    <option value="Medium">Medium 🌶️</option>
                                    <option value="Spicy">Spicy 🔥</option>
                                    <option value="Extremely Spicy">Nuclear 🌋</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-muted-foreground mb-2">Meal Type</label>
                                <select
                                    value={mealType}
                                    onChange={(e) => setMealType(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors cursor-pointer appearance-none"
                                >
                                    <option value="Any">Any Type 🍽️</option>
                                    <option value="Breakfast">Breakfast 🍳</option>
                                    <option value="Lunch">Lunch 🥪</option>
                                    <option value="Dinner">Dinner 🍝</option>
                                    <option value="Dessert">Dessert 🍰</option>
                                    <option value="Snack">Snack 🥨</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={ingredients.length === 0 || isGenerating}
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Generating Magic...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Generate Recipes
                                </>
                            )}
                        </button>
                    </div>

                    {/* Results */}
                    {generatedRecipes.length > 0 && (
                        <div className="animate-fade-in-up">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Search className="w-6 h-6 text-primary" />
                                Custom Recipes For You
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {generatedRecipes.map((recipe, index) => (
                                    <Link
                                        key={recipe.id}
                                        href={`/recipes/${recipe.id}`}
                                        className="group bg-white dark:bg-zinc-900 rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in-up"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className={`h-32 ${recipe.color} flex items-center justify-center text-5xl`}>
                                            {recipe.image}
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                    {recipe.category}
                                                </span>
                                                <span className="text-xs text-primary font-medium">{recipe.difficulty} • {recipe.totalTime}</span>
                                            </div>
                                            <h3 className="font-bold mt-1 group-hover:text-primary transition-colors">
                                                {recipe.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                                {recipe.description}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {hasGenerated && generatedRecipes.length === 0 && (
                        <div className="animate-fade-in text-center py-12 bg-white dark:bg-zinc-900 rounded-3xl border border-border border-dashed">
                            <div className="inline-flex items-center justify-center p-4 bg-muted rounded-full mb-4">
                                <Search className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">No perfect matches found</h3>
                            <p className="text-muted-foreground">Try removing some ingredients or adding more common staples!</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
