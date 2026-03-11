"use client";

import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { ChefHat, Users, Globe, Award } from "lucide-react";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";

export default function AboutPage() {
    const navbarTranslations = useNavbarTranslations();
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <NavbarClient translations={navbarTranslations} />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-20 bg-secondary/30">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                            Reimagining Home Cooking
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            We're on a mission to make cooking accessible, enjoyable, and sustainable for everyone through the power of AI.
                        </p>
                    </div>
                    {/* Decorative background elements would go here */}
                </section>

                {/* Stats Section */}
                <section className="py-12 border-b border-border">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div className="p-4">
                                <div className="text-4xl font-bold text-primary mb-2">1M+</div>
                                <div className="text-sm text-muted-foreground uppercase tracking-wider">Recipes Cooked</div>
                            </div>
                            <div className="p-4">
                                <div className="text-4xl font-bold text-primary mb-2">50k+</div>
                                <div className="text-sm text-muted-foreground uppercase tracking-wider">Active Users</div>
                            </div>
                            <div className="p-4">
                                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                                <div className="text-sm text-muted-foreground uppercase tracking-wider">Countries</div>
                            </div>
                            <div className="p-4">
                                <div className="text-4xl font-bold text-primary mb-2">4.9</div>
                                <div className="text-sm text-muted-foreground uppercase tracking-wider">App Store Rating</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                                <div className="prose dark:prose-invert text-muted-foreground space-y-4">
                                    <p>
                                        It started with a simple question: "What can I cook with these three ingredients?"
                                    </p>
                                    <p>
                                        Frustrated by food waste and the daily "what's for dinner" dilemma, our founders set out to build a tool that didn't just list recipes, but understood your kitchen.
                                    </p>
                                    <p>
                                        Today, CookAssistant is more than just a recipe app. It's a smart kitchen companion that helps you plan meals, reduce waste, and discover the joy of cooking.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-8 flex items-center justify-center aspect-square">
                                <ChefHat className="w-32 h-32 text-primary opacity-80" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20 bg-white dark:bg-zinc-900">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-foreground mb-16">Our Values</h2>
                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <div className="text-center p-6">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Sustainability First</h3>
                                <p className="text-muted-foreground">We prioritize recipes that use seasonal ingredients and help reduce household food waste.</p>
                            </div>
                            <div className="text-center p-6">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                                <p className="text-muted-foreground">Our recipes are curated by a diverse community of home cooks and professional chefs.</p>
                            </div>
                            <div className="text-center p-6">
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Quality & Trust</h3>
                                <p className="text-muted-foreground">Every recipe is tested to ensure it works in a real home kitchen, not just a studio.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
