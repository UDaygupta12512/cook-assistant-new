"use client";

import { useState, useRef, useCallback } from "react";
import { Camera, Upload, Sparkles, Loader2, X, ChefHat, Image, AlertCircle, CheckCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { type Recipe } from "@/lib/recipe-data";
import { findBestRecipesByIngredients, generateHowToCookRecipe } from "@/lib/culinary-engine";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import { useDietaryStore } from "@/store/useDietaryStore";

// Ingredient groups for realistic mock AI detection based on image context
const ingredientSets = [
    ["Onion", "Tomato", "Garlic", "Ginger", "Chicken", "Yogurt", "Cilantro", "Green Chili"],
    ["Potato", "Paneer", "Butter", "Cream", "Cumin", "Garam Masala", "Tomato"],
    ["Rice", "Soy Sauce", "Garlic", "Ginger", "Eggs", "Green Onions", "Sesame Oil"],
    ["Flour", "Sugar", "Eggs", "Butter", "Vanilla Extract", "Milk", "Baking Soda"],
    ["Bell Pepper", "Onion", "Garlic", "Olive Oil", "Tomato", "Chicken", "Basil"],
    ["Pasta", "Olive Oil", "Garlic", "Parmesan", "Basil", "Tomato", "Cream"],
    ["Tofu", "Soy Sauce", "Broccoli", "Garlic", "Ginger", "Sesame Oil", "Rice"],
    ["Salmon", "Lemon", "Garlic", "Olive Oil", "Dill", "Salt", "Pepper"],
];

// Improved mock AI detection - simulates realistic detection
const mockDetectIngredients = async (_imageFile: File): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
    // Pick a random ingredient set to simulate what AI "sees" in the image
    const setIndex = Math.floor(Math.random() * ingredientSets.length);
    const selected = ingredientSets[setIndex];
    // Optionally drop 1-2 items for realism
    const dropCount = Math.floor(Math.random() * 2);
    return selected.slice(0, selected.length - dropCount);
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
    calories: 450,
    protein: 15,
    carbs: 40,
    fat: 12,
    fiber: 4,
    sugar: 5,
    sodium: 400,
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
    return prepTime || cookTime || "40 min";
};

const normalizeRecipeIngredients = (ingredients: GeneratedIngredient[] = []) => {
    return ingredients.map((ingredient) => ({
        name: typeof ingredient === "string" ? ingredient : (ingredient.name || ingredient.english || "Ingredient"),
        amount: typeof ingredient === "string" ? "1" : (ingredient.amount || "1"),
        unit: typeof ingredient === "string" ? "unit" : (ingredient.unit || "unit"),
    }));
};

const normalizeRecipeSteps = (steps: GeneratedStep[] = []) => {
    return steps.map((step) => ({
        english: typeof step === "string" ? step : (step.english || "Follow the recipe carefully."),
        hindi: typeof step === "string" ? step : (step.hindi || step.english || "Follow the recipe carefully."),
    }));
};

const searchAllRecipesByIngredients = (ingredients: string[], profile: ReturnType<typeof useDietaryStore>["profile"]): Recipe[] => {
    return findBestRecipesByIngredients(ingredients, {
        profile,
        limit: 6,
        minMatchRatio: 0.12,
    });
};

