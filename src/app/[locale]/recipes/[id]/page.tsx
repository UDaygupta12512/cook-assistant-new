"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
    ArrowLeft, Clock, Users, Star, ChefHat, Heart, Share2, Timer,
    Lightbulb, RefreshCw, FileDown, Bookmark, Check, Printer, Volume2, VolumeX,
    FlaskConical, AlertTriangle, Loader2, Sparkles
} from "lucide-react";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { getRecipeById, Recipe } from "@/lib/recipe-data";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import { ensureFullSteps } from "@/lib/culinary-engine";
import { useRouter } from "@/i18n/routing";


export default function RecipeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const navbarTranslations = useNavbarTranslations();
    const id = Number(params.id);
    const [isSaved, setIsSaved] = useState(false);
    const [activeTab, setActiveTab] = useState<"ingredients" | "instructions" | "nutrition">("ingredients");
    const [speakingLang, setSpeakingLang] = useState<'en' | 'hi' | null>(null);
    const stopRef = useRef(false);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        return () => {
            if (typeof window !== "undefined" && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);
    const [localRecipe, setLocalRecipe] = useState<Recipe | null>(null);
    const [sosProblem, setSosProblem] = useState("");
    const [sosLoading, setSosLoading] = useState(false);
    const [sosResult, setSosResult] = useState<{ fix: string, explanation: string } | null>(null);
    const [shareFeedback, setShareFeedback] = useState<"copied" | "shared" | null>(null);

    // Dynamic AI Step generation
    const [detailedStepsLoading, setDetailedStepsLoading] = useState(false);
    const [dynamicSteps, setDynamicSteps] = useState<string[] | null>(null);

    // Initial load: check DB immediately (sync). And then check localStorage in case it's AI generated (async)
    let rawRecipe = getRecipeById(id);

    useEffect(() => {
        if (!rawRecipe && typeof window !== 'undefined') {
            const cached = localStorage.getItem(`cook-ai-recipe-${id}`);
            if (cached) {
                try {
                    setLocalRecipe(JSON.parse(cached));
                } catch (e) {
                    console.error("Failed to parse cached recipe", e);
                }
            }
        }
    }, [id, rawRecipe]);

    rawRecipe = rawRecipe || localRecipe || undefined;

    // Ensure 8+ detailed steps for all recipes
    const recipe = rawRecipe ? {
        ...rawRecipe,
        ...ensureFullSteps({
            dishName: rawRecipe.title,
            existingEnglish: rawRecipe.steps,
            existingHindi: rawRecipe.stepsHindi || []
        })
    } : null;

    const hasAutoFetched = useRef(false);

    useEffect(() => {
        // Automatically fetch detailed instructions if the DB recipe has 6 or fewer steps (partial instructions)
        if (recipe && recipe.steps.length <= 6 && !dynamicSteps && !detailedStepsLoading && !hasAutoFetched.current) {
            hasAutoFetched.current = true;
            handleGetDetailedInstructions();
        }
    }, [recipe, dynamicSteps, detailedStepsLoading]);

    const toggleVoice = (lang: 'en' | 'hi' = 'en') => {
        if (!recipe) return;

        if (speakingLang === lang) {
            window.speechSynthesis.cancel();
            setSpeakingLang(null);
            stopRef.current = true;
            return;
        }

        window.speechSynthesis.cancel();
        setSpeakingLang(null);
        stopRef.current = false;

        setTimeout(() => {
            setSpeakingLang(lang);

            const chunks: string[] = [];

            if (lang === 'hi' && recipe.titleHindi) {
                chunks.push(`${recipe.titleHindi} की रेसिपी। `);
                chunks.push(`${recipe.descriptionHindi || ''} `);
                chunks.push(`सामग्री: `);
                recipe.ingredients.forEach(i => {
                    chunks.push(`${i.amount} ${i.unit} ${i.nameHindi || i.name}।`);
                });
                chunks.push(`निर्देश: `);

                if (recipe.stepsHindi) {
                    recipe.stepsHindi.forEach((step, index) => {
                        chunks.push(`स्टेप ${index + 1}: ${step}।`);
                    });
                } else if (dynamicSteps) {
                    dynamicSteps.forEach((step, index) => {
                        chunks.push(`स्टेप ${index + 1}: ${step}।`);
                    });
                } else {
                    recipe.steps.forEach((step, index) => {
                        chunks.push(`Step ${index + 1}: ${step}।`);
                    });
                }
            } else {
                chunks.push(`Recipe for ${recipe.title}. `);
                chunks.push(`${recipe.description || ''} `);
                chunks.push(`Ingredients: `);
                recipe.ingredients.forEach(i => {
                    chunks.push(`${i.amount} ${i.unit} of ${i.name}.`);
                });
                chunks.push(`Instructions: `);
                (dynamicSteps || recipe.steps).forEach((step, index) => {
                    chunks.push(`Step ${index + 1}: ${step}.`);
                });
            }

            const validChunks = chunks.filter(c => c && c.trim().length > 0);
            let chunkIndex = 0;

            const speakNext = () => {
                if (stopRef.current) return;
                if (chunkIndex >= validChunks.length) {
                    setSpeakingLang(null);
                    return;
                }

                const utterance = new SpeechSynthesisUtterance(validChunks[chunkIndex]);
                utteranceRef.current = utterance; // Prevent GC

                let voices = window.speechSynthesis.getVoices();

                if (lang === 'hi') {
                    utterance.lang = 'hi-IN';
                    const hiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('hi-IN'));
                    if (hiVoice) utterance.voice = hiVoice;
                } else {
                    utterance.lang = 'en-US';
                    const enVoice = voices.find(v => v.lang.includes('en-US') || v.lang.includes('en-GB') || v.lang.includes('en'));
                    if (enVoice) utterance.voice = enVoice;
                }

                utterance.onend = () => {
                    chunkIndex++;
                    speakNext();
                };

                utterance.onerror = (e) => {
                    console.error("Speech Error", e);
                    setSpeakingLang(null);
                };

                window.speechSynthesis.speak(utterance);
            };

            if (window.speechSynthesis.getVoices().length === 0) {
                const onVoicesChanged = () => {
                    window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
                    speakNext();
                };
                window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
            } else {
                speakNext();
            }
        }, 50);
    };

    const handleExportPDF = () => {
        // In production, this would generate a PDF
        // For now, we'll use the browser's print functionality
        window.print();
    };

    const handleSaveToCollection = () => {
        setIsSaved(!isSaved);
        // In production, this would save to user's collection in database
    };

    const handleShareRecipe = async () => {
        if (!recipe || typeof window === "undefined") return;

        const shareData: ShareData = {
            title: recipe.title,
            text: recipe.description,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                setShareFeedback("shared");
                return;
            }

            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(window.location.href);
                setShareFeedback("copied");
            }
        } catch (error) {
            console.error("Failed to share recipe", error);
        } finally {
            window.setTimeout(() => setShareFeedback(null), 2000);
        }
    };

    const handleSOSFix = async () => {
        if (!recipe || !sosProblem.trim()) return;
        setSosLoading(true);
        setSosResult(null);

        try {
            const res = await fetch('/api/seasoning-fixer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipeTitle: recipe.title,
                    ingredients: recipe.ingredients.map(i => i.name),
                    problem: sosProblem
                })
            });

            if (res.ok) {
                const data = await res.json();
                setSosResult(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSosLoading(false);
        }
    };

    const handleGetDetailedInstructions = async () => {
        if (!recipe) return;
        setDetailedStepsLoading(true);
        try {
            const res = await fetch("/api/detailed-steps", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    recipeName: recipe.title,
                    ingredients: recipe.ingredients.map((i: any) => typeof i === 'string' ? i : i.name)
                })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.steps) {
                    setDynamicSteps(data.steps);
                }
            }
        } catch (error) {
            console.error("Failed to fetch detailed steps", error);
        } finally {
            setDetailedStepsLoading(false);
        }
    };

    if (!recipe) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <NavbarClient translations={navbarTranslations} />
                <main className="flex-1 container mx-auto px-4 py-24 text-center">
                    <h1 className="text-4xl font-bold mb-4">Recipe Not Found</h1>
                    <button
                        onClick={() => router.push('/recipes')}
                        className="text-primary hover:underline font-medium"
                    >
                        Back to Recipes
                    </button>
                </main>
                <Footer />
            </div>
        );
    }



    return (
        <div className="min-h-screen bg-background flex flex-col print:bg-white">
            <div className="print:hidden">
                <NavbarClient translations={navbarTranslations} />
            </div>

            <main className="flex-1 pb-20">
                {/* Hero / Header */}
                <div className={`relative h-[350px] md:h-[400px] ${recipe.color} flex items-center justify-center overflow-hidden print:h-auto print:py-12`}>
                    {recipe.image.includes('.') ? (
                        <img src={recipe.image} alt={recipe.title} className="absolute inset-0 w-full h-full object-cover animate-fade-in" />
                    ) : (
                        <div className="text-[120px] md:text-[150px] animate-fade-in-up drop-shadow-xl select-none print:text-[80px]">
                            {recipe.image}
                        </div>
                    )}

                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="absolute top-24 left-4 md:left-8 bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-full hover:bg-white/30 transition-all z-10 print:hidden"
                    >
                        <ArrowLeft className="w-6 h-6 text-black dark:text-white" />
                    </button>

                    {/* Action Buttons */}
                    <div className="absolute top-24 right-4 md:right-8 flex gap-2 print:hidden">
                        <button
                            onClick={handleSaveToCollection}
                            className={`p-3 rounded-full backdrop-blur-md border transition-all ${isSaved
                                ? "bg-primary text-white border-primary"
                                : "bg-white/20 border-white/30 hover:bg-white/30"
                                }`}
                        >
                            {isSaved ? <Check className="w-6 h-6" /> : <Bookmark className="w-6 h-6" />}
                        </button>
                        <button
                            onClick={handleExportPDF}
                            className="p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/30 transition-all"
                            title="Download PDF"
                        >
                            <FileDown className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => toggleVoice('en')}
                            className={`p-3 backdrop-blur-md border rounded-full transition-all flex items-center gap-1 ${speakingLang === 'en'
                                ? "bg-red-500/20 border-red-500/50 text-red-500"
                                : "bg-white/20 border-white/30 text-green-500 hover:text-green-600 hover:bg-white/30"
                                }`}
                            title={speakingLang === 'en' ? "Stop Voice" : "Listen in English"}
                        >
                            {speakingLang === 'en' ? <VolumeX className="w-6 h-6 animate-pulse" /> : <Volume2 className="w-6 h-6" />}
                            <span className="text-xs font-bold font-sans">EN</span>
                        </button>
                        <button
                            onClick={() => toggleVoice('hi')}
                            className={`p-3 backdrop-blur-md border rounded-full transition-all flex items-center gap-1 ${speakingLang === 'hi'
                                ? "bg-red-500/20 border-red-500/50 text-red-500"
                                : "bg-white/20 border-white/30 text-orange-500 hover:text-orange-600 hover:bg-white/30"
                                }`}
                            title={speakingLang === 'hi' ? "Stop Voice" : "Listen in Hindi"}
                        >
                            {speakingLang === 'hi' ? <VolumeX className="w-6 h-6 animate-pulse" /> : <Volume2 className="w-6 h-6" />}
                            <span className="text-xs font-bold font-sans">HI</span>
                        </button>
                        <button
                            onClick={handleShareRecipe}
                            className="p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/30 transition-all"
                            title={shareFeedback === "copied" ? "Link Copied!" : shareFeedback === "shared" ? "Shared" : "Share Recipe"}
                        >
                            <Share2 className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="container mx-auto px-4 -mt-16 relative z-20 print:mt-0">
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-border p-6 md:p-10 max-w-5xl mx-auto print:shadow-none print:border-none">

                        {/* Title & Quick Info */}
                        <div className="mb-8 border-b border-border pb-8 print:border-black">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold tracking-wide uppercase">
                                    {recipe.category}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${recipe.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                                    recipe.difficulty === "Medium" ? "bg-amber-100 text-amber-700" :
                                        "bg-red-100 text-red-700"
                                    }`}>
                                    {recipe.difficulty}
                                </span>
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="font-medium">{recipe.rating}</span>
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2 leading-tight print:text-3xl">
                                {recipe.title}
                            </h1>
                            {recipe.titleHindi && (
                                <p className="text-xl md:text-2xl text-primary font-medium mb-4">
                                    {recipe.titleHindi}
                                </p>
                            )}
                            <p className="text-muted-foreground text-lg leading-relaxed print:text-black">
                                {recipe.description}
                            </p>
                            {recipe.descriptionHindi && (
                                <p className="text-primary/80 text-base mt-2 leading-relaxed">
                                    {recipe.descriptionHindi}
                                </p>
                            )}

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-4 print:hidden">
                                {recipe.tags.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Quick Info Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            <div className="bg-secondary/30 p-4 rounded-xl flex items-center gap-3 print:bg-gray-100">
                                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase">Prep Time</p>
                                    <p className="font-semibold">{recipe.prepTime}</p>
                                </div>
                            </div>
                            <div className="bg-secondary/30 p-4 rounded-xl flex items-center gap-3 print:bg-gray-100">
                                <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                                    <Timer className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase">Cook Time</p>
                                    <p className="font-semibold">{recipe.cookTime}</p>
                                </div>
                            </div>
                            <div className="bg-secondary/30 p-4 rounded-xl flex items-center gap-3 print:bg-gray-100">
                                <div className="bg-green-100 p-2 rounded-full text-green-600">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase">Servings</p>
                                    <p className="font-semibold">{recipe.servings} People</p>
                                </div>
                            </div>
                            <div className="bg-secondary/30 p-4 rounded-xl flex items-center gap-3 print:bg-gray-100">
                                <div className="bg-rose-100 p-2 rounded-full text-rose-600">
                                    <ChefHat className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase">Calories</p>
                                    <p className="font-semibold">{recipe.nutrition.calories} kcal</p>
                                </div>
                            </div>
                        </div>

                        {/* Tab Navigation - Mobile */}
                        <div className="flex gap-2 mb-6 md:hidden print:hidden">
                            {(["ingredients", "instructions", "nutrition"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${activeTab === tab
                                        ? "bg-primary text-white"
                                        : "bg-secondary text-muted-foreground"
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            {/* Ingredients */}
                            <div className={`md:col-span-1 ${activeTab !== "ingredients" && "hidden md:block"}`}>
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                                    Ingredients / सामग्री
                                </h2>
                                <ul className="space-y-3">
                                    {recipe.ingredients.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors print:p-1">
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                            <div>
                                                <span className="text-foreground">
                                                    <strong>{item.amount} {item.unit}</strong> {item.name}
                                                    {item.notes && <span className="text-muted-foreground"> ({item.notes})</span>}
                                                </span>
                                                {item.nameHindi && (
                                                    <p className="text-sm text-primary">{item.nameHindi}</p>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Substitutions */}
                                <div className="mt-8 print:mt-4">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <RefreshCw className="w-5 h-5 text-green-600" />
                                        Smart Substitutions
                                    </h3>
                                    <div className="space-y-3">
                                        {(recipe.substitutions || []).map((sub, index) => (
                                            <div key={index} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 print:bg-gray-50">
                                                <p className="text-sm">
                                                    <span className="font-medium text-green-700 dark:text-green-300">{sub.original}</span>
                                                    <span className="text-muted-foreground mx-2">→</span>
                                                    <span className="font-medium">{sub.substitute}</span>
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">{sub.notes}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className={`md:col-span-2 ${activeTab !== "instructions" && "hidden md:block"}`}>
                                <h2 className="text-xl font-bold mb-6 flex items-center justify-between gap-2">
                                    <span className="flex items-center gap-2">
                                        <span className="w-1 h-6 bg-primary rounded-full"></span>
                                        Instructions / निर्देश
                                    </span>

                                    {!dynamicSteps && (
                                        <button
                                            onClick={handleGetDetailedInstructions}
                                            disabled={detailedStepsLoading}
                                            className="ml-auto text-sm bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
                                        >
                                            {detailedStepsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                            {detailedStepsLoading ? "Expanding..." : "Make Instructions More Detailed"}
                                        </button>
                                    )}
                                </h2>

                                <div className="space-y-6">
                                    {(dynamicSteps || recipe.steps).map((step, index) => (
                                        <div key={index} className="flex gap-4 group">
                                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary/10 text-primary font-bold rounded-full border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors print:bg-gray-200 print:text-black">
                                                {index + 1}
                                            </div>
                                            <div className="pt-2">
                                                <p className="text-foreground leading-relaxed text-lg print:text-base">{step}</p>
                                                {!dynamicSteps && recipe.stepsHindi && recipe.stepsHindi[index] && (
                                                    <p className="text-primary mt-1">{recipe.stepsHindi[index]}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>




                                {/* Chef's Tips */}
                                <div className="mt-10 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 print:bg-gray-50 print:mt-6">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-800 dark:text-amber-200">
                                        <Lightbulb className="w-5 h-5" />
                                        Chef's Tips / शेफ की सलाह
                                    </h3>
                                    <ul className="space-y-3">
                                        {recipe.chefTips.map((tip, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <span className="text-amber-600 mt-1">💡</span>
                                                <div>
                                                    <p className="text-amber-900 dark:text-amber-100 print:text-black">{tip}</p>
                                                    {recipe.chefTipsHindi && recipe.chefTipsHindi[index] && (
                                                        <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">{recipe.chefTipsHindi[index]}</p>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Kitchen SOS Section */}
                                <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-800/50 print:hidden">
                                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-red-700 dark:text-red-400">
                                        <AlertTriangle className="w-5 h-5" />
                                        Kitchen SOS: Seasoning Fixer
                                    </h3>
                                    <p className="text-sm text-red-600 dark:text-red-300 mb-4">
                                        Did you make a mistake? Too salty, acidic, or bland? Let our AI culinary scientist fix your dish.
                                    </p>

                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <input
                                                type="text"
                                                placeholder="e.g. It turned out way too salty..."
                                                value={sosProblem}
                                                onChange={(e) => setSosProblem(e.target.value)}
                                                className="flex-1 px-4 py-3 rounded-xl border border-red-200 bg-white dark:bg-zinc-900 dark:border-red-900 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                            />
                                            <button
                                                onClick={handleSOSFix}
                                                disabled={sosLoading || !sosProblem.trim()}
                                                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap shadow-sm"
                                            >
                                                {sosLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FlaskConical className="w-4 h-4" />}
                                                Fix It
                                            </button>
                                        </div>

                                        {sosResult && (
                                            <div className="mt-4 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-red-100 dark:border-red-900 shadow-sm animate-fade-in-up">
                                                <div className="flex items-start gap-3">
                                                    <span className="text-2xl mt-1">👩‍🔬</span>
                                                    <div>
                                                        <h4 className="font-bold text-foreground">The Solution</h4>
                                                        <p className="text-muted-foreground mt-1 font-medium">{sosResult.fix}</p>
                                                        <p className="text-sm text-muted-foreground/80 mt-3 p-3 bg-secondary/30 dark:bg-secondary/10 rounded-lg border border-border">
                                                            <strong>Why this works:</strong> {sosResult.explanation}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Nutrition Section */}
                        <div className={`mt-10 pt-10 border-t border-border ${activeTab !== "nutrition" && "hidden md:block"} print:block`}>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-primary rounded-full"></span>
                                Nutritional Information
                                <span className="text-sm font-normal text-muted-foreground ml-2">(per serving)</span>
                            </h2>

                            {/* Beautiful Macro Breakdown Chart */}
                            <div className="mb-8 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-border">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 opacity-80">Macro Breakdown</h3>

                                {(() => {
                                    const totalMacros = (recipe.nutrition.protein || 0) + (recipe.nutrition.carbs || 0) + (recipe.nutrition.fat || 0);
                                    const pPct = totalMacros > 0 ? ((recipe.nutrition.protein || 0) / totalMacros) * 100 : 33;
                                    const cPct = totalMacros > 0 ? ((recipe.nutrition.carbs || 0) / totalMacros) * 100 : 33;
                                    const fPct = totalMacros > 0 ? ((recipe.nutrition.fat || 0) / totalMacros) * 100 : 34;

                                    return (
                                        <div className="space-y-3">
                                            {/* Stacked Bar */}
                                            <div className="h-4 w-full flex rounded-full overflow-hidden shadow-inner bg-secondary">
                                                <div style={{ width: `${pPct}%` }} className="h-full bg-blue-500 transition-all duration-1000 ease-out" title={`Protein: ${recipe.nutrition.protein}g`} />
                                                <div style={{ width: `${cPct}%` }} className="h-full bg-amber-500 transition-all duration-1000 ease-out" title={`Carbs: ${recipe.nutrition.carbs}g`} />
                                                <div style={{ width: `${fPct}%` }} className="h-full bg-purple-500 transition-all duration-1000 ease-out" title={`Fat: ${recipe.nutrition.fat}g`} />
                                            </div>
                                            {/* Legend */}
                                            <div className="flex justify-between items-center text-sm font-medium pt-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm" />
                                                    <span className="text-blue-700 dark:text-blue-400">Protein: {Math.round(pPct)}%</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" />
                                                    <span className="text-amber-700 dark:text-amber-400">Carbs: {Math.round(cPct)}%</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-purple-500 shadow-sm" />
                                                    <span className="text-purple-700 dark:text-purple-400">Fat: {Math.round(fPct)}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                                {[
                                    { label: "Calories", value: recipe.nutrition.calories, unit: "kcal", color: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400" },
                                    { label: "Protein", value: recipe.nutrition.protein, unit: "g", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" },
                                    { label: "Carbs", value: recipe.nutrition.carbs, unit: "g", color: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400" },
                                    { label: "Fat", value: recipe.nutrition.fat, unit: "g", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400" },
                                    { label: "Fiber", value: recipe.nutrition.fiber, unit: "g", color: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400" },
                                    { label: "Sugar", value: recipe.nutrition.sugar, unit: "g", color: "bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400" },
                                    { label: "Sodium", value: recipe.nutrition.sodium, unit: "mg", color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
                                ].map((item, index) => (
                                    <div key={index} className={`p-4 rounded-xl ${item.color} print:border print:border-gray-300 shadow-sm transition-transform hover:-translate-y-1`}>
                                        <p className="text-xs font-bold opacity-80 uppercase tracking-wider">{item.label}</p>
                                        <p className="text-2xl font-black mt-1">
                                            {item.value || 0}<span className="text-sm font-semibold opacity-80 ml-1">{item.unit}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Save/Export Actions - Bottom */}
                        <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 print:hidden">
                            <button
                                onClick={handleSaveToCollection}
                                className={`flex-1 py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${isSaved
                                    ? "bg-green-100 text-green-700 border border-green-200"
                                    : "bg-primary text-white hover:bg-primary/90"
                                    }`}
                            >
                                {isSaved ? (
                                    <>
                                        <Check className="w-5 h-5" />
                                        Saved to My Recipes
                                    </>
                                ) : (
                                    <>
                                        <Bookmark className="w-5 h-5" />
                                        Save to My Recipes
                                    </>
                                )}
                            </button>
                            <button
                                onClick={handleExportPDF}
                                className="flex-1 py-4 bg-secondary text-foreground rounded-xl font-medium hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                            >
                                <FileDown className="w-5 h-5" />
                                Export to PDF
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="flex-1 py-4 bg-secondary text-foreground rounded-xl font-medium hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                            >
                                <Printer className="w-5 h-5" />
                                Print Recipe
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <div className="print:hidden">
                <Footer />
            </div>
        </div>
    );
}
