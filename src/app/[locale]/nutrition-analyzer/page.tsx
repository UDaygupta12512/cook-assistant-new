"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  Search,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Flame,
  Zap,
  Droplets,
  Shield,
  Sun,
  Leaf,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";

// ─── Types ─────────────────────────────────────────────────────────────────

type MacroEntry = {
  grams: number;
  percent: number;
  label: string;
};

type Micronutrient = {
  name: string;
  value: string;
  dailyPercent: number;
  icon: string;
};

type DietItem = {
  diet: string;
  compatible: boolean;
  reason: string;
};

type NutritionData = {
  foodName: string;
  servingSize: string;
  healthScore: number;
  healthLabel: string;
  calories: number;
  macros: {
    protein: MacroEntry;
    carbs: MacroEntry;
    fat: MacroEntry;
  };
  micronutrients: Micronutrient[];
  dietCompatibility: DietItem[];
  healthInsights: string[];
  warnings: string[];
  goodFor: string[];
  avoidIf: string[];
};

// ─── Constants ──────────────────────────────────────────────────────────────

const SERVING_SIZES = [
  "1 serving (100g)",
  "1 serving (150g)",
  "1 cup (240ml)",
  "100g",
  "200g",
  "1 piece",
  "Half portion",
];

const POPULAR_FOODS = [
  "Rasmalai",
  "Chicken Biryani",
  "Avocado Toast",
  "Dal Tadka",
  "Greek Yogurt",
  "Brown Rice",
];

const MICRO_ICON_MAP: Record<string, React.ReactNode> = {
  fiber: <Leaf className="w-4 h-4" />,
  sugar: <Droplets className="w-4 h-4" />,
  sodium: <Zap className="w-4 h-4" />,
  calcium: <Shield className="w-4 h-4" />,
  iron: <Flame className="w-4 h-4" />,
  vitamin: <Sun className="w-4 h-4" />,
};

