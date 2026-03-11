"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import {
    Trophy, Star, Award, Crown, ChefHat, Target,
    Flame, Utensils, Globe, Sparkles, CheckCircle2, Lock, Plus
} from "lucide-react";

const QUESTS_STORAGE_KEY = "cook-quests-data";

interface QuestData {
    id: string;
    progress: number;
    completed: boolean;
}

interface BadgeData {
    name: string;
    unlocked: boolean;
}

interface QuestsState {
    level: number;
    xp: number;
    quests: QuestData[];
    badges: BadgeData[];
}

// Default Quest definitions
const DEFAULT_QUESTS = [
    {
        id: "q1",
        title: "The Dough Master",
        description: "Bake 3 different types of bread from scratch.",
        icon: Utensils,
        total: 3,
        reward: "Dough Master Badge",
        xp: 500,
        color: "from-amber-400 to-orange-500",
        bgLight: "bg-amber-50 dark:bg-amber-900/20",
        border: "border-amber-200 dark:border-amber-800",
        iconColor: "text-amber-600 dark:text-amber-400"
    },
    {
        id: "q2",
        title: "The Spice Voyager",
        description: "Cook a dish from 5 different continents.",
        icon: Globe,
        total: 5,
        reward: "Global Passport Badge",
        xp: 1000,
        color: "from-blue-400 to-indigo-500",
        bgLight: "bg-blue-50 dark:bg-blue-900/20",
        border: "border-blue-200 dark:border-blue-800",
        iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
        id: "q3",
        title: "Zero Waste Hero",
        description: "Use the Pantry Scanner to save 10 expiring ingredients.",
        icon: Target,
        total: 10,
        reward: "Eco-Chef Title",
        xp: 750,
        color: "from-emerald-400 to-green-500",
        bgLight: "bg-emerald-50 dark:bg-emerald-900/20",
        border: "border-emerald-200 dark:border-emerald-800",
        iconColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
        id: "q4",
        title: "Fire & Brimstone",
        description: "Cook 5 recipes with a 'Hard' difficulty rating.",
        icon: Flame,
        total: 5,
        reward: "Hell's Kitchen Badge",
        xp: 1500,
        color: "from-red-400 to-rose-500",
        bgLight: "bg-red-50 dark:bg-red-900/20",
        border: "border-red-200 dark:border-red-800",
        iconColor: "text-red-600 dark:text-red-400"
    }
];

// Default Badges
const DEFAULT_BADGES = [
    { name: "First Dish", icon: Star },
    { name: "Global Passport", icon: Globe },
    { name: "Spice Voyager", icon: Flame },
    { name: "Dough Master", icon: Utensils },
    { name: "Eco-Chef", icon: Target },
    { name: "MasterChef", icon: Crown },
];

const DEFAULT_STATE: QuestsState = {
    level: 1,
    xp: 0,
    quests: DEFAULT_QUESTS.map(q => ({ id: q.id, progress: 0, completed: false })),
    badges: DEFAULT_BADGES.map(b => ({ name: b.name, unlocked: false })),
};

