"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark, Trash2, FolderPlus, Search, Grid, List, Clock, Star } from "lucide-react";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { ALL_RECIPES, Recipe } from "@/lib/recipe-data";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";

interface Collection {
    id: string;
    name: string;
    recipeIds: number[];
    createdAt: string;
}

const COLLECTIONS_STORAGE_KEY = "cook-recipe-collections";

const DEFAULT_COLLECTIONS: Collection[] = [
    { id: "favorites", name: "Favorites", recipeIds: [], createdAt: new Date().toISOString() },
];

export default function MyRecipesPage() {
    const navbarTranslations = useNavbarTranslations();
    const [collections, setCollections] = useState<Collection[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeCollection, setActiveCollection] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState("");

    // Load collections from localStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const stored = localStorage.getItem(COLLECTIONS_STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        setCollections(parsed);
                    } else {
                        setCollections(DEFAULT_COLLECTIONS);
                    }
                } else {
                    setCollections(DEFAULT_COLLECTIONS);
                }
            } catch {
                setCollections(DEFAULT_COLLECTIONS);
            }
            setIsLoaded(true);
        }
    }, []);

    // Save collections to localStorage whenever they change
    useEffect(() => {
        if (isLoaded && typeof window !== "undefined") {
            localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(collections));
        }
    }, [collections, isLoaded]);

    // Get all saved recipe IDs across all collections
    const allSavedRecipeIds = [...new Set(collections.flatMap(c => c.recipeIds))];

    // Get recipes based on active collection or all saved
    const displayedRecipeIds = activeCollection
        ? collections.find(c => c.id === activeCollection)?.recipeIds || []
        : allSavedRecipeIds;

    const displayedRecipes = ALL_RECIPES.filter(r =>
        displayedRecipeIds.includes(r.id) &&
        r.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const createCollection = () => {
        if (newCollectionName.trim()) {
            const newCollection: Collection = {
                id: Date.now().toString(),
                name: newCollectionName.trim(),
                recipeIds: [],
                createdAt: new Date().toISOString()
            };
            setCollections([...collections, newCollection]);
            setNewCollectionName("");
            setShowNewCollectionModal(false);
        }
    };

    const deleteCollection = (id: string) => {
        if (id === "favorites") return; // Can't delete favorites
        setCollections(collections.filter(c => c.id !== id));
        if (activeCollection === id) {
            setActiveCollection(null);
        }
    };

    const removeFromCollection = (collectionId: string, recipeId: number) => {
        setCollections(collections.map(c =>
            c.id === collectionId
                ? { ...c, recipeIds: c.recipeIds.filter(id => id !== recipeId) }
                : c
        ));
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <NavbarClient translations={navbarTranslations} />
            <main className="flex-1 container mx-auto px-4 py-8 pt-24">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground mb-2">My Recipes</h1>
                            <p className="text-muted-foreground">
                                {allSavedRecipeIds.length} saved recipes across {collections.length} collections
                            </p>
                        </div>
                        <button
                            onClick={() => setShowNewCollectionModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                        >
                            <FolderPlus className="w-5 h-5" />
                            New Collection
                        </button>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Sidebar - Collections */}
                        <div className="md:col-span-1">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                                Collections
                            </h2>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setActiveCollection(null)}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${activeCollection === null
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-secondary/50 hover:bg-secondary text-foreground"
                                        }`}
                                >
                                    <span className="font-medium">All Saved</span>
                                    <span className={`text-sm ${activeCollection === null ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                        {allSavedRecipeIds.length}
                                    </span>
                                </button>

                                {collections.map((collection) => (
                                    <div
                                        key={collection.id}
                                        className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all group ${activeCollection === collection.id
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-secondary/50 hover:bg-secondary text-foreground"
                                            }`}
                                    >
                                        <button
                                            onClick={() => setActiveCollection(collection.id)}
                                            className="flex-1 text-left flex items-center justify-between"
                                        >
                                            <span className="font-medium">{collection.name}</span>
                                            <span className={`text-sm ${activeCollection === collection.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                                {collection.recipeIds.length}
                                            </span>
                                        </button>
                                        {collection.id !== "favorites" && (
                                            <button
                                                onClick={() => deleteCollection(collection.id)}
                                                className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${activeCollection === collection.id
                                                    ? "hover:bg-white/20"
                                                    : "hover:bg-red-100 text-red-600"
                                                    }`}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:col-span-3">
                            {/* Search & View Toggle */}
                            <div className="flex gap-4 mb-6">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search saved recipes..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-white dark:bg-zinc-900 border border-border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                                <div className="flex bg-secondary rounded-xl p-1">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white dark:bg-zinc-800 shadow-sm" : ""}`}
                                    >
                                        <Grid className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white dark:bg-zinc-800 shadow-sm" : ""}`}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Recipes */}
                            {displayedRecipes.length === 0 ? (
                                <div className="text-center py-20 bg-secondary/20 rounded-2xl border border-dashed border-border">
                                    <Bookmark className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                                    <p className="text-xl font-medium text-muted-foreground mb-2">
                                        {searchQuery ? "No recipes found" : "No saved recipes yet"}
                                    </p>
                                    <p className="text-muted-foreground">
                                        {searchQuery
                                            ? "Try a different search term"
                                            : "Browse recipes and save your favorites!"
                                        }
                                    </p>
                                    <Link
                                        href="/recipes"
                                        className="inline-block mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium"
                                    >
                                        Explore Recipes
                                    </Link>
                                </div>
                            ) : viewMode === "grid" ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {displayedRecipes.map((recipe) => (
                                        <Link
                                            key={recipe.id}
                                            href={`/recipes/${recipe.id}`}
                                            className="group bg-white dark:bg-zinc-900 rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02]"
                                        >
                                            <div className={`h-36 ${recipe.color} flex items-center justify-center text-5xl`}>
                                                {recipe.image}
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-xs font-bold uppercase text-muted-foreground">{recipe.category}</span>
                                                    <div className="flex items-center gap-1 text-amber-500 text-sm">
                                                        <Star className="w-3 h-3 fill-current" />
                                                        {recipe.rating}
                                                    </div>
                                                </div>
                                                <h3 className="font-bold group-hover:text-primary transition-colors line-clamp-1">
                                                    {recipe.title}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                                    <Clock className="w-4 h-4" />
                                                    {recipe.totalTime}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {displayedRecipes.map((recipe) => (
                                        <Link
                                            key={recipe.id}
                                            href={`/recipes/${recipe.id}`}
                                            className="group flex gap-4 bg-white dark:bg-zinc-900 rounded-xl border border-border p-4 hover:shadow-lg transition-all"
                                        >
                                            <div className={`w-20 h-20 ${recipe.color} rounded-xl flex items-center justify-center text-3xl flex-shrink-0`}>
                                                {recipe.image}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-bold uppercase text-muted-foreground">{recipe.category}</span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${recipe.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                                                        recipe.difficulty === "Medium" ? "bg-amber-100 text-amber-700" :
                                                            "bg-red-100 text-red-700"
                                                        }`}>
                                                        {recipe.difficulty}
                                                    </span>
                                                </div>
                                                <h3 className="font-bold group-hover:text-primary transition-colors">
                                                    {recipe.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                                                    {recipe.description}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                                    {recipe.rating}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {recipe.totalTime}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* New Collection Modal */}
            {showNewCollectionModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-border">
                        <h3 className="text-xl font-bold mb-4">Create New Collection</h3>
                        <input
                            type="text"
                            placeholder="Collection name..."
                            value={newCollectionName}
                            onChange={(e) => setNewCollectionName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && createCollection()}
                            autoFocus
                            className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowNewCollectionModal(false)}
                                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={createCollection}
                                className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
