"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import { Heart, X, Flame, Sparkles, ChefHat } from "lucide-react";
import Link from 'next/link';

// Mock preferences to swipe on
const PREFERENCES = [
    { id: "spicy", name: "Spicy & Fiery", type: "Flavor", emoji: "🌶️", color: "from-red-500 to-orange-600", bgColor: "bg-red-100 dark:bg-red-900/30" },
    { id: "cheese", name: "Extra Cheesy", type: "Texture", emoji: "🧀", color: "from-yellow-400 to-amber-600", bgColor: "bg-yellow-100 dark:bg-yellow-900/30" },
    { id: "crunchy", name: "Crispy & Crunchy", type: "Texture", emoji: "🍟", color: "from-orange-400 to-amber-700", bgColor: "bg-orange-100 dark:bg-orange-900/30" },
    { id: "sweet", name: "Sweet & Tangy", type: "Flavor", emoji: "🍯", color: "from-pink-400 to-rose-600", bgColor: "bg-pink-100 dark:bg-pink-900/30" },
    { id: "chicken", name: "Succulent Chicken", type: "Ingredient", emoji: "🍗", color: "from-orange-300 to-red-400", bgColor: "bg-orange-50 dark:bg-orange-900/20" },
    { id: "pasta", name: "Comforting Carbs", type: "Craving", emoji: "🍝", color: "from-yellow-200 to-yellow-500", bgColor: "bg-amber-100 dark:bg-amber-900/30" },
    { id: "fresh", name: "Fresh & Light", type: "Vibe", emoji: "🥗", color: "from-emerald-400 to-green-600", bgColor: "bg-emerald-100 dark:bg-emerald-900/30" },
];

export default function MatchmakerPage() {
    const navbarTranslations = useNavbarTranslations();
    const [cards, setCards] = useState(PREFERENCES);
    const [matches, setMatches] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);

    const activeIndex = cards.length - 1;

    const removeCard = (id: string, action: "right" | "left") => {
        setCards((prev) => prev.filter((card) => card.id !== id));
        if (action === "right") {
            setMatches((prev) => [...prev, id]);
        }
    };

    const handleSwipe = (id: string, action: "right" | "left") => {
        removeCard(id, action);
        if (cards.length === 1) { // We just removed the last card
            setTimeout(() => setShowResult(true), 500);
        }
    };

    // Calculate soul dish based on matches mock logic
    const getSoulDish = () => {
        if (matches.includes("spicy") && matches.includes("chicken")) return "Spicy Gochujang Fried Chicken";
        if (matches.includes("cheese") && matches.includes("pasta")) return "Four Cheese Baked Ziti";
        if (matches.includes("fresh")) return "Zesty Quinoa Spring Salad";
        if (matches.includes("sweet") && matches.includes("crunchy")) return "Sweet & Sour Crispy Tofu";
        return "Ultimate Fusion Bowl"; // Fallback
    };

    return (
        <div className="min-h-screen bg-background flex flex-col overflow-hidden">
            <NavbarClient translations={navbarTranslations} />

            <main className="flex-1 container mx-auto px-4 py-8 pt-24 font-sans flex flex-col items-center justify-center min-h-[80vh]">

                <div className="text-center mb-8 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-500 rounded-full font-bold mb-4">
                        <Flame className="w-5 h-5 fill-current" />
                        Flavor Matchmaker
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-2">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500">Soul-Dish</span>
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg max-w-xl mx-auto">
                        Swipe right on what makes your mouth water. We'll handle the rest and pair you with the perfect recipe for tonight.
                    </p>
                </div>

                {!showResult ? (
                    <div className="relative w-full max-w-md aspect-[3/4] perspective-1000 flex items-center justify-center mt-4">
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

                        {cards.length === 0 && !showResult && (
                            <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 rounded-3xl backdrop-blur-sm animate-pulse">
                                <p className="font-bold text-muted-foreground text-xl">Cooking up your match...</p>
                            </div>
                        )}

                        <div className="absolute -bottom-24 left-0 w-full flex justify-center gap-6">
                            <button onClick={() => cards.length > 0 && handleSwipe(cards[activeIndex].id, "left")} className="w-16 h-16 rounded-full bg-white dark:bg-zinc-800 shadow-xl flex items-center justify-center border border-border text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors hover:scale-110 active:scale-95">
                                <X className="w-8 h-8" />
                            </button>
                            <button onClick={() => cards.length > 0 && handleSwipe(cards[activeIndex].id, "right")} className="w-16 h-16 rounded-full bg-white dark:bg-zinc-800 shadow-xl flex items-center justify-center border border-border text-green-500 hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors hover:scale-110 active:scale-95">
                                <Heart className="w-8 h-8 fill-current" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="max-w-md w-full bg-white dark:bg-zinc-900 border border-border rounded-[2rem] p-8 text-center shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                            <ChefHat className="w-64 h-64 text-rose-500" />
                        </div>

                        <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-500/30 font-bold">
                            <Sparkles className="w-12 h-12 text-white fill-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-muted-foreground mb-2">It's a Match!</h2>
                        <h3 className="text-4xl font-extrabold text-foreground mb-6">
                            {getSoulDish()}
                        </h3>
                        <p className="text-muted-foreground mb-8">
                            Based on your swipes, we've identified the perfect flavor profile for your cravings tonight.
                        </p>

                        <div className="flex gap-4">
                            <button onClick={() => {
                                setCards(PREFERENCES);
                                setMatches([]);
                                setShowResult(false);
                            }} className="flex-1 py-4 bg-secondary font-bold text-foreground rounded-2xl hover:bg-secondary/80 transition-colors">
                                Swipe Again
                            </button>
                            <Link href={`/how-to-cook?dish=${encodeURIComponent(getSoulDish())}`} className="flex-1 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                                Cook It Now
                            </Link>
                        </div>
                    </motion.div>
                )}
            </main>

            <Footer />
        </div>
    );
}

