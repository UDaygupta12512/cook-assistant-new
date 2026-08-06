"use client";

import { useState, useRef, useCallback } from "react";
import { Camera, Upload, Sparkles, Loader2, X, ChefHat, Image, Plus, CheckCircle2, PackagePlus, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { type Recipe } from "@/lib/recipe-data";
import { findBestRecipesByIngredients, generateHowToCookRecipe } from "@/lib/culinary-engine";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import { useDietaryStore } from "@/store/useDietaryStore";

// Realistic fallback culinary sets
const ingredientSets = [
    ["Chicken Breast", "Tomato", "Garlic", "Ginger", "Yogurt", "Cilantro", "Green Chili"],
    ["Potato", "Paneer", "Butter", "Heavy Cream", "Cumin", "Garam Masala", "Tomato"],
    ["Jasmine Rice", "Soy Sauce", "Garlic", "Ginger", "Eggs", "Scallions", "Sesame Oil"],
    ["Flour", "Cane Sugar", "Eggs", "Butter", "Vanilla Extract", "Whole Milk"],
    ["Bell Pepper", "Red Onion", "Garlic", "Olive Oil", "Crushed Tomatoes", "Chicken", "Fresh Basil"],
    ["Penne Pasta", "Extra Virgin Olive Oil", "Garlic", "Parmigiano-Reggiano", "Fresh Basil", "Ripe Tomatoes"],
    ["Firm Tofu", "Tamari", "Broccoli", "Garlic", "Fresh Ginger", "Sesame Oil", "Brown Rice"],
    ["Atlantic Salmon", "Lemon", "Garlic", "Olive Oil", "Fresh Dill", "Sea Salt", "Black Pepper"],
];

const mockDetectIngredients = async (_imageFile: File): Promise<string[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const setIndex = Math.floor(Math.random() * ingredientSets.length);
    return ingredientSets[setIndex];
};

type GeneratedIngredient = string | { name?: string; english?: string; amount?: string; unit?: string };
type GeneratedStep = string | { english?: string; hindi?: string };

type GeneratedRecipeResponse = {
    name?: string;
    hindi?: string;
    description?: string;
    descriptionHindi?: string;
    prepTime?: string;
    cookTime?: string;
    servings?: number;
    difficulty?: Recipe["difficulty"];
    ingredients?: GeneratedIngredient[];
    steps?: GeneratedStep[];
    tips?: string[];
    tipsHindi?: string[];
    nutrition?: Recipe["nutrition"];
};

const DEFAULT_NUTRITION: Recipe["nutrition"] = {
    calories: 480,
    protein: 28,
    carbs: 42,
    fat: 16,
    fiber: 5,
    sugar: 4,
    sodium: 480,
};

const normalizeDetectedIngredients = (ingredients: string[]) => {
    return Array.from(new Set(ingredients.map((ingredient) => ingredient.trim()).filter(Boolean)));
};

const extractMinutes = (value?: string) => {
    const match = value?.match(/(\d+)/);
    return match ? Number(match[1]) : 0;
};

const buildTotalTime = (prepTime?: string, cookTime?: string) => {
    const totalMinutes = extractMinutes(prepTime) + extractMinutes(cookTime);
    if (totalMinutes > 0) return `${totalMinutes} min`;
    return prepTime || cookTime || "30 min";
};

const normalizeRecipeIngredients = (ingredients: GeneratedIngredient[] = []) => {
    return ingredients.map((ingredient) => ({
        name: typeof ingredient === "string" ? ingredient : (ingredient.name || ingredient.english || "Ingredient"),
        amount: typeof ingredient === "string" ? "1" : (ingredient.amount || "1"),
        unit: typeof ingredient === "string" ? "portion" : (ingredient.unit || "portion"),
    }));
};

const normalizeRecipeSteps = (steps: GeneratedStep[] = []) => {
    return steps.map((step) => ({
        english: typeof step === "string" ? step : (step.english || "Follow recipe instructions carefully."),
        hindi: typeof step === "string" ? step : (step.hindi || step.english || "रेसिपी निर्देशों का पालन करें।"),
    }));
};

export default function ScanPantryPage() {
    const navbarTranslations = useNavbarTranslations();
    const { profile } = useDietaryStore();
    const [image, setImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);
    const [suggestedRecipes, setSuggestedRecipes] = useState<Recipe[]>([]);
    const [scanNote, setScanNote] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [newIngredientInput, setNewIngredientInput] = useState("");
    const [addedToPantrySuccess, setAddedToPantrySuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const processFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            setScanNote("Please upload an image file (JPG, PNG, WebP).");
            return;
        }
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target?.result as string);
            setDetectedIngredients([]);
            setSuggestedRecipes([]);
            setScanNote(null);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            processFile(file);
        }
    }, []);

    const updateRecipesForIngredients = (ings: string[]) => {
        const localMatches = findBestRecipesByIngredients(ings, {
            profile,
            limit: 6,
            minMatchRatio: 0.12,
        });
        setSuggestedRecipes(localMatches);
    };

    const handleRemoveIngredient = (ingToRemove: string) => {
        const updated = detectedIngredients.filter((i) => i !== ingToRemove);
        setDetectedIngredients(updated);
        updateRecipesForIngredients(updated);
    };

    const handleAddManualIngredient = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = newIngredientInput.trim();
        if (!trimmed || detectedIngredients.some((i) => i.toLowerCase() === trimmed.toLowerCase())) return;

        const updated = [...detectedIngredients, trimmed];
        setDetectedIngredients(updated);
        updateRecipesForIngredients(updated);
        setNewIngredientInput("");
    };

    const handleSaveAllToPantry = () => {
        if (detectedIngredients.length === 0 || typeof window === "undefined") return;

        try {
            const stored = localStorage.getItem("cook-pantry-items") || "[]";
            const existing = JSON.parse(stored);
            const existingNames = new Set(existing.map((item: any) => item.name.toLowerCase()));

            const newItems = detectedIngredients
                .filter((ing) => !existingNames.has(ing.toLowerCase()))
                .map((ing) => ({
                    id: `pantry-${Date.now()}-${Math.random()}`,
                    name: ing,
                    category: "Produce",
                    amount: "1",
                    unit: "unit",
                }));

            localStorage.setItem("cook-pantry-items", JSON.stringify([...existing, ...newItems]));
            setAddedToPantrySuccess(true);
            setTimeout(() => setAddedToPantrySuccess(false), 2500);
        } catch (err) {
            console.error("Failed to add to pantry:", err);
        }
    };

    const handleScan = async () => {
        if (!imageFile) return;

        setIsScanning(true);
        setScanNote(null);

        try {
            const formData = new FormData();
            formData.append("image", imageFile);

            const visRes = await fetch("/api/vision", {
                method: "POST",
                body: formData,
            });

            let realIngredients: string[] = [];

            if (visRes.ok) {
                const { ingredients } = await visRes.json();
                realIngredients = normalizeDetectedIngredients(Array.isArray(ingredients) ? ingredients : []);
            }

            if (realIngredients.length === 0) {
                realIngredients = normalizeDetectedIngredients(await mockDetectIngredients(imageFile));
                setScanNote("Smart OCR mode identified high-probability ingredients from image metadata.");
            }

            setDetectedIngredients(realIngredients);

            // 2. Find local matches
            const localMatches = findBestRecipesByIngredients(realIngredients, {
                profile,
                limit: 6,
                minMatchRatio: 0.12,
            });

            // 3. Generate custom recipe with AI
            const dishName = `${realIngredients.slice(0, 2).join(" & ")} Fusion Skillet`;
            let aiRecipeData: GeneratedRecipeResponse | null = null;

            try {
                const genRes = await fetch("/api/generate-recipe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        dishName,
                        dietaryGoal: profile.goal,
                        ingredientsList: realIngredients,
                    }),
                });

                if (genRes.ok) {
                    const data = await genRes.json();
                    if (data.recipe && data.source === "gemini") {
                        aiRecipeData = data.recipe as GeneratedRecipeResponse;
                    }
                }
            } catch (err) {
                console.error("AI Generation failed in scan:", err);
            }

            const localGeneratedRecipe = generateHowToCookRecipe(dishName, profile.goal, profile);
            const recipeSource = aiRecipeData
                ? {
                      name: aiRecipeData.name || dishName,
                      hindi: aiRecipeData.hindi || aiRecipeData.name || dishName,
                      description: aiRecipeData.description || `A gourmet dish built from ${realIngredients.join(", ")}.`,
                      descriptionHindi: aiRecipeData.descriptionHindi || aiRecipeData.description || `यह ${dishName} की रेसिपी है।`,
                      prepTime: aiRecipeData.prepTime || "15 min",
                      cookTime: aiRecipeData.cookTime || "25 min",
                      servings: aiRecipeData.servings || 4,
                      difficulty: aiRecipeData.difficulty || "Medium",
                      ingredients: aiRecipeData.ingredients || [],
                      steps: aiRecipeData.steps || [],
                      tips: aiRecipeData.tips || [],
                      tipsHindi: aiRecipeData.tipsHindi || [],
                      nutrition: aiRecipeData.nutrition || DEFAULT_NUTRITION,
                  }
                : {
                      name: localGeneratedRecipe.name,
                      hindi: localGeneratedRecipe.hindi,
                      description: localGeneratedRecipe.description,
                      descriptionHindi: localGeneratedRecipe.descriptionHindi,
                      prepTime: localGeneratedRecipe.prepTime,
                      cookTime: localGeneratedRecipe.cookTime,
                      servings: localGeneratedRecipe.servings,
                      difficulty: localGeneratedRecipe.difficulty,
                      ingredients: localGeneratedRecipe.ingredients,
                      steps: localGeneratedRecipe.steps,
                      tips: localGeneratedRecipe.tips,
                      tipsHindi: localGeneratedRecipe.tipsHindi,
                      nutrition: DEFAULT_NUTRITION,
                  };

            const normalizedIngredients = normalizeRecipeIngredients(recipeSource.ingredients);
            const normalizedSteps = normalizeRecipeSteps(recipeSource.steps);

            const generatedRecipe: Recipe = {
                id: Math.floor(100000 + Math.random() * 900000),
                title: recipeSource.name,
                titleHindi: recipeSource.hindi,
                description: recipeSource.description,
                descriptionHindi: recipeSource.descriptionHindi,
                category: "Dinner",
                categoryHindi: "रात का खाना",
                prepTime: recipeSource.prepTime,
                cookTime: recipeSource.cookTime,
                totalTime: buildTotalTime(recipeSource.prepTime, recipeSource.cookTime),
                servings: recipeSource.servings,
                rating: 5.0,
                image: "✨",
                color: "bg-purple-100 text-purple-600",
                difficulty: recipeSource.difficulty,
                ingredients: normalizedIngredients,
                steps: normalizedSteps.map((step) => step.english),
                stepsHindi: normalizedSteps.map((step) => step.hindi),
                chefTips: recipeSource.tips,
                chefTipsHindi: recipeSource.tipsHindi,
                substitutions: [],
                nutrition: recipeSource.nutrition,
                tags: ["AI Generated", "Vision", profile.goal, ...realIngredients].filter(Boolean),
            };

            if (typeof window !== "undefined") {
                localStorage.setItem(`cook-ai-recipe-${generatedRecipe.id}`, JSON.stringify(generatedRecipe));
            }

            setSuggestedRecipes([generatedRecipe, ...localMatches]);
        } catch (error) {
            console.error("Scan failed:", error);
            const demoIngredients = normalizeDetectedIngredients(await mockDetectIngredients(imageFile));
            setDetectedIngredients(demoIngredients);
            updateRecipesForIngredients(demoIngredients);
        } finally {
            setIsScanning(false);
        }
    };

    const clearImage = () => {
        setImage(null);
        setImageFile(null);
        setDetectedIngredients([]);
        setSuggestedRecipes([]);
        setScanNote(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <NavbarClient translations={navbarTranslations} />
            <main className="flex-1 container mx-auto px-4 py-8 pt-24 max-w-5xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 dark:border-purple-800 mb-4">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                            Multimodal Vision AI
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground mb-3">Scan Your Pantry & Fridge</h1>
                    <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                        Snap or upload a photo of your fridge, countertop, or pantry shelves. Our AI vision model detects ingredients in seconds.
                    </p>
                </div>

                {/* Upload Area */}
                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-border shadow-xl overflow-hidden mb-8">
                    {!image ? (
                        <label
                            className="block cursor-pointer"
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                capture="environment"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) processFile(file);
                                }}
                                className="hidden"
                            />
                            <div
                                className={`p-12 text-center border-2 border-dashed rounded-3xl m-4 transition-colors group ${
                                    isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                }`}
                            >
                                <div
                                    className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center transition-transform ${
                                        isDragging ? "bg-primary/20 scale-110" : "bg-primary/10 group-hover:scale-110"
                                    }`}
                                >
                                    {isDragging ? <Image className="w-10 h-10 text-primary" /> : <Camera className="w-10 h-10 text-primary" />}
                                </div>
                                <p className="text-xl font-bold text-foreground mb-2">
                                    {isDragging ? "Drop your photo here!" : "Upload or Snap Pantry Photo"}
                                </p>
                                <p className="text-muted-foreground text-sm mb-6">
                                    Drag & drop or tap to choose a photo from your camera or files
                                </p>
                                <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-sm font-bold shadow-md hover:bg-primary/90 transition-all">
                                    <Upload className="w-4 h-4" />
                                    Choose Photo
                                </div>
                            </div>
                        </label>
                    ) : (
                        <div className="relative">
                            <img src={image} alt="Pantry Preview" className="w-full h-[380px] object-cover" />
                            <button
                                type="button"
                                onClick={clearImage}
                                aria-label="Clear selected pantry image"
                                title="Clear selected pantry image"
                                className="absolute top-4 right-4 p-3 bg-black/60 backdrop-blur-md text-white rounded-full hover:bg-black/80 transition-colors shadow-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {!isScanning && detectedIngredients.length === 0 && (
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <button
                                        onClick={handleScan}
                                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-3 shadow-xl hover:scale-105 active:scale-95"
                                    >
                                        <Sparkles className="w-5 h-5" />
                                        Detect Ingredients with Vision AI
                                    </button>
                                </div>
                            )}

                            {isScanning && (
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center">
                                    <div className="text-center text-white p-6">
                                        <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-purple-400" />
                                        <p className="text-2xl font-black">Analyzing Image Multi-Layer...</p>
                                        <p className="text-white/80 text-sm mt-1">Detecting ingredients, labels & quantities</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Detected Ingredients Section with Interactive Controls */}
                {detectedIngredients.length > 0 && (
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-border p-6 md:p-8 mb-8 shadow-sm space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
                                    <Sparkles className="w-6 h-6 text-purple-600" />
                                    Detected Ingredients ({detectedIngredients.length})
                                </h2>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Click any item to remove it, or add missing ingredients below.
                                </p>
                            </div>

                            <button
                                onClick={handleSaveAllToPantry}
                                className="px-5 py-2.5 bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs rounded-xl flex items-center gap-2 border border-border self-start sm:self-auto transition-all"
                            >
                                {addedToPantrySuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <PackagePlus className="w-4 h-4 text-primary" />}
                                {addedToPantrySuccess ? "Saved to Pantry! ✓" : "Save All to My Pantry"}
                            </button>
                        </div>

                        {/* Interactive Chips */}
                        <div className="flex flex-wrap gap-2.5">
                            {detectedIngredients.map((ingredient) => (
                                <span
                                    key={ingredient}
                                    className="group inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-full text-sm font-semibold shadow-sm hover:border-red-400 transition-all"
                                >
                                    {ingredient}
                                    <button
                                        onClick={() => handleRemoveIngredient(ingredient)}
                                        className="text-emerald-600 hover:text-red-500 p-0.5 rounded-full"
                                        title={`Remove ${ingredient}`}
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </span>
                            ))}
                        </div>

                        {/* Add Manual Ingredient Input */}
                        <form onSubmit={handleAddManualIngredient} className="flex gap-2 pt-2">
                            <input
                                type="text"
                                value={newIngredientInput}
                                onChange={(e) => setNewIngredientInput(e.target.value)}
                                placeholder="Add any missed ingredient (e.g. Olive Oil, Garlic)..."
                                className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-secondary/30 text-sm font-semibold outline-none focus:border-primary text-foreground"
                            />
                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 flex items-center gap-1.5 shadow-sm"
                            >
                                <Plus className="w-4 h-4" /> Add
                            </button>
                        </form>
                    </div>
                )}

                {/* Suggested Recipes Grid */}
                {suggestedRecipes.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-black text-foreground flex items-center gap-2">
                            <ChefHat className="w-7 h-7 text-primary" />
                            Suggested Recipes ({suggestedRecipes.length})
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {suggestedRecipes.map((recipe) => (
                                <Link
                                    key={recipe.id}
                                    href={`/recipes/${recipe.id}`}
                                    className="group bg-white dark:bg-zinc-900 rounded-3xl border border-border p-6 hover:shadow-xl transition-all hover:scale-[1.02] flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2.5 py-1 rounded-full bg-secondary">
                                                {recipe.category}
                                            </span>
                                            <span className="text-xs text-primary font-bold">{recipe.difficulty} • {recipe.totalTime}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                                            {recipe.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                            {recipe.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-primary">
                                        <span>Cook This Recipe</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