export default function QuestsPage() {
    const navbarTranslations = useNavbarTranslations();
    const [state, setState] = useState<QuestsState>(DEFAULT_STATE);
    const [isLoaded, setIsLoaded] = useState(false);

    const xpNeeded = state.level * 500;

    // Load from localStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const stored = localStorage.getItem(QUESTS_STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setState(parsed);
                }
            } catch {
                // Ignore parse errors
            }
            setIsLoaded(true);
        }
    }, []);

    // Save to localStorage whenever state changes
    useEffect(() => {
        if (isLoaded && typeof window !== "undefined") {
            localStorage.setItem(QUESTS_STORAGE_KEY, JSON.stringify(state));
        }
    }, [state, isLoaded]);

    const incrementQuestProgress = (questId: string) => {
        setState(prev => {
            const quest = DEFAULT_QUESTS.find(q => q.id === questId);
            if (!quest) return prev;

            const questState = prev.quests.find(q => q.id === questId);
            if (!questState || questState.completed) return prev;

            const newProgress = Math.min(questState.progress + 1, quest.total);
            const isNowCompleted = newProgress >= quest.total;

            let newXp = prev.xp;
            let newLevel = prev.level;
            let newBadges = [...prev.badges];

            if (isNowCompleted) {
                newXp += quest.xp;
                // Level up logic
                while (newXp >= newLevel * 500) {
                    newXp -= newLevel * 500;
                    newLevel++;
                }
                // Unlock badge if applicable
                const badgeIndex = newBadges.findIndex(b => b.name === quest.reward.replace(" Badge", ""));
                if (badgeIndex >= 0) {
                    newBadges[badgeIndex] = { ...newBadges[badgeIndex], unlocked: true };
                }
            }

            return {
                ...prev,
                level: newLevel,
                xp: newXp,
                badges: newBadges,
                quests: prev.quests.map(q =>
                    q.id === questId
                        ? { ...q, progress: newProgress, completed: isNowCompleted }
                        : q
                ),
            };
        });
    };

    const getRankName = (level: number) => {
        if (level >= 20) return "Master Chef";
        if (level >= 15) return "Executive Chef";
        if (level >= 10) return "Head Chef";
        if (level >= 5) return "Sous Chef";
        if (level >= 3) return "Line Cook";
        return "Apprentice";
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <NavbarClient translations={navbarTranslations} />
            <main className="flex-1 container mx-auto px-4 py-8 pt-24">
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-200 dark:border-amber-800 mb-6">
                            <Trophy className="w-5 h-5 text-amber-600" />
                            <span className="text-sm font-bold text-amber-700 dark:text-amber-400 tracking-wider uppercase">Culinary Quests</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                            Level Up Your Kitchen Skills
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Transform your daily cooking into an epic adventure. Complete quests, earn XP, and unlock legendary chef badges.
                        </p>
                    </div>

                    {/* Level Progress Bar */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-border mb-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-1 flex-shrink-0">
                                <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center border-4 border-transparent flex-col">
                                    <span className="text-xs font-bold text-muted-foreground uppercase opacity-80">Level</span>
                                    <span className="text-3xl font-black text-foreground">{state.level}</span>
                                </div>
                            </div>

                            <div className="flex-1 w-full">
                                <div className="flex justify-between items-end mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                            {getRankName(state.level)}
                                            <ChefHat className="w-5 h-5 text-primary" />
                                        </h3>
                                        <p className="text-muted-foreground text-sm">Rank {Math.min(Math.ceil(state.level / 2), 10)} of 10</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-black text-primary">{state.xp}</span>
                                        <span className="text-muted-foreground text-sm"> / {xpNeeded} XP</span>
                                    </div>
                                </div>
                                <div className="h-4 w-full bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${(state.xp / xpNeeded) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Quests List */}
                        <div className="lg:col-span-2 space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                                <Target className="w-6 h-6 text-primary" />
                                Active Quests
                            </h2>

                            <div className="grid gap-4">
                                {DEFAULT_QUESTS.map(quest => {
                                    const questState = state.quests.find(q => q.id === quest.id) || { progress: 0, completed: false };
                                    return (
                                    <div key={quest.id} className={`p-6 rounded-2xl border transition-all ${questState.completed ? 'bg-zinc-50 dark:bg-zinc-900 border-border opacity-70' : `${quest.bgLight} ${quest.border} shadow-sm hover:shadow-md`}`}>
                                        <div className="flex flex-col sm:flex-row gap-5 items-start">
                                            <div className={`p-4 rounded-xl ${questState.completed ? 'bg-secondary' : 'bg-white dark:bg-black/20 shadow-sm'} flex-shrink-0`}>
                                                <quest.icon className={`w-8 h-8 ${questState.completed ? 'text-muted-foreground' : quest.iconColor}`} />
                                            </div>

                                            <div className="flex-1 w-full">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className={`text-lg font-bold ${questState.completed && 'line-through text-muted-foreground'}`}>
                                                        {quest.title}
                                                    </h3>
                                                    <span className="text-sm font-bold opacity-70 whitespace-nowrap">+{quest.xp} XP</span>
                                                </div>
                                                <p className="text-muted-foreground text-sm mb-4">{quest.description}</p>

                                                {!questState.completed ? (
                                                    <div>
                                                        <div className="flex justify-between text-xs font-bold mb-1 opacity-70">
                                                            <span>Progress</span>
                                                            <span>{questState.progress} / {quest.total}</span>
                                                        </div>
                                                        <div className="h-2.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full bg-gradient-to-r ${quest.color} rounded-full transition-all`}
                                                                style={{ width: `${(questState.progress / quest.total) * 100}%` }}
                                                            />
                                                        </div>
                                                        <div className="mt-3 flex items-center justify-between">
                                                            <div className="flex items-center gap-2 text-xs font-medium">
                                                                <Award className="w-4 h-4 text-amber-500" />
                                                                Reward: {quest.reward}
                                                            </div>
                                                            <button
                                                                onClick={() => incrementQuestProgress(quest.id)}
                                                                className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors"
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                                Add Progress
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded-lg text-sm font-bold w-full sm:w-auto">
                                                        <CheckCircle2 className="w-5 h-5" />
                                                        Quest Completed!
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Badges Display */}
                        <div className="lg:col-span-1">
                            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                                <Award className="w-6 h-6 text-amber-500" />
                                Trophy Room
                            </h2>
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-border p-6 shadow-sm">
                                <div className="grid grid-cols-2 gap-4">
                                    {DEFAULT_BADGES.map((badge, idx) => {
                                        const badgeState = state.badges.find(b => b.name === badge.name);
                                        const isUnlocked = badgeState?.unlocked || false;
                                        return (
                                        <div key={idx} className={`p-4 rounded-xl flex flex-col items-center justify-center text-center transition-all ${isUnlocked ? 'bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800' : 'bg-secondary border border-border opacity-50 grayscale'}`}>
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isUnlocked ? 'bg-amber-200 dark:bg-amber-800 text-amber-600 dark:text-amber-400' : 'bg-secondary-foreground/10 text-muted-foreground'}`}>
                                                {isUnlocked ? <badge.icon className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                                            </div>
                                            <span className="text-xs font-bold">{badge.name}</span>
                                        </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-6 pt-6 border-t border-border text-center">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {state.badges.filter(b => b.unlocked).length} / {DEFAULT_BADGES.length} badges unlocked
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