function SwipeableCard({ card, isFront, onSwipe }: { card: typeof PREFERENCES[number], isFront: boolean, onSwipe: (dir: "left" | "right") => void }) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
    const likeOpacity = useTransform(x, [0, 100], [0, 1]);
    const nopeOpacity = useTransform(x, [0, -100], [0, 1]);

    const handleDragEnd = (event: any, info: any) => {
        if (info.offset.x > 100) {
            onSwipe("right");
        } else if (info.offset.x < -100) {
            onSwipe("left");
        }
    };

    return (
        <motion.div
            className={`absolute w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-zinc-900 border-2 border-border origin-bottom cursor-grab active:cursor-grabbing ${!isFront && 'pointer-events-none'}`}
            style={{ x, rotate, opacity }}
            drag={isFront ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: isFront ? 1 : 0.95, y: isFront ? 0 : 20 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className={`relative w-full h-full bg-gradient-to-br ${card.color}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[150px] select-none pointer-events-none opacity-80 drop-shadow-2xl">
                        {card.emoji}
                    </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 p-8 w-full pointer-events-none">
                    <div className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white font-bold text-xs uppercase tracking-wider mb-3 inline-block">
                        {card.type}
                    </div>
                    <h3 className="text-4xl font-extrabold text-white drop-shadow-md">
                        {card.name}
                    </h3>
                </div>

                {/* Overlay Indicators for drag */}
                {isFront && (
                    <>
                        <motion.div
                            className="absolute top-8 left-8 border-4 border-green-500 text-green-500 font-extrabold text-4xl px-4 py-2 rounded-xl rotate-[-15deg] uppercase pointer-events-none bg-white/10 backdrop-blur-sm"
                            style={{ opacity: likeOpacity }}
                        >
                            LIKE
                        </motion.div>
                        <motion.div
                            className="absolute top-8 right-8 border-4 border-red-500 text-red-500 font-extrabold text-4xl px-4 py-2 rounded-xl rotate-[15deg] uppercase pointer-events-none bg-white/10 backdrop-blur-sm"
                            style={{ opacity: nopeOpacity }}
                        >
                            NOPE
                        </motion.div>
                    </>
                )}
            </div>
        </motion.div>
    );
}
