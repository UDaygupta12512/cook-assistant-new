"use client";

import { useState, useEffect } from "react";
import { Plus, X, ChefHat, Trash2, Search, Sparkles, Package, Milk, Carrot, Beef, Cookie, Droplets, Filter, AlertTriangle, Clock } from "lucide-react";
import { Link } from "@/i18n/routing";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";

interface PantryItem {
    name: string;
    nameHindi: string;
    category: string;
    emoji: string;
    quantity?: string;
    expiryDays?: number; // Zero-Waste: Number of days until expiry
}

const CATEGORIES = [
    { id: "all", name: "All Items", nameHindi: "सभी सामान", icon: Package, color: "bg-gray-100 text-gray-600" },
    { id: "dairy", name: "Dairy", nameHindi: "डेयरी", icon: Milk, color: "bg-blue-100 text-blue-600" },
    { id: "vegetables", name: "Vegetables", nameHindi: "सब्जियां", icon: Carrot, color: "bg-green-100 text-green-600" },
    { id: "proteins", name: "Proteins", nameHindi: "प्रोटीन", icon: Beef, color: "bg-red-100 text-red-600" },
    { id: "grains", name: "Grains", nameHindi: "अनाज", icon: Cookie, color: "bg-amber-100 text-amber-600" },
    { id: "condiments", name: "Condiments", nameHindi: "मसाले", icon: Droplets, color: "bg-purple-100 text-purple-600" },
];

const INITIAL_PANTRY: PantryItem[] = [
    { name: "Rice", nameHindi: "चावल", category: "grains", emoji: "🍚", quantity: "2 kg", expiryDays: 180 },
    { name: "Pasta", nameHindi: "पास्ता", category: "grains", emoji: "🍝", quantity: "500g", expiryDays: 365 },
    { name: "Tomatoes", nameHindi: "टमाटर", category: "vegetables", emoji: "🍅", quantity: "6 pcs", expiryDays: 4 },
    { name: "Onions", nameHindi: "प्याज", category: "vegetables", emoji: "🧅", quantity: "1 kg", expiryDays: 14 },
    { name: "Garlic", nameHindi: "लहसुन", category: "condiments", emoji: "🧄", quantity: "200g", expiryDays: 30 },
    { name: "Olive Oil", nameHindi: "जैतून का तेल", category: "condiments", emoji: "🫒", quantity: "500ml", expiryDays: 300 },
    { name: "Milk", nameHindi: "दूध", category: "dairy", emoji: "🥛", quantity: "1L", expiryDays: 2 }, // Expiring soon!
    { name: "Eggs", nameHindi: "अंडे", category: "proteins", emoji: "🥚", quantity: "12 pcs", expiryDays: 10 },
    { name: "Chicken", nameHindi: "मुर्गी", category: "proteins", emoji: "🍗", quantity: "1 kg", expiryDays: 2 }, // Expiring soon!
    { name: "Potatoes", nameHindi: "आलू", category: "vegetables", emoji: "🥔", quantity: "2 kg", expiryDays: 21 },
    { name: "Cheese", nameHindi: "पनीर", category: "dairy", emoji: "🧀", quantity: "250g", expiryDays: 14 },
    { name: "Butter", nameHindi: "मक्खन", category: "dairy", emoji: "🧈", quantity: "200g", expiryDays: 60 },
    { name: "Ginger", nameHindi: "अदरक", category: "condiments", emoji: "🫚", quantity: "100g", expiryDays: 14 },
    { name: "Lemon", nameHindi: "नींबू", category: "vegetables", emoji: "🍋", quantity: "5 pcs", expiryDays: 14 },
    { name: "Spinach", nameHindi: "पालक", category: "vegetables", emoji: "🥬", quantity: "500g", expiryDays: 1 }, // Def expiring soon!
    { name: "Flour", nameHindi: "आटा", category: "grains", emoji: "🌾", quantity: "5 kg", expiryDays: 180 },
];

const SUGGESTED_INGREDIENTS: PantryItem[] = [
    { name: "Paneer", nameHindi: "पनीर", category: "dairy", emoji: "🧊" },
    { name: "Green Chili", nameHindi: "हरी मिर्च", category: "condiments", emoji: "🌶️" },
    { name: "Coriander", nameHindi: "धनिया", category: "vegetables", emoji: "🌿" },
    { name: "Cumin Seeds", nameHindi: "जीरा", category: "condiments", emoji: "🫘" },
    { name: "Turmeric", nameHindi: "हल्दी", category: "condiments", emoji: "🟡" },
    { name: "Yogurt", nameHindi: "दही", category: "dairy", emoji: "🥣" },
];

