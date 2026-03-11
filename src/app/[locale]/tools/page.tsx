"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Timer, Scale, Calculator, Thermometer, Clock, ChefHat } from "lucide-react";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { CookingTimer } from "@/components/cooking/CookingTimer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";

// Temperature conversions
const celsiusToFahrenheit = (c: number) => (c * 9 / 5) + 32;
const fahrenheitToCelsius = (f: number) => (f - 32) * 5 / 9;

// Common cooking temperatures
const COOKING_TEMPS = [
    { name: "Room Temperature", celsius: 20, use: "Butter, eggs before baking" },
    { name: "Low Oven", celsius: 150, use: "Slow roasting, keeping warm" },
    { name: "Moderate Oven", celsius: 180, use: "Baking cakes, cookies" },
    { name: "Hot Oven", celsius: 200, use: "Roasting vegetables" },
    { name: "Very Hot Oven", celsius: 220, use: "Pizza, bread" },
    { name: "Broil/Grill", celsius: 260, use: "Quick browning" },
];

// Timer presets
const TIMER_PRESETS = [
    { name: "Soft Boiled Egg", minutes: 6 },
    { name: "Hard Boiled Egg", minutes: 12 },
    { name: "Pasta Al Dente", minutes: 8 },
    { name: "Rice (Simmer)", minutes: 18 },
    { name: "Rest Steak", minutes: 5 },
    { name: "Bread Proof", minutes: 60 },
];

