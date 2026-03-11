"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Link } from "@/i18n/routing";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import {
    Globe, Activity, Utensils, Zap, MapPin,
    ArrowRight, TrendingUp, Users
} from "lucide-react";

// Dynamically import the Globe to prevent SSR "window is not defined" issues
const CookMapGlobe = dynamic(
    () => import("@/components/CookMapGlobe").then(mod => mod.default),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-[600px] flex flex-col items-center justify-center rounded-3xl bg-zinc-900 border-2 border-primary/20">
                <Globe className="w-16 h-16 text-primary animate-pulse mb-4" />
                <p className="text-white font-medium">Booting Global Orbital Satellite...</p>
            </div>
        )
    }
);

// Fake real-time feed
const LIVE_FEED = [
    { text: "Maria in Rome generated 'AI Carbonara Rescue'", time: "Just now", icon: Utensils, color: "text-blue-500" },
    { text: "Ken in Tokyo swapped Tuna for Tofu in 'Spicy Roll'", time: "1 min ago", icon: Zap, color: "text-amber-500" },
    { text: "Sarah in NYC fixed an acidic Tomato Soup", time: "3 mins ago", icon: Activity, color: "text-green-500" },
    { text: "Rahul in Mumbai unlocked 'Spice Voyager' badge", time: "5 mins ago", icon: TrendingUp, color: "text-purple-500" },
];

export default function CookMapPage() {
    const navbarTranslations = useNavbarTranslations();
    const [stats, setStats] = useState({ currentGenerations: 1403, activeUsers: 840 });

    useEffect(() => {
        const interval = window.setInterval(() => {
            setStats((prev) => ({
                currentGenerations: Math.max(1200, prev.currentGenerations + Math.floor(Math.random() * 41) - 20),
                activeUsers: Math.max(700, prev.activeUsers + Math.floor(Math.random() * 25) - 12),
            }));
        }, 4000);

        return () => window.clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <NavbarClient translations={navbarTranslations} />
            <main className="flex-1 container mx-auto px-4 py-8 pt-24">
                <div className="max-w-6xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-200 dark:border-purple-800 mb-6 font-mono text-sm tracking-wider uppercase text-purple-700 dark:text-purple-400 font-bold">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            Live Analytics
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4">
                            Global Cook-Map
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Watch in real-time as millions of users around the world generate AI recipes, fix seasoning mistakes, and complete Chef Quests.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Globe Canvas */}
                        <div className="lg:col-span-2 relative">
                            {/* Stats Overlay on top of Globe */}
                            <div className="absolute top-6 left-6 z-10 flex gap-4 pointer-events-none">
                                <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center gap-3 shadow-2xl">
                                    <div className="bg-primary/20 p-2 rounded-full text-primary">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div className="text-white">
                                        <p className="text-xs uppercase font-bold opacity-70">AI Generations</p>
                                        <p className="font-mono text-xl font-black">{stats.currentGenerations}/hr</p>
                                    </div>
                                </div>
                                <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center gap-3 shadow-2xl">
                                    <div className="bg-blue-500/20 p-2 rounded-full text-blue-400">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div className="text-white">
                                        <p className="text-xs uppercase font-bold opacity-70">Active Chefs</p>
                                        <p className="font-mono text-xl font-black">{stats.activeUsers}</p>
                                    </div>
                                </div>
                            </div>

                            <CookMapGlobe />
                        </div>

                        {/* Live Feed Sidebar */}
                        <div className="lg:col-span-1 space-y-6">

                            {/* Mission Control Panel */}
                            <div className="bg-white dark:bg-zinc-900 border border-border rounded-3xl p-6 shadow-sm">
                                <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                                    <Activity className="w-5 h-5 text-primary" />
                                    Live Orbit Feed
                                </h3>

                                <div className="space-y-4">
                                    {LIVE_FEED.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-secondary/50 hover:bg-secondary/80 transition-all border border-transparent hover:border-border">
                                            <div className={`p-2.5 rounded-full bg-white dark:bg-black shadow-sm flex-shrink-0 ${item.color}`}>
                                                <item.icon className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">{item.text}</p>
                                                <p className="text-xs text-muted-foreground font-mono mt-1 flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {item.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href="/analytics"
                                    className="block w-full mt-6 py-3 border border-border rounded-xl font-medium text-sm hover:bg-secondary transition-colors text-muted-foreground text-center"
                                >
                                    View Past 24 Hours
                                </Link>
                            </div>

                            {/* Trending Spotlight */}
                            <div className="bg-gradient-to-br from-primary to-purple-600 rounded-3xl p-6 text-white shadow-lg overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 flex items-center gap-2 mb-4 relative z-10">
                                    <TrendingUp className="w-4 h-4" />
                                    Global Spotlight
                                </h3>
                                <div className="relative z-10">
                                    <p className="text-3xl font-black leading-tight mb-2">Tokyo is currently trending.</p>
                                    <p className="text-white/80 text-sm mb-6">Over 4,500 matcha-based AI recipes generated in the last hour!</p>
                                    <Link
                                        href="/generate"
                                        className="bg-white text-primary px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 text-sm hover:shadow-lg transition-all w-full justify-center"
                                    >
                                        Join the Trend
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
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
