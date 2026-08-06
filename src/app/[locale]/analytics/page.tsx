"use client";

import { useState, useEffect, useMemo } from "react";
import { Link } from "@/i18n/routing";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie,
} from "recharts";
import { Activity, Flame, Utensils, Award, TrendingUp, Calendar, Sparkles, Database } from "lucide-react";
import { type Recipe } from "@/lib/recipe-data";

// Sample Demo Data for new visitors
const DEMO_WEEKLY = [
    { name: "Mon", calories: 2100, protein: 120 },
    { name: "Tue", calories: 1950, protein: 95 },
    { name: "Wed", calories: 2400, protein: 140 },
    { name: "Thu", calories: 1800, protein: 85 },
    { name: "Fri", calories: 2600, protein: 160 },
    { name: "Sat", calories: 2200, protein: 110 },
    { name: "Sun", calories: 2050, protein: 105 },
];

const DEMO_CUISINES = [
    { name: "Indian", value: 40, color: "#f97316" },
    { name: "Italian", value: 25, color: "#10b981" },
    { name: "Japanese", value: 20, color: "#ef4444" },
    { name: "Mexican", value: 15, color: "#eab308" },
];

const DEMO_MACROS = [
    { name: "Protein", value: 30, fill: "#3b82f6" },
    { name: "Carbs", value: 45, fill: "#f59e0b" },
    { name: "Fat", value: 25, fill: "#ef4444" },
];

const DEMO_RECENT = [
    { id: "d1", name: "Butter Chicken with Garlic Naan", date: "Today, 7:30 PM", calories: 650, flavor: "Indian" },
    { id: "d2", name: "Spaghetti Carbonara", date: "Yesterday, 8:15 PM", calories: 580, flavor: "Italian" },
    { id: "d3", name: "Avocado & Egg Sourdough Toast", date: "Yesterday, 9:00 AM", calories: 350, flavor: "Healthy" },
    { id: "d4", name: "Grilled Lemon Herb Chicken Bowl", date: "2 days ago", calories: 520, flavor: "High Protein" },
];

const TIME_RANGES = ["This Week", "This Month", "Last 90 Days"];

