"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from '@/i18n/routing';
import { Search, Clock, Users, Star, ChefHat, Camera, Sparkles } from "lucide-react";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { ALL_RECIPES, type Recipe } from "@/lib/recipe-data";
import { findBestRecipeByDishName, findBestRecipesByIngredients, normalizeText } from "@/lib/culinary-engine";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";

const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Dessert"];

export default function RecipesPage() {
    const navbarTranslations = useNavbarTranslations();
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get("search") ?? "";
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredRecipes = useMemo(() => {
        const query = searchQuery.trim();
        const matchesCategory = (recipe: Recipe) => activeCategory === "All" || recipe.category === activeCategory;

        if (!query) {
            return ALL_RECIPES.filter(matchesCategory);
        }

        const normalizedQuery = normalizeText(query);
        const queryTokens = normalizedQuery.split(" ").filter((token) => token.length >= 2);
        const ingredientHints = query
            .split(/[,|]/)
            .map((value) => value.trim())
            .filter(Boolean);

        if (ingredientHints.length === 0 && queryTokens.length > 1) {
            ingredientHints.push(...queryTokens);
        }

        const ranked = new Map<number, Recipe>();

        const dishMatches = findBestRecipeByDishName(query, {
            limit: ALL_RECIPES.length,
            minScore: 0.12,
        });
        dishMatches.forEach((recipe) => ranked.set(recipe.id, recipe));

        if (ingredientHints.length > 0) {
            const ingredientMatches = findBestRecipesByIngredients(ingredientHints, {
                limit: ALL_RECIPES.length,
                minMatchRatio: 0.12,
            });

            ingredientMatches.forEach((recipe) => {
                if (!ranked.has(recipe.id)) {
                    ranked.set(recipe.id, recipe);
                }
            });
        }

        const broadTextMatches = ALL_RECIPES.filter((recipe) => {
            const recipeText = normalizeText(
                [
                    recipe.title,
                    recipe.titleHindi ?? "",
                    recipe.description,
                    recipe.descriptionHindi ?? "",
                    recipe.category,
                    ...recipe.tags,
                    ...recipe.ingredients.map((ingredient) => ingredient.name),
                    ...recipe.ingredients.map((ingredient) => ingredient.nameHindi ?? ""),
                ].join(" ")
            );

            return queryTokens.every((token) => recipeText.includes(token));
        });

        broadTextMatches.forEach((recipe) => {
            if (!ranked.has(recipe.id)) {
                ranked.set(recipe.id, recipe);
            }
        });

        return Array.from(ranked.values()).filter(matchesCategory);
    }, [searchQuery, activeCategory]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <NavbarClient translations={navbarTranslations} />
            <main className="flex-1 container mx-auto px-4 py-8 pt-24">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-foreground mb-4">Discover Recipes</h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Find the perfect meal for any occasion. Search by dish name, ingredients, or category.
                        </p>
                    </div>

                    {/* AI Scan Promo Banner */}
                    <div className="mb-10 p-6 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-2xl border border-purple-200 dark:border-purple-800">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
                                    <Camera className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-purple-600" />
                                        Scan Your Pantry with AI
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Upload a photo and get instant recipe suggestions based on your ingredients
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/scan"
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap"
                            >
                                <Camera className="w-4 h-4" />
                                Try Now
                            </Link>
                        </div>
                    </div>

                    {/* Search & Filter */}
                    <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search recipes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white dark:bg-zinc-900 border border-border rounded-full pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                            />
                        </div>

                        {/* Categories */}
                        <div className="flex bg-secondary/50 p-1 rounded-full overflow-x-auto max-w-full">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat
                                        ? "bg-white dark:bg-zinc-800 text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recipe Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredRecipes.map((recipe) => (
                            <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
                                <div
                                    className="group bg-white dark:bg-zinc-900 border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer h-full"
                                >
                                    {/* Image Placeholder or Actual Image */}
                                    <div className={`h-48 ${recipe.color} flex items-center justify-center text-6xl shadow-inner relative overflow-hidden`}>
                                        {recipe.image.includes('.') ? (
                                            <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover relative z-10 group-hover:scale-110 transition-transform duration-300" />
                                        ) : (
                                            <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{recipe.image}</span>
                                        )}
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-20 pointer-events-none"></div>
                                        {/* Difficulty Badge */}
                                        <span className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold ${recipe.difficulty === "Easy" ? "bg-green-500 text-white" :
                                            recipe.difficulty === "Medium" ? "bg-amber-500 text-white" :
                                                "bg-red-500 text-white"
                                            }`}>
                                            {recipe.difficulty}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                                                {recipe.category}
                                            </span>
                                            <div className="flex items-center gap-1 text-amber-500">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="text-sm font-medium">{recipe.rating}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                                            {recipe.title}
                                        </h3>
                                        {recipe.titleHindi && (
                                            <p className="text-sm font-medium text-primary mb-2 line-clamp-1">{recipe.titleHindi}</p>
                                        )}

                                        <p className="text-sm text-muted-foreground line-clamp-1 mb-1">
                                            {recipe.description}
                                        </p>
                                        {recipe.descriptionHindi && (
                                            <p className="text-xs text-muted-foreground/80 line-clamp-1 mb-4" lang="hi">
                                                {recipe.descriptionHindi}
                                            </p>
                                        )}

                                        <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{recipe.totalTime}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                <span>{recipe.servings} Servings</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <ChefHat className="w-4 h-4" />
                                                <span>{recipe.nutrition.calories} kcal</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {filteredRecipes.length === 0 && (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-xl text-muted-foreground font-medium">No recipes found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
