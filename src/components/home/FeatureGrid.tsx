import { Mic, UtensilsCrossed, Leaf, BookOpen, Heart, ChefHat, Activity, Calculator, ArrowLeftRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

const features = [
    {
        icon: <Mic className="w-6 h-6 text-orange-600" />,
        title: "Voice Control",
        description: "Cook hands-free with our advanced voice assistant. Just ask for the next step.",
        color: "bg-orange-100",
        border: "hover:border-orange-200",
        href: "/voice"
    },
    {
        icon: <UtensilsCrossed className="w-6 h-6 text-amber-600" />,
        title: "Smart Pantry",
        description: "Track your ingredients and get recipe suggestions based on what you already have.",
        color: "bg-amber-100",
        border: "hover:border-amber-200",
        href: "/pantry"
    },
    {
        icon: <Leaf className="w-6 h-6 text-green-600" />,
        title: "Eco-Friendly",
        description: "Reduce food waste by using up ingredients before they expire with smart alerts.",
        color: "bg-green-100",
        border: "hover:border-green-200",
        href: "/pantry"
    },
    {
        icon: <ChefHat className="w-6 h-6 text-purple-600" />,
        title: "AI Recipe Generator",
        description: "Generate customized step-by-step recipes for absolutely any dish you want instantly.",
        color: "bg-purple-100",
        border: "hover:border-purple-200",
        href: "/generate"
    },
    {
        icon: <BookOpen className="w-6 h-6 text-rose-600" />,
        title: "Step-by-Step",
        description: "Detailed, easy-to-follow instructions with photos and videos for every recipe.",
        color: "bg-rose-100",
        border: "hover:border-rose-200",
        href: "/recipes"
    },
    {
        icon: <Heart className="w-6 h-6 text-red-600" />,
        title: "Healthy Living",
        description: "Nutritional information and healthy alternatives suggested for every meal.",
        color: "bg-red-100",
        border: "hover:border-red-200",
        href: "/recipes"
    },
    {
        icon: <Activity className="w-6 h-6 text-emerald-600" />,
        title: "Nutrition Analyzer",
        description: "Get a complete nutritional breakdown with health score, macros & diet compatibility for any food.",
        color: "bg-emerald-100",
        border: "hover:border-emerald-200",
        href: "/nutrition-analyzer",
        badge: "New"
    },
    {
        icon: <Calculator className="w-6 h-6 text-teal-600" />,
        title: "Health Check",
        description: "Calculate your BMI, daily calorie needs (TDEE), and personalized macro targets for your goals.",
        color: "bg-teal-100",
        border: "hover:border-teal-200",
        href: "/health-check",
        badge: "New"
    },
    {
        icon: <ArrowLeftRight className="w-6 h-6 text-cyan-600" />,
        title: "Healthy Swaps",
        description: "Discover science-backed healthier ingredient alternatives with nutrition comparisons.",
        color: "bg-cyan-100",
        border: "hover:border-cyan-200",
        href: "/healthy-swaps",
        badge: "New"
    },
];

export function FeatureGrid() {
    return (
        <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-foreground mb-4">Why CookAssistant?</h2>
                    <p className="text-muted-foreground">
                        More than just a recipe book. We provide the tools you need to make cooking easier, fun, and efficient.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Link
                            key={index}
                            href={feature.href}
                            className={`bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-border/50 ${feature.border} group block relative`}
                        >
                            {'badge' in feature && feature.badge && (
                                <span className="absolute top-4 right-4 px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full">
                                    {feature.badge}
                                </span>
                            )}
                            <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