export default function ToolsPage() {
    const navbarTranslations = useNavbarTranslations();
    const [activeTab, setActiveTab] = useState<"timer" | "temp" | "measurements">("timer");
    const [tempValue, setTempValue] = useState("");
    const [tempUnit, setTempUnit] = useState<"C" | "F">("C");
    const [selectedPreset, setSelectedPreset] = useState(TIMER_PRESETS[0]);

    const convertedTemp = tempValue
        ? tempUnit === "C"
            ? `${celsiusToFahrenheit(Number(tempValue)).toFixed(1)}°F`
            : `${fahrenheitToCelsius(Number(tempValue)).toFixed(1)}°C`
        : "";

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <NavbarClient translations={navbarTranslations} />

            <main className="flex-1 container mx-auto px-4 py-8 pt-24">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-4">
                            <ChefHat className="w-5 h-5" />
                            <span className="font-medium">Kitchen Tools</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-4">
                            Essential Cooking Tools
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Timers, converters, and quick references to make your cooking easier.
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex justify-center gap-2 mb-8">
                        {[
                            { id: "timer", label: "Timers", icon: Timer },
                            { id: "temp", label: "Temperature", icon: Thermometer },
                            { id: "measurements", label: "Measurements", icon: Scale },
                        ].map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as "timer" | "temp" | "measurements")}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${activeTab === tab.id
                                            ? "bg-primary text-primary-foreground shadow-lg"
                                            : "bg-secondary hover:bg-secondary/80"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Timer Tab */}
                    {activeTab === "timer" && (
                        <div className="space-y-8">
                            {/* Preset Buttons */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {TIMER_PRESETS.map((preset) => (
                                    <button
                                        key={preset.name}
                                        onClick={() => setSelectedPreset(preset)}
                                        className={`p-4 rounded-xl border text-left transition-all ${selectedPreset.name === preset.name
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:border-primary/50 bg-white dark:bg-zinc-900"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-primary" />
                                            <div>
                                                <p className="font-medium">{preset.name}</p>
                                                <p className="text-sm text-muted-foreground">{preset.minutes} min</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Timer Component */}
                            <div className="max-w-sm mx-auto">
                                <CookingTimer
                                    key={selectedPreset.name}
                                    defaultMinutes={selectedPreset.minutes}
                                    label={selectedPreset.name}
                                />
                            </div>
                        </div>
                    )}

                    {/* Temperature Tab */}
                    {activeTab === "temp" && (
                        <div className="space-y-8">
                            {/* Converter */}
                            <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-border">
                                <h3 className="text-lg font-semibold mb-4">Temperature Converter</h3>
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <div className="flex-1 w-full">
                                        <input
                                            type="number"
                                            value={tempValue}
                                            onChange={(e) => setTempValue(e.target.value)}
                                            placeholder="Enter temperature"
                                            className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setTempUnit("C")}
                                            className={`px-4 py-3 rounded-xl font-medium transition-all ${tempUnit === "C"
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-secondary"
                                                }`}
                                        >
                                            °C
                                        </button>
                                        <button
                                            onClick={() => setTempUnit("F")}
                                            className={`px-4 py-3 rounded-xl font-medium transition-all ${tempUnit === "F"
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-secondary"
                                                }`}
                                        >
                                            °F
                                        </button>
                                    </div>
                                    {convertedTemp && (
                                        <div className="text-2xl font-bold text-primary">
                                            = {convertedTemp}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Common Cooking Temps */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Common Cooking Temperatures</h3>
                                <div className="grid gap-3">
                                    {COOKING_TEMPS.map((temp) => (
                                        <div
                                            key={temp.name}
                                            className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-xl border border-border"
                                        >
                                            <div>
                                                <p className="font-medium">{temp.name}</p>
                                                <p className="text-sm text-muted-foreground">{temp.use}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-primary">{temp.celsius}°C</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {celsiusToFahrenheit(temp.celsius).toFixed(0)}°F
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Measurements Tab */}
                    {activeTab === "measurements" && (
                        <div className="space-y-8">
                            <div className="flex justify-end">
                                <Link
                                    href="/tools/converter"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-sm"
                                >
                                    <Calculator className="w-4 h-4" />
                                    Open Advanced Converter
                                </Link>
                            </div>

                            {/* Quick Reference Cards */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Volume */}
                                <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-border">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Scale className="w-5 h-5 text-primary" />
                                        Volume Conversions
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between py-2 border-b border-border">
                                            <span>1 cup</span>
                                            <span className="font-medium">240 ml</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-border">
                                            <span>1 tablespoon</span>
                                            <span className="font-medium">15 ml</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-border">
                                            <span>1 teaspoon</span>
                                            <span className="font-medium">5 ml</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-border">
                                            <span>1 fluid ounce</span>
                                            <span className="font-medium">30 ml</span>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span>1 pint</span>
                                            <span className="font-medium">480 ml</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Weight */}
                                <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-border">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Calculator className="w-5 h-5 text-primary" />
                                        Weight Conversions
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between py-2 border-b border-border">
                                            <span>1 ounce</span>
                                            <span className="font-medium">28.35 g</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-border">
                                            <span>1 pound</span>
                                            <span className="font-medium">453.6 g</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-border">
                                            <span>1 kilogram</span>
                                            <span className="font-medium">2.2 lbs</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-border">
                                            <span>100 grams</span>
                                            <span className="font-medium">3.5 oz</span>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span>1 stick butter</span>
                                            <span className="font-medium">113 g / ½ cup</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Common Ingredients */}
                                <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-border md:col-span-2">
                                    <h3 className="text-lg font-semibold mb-4">Common Ingredient Weights (per 1 cup)</h3>
                                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                        {[
                                            { name: "All-purpose flour", weight: "125g" },
                                            { name: "Granulated sugar", weight: "200g" },
                                            { name: "Brown sugar (packed)", weight: "220g" },
                                            { name: "Butter", weight: "227g" },
                                            { name: "Honey", weight: "340g" },
                                            { name: "Rice (uncooked)", weight: "185g" },
                                            { name: "Oats (rolled)", weight: "90g" },
                                            { name: "Milk", weight: "245g" },
                                            { name: "Heavy cream", weight: "240g" },
                                        ].map((item) => (
                                            <div key={item.name} className="flex justify-between p-3 bg-secondary/50 rounded-lg">
                                                <span>{item.name}</span>
                                                <span className="font-medium text-primary">{item.weight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
