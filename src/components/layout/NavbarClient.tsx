"use client";

import { Link } from '@/i18n/routing';
import { ChefHat, Search, User, Camera, Bookmark, LogOut, Sparkles, Globe, Settings, Heart } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

interface NavbarClientProps {
    translations: {
        recipes: string;
        scan: string;
        mealPlanner: string;
        pantry: string;
        shoppingList: string;
        myRecipes: string;
        search: string;
        signIn: string;
    };
}

export function NavbarClient({ translations: t }: NavbarClientProps) {
    const { data: session, status } = useSession();
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                        <ChefHat className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-orange-700 bg-clip-text text-transparent">
                        CookAssistant
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6 text-sm">

                    <Link href="/generate" className="text-purple-600 dark:text-purple-500 hover:text-purple-700 transition-colors font-bold flex items-center gap-1 bg-purple-500/10 px-3 py-1.5 rounded-full">
                        <Sparkles className="w-4 h-4" />
                        AI Generate
                    </Link>
                    <Link href="/how-to-cook" className="text-orange-600 dark:text-orange-500 hover:text-orange-700 transition-colors font-bold flex items-center gap-1 bg-orange-500/10 px-3 py-1.5 rounded-full">
                        <ChefHat className="w-4 h-4" />
                        How to Cook
                    </Link>
                    <Link href="/cuisines" className="text-muted-foreground hover:text-primary transition-colors font-medium flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        Cuisines
                    </Link>
                    <Link href="/recipes" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                        {t.recipes}
                    </Link>
                    <Link href="/scan" className="text-muted-foreground hover:text-primary transition-colors font-medium flex items-center gap-1">
                        <Camera className="w-4 h-4" />
                        {t.scan}
                    </Link>

                    <Link href="/pantry" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                        {t.pantry}
                    </Link>
                    <Link href="/my-recipes" className="text-muted-foreground hover:text-primary transition-colors font-medium flex items-center gap-1">
                        <Bookmark className="w-4 h-4" />
                        {t.myRecipes}
                    </Link>
                    <Link href="/tools" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                        Tools
                    </Link>
                    <Link href="/nutrition-analyzer" className="text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 transition-colors font-bold flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-full">
                        <Heart className="w-4 h-4" />
                        Health
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link href="/recipes" className="p-2 text-muted-foreground hover:text-primary transition-colors" aria-label={t.search}>
                        <Search className="w-5 h-5" />
                    </Link>

                    {status === "loading" ? (
                        <div className="w-10 h-10 rounded-full bg-secondary animate-pulse" />
                    ) : session?.user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 p-1 rounded-full hover:bg-secondary/50 transition-colors"
                            >
                                {session.user.image ? (
                                    <img
                                        src={session.user.image}
                                        alt={session.user.name || "User"}
                                        className="w-9 h-9 rounded-full border-2 border-primary/20"
                                    />
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                                        <User className="w-5 h-5 text-primary" />
                                    </div>
                                )}
                            </button>

                            {showUserMenu && (
                                <div className="absolute right-0 top-12 w-64 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-border py-2 z-50">
                                    <div className="px-4 py-3 border-b border-border">
                                        <p className="font-medium text-foreground">{session.user.name || "User"}</p>
                                        <p className="text-sm text-muted-foreground">{session.user.email}</p>
                                    </div>
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-secondary/50 transition-colors"
                                        onClick={() => setShowUserMenu(false)}
                                    >
                                        <User className="w-4 h-4" />
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-secondary/50 transition-colors"
                                        onClick={() => setShowUserMenu(false)}
                                    >
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </Link>
                                    <button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/signin"
                            className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                        >
                            <User className="w-4 h-4" />
                            <span>{t.signIn}</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