const RECIPE_SUGGESTIONS = [
    {
        name: "Butter Chicken",
        nameHindi: "बटर चिकन",
        emoji: "🍛",
        matchedIngredients: ["Chicken", "Butter", "Tomatoes", "Onions", "Garlic"],
        missingIngredients: ["Cream", "Kasuri Methi"],
        color: "from-orange-500 to-red-500"
    },
    {
        name: "Pasta Carbonara",
        nameHindi: "पास्ता कार्बोनारा",
        emoji: "🍝",
        matchedIngredients: ["Pasta", "Eggs", "Cheese"],
        missingIngredients: ["Pancetta", "Black Pepper"],
        color: "from-amber-500 to-orange-500"
    },
    {
        name: "Egg Fried Rice",
        nameHindi: "एग फ्राइड राइस",
        emoji: "🍳",
        matchedIngredients: ["Rice", "Eggs", "Onions", "Garlic"],
        missingIngredients: ["Soy Sauce", "Spring Onions"],
        color: "from-yellow-500 to-amber-500"
    },
    {
        name: "Aloo Palak",
        nameHindi: "आलू पालक",
        emoji: "🥬",
        matchedIngredients: ["Potatoes", "Spinach", "Onions", "Garlic", "Ginger"],
        missingIngredients: ["Green Chili"],
        color: "from-green-500 to-emerald-500"
    },
];

const PANTRY_STORAGE_KEY = "cook-pantry-items";

