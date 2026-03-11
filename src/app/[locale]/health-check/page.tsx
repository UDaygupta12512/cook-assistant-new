"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Flame,
  PieChart,
  RotateCcw,
  Info,
  Heart,
} from "lucide-react";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "bmi" | "tdee" | "macro";
type HeightUnit = "cm" | "ft";
type WeightUnit = "kg" | "lbs";
type Gender = "male" | "female";
type ActivityLevel = "sedentary" | "lightly" | "moderately" | "very" | "extremely";
type MacroGoal = "weightloss" | "maintenance" | "musclegain" | "keto" | "highprotein";

// ─── Constants ────────────────────────────────────────────────────────────────

const ACTIVITY_LEVELS: {
  id: ActivityLevel;
  label: string;
  multiplier: number;
  description: string;
}[] = [
  { id: "sedentary",   label: "Sedentary",         multiplier: 1.2,   description: "Little or no exercise" },
  { id: "lightly",     label: "Lightly Active",    multiplier: 1.375, description: "Light exercise 1–3 days/week" },
  { id: "moderately",  label: "Moderately Active", multiplier: 1.55,  description: "Moderate exercise 3–5 days/week" },
  { id: "very",        label: "Very Active",       multiplier: 1.725, description: "Hard exercise 6–7 days/week" },
  { id: "extremely",   label: "Extremely Active",  multiplier: 1.9,   description: "Very hard exercise or physical job" },
];

const MACRO_GOALS: {
  id: MacroGoal;
  label: string;
  protein: number;
  carbs: number;
  fat: number;
}[] = [
  { id: "weightloss",  label: "Weight Loss",  protein: 30, carbs: 40, fat: 30 },
  { id: "maintenance", label: "Maintenance",  protein: 25, carbs: 45, fat: 30 },
  { id: "musclegain",  label: "Muscle Gain",  protein: 35, carbs: 45, fat: 20 },
  { id: "keto",        label: "Keto",         protein: 25, carbs: 5,  fat: 70 },
  { id: "highprotein", label: "High Protein", protein: 40, carbs: 35, fat: 25 },
];

// ─── BMI helpers ──────────────────────────────────────────────────────────────

interface BMICategory {
  label: string;
  color: string;
  textColor: string;
  badgeBg: string;
  recommendation: string;
}

function getBMICategory(bmi: number): BMICategory {
  if (bmi < 18.5) {
    return {
      label: "Underweight",
      color: "bg-blue-500",
      textColor: "text-blue-600 dark:text-blue-400",
      badgeBg: "bg-blue-500",
      recommendation:
        "Consider increasing caloric intake with nutrient-dense whole foods. Consult a healthcare professional or registered dietitian to build a safe and effective weight-gain plan.",
    };
  }
  if (bmi < 25) {
    return {
      label: "Normal Weight",
      color: "bg-green-500",
      textColor: "text-green-600 dark:text-green-400",
      badgeBg: "bg-green-500",
      recommendation:
        "You are within a healthy weight range. Maintain it through balanced nutrition, regular physical activity, and adequate sleep. Keep up the great habits!",
    };
  }
  if (bmi < 30) {
    return {
      label: "Overweight",
      color: "bg-yellow-500",
      textColor: "text-yellow-600 dark:text-yellow-400",
      badgeBg: "bg-yellow-500",
      recommendation:
        "A modest caloric reduction combined with regular aerobic exercise can help you reach a healthier weight. Focus on whole foods, cut processed sugars, and stay consistently active.",
    };
  }
  return {
    label: "Obese",
    color: "bg-red-500",
    textColor: "text-red-600 dark:text-red-400",
    badgeBg: "bg-red-500",
    recommendation:
      "Consider speaking with your doctor about a personalized weight-management program. Small, consistent changes in diet and exercise compound over time into meaningful results.",
  };
}

