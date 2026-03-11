"use client";

import { useMemo, useState } from "react";
import { ArrowRightLeft, Calculator } from "lucide-react";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";

type UnitCategory = "weight" | "volume";

type UnitOption = {
    value: string;
    label: string;
    category: UnitCategory;
    toBase: number;
};

type IngredientProfile = {
    value: string;
    label: string;
    gramsPerCup: number;
    note: string;
};

const UNITS: UnitOption[] = [
    { value: "g", label: "Grams (g)", category: "weight", toBase: 1 },
    { value: "kg", label: "Kilograms (kg)", category: "weight", toBase: 1000 },
    { value: "oz", label: "Ounces (oz)", category: "weight", toBase: 28.3495 },
    { value: "lb", label: "Pounds (lb)", category: "weight", toBase: 453.592 },
    { value: "ml", label: "Milliliters (ml)", category: "volume", toBase: 1 },
    { value: "l", label: "Liters (l)", category: "volume", toBase: 1000 },
    { value: "cups", label: "Cups", category: "volume", toBase: 240 },
    { value: "tbsp", label: "Tablespoons", category: "volume", toBase: 15 },
    { value: "tsp", label: "Teaspoons", category: "volume", toBase: 5 },
];

const INGREDIENTS: IngredientProfile[] = [
    { value: "water", label: "Water / Stock", gramsPerCup: 240, note: "Best for water, stock, and thin liquids." },
    { value: "milk", label: "Milk", gramsPerCup: 245, note: "Useful for milk and buttermilk." },
    { value: "flour", label: "All-purpose flour", gramsPerCup: 125, note: "Based on a leveled cup." },
    { value: "sugar", label: "Granulated sugar", gramsPerCup: 200, note: "Standard baking reference." },
    { value: "brownSugar", label: "Brown sugar (packed)", gramsPerCup: 220, note: "Packed cup measurement." },
    { value: "butter", label: "Butter", gramsPerCup: 227, note: "Softened butter by volume." },
    { value: "honey", label: "Honey", gramsPerCup: 340, note: "Dense syrup conversion." },
    { value: "rice", label: "Rice (uncooked)", gramsPerCup: 185, note: "Uncooked white rice." },
    { value: "oats", label: "Rolled oats", gramsPerCup: 90, note: "Loose rolled oats." },
];

const UNIT_MAP = Object.fromEntries(UNITS.map((unit) => [unit.value, unit])) as Record<string, UnitOption>;
const INGREDIENT_MAP = Object.fromEntries(INGREDIENTS.map((ingredient) => [ingredient.value, ingredient])) as Record<string, IngredientProfile>;

function convertAmount(amount: number, fromUnit: string, toUnit: string, ingredient: string): number | null {
    const from = UNIT_MAP[fromUnit];
    const to = UNIT_MAP[toUnit];
    const ingredientProfile = INGREDIENT_MAP[ingredient];

    if (!from || !to || !ingredientProfile || !Number.isFinite(amount)) {
        return null;
    }

    if (from.category === to.category) {
        return (amount * from.toBase) / to.toBase;
    }

    if (from.category === "volume" && to.category === "weight") {
        const cups = (amount * from.toBase) / 240;
        const grams = cups * ingredientProfile.gramsPerCup;
        return grams / to.toBase;
    }

    const cups = (amount * from.toBase) / ingredientProfile.gramsPerCup;
    const milliliters = cups * 240;
    return milliliters / to.toBase;
}

function formatConvertedValue(value: number | null): string {
    if (value === null) return "---";
    if (value >= 100) return value.toFixed(1);
    if (value >= 10) return value.toFixed(2);
    return value.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
}

export default function ConverterPage() {
    const navbarTranslations = useNavbarTranslations();
    const [amount, setAmount] = useState("1");
    const [fromUnit, setFromUnit] = useState("cups");
    const [toUnit, setToUnit] = useState("g");
    const [ingredient, setIngredient] = useState("flour");

    const result = useMemo(() => {
        const parsedAmount = Number.parseFloat(amount);
        if (!Number.isFinite(parsedAmount)) return null;
        return convertAmount(parsedAmount, fromUnit, toUnit, ingredient);
    }, [amount, fromUnit, toUnit, ingredient]);

    const fromMeta = UNIT_MAP[fromUnit];
    const toMeta = UNIT_MAP[toUnit];
    const ingredientMeta = INGREDIENT_MAP[ingredient];
    const isCrossCategory = fromMeta.category !== toMeta.category;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <NavbarClient translations={navbarTranslations} />
            <main className="flex-1 container mx-auto px-4 py-8 pt-24">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calculator className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">Kitchen Converter</h1>
                        <p className="text-muted-foreground">Convert weights and volumes with ingredient-aware accuracy instead of a single rough estimate.</p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-border">
                        <div className="mb-6">
                            <label htmlFor="converter-amount" className="block text-sm font-medium text-foreground mb-2">Amount</label>
                            <input
                                id="converter-amount"
                                type="number"
                                inputMode="decimal"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                                title="Amount to convert"
                                className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 text-2xl font-bold text-center focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="converter-ingredient" className="block text-sm font-medium text-foreground mb-2">Ingredient profile</label>
                            <select
                                id="converter-ingredient"
                                value={ingredient}
                                onChange={(e) => setIngredient(e.target.value)}
                                title="Ingredient profile used for density conversion"
                                className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                            >
                                {INGREDIENTS.map((item) => (
                                    <option key={item.value} value={item.value}>{item.label}</option>
                                ))}
                            </select>
                            <p className="text-sm text-muted-foreground mt-2">{ingredientMeta.note}</p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                            <div className="flex-1 w-full">
                                <label htmlFor="converter-from-unit" className="block text-sm font-medium text-foreground mb-2">From</label>
                                <select
                                    id="converter-from-unit"
                                    value={fromUnit}
                                    onChange={(e) => setFromUnit(e.target.value)}
                                    title="Source unit"
                                    className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                                >
                                    {UNITS.map((unit) => (
                                        <option key={unit.value} value={unit.value}>{unit.label}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    const temp = fromUnit;
                                    setFromUnit(toUnit);
                                    setToUnit(temp);
                                }}
                                aria-label="Swap conversion units"
                                title="Swap conversion units"
                                className="p-3 bg-secondary rounded-full hover:bg-secondary/80 transition-colors mt-6"
                            >
                                <ArrowRightLeft className="w-5 h-5 text-foreground" />
                            </button>

                            <div className="flex-1 w-full">
                                <label htmlFor="converter-to-unit" className="block text-sm font-medium text-foreground mb-2">To</label>
                                <select
                                    id="converter-to-unit"
                                    value={toUnit}
                                    onChange={(e) => setToUnit(e.target.value)}
                                    title="Target unit"
                                    className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                                >
                                    {UNITS.map((unit) => (
                                        <option key={unit.value} value={unit.value}>{unit.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="bg-primary/5 rounded-2xl p-6 text-center border border-primary/10">
                            <div className="text-sm text-muted-foreground uppercase tracking-wide font-medium mb-1">Result</div>
                            <div className="text-4xl font-bold text-primary">
                                {formatConvertedValue(result)}
                                <span className="text-lg text-primary/70 ml-2">{UNIT_MAP[toUnit].label}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3">
                                {isCrossCategory
                                    ? `Calculated using ${ingredientMeta.label.toLowerCase()} density at approximately ${ingredientMeta.gramsPerCup} g per cup.`
                                    : "Direct conversion within the same measurement family."}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