const MICRO_COLOR_MAP: Record<string, string> = {
  fiber: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
  sugar: "bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400",
  sodium: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400",
  calcium: "bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400",
  iron: "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400",
  vitamin: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400",
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function HealthScoreRing({ score, label, calories }: { score: number; label: string; calories: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.max(1, Math.min(10, score));
  const progress = (clampedScore / 10) * circumference;

  const ringColor =
    clampedScore >= 8
      ? "#22c55e"
      : clampedScore >= 5
      ? "#f59e0b"
      : "#ef4444";

  const bgRingColor =
    clampedScore >= 8
      ? "#dcfce7"
      : clampedScore >= 5
      ? "#fef3c7"
      : "#fee2e2";

  const labelColor =
    clampedScore >= 8
      ? "text-green-600 dark:text-green-400"
      : clampedScore >= 5
      ? "text-amber-600 dark:text-amber-400"
      : "text-red-600 dark:text-red-400";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 120 120"
        >
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={bgRingColor}
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="text-center z-10">
          <span className="text-4xl font-black text-foreground">{clampedScore}</span>
          <span className="text-sm text-muted-foreground font-medium block -mt-1">/10</span>
        </div>
      </div>
      <div className="text-center">
        <span className={`text-lg font-black ${labelColor}`}>{label}</span>
        <p className="text-muted-foreground text-sm mt-1">
          <span className="font-bold text-foreground text-xl">{calories}</span>{" "}
          <span className="font-medium">kcal</span>
        </p>
      </div>
    </div>
  );
}

function MacroBar({
  label,
  grams,
  percent,
  color,
  trackColor,
}: {
  label: string;
  grams: number;
  percent: number;
  color: string;
  trackColor: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground">{grams}g</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trackColor}`}>
            {percent}%
          </span>
        </div>
      </div>
      <div className="h-3 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, percent)}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

function MicroCard({ micro }: { micro: Micronutrient }) {
  const iconKey = micro.icon in MICRO_ICON_MAP ? micro.icon : "vitamin";
  const colorClass = MICRO_COLOR_MAP[iconKey] ?? MICRO_COLOR_MAP.vitamin;
  const clampedPercent = Math.min(100, Math.max(0, micro.dailyPercent));

  return (
    <div className="bg-secondary/40 dark:bg-zinc-800/50 rounded-xl p-4 flex items-center gap-3">
      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
        {MICRO_ICON_MAP[iconKey]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-foreground truncate">{micro.name}</span>
          <span className="text-xs font-semibold text-muted-foreground ml-1 flex-shrink-0">{micro.value}</span>
        </div>
        <div className="h-1.5 rounded-full bg-border overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${colorClass.split(" ")[0].replace("bg-", "bg-").replace("/40", "").replace("/50", "")}`}
            style={{ backgroundColor: undefined }}
            initial={{ width: 0 }}
            animate={{ width: `${clampedPercent}%` }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          />
        </div>
        <span className="text-xs text-muted-foreground mt-0.5 block">{micro.dailyPercent}% daily value</span>
      </div>
    </div>
  );
}

function DietBadge({ item }: { item: DietItem }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold border ${
        item.compatible
          ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400"
          : "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
      }`}
      title={item.reason}
    >
      {item.compatible ? (
        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
      )}
      <span className="truncate">{item.diet}</span>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function NutritionAnalyzerPage() {
  const navbarTranslations = useNavbarTranslations();

  const [query, setQuery] = useState("");
  const [servingSize, setServingSize] = useState(SERVING_SIZES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<NutritionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (foodName?: string) => {
    const name = (foodName ?? query).trim();
    if (!name) return;

    if (foodName) setQuery(foodName);

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/nutrition-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodName: name, servingSize }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (body?.error === "AI_KEY_MISSING") {
          throw new Error("AI service is not configured. Please try again later.");
        }
        throw new Error(body?.error ?? `Request failed with status ${res.status}`);
      }

      const json = await res.json();

      if (!json?.data) {
        throw new Error("Unexpected response from server. Please try again.");
      }

      setResult(json.data as NutritionData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAnalyze();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavbarClient translations={navbarTranslations} />

      <main className="flex-1 flex flex-col">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-emerald-50 dark:from-zinc-900 dark:via-orange-950/20 dark:to-emerald-950/20 pt-24 pb-16 px-4">
          {/* Decorative blobs */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-orange-400/10 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-gradient-to-tr from-emerald-400/15 to-green-300/10 blur-3xl pointer-events-none"
          />

          <div className="container mx-auto max-w-3xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-orange-500/10 border border-primary/20 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">AI-Powered Analysis</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4 tracking-tight">
                AI{" "}
                <span className="bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                  Nutrition
                </span>{" "}
                Analyzer
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
                Discover exact calories, macros &amp; health insights for any food
              </p>

              {/* Search Form */}
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-border shadow-lg">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Enter a food name, e.g. Paneer Butter Masala…"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
                      disabled={isAnalyzing}
                    />
                  </div>

                  <select
                    value={servingSize}
                    onChange={(e) => setServingSize(e.target.value)}
                    disabled={isAnalyzing}
                    title="Select serving size"
                    className="sm:w-44 px-4 py-3 rounded-xl bg-secondary/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-foreground appearance-none cursor-pointer text-sm"
                  >
                    {SERVING_SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <button
                    type="submit"
                    disabled={isAnalyzing || !query.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-orange-600 text-white font-black rounded-full hover:from-primary/90 hover:to-orange-600/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-2 min-w-[130px]"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing…
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Analyze
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Popular Chips */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs text-muted-foreground font-medium">Try:</span>
                {POPULAR_FOODS.map((food) => (
                  <button
                    key={food}
                    type="button"
                    onClick={() => handleAnalyze(food)}
                    disabled={isAnalyzing}
                    className="px-3 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {food}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Content Area ────────────────────────────────────────────── */}
        <section className="container mx-auto max-w-4xl px-4 py-10 flex-1">
          <AnimatePresence mode="wait">
            {/* Loading State */}
            {isAnalyzing && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-20"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-orange-500/10 mb-6">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Analyzing Nutrition…</h3>
                <p className="text-muted-foreground">
                  Our AI is calculating precise macros and health insights
                </p>
              </motion.div>
            )}

            {/* Error State */}
            {!isAnalyzing && error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 flex items-start gap-4"
              >
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-700 dark:text-red-400 mb-1">Analysis Failed</h3>
                  <p className="text-red-600 dark:text-red-500 text-sm">{error}</p>
                </div>
              </motion.div>
            )}

            {/* Results */}
            {!isAnalyzing && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Results Header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h2 className="text-2xl font-black text-foreground">{result.foodName}</h2>
                    <p className="text-muted-foreground text-sm mt-0.5">Serving: {result.servingSize}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setResult(null); setError(null); setQuery(""); }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border px-3 py-1.5 rounded-full"
                  >
                    New Analysis
                  </button>
                </div>

                {/* Row 1: Health Score + Macros */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Health Score Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-zinc-900 rounded-2xl border border-border shadow-sm p-6 flex flex-col items-center justify-center"
                  >
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-5">
                      Health Score
                    </h3>
                    <HealthScoreRing
                      score={result.healthScore}
                      label={result.healthLabel}
                      calories={result.calories}
                    />
                  </motion.div>

                  {/* Macro Distribution Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-white dark:bg-zinc-900 rounded-2xl border border-border shadow-sm p-6"
                  >
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-5">
                      Macro Distribution
                    </h3>
                    <div className="space-y-5">
                      <MacroBar
                        label={result.macros.protein.label}
                        grams={result.macros.protein.grams}
                        percent={result.macros.protein.percent}
                        color="bg-blue-500"
                        trackColor="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                      />
                      <MacroBar
                        label={result.macros.carbs.label}
                        grams={result.macros.carbs.grams}
                        percent={result.macros.carbs.percent}
                        color="bg-amber-500"
                        trackColor="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
                      />
                      <MacroBar
                        label={result.macros.fat.label}
                        grams={result.macros.fat.grams}
                        percent={result.macros.fat.percent}
                        color="bg-rose-500"
                        trackColor="bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">
                      % of total calories contributed by each macro
                    </p>
                  </motion.div>
                </div>

                {/* Row 2: Micronutrients */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-zinc-900 rounded-2xl border border-border shadow-sm p-6"
                >
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-5">
                    Micronutrients
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {result.micronutrients.map((micro) => (
                      <MicroCard key={micro.name} micro={micro} />
                    ))}
                  </div>
                </motion.div>

                {/* Row 3: Diet Compatibility */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-white dark:bg-zinc-900 rounded-2xl border border-border shadow-sm p-6"
                >
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-5">
                    Diet Compatibility
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {result.dietCompatibility.map((item) => (
                      <DietBadge key={item.diet} item={item} />
                    ))}
                  </div>
                </motion.div>

                {/* Row 4: Health Insights + Warnings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Health Insights */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-zinc-900 rounded-2xl border border-border shadow-sm p-6"
                  >
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                      Health Insights
                    </h3>
                    <ul className="space-y-3">
                      {result.healthInsights.map((insight, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground leading-snug">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Warnings */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-white dark:bg-zinc-900 rounded-2xl border border-border shadow-sm p-6"
                  >
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                      Warnings
                    </h3>
                    {result.warnings.length > 0 ? (
                      <ul className="space-y-3">
                        {result.warnings.map((warning, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground leading-snug">{warning}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-sm font-medium">No significant warnings</span>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Row 5: Good For / Avoid If */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-zinc-900 rounded-2xl border border-border shadow-sm p-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Good For */}
                    <div>
                      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
                        <ThumbsUp className="w-4 h-4 text-green-500" />
                        Good For
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.goodFor.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Avoid If */}
                    <div>
                      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
                        <ThumbsDown className="w-4 h-4 text-red-500" />
                        Avoid If
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.avoidIf.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="bg-gradient-to-r from-primary/10 via-orange-500/5 to-emerald-500/10 border border-primary/20 rounded-2xl p-6 text-center"
                >
                  <p className="text-muted-foreground text-sm mb-3">
                    Want a healthier version of <span className="font-semibold text-foreground">{result.foodName}</span>?
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href="/generate"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-orange-600 text-white font-black rounded-full text-sm hover:from-primary/90 hover:to-orange-600/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <Sparkles className="w-4 h-4" />
                      Generate Healthy Recipe
                    </Link>
                    <Link
                      href="/meal-planner"
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      Add to Meal Plan
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Empty State */}
            {!isAnalyzing && !result && !error && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/15 to-orange-400/10 mb-6">
                  <Search className="w-9 h-9 text-primary/70" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Search for any food to get started
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Type a dish name above or pick one of the popular suggestions to see a full nutrition breakdown.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <Footer />
    </div>
  );
}
