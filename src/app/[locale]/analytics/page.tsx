"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, PieChart, Pie } from 'recharts';
import { Activity, Flame, Utensils, Award, TrendingUp, Calendar } from "lucide-react";

// Mock Data
const weeklyCalories = [
    { name: 'Mon', calories: 2100, protein: 120 },
    { name: 'Tue', calories: 1950, protein: 95 },
    { name: 'Wed', calories: 2400, protein: 140 },
    { name: 'Thu', calories: 1800, protein: 85 },
    { name: 'Fri', calories: 2600, protein: 160 },
    { name: 'Sat', calories: 2200, protein: 110 },
    { name: 'Sun', calories: 2050, protein: 105 },
];

const cuisineDistribution = [
    { name: 'Indian', value: 40, color: '#f97316' }, // orange-500
    { name: 'Italian', value: 25, color: '#10b981' }, // emerald-500
    { name: 'Japanese', value: 20, color: '#ef4444' }, // red-500
    { name: 'Mexican', value: 15, color: '#eab308' }, // yellow-500
];

const macroAverages = [
    { name: 'Protein', value: 25, fill: '#3b82f6' }, // blue-500
    { name: 'Carbs', value: 45, fill: '#f59e0b' }, // amber-500
    { name: 'Fat', value: 30, fill: '#ef4444' }, // red-500
];

const recentCooks = [
    { id: 1, name: 'Butter Chicken', date: 'Today, 7:30 PM', calories: 650, flavor: 'Indian' },
    { id: 2, name: 'Spaghetti Carbonara', date: 'Yesterday, 8:15 PM', calories: 820, flavor: 'Italian' },
    { id: 3, name: 'Avocado Toast', date: 'Yesterday, 9:00 AM', calories: 350, flavor: 'Healthy' },
    { id: 4, name: 'Chicken Salad', date: 'Mon, 1:00 PM', calories: 420, flavor: 'Healthy' },
];

const TIME_RANGES = ["Today", "This Week", "This Month", "Last 90 Days"];

export default function AnalyticsPage() {
    const navbarTranslations = useNavbarTranslations();
    const [timeRange, setTimeRange] = useState("This Week");

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <NavbarClient translations={navbarTranslations} />

            <main className="flex-1 container mx-auto px-4 py-8 pt-24 font-sans">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 animate-fade-in-up">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-bold mb-4">
                            <Activity className="w-5 h-5" />
                            Nutritional Analytics
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                            Your Cooking <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Journey</span>
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg">Track your macros, explore your habits, and celebrate your cooking wins.</p>
                    </div>

                    <label className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-zinc-900 border border-border rounded-xl shadow-sm hover:border-primary transition-all self-start md:self-auto">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <span className="sr-only">Select analytics time range</span>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="bg-transparent font-semibold outline-none cursor-pointer"
                            aria-label="Analytics time range"
                        >
                            {TIME_RANGES.map((range) => (
                                <option key={range} value={range}>{range}</option>
                            ))}
                        </select>
                    </label>
                </div>

                {/* Top Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: "Meals Cooked", value: "24", subtext: "+4 this week", icon: Utensils, color: "from-blue-500 to-cyan-500" },
                        { title: "Avg. Calories", value: "2,157", subtext: "kCal per day", icon: Flame, color: "from-orange-500 to-red-500" },
                        { title: "Top Cuisine", value: "Indian", subtext: "40% of meals", icon: Award, color: "from-green-500 to-emerald-500" },
                        { title: "Health Score", value: "85", subtext: "Top 15% of users", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
                    ].map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div key={i} className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-md`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-muted-foreground font-medium mb-1">{stat.title}</h3>
                                    <h2 className="text-3xl font-extrabold text-foreground mb-1">{stat.value}</h2>
                                    <p className="text-sm font-semibold text-primary">{stat.subtext}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Main Chart: Calorie & Protein Tracker */}
                    <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-[2rem] border border-border p-8 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-2xl font-bold">Weekly Intake Overview</h3>
                                <p className="text-muted-foreground font-medium">Calories & Protein tracking</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                                    <span className="text-sm font-semibold">Calories (kCal)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    <span className="text-sm font-semibold">Protein (g)</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={weeklyCalories} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)' }} dy={10} />
                                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)' }} />
                                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '1rem', border: '1px solid var(--border)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                        itemStyle={{ fontWeight: 'bold' }}
                                    />
                                    <Area yAxisId="left" type="monotone" dataKey="calories" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorCalories)" />
                                    <Area yAxisId="right" type="monotone" dataKey="protein" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorProtein)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Macro Distribution Pie Chart */}
                    <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-border p-8 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <h3 className="text-2xl font-bold mb-2">Macro Averages</h3>
                        <p className="text-muted-foreground font-medium mb-6">Your typical meal breakdown</p>

                        <div className="h-[200px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={macroAverages}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                        cornerRadius={10}
                                    >
                                        {macroAverages.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => `${value}%`}
                                        contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                <span className="text-3xl font-extrabold text-foreground">100%</span>
                                <span className="text-xs text-muted-foreground font-semibold">MACROS</span>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            {macroAverages.map((macro, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: macro.fill }} />
                                        <span className="font-semibold text-foreground">{macro.name}</span>
                                    </div>
                                    <span className="font-bold">{macro.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Recent Cooks List */}
                    <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-border p-8 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold">Recent Cooks</h3>
                            <Link href="/my-recipes" className="text-sm font-bold text-primary hover:text-primary/80">View History</Link>
                        </div>
                        <div className="space-y-4">
                            {recentCooks.map((cook, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-secondary/50 transition-colors border border-transparent hover:border-border cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <Utensils className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground">{cook.name}</h4>
                                            <p className="text-sm text-muted-foreground">{cook.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-orange-500 flex items-center gap-1 justify-end">
                                            <Flame className="w-4 h-4" /> {cook.calories}
                                        </p>
                                        <p className="text-xs font-semibold text-muted-foreground mt-1 bg-secondary px-2 py-0.5 rounded-md inline-block">
                                            {cook.flavor}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cuisine Distribution Bar Chart */}
                    <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-border p-8 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                        <h3 className="text-2xl font-bold mb-2">Cuisine Palette</h3>
                        <p className="text-muted-foreground font-medium mb-8">Your most frequent flavor profiles</p>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={cuisineDistribution} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border)" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--foreground)', fontWeight: 'bold' }} width={80} />
                                    <Tooltip
                                        cursor={{ fill: 'var(--secondary)' }}
                                        formatter={(value) => [`${value}% of meals`, 'Frequency']}
                                        contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '1rem', border: '1px solid var(--border)' }}
                                    />
                                    <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={30}>
                                        {cuisineDistribution.map((entry, index) => (
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