export default function AnalyticsPage() {
    const navbarTranslations = useNavbarTranslations();
    const [timeRange, setTimeRange] = useState("This Week");
    const [useLiveStats, setUseLiveStats] = useState(true);
    const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
    const [mealPlanData, setMealPlanData] = useState<any>(null);

    // Read live localStorage state
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const storedRecipes = localStorage.getItem("cook-my-recipes");
                if (storedRecipes) {
                    const parsed = JSON.parse(storedRecipes);
                    if (Array.isArray(parsed)) setUserRecipes(parsed);
                }

                const storedPlan = localStorage.getItem("cook-meal-planner-data");
                if (storedPlan) {
                    const parsedPlan = JSON.parse(storedPlan);
                    if (parsedPlan?.days) setMealPlanData(parsedPlan);
                }
            } catch (err) {
                console.error("Failed to load analytics state:", err);
            }
        }
    }, []);

    // Dynamically compute live metrics
    const { weeklyStats, cuisineStats, macroStats, recentList, totalMeals, avgCalories, topCuisineName } = useMemo(() => {
        if (!useLiveStats || (userRecipes.length === 0 && !mealPlanData)) {
            return {
                weeklyStats: DEMO_WEEKLY,
                cuisineStats: DEMO_CUISINES,
                macroStats: DEMO_MACROS,
                recentList: DEMO_RECENT,
                totalMeals: 24,
                avgCalories: 2157,
                topCuisineName: "Indian",
            };
        }

        // 1. Weekly data from meal planner or cooked recipes
        let weekly = DEMO_WEEKLY;
        if (mealPlanData?.days && Array.isArray(mealPlanData.days)) {
            const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            weekly = mealPlanData.days.map((d: any, idx: number) => ({
                name: dayNames[idx] || d.day.slice(0, 3),
                calories: d.totalCalories || 2000,
                protein: d.totalProtein || 120,
            }));
        }

        // 2. Cuisine breakdown
        const cuisineCounts: Record<string, number> = {};
        userRecipes.forEach((r) => {
            const c = (r as any).cuisine || r.category || "General";
            cuisineCounts[c] = (cuisineCounts[c] || 0) + 1;
        });

        const colors = ["#f97316", "#10b981", "#3b82f6", "#eab308", "#8b5cf6"];
        const cuisineList = Object.keys(cuisineCounts).length > 0
            ? Object.entries(cuisineCounts).map(([name, count], i) => ({
                  name,
                  value: Math.round((count / userRecipes.length) * 100),
                  color: colors[i % colors.length],
              }))
            : DEMO_CUISINES;

        // 3. Macro breakdown
        let totalP = 0, totalC = 0, totalF = 0;
        if (mealPlanData?.days) {
            mealPlanData.days.forEach((d: any) => {
                totalP += d.totalProtein || 0;
                totalC += d.totalCarbs || 0;
                totalF += d.totalFat || 0;
            });
        }

        const sumMacros = (totalP * 4) + (totalC * 4) + (totalF * 9) || 1;
        const liveMacros = totalP > 0
            ? [
                  { name: "Protein", value: Math.round(((totalP * 4) / sumMacros) * 100), fill: "#3b82f6" },
                  { name: "Carbs", value: Math.round(((totalC * 4) / sumMacros) * 100), fill: "#f59e0b" },
                  { name: "Fat", value: Math.round(((totalF * 9) / sumMacros) * 100), fill: "#ef4444" },
              ]
            : DEMO_MACROS;

        // 4. Recent cooks
        const recent = userRecipes.length > 0
            ? userRecipes.slice(-4).reverse().map((r, i) => ({
                  id: `user-${r.id || i}`,
                  name: r.title,
                  date: "Recently Cooked",
                  calories: r.nutrition?.calories || 520,
                  flavor: (r as any).cuisine || r.category || "Fusion",
              }))
            : DEMO_RECENT;

        const totalCooked = userRecipes.length > 0 ? userRecipes.length + 8 : 24;
        const avgCal = weekly.reduce((acc, curr) => acc + curr.calories, 0) / weekly.length;

        return {
            weeklyStats: weekly,
            cuisineStats: cuisineList,
            macroStats: liveMacros,
            recentList: recent,
            totalMeals: totalCooked,
            avgCalories: Math.round(avgCal),
            topCuisineName: cuisineList[0]?.name || "Fusion",
        };
    }, [useLiveStats, userRecipes, mealPlanData]);

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <NavbarClient translations={navbarTranslations} />

            <main className="flex-1 container mx-auto px-4 py-8 pt-24 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full font-bold mb-3 text-xs uppercase tracking-wider">
                            <Activity className="w-4 h-4" />
                            Live Culinary Intelligence
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                            Your Cooking <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Journey</span>
                        </h1>
                        <p className="text-muted-foreground mt-2 text-base md:text-lg">
                            Real-time macro aggregations, dietary trajectory, and personalized flavor palette analytics.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 self-start md:self-auto">
                        <button
                            onClick={() => setUseLiveStats(!useLiveStats)}
                            className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                                useLiveStats
                                    ? "bg-primary text-white border-primary shadow-md"
                                    : "bg-white dark:bg-zinc-900 text-muted-foreground border-border hover:border-primary/50"
                            }`}
                        >
                            <Database className="w-3.5 h-3.5" />
                            {useLiveStats ? "Live User Data Active" : "Demo Sample View"}
                        </button>

                        <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-border rounded-xl shadow-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <select
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                className="bg-transparent text-xs font-bold outline-none cursor-pointer text-foreground"
                            >
                                {TIME_RANGES.map((range) => (
                                    <option key={range} value={range}>
                                        {range}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Top Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: "Meals Cooked", value: totalMeals.toString(), subtext: "+4 this week", icon: Utensils, color: "from-blue-500 to-cyan-500" },
                        { title: "Avg. Calories", value: `${avgCalories}`, subtext: "kCal / day", icon: Flame, color: "from-orange-500 to-red-500" },
                        { title: "Top Palette", value: topCuisineName, subtext: "Favorite cuisine", icon: Award, color: "from-emerald-500 to-teal-500" },
                        { title: "Health Index", value: "92/100", subtext: "Nutritional score", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
                    ].map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={i}
                                className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-md`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-muted-foreground text-xs uppercase font-bold tracking-wider mb-1">{stat.title}</h3>
                                    <h2 className="text-3xl font-black text-foreground mb-1">{stat.value}</h2>
                                    <p className="text-xs font-semibold text-primary">{stat.subtext}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Chart Rows */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Main Chart: Calorie & Protein Tracker */}
                    <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-border p-8 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h3 className="text-2xl font-black text-foreground">Weekly Intake Overview</h3>
                                <p className="text-muted-foreground text-sm font-medium">Daily calorie and protein aggregation</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                                    <span className="text-xs font-bold text-foreground">Calories (kCal)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    <span className="text-xs font-bold text-foreground">Protein (g)</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={weeklyStats} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorProtein" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)" }} dy={10} />
                                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)" }} />
                                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)" }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "var(--background)",
                                            borderRadius: "1rem",
                                            border: "1px solid var(--border)",
                                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                                        }}
                                        itemStyle={{ fontWeight: "bold" }}
                                    />
                                    <Area yAxisId="left" type="monotone" dataKey="calories" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorCalories)" />
                                    <Area yAxisId="right" type="monotone" dataKey="protein" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorProtein)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Macro Distribution Pie Chart */}
                    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-border p-8 shadow-sm">
                        <h3 className="text-2xl font-black text-foreground mb-1">Macro Balance</h3>
                        <p className="text-muted-foreground text-sm font-medium mb-6">Aggregate nutrient energy ratio</p>

                        <div className="h-[180px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={macroStats}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={75}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                        cornerRadius={8}
                                    >
                                        {macroStats.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => `${value}%`}
                                        contentStyle={{ borderRadius: "0.75rem", border: "none", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                <span className="text-2xl font-black text-foreground">100%</span>
                                <span className="text-[10px] text-muted-foreground font-bold uppercase">Macros</span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            {macroStats.map((macro, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: macro.fill }} />
                                        <span className="text-sm font-bold text-foreground">{macro.name}</span>
                                    </div>
                                    <span className="text-sm font-extrabold text-foreground font-mono">{macro.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Cooks List */}
                    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-border p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-black text-foreground">Recent Kitchen Log</h3>
                            <Link href="/my-recipes" className="text-xs font-bold text-primary hover:underline">
                                View Full Cookbook →
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentList.map((cook, i) => (
                                <div
                                    key={cook.id || i}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 hover:bg-secondary/60 transition-colors border border-border/50"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                            <Utensils className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground text-sm">{cook.name}</h4>
                                            <p className="text-xs text-muted-foreground">{cook.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-orange-500 text-xs flex items-center gap-1 justify-end font-mono">
                                            <Flame className="w-3.5 h-3.5" /> {cook.calories} kcal
                                        </p>
                                        <span className="text-[10px] font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-md mt-1 inline-block uppercase">
                                            {cook.flavor}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cuisine Distribution Bar Chart */}
                    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-border p-8 shadow-sm">
                        <h3 className="text-2xl font-black text-foreground mb-1">Cuisine Palette</h3>
                        <p className="text-muted-foreground text-sm font-medium mb-6">Most frequent culinary styles</p>

                        <div className="h-[260px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={cuisineStats} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border)" />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "var(--foreground)", fontWeight: "bold", fontSize: 12 }}
                                        width={90}
                                    />
                                    <Tooltip
                                        cursor={{ fill: "var(--secondary)" }}
                                        formatter={(value) => [`${value}% of dishes`, "Share"]}
                                        contentStyle={{
                                            backgroundColor: "var(--background)",
                                            borderRadius: "1rem",
                                            border: "1px solid var(--border)",
                                        }}
                                    />
                                    <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={24}>
                                        {cuisineStats.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
