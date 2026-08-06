"use client";

import { useState, useMemo } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import { useRouter } from "@/i18n/routing";
import { Heart, X, Flame, Sparkles, ChefHat, RotateCcw, Utensils, ArrowRight, Star, Zap } from "lucide-react";
import { ALL_RECIPES, type Recipe } from "@/lib/recipe-data";

// Rich preference deck with quantitative culinary attributes
const PREFERENCES = [
    { id: "spicy", name: "Fiery & Spicy", type: "Flavor", emoji: "🌶️", color: "from-red-500 to-orange-600", weights: { spice: 10, umami: 6, crunch: 4, richness: 5, freshness: 2 } },
    { id: "cheese", name: "Rich & Cheesy", type: "Texture", emoji: "🧀", color: "from-yellow-400 to-amber-600", weights: { spice: 2, umami: 8, crunch: 3, richness: 10, freshness: 1 } },
    { id: "crunchy", name: "Crispy & Crunchy", type: "Texture", emoji: "🍟", color: "from-orange-400 to-amber-700", weights: { spice: 4, umami: 7, crunch: 10, richness: 6, freshness: 3 } },
    { id: "sweet_tangy", name: "Sweet & Tangy", type: "Flavor", emoji: "🍯", color: "from-pink-400 to-rose-600", weights: { spice: 3, umami: 5, crunch: 4, richness: 4, freshness: 8 } },
    { id: "protein_heavy", name: "Succulent Protein", type: "Ingredient", emoji: "🍗", color: "from-orange-300 to-red-400", weights: { spice: 5, umami: 9, crunch: 5, richness: 7, freshness: 3 } },
    { id: "carbs", name: "Comforting Carbs", type: "Craving", emoji: "🍝", color: "from-yellow-200 to-yellow-500", weights: { spice: 3, umami: 6, crunch: 2, richness: 8, freshness: 2 } },
    { id: "fresh", name: "Fresh & Crisp Herbaceous", type: "Vibe", emoji: "🥗", color: "from-emerald-400 to-green-600", weights: { spice: 2, umami: 3, crunch: 8, richness: 2, freshness: 10 } },
    { id: "garlic_herb", name: "Garlic Butter Infusion", type: "Aromatic", emoji: "🧄", color: "from-amber-300 to-yellow-500", weights: { spice: 4, umami: 9, crunch: 4, richness: 9, freshness: 5 } },
];