export default function PantryPage() {
    const navbarTranslations = useNavbarTranslations();
    const [ingredients, setIngredients] = useState<PantryItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [newIngredient, setNewIngredient] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    // Load from localStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const stored = localStorage.getItem(PANTRY_STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        setIngredients(parsed);
                    } else {
                        setIngredients(INITIAL_PANTRY);
                    }
                } else {
                    setIngredients(INITIAL_PANTRY);
                }
            } catch {
                setIngredients(INITIAL_PANTRY);
            }
            setIsLoaded(true);
        }
    }, []);

    // Save to localStorage whenever ingredients change
    useEffect(() => {
        if (isLoaded && typeof window !== "undefined") {
            localStorage.setItem(PANTRY_STORAGE_KEY, JSON.stringify(ingredients));
        }
    }, [ingredients, isLoaded]);

    const addIngredient = (e: React.FormEvent) => {
        e.preventDefault();
        if (newIngredient.trim()) {
            setIngredients([...ingredients, {
                name: newIngredient.trim(),
                nameHindi: newIngredient.trim(),
                category: "grains",
                emoji: "📦"
            }]);
            setNewIngredient("");
        }
    };

    const addSuggestedIngredient = (item: PantryItem) => {
        if (!ingredients.find(i => i.name === item.name)) {
            setIngredients([...ingredients, item]);
        }
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const filteredIngredients = ingredients.filter(item => {
        const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.nameHindi.includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    const getCategoryColor = (category: string) => {
        return CATEGORIES.find(c => c.id === category)?.color || "bg-gray-100 text-gray-600";
    };

    const expiringSoonItems = ingredients.filter(i => i.expiryDays !== undefined && i.expiryDays <= 3);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <NavbarClient translations={navbarTranslations} />
            <main className="flex-1 container mx-auto px-4 py-8 pt-24">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                                <span className="text-4xl">🥘</span>
                                My Pantry / मेरी रसोई
                            </h1>
                            <p className="text-muted-foreground">
                                Manage your ingredients to get personalized recipe suggestions.
                                <span className="text-primary ml-2">सामग्री प्रबंधित करें।</span>
                            </p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                            <Package className="w-5 h-5 text-primary" />
                            <span className="font-bold text-primary">{ingredients.length}</span>
                            <span className="text-muted-foreground">items</span>
                        </div>
                    </div>

                    {/* Zero-Waste Logger Warning Banner */}
                    {expiringSoonItems.length > 0 && (
                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-amber-100 dark:bg-amber-800 rounded-full text-amber-600 dark:text-amber-200 mt-1 flex-shrink-0">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                                        Zero-Waste Alert!
                                        <span className="bg-amber-200 dark:bg-amber-700 text-amber-800 dark:text-amber-200 text-xs px-2 py-0.5 rounded-full font-bold">
                                            {expiringSoonItems.length} Items Expiring
                                        </span>
                                    </h3>
                                    <p className="text-amber-800 dark:text-amber-300 mt-1">
                                        Your <strong className="font-bold">{expiringSoonItems.map(i => i.name).join(", ")}</strong> {expiringSoonItems.length === 1 ? 'is' : 'are'} about to go bad! Let's generate a recipe to use them now.
                                    </p>
                                </div>
                            </div>
                            <Link href="/generate" className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap shadow-sm text-center">
                                Generate Rescue Recipe
                            </Link>
                        </div>
                    )}

                    {/* Search and Add */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-border mb-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search ingredients... / सामग्री खोजें..."
                                    className="w-full bg-secondary/30 border border-border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            {/* Add */}
                            <form onSubmit={addIngredient} className="flex gap-2">
                                <input
                                    type="text"
                                    value={newIngredient}
                                    onChange={(e) => setNewIngredient(e.target.value)}
                                    placeholder="Add ingredient..."
                                    className="bg-secondary/30 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 w-48"
                                />
                                <button
                                    type="submit"
                                    className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Quick Add Suggestions */}
                    <div className="mb-8">
                        <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Quick Add / जल्दी जोड़ें
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {SUGGESTED_INGREDIENTS.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => addSuggestedIngredient(item)}
                                    disabled={ingredients.find(i => i.name === item.name) !== undefined}
                                    className="px-4 py-2 bg-secondary/50 hover:bg-secondary border border-border rounded-full text-sm flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span>{item.emoji}</span>
                                    <span>{item.name}</span>
                                    <span className="text-primary text-xs">({item.nameHindi})</span>
                                    <Plus className="w-3 h-3" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {CATEGORIES.map((category) => {
                            const Icon = category.icon;
                            const count = category.id === "all"
                                ? ingredients.length
                                : ingredients.filter(i => i.category === category.id).length;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${selectedCategory === category.id
                                        ? "bg-primary text-white"
                                        : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{category.name}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === category.id
                                        ? "bg-white/20"
                                        : "bg-primary/10 text-primary"
                                        }`}>{count}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Ingredients Grid */}
                        <div className="lg:col-span-2">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Package className="w-5 h-5 text-primary" />
                                Pantry Items / पैंट्री सामान
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {filteredIngredients.map((item, index) => (
                                    <div
                                        key={index}
                                        className="group relative flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all"
                                    >
                                        <span className="text-2xl">{item.emoji}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-foreground truncate">{item.name}</p>
                                            <p className="text-xs text-primary">{item.nameHindi}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                {item.quantity && (
                                                    <p className="text-xs text-muted-foreground">{item.quantity}</p>
                                                )}
                                                {item.expiryDays !== undefined && (
                                                    <p className={`text-xs flex items-center gap-1 font-medium ${item.expiryDays <= 3 ? "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 rounded-sm" :
                                                            item.expiryDays <= 7 ? "text-yellow-600 dark:text-yellow-500" : "text-green-600"
                                                        }`}>
                                                        <Clock className="w-3 h-3" />
                                                        {item.expiryDays <= 0 ? "Expired" : `${item.expiryDays} ${item.expiryDays === 1 ? 'day' : 'days'}`}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeIngredient(ingredients.indexOf(item))}
                                            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive p-1 rounded-full hover:bg-destructive/10 transition-all opacity-0 group-hover:opacity-100"
                                            aria-label="Remove ingredient"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}

                                {filteredIngredients.length === 0 && (
                                    <div className="col-span-full text-center py-12 text-muted-foreground">
                                        <Trash2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        <p>No ingredients found. Add some to get started!</p>
                                        <p className="text-primary text-sm mt-1">कोई सामग्री नहीं मिली।</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recipe Suggestions */}
                        <div>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary" />
                                What You Can Make / आप क्या बना सकते हैं
                            </h2>
                            <div className="space-y-4">
                                {RECIPE_SUGGESTIONS.map((recipe, index) => (
                                    <div
                                        key={index}
                                        className="relative overflow-hidden bg-white dark:bg-zinc-900 border border-border rounded-2xl hover:shadow-lg transition-all"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-r ${recipe.color} opacity-5`} />
                                        <div className="relative p-4">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-3xl">{recipe.emoji}</span>
                                                <div>
                                                    <h3 className="font-bold text-foreground">{recipe.name}</h3>
                                                    <p className="text-sm text-primary">{recipe.nameHindi}</p>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <p className="text-xs text-muted-foreground mb-1">✅ You have:</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {recipe.matchedIngredients.slice(0, 3).map((ing, i) => (
                                                        <span key={i} className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                                                            {ing}
                                                        </span>
                                                    ))}
                                                    {recipe.matchedIngredients.length > 3 && (
                                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                                                            +{recipe.matchedIngredients.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <p className="text-xs text-muted-foreground mb-1">❌ Missing:</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {recipe.missingIngredients.map((ing, i) => (
                                                        <span key={i} className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">
                                                            {ing}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <Link
                                                href={`/recipes?search=${encodeURIComponent(recipe.name)}`}
                                                className={`block w-full py-2 bg-gradient-to-r ${recipe.color} text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all text-center`}
                                            >
                                                View Recipe / रेसिपी देखें
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {CATEGORIES.slice(1).map((category) => {
                            const Icon = category.icon;
                            const count = ingredients.filter(i => i.category === category.id).length;
                            return (
                                <div key={category.id} className={`p-4 rounded-xl ${category.color}`}>
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-8 h-8" />
                                        <div>
                                            <p className="text-2xl font-bold">{count}</p>
                                            <p className="text-sm opacity-80">{category.name}</p>
                                            <p className="text-xs opacity-60">{category.nameHindi}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