/** Maps a BMI value (range 10–45) to a 0–100 percentage for gauge positioning. */
function getBMIGaugePercent(bmi: number): number {
  const MIN = 10;
  const MAX = 45;
  return Math.min(100, Math.max(0, ((bmi - MIN) / (MAX - MIN)) * 100));
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function HealthCheckPage() {
  const navbarTranslations = useNavbarTranslations();
  const [activeTab, setActiveTab] = useState<Tab>("bmi");

  // ── BMI state ────────────────────────────────────────────────────────────────
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [heightCm, setHeightCm]     = useState("");
  const [heightFt, setHeightFt]     = useState("");
  const [heightIn, setHeightIn]     = useState("");
  const [weightKg, setWeightKg]     = useState("");
  const [weightLbs, setWeightLbs]   = useState("");
  const [bmiResult, setBmiResult]   = useState<number | null>(null);

  // ── TDEE state ───────────────────────────────────────────────────────────────
  const [tdeeAge,       setTdeeAge]       = useState("");
  const [tdeeGender,    setTdeeGender]    = useState<Gender>("male");
  const [tdeeHeightCm,  setTdeeHeightCm]  = useState("");
  const [tdeeWeightKg,  setTdeeWeightKg]  = useState("");
  const [tdeeActivity,  setTdeeActivity]  = useState<ActivityLevel>("moderately");
  const [tdeeResult,    setTdeeResult]    = useState<number | null>(null);

  // ── Macro state ──────────────────────────────────────────────────────────────
  const [macroGoal,     setMacroGoal]     = useState<MacroGoal>("maintenance");
  const [macroCals,     setMacroCals]     = useState("");
  const [macroResult,   setMacroResult]   = useState<{
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);
  const [macroAnimated, setMacroAnimated] = useState(false);

  // ── BMI calculation ───────────────────────────────────────────────────────────
  const calculateBMI = () => {
    let heightM: number;
    let weightKgVal: number;

    if (heightUnit === "cm") {
      heightM = parseFloat(heightCm) / 100;
    } else {
      const ft   = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      heightM = (ft * 12 + inch) * 0.0254;
    }

    weightKgVal =
      weightUnit === "kg"
        ? parseFloat(weightKg)
        : parseFloat(weightLbs) * 0.453592;

    if (!heightM || !weightKgVal || heightM <= 0 || weightKgVal <= 0) return;

    const bmi = weightKgVal / (heightM * heightM);
    setBmiResult(Math.round(bmi * 10) / 10);
  };

  const resetBMI = () => {
    setHeightCm("");
    setHeightFt("");
    setHeightIn("");
    setWeightKg("");
    setWeightLbs("");
    setBmiResult(null);
  };

  // ── TDEE calculation ──────────────────────────────────────────────────────────
  const calculateTDEE = () => {
    const age = parseFloat(tdeeAge);
    const h   = parseFloat(tdeeHeightCm);
    const w   = parseFloat(tdeeWeightKg);
    if (!age || !h || !w || age <= 0 || h <= 0 || w <= 0) return;

    // Mifflin-St Jeor BMR
    const bmr =
      tdeeGender === "male"
        ? 10 * w + 6.25 * h - 5 * age + 5
        : 10 * w + 6.25 * h - 5 * age - 161;

    const multiplier = ACTIVITY_LEVELS.find((a) => a.id === tdeeActivity)!.multiplier;
    setTdeeResult(Math.round(bmr * multiplier));
  };

  const resetTDEE = () => {
    setTdeeAge("");
    setTdeeHeightCm("");
    setTdeeWeightKg("");
    setTdeeResult(null);
  };

  // ── Macro calculation ─────────────────────────────────────────────────────────
  const calculateMacros = () => {
    const cals = parseFloat(macroCals);
    if (!cals || cals <= 0) return;

    const goal = MACRO_GOALS.find((g) => g.id === macroGoal)!;
    setMacroResult({
      protein: Math.round((cals * goal.protein) / 100 / 4),
      carbs:   Math.round((cals * goal.carbs)   / 100 / 4),
      fat:     Math.round((cals * goal.fat)      / 100 / 9),
    });
    setMacroAnimated(false);
    // Tiny delay so framer-motion re-fires the animation from 0 %
    setTimeout(() => setMacroAnimated(true), 60);
  };

  const resetMacros = () => {
    setMacroCals("");
    setMacroResult(null);
    setMacroAnimated(false);
  };

  // ── Shared styles ─────────────────────────────────────────────────────────────
  const inputCls =
    "w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground";

  const tabs: { id: Tab; label: string; Icon: React.ElementType }[] = [
    { id: "bmi",   label: "BMI",    Icon: Activity },
    { id: "tdee",  label: "TDEE",   Icon: Flame    },
    { id: "macro", label: "Macros", Icon: PieChart },
  ];

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavbarClient translations={navbarTranslations} />

      <main className="flex-1 pt-24">

        {/* ── Hero ── */}
        <div className="bg-gradient-to-br from-green-500/5 via-background to-background py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-4">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Health Tools</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Health Check Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate your BMI, daily energy needs, and ideal macro split to
              fuel your wellness journey — all client-side, instantly.
            </p>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="container mx-auto px-4 py-10">

          {/* Tab bar */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {tabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === id
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>

          {/* Tab panels */}
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">

              {/* ══════════════════════ TAB 1 · BMI ══════════════════════ */}
              {activeTab === "bmi" && (
                <motion.div
                  key="bmi"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Input card */}
                  <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-border space-y-5">
                    <h2 className="text-xl font-bold">BMI Calculator</h2>

                    {/* Height */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-muted-foreground">
                          Height
                        </label>
                        <div className="flex gap-1 bg-secondary rounded-full p-1">
                          {(["cm", "ft"] as HeightUnit[]).map((u) => (
                            <button
                              key={u}
                              onClick={() => setHeightUnit(u)}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                heightUnit === u
                                  ? "bg-primary text-primary-foreground shadow"
                                  : ""
                              }`}
                            >
                              {u}
                            </button>
                          ))}
                        </div>
                      </div>
                      {heightUnit === "cm" ? (
                        <input
                          type="number"
                          placeholder="e.g. 175"
                          value={heightCm}
                          onChange={(e) => setHeightCm(e.target.value)}
                          className={inputCls}
                        />
                      ) : (
                        <div className="flex gap-3">
                          <input
                            type="number"
                            placeholder="ft"
                            value={heightFt}
                            onChange={(e) => setHeightFt(e.target.value)}
                            className={inputCls}
                          />
                          <input
                            type="number"
                            placeholder="in"
                            value={heightIn}
                            onChange={(e) => setHeightIn(e.target.value)}
                            className={inputCls}
                          />
                        </div>
                      )}
                    </div>

                    {/* Weight */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-muted-foreground">
                          Weight
                        </label>
                        <div className="flex gap-1 bg-secondary rounded-full p-1">
                          {(["kg", "lbs"] as WeightUnit[]).map((u) => (
                            <button
                              key={u}
                              onClick={() => setWeightUnit(u)}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                weightUnit === u
                                  ? "bg-primary text-primary-foreground shadow"
                                  : ""
                              }`}
                            >
                              {u}
                            </button>
                          ))}
                        </div>
                      </div>
                      {weightUnit === "kg" ? (
                        <input
                          type="number"
                          placeholder="e.g. 70"
                          value={weightKg}
                          onChange={(e) => setWeightKg(e.target.value)}
                          className={inputCls}
                        />
                      ) : (
                        <input
                          type="number"
                          placeholder="e.g. 154"
                          value={weightLbs}
                          onChange={(e) => setWeightLbs(e.target.value)}
                          className={inputCls}
                        />
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={calculateBMI}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                      >
                        <Activity className="w-5 h-5" />
                        Calculate BMI
                      </button>
                      <button
                        onClick={resetBMI}
                        title="Reset"
                        className="p-3 bg-secondary hover:bg-secondary/80 rounded-xl transition-colors"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Result card */}
                  {bmiResult !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-border space-y-6"
                    >
                      {/* Big number + badge */}
                      {(() => {
                        const cat = getBMICategory(bmiResult);
                        const pos = getBMIGaugePercent(bmiResult);
                        return (
                          <>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground mb-1">
                                Your BMI
                              </p>
                              <p className={`text-7xl font-black ${cat.textColor}`}>
                                {bmiResult}
                              </p>
                              <span
                                className={`inline-block mt-3 px-4 py-1.5 rounded-full text-white text-sm font-semibold ${cat.badgeBg}`}
                              >
                                {cat.label}
                              </span>
                            </div>

                            {/* Gauge */}
                            <div className="relative">
                              {/* Coloured track */}
                              <div className="flex h-4 rounded-full overflow-hidden">
                                <div className="flex-1 bg-blue-400" />
                                <div className="flex-1 bg-green-400" />
                                <div className="flex-1 bg-yellow-400" />
                                <div className="flex-1 bg-red-400" />
                              </div>

                              {/* Arrow marker */}
                              <div
                                className="absolute -top-0.5 transform -translate-x-1/2"
                                style={{ left: `${pos}%` }}
                              >
                                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[9px] border-l-transparent border-r-transparent border-t-foreground" />
                              </div>

                              {/* Range labels */}
                              <div className="grid grid-cols-4 mt-2 text-xs text-muted-foreground">
                                <span>Underweight</span>
                                <span className="text-center">Normal</span>
                                <span className="text-center">Overweight</span>
                                <span className="text-right">Obese</span>
                              </div>
                              <div className="grid grid-cols-4 text-xs text-muted-foreground/70 mt-0.5">
                                <span>&lt;18.5</span>
                                <span className="text-center">18.5–24.9</span>
                                <span className="text-center">25–29.9</span>
                                <span className="text-right">≥30</span>
                              </div>
                            </div>

                            {/* Recommendation */}
                            <div className="flex gap-3 p-4 bg-secondary/50 rounded-xl">
                              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {cat.recommendation}
                              </p>
                            </div>
                          </>
                        );
                      })()}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* ══════════════════════ TAB 2 · TDEE ═════════════════════ */}
              {activeTab === "tdee" && (
                <motion.div
                  key="tdee"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Input card */}
                  <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-border space-y-5">
                    <h2 className="text-xl font-bold">TDEE Calculator</h2>

                    {/* Age */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 25"
                        value={tdeeAge}
                        onChange={(e) => setTdeeAge(e.target.value)}
                        className={inputCls}
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Gender
                      </label>
                      <div className="flex gap-2">
                        {(["male", "female"] as Gender[]).map((g) => (
                          <button
                            key={g}
                            onClick={() => setTdeeGender(g)}
                            className={`flex-1 py-3 rounded-xl font-medium capitalize transition-all ${
                              tdeeGender === g
                                ? "bg-primary text-primary-foreground shadow"
                                : "bg-secondary hover:bg-secondary/80"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Height + Weight */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Height (cm)
                        </label>
                        <input
                          type="number"
                          placeholder="175"
                          value={tdeeHeightCm}
                          onChange={(e) => setTdeeHeightCm(e.target.value)}
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Weight (kg)
                        </label>
                        <input
                          type="number"
                          placeholder="70"
                          value={tdeeWeightKg}
                          onChange={(e) => setTdeeWeightKg(e.target.value)}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    {/* Activity Level */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Activity Level
                      </label>
                      <div className="space-y-2">
                        {ACTIVITY_LEVELS.map((a) => (
                          <button
                            key={a.id}
                            onClick={() => setTdeeActivity(a.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                              tdeeActivity === a.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/40 bg-background"
                            }`}
                          >
                            <span className="font-medium">{a.label}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              — {a.description}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={calculateTDEE}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                      >
                        <Flame className="w-5 h-5" />
                        Calculate TDEE
                      </button>
                      <button
                        onClick={resetTDEE}
                        title="Reset"
                        className="p-3 bg-secondary hover:bg-secondary/80 rounded-xl transition-colors"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Result */}
                  {tdeeResult !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      {/* Main TDEE number */}
                      <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-border text-center">
                        <p className="text-sm text-muted-foreground mb-1">
                          Your TDEE
                        </p>
                        <p className="text-7xl font-black text-primary">
                          {tdeeResult.toLocaleString()}
                        </p>
                        <p className="text-muted-foreground mt-2">kcal / day</p>
                      </div>

                      {/* Goal cards */}
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          {
                            label: "Weight Loss",
                            kcal: tdeeResult - 500,
                            gradientFrom: "from-blue-500/10",
                            gradientTo: "to-blue-500/5",
                            border: "border-blue-200 dark:border-blue-800",
                            text: "text-blue-600 dark:text-blue-400",
                          },
                          {
                            label: "Maintenance",
                            kcal: tdeeResult,
                            gradientFrom: "from-green-500/10",
                            gradientTo: "to-green-500/5",
                            border: "border-green-200 dark:border-green-800",
                            text: "text-green-600 dark:text-green-400",
                          },
                          {
                            label: "Muscle Gain",
                            kcal: tdeeResult + 300,
                            gradientFrom: "from-orange-500/10",
                            gradientTo: "to-orange-500/5",
                            border: "border-orange-200 dark:border-orange-800",
                            text: "text-orange-600 dark:text-orange-400",
                          },
                        ].map((g, i) => (
                          <motion.div
                            key={g.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                            className={`p-4 bg-gradient-to-br ${g.gradientFrom} ${g.gradientTo} rounded-2xl border ${g.border} text-center`}
                          >
                            <p className="text-xs font-medium text-muted-foreground mb-1">
                              {g.label}
                            </p>
                            <p className={`text-xl font-black ${g.text}`}>
                              {g.kcal.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              kcal/day
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Info note */}
                      <div className="flex gap-3 p-4 bg-secondary/50 rounded-xl">
                        <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Calculated using the <strong>Mifflin-St Jeor</strong>{" "}
                          equation — widely regarded as one of the most accurate
                          BMR formulas. Adjust your intake based on real-world
                          progress over 2–3 weeks.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* ══════════════════════ TAB 3 · MACROS ═══════════════════ */}
              {activeTab === "macro" && (
                <motion.div
                  key="macro"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Input card */}
                  <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-border space-y-5">
                    <h2 className="text-xl font-bold">Macro Calculator</h2>

                    {/* Goal selector */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Your Goal
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {MACRO_GOALS.map((g) => (
                          <button
                            key={g.id}
                            onClick={() => setMacroGoal(g.id)}
                            className={`py-3 px-3 rounded-xl text-sm font-medium transition-all ${
                              macroGoal === g.id
                                ? "bg-primary text-primary-foreground shadow"
                                : "bg-secondary hover:bg-secondary/80"
                            }`}
                          >
                            {g.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Calories */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Total Daily Calories
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 2000"
                        value={macroCals}
                        onChange={(e) => setMacroCals(e.target.value)}
                        className={inputCls}
                      />
                    </div>

                    {/* Macro split preview */}
                    {(() => {
                      const preview = MACRO_GOALS.find((g) => g.id === macroGoal)!;
                      const previewMacros = [
                        { label: "Protein", pct: preview.protein, color: "bg-blue-500",  track: "bg-blue-100 dark:bg-blue-900/30" },
                        { label: "Carbs",   pct: preview.carbs,   color: "bg-amber-500", track: "bg-amber-100 dark:bg-amber-900/30" },
                        { label: "Fat",     pct: preview.fat,     color: "bg-rose-500",  track: "bg-rose-100 dark:bg-rose-900/30" },
                      ];
                      return (
                        <div className="p-4 bg-secondary/40 rounded-xl space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                            {preview.label} split preview
                          </p>
                          {previewMacros.map((m) => (
                            <div key={m.label} className="flex items-center gap-3">
                              <span className="w-14 text-xs text-muted-foreground">
                                {m.label}
                              </span>
                              <div className={`flex-1 h-2 rounded-full ${m.track} overflow-hidden`}>
                                <div
                                  className={`h-full rounded-full ${m.color}`}
                                  style={{ width: `${m.pct}%` }}
                                />
                              </div>
                              <span className="w-8 text-right text-xs font-medium text-muted-foreground">
                                {m.pct}%
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    })()}

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={calculateMacros}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                      >
                        <PieChart className="w-5 h-5" />
                        Calculate Macros
                      </button>
                      <button
                        onClick={resetMacros}
                        title="Reset"
                        className="p-3 bg-secondary hover:bg-secondary/80 rounded-xl transition-colors"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Result card */}
                  {macroResult !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-border space-y-5"
                    >
                      {(() => {
                        const goal    = MACRO_GOALS.find((g) => g.id === macroGoal)!;
                        const cals    = parseFloat(macroCals);
                        const macros  = [
                          {
                            label:     "Protein",
                            pct:       goal.protein,
                            grams:     macroResult.protein,
                            kcal:      macroResult.protein * 4,
                            color:     "bg-blue-500",
                            textColor: "text-blue-600 dark:text-blue-400",
                            track:     "bg-blue-100 dark:bg-blue-900/30",
                            pillBg:    "bg-blue-50 dark:bg-blue-900/20",
                          },
                          {
                            label:     "Carbs",
                            pct:       goal.carbs,
                            grams:     macroResult.carbs,
                            kcal:      macroResult.carbs * 4,
                            color:     "bg-amber-500",
                            textColor: "text-amber-600 dark:text-amber-400",
                            track:     "bg-amber-100 dark:bg-amber-900/30",
                            pillBg:    "bg-amber-50 dark:bg-amber-900/20",
                          },
                          {
                            label:     "Fat",
                            pct:       goal.fat,
                            grams:     macroResult.fat,
                            kcal:      macroResult.fat * 9,
                            color:     "bg-rose-500",
                            textColor: "text-rose-600 dark:text-rose-400",
                            track:     "bg-rose-100 dark:bg-rose-900/30",
                            pillBg:    "bg-rose-50 dark:bg-rose-900/20",
                          },
                        ];

                        return (
                          <>
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-lg">{goal.label} Split</h3>
                              <span className="text-sm text-muted-foreground">
                                {cals.toLocaleString()} kcal/day
                              </span>
                            </div>

                            {/* Animated progress bars */}
                            <div className="space-y-5">
                              {macros.map((m, i) => (
                                <div key={m.label}>
                                  <div className="flex justify-between items-baseline mb-1.5">
                                    <span className={`font-semibold ${m.textColor}`}>
                                      {m.label}
                                    </span>
                                    <div className="flex items-baseline gap-2">
                                      <span className={`font-black text-2xl ${m.textColor}`}>
                                        {m.grams}g
                                      </span>
                                      <span className="text-sm text-muted-foreground">
                                        ({m.pct}% · {m.kcal} kcal)
                                      </span>
                                    </div>
                                  </div>
                                  <div className={`w-full h-3 rounded-full ${m.track} overflow-hidden`}>
                                    <motion.div
                                      className={`h-full rounded-full ${m.color}`}
                                      initial={{ width: "0%" }}
                                      animate={
                                        macroAnimated
                                          ? { width: `${m.pct}%` }
                                          : { width: "0%" }
                                      }
                                      transition={{
                                        duration: 0.9,
                                        ease: "easeOut",
                                        delay: i * 0.12,
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Summary pills */}
                            <div className="flex gap-2 flex-wrap pt-2 border-t border-border">
                              {macros.map((m) => (
                                <div
                                  key={m.label}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${m.pillBg}`}
                                >
                                  <div className={`w-2 h-2 rounded-full ${m.color}`} />
                                  <span className={m.textColor}>
                                    {m.label}: {m.grams}g
                                  </span>
                                </div>
                              ))}
                            </div>

                            {/* Info note */}
                            <div className="flex gap-3 p-4 bg-secondary/50 rounded-xl">
                              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Protein &amp; carbohydrates provide{" "}
                                <strong>4 kcal/g</strong>; fat provides{" "}
                                <strong>9 kcal/g</strong>. These are general
                                guidelines — individual needs vary based on
                                training intensity, metabolic rate, and health
                                goals.
                              </p>
                            </div>
                          </>
                        );
                      })()}
                    </motion.div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
