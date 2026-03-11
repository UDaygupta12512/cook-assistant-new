"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import { Siren, Clock, Flame, Zap, CheckCircle2, RefreshCw } from "lucide-react";

type EmergencyRecipe = {
    name: string;
    time: string;
    equipment: string;
    ingredients: string[];
    steps: string[];
};

const EMERGENCY_RECIPES: EmergencyRecipe[] = [
    {
        name: "Microwave Mug Mac & Cheese",
        time: "5 mins",
        equipment: "Microwave, Mug",
        ingredients: [
            "1/2 cup macaroni",
            "1/2 cup water",
            "1/4 cup milk",
            "1/2 cup shredded cheese"
        ],
        steps: [
            "Add macaroni and water to a large mug.",
            "Microwave for 2-3 minutes until pasta is cooked (watch so it doesn't boil over!).",
            "Stir in milk and cheese.",
            "Microwave for another 30 seconds until gooey. Eat immediately."
        ]
    },
    {
        name: "Peanut Butter Banana Wrap",
        time: "2 mins",
        equipment: "None (No Cook)",
        ingredients: [
            "1 tortilla or flatbread",
            "2 tbsp peanut butter",
            "1 whole banana",
            "Drizzle of honey (optional)"
        ],
        steps: [
            "Spread peanut butter evenly over the tortilla.",
            "Place the peeled banana near one edge.",
            "Drizzle with honey if using.",
            "Roll it up tightly and devour."
        ]
    },
    {
        name: "Speedy Quesadilla",
        time: "4 mins",
        equipment: "Microwave or Skillet",
        ingredients: [
            "2 tortillas",
            "1 cup shredded cheese",
            "Salsa or hot sauce for dipping"
        ],
        steps: [
            "Place one tortilla on a plate, cover evenly with cheese.",
            "Top with the second tortilla.",
            "Microwave for 1 minute OR heat in a skillet for 2 mins per side until melted.",
            "Slice into triangles and dip in salsa."
        ]
    },
    {
        name: "Avocado Toast on Steroids",
        time: "3 mins",
        equipment: "Toaster",
        ingredients: [
            "2 slices of bread",
            "1 ripe avocado",
            "Salt, pepper, red pepper flakes",
            "A squeeze of lemon or lime"
        ],
        steps: [
            "Toast the bread until golden and crunchy.",
            "Mash the avocado directly onto the toast with a fork.",
            "Season vigorously with salt, pepper, and chili flakes.",
            "Squeeze citrus over the top and eat aggressively."
        ]
    }
];

export default function HangryPage() {
    const navbarTranslations = useNavbarTranslations();
    const [recipe, setRecipe] = useState<EmergencyRecipe | null>(null);
    const [isPanic, setIsPanic] = useState(true);

    const triggerEmergencyProtocol = useCallback(() => {
        const randomRecipe = EMERGENCY_RECIPES[Math.floor(Math.random() * EMERGENCY_RECIPES.length)];
        setRecipe(randomRecipe);
        setIsPanic(false);
    }, []);

    // Initial chaotic animation state
    useEffect(() => {
        if (!isPanic) return;

        // Play an alarm sound (mocked via console or browser beep if possible, but visual is enough for prototype)
        const audio = new Audio("data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
        void audio.play().catch(() => undefined);

        const timer = window.setTimeout(triggerEmergencyProtocol, 1500);

        return () => window.clearTimeout(timer);
    }, [isPanic, triggerEmergencyProtocol]);

    const reRoll = () => {
        setIsPanic(true);
        setRecipe(null);
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col font-sans overflow-hidden">
            <NavbarClient translations={navbarTranslations} />

            <main className="flex-1 container mx-auto px-4 py-8 pt-24 min-h-[85vh] flex flex-col items-center justify-center relative">

                {/* Panic Mode UI */}
                <AnimatePresence>
                    {isPanic && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-red-600/20 backdrop-blur-sm"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [-5, 5, -5, 5, 0],
                                    backgroundColor: ["#dc2626", "#991b1b", "#dc2626"]
                                }}
                                transition={{ repeat: Infinity, duration: 0.5 }}
                                className="w-48 h-48 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(220,38,38,0.8)] mb-8 border-8 border-red-500"
                            >
                                <Siren className="w-24 h-24 text-white" />
                            </motion.div>
                            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter text-shadow-[0_0_20px_rgba(220,38,38,1)] text-center">
                                EMERGENCY<br />CALORIES<br />REQUIRED
                            </h1>
                            <p className="text-red-200 mt-6 text-xl animate-pulse font-bold tracking-widest uppercase">
                                Deploying 5-minute salvation...
                            </p>

                            {/* Visual strobing effect */}
                            <motion.div
                                animate={{ opacity: [0, 0.3, 0] }}
                                transition={{ repeat: Infinity, duration: 0.2 }}
                                className="fixed inset-0 bg-red-500 pointer-events-none mix-blend-overlay"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Solution UI */}
                {recipe && !isPanic && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-3xl bg-zinc-900 border-2 border-red-500/30 rounded-[2rem] p-8 md:p-12 shadow-[0_0_50px_rgba(220,38,38,0.15)] relative overflow-hidden"
                    >
                        {/* Hazard stripes top border */}
                        <div className="absolute top-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(45deg,#dc2626,#dc2626_20px,#000_20px,#000_40px)]" />

                        <div className="flex items-center gap-3 mb-8 pt-4">
                            <div className="px-4 py-2 bg-red-500/10 text-red-500 rounded-full font-bold uppercase tracking-wider text-sm flex items-center gap-2 border border-red-500/30">
                                <Zap className="w-4 h-4 fill-current" /> Hangry Crisis Averted
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">{recipe.name}</h2>

                        <div className="flex flex-wrap items-center gap-4 mb-10">
                            <div className="flex items-center gap-2 bg-red-500 text-white px-5 py-3 rounded-xl font-black text-lg shadow-lg shadow-red-500/20">
                                <Clock className="w-5 h-5" /> {recipe.time}
                            </div>
                            <div className="flex items-center gap-2 bg-zinc-800 text-zinc-300 px-5 py-3 rounded-xl font-bold border border-zinc-700">
                                <Flame className="w-5 h-5 text-orange-500" /> {recipe.equipment}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-black text-zinc-400 mb-6 uppercase tracking-wider border-b border-zinc-800 pb-4">Required Elements</h3>
                                <ul className="space-y-4">
                                    {recipe.ingredients.map((ing, i) => (
                                        <li key={i} className="flex gap-3 text-lg font-medium text-zinc-200 bg-zinc-800/50 p-3 rounded-lg">
                                            <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0" />
                                            {ing}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-2xl font-black text-zinc-400 mb-6 uppercase tracking-wider border-b border-zinc-800 pb-4">Execution Steps</h3>
                                <ul className="space-y-6">
                                    {recipe.steps.map((step, i) => (
                                        <li key={i} className="flex gap-4 group">
                                            <div className="w-10 h-10 bg-zinc-800 text-red-500 font-black rounded-lg flex items-center justify-center flex-shrink-0 border border-zinc-700 group-hover:bg-red-500 group-hover:text-white transition-colors text-xl">
                                                {i + 1}
                                            </div>
                                            <p className="text-lg text-zinc-300 font-medium pt-1 leading-snug">{step}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-center">
                            <button
                                onClick={reRoll}
                                className="px-8 py-4 bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 font-bold rounded-xl transition-all flex items-center gap-2"
                            >
                                <RefreshCw className="w-5 h-5" /> Reject & Find Something Else
                            </button>
                        </div>

                    </motion.div>
                )}

            </main>
        </div>
    );
}