export default function ScanPantryPage() {
    const navbarTranslations = useNavbarTranslations();
    const { profile } = useDietaryStore();
    const [image, setImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);
    const [suggestedRecipes, setSuggestedRecipes] = useState<Recipe[]>([]);
    const [scanError, setScanError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            setScanError("Please upload an image file (JPG, PNG, etc.)");
            return;
        }
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target?.result as string);
            setDetectedIngredients([]);
            setSuggestedRecipes([]);
            setScanError(null);
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

    const handleScan = async () => {
        if (!imageFile) return;

        setIsScanning(true);
        setScanError(null);

        try {
            // 1. Send the image to the Vision API to detect ingredients
            const formData = new FormData();
            formData.append('image', imageFile);

            const visRes = await fetch('/api/vision', {
                method: 'POST',
                body: formData,
            });

            let realIngredients: string[] = [];

            if (visRes.ok) {
                const { ingredients } = await visRes.json();
                realIngredients = normalizeDetectedIngredients(Array.isArray(ingredients) ? ingredients : []);
            }

            if (realIngredients.length === 0) {
                realIngredients = normalizeDetectedIngredients(await mockDetectIngredients(imageFile));
                setScanError("Live image analysis was unavailable, so local pantry detection was used instead.");
            }

            setDetectedIngredients(realIngredients);

            // 2. Find local matches
            const localMatches = searchAllRecipesByIngredients(realIngredients, profile);

            // 3. Generate a magical custom recipe using the AI
            const dishName = realIngredients.slice(0, 3).join(" & ") + " Surprise";
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
                    description: aiRecipeData.description || `A custom dish built from ${realIngredients.join(", ")}.`,
                    descriptionHindi: aiRecipeData.descriptionHindi || aiRecipeData.description || `यह ${dishName} की कस्टम रेसिपी है।`,
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
                tags: ["AI Generated", "Vision", profile.goal, ...realIngredients].filter(Boolean)
            };

            if (typeof window !== 'undefined') {
                localStorage.setItem(`cook-ai-recipe-${generatedRecipe.id}`, JSON.stringify(generatedRecipe));
            }

            setSuggestedRecipes([generatedRecipe, ...localMatches]);

        } catch (error) {
            console.error("Scan failed:", error);
            const message = error instanceof Error
                ? error.message
                : "Failed to analyze image. Local fallback detection will be used instead.";
            setScanError(message);

            // Fallback for demo so user isn't totally blocked:
            const demoIngredients = normalizeDetectedIngredients(await mockDetectIngredients(imageFile));
            setDetectedIngredients(demoIngredients);
            setSuggestedRecipes(searchAllRecipesByIngredients(demoIngredients, profile));

        } finally {
            setIsScanning(false);
        }
    };

    const clearImage = () => {
        setImage(null);
        setImageFile(null);
        setDetectedIngredients([]);
        setSuggestedRecipes([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <NavbarClient translations={navbarTranslations} />
            <main className="flex-1 container mx-auto px-4 py-8 pt-24">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 dark:border-purple-800 mb-6">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">AI-Powered</span>
                        </div>
                        <h1 className="text-4xl font-bold text-foreground mb-4">Scan Your Pantry</h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Upload a photo of your pantry or fridge, and our AI will detect ingredients and suggest delicious recipes you can make.
                        </p>
                    </div>



                    {/* Upload Area */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-border shadow-sm overflow-hidden mb-8">
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
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                                <div className={`p-12 text-center border-2 border-dashed rounded-3xl m-4 transition-colors group ${
                                    isDragging
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/50"
                                }`}>
                                    <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center transition-transform ${
                                        isDragging ? "bg-primary/20 scale-110" : "bg-primary/10 group-hover:scale-110"
                                    }`}>
                                        {isDragging ? (
                                            <Image className="w-10 h-10 text-primary" />
                                        ) : (
                                            <Camera className="w-10 h-10 text-primary" />
                                        )}
                                    </div>
                                    <p className="text-xl font-medium text-foreground mb-2">
                                        {isDragging ? "Drop your image here!" : "Upload Pantry Photo"}
                                    </p>
                                    <p className="text-muted-foreground mb-6">
                                        Take a photo or upload an image of your pantry items
                                    </p>
                                    <div className="flex items-center justify-center gap-4">
                                        <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium flex items-center gap-2">
                                            <Upload className="w-4 h-4" />
                                            Choose File
                                        </span>
                                        <span className="text-muted-foreground text-sm">or drag & drop</span>
                                    </div>
                                    {/* Tips */}
                                    <div className="mt-8 pt-6 border-t border-border/50">
                                        <p className="text-xs text-muted-foreground mb-3">Tips for best results:</p>
                                        <div className="flex flex-wrap justify-center gap-3 text-xs">
                                            <span className="px-3 py-1 bg-secondary/50 rounded-full">Good lighting</span>
                                            <span className="px-3 py-1 bg-secondary/50 rounded-full">Clear view of items</span>
                                            <span className="px-3 py-1 bg-secondary/50 rounded-full">Labels visible</span>
                                        </div>
                                    </div>
                                </div>
                            </label>
                        ) : (
                            <div className="relative">
                                {scanError && (
                                    <div className="bg-red-500/10 border border-red-500/50 text-red-600 dark:text-red-400 p-4 rounded-xl m-4 text-center font-medium shadow-sm">
                                        ⚠️ {scanError}<br />
                                        <span className="text-sm opacity-80">(Displaying demo recipes instead so you can see how it works!)</span>
                                    </div>
                                )}
                                <img
                                    src={image}
                                    alt="Pantry"
                                    className="w-full h-[400px] object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={clearImage}
                                    aria-label="Clear selected pantry image"
                                    title="Clear selected pantry image"
                                    className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {!isScanning && detectedIngredients.length === 0 && (
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                        <button
                                            onClick={handleScan}
                                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Sparkles className="w-5 h-5" />
                                            Scan with AI
                                        </button>
                                    </div>
                                )}

                                {isScanning && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                                        <div className="text-center text-white">
                                            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin" />
                                            <p className="text-xl font-medium">Analyzing your pantry...</p>
                                            <p className="text-white/70">AI is detecting ingredients</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Detected Ingredients */}
                    {detectedIngredients.length > 0 && (
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-border p-6 mb-8">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-purple-600" />
                                Detected Ingredients
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {detectedIngredients.map((ingredient, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium"
                                    >
                                        {ingredient}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Suggested Recipes */}
                    {suggestedRecipes.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <ChefHat className="w-6 h-6 text-primary" />
                                Recipes You Can Make ({suggestedRecipes.length} found)
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {suggestedRecipes.map((recipe) => (
                                    <Link
                                        key={recipe.id}
                                        href={`/recipes/${recipe.id}`}
                                        className="group bg-white dark:bg-zinc-900 rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02]"
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
                </div>
            </main>
            <Footer />
        </div>
    );
}
