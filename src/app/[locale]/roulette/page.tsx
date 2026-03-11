"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import { Dice5, Sparkles, ChefHat, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";
import { ALL_RECIPES } from "@/lib/recipe-data";

export default function RoulettePage() {
    const navbarTranslations = useNavbarTranslations();
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // We only use the first few recipes with images to cycle through
    const displayRecipes = ALL_RECIPES.slice(0, 15);

    const spinRoulette = () => {
        setIsSpinning(true);
        setResult(null);

        let spins = 0;
        const totalSpins = 40; // Total cycles
        const maxSpeed = 30; // Lowest interval
        const minSpeed = 300; // Highest interval at end

        const spinCycle = () => {
            if (spins >= totalSpins) {
                // Stop spinning
                setIsSpinning(false);
                const finalRecipe = displayRecipes[Math.floor(Math.random() * displayRecipes.length)];
                setResult(finalRecipe);
                return;
            }

            setCurrentIndex((prev) => (prev + 1) % displayRecipes.length);
            spins++;

            // Ease out interval
            const progress = spins / totalSpins;
            const currentInterval = maxSpeed + (minSpeed - maxSpeed) * Math.pow(progress, 3);

            setTimeout(spinCycle, currentInterval);
        };

        spinCycle();
    };

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans overflow-hidden">
            <NavbarClient translations={navbarTranslations} />

            <main className="flex-1 container mx-auto px-4 py-8 pt-24 font-sans flex flex-col items-center justify-center min-h-[80vh]">

                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-500 rounded-full font-bold mb-4">
                        <Dice5 className="w-5 h-5" />
                        Surprise Me Roulette
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-2">
                        Can't <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Decide?</span>
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg max-w-xl mx-auto">
                        Take a spin and let fate (and our AI) decide your next delicious meal.
                    </p>
                </div>

                <div className="relative w-full max-w-md aspect-square mx-auto mb-12 flex items-center justify-center group">
                    {/* The Wheel/Screen Container */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-[3rem] shadow-2xl p-4 transform transition-all group-hover:scale-105">
                        <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden relative shadow-inner">

                            {/* Inner display */}
                            {!isSpinning && !result ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-black/5 dark:bg-black/20">
                                    <ChefHat className="w-24 h-24 text-amber-500 mb-6 drop-shadow-md pb-4 animate-bounce" />
                                    <h2 className="text-3xl font-black text-foreground mb-4">Ready to Spin?</h2>
                                    <p className="text-muted-foreground font-medium">Click below to start</p>
                                </div>
                            ) : null}

                            {isSpinning && (
                                <div className="absolute inset-0 flex items-center justify-center flex-col bg-black/5 dark:bg-black/20">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -50, scale: 0.8 }}
                                        transition={{ duration: 0.15 }}
                                        className="text-center p-8"
                                    >
                                        <div className="text-6xl mb-6">🎰</div>
                                        <h3 className="text-3xl font-bold text-foreground truncate w-64 mx-auto">{displayRecipes[currentIndex].title}</h3>
                                        <p className="text-amber-500 font-bold tracking-wider mt-4">{displayRecipes[currentIndex].category}</p>
                                    </motion.div>
                                </div>
                            )}

                            {result && !isSpinning && (
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-zinc-800 dark:to-zinc-900"
                                >
                                    <Sparkles className="absolute top-8 right-8 text-amber-500 w-12 h-12 animate-pulse" />
                                    <div className={`w-32 h-32 rounded-full overflow-hidden border-4 border-amber-500 shadow-xl mb-6 shadow-amber-500/30 flex items-center justify-center ${result.color || 'bg-amber-100'}`}>
                                        <span className="text-6xl">{result.image}</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-foreground mb-2 leading-tight">{result.title}</h2>
                                    <p className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-1 justify-center">
                                        You scored a {result.difficulty} dish!
                                    </p>
                                </motion.div>
                            )}

                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center gap-6 animate-fade-in-up">
                    <button
                        onClick={spinRoulette}
                        disabled={isSpinning}
                        className="px-12 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold text-2xl rounded-full shadow-lg hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:-translate-y-1 transition-all flex items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        <RefreshCw className={`w-8 h-8 ${isSpinning ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                        {isSpinning ? "SPINNING..." : result ? "SPIN AGAIN" : "SPIN THE WHEEL"}
                    </button>

                    <AnimatePresence>
                        {result && !isSpinning && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-4 w-full justify-center"
                            >
                                <Link
                                    href={`/recipes/${result.id}`}
                                    className="px-8 py-4 bg-white dark:bg-zinc-800 text-foreground border-2 border-border font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-secondary transition-all shadow-sm flex-1 max-w-[200px]"
                                >
                                    See Details <ExternalLink className="w-5 h-5" />
                                </Link>
                                <Link
                                    href={`/how-to-cook?dish=${encodeURIComponent(result.title)}`}
                                    className="px-8 py-4 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-amber-500/20 transition-all shadow-sm flex-1 max-w-[200px]"
                                >
                                    Cook It AI <ChefHat className="w-5 h-5" />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
