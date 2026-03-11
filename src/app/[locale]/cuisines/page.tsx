"use client";

import { useState } from "react";
import { Globe, Star, Utensils, Map, Compass, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import { Link } from "@/i18n/routing";
import { ALL_RECIPES } from "@/lib/recipe-data";
import { normalizeText } from "@/lib/culinary-engine";

// World Cuisines Data
const WORLD_CUISINES = [
    {
        id: "indian",
        name: "Indian",
        nameHindi: "भारतीय",
        flag: "🇮🇳",
        description: "Rich, aromatic spices and diverse regional flavors",
        color: "from-orange-500 to-red-600",
        famousRecipes: [
            { name: "Butter Chicken", hindi: "बटर चिकन", emoji: "🍗", rating: 4.9 },
            { name: "Biryani", hindi: "बिरयानी", emoji: "🍚", rating: 4.8 },
            { name: "Palak Paneer", hindi: "पालक पनीर", emoji: "🥬", rating: 4.7 },
            { name: "Samosa", hindi: "समोसा", emoji: "🥟", rating: 4.8 },
            { name: "Masala Dosa", hindi: "मसाला डोसा", emoji: "🫓", rating: 4.7 },
        ],
    },
    {
        id: "italian",
        name: "Italian",
        nameHindi: "इतालवी",
        flag: "🇮🇹",
        description: "Fresh ingredients, pasta, and Mediterranean flavors",
        color: "from-emerald-500 to-teal-700",
        famousRecipes: [
            { name: "Spaghetti Carbonara", hindi: "कार्बोनारा", emoji: "🍝", rating: 4.9 },
            { name: "Margherita Pizza", hindi: "मार्गरीटा पिज़्ज़ा", emoji: "🍕", rating: 4.9 },
            { name: "Lasagna", hindi: "लसानिया", emoji: "🥘", rating: 4.8 },
            { name: "Risotto", hindi: "रिसोट्टो", emoji: "🍚", rating: 4.7 },
            { name: "Tiramisu", hindi: "तिरामिसु", emoji: "🍰", rating: 4.9 },
        ],
    },
    {
        id: "japanese",
        name: "Japanese",
        nameHindi: "जापानी",
        flag: "🇯🇵",
        description: "Delicate flavors, fresh fish, and artistic presentation",
        color: "from-red-500 to-rose-700",
        famousRecipes: [
            { name: "Sushi", hindi: "सुशी", emoji: "🍣", rating: 4.9 },
            { name: "Ramen", hindi: "रामेन", emoji: "🍜", rating: 4.9 },
            { name: "Tempura", hindi: "तेंपुरा", emoji: "🍤", rating: 4.7 },
            { name: "Teriyaki Chicken", hindi: "तेरियाकी चिकन", emoji: "🍗", rating: 4.8 },
            { name: "Miso Soup", hindi: "मिसो सूप", emoji: "🍲", rating: 4.6 },
        ],
    },
    {
        id: "mexican",
        name: "Mexican",
        nameHindi: "मेक्सिकन",
        flag: "🇲🇽",
        description: "Bold spices, fresh salsas, and vibrant flavors",
        color: "from-green-600 to-emerald-800",
        famousRecipes: [
            { name: "Tacos", hindi: "टाकोस", emoji: "🌮", rating: 4.9 },
            { name: "Burrito", hindi: "बुरिटो", emoji: "🌯", rating: 4.8 },
            { name: "Guacamole", hindi: "गुआकामोले", emoji: "🥑", rating: 4.7 },
            { name: "Quesadilla", hindi: "केसाडिया", emoji: "🧀", rating: 4.7 },
            { name: "Enchiladas", hindi: "एनचिलाडा", emoji: "🫔", rating: 4.8 },
        ],
    },
    {
        id: "chinese",
        name: "Chinese",
        nameHindi: "चीनी",
        flag: "🇨🇳",
        description: "Wok-fried perfection with balanced flavors",
        color: "from-red-600 to-orange-600",
        famousRecipes: [
            { name: "Kung Pao Chicken", hindi: "कुंग पाओ चिकन", emoji: "🍗", rating: 4.8 },
            { name: "Fried Rice", hindi: "फ्राइड राइस", emoji: "🍚", rating: 4.7 },
            { name: "Dim Sum", hindi: "डिम सम", emoji: "🥟", rating: 4.9 },
            { name: "Sweet & Sour Pork", hindi: "स्वीट एंड सॉर पोर्क", emoji: "🥡", rating: 4.7 },
            { name: "Peking Duck", hindi: "पेकिंग डक", emoji: "🦆", rating: 4.9 },
        ],
    },
    {
        id: "thai",
        name: "Thai",
        nameHindi: "थाई",
        flag: "🇹🇭",
        description: "Perfect balance of sweet, sour, salty, and spicy",
        color: "from-blue-600 to-indigo-800",
        famousRecipes: [
            { name: "Pad Thai", hindi: "पैड थाई", emoji: "🍜", rating: 4.9 },
            { name: "Green Curry", hindi: "ग्रीन करी", emoji: "🍛", rating: 4.8 },
            { name: "Tom Yum Soup", hindi: "टॉम यम सूप", emoji: "🍲", rating: 4.8 },
            { name: "Mango Sticky Rice", hindi: "मैंगो स्टिकी राइस", emoji: "🥭", rating: 4.7 },
            { name: "Massaman Curry", hindi: "मसमान करी", emoji: "🍛", rating: 4.8 },
        ],
    },

    {
        id: "greek",
        name: "Greek",
        nameHindi: "यूनानी",
        flag: "🇬🇷",
        description: "Fresh Mediterranean ingredients and olive oil",
        color: "from-cyan-500 to-blue-600",
        famousRecipes: [
            { name: "Moussaka", hindi: "मूसका", emoji: "🍆", rating: 4.8 },
            { name: "Greek Salad", hindi: "ग्रीक सलाद", emoji: "🥗", rating: 4.7 },
            { name: "Gyros", hindi: "जायरोस", emoji: "🥙", rating: 4.8 },
            { name: "Souvlaki", hindi: "सूवलाकी", emoji: "🍢", rating: 4.7 },
            { name: "Baklava", hindi: "बाकलावा", emoji: "🍯", rating: 4.9 },
        ],
    },
    {
        id: "french",
        name: "French",
        nameHindi: "फ़्रेंच",
        flag: "🇫🇷",
        description: "Elegant techniques, rich sauces, and buttery pastries",
        color: "from-blue-500 to-red-600",
        famousRecipes: [
            { name: "Boeuf Bourguignon", hindi: "बीफ बर्गिग्नन", emoji: "🍲", rating: 4.9 },
            { name: "Croissant", hindi: "क्रॉसेंट", emoji: "🥐", rating: 4.8 },
            { name: "Ratatouille", hindi: "रैटटौइल", emoji: "🍆", rating: 4.7 },
            { name: "French Onion Soup", hindi: "फ्रेंच अनियन सूप", emoji: "🥣", rating: 4.8 },
            { name: "Macarons", hindi: "मैकरॉन", emoji: "🥨", rating: 4.9 },
        ],
    },
    {
        id: "korean",
        name: "Korean",
        nameHindi: "कोरियाई",
        flag: "🇰🇷",
        description: "Bold, spicy flavors and endless fermented banchan",
        color: "from-red-600 to-blue-800",
        famousRecipes: [
            { name: "Bibimbap", hindi: "बिबिंबाप", emoji: "🥘", rating: 4.9 },
            { name: "Kimchi", hindi: "किम्ची", emoji: "🥬", rating: 4.8 },
            { name: "Korean Fried Chicken", hindi: "कोरियन फ्राइड चिकन", emoji: "🍗", rating: 4.9 },
            { name: "Bulgogi", hindi: "बुल्गोगी", emoji: "🥩", rating: 4.8 },
            { name: "Tteokbokki", hindi: "तोकपोक्की", emoji: "🌶️", rating: 4.7 },
        ],
    },
    {
        id: "mediterranean",
        name: "Mediterranean",
        nameHindi: "भूमध्य",
        flag: "🇬🇷",
        description: "Healthy, vibrant dishes with olive oil and fresh herbs",
        color: "from-cyan-500 to-blue-600",
        famousRecipes: [
            { name: "Greek Salad", hindi: "ग्रीक सलाद", emoji: "🥗", rating: 4.8 },
            { name: "Hummus", hindi: "हम्मस", emoji: "🧆", rating: 4.7 },
            { name: "Falafel", hindi: "फ़लाफ़ल", emoji: "🧆", rating: 4.8 },
            { name: "Shawarma", hindi: "शवारमा", emoji: "🌯", rating: 4.9 },
            { name: "Baba Ganoush", hindi: "बाबा गनौश", emoji: "🍆", rating: 4.6 },
        ],
    },
    {
        id: "spanish",
        name: "Spanish",
        nameHindi: "स्पेनिश",
        flag: "🇪🇸",
        description: "Vibrant tapas, rich seafood, and saffron-infused dishes",
        color: "from-red-500 to-yellow-600",
        famousRecipes: [
            { name: "Paella", hindi: "पाएला", emoji: "�", rating: 4.9 },
            { name: "Tapas", hindi: "तपास", emoji: "🍢", rating: 4.8 },
            { name: "Churros", hindi: "चुरोस", emoji: "🍩", rating: 4.9 },
            { name: "Gazpacho", hindi: "गज़्पाचो", emoji: "🥣", rating: 4.6 },
            { name: "Tortilla Española", hindi: "तोरटीला", emoji: "🍳", rating: 4.7 },
        ],
    },
    {
        id: "vietnamese",
        name: "Vietnamese",
        nameHindi: "वियतनामी",
        flag: "🇻🇳",
        description: "Fresh herbs, delicate broths, and vibrant street food",
        color: "from-green-500 to-emerald-700",
        famousRecipes: [
            { name: "Pho", hindi: "फो", emoji: "🍜", rating: 4.9 },
            { name: "Banh Mi", hindi: "बान मी", emoji: "🥖", rating: 4.8 },
            { name: "Spring Rolls", hindi: "स्प्रिंग रोल्स", emoji: "🌯", rating: 4.7 },
            { name: "Bun Cha", hindi: "बुन चा", emoji: "🥣", rating: 4.6 },
            { name: "Vietnamese Coffee", hindi: "कॉफी", emoji: "☕", rating: 4.9 },
        ],
    },
    {
        id: "turkish",
        name: "Turkish",
        nameHindi: "तुर्की",
        flag: "🇹🇷",
        description: "Succulent kebabs, rich spices, and sweet pastries",
        color: "from-red-600 to-rose-800",
        famousRecipes: [
            { name: "Doner Kebab", hindi: "डोनर कबाब", emoji: "🥙", rating: 4.9 },
            { name: "Menemen", hindi: "मेनमेन", emoji: "�", rating: 4.7 },
            { name: "Pide", hindi: "पीडे", emoji: "🍕", rating: 4.8 },
            { name: "Lahmacun", hindi: "लहमाकुन", emoji: "🫓", rating: 4.6 },
            { name: "Turkish Delight", hindi: "तुर्की डिलाइट", emoji: "🍬", rating: 4.8 },
        ],
    },
    {
        id: "middle-eastern",
        name: "Middle Eastern",
        nameHindi: "मध्य पूर्वी",
        flag: "🌍",
        description: "Hearty stews, aromatic rice, and mezze platters",
        color: "from-amber-600 to-yellow-800",
        famousRecipes: [
            { name: "Mansaf", hindi: "मनसफ", emoji: "🍲", rating: 4.8 },
            { name: "Shish Tawook", hindi: "शीश तावीक", emoji: "🍢", rating: 4.8 },
            { name: "Kibbeh", hindi: "किब्बेह", emoji: "🧆", rating: 4.7 },
            { name: "Fattoush", hindi: "फत्तूश", emoji: "🥗", rating: 4.6 },
            { name: "Manakish", hindi: "मनाकिश", emoji: "🫓", rating: 4.7 },
        ],
    },
    {
        id: "american",
        name: "American",
        nameHindi: "अमेरिकी",
        flag: "🇺🇸",
        description: "Classic comfort classics, BBQ, and fast-casual favorites",
        color: "from-blue-600 to-red-600",
        famousRecipes: [
            { name: "Cheeseburger", hindi: "चीज़बर्गर", emoji: "🍔", rating: 4.9 },
            { name: "Hot Dog", hindi: "हॉट डॉग", emoji: "🌭", rating: 4.7 },
            { name: "BBQ Ribs", hindi: "बीबीक्यू रिब्स", emoji: "🍖", rating: 4.8 },
            { name: "Mac and Cheese", hindi: "मैक एंड चीज़", emoji: "🧀", rating: 4.8 },
            { name: "Apple Pie", hindi: "एप्पल पाई", emoji: "�", rating: 4.9 },
        ],
    }
];

export default function CuisinePage() {
    const navbarTranslations = useNavbarTranslations();
    const [selectedCuisine, setSelectedCuisine] = useState<typeof WORLD_CUISINES[0] | null>(null);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <NavbarClient translations={navbarTranslations} />

            <main className="flex-1">
                {/* Hero section with a more premium feel */}
                <div className="relative pt-32 pb-24 px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

                    <div className="container mx-auto max-w-4xl text-center relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-zinc-900 border border-border shadow-soft text-primary font-bold mb-8"
                        >
                            <Globe className="w-5 h-5 animate-pulse" />
                            Global Culinary Passport
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black mb-8 text-foreground tracking-tight leading-[1.1]"
                        >
                            The World on <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Your Plate</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl text-primary font-bold mb-6 tracking-wide"
                        >
                            दुनिया भर के बेहतरीन स्वाद
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            Travel through continents one bite at a time. Discover authentic regional specialties, master traditional techniques, and bring global flavors to your home kitchen.
                        </motion.p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-16">
                    {/* Cuisines Grid */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            <Map className="w-8 h-8 text-primary" />
                            Select a Region
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {WORLD_CUISINES.map((cuisine) => (
                            <button
                                key={cuisine.id}
                                onClick={() => setSelectedCuisine(selectedCuisine?.id === cuisine.id ? null : cuisine)}
                                className={`relative p-8 rounded-3xl border-2 text-left transition-all overflow-hidden group hover:shadow-2xl hover:-translate-y-1 ${selectedCuisine?.id === cuisine.id
                                    ? "border-primary shadow-xl ring-4 ring-primary/20 bg-primary/5"
                                    : "border-border/50 hover:border-primary/50 bg-white dark:bg-zinc-900 shadow-lg"
                                    }`}
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cuisine.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity transform translate-x-1/3 -translate-y-1/3`} />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-5xl drop-shadow-md">{cuisine.flag}</span>
                                        <ChevronRight className={`w-6 h-6 transition-transform ${selectedCuisine?.id === cuisine.id ? 'text-primary rotate-90' : 'text-muted-foreground group-hover:text-primary group-hover:translate-x-1'}`} />
                                    </div>
                                    <h3 className="font-bold text-2xl text-foreground mb-1">{cuisine.name}</h3>
                                    <p className="text-md text-primary font-medium mb-3">{cuisine.nameHindi}</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{cuisine.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Selected Cuisine Details */}
                    {selectedCuisine && (
                        <div className="animate-fade-in-up bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-border overflow-hidden shadow-2xl mb-16 relative">
                            {/* Decorative header */}
                            <div className={`h-4 w-full bg-gradient-to-r ${selectedCuisine.color}`} />

                            <div className="p-8 md:p-12 relative">
                                {/* Large background flag */}
                                <div className="absolute right-0 top-0 opacity-5 pointer-events-none select-none text-[20rem] leading-none transform translate-x-1/4 -translate-y-1/4">
                                    {selectedCuisine.flag}
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center gap-8 mb-12 p-8 bg-secondary/10 dark:bg-white/5 rounded-[2rem] border border-border/50">
                                    <div className={`w-28 h-28 shrink-0 rounded-3xl bg-gradient-to-br ${selectedCuisine.color} flex items-center justify-center text-5xl shadow-2xl text-white transform rotate-3`}>
                                        {selectedCuisine.flag}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-4xl font-black text-foreground">{selectedCuisine.name} Cuisine</h3>
                                            <Sparkles className="w-6 h-6 text-primary fill-primary animate-pulse" />
                                        </div>
                                        <p className="text-2xl text-primary font-bold">{selectedCuisine.nameHindi} व्यंजन</p>
                                        <p className="text-muted-foreground mt-2 max-w-xl text-lg">{selectedCuisine.description}</p>
                                    </div>

                                    <div className="md:ml-auto grid grid-cols-2 gap-4">
                                        <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-sm border border-border">
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Authenticity</p>
                                            <p className="text-xl font-black text-primary">100% Verified</p>
                                        </div>
                                        <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-sm border border-border">
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Global Rank</p>
                                            <p className="text-xl font-black text-orange-500">Top Tier</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-2xl font-bold flex items-center gap-2">
                                        <Utensils className="w-6 h-6 text-primary" />
                                        Famous Dishes / प्रसिद्ध व्यंजन
                                    </h4>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {selectedCuisine.famousRecipes.map((recipe) => {
                                        // Find if this recipe exists in our database
                                        const dbRecipe = ALL_RECIPES.find(r =>
                                            normalizeText(r.title).includes(normalizeText(recipe.name)) ||
                                            normalizeText(recipe.name).includes(normalizeText(r.title))
                                        );

                                        const href = dbRecipe
                                            ? `/recipes/${dbRecipe.id}`
                                            : `/how-to-cook?dish=${encodeURIComponent(recipe.name)}`;

                                        return (
                                            <Link
                                                key={recipe.name}
                                                href={href}
                                                className="p-6 bg-secondary/20 border border-border/50 rounded-2xl hover:bg-white dark:hover:bg-zinc-800 hover:shadow-xl hover:border-primary/30 transition-all text-left group relative flex flex-col h-full"
                                            >
                                                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm border border-border">
                                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                    {recipe.rating}
                                                </div>

                                                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform origin-left">{recipe.emoji}</span>
                                                <p className="font-bold text-xl text-foreground mb-1">{recipe.name}</p>
                                                <p className="text-md text-primary mb-6 flex-grow">{recipe.hindi}</p>

                                                <div className="mt-auto w-full group-hover:bg-primary group-hover:text-white bg-secondary text-foreground text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                                                    {dbRecipe ? "View Recipe" : "Learn to Cook"}
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </Link>
                                        );
                                    })}
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