export default function MatchmakerPage() {
    const navbarTranslations = useNavbarTranslations();
    const router = useRouter();

    const [cards, setCards] = useState(PREFERENCES);
    const [likedIds, setLikedIds] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);

    const activeIndex = cards.length - 1;

    const removeCard = (id: string, action: "right" | "left") => {
        setCards((prev) => prev.filter((card) => card.id !== id));
        if (action === "right") {
            setLikedIds((prev) => [...prev, id]);
        }
    };

    const handleSwipe = (id: string, action: "right" | "left") => {
        removeCard(id, action);
        if (cards.length === 1) {
            setTimeout(() => setShowResult(true), 400);
        }
    };

    const resetMatchmaker = () => {
        setCards(PREFERENCES);
        setLikedIds([]);
        setShowResult(false);
    };

    // Vector Flavor Profile Calculation
    const flavorProfile = useMemo(() => {
        const profile = { spice: 0, umami: 0, crunch: 0, richness: 0, freshness: 0 };
        const likedCards = PREFERENCES.filter((p) => likedIds.includes(p.id));

        if (likedCards.length === 0) {
            return { spice: 40, umami: 60, crunch: 50, richness: 50, freshness: 50 };
        }

        likedCards.forEach((card) => {
            profile.spice += card.weights.spice;
            profile.umami += card.weights.umami;
            profile.crunch += card.weights.crunch;
            profile.richness += card.weights.richness;
            profile.freshness += card.weights.freshness;
        });

        const maxVal = Math.max(...Object.values(profile), 1);
        return {
            spice: Math.round((profile.spice / maxVal) * 100),
            umami: Math.round((profile.umami / maxVal) * 100),
            crunch: Math.round((profile.crunch / maxVal) * 100),
            richness: Math.round((profile.richness / maxVal) * 100),
            freshness: Math.round((profile.freshness / maxVal) * 100),
        };
    }, [likedIds]);

    // Dynamic Multi-Attribute Recipe Ranking
    const { topMatch, runnerUps } = useMemo(() => {
        if (!showResult) {
            return {
                topMatch: { recipe: ALL_RECIPES[0], matchScore: 95 },
                runnerUps: [] as { recipe: Recipe; matchScore: number }[],
            };
        }

        const scored = ALL_RECIPES.map((recipe) => {
            let score = 50;
            const text = `${recipe.title} ${recipe.description} ${recipe.category} ${recipe.ingredients.map((i) => i.name).join(" ")}`.toLowerCase();

            if (likedIds.includes("spicy") && /spicy|chili|curry|tikka|masala|pepper/.test(text)) score += 25;
            if (likedIds.includes("cheese") && /cheese|paneer|mozzarella|parmesan|cream/.test(text)) score += 25;
            if (likedIds.includes("crunchy") && /crispy|crunchy|fried|toast|roast|nuts/.test(text)) score += 20;
            if (likedIds.includes("sweet_tangy") && /sweet|honey|lemon|citrus|tangy|tomato/.test(text)) score += 20;
            if (likedIds.includes("protein_heavy") && /chicken|beef|salmon|tuna|tofu|egg|pork|shrimp/.test(text)) score += 25;
            if (likedIds.includes("carbs") && /pasta|rice|noodles|bread|naan|potatoes|flour/.test(text)) score += 20;
            if (likedIds.includes("fresh") && /salad|fresh|herbs|spinach|avocado|greens/.test(text)) score += 20;
            if (likedIds.includes("garlic_herb") && /garlic|butter|herb|basil|rosemary|parsley/.test(text)) score += 20;

            return { recipe, matchScore: Math.min(99, Math.max(72, score)) };
        });

        scored.sort((a, b) => b.matchScore - a.matchScore);
        return {
            topMatch: scored[0],
            runnerUps: scored.slice(1, 3),
        };
    }, [showResult, likedIds]);

    return (
        <div className="min-h-screen bg-background flex flex-col overflow-hidden font-sans">
            <NavbarClient translations={navbarTranslations} />

            <main className="flex-1 container mx-auto px-4 py-8 pt-24 max-w-5xl flex flex-col items-center justify-center min-h-[80vh]">
                <div className="text-center mb-8 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-500/10 text-rose-500 rounded-full font-bold mb-3 text-xs uppercase tracking-wider">
                        <Flame className="w-4 h-4 fill-current" />
                        AI Flavor Matchmaker
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-2">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500">Soul-Dish</span>
                    </h1>
                    <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                        Swipe right on cravings that ignite your palate. Our culinary algorithm computes your multidimensional flavor matrix.
                    </p>
                </div>

                {!showResult ? (
                    <div className="relative w-full max-w-sm aspect-[3/4] perspective-1000 flex items-center justify-center mt-4">
                        <AnimatePresence>
                            {cards.map((card, index) => {
                                const isFront = index === activeIndex;
                                return (
                                    <SwipeableCard
                                        key={card.id}
                                        card={card}
                                        isFront={isFront}
                                        onSwipe={(dir) => handleSwipe(card.id, dir)}
                                    />
                                );
                            })}
                        </AnimatePresence>

                        {cards.length === 0 && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary/80 rounded-3xl backdrop-blur-md p-6 text-center animate-pulse border border-border">
                                <Sparkles className="w-12 h-12 text-primary mb-3 animate-spin" />
                                <h3 className="text-xl font-bold text-foreground mb-1">Computing Flavor Vector...</h3>
                                <p className="text-xs text-muted-foreground">Matching sensory profile against recipe database</p>
                            </div>
                        )}

                        {cards.length > 0 && (
                            <div className="absolute -bottom-24 left-0 w-full flex justify-center gap-6">
                                <button
                                    onClick={() => handleSwipe(cards[activeIndex].id, "left")}
                                    className="w-16 h-16 rounded-full bg-white dark:bg-zinc-800 shadow-xl flex items-center justify-center border border-border text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all hover:scale-110 active:scale-95"
                                    aria-label="Pass"
                                >
                                    <X className="w-8 h-8" />
                                </button>
                                <button
                                    onClick={() => handleSwipe(cards[activeIndex].id, "right")}
                                    className="w-16 h-16 rounded-full bg-white dark:bg-zinc-800 shadow-xl flex items-center justify-center border border-border text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all hover:scale-110 active:scale-95"
                                    aria-label="Like"
                                >
                                    <Heart className="w-8 h-8 fill-current" />
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Results Screen */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 border border-border shadow-2xl space-y-8"
                    >
                        {/* Top Match Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-black uppercase tracking-wider mb-2">
                                    <Sparkles className="w-4 h-4" /> {topMatch.matchScore}% Culinary Match
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-foreground">
                                    {topMatch.recipe.title}
                                </h2>
                                <p className="text-muted-foreground text-sm mt-1">{topMatch.recipe.description}</p>
                            </div>

                            <button
                                onClick={() => router.push(`/how-to-cook?dish=${encodeURIComponent(topMatch.recipe.title)}`)}
                                className="px-6 py-3.5 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all self-start md:self-auto"
                            >
                                <Utensils className="w-5 h-5" /> Cook This Dish
                            </button>
                        </div>

                        {/* Flavor Matrix Breakdown */}
                        <div>
                            <h3 className="text-sm font-extrabold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-amber-500" /> Your Craving Flavor Vector
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                {[
                                    { label: "Spice Heat", val: flavorProfile.spice, color: "bg-red-500" },
                                    { label: "Umami", val: flavorProfile.umami, color: "bg-amber-500" },
                                    { label: "Crunch Factor", val: flavorProfile.crunch, color: "bg-orange-500" },
                                    { label: "Richness", val: flavorProfile.richness, color: "bg-purple-500" },
                                    { label: "Fresh Herb", val: flavorProfile.freshness, color: "bg-emerald-500" },
                                ].map((stat) => (
                                    <div key={stat.label} className="p-3 bg-secondary/50 rounded-2xl border border-border/50 text-center">
                                        <p className="text-xs text-muted-foreground font-semibold mb-1">{stat.label}</p>
                                        <p className="text-xl font-black text-foreground mb-1">{stat.val}%</p>
                                        <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                                            <div className={`h-full ${stat.color}`} style={{ width: `${stat.val}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Runner Up Recommendations */}
                        {runnerUps.length > 0 && (
                            <div>
                                <h3 className="text-sm font-extrabold uppercase tracking-wider text-muted-foreground mb-3">
                                    Alternative Matches for Tonight
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {runnerUps.map(({ recipe, matchScore }) => (
                                        <div
                                            key={recipe.id}
                                            onClick={() => router.push(`/how-to-cook?dish=${encodeURIComponent(recipe.title)}`)}
                                            className="group p-4 bg-secondary/30 hover:bg-secondary/60 rounded-2xl border border-border cursor-pointer transition-all flex items-center justify-between"
                                        >
                                            <div>
                                                <span className="text-xs font-bold text-emerald-500">{matchScore}% Match</span>
                                                <h4 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                                                    {recipe.title}
                                                </h4>
                                                <p className="text-xs text-muted-foreground">{recipe.category} • {recipe.totalTime || "25 mins"}</p>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-transform" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Reset / Try Again */}
                        <div className="pt-4 border-t border-border flex justify-center">
                            <button
                                onClick={resetMatchmaker}
                                className="px-6 py-3 bg-secondary text-foreground font-bold rounded-2xl hover:bg-secondary/80 flex items-center gap-2 transition-all"
                            >
                                <RotateCcw className="w-4 h-4" /> Start Fresh Matchmaker
                            </button>
                        </div>
                    </motion.div>
                )}
            </main>

            <Footer />
        </div>
    );
}

function SwipeableCard({
    card,
    isFront,
    onSwipe,
}: {
    card: (typeof PREFERENCES)[0];
    isFront: boolean;
    onSwipe: (dir: "left" | "right") => void;
}) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

    const handleDragEnd = (_: any, info: any) => {
        if (info.offset.x > 100) {
            onSwipe("right");
        } else if (info.offset.x < -100) {
            onSwipe("left");
        }
    };

    return (
        <motion.div
            style={{
                x: isFront ? x : 0,
                rotate: isFront ? rotate : 0,
                opacity: isFront ? opacity : 0.7,
                cursor: isFront ? "grab" : "auto",
                zIndex: isFront ? 10 : 0,
                scale: isFront ? 1 : 0.95,
                y: isFront ? 0 : 15,
            }}
            drag={isFront ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: "grabbing" }}
            className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${card.color} shadow-2xl p-6 flex flex-col justify-between text-white border-2 border-white/20 select-none`}
        >
            <div className="flex justify-between items-center">
                <span className="px-3.5 py-1.5 rounded-full bg-black/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                    {card.type}
                </span>
                <span className="text-xs font-bold text-white/80">Swipe Right = Craving</span>
            </div>

            <div className="text-center my-auto">
                <div className="text-7xl mb-4 filter drop-shadow-lg">{card.emoji}</div>
                <h3 className="text-2xl font-black">{card.name}</h3>
            </div>

            <div className="flex justify-between items-center text-xs font-bold text-white/70">
                <span>✕ Swipe Left to Skip</span>
                <span>♥ Swipe Right to Add</span>
            </div>
        </motion.div>
    );
}
