export interface RecipeIngredient {
    name: string;
    amount: string;
    unit: string;
    nameHindi?: string;
    notes?: string;
}

export interface RecipeSubstitution {
    original: string;
    substitute: string;
    notes: string;
}

export interface RecipeNutrition {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
}

export interface Recipe {
    id: number;
    title: string;
    titleHindi?: string;
    description: string;
    descriptionHindi?: string;
    category: string;
    categoryHindi?: string;
    prepTime: string;
    cookTime: string;
    totalTime: string;
    servings: number;
    rating: number;
    image: string;
    color: string;
    difficulty: string;
    tags: string[];
    ingredients: RecipeIngredient[];
    steps: string[];
    stepsHindi?: string[];
    nutrition: RecipeNutrition;
    chefTips: string[];
    chefTipsHindi?: string[];
    substitutions?: RecipeSubstitution[];
}

export const ALL_RECIPES: Recipe[] = [
{
    "id": 3000000,
    "title": "Mutton Rogan Josh",
    "titleHindi": "मटन रोगन जोश",
    "description": "A fragrant, perfectly spiced authentic Indian meat highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Meat",
    "categoryHindi": "Meat",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 5.0,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Hard",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Mutton Rogan Josh by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Mutton Rogan Josh bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Meat"
    ],
    "nutrition": {
        "calories": 373,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000001,
    "title": "Aloo Paratha",
    "titleHindi": "आलू पराठा",
    "description": "A fragrant, perfectly spiced authentic Indian breakfast highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Breakfast",
    "categoryHindi": "Breakfast",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.6,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Aloo Paratha by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Aloo Paratha bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Breakfast"
    ],
    "nutrition": {
        "calories": 296,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000002,
    "title": "Kadhai Paneer",
    "titleHindi": "कढाई पनीर",
    "description": "A fragrant, perfectly spiced authentic Indian dinner highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Dinner",
    "categoryHindi": "Dinner",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.7,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Kadhai Paneer by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Kadhai Paneer bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Dinner"
    ],
    "nutrition": {
        "calories": 288,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000003,
    "title": "Malai Kofta",
    "titleHindi": "मलाई कोफ्ता",
    "description": "A fragrant, perfectly spiced authentic Indian dinner highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Dinner",
    "categoryHindi": "Dinner",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.8,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Hard",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Malai Kofta by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Malai Kofta bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Dinner"
    ],
    "nutrition": {
        "calories": 233,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000004,
    "title": "Pani Puri",
    "titleHindi": "पानी पुरी",
    "description": "A fragrant, perfectly spiced authentic Indian snack highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Snack",
    "categoryHindi": "Snack",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.8,
    "image": "🥟",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Begin your prep by soaking or chopping the main star ingredient for your Pani Puri.",
        "Prepare a binding, spicy batter or a thick marinade using chickpea flour and spices.",
        "Generously coat or mold the ingredients until they hold their shape beautifully.",
        "Heat oil in a deep pan until it reaches the perfect temperature for deep frying.",
        "Lower the portions into the oil and violently fry them until a golden crunch is formed.",
        "Extract the crisped Pani Puri onto paper towels and serve with a tangy mint chutney."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Snack"
    ],
    "nutrition": {
        "calories": 264,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000005,
    "title": "Chicken Chettinad",
    "titleHindi": "चिकन चेट्टीनाड",
    "description": "A fragrant, perfectly spiced authentic Indian dinner highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Dinner",
    "categoryHindi": "Dinner",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.7,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Hard",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Chicken Chettinad by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Chicken Chettinad bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Dinner"
    ],
    "nutrition": {
        "calories": 366,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000006,
    "title": "Fish Curry",
    "titleHindi": "फिश करी",
    "description": "A fragrant, perfectly spiced authentic Indian dinner highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Dinner",
    "categoryHindi": "Dinner",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.9,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Fish Curry by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Fish Curry bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Dinner"
    ],
    "nutrition": {
        "calories": 307,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000007,
    "title": "Dahi Vada",
    "titleHindi": "दही वड़ा",
    "description": "A fragrant, perfectly spiced authentic Indian snack highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Snack",
    "categoryHindi": "Snack",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.6,
    "image": "🥟",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Easy",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Begin your prep by soaking or chopping the main star ingredient for your Dahi Vada.",
        "Prepare a binding, spicy batter or a thick marinade using chickpea flour and spices.",
        "Generously coat or mold the ingredients until they hold their shape beautifully.",
        "Heat oil in a deep pan until it reaches the perfect temperature for deep frying.",
        "Lower the portions into the oil and violently fry them until a golden crunch is formed.",
        "Extract the crisped Dahi Vada onto paper towels and serve with a tangy mint chutney."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Snack"
    ],
    "nutrition": {
        "calories": 340,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000008,
    "title": "Kheer",
    "titleHindi": "खीर",
    "description": "A fragrant, perfectly spiced authentic Indian dessert highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Dessert",
    "categoryHindi": "Dessert",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.8,
    "image": "🍬",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Easy",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Carefully gather all specialized sweet ingredients needed for making authentic Kheer.",
        "Combine the key base ingredients slowly over medium to low heat to prevent burning.",
        "Stir constantly until the mixture begins to change phase and thicken appropriately.",
        "Add the sugar, sweet aromatics, and rich flavorings like cardamom or saffron.",
        "Allow the mixture to rest, ensuring the natural sugars crystallize correctly.",
        "Serve your homemade Kheer beautifully garnished, completely chilled or gently warmed."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Dessert"
    ],
    "nutrition": {
        "calories": 348,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000009,
    "title": "Jeera Rice",
    "titleHindi": "जीरा राइस",
    "description": "A fragrant, perfectly spiced authentic Indian lunch highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Lunch",
    "categoryHindi": "Lunch",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.9,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Easy",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Jeera Rice by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Jeera Rice bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Lunch"
    ],
    "nutrition": {
        "calories": 311,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000010,
    "title": "Bisi Bele Bath",
    "titleHindi": "बिसि बेले भात",
    "description": "A fragrant, perfectly spiced authentic Indian lunch highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Lunch",
    "categoryHindi": "Lunch",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.7,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Hard",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Bisi Bele Bath by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Bisi Bele Bath bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Lunch"
    ],
    "nutrition": {
        "calories": 280,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000011,
    "title": "Upma",
    "titleHindi": "उपमा",
    "description": "A fragrant, perfectly spiced authentic Indian breakfast highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Breakfast",
    "categoryHindi": "Breakfast",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.9,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Easy",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Upma by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Upma bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Breakfast"
    ],
    "nutrition": {
        "calories": 243,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000012,
    "title": "Pongal",
    "titleHindi": "पोंगल",
    "description": "A fragrant, perfectly spiced authentic Indian breakfast highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Breakfast",
    "categoryHindi": "Breakfast",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.7,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Pongal by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Pongal bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Breakfast"
    ],
    "nutrition": {
        "calories": 355,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000013,
    "title": "Chole Masala",
    "titleHindi": "छोले मसाला",
    "description": "A fragrant, perfectly spiced authentic Indian lunch highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Lunch",
    "categoryHindi": "Lunch",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.9,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Chole Masala by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Chole Masala bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Lunch"
    ],
    "nutrition": {
        "calories": 295,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000014,
    "title": "Baingan Bharta",
    "titleHindi": "बैंगन भर्ता",
    "description": "A fragrant, perfectly spiced authentic Indian dinner highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Dinner",
    "categoryHindi": "Dinner",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.6,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Baingan Bharta by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Baingan Bharta bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Dinner"
    ],
    "nutrition": {
        "calories": 384,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000015,
    "title": "Mushroom Matar",
    "titleHindi": "मशरूम मटर",
    "description": "A fragrant, perfectly spiced authentic Indian dinner highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Dinner",
    "categoryHindi": "Dinner",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.5,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Easy",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Mushroom Matar by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Mushroom Matar bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Dinner"
    ],
    "nutrition": {
        "calories": 367,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000016,
    "title": "Sarson Ka Saag",
    "titleHindi": "सरसों का साग",
    "description": "A fragrant, perfectly spiced authentic Indian lunch highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Lunch",
    "categoryHindi": "Lunch",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.5,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Hard",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Sarson Ka Saag by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Sarson Ka Saag bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Lunch"
    ],
    "nutrition": {
        "calories": 203,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000017,
    "title": "Makki Ki Roti",
    "titleHindi": "मक्की की रोटी",
    "description": "A fragrant, perfectly spiced authentic Indian lunch highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Lunch",
    "categoryHindi": "Lunch",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.7,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Hard",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Makki Ki Roti by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Makki Ki Roti bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Lunch"
    ],
    "nutrition": {
        "calories": 317,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000018,
    "title": "Vada Pav",
    "titleHindi": "वड़ा पाव",
    "description": "A fragrant, perfectly spiced authentic Indian snack highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Snack",
    "categoryHindi": "Snack",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.6,
    "image": "🥟",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Begin your prep by soaking or chopping the main star ingredient for your Vada Pav.",
        "Prepare a binding, spicy batter or a thick marinade using chickpea flour and spices.",
        "Generously coat or mold the ingredients until they hold their shape beautifully.",
        "Heat oil in a deep pan until it reaches the perfect temperature for deep frying.",
        "Lower the portions into the oil and violently fry them until a golden crunch is formed.",
        "Extract the crisped Vada Pav onto paper towels and serve with a tangy mint chutney."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Snack"
    ],
    "nutrition": {
        "calories": 261,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000019,
    "title": "Rasmalai",
    "titleHindi": "रसमलाई",
    "description": "A fragrant, perfectly spiced authentic Indian dessert highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Dessert",
    "categoryHindi": "Dessert",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 5.0,
    "image": "🍬",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Hard",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Carefully gather all specialized sweet ingredients needed for making authentic Rasmalai.",
        "Combine the key base ingredients slowly over medium to low heat to prevent burning.",
        "Stir constantly until the mixture begins to change phase and thicken appropriately.",
        "Add the sugar, sweet aromatics, and rich flavorings like cardamom or saffron.",
        "Allow the mixture to rest, ensuring the natural sugars crystallize correctly.",
        "Serve your homemade Rasmalai beautifully garnished, completely chilled or gently warmed."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Dessert"
    ],
    "nutrition": {
        "calories": 217,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000020,
    "title": "Jalebi",
    "titleHindi": "जलेबी",
    "description": "A fragrant, perfectly spiced authentic Indian dessert highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Dessert",
    "categoryHindi": "Dessert",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.6,
    "image": "🍬",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Hard",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Carefully gather all specialized sweet ingredients needed for making authentic Jalebi.",
        "Combine the key base ingredients slowly over medium to low heat to prevent burning.",
        "Stir constantly until the mixture begins to change phase and thicken appropriately.",
        "Add the sugar, sweet aromatics, and rich flavorings like cardamom or saffron.",
        "Allow the mixture to rest, ensuring the natural sugars crystallize correctly.",
        "Serve your homemade Jalebi beautifully garnished, completely chilled or gently warmed."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Dessert"
    ],
    "nutrition": {
        "calories": 244,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000021,
    "title": "Mysore Pak",
    "titleHindi": "मैसूर पाक",
    "description": "A fragrant, perfectly spiced authentic Indian dessert highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Dessert",
    "categoryHindi": "Dessert",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.8,
    "image": "🍬",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Hard",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Carefully gather all specialized sweet ingredients needed for making authentic Mysore Pak.",
        "Combine the key base ingredients slowly over medium to low heat to prevent burning.",
        "Stir constantly until the mixture begins to change phase and thicken appropriately.",
        "Add the sugar, sweet aromatics, and rich flavorings like cardamom or saffron.",
        "Allow the mixture to rest, ensuring the natural sugars crystallize correctly.",
        "Serve your homemade Mysore Pak beautifully garnished, completely chilled or gently warmed."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Dessert"
    ],
    "nutrition": {
        "calories": 216,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000022,
    "title": "Khandvi",
    "titleHindi": "खांडवी",
    "description": "A fragrant, perfectly spiced authentic Indian snack highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Snack",
    "categoryHindi": "Snack",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.7,
    "image": "🥟",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Hard",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Begin your prep by soaking or chopping the main star ingredient for your Khandvi.",
        "Prepare a binding, spicy batter or a thick marinade using chickpea flour and spices.",
        "Generously coat or mold the ingredients until they hold their shape beautifully.",
        "Heat oil in a deep pan until it reaches the perfect temperature for deep frying.",
        "Lower the portions into the oil and violently fry them until a golden crunch is formed.",
        "Extract the crisped Khandvi onto paper towels and serve with a tangy mint chutney."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Snack"
    ],
    "nutrition": {
        "calories": 218,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000023,
    "title": "Thepla",
    "titleHindi": "थेपला",
    "description": "A fragrant, perfectly spiced authentic Indian breakfast highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Breakfast",
    "categoryHindi": "Breakfast",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.6,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Easy",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Thepla by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Thepla bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Breakfast"
    ],
    "nutrition": {
        "calories": 237,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000024,
    "title": "Litti Chokha",
    "titleHindi": "लिट्टी चोखा",
    "description": "A fragrant, perfectly spiced authentic Indian lunch highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Lunch",
    "categoryHindi": "Lunch",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.9,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Hard",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Litti Chokha by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Litti Chokha bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Lunch"
    ],
    "nutrition": {
        "calories": 358,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000025,
    "title": "Chicken 65",
    "titleHindi": "चिकन 65",
    "description": "A fragrant, perfectly spiced authentic Indian starter highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Starter",
    "categoryHindi": "Starter",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.6,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Begin your prep by soaking or chopping the main star ingredient for your Chicken 65.",
        "Prepare a binding, spicy batter or a thick marinade using chickpea flour and spices.",
        "Generously coat or mold the ingredients until they hold their shape beautifully.",
        "Heat oil in a deep pan until it reaches the perfect temperature for deep frying.",
        "Lower the portions into the oil and violently fry them until a golden crunch is formed.",
        "Extract the crisped Chicken 65 onto paper towels and serve with a tangy mint chutney."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Starter"
    ],
    "nutrition": {
        "calories": 224,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000026,
    "title": "Mutton Keema",
    "titleHindi": "मटन कीमा",
    "description": "A fragrant, perfectly spiced authentic Indian dinner highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Dinner",
    "categoryHindi": "Dinner",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.9,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Mutton Keema by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Mutton Keema bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Dinner"
    ],
    "nutrition": {
        "calories": 240,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000027,
    "title": "Prawn Ghee Roast",
    "titleHindi": "प्रॉन घी रोस्ट",
    "description": "A fragrant, perfectly spiced authentic Indian dinner highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Dinner",
    "categoryHindi": "Dinner",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.5,
    "image": "🍛",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Prep the raw ingredients for Prawn Ghee Roast by washing, peeling, and dicing meticulously.",
        "Heat ghee in a wok and temper whole spices like cumin, cloves, and cinnamon sticks.",
        "Sauté your base aromatics (onions, ginger, garlic) until deeply caramelized and brown.",
        "Add the core vegetables or proteins along with authentic powdered Indian spices.",
        "Add a splash of water, cover tightly, and allow the dish to simmer into a thick gravy.",
        "Check for salt, violently sprinkle fresh coriander over the top, and serve Prawn Ghee Roast bubbling hot."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Dinner"
    ],
    "nutrition": {
        "calories": 356,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000028,
    "title": "Aloo Tikki Chaat",
    "titleHindi": "आलू टिक्की चाट",
    "description": "A fragrant, perfectly spiced authentic Indian snack highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Snack",
    "categoryHindi": "Snack",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.8,
    "image": "🥟",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Begin your prep by soaking or chopping the main star ingredient for your Aloo Tikki Chaat.",
        "Prepare a binding, spicy batter or a thick marinade using chickpea flour and spices.",
        "Generously coat or mold the ingredients until they hold their shape beautifully.",
        "Heat oil in a deep pan until it reaches the perfect temperature for deep frying.",
        "Lower the portions into the oil and violently fry them until a golden crunch is formed.",
        "Extract the crisped Aloo Tikki Chaat onto paper towels and serve with a tangy mint chutney."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Snack"
    ],
    "nutrition": {
        "calories": 236,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},
{
    "id": 3000029,
    "title": "Sweet Lassi",
    "titleHindi": "मीठी लस्सी",
    "description": "A fragrant, perfectly spiced authentic Indian beverage highlighting traditional regional flavors.",
    "descriptionHindi": "एक सुगंधित, पूरी तरह से मसालेदार प्रामाणिक भारतीय डिश।",
    "category": "Beverage",
    "categoryHindi": "Beverage",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.8,
    "image": "🥤",
    "color": "bg-orange-50 text-orange-700",
    "difficulty": "Easy",
    "ingredients": [
        {
            "name": "Primary base ingredient",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Garam Masala",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Salt and Spices",
            "amount": "1",
            "unit": "pinch"
        }
    ],
    "steps": [
        "Carefully gather all specialized sweet ingredients needed for making authentic Sweet Lassi.",
        "Combine the key base ingredients slowly over medium to low heat to prevent burning.",
        "Stir constantly until the mixture begins to change phase and thicken appropriately.",
        "Add the sugar, sweet aromatics, and rich flavorings like cardamom or saffron.",
        "Allow the mixture to rest, ensuring the natural sugars crystallize correctly.",
        "Serve your homemade Sweet Lassi beautifully garnished, completely chilled or gently warmed."
    ],
    "stepsHindi": [],
    "chefTips": [
        "Roast the spices on low heat to maximize their fragrance.",
        "Always serve hot and don't skimp on the ghee."
    ],
    "chefTipsHindi": [],
    "tags": [
        "Indian",
        "Authentic",
        "Beverage"
    ],
    "nutrition": {
        "calories": 263,
        "protein": 12,
        "carbs": 35,
        "fat": 15,
        "fiber": 5,
        "sugar": 4,
        "sodium": 400
    },
    "substitutions": []
},

{
    "title": "Paneer Butter Masala",
    "titleHindi": "पनीर बटर मसाला",
    "description": "Rich and creamy curry made with paneer, spices, onions, tomatoes, cashews, and butter.",
    "descriptionHindi": "पनीर, मक्खन, टमाटर और काजू से बनी एक गाढ़ी और मलाईदार करी।",
    "category": "Dinner",
    "prepTime": "15 mins",
    "cookTime": "25 mins",
    "totalTime": "40 mins",
    "servings": 4,
    "rating": 4.9,
    "image": "🍲",
    "color": "bg-orange-100 text-orange-600",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Paneer, cubed",
            "amount": "250",
            "unit": "g"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "3",
            "unit": "large"
        },
        {
            "name": "Cashews",
            "amount": "10",
            "unit": "whole"
        },
        {
            "name": "Butter",
            "amount": "2",
            "unit": "tbsp"
        }
    ],
    "steps": [
        "Heat butter and sauté onions, tomatoes, and cashews.",
        "Blend the mixture to a smooth paste.",
        "Simmer the paste with spices until oil separates.",
        "Add paneer cubes to the gravy.",
        "Cook for 5 more minutes and garnish with fresh cream.",
        "Serve hot with naan or rice."
    ],
    "tags": [
        "Indian",
        "Vegetarian",
        "Curry",
        "Dinner"
    ],
    "nutrition": {
        "calories": 350,
        "protein": 12,
        "carbs": 15,
        "fat": 28,
        "fiber": 3,
        "sugar": 4,
        "sodium": 500
    },
    "id": 2000000,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Chole Bhature",
    "titleHindi": "छोले भटूरे",
    "description": "Spicy chickpea curry served with fried leavened bread.",
    "descriptionHindi": "मसालेदार छोले की करी और तले हुए भटूरे।",
    "category": "Lunch",
    "prepTime": "8 hrs",
    "cookTime": "40 mins",
    "totalTime": "8 hrs 40 mins",
    "servings": 4,
    "rating": 4.8,
    "image": "🫓",
    "color": "bg-amber-100 text-amber-600",
    "difficulty": "Hard",
    "ingredients": [
        {
            "name": "Chickpeas (soaked)",
            "amount": "1",
            "unit": "cup"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "All-purpose flour",
            "amount": "2",
            "unit": "cups"
        },
        {
            "name": "Oil for frying",
            "amount": "1",
            "unit": "cup"
        }
    ],
    "steps": [
        "Boil the soaked chickpeas until tender.",
        "Prepare a spicy onion-tomato gravy and add chickpeas, simmering to thicken.",
        "Knead dough using flour, yogurt, and baking powder, resting it for 2 hours.",
        "Roll out dough into ovals and deep fry until puffy.",
        "Gulp the crispy bhature with the spicy chole.",
        "Serve with onions, lemon, and green chilies."
    ],
    "tags": [
        "Indian",
        "Vegetarian",
        "Spicy",
        "Fried"
    ],
    "nutrition": {
        "calories": 450,
        "protein": 14,
        "carbs": 55,
        "fat": 20,
        "fiber": 10,
        "sugar": 5,
        "sodium": 600
    },
    "id": 2000001,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Palak Paneer",
    "titleHindi": "पालक पनीर",
    "description": "A nutritious Indian curry where soft paneer cubes are cooked in a smooth spinach sauce.",
    "category": "Dinner",
    "prepTime": "15 mins",
    "cookTime": "20 mins",
    "totalTime": "35 mins",
    "servings": 4,
    "rating": 4.7,
    "image": "🥬",
    "color": "bg-green-100 text-green-600",
    "difficulty": "Easy",
    "ingredients": [
        {
            "name": "Spinach",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Paneer, cubed",
            "amount": "200",
            "unit": "g"
        },
        {
            "name": "Garlic",
            "amount": "4",
            "unit": "cloves"
        },
        {
            "name": "Onion",
            "amount": "1",
            "unit": "large"
        }
    ],
    "steps": [
        "Blanch the spinach in boiling water for 2 minutes, then plunge into ice water.",
        "Blend the spinach into a smooth puree.",
        "Sauté garlic, onions, and spices in a pan until golden.",
        "Add the spinach puree and simmer gently.",
        "Gently fold in the paneer cubes.",
        "Cook for 5 minutes and serve hot with roti."
    ],
    "tags": [
        "Indian",
        "Vegetarian",
        "Healthy",
        "Curry"
    ],
    "nutrition": {
        "calories": 220,
        "protein": 14,
        "carbs": 10,
        "fat": 15,
        "fiber": 5,
        "sugar": 2,
        "sodium": 400
    },
    "id": 2000002,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Aloo Gobi",
    "titleHindi": "आलू गोभी",
    "description": "Popular Indian vegetarian dish made with potatoes, cauliflower, and Indian spices.",
    "category": "Dinner",
    "prepTime": "15 mins",
    "cookTime": "25 mins",
    "totalTime": "40 mins",
    "servings": 4,
    "rating": 4.6,
    "image": "🥦",
    "color": "bg-yellow-100 text-yellow-600",
    "difficulty": "Easy",
    "ingredients": [
        {
            "name": "Potatoes, cubed",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Cauliflower florets",
            "amount": "1",
            "unit": "head"
        },
        {
            "name": "Turmeric",
            "amount": "1/2",
            "unit": "tsp"
        },
        {
            "name": "Cumin seeds",
            "amount": "1",
            "unit": "tsp"
        }
    ],
    "steps": [
        "Heat oil and temper the cumin seeds.",
        "Add potatoes and cook until half done.",
        "Add cauliflower and turmeric, tossing to coat.",
        "Cover and simmer on low heat until tender.",
        "Sprinkle garam masala and fresh coriander.",
        "Serve warm with flatbread or rice."
    ],
    "tags": [
        "Indian",
        "Vegetarian",
        "Vegan",
        "Healthy"
    ],
    "nutrition": {
        "calories": 150,
        "protein": 4,
        "carbs": 20,
        "fat": 5,
        "fiber": 6,
        "sugar": 3,
        "sodium": 300
    },
    "id": 2000003,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Dal Makhani",
    "titleHindi": "दाल मखनी",
    "description": "Classic creamy lentil dish originating from the Punjab region.",
    "category": "Dinner",
    "prepTime": "8 hrs",
    "cookTime": "2 hrs",
    "totalTime": "10 hrs",
    "servings": 6,
    "rating": 4.9,
    "image": "🥣",
    "color": "bg-amber-100 text-amber-700",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Whole black lentils (urad dal)",
            "amount": "1",
            "unit": "cup"
        },
        {
            "name": "Kidney beans (rajma)",
            "amount": "1/4",
            "unit": "cup"
        },
        {
            "name": "Butter",
            "amount": "3",
            "unit": "tbsp"
        },
        {
            "name": "Cream",
            "amount": "1/4",
            "unit": "cup"
        }
    ],
    "steps": [
        "Soak the lentils and kidney beans overnight in water.",
        "Pressure cook the soaked lentils until soft.",
        "In a separate pot, sauté onions, ginger-garlic, and tomatoes.",
        "Mix the lentils into the masala and simmer on low heat for an hour.",
        "Stir in butter and cream for a rich texture.",
        "Garnish with a swirl of cream and serve hot."
    ],
    "tags": [
        "Indian",
        "Vegetarian",
        "Protein",
        "Curry"
    ],
    "nutrition": {
        "calories": 310,
        "protein": 14,
        "carbs": 32,
        "fat": 16,
        "fiber": 12,
        "sugar": 4,
        "sodium": 450
    },
    "id": 2000004,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Rogan Josh",
    "titleHindi": "रोगन जोश",
    "description": "A staple of Kashmiri cuisine, this aromatic lamb dish is flavored with fennel seeds and dry ginger.",
    "category": "Dinner",
    "prepTime": "20 mins",
    "cookTime": "1 hr 30 mins",
    "totalTime": "1 hr 50 mins",
    "servings": 4,
    "rating": 4.8,
    "image": "🍖",
    "color": "bg-red-100 text-red-700",
    "difficulty": "Hard",
    "ingredients": [
        {
            "name": "Lamb chunks",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Yogurt",
            "amount": "1",
            "unit": "cup"
        },
        {
            "name": "Kashmiri red chili powder",
            "amount": "2",
            "unit": "tbsp"
        },
        {
            "name": "Fennel powder",
            "amount": "1",
            "unit": "tsp"
        }
    ],
    "steps": [
        "Whisk the yogurt with Kashmiri chili powder, fennel, and ginger powder.",
        "Sear the lamb chunks in hot mustard oil or ghee.",
        "Pour the yogurt spice mix over the lamb.",
        "Lower heat, cover, and braise the meat until tender and oil separates.",
        "Season perfectly with salt and garam masala.",
        "Serve this rich, red-hued curry with steamed rice."
    ],
    "tags": [
        "Indian",
        "Meat",
        "Spicy",
        "Curry"
    ],
    "nutrition": {
        "calories": 420,
        "protein": 32,
        "carbs": 8,
        "fat": 28,
        "fiber": 1,
        "sugar": 3,
        "sodium": 500
    },
    "id": 2000005,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Chicken Biryani",
    "titleHindi": "चिकन बिरयानी",
    "description": "A world-renowned Indian dish, biryani takes time and practice to produce a fragrant, perfectly cooked rice layered over spiced meat.",
    "category": "Dinner",
    "prepTime": "30 mins",
    "cookTime": "45 mins",
    "totalTime": "1 hr 15 mins",
    "servings": 6,
    "rating": 5,
    "image": "🍚",
    "color": "bg-orange-100 text-orange-600",
    "difficulty": "Hard",
    "ingredients": [
        {
            "name": "Basmati Rice",
            "amount": "2",
            "unit": "cups"
        },
        {
            "name": "Chicken, bone-in",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Yogurt",
            "amount": "1",
            "unit": "cup"
        },
        {
            "name": "Saffron",
            "amount": "1",
            "unit": "pinch"
        },
        {
            "name": "Fried onions",
            "amount": "1",
            "unit": "cup"
        }
    ],
    "steps": [
        "Marinate the chicken in yogurt, spices, and ginger-garlic paste for at least 30 minutes.",
        "Parboil the basmati rice with whole spices until 70% cooked.",
        "In a heavy-bottomed pot, layer the marinated chicken at the bottom.",
        "Top evenly with the parboiled rice, fried onions, and saffron milk.",
        "Seal the pot tightly to trap steam (dum method) and cook on low heat for 30 minutes.",
        "Fluff gently with a fork and serve hot with raita."
    ],
    "tags": [
        "Indian",
        "Rice",
        "Chicken",
        "Spicy",
        "Dinner"
    ],
    "nutrition": {
        "calories": 450,
        "protein": 26,
        "carbs": 48,
        "fat": 16,
        "fiber": 2,
        "sugar": 4,
        "sodium": 600
    },
    "id": 2000006,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Medu Vada",
    "titleHindi": "मेदु वड़ा",
    "description": "Crispy, donut-shaped South Indian fritters made from urad dal.",
    "category": "Breakfast",
    "prepTime": "4 hrs",
    "cookTime": "20 mins",
    "totalTime": "4 hrs 20 mins",
    "servings": 4,
    "rating": 4.7,
    "image": "🍩",
    "color": "bg-amber-100 text-amber-500",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Urad dal (split black gram)",
            "amount": "1",
            "unit": "cup"
        },
        {
            "name": "Green chilies",
            "amount": "2",
            "unit": "chopped"
        },
        {
            "name": "Curry leaves",
            "amount": "1",
            "unit": "sprig"
        },
        {
            "name": "Oil",
            "amount": "2",
            "unit": "cups"
        }
    ],
    "steps": [
        "Soak the urad dal in water for 4 hours, then drain.",
        "Blend the dal into a fluffy, smooth batter using very little water.",
        "Mix chopped chilies, ginger, salt, and curry leaves into the batter.",
        "Wet your hands, take a ball of batter, and make a hole in the center.",
        "Carefully slide it into hot oil.",
        "Deep fry until golden brown and crispy, then serve with coconut chutney."
    ],
    "tags": [
        "Indian",
        "Breakfast",
        "Vegan",
        "Fried"
    ],
    "nutrition": {
        "calories": 250,
        "protein": 8,
        "carbs": 25,
        "fat": 12,
        "fiber": 6,
        "sugar": 1,
        "sodium": 250
    },
    "id": 2000007,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Masala Dosa",
    "titleHindi": "मसाला डोसा",
    "description": "Thin, crispy South Indian crepe served with a spicy potato filling.",
    "category": "Breakfast",
    "prepTime": "12 hrs",
    "cookTime": "20 mins",
    "totalTime": "12 hrs 20 mins",
    "servings": 4,
    "rating": 4.9,
    "image": "🫓",
    "color": "bg-yellow-100 text-yellow-600",
    "difficulty": "Hard",
    "ingredients": [
        {
            "name": "Dosa batter",
            "amount": "2",
            "unit": "cups"
        },
        {
            "name": "Potatoes, boiled",
            "amount": "3",
            "unit": "medium"
        },
        {
            "name": "Onions",
            "amount": "1",
            "unit": "sliced"
        },
        {
            "name": "Mustard seeds",
            "amount": "1",
            "unit": "tsp"
        }
    ],
    "steps": [
        "Temper mustard seeds and curry leaves in oil.",
        "Sauté sliced onions and add the boiled, mashed potatoes.",
        "Season with turmeric and salt, keeping the potato mixture moist.",
        "Pour a ladle of fermented dosa batter onto a hot, greased griddle.",
        "Spread in a thin circular motion and wait until the edges turn golden.",
        "Place the potato filling in the center, fold, and serve hot with sambar."
    ],
    "tags": [
        "Indian",
        "Breakfast",
        "Vegan",
        "Crispy"
    ],
    "nutrition": {
        "calories": 300,
        "protein": 6,
        "carbs": 45,
        "fat": 10,
        "fiber": 5,
        "sugar": 3,
        "sodium": 400
    },
    "id": 2000008,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Pav Bhaji",
    "titleHindi": "पाव भाजी",
    "description": "A fast food dish from Maharashtra, consisting of a thick vegetable curry served with a soft bread roll.",
    "category": "Dinner",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalTime": "45 mins",
    "servings": 4,
    "rating": 4.8,
    "image": "🍞",
    "color": "bg-red-100 text-red-600",
    "difficulty": "Easy",
    "ingredients": [
        {
            "name": "Mixed vegetables (potatoes, peas, carrots)",
            "amount": "3",
            "unit": "cups"
        },
        {
            "name": "Pav (bread rolls)",
            "amount": "8",
            "unit": "rolls"
        },
        {
            "name": "Butter",
            "amount": "4",
            "unit": "tbsp"
        },
        {
            "name": "Pav bhaji masala",
            "amount": "2",
            "unit": "tbsp"
        }
    ],
    "steps": [
        "Boil and mash all the mixed vegetables thoroughly.",
        "In a large pan, sauté onions, tomatoes, and capsicum in butter.",
        "Add the pav bhaji masala, red chili powder, and the mashed vegetables.",
        "Simmer with a little water until it forms a thick, rich glossy gravy.",
        "Slit the pav buns and toast them on a griddle with generous amounts of butter.",
        "Serve the steaming hot bhaji topped with more butter and a side of onions."
    ],
    "tags": [
        "Indian",
        "Street Food",
        "Vegetarian",
        "Spicy"
    ],
    "nutrition": {
        "calories": 380,
        "protein": 9,
        "carbs": 48,
        "fat": 18,
        "fiber": 8,
        "sugar": 6,
        "sodium": 550
    },
    "id": 2000009,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Rajma Chawal",
    "titleHindi": "राजमा चावल",
    "description": "Hearty red kidney bean curry served over steamed basmati rice, a North Indian staple.",
    "category": "Lunch",
    "prepTime": "8 hrs",
    "cookTime": "45 mins",
    "totalTime": "8 hrs 45 mins",
    "servings": 4,
    "rating": 4.8,
    "image": "🍛",
    "color": "bg-red-100 text-red-800",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Kidney beans",
            "amount": "1",
            "unit": "cup"
        },
        {
            "name": "Onions",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "3",
            "unit": "medium"
        },
        {
            "name": "Ginger-garlic paste",
            "amount": "1",
            "unit": "tbsp"
        }
    ],
    "steps": [
        "Soak red kidney beans overnight, then pressure cook until completely soft.",
        "Blend tomatoes and onions into a smooth paste.",
        "Sauté the paste with ginger, garlic, and cumin in oil until it deepens in color.",
        "Pour the cooked beans into the spiced tomato base and simmer vigorously.",
        "Crush a few beans against the side of the pot to naturally thicken the gravy.",
        "Serve piping hot over a bed of freshly steamed basmati rice."
    ],
    "tags": [
        "Indian",
        "Comfort Food",
        "Vegan",
        "Protein"
    ],
    "nutrition": {
        "calories": 350,
        "protein": 15,
        "carbs": 60,
        "fat": 5,
        "fiber": 14,
        "sugar": 4,
        "sodium": 400
    },
    "id": 2000010,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Paneer Tikka",
    "titleHindi": "पनीर टिक्का",
    "description": "Marinated cottage cheese cubes grilled to perfection, a classic Indian appetizer.",
    "category": "Starter",
    "prepTime": "1 hr",
    "cookTime": "15 mins",
    "totalTime": "1 hr 15 mins",
    "servings": 4,
    "rating": 4.9,
    "image": "🧀",
    "color": "bg-orange-100 text-orange-500",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Paneer, cubed",
            "amount": "300",
            "unit": "g"
        },
        {
            "name": "Capsicum",
            "amount": "1",
            "unit": "large"
        },
        {
            "name": "Yogurt",
            "amount": "1/2",
            "unit": "cup"
        },
        {
            "name": "Tandoori masala",
            "amount": "1",
            "unit": "tbsp"
        }
    ],
    "steps": [
        "Whisk yogurt, tandoori masala, lemon juice, and salt in a large bowl.",
        "Toss the paneer cubes and capsicum pieces into the marinade.",
        "Refrigerate for at least 1 hour to let the flavors penetrate.",
        "Thread the paneer and veggies alternately onto skewers.",
        "Grill in an oven or on a pan until charred and golden on the edges.",
        "Sprinkle chaat masala over the top and serve hot with mint chutney."
    ],
    "tags": [
        "Indian",
        "Starter",
        "Vegetarian",
        "Grilled"
    ],
    "nutrition": {
        "calories": 280,
        "protein": 15,
        "carbs": 8,
        "fat": 22,
        "fiber": 2,
        "sugar": 4,
        "sodium": 450
    },
    "id": 2000011,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Aloo Tikki",
    "titleHindi": "आलू टिक्की",
    "description": "Crispy potato patties flavored with Indian spices, served with tamarind chutney.",
    "category": "Snack",
    "prepTime": "15 mins",
    "cookTime": "20 mins",
    "totalTime": "35 mins",
    "servings": 4,
    "rating": 4.7,
    "image": "🥔",
    "color": "bg-amber-100 text-amber-500",
    "difficulty": "Easy",
    "ingredients": [
        {
            "name": "Potatoes, boiled and mashed",
            "amount": "4",
            "unit": "medium"
        },
        {
            "name": "Green chilies",
            "amount": "2",
            "unit": "chopped"
        },
        {
            "name": "Cornstarch",
            "amount": "2",
            "unit": "tbsp"
        },
        {
            "name": "Garam masala",
            "amount": "1",
            "unit": "tsp"
        }
    ],
    "steps": [
        "Mix the mashed potatoes with chopped green chilies, coriander, and garam masala.",
        "Add cornstarch to the mixture to bind it together firmly.",
        "Divide the mixture into small portions and flatten them into thick patties.",
        "Heat oil in a shallow frying pan over medium heat.",
        "Fry the patties until they form a highly crisp, golden crust on both sides.",
        "Serve immediately, optionally topped with yogurt and sweet tamarind chutney."
    ],
    "tags": [
        "Indian",
        "Snack",
        "Vegetarian",
        "Street Food"
    ],
    "nutrition": {
        "calories": 180,
        "protein": 3,
        "carbs": 28,
        "fat": 6,
        "fiber": 3,
        "sugar": 2,
        "sodium": 300
    },
    "id": 2000012,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Pani Puri",
    "titleHindi": "पानी पुरी",
    "description": "The king of Indian street food: hollow crispy puris filled with spicy, tangy mint water.",
    "category": "Snack",
    "prepTime": "30 mins",
    "cookTime": "0 mins",
    "totalTime": "30 mins",
    "servings": 4,
    "rating": 5,
    "image": "🟢",
    "color": "bg-green-100 text-green-700",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Puris (crispy hollow balls)",
            "amount": "24",
            "unit": "pieces"
        },
        {
            "name": "Potatoes, boiled & mashed",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Mint leaves",
            "amount": "1",
            "unit": "cup"
        },
        {
            "name": "Tamarind paste",
            "amount": "2",
            "unit": "tbsp"
        },
        {
            "name": "Chaat masala",
            "amount": "1",
            "unit": "tbsp"
        }
    ],
    "steps": [
        "Prepare the spicy water by blending mint, green chilies, tamarind paste, and spices.",
        "Strain the mint puree into a large jug and dilute with chilled water.",
        "Mix the mashed boiled potatoes with a pinch of salt and chili powder for the filling.",
        "When ready to eat, crack a small hole in the top of a crispy puri.",
        "Stuff a tiny bit of the potato filling into the hollow puri.",
        "Dunk the puri into the spicy mint water and eat it in one giant bite!"
    ],
    "tags": [
        "Indian",
        "Street Food",
        "Snack",
        "Vegan"
    ],
    "nutrition": {
        "calories": 150,
        "protein": 3,
        "carbs": 25,
        "fat": 4,
        "fiber": 4,
        "sugar": 3,
        "sodium": 600
    },
    "id": 2000013,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Dhokla",
    "titleHindi": "ढोकला",
    "description": "A savory, spongy, steamed cake originating from Gujarat, made from fermented besan.",
    "category": "Snack",
    "prepTime": "10 mins",
    "cookTime": "20 mins",
    "totalTime": "30 mins",
    "servings": 4,
    "rating": 4.6,
    "image": "🧽",
    "color": "bg-yellow-100 text-yellow-500",
    "difficulty": "Easy",
    "ingredients": [
        {
            "name": "Gram flour (Besan)",
            "amount": "1.5",
            "unit": "cups"
        },
        {
            "name": "Yogurt",
            "amount": "1/2",
            "unit": "cup"
        },
        {
            "name": "Eno fruit salt",
            "amount": "1",
            "unit": "tsp"
        },
        {
            "name": "Mustard seeds",
            "amount": "1",
            "unit": "tsp"
        }
    ],
    "steps": [
        "Whisk gram flour, yogurt, water, salt, and ginger-green chili paste into a smooth batter.",
        "Just before steaming, violently whisk in the Eno fruit salt until the batter aerates and swells.",
        "Pour the batter quickly into a greased pan and steam for 15-20 minutes.",
        "Check with a toothpick to ensure the center is fully cooked, then let it cool and cut into squares.",
        "Prepare the tempering by frying mustard seeds, chilies, curry leaves, and a splash of sugar-water.",
        "Pour the hot tempering evenly over the spongey dhokla squares to soak up the flavor."
    ],
    "tags": [
        "Indian",
        "Snack",
        "Vegetables",
        "Steamed"
    ],
    "nutrition": {
        "calories": 190,
        "protein": 8,
        "carbs": 24,
        "fat": 6,
        "fiber": 4,
        "sugar": 5,
        "sodium": 400
    },
    "id": 2000014,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Chicken Korma",
    "titleHindi": "चिकन कोरमा",
    "description": "A mildly spiced, creamy Indian chicken curry made with a base of yogurt, nuts, and aromatics.",
    "category": "Dinner",
    "prepTime": "20 mins",
    "cookTime": "40 mins",
    "totalTime": "1 hr",
    "servings": 4,
    "rating": 4.8,
    "image": "🍗",
    "color": "bg-amber-100 text-amber-600",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Chicken chunks",
            "amount": "500",
            "unit": "g"
        },
        {
            "name": "Yogurt",
            "amount": "1",
            "unit": "cup"
        },
        {
            "name": "Almond paste",
            "amount": "2",
            "unit": "tbsp"
        },
        {
            "name": "Fried brown onions",
            "amount": "1/2",
            "unit": "cup"
        }
    ],
    "steps": [
        "Marinate the chicken in yogurt and spices for at least 30 minutes.",
        "Blend fried onions and almond paste with a little water until entirely smooth.",
        "In a heavy pot, heat ghee and temper aromatic whole spices like cardamom and cloves.",
        "Add the marinated chicken and sear on medium-high heat until the color turns white.",
        "Pour in the almond-onion paste and let the curry simmer slowly until the oil separates.",
        "Serve this rich, mild, and nutty curry alongside soft naan or steamed rice."
    ],
    "tags": [
        "Indian",
        "Dinner",
        "Chicken",
        "Curry"
    ],
    "nutrition": {
        "calories": 410,
        "protein": 35,
        "carbs": 12,
        "fat": 25,
        "fiber": 2,
        "sugar": 5,
        "sodium": 450
    },
    "id": 2000015,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Gajar Ka Halwa",
    "titleHindi": "गाजर का हलवा",
    "description": "Classic Indian carrot pudding made slowly by simmering grated carrots in milk and sugar.",
    "category": "Dessert",
    "prepTime": "15 mins",
    "cookTime": "45 mins",
    "totalTime": "1 hr",
    "servings": 6,
    "rating": 4.9,
    "image": "🥕",
    "color": "bg-orange-100 text-orange-600",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Carrots, grated",
            "amount": "1",
            "unit": "kg"
        },
        {
            "name": "Full-fat milk",
            "amount": "1",
            "unit": "liter"
        },
        {
            "name": "Sugar",
            "amount": "3/4",
            "unit": "cup"
        },
        {
            "name": "Ghee",
            "amount": "3",
            "unit": "tbsp"
        }
    ],
    "steps": [
        "Wash, peel, and meticulously grate the carrots.",
        "In a large heavy-bottomed pan, bring the milk and grated carrots to a slow boil.",
        "Simmer uncovered for about 30 minutes, stirring frequently until all the milk evaporates.",
        "Add the sugar, which will release moisture; continue cooking until the mixture turns dry again.",
        "Stir in ghee and roast the pudding until it turns glossy and smells deeply aromatic.",
        "Garnish heavily with roasted cashews, almonds, and cardamom powder before serving warm."
    ],
    "tags": [
        "Indian",
        "Dessert",
        "Sweet",
        "Winter Special"
    ],
    "nutrition": {
        "calories": 280,
        "protein": 6,
        "carbs": 35,
        "fat": 14,
        "fiber": 4,
        "sugar": 28,
        "sodium": 80
    },
    "id": 2000016,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Vegetable Biryani",
    "titleHindi": "वेज बिरयानी",
    "description": "A fragrant rice dish packed with mixed vegetables, herbs, and aromatic whole spices.",
    "category": "Dinner",
    "prepTime": "20 mins",
    "cookTime": "30 mins",
    "totalTime": "50 mins",
    "servings": 4,
    "rating": 4.7,
    "image": "🥘",
    "color": "bg-green-100 text-green-700",
    "difficulty": "Medium",
    "ingredients": [
        {
            "name": "Basmati rice",
            "amount": "1.5",
            "unit": "cups"
        },
        {
            "name": "Mixed veggies (carrot, peas, beans)",
            "amount": "2",
            "unit": "cups"
        },
        {
            "name": "Biryani masala",
            "amount": "1",
            "unit": "tbsp"
        },
        {
            "name": "Mint leaves",
            "amount": "1/4",
            "unit": "cup"
        }
    ],
    "steps": [
        "Soak basmati rice for 20 minutes, then parboil it until completely al dente.",
        "In a separate pan, sauté chopped mixed vegetables with ginger-garlic paste and yogurt.",
        "Sprinkle biryani masala over the vegetables and let them cook until slightly tender.",
        "Layer the partially cooked rice heavily over the spiced vegetable mixture.",
        "Cover the pot with a tight lid and steam on the lowest heat setting for 15 minutes.",
        "Uncover, fluff texturally with a fork, and serve steaming hot with cooling cucumber raita."
    ],
    "tags": [
        "Indian",
        "Vegetarian",
        "Rice",
        "Dinner"
    ],
    "nutrition": {
        "calories": 320,
        "protein": 8,
        "carbs": 55,
        "fat": 8,
        "fiber": 6,
        "sugar": 4,
        "sodium": 400
    },
    "id": 2000017,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Bhindi Masala",
    "titleHindi": "भिंडी मसाला",
    "description": "A semi-dry okra curry enhanced with onions, tomatoes, and tangy spices.",
    "category": "Lunch",
    "prepTime": "15 mins",
    "cookTime": "20 mins",
    "totalTime": "35 mins",
    "servings": 4,
    "rating": 4.6,
    "image": "🥒",
    "color": "bg-green-100 text-green-600",
    "difficulty": "Easy",
    "ingredients": [
        {
            "name": "Okra (Bhindi), chopped",
            "amount": "300",
            "unit": "g"
        },
        {
            "name": "Onions, sliced",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Tomatoes",
            "amount": "2",
            "unit": "medium"
        },
        {
            "name": "Amchur (mango powder)",
            "amount": "1",
            "unit": "tsp"
        }
    ],
    "steps": [
        "Wash and thoroughly dry the okra before chopping to prevent it from becoming slimy.",
        "Pan-fry the okra pieces in oil until they slightly shrink and crisp along the edges.",
        "Remove the okra, and in the same pan, fry sliced onions until golden brown.",
        "Add tomatoes, turmeric, red chili powder, and cook down into a thick masala base.",
        "Return the fried okra to the pan and sprinkle generously with tangy amchur powder.",
        "Stir well to coat, cook for an additional 2 minutes, and serve hot with parathas."
    ],
    "tags": [
        "Indian",
        "Vegan",
        "Vegetarian",
        "Lunch"
    ],
    "nutrition": {
        "calories": 140,
        "protein": 4,
        "carbs": 14,
        "fat": 8,
        "fiber": 6,
        "sugar": 4,
        "sodium": 250
    },
    "id": 2000018,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},
{
    "title": "Rasgulla",
    "titleHindi": "रसगुल्ला",
    "description": "A melt-in-the-mouth Bengali sweet made of spongy cottage cheese balls cooked in light sugar syrup.",
    "category": "Dessert",
    "prepTime": "30 mins",
    "cookTime": "20 mins",
    "totalTime": "50 mins",
    "servings": 5,
    "rating": 4.8,
    "image": "⚪",
    "color": "bg-stone-100 text-stone-500",
    "difficulty": "Hard",
    "ingredients": [
        {
            "name": "Milk",
            "amount": "1",
            "unit": "liter"
        },
        {
            "name": "Lemon juice",
            "amount": "2",
            "unit": "tbsp"
        },
        {
            "name": "Sugar",
            "amount": "1.5",
            "unit": "cups"
        },
        {
            "name": "Water",
            "amount": "4",
            "unit": "cups"
        }
    ],
    "steps": [
        "Boil the milk and curdle it by slowly stirring in lemon juice until the whey separates completely.",
        "Strain the paneer through a clean muslin cloth and wash it under cold running water.",
        "Knead the fresh paneer vigorously for 10 minutes until it forms a smooth, non-sticky dough.",
        "Form the dough into small, perfectly smooth, crack-free balls.",
        "Boil sugar and water to create a rapidly bubbling light sugar syrup in a wide pot.",
        "Drop the balls in, cover tightly, and boil for 15 minutes as they double in size."
    ],
    "tags": [
        "Indian",
        "Dessert",
        "Sweet",
        "Bengali"
    ],
    "nutrition": {
        "calories": 150,
        "protein": 4,
        "carbs": 28,
        "fat": 3,
        "fiber": 0,
        "sugar": 26,
        "sodium": 20
    },
    "id": 2000019,
    "stepsHindi": [],
    "chefTipsHindi": [],
    "chefTips": [
        "Garnish with fresh cilantro for best aroma.",
        "Adjust salt to your personal liking."
    ],
    "substitutions": []
},


  {
    id: 1000006,
    title: "Masala Chai",
    titleHindi: "मसाला चाय",
    description: "Classic Indian spiced tea made with milk, tea leaves, and aromatic spices.",
    descriptionHindi: "दूध, चाय की पत्ती और सुगंधित मसालों से बनी क्लासिक भारतीय मसालेदार चाय।",
    category: "Beverage",
    categoryHindi: "पेय",
    prepTime: "5 mins",
    cookTime: "10 mins",
    totalTime: "15 mins",
    servings: 2,
    rating: 4.9,
    image: "☕",
    color: "bg-amber-100 text-amber-700",
    difficulty: "Easy",
    ingredients: [
      { name: "Water", amount: "1", unit: "cup" },
      { name: "Whole milk", amount: "1", unit: "cup" },
      { name: "Black tea leaves", amount: "2", unit: "tsp" },
      { name: "Crushed ginger", amount: "1", unit: "inch" },
      { name: "Crushed green cardamom", amount: "2", unit: "pods" },
      { name: "Sugar", amount: "2", unit: "tsp" }
    ],
    steps: [
      "In a saucepan, bring the water to a gentle boil over medium heat.",
      "Add the crushed ginger and cardamom, letting them infuse for a minute.",
      "Add the black tea leaves and sugar, boiling until the water turns a deep reddish-brown.",
      "Pour in the milk and wait for it to gently rise to the top of the pan.",
      "Lower the heat and simmer for another 2-3 minutes until rich and creamy.",
      "Strain into cups and enjoy hot."
    ],
    stepsHindi: [],
    chefTips: ["Don't boil the tea leaves too long before adding milk, or it will get bitter."],
    chefTipsHindi: [],
    tags: ["Beverage", "Indian", "Hot", "Tea"],
    nutrition: { calories: 120, protein: 4, carbs: 12, fat: 4, fiber: 0, sugar: 10, sodium: 50 }
  },
  {
    id: 1000007,
    title: "Mint Mojito",
    titleHindi: "मिंट मोजिटो",
    description: "A refreshing mocktail loaded with fresh mint and tangy lime.",
    descriptionHindi: "ताज़े पुदीने और तीखे नींबू से भरा एक ताज़ा मॉकटेल।",
    category: "Beverage",
    categoryHindi: "पेय",
    prepTime: "5 mins",
    cookTime: "0 mins",
    totalTime: "5 mins",
    servings: 1,
    rating: 4.8,
    image: "🍹",
    color: "bg-emerald-100 text-emerald-600",
    difficulty: "Easy",
    ingredients: [
      { name: "Fresh mint leaves", amount: "10", unit: "leaves" },
      { name: "Lime slices", amount: "3", unit: "slices" },
      { name: "Sugar syrup", amount: "2", unit: "tbsp" },
      { name: "Ice cubes", amount: "1", unit: "cup" },
      { name: "Soda water or Sprite", amount: "1", unit: "glass" }
    ],
    steps: [
      "Drop the mint leaves and lime slices into a sturdy glass.",
      "Gently muddle them together to release the mint oils and lime juice.",
      "Pour in the sugar syrup and stir thoroughly.",
      "Fill the glass to the top with ice cubes.",
      "Top off with soda water or Sprite and give it a final gentle stir.",
      "Garnish with a sprig of mint and serve immediately."
    ],
    stepsHindi: [],
    chefTips: ["Muddle gently; bruising the mint too much makes it bitter."],
    chefTipsHindi: [],
    tags: ["Beverage", "Cold", "Summer", "Mocktail"],
    nutrition: { calories: 80, protein: 0, carbs: 20, fat: 0, fiber: 1, sugar: 18, sodium: 10 }
  },
  {
    id: 1000008,
    title: "Bruschetta",
    titleHindi: "ब्रुशेटा",
    description: "Classic Italian starter of grilled bread topped with fresh tomatoes and basil.",
    descriptionHindi: "ग्रील्ड ब्रेड और ताजे टमाटर व तुलसी के साथ क्लासिक इतालवी शुरुआत।",
    category: "Starter",
    categoryHindi: "स्टार्टर",
    prepTime: "10 mins",
    cookTime: "5 mins",
    totalTime: "15 mins",
    servings: 4,
    rating: 4.7,
    image: "🍅",
    color: "bg-red-100 text-red-600",
    difficulty: "Easy",
    ingredients: [
      { name: "Baguette, sliced", amount: "1", unit: "loaf" },
      { name: "Tomatoes, diced", amount: "3", unit: "large" },
      { name: "Fresh basil, chopped", amount: "1/4", unit: "cup" },
      { name: "Garlic cloves", amount: "2", unit: "cloves" },
      { name: "Extra virgin olive oil", amount: "3", unit: "tbsp" },
      { name: "Balsamic glaze", amount: "1", unit: "tbsp" }
    ],
    steps: [
      "In a bowl, mix the diced tomatoes, chopped basil, a drizzle of olive oil, salt, and pepper.",
      "Toast the baguette slices in a pan or oven until crispy and golden.",
      "Rub a raw, peeled garlic clove lightly over the top of each warm toast slice.",
      "Generously spoon the fresh tomato mixture over each toasted slice.",
      "Drizzle with sweet balsamic glaze right before serving.",
      "Serve immediately at room temperature for maximum flavor."
    ],
    stepsHindi: [],
    chefTips: ["Use the ripest tomatoes you can find for the best flavor."],
    chefTipsHindi: [],
    tags: ["Starter", "Italian", "Vegetarian", "Healthy"],
    nutrition: { calories: 180, protein: 4, carbs: 22, fat: 8, fiber: 2, sugar: 3, sodium: 200 }
  },
  {
    id: 1000009,
    title: "Chicken Tikka Skewers",
    titleHindi: "चिकन टिक्का",
    description: "Spicy and smoky chicken bites, perfect as an appetizer or starter.",
    descriptionHindi: "मसालेदार और धुएँ के रंग का चिकन, ऐपेटाइज़र के रूप में उत्तम।",
    category: "Starter",
    categoryHindi: "स्टार्टर",
    prepTime: "1 hr",
    cookTime: "15 mins",
    totalTime: "1 hr 15 mins",
    servings: 4,
    rating: 4.9,
    image: "🍢",
    color: "bg-orange-100 text-orange-600",
    difficulty: "Medium",
    ingredients: [
      { name: "Boneless chicken, cubed", amount: "500", unit: "g" },
      { name: "Thick yogurt", amount: "1/2", unit: "cup" },
      { name: "Kashmiri red chili powder", amount: "1", unit: "tbsp" },
      { name: "Ginger-garlic paste", amount: "1", unit: "tbsp" },
      { name: "Lemon juice", amount: "1", unit: "tbsp" }
    ],
    steps: [
      "In a large bowl, whisk together the yogurt, spices, ginger-garlic paste, and lemon juice.",
      "Add the chicken cubes, coat them thoroughly, and marinate in the fridge for at least 1 hour.",
      "Preheat your grill or oven to high heat.",
      "Thread the marinated chicken cubes onto wooden skewers.",
      "Grill or bake for 12-15 minutes, turning occasionally until slightly charred and fully cooked.",
      "Serve hot with a side of mint chutney and lemon wedges."
    ],
    stepsHindi: [],
    chefTips: ["Soak wooden skewers in water for 30 minutes before grilling so they don't burn."],
    chefTipsHindi: [],
    tags: ["Starter", "Indian", "Chicken", "Grill"],
    nutrition: { calories: 240, protein: 28, carbs: 4, fat: 12, fiber: 1, sugar: 2, sodium: 350 }
  }
,

    {
        id: 1000001,
        title: "Classic Chocolate Chip Cookies",
        titleHindi: "चॉकलेट चिप कुकीज़",
        description: "Soft, chewy, and loaded with chocolate chips. The ultimate homemade dessert.",
        descriptionHindi: "चॉकलेट चिप्स से भरी नरम कुकीज़।",
        category: "Dessert",
        categoryHindi: "मिठाई",
        prepTime: "15 mins",
        cookTime: "10 mins",
        totalTime: "25 mins",
        servings: 12,
        rating: 4.9,
        image: "🍪",
        color: "bg-amber-100 text-amber-600",
        difficulty: "Easy",
        ingredients: [
            { name: "All-purpose flour", amount: "2", unit: "cups" },
            { name: "Butter, softened", amount: "1", unit: "cup" },
            { name: "Brown sugar", amount: "1", unit: "cup" }
        ],
        steps: [
            "Preheat the oven to 375°F (190°C) and line a baking sheet with parchment paper.",
            "Cream together the butter and brown sugar until light and fluffy.",
            "Beat in the vanilla extract, then gradually mix in the flour until just combined.",
            "Fold in the chocolate chips evenly throughout the cookie dough.",
            "Drop rounded tablespoons of dough onto the prepared baking sheet.",
            "Bake for 9-11 minutes, then let cool on a wire rack before serving."
        ],
        stepsHindi: [],
        chefTips: ["Don't overbake; they should look slightly underdone when taking them out."],
        chefTipsHindi: [],
        tags: ["Dessert", "Baking", "Sweet", "Snack"],
        nutrition: { calories: 250, protein: 3, carbs: 32, fat: 12, fiber: 2, sugar: 10, sodium: 300 }
    },
    {
        id: 1000002,
        title: "Gulab Jamun",
        titleHindi: "गुलाब जामुन",
        description: "Classic Indian sweet of fried dough balls soaked in a sticky, sweet rose-scented syrup.",
        descriptionHindi: "एक पारंपरिक भारतीय मिठाई जिसमें खोया के गोले चाशनी में डुबोए जाते हैं।",
        category: "Dessert",
        categoryHindi: "मिठाई",
        prepTime: "20 mins",
        cookTime: "30 mins",
        totalTime: "50 mins",
        servings: 10,
        rating: 5.0,
        image: "🍩",
        color: "bg-rose-100 text-rose-600",
        difficulty: "Medium",
        ingredients: [
            { name: "Milk powder", amount: "1", unit: "cup" },
            { name: "All-purpose flour", amount: "1/4", unit: "cup" },
            { name: "Sugar", amount: "1.5", unit: "cups" }
        ],
        steps: [
            "Prepare the sugar syrup by boiling sugar, water, cardamom, and rose water until sticky.",
            "Mix milk powder, flour, and a little milk to form a soft, smooth dough.",
            "Divide the dough into small, crack-free balls.",
            "Heat ghee or oil in a pan on medium-low flame.",
            "Fry the balls gently until they turn a deep golden brown on all sides.",
            "Remove from oil and immediately submerge them in the warm sugar syrup, letting them soak."
        ],
        stepsHindi: [],
        chefTips: ["Ensure the dough has no cracks before frying to prevent them from breaking."],
        chefTipsHindi: [],
        tags: ["Dessert", "Indian", "Sweet", "Festive"],
        nutrition: { calories: 300, protein: 4, carbs: 45, fat: 10, fiber: 2, sugar: 10, sodium: 300 }
    },
    {
        id: 1000003,
        title: "Crispy Samosa",
        titleHindi: "समोसा",
        description: "Golden, crispy Indian snack wrapped with a spicy potato and pea filling.",
        descriptionHindi: "मसालेदार आलू और मटर से भरा कुरकुरा भारतीय स्नैक।",
        category: "Snack",
        categoryHindi: "स्नैक",
        prepTime: "30 mins",
        cookTime: "20 mins",
        totalTime: "50 mins",
        servings: 8,
        rating: 4.8,
        image: "🥟",
        color: "bg-orange-100 text-orange-600",
        difficulty: "Medium",
        ingredients: [
            { name: "Potatoes, boiled and mashed", amount: "3", unit: "large" },
            { name: "Green peas", amount: "1/2", unit: "cup" },
            { name: "All-purpose flour", amount: "2", unit: "cups" }
        ],
        steps: [
            "Prepare the outer dough by mixing flour, carom seeds, salt, and enough water to knead thinly.",
            "For the filling, sauté boiled potatoes, peas, and garam masala in a pan until fragrant.",
            "Roll the dough into small circles and cut them in half to form semi-circles.",
            "Fold each semi-circle into a cone shape, sealing the edge with a little water.",
            "Stuff the cone with the potato filling and pinch the bottom edge to close it completely.",
            "Deep fry the filled samosas on medium heat until golden and crispy."
        ],
        stepsHindi: [],
        chefTips: ["Fry on medium-low heat to ensure the crust gets crispy without burning."],
        chefTipsHindi: [],
        tags: ["Snack", "Indian", "Fried", "Spicy"],
        nutrition: { calories: 250, protein: 5, carbs: 28, fat: 14, fiber: 2, sugar: 10, sodium: 300 }
    },
    {
        id: 1000004,
        title: "Avocado Toast",
        titleHindi: "एवोकाडो टोस्ट",
        description: "A quick, healthy snack loaded with healthy fats and fresh seasoning.",
        descriptionHindi: "स्वस्थ वसा और ताज़ा सीज़निंग से भरा त्वरित स्नैक।",
        category: "Snack",
        categoryHindi: "स्नैक",
        prepTime: "5 mins",
        cookTime: "5 mins",
        totalTime: "10 mins",
        servings: 1,
        rating: 4.7,
        image: "🥑",
        color: "bg-green-100 text-green-600",
        difficulty: "Easy",
        ingredients: [
            { name: "Ripe avocado", amount: "1", unit: "half" },
            { name: "Bread slice", amount: "1", unit: "large" },
            { name: "Lemon juice", amount: "1", unit: "tsp" }
        ],
        steps: [
            "Toast the bread slice in a toaster or on a pan until golden and crispy.",
            "Scoop out the avocado flesh into a small bowl.",
            "Mash the avocado with a fork until it reaches your desired consistency.",
            "Stir the lemon juice, salt, and black pepper into the mashed avocado.",
            "Spread the seasoned avocado evenly over the toasted bread.",
            "Sprinkle red pepper flakes on top and serve immediately."
        ],
        stepsHindi: [],
        chefTips: ["Add a poached egg on top for extra protein!"],
        chefTipsHindi: [],
        tags: ["Snack", "Healthy", "Quick", "Vegan"],
        nutrition: { calories: 220, protein: 6, carbs: 18, fat: 15, fiber: 2, sugar: 10, sodium: 300 }
    },
    {
        id: 1000005,
        title: "Tiramisu",
        titleHindi: "तिरामिसू",
        description: "An elegant Italian dessert made with espresso-soaked ladyfingers and mascarpone cream.",
        descriptionHindi: "एस्प्रेसो और मस्कारपोन क्रीम से बनी एक सुंदर इतालवी मिठाई।",
        category: "Dessert",
        categoryHindi: "मिठाई",
        prepTime: "30 mins",
        cookTime: "0 mins",
        totalTime: "4 hrs",
        servings: 8,
        rating: 5.0,
        image: "🍰",
        color: "bg-stone-100 text-stone-600",
        difficulty: "Medium",
        ingredients: [
            { name: "Ladyfingers", amount: "24", unit: "pcs" },
            { name: "Mascarpone cheese", amount: "2", unit: "cups" },
            { name: "Strong brewed espresso", amount: "1.5", unit: "cups" }
        ],
        steps: [
            "Brew the espresso and let it cool completely in a shallow bowl.",
            "In a mixing bowl, whip the mascarpone cheese and sugar until smooth and creamy.",
            "Quickly dip half of the ladyfingers into the espresso, one by one.",
            "Arrange the dipped ladyfingers in a single layer at the bottom of a baking dish.",
            "Spread half of the mascarpone mixture evenly over the ladyfingers.",
            "Repeat with another layer of dipped ladyfingers and the remaining mascarpone, then dust with cocoa powder before chilling."
        ],
        stepsHindi: [],
        chefTips: ["Do not soak the ladyfingers too long; a quick 1-second dip is enough!"],
        chefTipsHindi: [],
        tags: ["Dessert", "Italian", "Sweet", "No Bake"],
        nutrition: { calories: 450, protein: 8, carbs: 42, fat: 26, fiber: 2, sugar: 10, sodium: 300 }
    }
    ,
    {
        "id": 1,
        "title": "Classic Spaghetti Carbonara",
        "titleHindi": "क्लासिक स्पेगेटी कार्बोनारा",
        "description": "A traditional Italian pasta dish made with eggs, hard cheese, cured pork, and black pepper. Simple yet incredibly rich and delicious.",
        "descriptionHindi": "अंडे, पनीर, सूअर का मांस और काली मिर्च से बना एक पारंपरिक इतालवी पास्ता। सरल लेकिन बेहद स्वादिष्ट।",
        "category": "Dinner",
        "prepTime": "10 min",
        "cookTime": "15 min",
        "totalTime": "25 min",
        "servings": 4,
        "rating": 4.8,
        "image": "🍝",
        "color": "bg-orange-100 text-orange-600",
        "difficulty": "Medium",
        "tags": [
            "Italian",
            "Pasta",
            "Quick",
            "Comfort Food"
        ],
        "ingredients": [
            {
                "name": "Spaghetti",
                "nameHindi": "स्पेगेटी",
                "amount": "400",
                "unit": "g"
            },
            {
                "name": "Pancetta or Guanciale",
                "nameHindi": "पैंसेटा",
                "amount": "200",
                "unit": "g",
                "notes": "diced"
            },
            {
                "name": "Large Eggs",
                "nameHindi": "बड़े अंडे",
                "amount": "4",
                "unit": "whole"
            },
            {
                "name": "Egg Yolks",
                "nameHindi": "अंडे की जर्दी",
                "amount": "2",
                "unit": "whole"
            },
            {
                "name": "Pecorino Romano",
                "nameHindi": "पेकोरीनो पनीर",
                "amount": "100",
                "unit": "g",
                "notes": "finely grated"
            },
            {
                "name": "Black Pepper",
                "nameHindi": "काली मिर्च",
                "amount": "2",
                "unit": "tsp",
                "notes": "freshly ground"
            },
            {
                "name": "Salt",
                "nameHindi": "नमक",
                "amount": "1",
                "unit": "tsp"
            }
        ],
        "steps": [
            "Bring a large pot of salted water to a boil. Cook the spaghetti according to package instructions until al dente.",
            "While pasta cooks, cut the pancetta into small cubes. Fry in a large pan over medium heat until crispy, about 5-7 minutes.",
            "In a bowl, whisk together the eggs, egg yolks, and most of the Pecorino cheese. Season generously with black pepper.",
            "When pasta is ready, reserve 1 cup of pasta water, then drain the spaghetti.",
            "Working quickly, add the hot pasta to the pan with pancetta (off heat). Toss to coat in the rendered fat.",
            "Pour the egg mixture over the pasta and toss vigorously. The residual heat will cook the eggs into a creamy sauce.",
            "Add pasta water a little at a time if the sauce is too thick. Serve immediately with remaining cheese and pepper."
        ],
        "stepsHindi": [
            "एक बड़े बर्तन में नमकीन पानी उबालें। स्पेगेटी को पैकेज निर्देशों के अनुसार पकाएं।",
            "पास्ता पकते समय, पैंसेटा को छोटे टुकड़ों में काटें। मध्यम आंच पर 5-7 मिनट तक कुरकुरा होने तक तलें।",
            "एक कटोरे में अंडे, जर्दी और पेकोरीनो पनीर को फेंटें। काली मिर्च डालें।",
            "जब पास्ता तैयार हो, 1 कप पास्ता पानी अलग रखें, फिर स्पेगेटी छान लें।",
            "जल्दी से गर्म पास्ता को पैंसेटा वाले पैन में डालें (आंच बंद करके)। अच्छी तरह मिलाएं।",
            "अंडे का मिश्रण पास्ता पर डालें और जोर से हिलाएं। गर्मी से क्रीमी सॉस बनेगा।",
            "अगर सॉस गाढ़ा है तो पास्ता पानी मिलाएं। बचे हुए पनीर और मिर्च के साथ तुरंत परोसें।"
        ],
        "nutrition": {
            "calories": 650,
            "protein": 28,
            "carbs": 72,
            "fat": 28,
            "fiber": 3,
            "sugar": 2,
            "sodium": 890
        },
        "chefTips": [
            "The key is to remove the pan from heat before adding the egg mixture to prevent scrambling.",
            "Use freshly ground black pepper - it makes a huge difference in authentic carbonara.",
            "Guanciale (cured pork jowl) is traditional, but pancetta works as a great substitute.",
            "Reserve pasta water! The starchy water helps create the silky sauce."
        ],
        "chefTipsHindi": [
            "अंडे का मिश्रण डालने से पहले पैन को आंच से हटा लें ताकि अंडे फटे नहीं।",
            "ताजी पिसी काली मिर्च का उपयोग करें - इससे असली स्वाद आता है।",
            "गुआंसियाले पारंपरिक है, लेकिन पैंसेटा भी अच्छा विकल्प है।",
            "पास्ता का पानी बचाएं! स्टार्ची पानी मलाईदार सॉस बनाने में मदद करता है।"
        ],
        "substitutions": [
            {
                "original": "Guanciale",
                "substitute": "Pancetta or thick-cut bacon",
                "notes": "Bacon will add a smoky flavor not traditional to the dish"
            },
            {
                "original": "Pecorino Romano",
                "substitute": "Parmesan cheese",
                "notes": "Parmesan is milder; use a 50/50 mix for balance"
            },
            {
                "original": "Spaghetti",
                "substitute": "Rigatoni or Bucatini",
                "notes": "These tubes hold the sauce well"
            }
        ]
    },
    {
        "id": 2,
        "title": "Avocado Toast with Poached Egg",
        "titleHindi": "एवोकाडो टोस्ट और पोच्ड अंडा",
        "description": "The perfect breakfast or brunch. Creamy avocado on toasted sourdough, topped with a perfectly poached egg and chili flakes.",
        "descriptionHindi": "नाश्ते के लिए बिल्कुल सही। क्रीमी एवोकाडो टोस्ट पर पोच्ड अंडा और मिर्च के साथ।",
        "category": "Breakfast",
        "prepTime": "5 min",
        "cookTime": "10 min",
        "totalTime": "15 min",
        "servings": 2,
        "rating": 4.9,
        "image": "🥑",
        "color": "bg-green-100 text-green-600",
        "difficulty": "Easy",
        "tags": [
            "Breakfast",
            "Healthy",
            "Quick",
            "Vegetarian"
        ],
        "ingredients": [
            {
                "name": "Sourdough Bread",
                "nameHindi": "खट्टी रोटी",
                "amount": "2",
                "unit": "slices"
            },
            {
                "name": "Ripe Avocado",
                "nameHindi": "पका एवोकाडो",
                "amount": "1",
                "unit": "large"
            },
            {
                "name": "Large Eggs",
                "nameHindi": "बड़े अंडे",
                "amount": "2",
                "unit": "whole"
            },
            {
                "name": "Lemon Juice",
                "nameHindi": "नींबू का रस",
                "amount": "1",
                "unit": "tbsp"
            },
            {
                "name": "Chili Flakes",
                "nameHindi": "मिर्च के फ्लेक्स",
                "amount": "1/4",
                "unit": "tsp"
            },
            {
                "name": "Salt",
                "nameHindi": "नमक",
                "amount": "1/2",
                "unit": "tsp"
            },
            {
                "name": "Black Pepper",
                "nameHindi": "काली मिर्च",
                "amount": "1/4",
                "unit": "tsp"
            },
            {
                "name": "White Vinegar",
                "nameHindi": "सफेद सिरका",
                "amount": "1",
                "unit": "tbsp",
                "notes": "for poaching"
            }
        ],
        "steps": [
            "Toast the bread slices until golden brown and crispy.",
            "Cut the avocado in half, remove pit, and scoop flesh into a bowl.",
            "Mash the avocado with lemon juice, salt, and pepper until desired consistency.",
            "Bring a pot of water to a gentle simmer. Add white vinegar.",
            "Create a gentle whirlpool and carefully drop in each egg. Poach for 3-4 minutes.",
            "Spread the mashed avocado generously on each toast slice.",
            "Top each toast with a poached egg, sprinkle with chili flakes and extra salt."
        ],
        "stepsHindi": [
            "ब्रेड के स्लाइस को सुनहरा और कुरकुरा होने तक टोस्ट करें।",
            "एवोकाडो को आधा काटें, गुठली निकालें और गूदा एक कटोरे में निकालें।",
            "एवोकाडो को नींबू के रस, नमक और काली मिर्च के साथ मैश करें।",
            "एक बर्तन में पानी हल्का उबालें। सफेद सिरका डालें।",
            "धीरे से पानी में भंवर बनाएं और अंडे डालें। 3-4 मिनट पोच करें।",
            "हर टोस्ट पर मैश किया एवोकाडो फैलाएं।",
            "हर टोस्ट पर पोच्ड अंडा रखें, मिर्च और नमक छिड़कें।"
        ],
        "nutrition": {
            "calories": 320,
            "protein": 14,
            "carbs": 28,
            "fat": 18,
            "fiber": 7,
            "sugar": 2,
            "sodium": 480
        },
        "chefTips": [
            "Use ripe avocados - they should yield slightly to gentle pressure.",
            "Fresh eggs poach better as the whites hold together more tightly.",
            "A splash of vinegar in the water helps the egg whites coagulate faster.",
            "For extra flavor, rub the toast with a garlic clove before adding avocado."
        ],
        "chefTipsHindi": [
            "पके एवोकाडो का उपयोग करें - दबाने पर थोड़ा नरम होना चाहिए।",
            "ताजे अंडे बेहतर पोच होते हैं क्योंकि सफेद भाग अच्छी तरह जमती है।",
            "पानी में सिरका डालने से अंडे की सफेदी जल्दी जमती है।",
            "अतिरिक्त स्वाद के लिए, एवोकाडो डालने से पहले टोस्ट पर लहसुन रगड़ें।"
        ],
        "substitutions": [
            {
                "original": "Sourdough Bread",
                "substitute": "Whole grain or rye bread",
                "notes": "Any crusty bread works well"
            },
            {
                "original": "Poached Egg",
                "substitute": "Fried or scrambled eggs",
                "notes": "Adjust cooking method to preference"
            },
            {
                "original": "Chili Flakes",
                "substitute": "Everything bagel seasoning",
                "notes": "Adds a different but delicious flavor profile"
            }
        ]
    },
    {
        "id": 3,
        "title": "Grilled Chicken Caesar Salad",
        "description": "A fresh and crisp salad with tender grilled chicken, crunchy croutons, and a creamy homemade Caesar dressing.",
        "category": "Lunch",
        "prepTime": "15 min",
        "cookTime": "15 min",
        "totalTime": "30 min",
        "servings": 2,
        "rating": 4.7,
        "image": "🥗",
        "color": "bg-green-50 text-green-700",
        "difficulty": "Medium",
        "tags": [
            "Salad",
            "Healthy",
            "Protein",
            "Classic"
        ],
        "ingredients": [
            {
                "name": "Chicken Breasts",
                "amount": "2",
                "unit": "medium"
            },
            {
                "name": "Romaine Lettuce",
                "amount": "1",
                "unit": "head",
                "notes": "chopped"
            },
            {
                "name": "Parmesan Cheese",
                "amount": "50",
                "unit": "g",
                "notes": "shaved"
            },
            {
                "name": "Croutons",
                "amount": "1",
                "unit": "cup"
            },
            {
                "name": "Olive Oil",
                "amount": "2",
                "unit": "tbsp"
            },
            {
                "name": "Mayonnaise",
                "amount": "1/2",
                "unit": "cup"
            },
            {
                "name": "Lemon Juice",
                "amount": "2",
                "unit": "tbsp"
            },
            {
                "name": "Garlic",
                "amount": "2",
                "unit": "cloves",
                "notes": "minced"
            },
            {
                "name": "Dijon Mustard",
                "amount": "1",
                "unit": "tsp"
            },
            {
                "name": "Worcestershire Sauce",
                "amount": "1",
                "unit": "tsp"
            },
            {
                "name": "Anchovy Paste",
                "amount": "1",
                "unit": "tsp",
                "notes": "optional"
            }
        ],
        "steps": [
            "Season chicken breasts with salt, pepper, and a drizzle of olive oil.",
            "Grill chicken over medium-high heat for 6-7 minutes per side until internal temp reaches 165°F.",
            "Let chicken rest for 5 minutes, then slice into strips.",
            "For dressing: whisk together mayonnaise, lemon juice, garlic, mustard, Worcestershire, and anchovy paste.",
            "Chop the romaine lettuce and place in a large bowl.",
            "Toss lettuce with dressing until evenly coated.",
            "Top with sliced chicken, croutons, and shaved Parmesan. Serve immediately."
        ],
        "nutrition": {
            "calories": 480,
            "protein": 42,
            "carbs": 18,
            "fat": 28,
            "fiber": 4,
            "sugar": 3,
            "sodium": 720
        },
        "chefTips": [
            "Let the chicken rest after grilling to keep it juicy when sliced.",
            "Homemade croutons are easy: cube day-old bread, toss with olive oil and garlic, bake at 375°F for 10 min.",
            "For a lighter dressing, use Greek yogurt instead of mayonnaise.",
            "Anchovy paste adds umami depth - you won't taste fish, just savory richness."
        ],
        "substitutions": [
            {
                "original": "Chicken Breast",
                "substitute": "Grilled shrimp or salmon",
                "notes": "Seafood adds a different protein option"
            },
            {
                "original": "Romaine Lettuce",
                "substitute": "Kale",
                "notes": "Massage kale with dressing to soften"
            },
            {
                "original": "Mayonnaise",
                "substitute": "Greek yogurt",
                "notes": "Creates a lighter, tangier dressing"
            }
        ]
    },
    {
        "id": 4,
        "title": "Homemade Pizza Margherita",
        "description": "Simple, classic, and delicious. Homemade pizza dough topped with San Marzano tomato sauce, fresh mozzarella, and basil.",
        "category": "Dinner",
        "prepTime": "20 min",
        "cookTime": "12 min",
        "totalTime": "45 min",
        "servings": 4,
        "rating": 4.9,
        "image": "🍕",
        "color": "bg-red-100 text-red-600",
        "difficulty": "Hard",
        "tags": [
            "Italian",
            "Pizza",
            "Homemade",
            "Family Favorite"
        ],
        "ingredients": [
            {
                "name": "Pizza Dough",
                "amount": "500",
                "unit": "g"
            },
            {
                "name": "San Marzano Tomatoes",
                "amount": "400",
                "unit": "g",
                "notes": "crushed"
            },
            {
                "name": "Fresh Mozzarella",
                "amount": "200",
                "unit": "g",
                "notes": "sliced or torn"
            },
            {
                "name": "Fresh Basil",
                "amount": "10",
                "unit": "leaves"
            },
            {
                "name": "Extra Virgin Olive Oil",
                "amount": "2",
                "unit": "tbsp"
            },
            {
                "name": "Garlic",
                "amount": "1",
                "unit": "clove",
                "notes": "minced"
            },
            {
                "name": "Salt",
                "amount": "1/2",
                "unit": "tsp"
            },
            {
                "name": "Dried Oregano",
                "amount": "1/2",
                "unit": "tsp"
            }
        ],
        "steps": [
            "Preheat oven to highest setting (500°F/260°C). If using a pizza stone, preheat it for 30 minutes.",
            "Make sauce: blend tomatoes with garlic, salt, and a drizzle of olive oil. Keep it slightly chunky.",
            "Stretch pizza dough on a floured surface to desired thickness (thin for crispy, thicker for chewy).",
            "Transfer dough to a floured pizza peel or baking sheet.",
            "Spread a thin layer of tomato sauce, leaving a 1-inch border for the crust.",
            "Tear fresh mozzarella and distribute evenly over the sauce.",
            "Slide pizza onto the hot stone or bake directly on the sheet for 10-12 minutes.",
            "When edges are golden and cheese is bubbly, remove from oven.",
            "Top with fresh basil leaves and a drizzle of olive oil before serving."
        ],
        "nutrition": {
            "calories": 580,
            "protein": 22,
            "carbs": 68,
            "fat": 24,
            "fiber": 3,
            "sugar": 5,
            "sodium": 820
        },
        "chefTips": [
            "A pizza stone retains heat and creates a crispier crust - worth the investment!",
            "San Marzano tomatoes are sweeter and less acidic than regular canned tomatoes.",
            "Don't overload with toppings - less is more for a crispy base.",
            "Add basil AFTER baking to preserve its fresh flavor and bright color."
        ],
        "substitutions": [
            {
                "original": "Fresh Mozzarella",
                "substitute": "Low-moisture mozzarella",
                "notes": "Melts differently; more stretchy, less creamy"
            },
            {
                "original": "San Marzano Tomatoes",
                "substitute": "Quality canned crushed tomatoes",
                "notes": "Add a pinch of sugar if sauce tastes acidic"
            },
            {
                "original": "Pizza Dough",
                "substitute": "Store-bought dough or naan bread",
                "notes": "Naan makes a quick flatbread-style pizza"
            }
        ]
    },
    {
        "id": 5,
        "title": "Berry Smoothie Bowl",
        "description": "A refreshing and healthy start to the day. Packed with antioxidants and topped with your favorite fruits and granola.",
        "category": "Breakfast",
        "prepTime": "5 min",
        "cookTime": "0 min",
        "totalTime": "10 min",
        "servings": 1,
        "rating": 4.6,
        "image": "🫐",
        "color": "bg-purple-100 text-purple-600",
        "difficulty": "Easy",
        "tags": [
            "Healthy",
            "Vegan",
            "Quick",
            "No-Cook"
        ],
        "ingredients": [
            {
                "name": "Frozen Banana",
                "amount": "1",
                "unit": "large"
            },
            {
                "name": "Frozen Mixed Berries",
                "amount": "1",
                "unit": "cup"
            },
            {
                "name": "Almond Milk",
                "amount": "1/2",
                "unit": "cup"
            },
            {
                "name": "Honey or Maple Syrup",
                "amount": "1",
                "unit": "tbsp"
            },
            {
                "name": "Granola",
                "amount": "1/4",
                "unit": "cup",
                "notes": "for topping"
            },
            {
                "name": "Fresh Berries",
                "amount": "1/4",
                "unit": "cup",
                "notes": "for topping"
            },
            {
                "name": "Chia Seeds",
                "amount": "1",
                "unit": "tbsp",
                "notes": "for topping"
            },
            {
                "name": "Sliced Almonds",
                "amount": "1",
                "unit": "tbsp",
                "notes": "for topping"
            }
        ],
        "steps": [
            "Add frozen banana and frozen mixed berries to a high-powered blender.",
            "Pour in almond milk and add honey or maple syrup.",
            "Blend until thick and creamy, scraping down sides as needed. Add more milk if too thick.",
            "The consistency should be thicker than a regular smoothie - spoonable, not drinkable.",
            "Pour into a bowl.",
            "Arrange toppings in rows: granola, fresh berries, chia seeds, and sliced almonds.",
            "Serve immediately before it melts!"
        ],
        "nutrition": {
            "calories": 320,
            "protein": 8,
            "carbs": 58,
            "fat": 9,
            "fiber": 10,
            "sugar": 32,
            "sodium": 85
        },
        "chefTips": [
            "Use frozen fruit for the thickest, creamiest texture without ice.",
            "Freeze bananas when they're spotted/ripe for the sweetest flavor.",
            "Açaí packets can be added for an extra antioxidant boost.",
            "Prep smoothie bags: portion fruit into freezer bags for quick mornings."
        ],
        "substitutions": [
            {
                "original": "Almond Milk",
                "substitute": "Oat milk, coconut milk, or regular milk",
                "notes": "Any liquid works; coconut adds tropical flavor"
            },
            {
                "original": "Mixed Berries",
                "substitute": "Mango and pineapple",
                "notes": "Creates a tropical smoothie bowl"
            },
            {
                "original": "Honey",
                "substitute": "Medjool dates",
                "notes": "Adds natural sweetness and fiber"
            }
        ]
    },
    {
        "id": 6,
        "title": "Chocolate Lava Cake",
        "description": "Indulgent individual chocolate cakes with a molten chocolate center. Best served warm with vanilla ice cream.",
        "category": "Dessert",
        "prepTime": "15 min",
        "cookTime": "12 min",
        "totalTime": "35 min",
        "servings": 4,
        "rating": 5,
        "image": "🍫",
        "color": "bg-amber-100 text-amber-800",
        "difficulty": "Medium",
        "tags": [
            "Dessert",
            "Chocolate",
            "Impressive",
            "Date Night"
        ],
        "ingredients": [
            {
                "name": "Dark Chocolate",
                "amount": "120",
                "unit": "g",
                "notes": "70% cocoa"
            },
            {
                "name": "Unsalted Butter",
                "amount": "100",
                "unit": "g"
            },
            {
                "name": "Large Eggs",
                "amount": "2",
                "unit": "whole"
            },
            {
                "name": "Egg Yolks",
                "amount": "2",
                "unit": "whole"
            },
            {
                "name": "Granulated Sugar",
                "amount": "100",
                "unit": "g"
            },
            {
                "name": "All-Purpose Flour",
                "amount": "3",
                "unit": "tbsp"
            },
            {
                "name": "Cocoa Powder",
                "amount": "1",
                "unit": "tbsp",
                "notes": "for dusting ramekins"
            },
            {
                "name": "Vanilla Extract",
                "amount": "1",
                "unit": "tsp"
            },
            {
                "name": "Pinch of Salt",
                "amount": "1",
                "unit": "pinch"
            }
        ],
        "steps": [
            "Preheat oven to 425°F (220°C). Generously butter 4 ramekins and dust with cocoa powder.",
            "Melt chocolate and butter together in a double boiler or microwave, stirring until smooth.",
            "In a separate bowl, whisk eggs, egg yolks, sugar, and vanilla until pale and thick (about 3 minutes).",
            "Fold the warm chocolate mixture into the egg mixture gently.",
            "Sift in the flour and fold until just combined. Do not overmix.",
            "Divide batter evenly among prepared ramekins (they should be about 3/4 full).",
            "Bake for 12-14 minutes. The edges should be set but the center should jiggle slightly.",
            "Let cool for 1 minute, then run a knife around the edges and invert onto plates.",
            "Serve immediately with vanilla ice cream or whipped cream."
        ],
        "nutrition": {
            "calories": 420,
            "protein": 7,
            "carbs": 38,
            "fat": 28,
            "fiber": 3,
            "sugar": 30,
            "sodium": 95
        },
        "chefTips": [
            "Timing is everything! Underbaking is better than overbaking for a gooey center.",
            "You can prepare the batter ahead and refrigerate; add 2 extra minutes to baking time.",
            "Use quality chocolate - it's the star of the dish.",
            "Room temperature eggs incorporate better and create a lighter batter."
        ],
        "substitutions": [
            {
                "original": "Dark Chocolate",
                "substitute": "Milk chocolate",
                "notes": "Results in a sweeter, less intense flavor"
            },
            {
                "original": "All-Purpose Flour",
                "substitute": "Almond flour",
                "notes": "Makes it gluten-free; texture will be slightly different"
            },
            {
                "original": "Butter",
                "substitute": "Coconut oil",
                "notes": "For dairy-free version; adds subtle coconut flavor"
            }
        ]
    },
    {
        "id": 7,
        "title": "Butter Chicken (Murgh Makhani)",
        "description": "Creamy, aromatic Indian curry with tender chicken in a rich tomato-based sauce. Restaurant-quality flavor at home.",
        "category": "Dinner",
        "prepTime": "20 min",
        "cookTime": "35 min",
        "totalTime": "55 min",
        "servings": 4,
        "rating": 4.9,
        "image": "🍛",
        "color": "bg-orange-100 text-orange-700",
        "difficulty": "Medium",
        "tags": [
            "Indian",
            "Curry",
            "Comfort Food",
            "Spicy"
        ],
        "ingredients": [
            {
                "name": "Chicken Thighs",
                "amount": "800",
                "unit": "g",
                "notes": "boneless, cubed"
            },
            {
                "name": "Plain Yogurt",
                "amount": "1",
                "unit": "cup"
            },
            {
                "name": "Garam Masala",
                "amount": "2",
                "unit": "tsp"
            },
            {
                "name": "Turmeric",
                "amount": "1",
                "unit": "tsp"
            },
            {
                "name": "Butter",
                "amount": "4",
                "unit": "tbsp"
            },
            {
                "name": "Onion",
                "amount": "1",
                "unit": "large",
                "notes": "finely diced"
            },
            {
                "name": "Garlic",
                "amount": "4",
                "unit": "cloves",
                "notes": "minced"
            },
            {
                "name": "Ginger",
                "amount": "2",
                "unit": "tbsp",
                "notes": "grated"
            },
            {
                "name": "Tomato Puree",
                "amount": "400",
                "unit": "g"
            },
            {
                "name": "Heavy Cream",
                "amount": "1",
                "unit": "cup"
            },
            {
                "name": "Kashmiri Chili Powder",
                "amount": "1",
                "unit": "tsp"
            }
        ],
        "steps": [
            "Marinate chicken in yogurt, garam masala, turmeric, and salt for at least 30 minutes.",
            "Grill or pan-fry marinated chicken until charred. Set aside.",
            "In a large pan, melt butter and sauté onions until golden.",
            "Add garlic and ginger, cook for 2 minutes until fragrant.",
            "Add tomato puree and chili powder. Simmer for 15 minutes.",
            "Blend the sauce until smooth, then return to pan.",
            "Add cream and cooked chicken. Simmer for 10 minutes.",
            "Finish with a swirl of butter. Serve with naan or rice."
        ],
        "nutrition": {
            "calories": 520,
            "protein": 38,
            "carbs": 18,
            "fat": 34,
            "fiber": 3,
            "sugar": 8,
            "sodium": 680
        },
        "chefTips": [
            "Marinating overnight intensifies the flavor significantly.",
            "Kashmiri chili adds color without too much heat.",
            "Blend the sauce for that authentic restaurant smoothness."
        ],
        "substitutions": [
            {
                "original": "Heavy Cream",
                "substitute": "Coconut cream",
                "notes": "Dairy-free option with subtle coconut flavor"
            },
            {
                "original": "Chicken",
                "substitute": "Paneer or tofu",
                "notes": "For vegetarian version"
            }
        ]
    },
    {
        "id": 8,
        "title": "Fish Tacos with Mango Salsa",
        "description": "Light, fresh, and bursting with flavor. Crispy fish topped with vibrant mango salsa in warm tortillas.",
        "category": "Lunch",
        "prepTime": "15 min",
        "cookTime": "10 min",
        "totalTime": "25 min",
        "servings": 4,
        "rating": 4.7,
        "image": "🌮",
        "color": "bg-yellow-100 text-yellow-700",
        "difficulty": "Easy",
        "tags": [
            "Mexican",
            "Seafood",
            "Fresh",
            "Quick"
        ],
        "ingredients": [
            {
                "name": "White Fish Fillets",
                "amount": "500",
                "unit": "g",
                "notes": "cod or tilapia"
            },
            {
                "name": "Flour Tortillas",
                "amount": "8",
                "unit": "small"
            },
            {
                "name": "Ripe Mango",
                "amount": "1",
                "unit": "large",
                "notes": "diced"
            },
            {
                "name": "Red Onion",
                "amount": "1/4",
                "unit": "cup",
                "notes": "finely diced"
            },
            {
                "name": "Cilantro",
                "amount": "1/4",
                "unit": "cup",
                "notes": "chopped"
            },
            {
                "name": "Lime",
                "amount": "2",
                "unit": "whole"
            },
            {
                "name": "Jalapeño",
                "amount": "1",
                "unit": "small",
                "notes": "seeded, minced"
            },
            {
                "name": "Cumin",
                "amount": "1",
                "unit": "tsp"
            },
            {
                "name": "Cabbage",
                "amount": "2",
                "unit": "cups",
                "notes": "shredded"
            }
        ],
        "steps": [
            "Make salsa: combine mango, red onion, cilantro, jalapeño, and lime juice.",
            "Season fish with cumin, salt, pepper, and lime zest.",
            "Pan-fry or grill fish for 3-4 minutes per side until flaky.",
            "Warm tortillas in a dry pan.",
            "Break fish into chunks and divide among tortillas.",
            "Top with shredded cabbage and mango salsa.",
            "Drizzle with lime crema if desired. Serve immediately."
        ],
        "nutrition": {
            "calories": 340,
            "protein": 28,
            "carbs": 38,
            "fat": 8,
            "fiber": 4,
            "sugar": 12,
            "sodium": 420
        },
        "chefTips": [
            "Use firm white fish that won't fall apart when cooking.",
            "Char the tortillas slightly for extra flavor.",
            "The salsa can be made ahead and refrigerated."
        ],
        "substitutions": [
            {
                "original": "Fish",
                "substitute": "Grilled shrimp",
                "notes": "Equally delicious alternative"
            },
            {
                "original": "Mango",
                "substitute": "Pineapple",
                "notes": "Different tropical twist"
            }
        ]
    },
    {
        "id": 9,
        "title": "Pad Thai",
        "description": "Thailand's famous stir-fried noodles with a perfect balance of sweet, sour, and savory flavors.",
        "category": "Dinner",
        "prepTime": "20 min",
        "cookTime": "15 min",
        "totalTime": "35 min",
        "servings": 2,
        "rating": 4.8,
        "image": "🍜",
        "color": "bg-amber-100 text-amber-700",
        "difficulty": "Medium",
        "tags": [
            "Thai",
            "Noodles",
            "Asian",
            "Stir-fry"
        ],
        "ingredients": [
            {
                "name": "Rice Noodles",
                "amount": "200",
                "unit": "g"
            },
            {
                "name": "Shrimp",
                "amount": "200",
                "unit": "g",
                "notes": "peeled"
            },
            {
                "name": "Eggs",
                "amount": "2",
                "unit": "whole"
            },
            {
                "name": "Bean Sprouts",
                "amount": "1",
                "unit": "cup"
            },
            {
                "name": "Green Onions",
                "amount": "3",
                "unit": "stalks"
            },
            {
                "name": "Tamarind Paste",
                "amount": "3",
                "unit": "tbsp"
            },
            {
                "name": "Fish Sauce",
                "amount": "2",
                "unit": "tbsp"
            },
            {
                "name": "Brown Sugar",
                "amount": "2",
                "unit": "tbsp"
            },
            {
                "name": "Peanuts",
                "amount": "1/4",
                "unit": "cup",
                "notes": "crushed"
            },
            {
                "name": "Lime",
                "amount": "1",
                "unit": "whole"
            }
        ],
        "steps": [
            "Soak rice noodles in warm water for 30 minutes. Drain.",
            "Mix tamarind paste, fish sauce, and brown sugar for sauce.",
            "Heat oil in wok over high heat. Cook shrimp until pink. Set aside.",
            "Scramble eggs in the wok, then push to the side.",
            "Add noodles and sauce. Toss until coated and slightly caramelized.",
            "Add shrimp, bean sprouts, and green onions. Toss quickly.",
            "Serve topped with crushed peanuts, extra bean sprouts, and lime wedges."
        ],
        "nutrition": {
            "calories": 480,
            "protein": 24,
            "carbs": 62,
            "fat": 16,
            "fiber": 3,
            "sugar": 14,
            "sodium": 920
        },
        "chefTips": [
            "High heat is essential - work quickly to avoid soggy noodles.",
            "Tamarind paste is key; don't substitute with lime juice alone.",
            "Add a squeeze of lime just before eating for brightness."
        ],
        "substitutions": [
            {
                "original": "Shrimp",
                "substitute": "Chicken or tofu",
                "notes": "Equally authentic options"
            },
            {
                "original": "Fish Sauce",
                "substitute": "Soy sauce + salt",
                "notes": "For vegetarian version"
            }
        ]
    },
    {
        "id": 10,
        "title": "Greek Salad with Grilled Halloumi",
        "description": "A refreshing Mediterranean salad elevated with warm, crispy halloumi cheese.",
        "category": "Lunch",
        "prepTime": "10 min",
        "cookTime": "5 min",
        "totalTime": "15 min",
        "servings": 2,
        "rating": 4.6,
        "image": "🥒",
        "color": "bg-emerald-100 text-emerald-700",
        "difficulty": "Easy",
        "tags": [
            "Greek",
            "Salad",
            "Vegetarian",
            "Mediterranean"
        ],
        "ingredients": [
            {
                "name": "Halloumi Cheese",
                "amount": "200",
                "unit": "g"
            },
            {
                "name": "Cucumber",
                "amount": "1",
                "unit": "large",
                "notes": "chunked"
            },
            {
                "name": "Cherry Tomatoes",
                "amount": "200",
                "unit": "g",
                "notes": "halved"
            },
            {
                "name": "Red Onion",
                "amount": "1/2",
                "unit": "medium",
                "notes": "sliced"
            },
            {
                "name": "Kalamata Olives",
                "amount": "1/2",
                "unit": "cup"
            },
            {
                "name": "Extra Virgin Olive Oil",
                "amount": "3",
                "unit": "tbsp"
            },
            {
                "name": "Red Wine Vinegar",
                "amount": "1",
                "unit": "tbsp"
            },
            {
                "name": "Dried Oregano",
                "amount": "1",
                "unit": "tsp"
            }
        ],
        "steps": [
            "Slice halloumi into 1/2 inch thick pieces.",
            "Grill or pan-fry halloumi until golden on both sides (2-3 min per side).",
            "Combine cucumber, tomatoes, onion, and olives in a bowl.",
            "Whisk olive oil, vinegar, and oregano for dressing.",
            "Drizzle dressing over salad and toss gently.",
            "Top with warm halloumi slices.",
            "Season with salt, pepper, and extra oregano. Serve immediately."
        ],
        "nutrition": {
            "calories": 380,
            "protein": 18,
            "carbs": 14,
            "fat": 30,
            "fiber": 3,
            "sugar": 6,
            "sodium": 720
        },
        "chefTips": [
            "Don't skip the warm halloumi - it's the star of the dish!",
            "Pat halloumi dry before grilling for better browning.",
            "Add a drizzle of honey for a sweet contrast."
        ],
        "substitutions": [
            {
                "original": "Halloumi",
                "substitute": "Feta cheese",
                "notes": "Won't be grilled but still delicious"
            },
            {
                "original": "Kalamata Olives",
                "substitute": "Green olives",
                "notes": "Different but equally tasty"
            }
        ]
    },
    {
        "id": 11,
        "title": "Japanese Ramen",
        "description": "Rich, umami-packed noodle soup with tender chashu pork, soft-boiled eggs, and all the fixings.",
        "category": "Dinner",
        "prepTime": "30 min",
        "cookTime": "3 hrs",
        "totalTime": "3.5 hrs",
        "servings": 4,
        "rating": 4.9,
        "image": "🍜",
        "color": "bg-yellow-100 text-yellow-800",
        "difficulty": "Hard",
        "tags": [
            "Japanese",
            "Soup",
            "Noodles",
            "Umami"
        ],
        "ingredients": [
            {
                "name": "Ramen Noodles",
                "amount": "400",
                "unit": "g"
            },
            {
                "name": "Pork Belly",
                "amount": "500",
                "unit": "g"
            },
            {
                "name": "Chicken Stock",
                "amount": "8",
                "unit": "cups"
            },
            {
                "name": "Soy Sauce",
                "amount": "1/2",
                "unit": "cup"
            },
            {
                "name": "Mirin",
                "amount": "1/4",
                "unit": "cup"
            },
            {
                "name": "Soft-Boiled Eggs",
                "amount": "4",
                "unit": "whole"
            },
            {
                "name": "Green Onions",
                "amount": "4",
                "unit": "stalks"
            },
            {
                "name": "Nori Sheets",
                "amount": "4",
                "unit": "sheets"
            },
            {
                "name": "Sesame Oil",
                "amount": "1",
                "unit": "tbsp"
            }
        ],
        "steps": [
            "Braise pork belly in soy sauce, mirin, and water for 2-3 hours until tender.",
            "Prepare soft-boiled eggs (6.5 min in boiling water). Marinate in soy mixture.",
            "Build broth: simmer chicken stock with aromatics and some braising liquid.",
            "Slice chashu pork into thin rounds.",
            "Cook ramen noodles according to package directions.",
            "Divide noodles among bowls. Ladle hot broth over.",
            "Top with chashu, halved marinated egg, nori, and sliced green onions.",
            "Drizzle with sesame oil and serve immediately."
        ],
        "nutrition": {
            "calories": 680,
            "protein": 42,
            "carbs": 58,
            "fat": 32,
            "fiber": 2,
            "sugar": 8,
            "sodium": 1450
        },
        "chefTips": [
            "The longer you braise the pork, the more tender it becomes.",
            "Marinate eggs overnight for the best flavor penetration.",
            "Don't overcook the noodles - they continue cooking in hot broth."
        ],
        "substitutions": [
            {
                "original": "Pork Belly",
                "substitute": "Chicken thighs",
                "notes": "Lighter option, still flavorful"
            },
            {
                "original": "Ramen Noodles",
                "substitute": "Udon noodles",
                "notes": "Thicker, chewier texture"
            }
        ]
    },
    {
        "id": 12,
        "title": "Banana Bread",
        "description": "Moist, tender, and perfectly sweet. The best use for overripe bananas.",
        "category": "Dessert",
        "prepTime": "15 min",
        "cookTime": "55 min",
        "totalTime": "1 hr 10 min",
        "servings": 10,
        "rating": 4.8,
        "image": "🍌",
        "color": "bg-yellow-100 text-yellow-700",
        "difficulty": "Easy",
        "tags": [
            "Baking",
            "Comfort Food",
            "Breakfast",
            "Snack"
        ],
        "ingredients": [
            {
                "name": "Ripe Bananas",
                "amount": "3",
                "unit": "large",
                "notes": "very ripe, spotted"
            },
            {
                "name": "All-Purpose Flour",
                "amount": "1.5",
                "unit": "cups"
            },
            {
                "name": "Sugar",
                "amount": "3/4",
                "unit": "cup"
            },
            {
                "name": "Butter",
                "amount": "1/3",
                "unit": "cup",
                "notes": "melted"
            },
            {
                "name": "Egg",
                "amount": "1",
                "unit": "large"
            },
            {
                "name": "Baking Soda",
                "amount": "1",
                "unit": "tsp"
            },
            {
                "name": "Salt",
                "amount": "1/4",
                "unit": "tsp"
            },
            {
                "name": "Vanilla Extract",
                "amount": "1",
                "unit": "tsp"
            },
            {
                "name": "Walnuts",
                "amount": "1/2",
                "unit": "cup",
                "notes": "optional, chopped"
            }
        ],
        "steps": [
            "Preheat oven to 350°F (175°C). Grease a 9x5 inch loaf pan.",
            "Mash bananas in a large bowl until smooth.",
            "Mix in melted butter, then egg and vanilla.",
            "Add sugar, baking soda, and salt. Mix well.",
            "Fold in flour until just combined. Don't overmix.",
            "Fold in walnuts if using.",
            "Pour into prepared pan and bake for 55-60 minutes.",
            "Test with a toothpick - it should come out clean."
        ],
        "nutrition": {
            "calories": 220,
            "protein": 3,
            "carbs": 38,
            "fat": 7,
            "fiber": 2,
            "sugar": 22,
            "sodium": 180
        },
        "chefTips": [
            "The riper the bananas, the sweeter and more flavorful the bread.",
            "Freeze overripe bananas for future baking.",
            "Add chocolate chips for an extra indulgent version."
        ],
        "substitutions": [
            {
                "original": "All-Purpose Flour",
                "substitute": "Whole wheat flour",
                "notes": "Denser but healthier"
            },
            {
                "original": "Sugar",
                "substitute": "Honey or maple syrup",
                "notes": "Reduce liquid slightly"
            }
        ]
    },
    {
        "id": 13,
        "title": "Shakshuka",
        "description": "Eggs poached in a spiced tomato sauce - a beloved Middle Eastern breakfast dish.",
        "category": "Breakfast",
        "prepTime": "10 min",
        "cookTime": "25 min",
        "totalTime": "35 min",
        "servings": 4,
        "rating": 4.7,
        "image": "🍳",
        "color": "bg-red-100 text-red-700",
        "difficulty": "Easy",
        "tags": [
            "Middle Eastern",
            "Vegetarian",
            "One-Pan",
            "Brunch"
        ],
        "ingredients": [
            {
                "name": "Eggs",
                "amount": "6",
                "unit": "large"
            },
            {
                "name": "Canned Tomatoes",
                "amount": "800",
                "unit": "g",
                "notes": "crushed"
            },
            {
                "name": "Onion",
                "amount": "1",
                "unit": "large"
            },
            {
                "name": "Bell Pepper",
                "amount": "1",
                "unit": "red"
            },
            {
                "name": "Garlic",
                "amount": "3",
                "unit": "cloves"
            },
            {
                "name": "Cumin",
                "amount": "1",
                "unit": "tsp"
            },
            {
                "name": "Paprika",
                "amount": "1",
                "unit": "tsp"
            },
            {
                "name": "Cayenne",
                "amount": "1/4",
                "unit": "tsp"
            },
            {
                "name": "Feta Cheese",
                "amount": "100",
                "unit": "g",
                "notes": "crumbled"
            },
            {
                "name": "Fresh Parsley",
                "amount": "2",
                "unit": "tbsp"
            }
        ],
        "steps": [
            "Sauté onion and bell pepper in olive oil until soft.",
            "Add garlic and spices. Cook for 1 minute.",
            "Pour in crushed tomatoes. Simmer for 10 minutes.",
            "Create 6 wells in the sauce with the back of a spoon.",
            "Crack an egg into each well.",
            "Cover and cook on low for 8-10 minutes until whites are set.",
            "Sprinkle with feta and parsley.",
            "Serve directly from the pan with crusty bread."
        ],
        "nutrition": {
            "calories": 240,
            "protein": 14,
            "carbs": 16,
            "fat": 14,
            "fiber": 4,
            "sugar": 8,
            "sodium": 520
        },
        "chefTips": [
            "Keep the heat low to ensure eggs cook gently.",
            "Cover the pan to cook the egg tops with steam.",
            "The sauce can be made ahead and reheated before adding eggs."
        ],
        "substitutions": [
            {
                "original": "Feta",
                "substitute": "Goat cheese",
                "notes": "Tangier flavor"
            },
            {
                "original": "Cayenne",
                "substitute": "Harissa paste",
                "notes": "More complex heat"
            }
        ]
    },
    {
        "id": 14,
        "title": "Chicken Tikka Masala",
        "description": "Britain's favorite curry - tender chicken pieces in a creamy, spiced tomato sauce.",
        "category": "Dinner",
        "prepTime": "20 min",
        "cookTime": "30 min",
        "totalTime": "50 min",
        "servings": 4,
        "rating": 4.8,
        "image": "🍗",
        "color": "bg-orange-100 text-orange-600",
        "difficulty": "Medium",
        "tags": [
            "Indian",
            "British",
            "Curry",
            "Popular"
        ],
        "ingredients": [
            {
                "name": "Chicken Breast",
                "amount": "600",
                "unit": "g",
                "notes": "cubed"
            },
            {
                "name": "Yogurt",
                "amount": "1",
                "unit": "cup"
            },
            {
                "name": "Tikka Masala Paste",
                "amount": "4",
                "unit": "tbsp"
            },
            {
                "name": "Onion",
                "amount": "1",
                "unit": "large"
            },
            {
                "name": "Garlic",
                "amount": "3",
                "unit": "cloves"
            },
            {
                "name": "Tomato Sauce",
                "amount": "400",
                "unit": "g"
            },
            {
                "name": "Heavy Cream",
                "amount": "200",
                "unit": "ml"
            },
            {
                "name": "Garam Masala",
                "amount": "1",
                "unit": "tsp"
            },
            {
                "name": "Fresh Cilantro",
                "amount": "2",
                "unit": "tbsp"
            }
        ],
        "steps": [
            "Marinate chicken in yogurt and half the tikka paste for 2 hours.",
            "Grill or broil chicken until charred. Set aside.",
            "Sauté onion until golden. Add garlic and remaining paste.",
            "Add tomato sauce and simmer for 15 minutes.",
            "Stir in cream and garam masala.",
            "Add chicken pieces and simmer for 10 minutes.",
            "Garnish with cilantro and serve with rice or naan."
        ],
        "nutrition": {
            "calories": 480,
            "protein": 36,
            "carbs": 18,
            "fat": 30,
            "fiber": 3,
            "sugar": 10,
            "sodium": 780
        },
        "chefTips": [
            "Charring the chicken adds essential smoky flavor.",
            "Don't boil after adding cream - it may curdle.",
            "Make it a day ahead for even better flavor."
        ],
        "substitutions": [
            {
                "original": "Tikka Paste",
                "substitute": "Garam masala + paprika + cumin",
                "notes": "Homemade spice blend"
            },
            {
                "original": "Cream",
                "substitute": "Coconut milk",
                "notes": "Dairy-free with tropical notes"
            }
        ]
    },
    {
        "id": 101,
        "title": "Classic Margherita Pizza",
        "description": "A delicious Italian dinner that is perfect for any occasion. It takes about 20 mins to prepare.",
        "category": "Dinner",
        "prepTime": "20 min",
        "cookTime": "15 min",
        "totalTime": "35 min",
        "servings": 4,
        "rating": 4.6,
        "image": "🍕",
        "color": "bg-red-100 text-red-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Pizza dough",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "पिज्जा का गुंथा हुआ आटा"
            },
            {
                "name": "Tomato sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टमाटर सॉस"
            },
            {
                "name": "Fresh mozzarella cheese",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताजा मोत्ज़ारेला पनीर"
            },
            {
                "name": "Fresh basil leaves",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताजा तुलसी के पत्ते"
            },
            {
                "name": "Olive oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "जैतून का तेल"
            },
            {
                "name": "Salt and pepper to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक और काली मिर्च स्वादानुसार"
            }
        ],
        "steps": [
            "Preheat the oven to 475°F (245°C).",
            "Roll out the pizza dough and spread tomato sauce evenly.",
            "Top with slices of fresh mozzarella and fresh basil leaves.",
            "Drizzle with olive oil and season with salt and pepper.",
            "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
            "Slice and serve hot."
        ],
        "nutrition": {
            "calories": 300,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Italian",
            "Pizza",
            "Italian"
        ],
        "titleHindi": "क्लासिक मार्गेरिटा पिज़्ज़ा",
        "descriptionHindi": "एक स्वादिष्ट इतालवी रात्रिभोज जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 20 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "ओवन को 475°F (245°C) पर पहले से गरम कर लें।",
            "पिज़्ज़ा के आटे को बेलें और टमाटर सॉस को समान रूप से फैलाएं।",
            "ऊपर से ताजा मोत्ज़ारेला के टुकड़े और ताजी तुलसी की पत्तियां डालें।",
            "जैतून का तेल छिड़कें और नमक और काली मिर्च डालें।",
            "पहले से गरम ओवन में 12-15 मिनट तक या परत के सुनहरा भूरा होने तक बेक करें।",
            "काट कर गरमागरम परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 102,
        "title": "Vegetarian Stir-Fry",
        "description": "A delicious Asian lunch that is perfect for any occasion. It takes about 15 mins to prepare.",
        "category": "Lunch",
        "prepTime": "15 min",
        "cookTime": "20 min",
        "totalTime": "35 min",
        "servings": 3,
        "rating": 4.7,
        "image": "🍔",
        "color": "bg-orange-100 text-orange-600",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Tofu, cubed",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टोफू, क्यूब्ड"
            },
            {
                "name": "Broccoli florets",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ब्रोकोली फ्लोरेट्स"
            },
            {
                "name": "Carrots, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "गाजर, कटी हुई"
            },
            {
                "name": "Bell peppers, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "शिमला मिर्च, कटी हुई"
            },
            {
                "name": "Soy sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "सोया सॉस"
            },
            {
                "name": "Ginger, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अदरक, कीमा बनाया हुआ"
            },
            {
                "name": "Garlic, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लहसुन, कीमा बनाया हुआ"
            },
            {
                "name": "Sesame oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "तिल का तेल"
            },
            {
                "name": "Cooked rice for serving",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "परोसने के लिए पका हुआ चावल"
            }
        ],
        "steps": [
            "In a wok, heat sesame oil over medium-high heat.",
            "Add minced ginger and garlic, sauté until fragrant.",
            "Add cubed tofu and stir-fry until golden brown.",
            "Add broccoli, carrots, and bell peppers. Cook until vegetables are tender-crisp.",
            "Pour soy sauce over the stir-fry and toss to combine.",
            "Serve over cooked rice."
        ],
        "nutrition": {
            "calories": 250,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Asian",
            "Vegetarian",
            "Stir-fry",
            "Asian"
        ],
        "titleHindi": "शाकाहारी स्टिर-फ्राई",
        "descriptionHindi": "एक स्वादिष्ट एशियाई दोपहर का भोजन जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 15 मिनट का समय लगता है.",
        "categoryHindi": "दिन का खाना",
        "stepsHindi": [
            "एक कड़ाही में मध्यम-तेज़ आंच पर तिल का तेल गर्म करें।",
            "कीमा बनाया हुआ अदरक और लहसुन डालें, महक आने तक भूनें।",
            "कटा हुआ टोफू डालें और सुनहरा भूरा होने तक भूनें।",
            "ब्रोकली, गाजर और शिमला मिर्च डालें। सब्ज़ियों के नरम-कुरकुरा होने तक पकाएँ।",
            "स्टर-फ्राई के ऊपर सोया सॉस डालें और मिलाने के लिए टॉस करें।",
            "पके हुए चावल के ऊपर परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 103,
        "title": "Chocolate Chip Cookies",
        "description": "A delicious American snack that is perfect for any occasion. It takes about 15 mins to prepare.",
        "category": "Snack",
        "prepTime": "15 min",
        "cookTime": "10 min",
        "totalTime": "25 min",
        "servings": 24,
        "rating": 4.9,
        "image": "🍖",
        "color": "bg-amber-100 text-amber-700",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "All-purpose flour",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बहु - उद्देश्यीय आटा"
            },
            {
                "name": "Butter, softened",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "मक्खन नरम हो गया"
            },
            {
                "name": "Brown sugar",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ब्राउन शुगर"
            },
            {
                "name": "White sugar",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "सफ़ेद चीनी"
            },
            {
                "name": "Eggs",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अंडे"
            },
            {
                "name": "Vanilla extract",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "वेनीला सत्र"
            },
            {
                "name": "Baking soda",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "मीठा सोडा"
            },
            {
                "name": "Salt",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक"
            },
            {
                "name": "Chocolate chips",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चॉकलेट चिप्स"
            }
        ],
        "steps": [
            "Preheat the oven to 350°F (175°C).",
            "In a bowl, cream together softened butter, brown sugar, and white sugar.",
            "Beat in eggs one at a time, then stir in vanilla extract.",
            "Combine flour, baking soda, and salt. Gradually add to the wet ingredients.",
            "Fold in chocolate chips.",
            "Drop rounded tablespoons of dough onto ungreased baking sheets.",
            "Bake for 10-12 minutes or until edges are golden brown.",
            "Allow cookies to cool on the baking sheet for a few minutes before transferring to a wire rack."
        ],
        "nutrition": {
            "calories": 150,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "American",
            "Cookies",
            "Dessert",
            "Baking"
        ],
        "titleHindi": "चॉकलेट चिप कुकीज",
        "descriptionHindi": "एक स्वादिष्ट अमेरिकी नाश्ता जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 15 मिनट का समय लगता है.",
        "categoryHindi": "नाश्ता",
        "stepsHindi": [
            "ओवन को 350°F (175°C) पर पहले से गरम कर लें।",
            "एक कटोरे में, क्रीम ने मक्खन, ब्राउन शुगर और सफेद चीनी को एक साथ नरम कर दिया।",
            "एक-एक करके अंडे फेंटें, फिर वेनिला अर्क मिलाएँ।",
            "आटा, बेकिंग सोडा और नमक मिलाएं। धीरे-धीरे गीली सामग्री डालें।",
            "चॉकलेट चिप्स में मोड़ो.",
            "बिना ग्रीस की हुई बेकिंग शीट पर गोल बड़े चम्मच आटा डालें।",
            "10-12 मिनट तक या किनारों को सुनहरा भूरा होने तक बेक करें।",
            "वायर रैक पर स्थानांतरित करने से पहले कुकीज़ को बेकिंग शीट पर कुछ मिनट के लिए ठंडा होने दें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 104,
        "title": "Chicken Alfredo Pasta",
        "description": "A delicious Italian lunch that is perfect for any occasion. It takes about 15 mins to prepare.",
        "category": "Lunch",
        "prepTime": "15 min",
        "cookTime": "20 min",
        "totalTime": "35 min",
        "servings": 4,
        "rating": 4.9,
        "image": "🍗",
        "color": "bg-yellow-100 text-yellow-700",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Fettuccine pasta",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "फेटुकाइन पास्ता"
            },
            {
                "name": "Chicken breast, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चिकन ब्रेस्ट, कटा हुआ"
            },
            {
                "name": "Heavy cream",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "भारी क्रीम"
            },
            {
                "name": "Parmesan cheese, grated",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "परमेसन चीज़, कसा हुआ"
            },
            {
                "name": "Garlic, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लहसुन, कीमा बनाया हुआ"
            },
            {
                "name": "Butter",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "मक्खन"
            },
            {
                "name": "Salt and pepper to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक और काली मिर्च स्वादानुसार"
            },
            {
                "name": "Fresh parsley for garnish",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "गार्निश के लिए ताजा अजमोद"
            }
        ],
        "steps": [
            "Cook fettuccine pasta according to package instructions.",
            "In a pan, sauté sliced chicken in butter until fully cooked.",
            "Add minced garlic and cook until fragrant.",
            "Pour in heavy cream and grated Parmesan cheese. Stir until the cheese is melted.",
            "Season with salt and pepper to taste.",
            "Combine the Alfredo sauce with cooked pasta.",
            "Garnish with fresh parsley before serving."
        ],
        "nutrition": {
            "calories": 500,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Italian",
            "Pasta",
            "Chicken"
        ],
        "titleHindi": "चिकन अल्फ्रेडो पास्ता",
        "descriptionHindi": "एक स्वादिष्ट इतालवी दोपहर का भोजन जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 15 मिनट का समय लगता है.",
        "categoryHindi": "दिन का खाना",
        "stepsHindi": [
            "फेटुकाइन पास्ता को पैकेज के निर्देशों के अनुसार पकाएं।",
            "एक पैन में, कटे हुए चिकन को मक्खन में पूरी तरह पकने तक भूनें।",
            "कीमा बनाया हुआ लहसुन डालें और खुशबू आने तक पकाएँ।",
            "भारी क्रीम और कसा हुआ परमेसन चीज़ डालें। पनीर के पिघलने तक हिलाते रहें.",
            "स्वाद के लिए नमक व कालीमिर्च डालकर ज़ायकेदार बनाइए।",
            "पके हुए पास्ता के साथ अल्फ्रेडो सॉस मिलाएं।",
            "परोसने से पहले ताजा अजमोद से गार्निश करें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 105,
        "title": "Mango Salsa Chicken",
        "description": "A delicious Mexican dinner that is perfect for any occasion. It takes about 15 mins to prepare.",
        "category": "Dinner",
        "prepTime": "15 min",
        "cookTime": "25 min",
        "totalTime": "40 min",
        "servings": 3,
        "rating": 4.9,
        "image": "🍚",
        "color": "bg-green-100 text-green-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Chicken thighs",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चूज़े की जाँघ"
            },
            {
                "name": "Mango, diced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "आम, टुकड़ों में कटा हुआ"
            },
            {
                "name": "Red onion, finely chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लाल प्याज, बारीक कटा हुआ"
            },
            {
                "name": "Cilantro, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "धनिया, कटा हुआ"
            },
            {
                "name": "Lime juice",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नींबू का रस"
            },
            {
                "name": "Jalapeño, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "जलापेनो, कीमा"
            },
            {
                "name": "Salt and pepper to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक और काली मिर्च स्वादानुसार"
            },
            {
                "name": "Cooked rice for serving",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "परोसने के लिए पका हुआ चावल"
            }
        ],
        "steps": [
            "Season chicken thighs with salt and pepper.",
            "Grill or bake chicken until fully cooked.",
            "In a bowl, combine diced mango, chopped red onion, cilantro, minced jalapeño, and lime juice.",
            "Dice the cooked chicken and mix it with the mango salsa.",
            "Serve over cooked rice."
        ],
        "nutrition": {
            "calories": 380,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Mexican",
            "Chicken",
            "Salsa"
        ],
        "titleHindi": "मैंगो साल्सा चिकन",
        "descriptionHindi": "एक स्वादिष्ट मेक्सिकन रात्रिभोज जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 15 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "चिकन जांघों पर नमक और काली मिर्च छिड़कें।",
            "चिकन को पूरी तरह पकने तक ग्रिल या बेक करें।",
            "एक कटोरे में, कटा हुआ आम, कटा हुआ लाल प्याज, हरा धनिया, कीमा बनाया हुआ जलेपीनो और नीबू का रस मिलाएं।",
            "पके हुए चिकन के टुकड़े करें और इसे मैंगो सालसा के साथ मिलाएँ।",
            "पके हुए चावल के ऊपर परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 106,
        "title": "Quinoa Salad with Avocado",
        "description": "A delicious Mediterranean lunch that is perfect for any occasion. It takes about 20 mins to prepare.",
        "category": "Lunch",
        "prepTime": "20 min",
        "cookTime": "15 min",
        "totalTime": "35 min",
        "servings": 4,
        "rating": 4.4,
        "image": "🍲",
        "color": "bg-emerald-100 text-emerald-700",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Quinoa, cooked",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "क्विनोआ, पका हुआ"
            },
            {
                "name": "Avocado, diced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "एवोकाडो, टुकड़ों में कटा हुआ"
            },
            {
                "name": "Cherry tomatoes, halved",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चेरी टमाटर, आधा"
            },
            {
                "name": "Cucumber, diced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ककड़ी, टुकड़ों में कटा हुआ"
            },
            {
                "name": "Red bell pepper, diced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लाल शिमला मिर्च, टुकड़ों में कटा हुआ"
            },
            {
                "name": "Feta cheese, crumbled",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "फ़ेटा चीज़, टुकड़ों में कटा हुआ"
            },
            {
                "name": "Lemon vinaigrette dressing",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नींबू विनाइग्रेटे ड्रेसिंग"
            },
            {
                "name": "Salt and pepper to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक और काली मिर्च स्वादानुसार"
            }
        ],
        "steps": [
            "In a large bowl, combine cooked quinoa, diced avocado, halved cherry tomatoes, diced cucumber, diced red bell pepper, and crumbled feta cheese.",
            "Drizzle with lemon vinaigrette dressing and toss to combine.",
            "Season with salt and pepper to taste.",
            "Chill in the refrigerator before serving."
        ],
        "nutrition": {
            "calories": 280,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Mediterranean",
            "Salad",
            "Quinoa"
        ],
        "titleHindi": "एवोकैडो के साथ क्विनोआ सलाद",
        "descriptionHindi": "एक स्वादिष्ट भूमध्यसागरीय दोपहर का भोजन जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 20 मिनट का समय लगता है.",
        "categoryHindi": "दिन का खाना",
        "stepsHindi": [
            "एक बड़े कटोरे में, पका हुआ क्विनोआ, कटा हुआ एवोकैडो, आधा चेरी टमाटर, कटा हुआ खीरा, कटा हुआ लाल बेल मिर्च और क्रम्बल किया हुआ फेटा चीज़ मिलाएं।",
            "नींबू विनैग्रेट ड्रेसिंग के साथ बूंदा बांदी करें और मिलाने के लिए टॉस करें।",
            "स्वाद के लिए नमक व कालीमिर्च डालकर ज़ायकेदार बनाइए।",
            "परोसने से पहले रेफ्रिजरेटर में ठंडा करें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 107,
        "title": "Tomato Basil Bruschetta",
        "description": "A delicious Italian appetizer that is perfect for any occasion. It takes about 15 mins to prepare.",
        "category": "Appetizer",
        "prepTime": "15 min",
        "cookTime": "10 min",
        "totalTime": "25 min",
        "servings": 6,
        "rating": 4.7,
        "image": "🍝",
        "color": "bg-teal-100 text-teal-700",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Baguette, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बगुएट, कटा हुआ"
            },
            {
                "name": "Tomatoes, diced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टमाटर, टुकड़ों में काट लें"
            },
            {
                "name": "Fresh basil, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताजी तुलसी, कटी हुई"
            },
            {
                "name": "Garlic cloves, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लहसुन की कलियाँ, कीमा बनाया हुआ"
            },
            {
                "name": "Balsamic glaze",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बाल्सेमिक शीशा लगाना"
            },
            {
                "name": "Olive oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "जैतून का तेल"
            },
            {
                "name": "Salt and pepper to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक और काली मिर्च स्वादानुसार"
            }
        ],
        "steps": [
            "Preheat the oven to 375°F (190°C).",
            "Place baguette slices on a baking sheet and toast in the oven until golden brown.",
            "In a bowl, combine diced tomatoes, chopped fresh basil, minced garlic, and a drizzle of olive oil.",
            "Season with salt and pepper to taste.",
            "Top each toasted baguette slice with the tomato-basil mixture.",
            "Drizzle with balsamic glaze before serving."
        ],
        "nutrition": {
            "calories": 120,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Italian",
            "Bruschetta",
            "Italian"
        ],
        "titleHindi": "टमाटर तुलसी ब्रुशेटा",
        "descriptionHindi": "एक स्वादिष्ट इतालवी ऐपेटाइज़र जो किसी भी अवसर के लिए बिल्कुल उपयुक्त है। इसे तैयार करने में लगभग 15 मिनट का समय लगता है.",
        "categoryHindi": "क्षुधावर्धक",
        "stepsHindi": [
            "ओवन को 375°F (190°C) पर पहले से गरम कर लें।",
            "बेकिंग शीट पर बैगूएट स्लाइस रखें और सुनहरा भूरा होने तक ओवन में टोस्ट करें।",
            "एक कटोरे में, कटे हुए टमाटर, कटी हुई ताजी तुलसी, कीमा बनाया हुआ लहसुन और थोड़ा सा जैतून का तेल मिलाएं।",
            "स्वाद के लिए नमक व कालीमिर्च डालकर ज़ायकेदार बनाइए।",
            "प्रत्येक टोस्टेड बैगूएट स्लाइस के ऊपर टमाटर-तुलसी का मिश्रण डालें।",
            "परोसने से पहले बाल्समिक ग्लेज़ छिड़कें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 108,
        "title": "Beef and Broccoli Stir-Fry",
        "description": "A delicious Asian dinner that is perfect for any occasion. It takes about 20 mins to prepare.",
        "category": "Dinner",
        "prepTime": "20 min",
        "cookTime": "15 min",
        "totalTime": "35 min",
        "servings": 4,
        "rating": 4.7,
        "image": "🍠",
        "color": "bg-blue-100 text-blue-600",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Beef sirloin, thinly sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बीफ़ सिरोलिन, पतला कटा हुआ"
            },
            {
                "name": "Broccoli florets",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ब्रोकोली फ्लोरेट्स"
            },
            {
                "name": "Soy sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "सोया सॉस"
            },
            {
                "name": "Oyster sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "कस्तूरा सॉस"
            },
            {
                "name": "Sesame oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "तिल का तेल"
            },
            {
                "name": "Garlic, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लहसुन, कीमा बनाया हुआ"
            },
            {
                "name": "Ginger, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अदरक, कीमा बनाया हुआ"
            },
            {
                "name": "Cornstarch",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "कॉर्नस्टार्च"
            },
            {
                "name": "Cooked white rice for serving",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "परोसने के लिए पका हुआ सफेद चावल"
            }
        ],
        "steps": [
            "In a bowl, mix soy sauce, oyster sauce, sesame oil, and cornstarch to create the sauce.",
            "In a wok, stir-fry thinly sliced beef until browned. Remove from the wok.",
            "Stir-fry broccoli florets, minced garlic, and minced ginger in the same wok.",
            "Add the cooked beef back to the wok and pour the sauce over the mixture.",
            "Stir until everything is coated and heated through.",
            "Serve over cooked white rice."
        ],
        "nutrition": {
            "calories": 380,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Asian",
            "Beef",
            "Stir-fry",
            "Asian"
        ],
        "titleHindi": "बीफ और ब्रोकोली स्टिर-फ्राई",
        "descriptionHindi": "एक स्वादिष्ट एशियाई रात्रिभोज जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 20 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "सॉस बनाने के लिए एक कटोरे में सोया सॉस, ऑयस्टर सॉस, तिल का तेल और कॉर्नस्टार्च मिलाएं।",
            "एक कड़ाही में, पतले कटे हुए गोमांस को भूरा होने तक भूनें। कड़ाही से निकाल लें.",
            "उसी कड़ाही में ब्रोकोली के फूल, बारीक कटा हुआ लहसुन और बारीक कटा हुआ अदरक डालकर भूनें।",
            "पका हुआ बीफ़ वापस कड़ाही में डालें और मिश्रण के ऊपर सॉस डालें।",
            "तब तक हिलाएं जब तक कि सभी चीजों पर लेप न लग जाए और गर्म न हो जाए।",
            "पके हुए सफेद चावल के ऊपर परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 109,
        "title": "Caprese Salad",
        "description": "A delicious Italian lunch that is perfect for any occasion. It takes about 10 mins to prepare.",
        "category": "Lunch",
        "prepTime": "10 min",
        "cookTime": "15 min",
        "totalTime": "25 min",
        "servings": 2,
        "rating": 4.6,
        "image": "🍢",
        "color": "bg-purple-100 text-purple-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Tomatoes, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टमाटर, कटे हुए"
            },
            {
                "name": "Fresh mozzarella cheese, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताजा मोत्ज़ारेला पनीर, कटा हुआ"
            },
            {
                "name": "Fresh basil leaves",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताजा तुलसी के पत्ते"
            },
            {
                "name": "Balsamic glaze",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बाल्सेमिक शीशा लगाना"
            },
            {
                "name": "Extra virgin olive oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अतिरिक्त वर्जिन जैतून का तेल"
            },
            {
                "name": "Salt and pepper to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक और काली मिर्च स्वादानुसार"
            }
        ],
        "steps": [
            "Arrange alternating slices of tomatoes and fresh mozzarella on a serving platter.",
            "Tuck fresh basil leaves between the slices.",
            "Drizzle with balsamic glaze and extra virgin olive oil.",
            "Season with salt and pepper to taste.",
            "Serve immediately as a refreshing salad."
        ],
        "nutrition": {
            "calories": 200,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Italian",
            "Salad",
            "Caprese"
        ],
        "titleHindi": "कैप्रीज़ सलाद",
        "descriptionHindi": "एक स्वादिष्ट इतालवी दोपहर का भोजन जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 10 मिनट का समय लगता है.",
        "categoryHindi": "दिन का खाना",
        "stepsHindi": [
            "एक सर्विंग प्लेट पर बारी-बारी से टमाटर के टुकड़े और ताज़ा मोत्ज़ारेला रखें।",
            "स्लाइस के बीच ताजी तुलसी की पत्तियां दबा दें।",
            "बाल्समिक ग्लेज़ और अतिरिक्त कुंवारी जैतून का तेल छिड़कें।",
            "स्वाद के लिए नमक व कालीमिर्च डालकर ज़ायकेदार बनाइए।",
            "ताज़ा सलाद के रूप में तुरंत परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 110,
        "title": "Shrimp Scampi Pasta",
        "description": "A delicious Italian dinner that is perfect for any occasion. It takes about 15 mins to prepare.",
        "category": "Dinner",
        "prepTime": "15 min",
        "cookTime": "20 min",
        "totalTime": "35 min",
        "servings": 3,
        "rating": 4.3,
        "image": "🍣",
        "color": "bg-pink-100 text-pink-600",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Linguine pasta",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "भाषाई पास्ता"
            },
            {
                "name": "Shrimp, peeled and deveined",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "झींगा, छिला हुआ और छिला हुआ"
            },
            {
                "name": "Garlic, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लहसुन, कीमा बनाया हुआ"
            },
            {
                "name": "White wine",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "सुनहरी वाइन"
            },
            {
                "name": "Lemon juice",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नींबू का रस"
            },
            {
                "name": "Red pepper flakes",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "रेड पेपर फ्लेक्स"
            },
            {
                "name": "Fresh parsley, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताज़ा अजमोद, कटा हुआ"
            },
            {
                "name": "Salt and pepper to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक और काली मिर्च स्वादानुसार"
            }
        ],
        "steps": [
            "Cook linguine pasta according to package instructions.",
            "In a skillet, sauté minced garlic in olive oil until fragrant.",
            "Add shrimp and cook until pink and opaque.",
            "Pour in white wine and lemon juice. Simmer until the sauce slightly thickens.",
            "Season with red pepper flakes, salt, and pepper.",
            "Toss cooked linguine in the shrimp scampi sauce.",
            "Garnish with chopped fresh parsley before serving."
        ],
        "nutrition": {
            "calories": 400,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Italian",
            "Pasta",
            "Shrimp"
        ],
        "titleHindi": "झींगा स्कैम्पी पास्ता",
        "descriptionHindi": "एक स्वादिष्ट इतालवी रात्रिभोज जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 15 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "भाषाई पास्ता को पैकेज के निर्देशों के अनुसार पकाएं।",
            "एक कड़ाही में, कीमा बनाया हुआ लहसुन को जैतून के तेल में सुगंधित होने तक भूनें।",
            "झींगा डालें और गुलाबी और अपारदर्शी होने तक पकाएँ।",
            "सफेद वाइन और नींबू का रस डालें। सॉस को थोड़ा गाढ़ा होने तक धीमी आंच पर पकाएं।",
            "लाल मिर्च के टुकड़े, नमक और काली मिर्च डालें।",
            "पकी हुई लिंगुइन को झींगा स्कैंपी सॉस में डालें।",
            "परोसने से पहले कटे हुए ताज़ा अजमोद से सजाएँ।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 111,
        "title": "Chicken Biryani",
        "description": "A delicious Pakistani lunch that is perfect for any occasion. It takes about 30 mins to prepare.",
        "category": "Lunch",
        "prepTime": "30 min",
        "cookTime": "45 min",
        "totalTime": "75 min",
        "servings": 6,
        "rating": 5,
        "image": "🥗",
        "color": "bg-red-100 text-red-600",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Basmati rice",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बासमती चावल"
            },
            {
                "name": "Chicken, cut into pieces",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चिकन, टुकड़ों में काट लें"
            },
            {
                "name": "Onions, thinly sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "प्याज़, पतले कटे हुए"
            },
            {
                "name": "Tomatoes, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टमाटर, कटे हुए"
            },
            {
                "name": "Yogurt",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "दही"
            },
            {
                "name": "Ginger-garlic paste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अदरक-लहसुन का पेस्ट"
            },
            {
                "name": "Biryani masala",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बिरयानी मसाला"
            },
            {
                "name": "Green chilies, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "हरी मिर्च, कटी हुई"
            },
            {
                "name": "Fresh coriander leaves",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताज़ा हरा धनिया"
            },
            {
                "name": "Mint leaves",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टकसाल के पत्ते"
            },
            {
                "name": "Ghee",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "घी"
            },
            {
                "name": "Salt to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक स्वाद अनुसार"
            }
        ],
        "steps": [
            "Marinate chicken with yogurt, ginger-garlic paste, biryani masala, and salt.",
            "In a pot, sauté sliced onions until golden brown. Remove half for later use.",
            "Layer marinated chicken, chopped tomatoes, half of the fried onions, and rice in the pot.",
            "Top with ghee, green chilies, fresh coriander leaves, mint leaves, and the remaining fried onions.",
            "Cover and cook on low heat until the rice is fully cooked and aromatic.",
            "Serve hot, garnished with additional coriander and mint leaves."
        ],
        "nutrition": {
            "calories": 550,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Pakistani",
            "Biryani",
            "Chicken",
            "Main course",
            "Indian",
            "Pakistani",
            "Asian"
        ],
        "titleHindi": "चिकन बिरयानी",
        "descriptionHindi": "एक स्वादिष्ट पाकिस्तानी लंच जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 30 मिनट का समय लगता है.",
        "categoryHindi": "दिन का खाना",
        "stepsHindi": [
            "चिकन को दही, अदरक-लहसुन पेस्ट, बिरयानी मसाला और नमक के साथ मैरीनेट करें।",
            "एक बर्तन में कटे हुए प्याज को सुनहरा भूरा होने तक भूनें। बाद में उपयोग के लिए आधा हटा दें।",
            "बर्तन में मैरीनेट किया हुआ चिकन, कटे हुए टमाटर, आधी तली हुई प्याज और चावल की परत लगाएं।",
            "ऊपर से घी, हरी मिर्च, ताजा हरा धनिया, पुदीना की पत्तियां और बचा हुआ तला हुआ प्याज डालें।",
            "ढककर धीमी आंच पर तब तक पकाएं जब तक कि चावल पूरी तरह से पक न जाए और खुशबूदार न हो जाए।",
            "अतिरिक्त धनिये और पुदीने की पत्तियों से सजाकर गरमागरम परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 112,
        "title": "Chicken Karahi",
        "description": "A delicious Pakistani lunch that is perfect for any occasion. It takes about 20 mins to prepare.",
        "category": "Lunch",
        "prepTime": "20 min",
        "cookTime": "30 min",
        "totalTime": "50 min",
        "servings": 4,
        "rating": 4.8,
        "image": "🥪",
        "color": "bg-orange-100 text-orange-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Chicken, cut into pieces",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चिकन, टुकड़ों में काट लें"
            },
            {
                "name": "Tomatoes, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टमाटर, कटे हुए"
            },
            {
                "name": "Green chilies, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "हरी मिर्च, कटी हुई"
            },
            {
                "name": "Ginger, julienned",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अदरक, जुलिएन्ड"
            },
            {
                "name": "Garlic, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लहसुन, कीमा बनाया हुआ"
            },
            {
                "name": "Coriander powder",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "धनिया पाउडर"
            },
            {
                "name": "Cumin powder",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "जीरा पाउडर"
            },
            {
                "name": "Red chili powder",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लाल मिर्च पाउडर"
            },
            {
                "name": "Garam masala",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "गरम मसाला"
            },
            {
                "name": "Cooking oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "खाना पकाने का तेल"
            },
            {
                "name": "Fresh coriander leaves",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताज़ा हरा धनिया"
            },
            {
                "name": "Salt to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक स्वाद अनुसार"
            }
        ],
        "steps": [
            "In a wok (karahi), heat cooking oil and sauté minced garlic until golden brown.",
            "Add chicken pieces and cook until browned on all sides.",
            "Add chopped tomatoes, green chilies, ginger, and spices. Cook until tomatoes are soft.",
            "Cover and simmer until the chicken is tender and the oil separates from the masala.",
            "Garnish with fresh coriander leaves and serve hot with naan or rice."
        ],
        "nutrition": {
            "calories": 420,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Pakistani",
            "Chicken",
            "Karahi",
            "Main course",
            "Indian",
            "Pakistani",
            "Asian"
        ],
        "titleHindi": "चिकन कराही",
        "descriptionHindi": "एक स्वादिष्ट पाकिस्तानी लंच जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 20 मिनट का समय लगता है.",
        "categoryHindi": "दिन का खाना",
        "stepsHindi": [
            "एक कड़ाही में, खाना पकाने का तेल गरम करें और कीमा बनाया हुआ लहसुन सुनहरा भूरा होने तक भूनें।",
            "चिकन के टुकड़े डालें और सभी तरफ से भूरा होने तक पकाएं।",
            "कटे हुए टमाटर, हरी मिर्च, अदरक और मसाले डालें। टमाटर के नरम होने तक पकाएं.",
            "ढककर तब तक पकाएं जब तक चिकन नरम न हो जाए और मसाले से तेल अलग न हो जाए।",
            "ताजी हरी धनिया से सजाकर नान या चावल के साथ गरमागरम परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 113,
        "title": "Aloo Keema",
        "description": "A delicious Pakistani lunch that is perfect for any occasion. It takes about 25 mins to prepare.",
        "category": "Lunch",
        "prepTime": "25 min",
        "cookTime": "35 min",
        "totalTime": "60 min",
        "servings": 5,
        "rating": 4.6,
        "image": "🍳",
        "color": "bg-amber-100 text-amber-700",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Ground beef",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ग्राउंड बीफ़"
            },
            {
                "name": "Potatoes, peeled and diced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "आलू, छीलकर टुकड़ों में काट लें"
            },
            {
                "name": "Onions, finely chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "प्याज, बारीक कटा हुआ"
            },
            {
                "name": "Tomatoes, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टमाटर, कटे हुए"
            },
            {
                "name": "Ginger-garlic paste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अदरक-लहसुन का पेस्ट"
            },
            {
                "name": "Cumin powder",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "जीरा पाउडर"
            },
            {
                "name": "Coriander powder",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "धनिया पाउडर"
            },
            {
                "name": "Turmeric powder",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "हल्दी पाउडर"
            },
            {
                "name": "Red chili powder",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लाल मिर्च पाउडर"
            },
            {
                "name": "Cooking oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "खाना पकाने का तेल"
            },
            {
                "name": "Fresh coriander leaves",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताज़ा हरा धनिया"
            },
            {
                "name": "Salt to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक स्वाद अनुसार"
            }
        ],
        "steps": [
            "In a pan, heat cooking oil and sauté chopped onions until golden brown.",
            "Add ginger-garlic paste and sauté until fragrant.",
            "Add ground beef and cook until browned. Drain excess oil if needed.",
            "Add diced potatoes, chopped tomatoes, and spices. Mix well.",
            "Cover and simmer until the potatoes are tender and the masala is well-cooked.",
            "Garnish with fresh coriander leaves and serve hot with naan or rice."
        ],
        "nutrition": {
            "calories": 380,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Pakistani",
            "Keema",
            "Potatoes",
            "Main course",
            "Pakistani",
            "Asian"
        ],
        "titleHindi": "आलू कीमा",
        "descriptionHindi": "एक स्वादिष्ट पाकिस्तानी लंच जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 25 मिनट का समय लगता है.",
        "categoryHindi": "दिन का खाना",
        "stepsHindi": [
            "एक पैन में, खाना पकाने का तेल गरम करें और कटे हुए प्याज को सुनहरा भूरा होने तक भूनें।",
            "-अदरक-लहसुन का पेस्ट डालें और खुशबू आने तक भूनें.",
            "पिसा हुआ बीफ़ डालें और भूरा होने तक पकाएँ। यदि आवश्यक हो तो अतिरिक्त तेल निकाल दें।",
            "कटे हुए आलू, कटे टमाटर और मसाले डालें। अच्छी तरह से मलाएं।",
            "ढककर धीमी आंच पर तब तक पकाएं जब तक कि आलू नरम न हो जाएं और मसाला अच्छी तरह पक न जाए।",
            "ताजी हरी धनिया से सजाकर नान या चावल के साथ गरमागरम परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 114,
        "title": "Chapli Kebabs",
        "description": "A delicious Pakistani lunch that is perfect for any occasion. It takes about 30 mins to prepare.",
        "category": "Lunch",
        "prepTime": "30 min",
        "cookTime": "20 min",
        "totalTime": "50 min",
        "servings": 4,
        "rating": 4.7,
        "image": "🥞",
        "color": "bg-yellow-100 text-yellow-700",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Ground beef",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ग्राउंड बीफ़"
            },
            {
                "name": "Onions, finely chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "प्याज, बारीक कटा हुआ"
            },
            {
                "name": "Tomatoes, finely chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टमाटर, बारीक कटा हुआ"
            },
            {
                "name": "Green chilies, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "हरी मिर्च, कटी हुई"
            },
            {
                "name": "Coriander leaves, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "हरा धनिया, कटा हुआ"
            },
            {
                "name": "Pomegranate seeds",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अनार के बीज"
            },
            {
                "name": "Ginger-garlic paste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अदरक-लहसुन का पेस्ट"
            },
            {
                "name": "Cumin powder",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "जीरा पाउडर"
            },
            {
                "name": "Coriander powder",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "धनिया पाउडर"
            },
            {
                "name": "Red chili powder",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लाल मिर्च पाउडर"
            },
            {
                "name": "Egg",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अंडा"
            },
            {
                "name": "Cooking oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "खाना पकाने का तेल"
            },
            {
                "name": "Salt to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक स्वाद अनुसार"
            }
        ],
        "steps": [
            "In a large bowl, mix ground beef, chopped onions, tomatoes, green chilies, coriander leaves, and pomegranate seeds.",
            "Add ginger-garlic paste, cumin powder, coriander powder, red chili powder, and salt. Mix well.",
            "Add an egg to bind the mixture and form into round flat kebabs.",
            "Heat cooking oil in a pan and shallow fry the kebabs until browned on both sides.",
            "Serve hot with naan or mint chutney."
        ],
        "nutrition": {
            "calories": 320,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Pakistani",
            "Kebabs",
            "Beef",
            "Indian",
            "Pakistani",
            "Asian"
        ],
        "titleHindi": "चपली कबाब",
        "descriptionHindi": "एक स्वादिष्ट पाकिस्तानी लंच जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 30 मिनट का समय लगता है.",
        "categoryHindi": "दिन का खाना",
        "stepsHindi": [
            "एक बड़े कटोरे में, ग्राउंड बीफ़, कटा हुआ प्याज, टमाटर, हरी मिर्च, हरा धनिया और अनार के बीज मिलाएं।",
            "अदरक-लहसुन का पेस्ट, जीरा पाउडर, धनिया पाउडर, लाल मिर्च पाउडर और नमक डालें. अच्छी तरह से मलाएं।",
            "मिश्रण को बांधने के लिए एक अंडा मिलाएं और गोल चपटे कबाब बनाएं।",
            "एक पैन में तेल गरम करें और कबाब को दोनों तरफ से ब्राउन होने तक तलें।",
            "नान या पुदीने की चटनी के साथ गरमागरम परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 115,
        "title": "Saag (Spinach) with Makki di Roti",
        "description": "A delicious Pakistani breakfast that is perfect for any occasion. It takes about 40 mins to prepare.",
        "category": "Breakfast",
        "prepTime": "40 min",
        "cookTime": "30 min",
        "totalTime": "70 min",
        "servings": 3,
        "rating": 4.3,
        "image": "🥘",
        "color": "bg-green-100 text-green-600",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Mustard greens, washed and chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "सरसों का साग, धोकर काट लें"
            },
            {
                "name": "Spinach, washed and chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "पालक, धोकर काट लीजिए"
            },
            {
                "name": "Cornmeal (makki ka atta)",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "मक्के का आटा (मक्के का आटा)"
            },
            {
                "name": "Onions, finely chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "प्याज, बारीक कटा हुआ"
            },
            {
                "name": "Green chilies, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "हरी मिर्च, कटी हुई"
            },
            {
                "name": "Ginger, grated",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अदरक, कद्दूकस किया हुआ"
            },
            {
                "name": "Ghee",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "घी"
            },
            {
                "name": "Salt to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक स्वाद अनुसार"
            }
        ],
        "steps": [
            "Boil mustard greens and spinach until tender. Drain and blend into a coarse paste.",
            "In a pan, sauté chopped onions, green chilies, and grated ginger in ghee until golden brown.",
            "Add the greens paste and cook until it thickens.",
            "Meanwhile, knead cornmeal with water to make a dough. Roll into rotis (flatbreads).",
            "Cook the rotis on a griddle until golden brown.",
            "Serve hot saag with makki di roti and a dollop of ghee."
        ],
        "nutrition": {
            "calories": 280,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Pakistani",
            "Saag",
            "Roti",
            "Main course",
            "Indian",
            "Pakistani",
            "Asian"
        ],
        "titleHindi": "मक्की दी रोटी के साथ साग (पालक)।",
        "descriptionHindi": "एक स्वादिष्ट पाकिस्तानी नाश्ता जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 40 मिनट का समय लगता है.",
        "categoryHindi": "नाश्ता",
        "stepsHindi": [
            "सरसों के साग और पालक को नरम होने तक उबालें। छानकर एक मोटा पेस्ट बना लें।",
            "एक पैन में घी में कटा हुआ प्याज, हरी मिर्च और कसा हुआ अदरक सुनहरा भूरा होने तक भूनें।",
            "साग का पेस्ट डालें और गाढ़ा होने तक पकाएं।",
            "इस बीच, आटा बनाने के लिए कॉर्नमील को पानी से गूंथ लें। रोटियां बेल लें।",
            "- रोटियों को तवे पर सुनहरा भूरा होने तक पकाएं.",
            "गरम साग को मक्की दी रोटी और एक चम्मच घी के साथ परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 116,
        "title": "Japanese Ramen Soup",
        "description": "A delicious Japanese dinner that is perfect for any occasion. It takes about 20 mins to prepare.",
        "category": "Dinner",
        "prepTime": "20 min",
        "cookTime": "25 min",
        "totalTime": "45 min",
        "servings": 2,
        "rating": 4.9,
        "image": "🍲",
        "color": "bg-emerald-100 text-emerald-700",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Ramen noodles",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "रेमन नूडल्स"
            },
            {
                "name": "Chicken broth",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चिकन शोरबा"
            },
            {
                "name": "Soy sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "सोया सॉस"
            },
            {
                "name": "Mirin",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "मिरिन"
            },
            {
                "name": "Sesame oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "तिल का तेल"
            },
            {
                "name": "Shiitake mushrooms, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "शीटाके मशरूम, कटा हुआ"
            },
            {
                "name": "Bok choy, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बोक चॉय, कटा हुआ"
            },
            {
                "name": "Green onions, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "हरा प्याज़, कटा हुआ"
            },
            {
                "name": "Soft-boiled eggs",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नरम उबले अंडे"
            },
            {
                "name": "Grilled chicken slices",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ग्रील्ड चिकन स्लाइस"
            },
            {
                "name": "Norwegian seaweed (nori)",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नॉर्वेजियन समुद्री शैवाल (नोरी)"
            }
        ],
        "steps": [
            "Cook ramen noodles according to package instructions and set aside.",
            "In a pot, combine chicken broth, soy sauce, mirin, and sesame oil. Bring to a simmer.",
            "Add sliced shiitake mushrooms and chopped bok choy. Cook until vegetables are tender.",
            "Divide the cooked noodles into serving bowls and ladle the hot broth over them.",
            "Top with green onions, soft-boiled eggs, grilled chicken slices, and nori.",
            "Serve hot and enjoy the authentic Japanese ramen!"
        ],
        "nutrition": {
            "calories": 480,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Japanese",
            "Ramen",
            "Japanese",
            "Soup",
            "Asian"
        ],
        "titleHindi": "जापानी रेमन सूप",
        "descriptionHindi": "एक स्वादिष्ट जापानी रात्रिभोज जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 20 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "रेमन नूडल्स को पैकेज के निर्देशों के अनुसार पकाएं और एक तरफ रख दें।",
            "एक बर्तन में चिकन शोरबा, सोया सॉस, मिरिन और तिल का तेल मिलाएं। उबाल आने दें.",
            "कटे हुए शिइताके मशरूम और कटी हुई बोक चॉय डालें। सब्जियों के नरम होने तक पकाएं.",
            "पके हुए नूडल्स को परोसने के कटोरे में बाँट लें और उनके ऊपर गरम शोरबा डालें।",
            "ऊपर से हरा प्याज, नरम उबले अंडे, ग्रिल्ड चिकन स्लाइस और नोरी डालें।",
            "गरमागरम परोसें और प्रामाणिक जापानी रेमन का आनंद लें!"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 117,
        "title": "Moroccan Chickpea Tagine",
        "description": "A delicious Moroccan dinner that is perfect for any occasion. It takes about 15 mins to prepare.",
        "category": "Dinner",
        "prepTime": "15 min",
        "cookTime": "30 min",
        "totalTime": "45 min",
        "servings": 4,
        "rating": 4.5,
        "image": "🥣",
        "color": "bg-teal-100 text-teal-700",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Chickpeas, cooked",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चना, पका हुआ"
            },
            {
                "name": "Tomatoes, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टमाटर, कटे हुए"
            },
            {
                "name": "Carrots, diced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "गाजर, टुकड़ों में कटा हुआ"
            },
            {
                "name": "Onions, finely chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "प्याज, बारीक कटा हुआ"
            },
            {
                "name": "Garlic, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लहसुन, कीमा बनाया हुआ"
            },
            {
                "name": "Cumin",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "जीरा"
            },
            {
                "name": "Coriander",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "धनिया"
            },
            {
                "name": "Cinnamon",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "दालचीनी"
            },
            {
                "name": "Paprika",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लाल शिमला मिर्च"
            },
            {
                "name": "Vegetable broth",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "सब्जी का शोरबा"
            },
            {
                "name": "Olives",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "जैतून"
            },
            {
                "name": "Fresh cilantro, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताज़ा हरा धनिया, कटा हुआ"
            }
        ],
        "steps": [
            "In a tagine or large pot, sauté chopped onions and minced garlic until softened.",
            "Add diced carrots, chopped tomatoes, and cooked chickpeas.",
            "Season with cumin, coriander, cinnamon, and paprika. Stir to coat.",
            "Pour in vegetable broth and bring to a simmer. Cook until carrots are tender.",
            "Stir in olives and garnish with fresh cilantro before serving.",
            "Serve this flavorful Moroccan dish with couscous or crusty bread."
        ],
        "nutrition": {
            "calories": 320,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Moroccan",
            "Tagine",
            "Chickpea",
            "Moroccan"
        ],
        "titleHindi": "मोरक्कन चना टैगिन",
        "descriptionHindi": "एक स्वादिष्ट मोरक्कन डिनर जो किसी भी अवसर के लिए बिल्कुल उपयुक्त है। इसे तैयार करने में लगभग 15 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "एक टैगिन या बड़े बर्तन में, कटा हुआ प्याज और कीमा बनाया हुआ लहसुन नरम होने तक भूनें।",
            "कटी हुई गाजर, कटे हुए टमाटर और पके हुए चने डालें।",
            "जीरा, धनिया, दालचीनी और लाल शिमला मिर्च डालें। कोट करने के लिए हिलाओ.",
            "सब्जी का शोरबा डालें और धीमी आंच पर पकाएं। गाजर के नरम होने तक पकाएं।",
            "परोसने से पहले जैतून मिलाएँ और ताज़े हरे धनिये से गार्निश करें।",
            "इस स्वादिष्ट मोरक्कन व्यंजन को कूसकूस या क्रस्टी ब्रेड के साथ परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 118,
        "title": "Korean Bibimbap",
        "description": "A delicious Korean dinner that is perfect for any occasion. It takes about 30 mins to prepare.",
        "category": "Dinner",
        "prepTime": "30 min",
        "cookTime": "20 min",
        "totalTime": "50 min",
        "servings": 2,
        "rating": 4.9,
        "image": "🥗",
        "color": "bg-blue-100 text-blue-600",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Cooked white rice",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "पका हुआ सफेद चावल"
            },
            {
                "name": "Beef bulgogi (marinated and grilled beef slices)",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बीफ़ बुल्गोगी (मसालेदार और ग्रिल्ड बीफ़ स्लाइस)"
            },
            {
                "name": "Carrots, julienned and sautéed",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "गाजर, जुलिएन्ड और भूनी हुई"
            },
            {
                "name": "Spinach, blanched and seasoned",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "पालक, उबालकर पकाया हुआ"
            },
            {
                "name": "Zucchini, sliced and grilled",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "तोरी, कटी हुई और ग्रिल की हुई"
            },
            {
                "name": "Bean sprouts, blanched",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बीन अंकुरित, ब्लांच किया हुआ"
            },
            {
                "name": "Fried egg",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "तला हुआ अंडा"
            },
            {
                "name": "Gochujang (Korean red pepper paste)",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "गोचुजांग (कोरियाई लाल मिर्च पेस्ट)"
            },
            {
                "name": "Sesame oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "तिल का तेल"
            },
            {
                "name": "Toasted sesame seeds",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "भुने हुए तिल"
            }
        ],
        "steps": [
            "Arrange cooked white rice in a bowl.",
            "Top with beef bulgogi, sautéed carrots, seasoned spinach, grilled zucchini, and blanched bean sprouts.",
            "Place a fried egg on top and drizzle with gochujang and sesame oil.",
            "Sprinkle with toasted sesame seeds before serving.",
            "Mix everything together before enjoying this delicious Korean bibimbap!",
            "Feel free to customize with additional vegetables or protein."
        ],
        "nutrition": {
            "calories": 550,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Korean",
            "Bibimbap",
            "Korean",
            "Rice"
        ],
        "titleHindi": "कोरियाई बिबिंबैप",
        "descriptionHindi": "एक स्वादिष्ट कोरियाई रात्रिभोज जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 30 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "पके हुए सफेद चावल को एक कटोरे में रखें।",
            "ऊपर से बीफ़ बुल्गोगी, भुनी हुई गाजर, अनुभवी पालक, ग्रिल्ड तोरी, और ब्लैंच्ड बीन स्प्राउट्स डालें।",
            "ऊपर एक तला हुआ अंडा रखें और उस पर गोचुजंग और तिल का तेल छिड़कें।",
            "परोसने से पहले भुने हुए तिल छिड़कें।",
            "इस स्वादिष्ट कोरियाई बिबिंबैप का आनंद लेने से पहले सब कुछ एक साथ मिलाएं!",
            "अतिरिक्त सब्जियों या प्रोटीन के साथ अनुकूलित करने के लिए स्वतंत्र महसूस करें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 119,
        "title": "Greek Moussaka",
        "description": "A delicious Greek dinner that is perfect for any occasion. It takes about 45 mins to prepare.",
        "category": "Dinner",
        "prepTime": "45 min",
        "cookTime": "45 min",
        "totalTime": "90 min",
        "servings": 6,
        "rating": 4.3,
        "image": "🍕",
        "color": "bg-purple-100 text-purple-600",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Eggplants, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बैंगन, कटा हुआ"
            },
            {
                "name": "Ground lamb or beef",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "पिसा हुआ भेड़ का बच्चा या गोमांस"
            },
            {
                "name": "Onions, finely chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "प्याज, बारीक कटा हुआ"
            },
            {
                "name": "Garlic, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लहसुन, कीमा बनाया हुआ"
            },
            {
                "name": "Tomatoes, crushed",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टमाटर, कुचले हुए"
            },
            {
                "name": "Red wine",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "रेड वाइन"
            },
            {
                "name": "Cinnamon",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "दालचीनी"
            },
            {
                "name": "Allspice",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ऑलस्पाइस"
            },
            {
                "name": "Nutmeg",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "जायफल"
            },
            {
                "name": "Olive oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "जैतून का तेल"
            },
            {
                "name": "Milk",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "दूध"
            },
            {
                "name": "Flour",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "आटा"
            },
            {
                "name": "Parmesan cheese",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "एक प्रकार का पनीर"
            },
            {
                "name": "Egg yolks",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अंडे"
            }
        ],
        "steps": [
            "Preheat oven to 375°F (190°C).",
            "Sauté sliced eggplants in olive oil until browned. Set aside.",
            "In the same pan, cook chopped onions and minced garlic until softened.",
            "Add ground lamb or beef and brown. Stir in crushed tomatoes, red wine, and spices.",
            "In a separate saucepan, make béchamel sauce: melt butter, whisk in flour, add milk, and cook until thickened.",
            "Remove from heat and stir in Parmesan cheese and egg yolks.",
            "In a baking dish, layer eggplants and meat mixture. Top with béchamel sauce.",
            "Bake for 40-45 minutes until golden brown. Let it cool before slicing.",
            "Serve slices of moussaka warm and enjoy this Greek classic!"
        ],
        "nutrition": {
            "calories": 420,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Greek",
            "Moussaka",
            "Greek"
        ],
        "titleHindi": "ग्रीक मौसाका",
        "descriptionHindi": "एक स्वादिष्ट ग्रीक डिनर जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 45 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "ओवन को 375°F (190°C) पर पहले से गरम कर लें।",
            "कटे हुए बैंगन को जैतून के तेल में भूरा होने तक भूनें। रद्द करना।",
            "उसी पैन में कटा हुआ प्याज और कीमा बनाया हुआ लहसुन नरम होने तक पकाएं।",
            "पिसा हुआ मेमना या बीफ़ डालें और भूरा करें। कुचले हुए टमाटर, रेड वाइन और मसाले मिलाएँ।",
            "एक अलग सॉस पैन में, बेचमेल सॉस बनाएं: मक्खन पिघलाएं, आटा मिलाएं, दूध डालें और गाढ़ा होने तक पकाएं।",
            "आँच से हटाएँ और परमेसन चीज़ और अंडे की जर्दी मिलाएँ।",
            "एक बेकिंग डिश में बैंगन और मांस के मिश्रण की परत लगाएं। ऊपर से बेचमेल सॉस डालें।",
            "सुनहरा भूरा होने तक 40-45 मिनट तक बेक करें। टुकड़े करने से पहले इसे ठंडा होने दें.",
            "मौसाका के टुकड़ों को गर्मागर्म परोसें और इस ग्रीक क्लासिक का आनंद लें!"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 120,
        "title": "Butter Chicken (Murgh Makhani)",
        "description": "A delicious Pakistani dinner that is perfect for any occasion. It takes about 30 mins to prepare.",
        "category": "Dinner",
        "prepTime": "30 min",
        "cookTime": "25 min",
        "totalTime": "55 min",
        "servings": 4,
        "rating": 4.5,
        "image": "🍔",
        "color": "bg-pink-100 text-pink-600",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Chicken thighs, boneless and skinless",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चिकन जांघें, हड्डी रहित और त्वचा रहित"
            },
            {
                "name": "Yogurt",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "दही"
            },
            {
                "name": "Ginger-garlic paste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अदरक-लहसुन का पेस्ट"
            },
            {
                "name": "Garam masala",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "गरम मसाला"
            },
            {
                "name": "Kashmiri red chili powder",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "कश्मीरी लाल मिर्च पाउडर"
            },
            {
                "name": "Tomato puree",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टमाटरो की चटनी"
            },
            {
                "name": "Butter",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "मक्खन"
            },
            {
                "name": "Heavy cream",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "भारी क्रीम"
            },
            {
                "name": "Kasuri methi (dried fenugreek leaves)",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "कसूरी मेथी (सूखे मेथी के पत्ते)"
            },
            {
                "name": "Sugar",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चीनी"
            },
            {
                "name": "Salt to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक स्वाद अनुसार"
            }
        ],
        "steps": [
            "Marinate chicken thighs in a mixture of yogurt, ginger-garlic paste, garam masala, and Kashmiri red chili powder.",
            "In a pan, melt butter and sauté the marinated chicken until browned.",
            "Add tomato puree and cook until the oil separates. Stir in heavy cream.",
            "Sprinkle kasuri methi, sugar, and salt. Simmer until the chicken is fully cooked.",
            "Serve this creamy butter chicken over rice or with naan for an authentic Pakistani/Indian experience."
        ],
        "nutrition": {
            "calories": 480,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Pakistani",
            "Butter chicken",
            "Curry",
            "Indian",
            "Pakistani",
            "Asian"
        ],
        "titleHindi": "बटर चिकन (मुर्ग मखनी)",
        "descriptionHindi": "एक स्वादिष्ट पाकिस्तानी रात्रिभोज जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 30 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "चिकन जांघों को दही, अदरक-लहसुन पेस्ट, गरम मसाला और कश्मीरी लाल मिर्च पाउडर के मिश्रण में मैरीनेट करें।",
            "एक पैन में मक्खन पिघलाएं और मैरीनेट किए हुए चिकन को भूरा होने तक भूनें।",
            "- टमाटर की प्यूरी डालें और तेल अलग होने तक पकाएं. गाढ़ी क्रीम मिलाएँ।",
            "कसूरी मेथी, चीनी और नमक छिड़कें। चिकन के पूरी तरह पकने तक धीमी आंच पर पकाएं।",
            "प्रामाणिक पाकिस्तानी/भारतीय अनुभव के लिए इस मलाईदार बटर चिकन को चावल के साथ या नान के साथ परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 121,
        "title": "Thai Green Curry",
        "description": "A delicious Thai dinner that is perfect for any occasion. It takes about 20 mins to prepare.",
        "category": "Dinner",
        "prepTime": "20 min",
        "cookTime": "30 min",
        "totalTime": "50 min",
        "servings": 4,
        "rating": 4.2,
        "image": "🍖",
        "color": "bg-red-100 text-red-600",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Chicken thighs, boneless and skinless",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चिकन जांघें, हड्डी रहित और त्वचा रहित"
            },
            {
                "name": "Green curry paste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "हरी करी पेस्ट"
            },
            {
                "name": "Coconut milk",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नारियल का दूध"
            },
            {
                "name": "Fish sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "मछली की सॉस"
            },
            {
                "name": "Sugar",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चीनी"
            },
            {
                "name": "Eggplant, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बैंगन, कटा हुआ"
            },
            {
                "name": "Bell peppers, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "शिमला मिर्च, कटी हुई"
            },
            {
                "name": "Basil leaves",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "तुलसी के पत्ते"
            },
            {
                "name": "Jasmine rice for serving",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "परोसने के लिए चमेली चावल"
            }
        ],
        "steps": [
            "In a pot, simmer green curry paste in coconut milk.",
            "Add chicken, fish sauce, and sugar. Cook until chicken is tender.",
            "Stir in sliced eggplant and bell peppers. Simmer until vegetables are cooked.",
            "Garnish with fresh basil leaves.",
            "Serve hot over jasmine rice and enjoy this Thai classic!"
        ],
        "nutrition": {
            "calories": 480,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Thai",
            "Curry",
            "Thai"
        ],
        "titleHindi": "थाई ग्रीन करी",
        "descriptionHindi": "एक स्वादिष्ट थाई डिनर जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 20 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "एक बर्तन में हरी करी पेस्ट को नारियल के दूध में उबालें।",
            "चिकन, मछली सॉस और चीनी डालें। चिकन के नरम होने तक पकाएं.",
            "कटे हुए बैंगन और शिमला मिर्च डालकर मिलाएँ। सब्जियों के पकने तक धीमी आंच पर पकाएं।",
            "ताजी तुलसी की पत्तियों से सजाएं.",
            "चमेली चावल के साथ गरमागरम परोसें और इस थाई क्लासिक का आनंद लें!"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 122,
        "title": "Mango Lassi",
        "description": "A delicious Indian beverage that is perfect for any occasion. It takes about 10 mins to prepare.",
        "category": "Beverage",
        "prepTime": "10 min",
        "cookTime": "0 min",
        "totalTime": "10 min",
        "servings": 2,
        "rating": 4.9,
        "image": "🥭",
        "color": "bg-yellow-100 text-yellow-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Ripe mango, peeled and diced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "पका हुआ आम, छिला हुआ और टुकड़ों में कटा हुआ"
            },
            {
                "name": "Yogurt",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "दही"
            },
            {
                "name": "Milk",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "दूध"
            },
            {
                "name": "Honey",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "शहद"
            },
            {
                "name": "Cardamom powder",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "इलायची पाउडर"
            },
            {
                "name": "Ice cubes",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बर्फ के टुकड़े"
            }
        ],
        "steps": [
            "In a blender, combine diced mango, yogurt, milk, honey, and cardamom powder.",
            "Blend until smooth and creamy.",
            "Add ice cubes and blend again until the lassi is chilled.",
            "Pour into glasses and garnish with a sprinkle of cardamom.",
            "Enjoy this refreshing Mango Lassi!"
        ],
        "nutrition": {
            "calories": 180,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Use chilled yogurt and milk for the best texture.",
            "You can add a pinch of saffron for extra flavor."
        ],
        "substitutions": [],
        "tags": [
            "Indian",
            "Lassi",
            "Mango",
            "Indian",
            "Pakistani",
            "Asian"
        ],
        "titleHindi": "आम की लस्सी",
        "descriptionHindi": "एक स्वादिष्ट भारतीय पेय जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 10 मिनट का समय लगता है.",
        "categoryHindi": "पेय",
        "stepsHindi": [
            "एक ब्लेंडर में कटे हुए आम, दही, दूध, शहद और इलायची पाउडर मिलाएं।",
            "चिकना और मलाईदार होने तक ब्लेंड करें।",
            "बर्फ के टुकड़े डालें और लस्सी के ठंडा होने तक फिर से ब्लेंड करें।",
            "गिलासों में डालें और ऊपर से इलायची छिड़क कर सजाएँ।",
            "इस ताज़ा मैंगो लस्सी का आनंद लें!"
        ],
        "chefTipsHindi": [
            "सर्वोत्तम बनावट के लिए ठंडे दही और दूध का प्रयोग करें।",
            "अतिरिक्त स्वाद के लिए चुटकी भर केसर मिला सकते हैं।"
        ]
    },
    {
        "id": 123,
        "title": "Italian Tiramisu",
        "description": "A delicious Italian dessert that is perfect for any occasion. It takes about 30 mins to prepare.",
        "category": "Dessert",
        "prepTime": "30 min",
        "cookTime": "15 min",
        "totalTime": "45 min",
        "servings": 6,
        "rating": 4.6,
        "image": "🍚",
        "color": "bg-amber-100 text-amber-700",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Espresso, brewed and cooled",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "एस्प्रेसो, बनाया और ठंडा किया गया"
            },
            {
                "name": "Ladyfinger cookies",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "भिंडी कुकीज़"
            },
            {
                "name": "Mascarpone cheese",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "मस्कारपोन पनीर"
            },
            {
                "name": "Heavy cream",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "भारी क्रीम"
            },
            {
                "name": "Sugar",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चीनी"
            },
            {
                "name": "Cocoa powder",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "कोको पाउडर"
            }
        ],
        "steps": [
            "In a bowl, whip heavy cream until stiff peaks form.",
            "In another bowl, mix mascarpone cheese and sugar until smooth.",
            "Gently fold the whipped cream into the mascarpone mixture.",
            "Dip ladyfinger cookies into brewed espresso and layer them in a serving dish.",
            "Spread a layer of the mascarpone mixture over the cookies.",
            "Repeat layers and finish with a dusting of cocoa powder.",
            "Chill in the refrigerator for a few hours before serving.",
            "Indulge in the decadence of this classic Italian Tiramisu!"
        ],
        "nutrition": {
            "calories": 350,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Italian",
            "Tiramisu",
            "Italian"
        ],
        "titleHindi": "इटालियन तिरामिसु",
        "descriptionHindi": "एक स्वादिष्ट इतालवी मिठाई जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 30 मिनट का समय लगता है.",
        "categoryHindi": "मिठाई",
        "stepsHindi": [
            "एक कटोरे में, भारी क्रीम को तब तक फेंटें जब तक कि कड़ी चोटियाँ न बन जाएँ।",
            "दूसरे कटोरे में, मस्कारपोन चीज़ और चीनी को चिकना होने तक मिलाएँ।",
            "व्हीप्ड क्रीम को मस्कारपोन मिश्रण में धीरे से मिलाएँ।",
            "भिंडी कुकीज़ को तैयार एस्प्रेसो में डुबोएं और उन्हें एक सर्विंग डिश में रखें।",
            "कुकीज़ के ऊपर मस्कारपोन मिश्रण की एक परत फैलाएं।",
            "परतों को दोहराएं और कोको पाउडर छिड़क कर समाप्त करें।",
            "परोसने से पहले कुछ घंटों के लिए रेफ्रिजरेटर में ठंडा करें।",
            "इस क्लासिक इतालवी तिरुमिसु के पतन का आनंद लें!"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 124,
        "title": "Turkish Kebabs",
        "description": "A delicious Turkish dinner that is perfect for any occasion. It takes about 25 mins to prepare.",
        "category": "Dinner",
        "prepTime": "25 min",
        "cookTime": "15 min",
        "totalTime": "40 min",
        "servings": 4,
        "rating": 4.6,
        "image": "🍲",
        "color": "bg-yellow-100 text-yellow-700",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Ground lamb or beef",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "पिसा हुआ भेड़ का बच्चा या गोमांस"
            },
            {
                "name": "Onions, grated",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "प्याज, कसा हुआ"
            },
            {
                "name": "Garlic, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लहसुन, कीमा बनाया हुआ"
            },
            {
                "name": "Parsley, finely chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अजमोद, बारीक कटा हुआ"
            },
            {
                "name": "Cumin",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "जीरा"
            },
            {
                "name": "Coriander",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "धनिया"
            },
            {
                "name": "Red pepper flakes",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "रेड पेपर फ्लेक्स"
            },
            {
                "name": "Salt and pepper to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक और काली मिर्च स्वादानुसार"
            },
            {
                "name": "Flatbread for serving",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "परोसने के लिए फ्लैटब्रेड"
            },
            {
                "name": "Tahini sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताहिनी सॉस"
            }
        ],
        "steps": [
            "In a bowl, mix ground meat, grated onions, minced garlic, chopped parsley, and spices.",
            "Form the mixture into kebab shapes and grill until fully cooked.",
            "Serve the kebabs on flatbread with a drizzle of tahini sauce.",
            "Enjoy these flavorful Turkish Kebabs with your favorite sides."
        ],
        "nutrition": {
            "calories": 280,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Turkish",
            "Kebabs",
            "Turkish",
            "Grilling"
        ],
        "titleHindi": "तुर्की कबाब",
        "descriptionHindi": "एक स्वादिष्ट तुर्की रात्रिभोज जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 25 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "एक कटोरे में, पिसा हुआ मांस, कसा हुआ प्याज, कीमा बनाया हुआ लहसुन, कटा हुआ अजमोद और मसाले मिलाएं।",
            "मिश्रण को कबाब के आकार में बनाएं और पूरी तरह पकने तक ग्रिल करें।",
            "कबाब को फ्लैटब्रेड पर ताहिनी सॉस के साथ परोसें।",
            "अपने पसंदीदा पक्षों के साथ इन स्वादिष्ट तुर्की कबाबों का आनंद लें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 125,
        "title": "Blueberry Banana Smoothie",
        "description": "A delicious Smoothie breakfast that is perfect for any occasion. It takes about 10 mins to prepare.",
        "category": "Breakfast",
        "prepTime": "10 min",
        "cookTime": "15 min",
        "totalTime": "25 min",
        "servings": 1,
        "rating": 4.8,
        "image": "🍝",
        "color": "bg-green-100 text-green-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Blueberries, fresh or frozen",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ब्लूबेरी, ताजा या जमे हुए"
            },
            {
                "name": "Banana, peeled and sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "केला, छिला हुआ और कटा हुआ"
            },
            {
                "name": "Greek yogurt",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ग्रीक दही"
            },
            {
                "name": "Almond milk",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बादाम का दूध"
            },
            {
                "name": "Honey",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "शहद"
            },
            {
                "name": "Chia seeds (optional)",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चिया बीज (वैकल्पिक)"
            }
        ],
        "steps": [
            "In a blender, combine blueberries, banana, Greek yogurt, almond milk, and honey.",
            "Blend until smooth and creamy.",
            "Add chia seeds for extra nutrition and blend briefly.",
            "Pour into a glass and enjoy this nutritious Blueberry Banana Smoothie!"
        ],
        "nutrition": {
            "calories": 220,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Smoothie",
            "Smoothie",
            "Blueberry",
            "Banana"
        ],
        "titleHindi": "ब्लूबेरी केला स्मूदी",
        "descriptionHindi": "एक स्वादिष्ट स्मूथी नाश्ता जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 10 मिनट का समय लगता है.",
        "categoryHindi": "नाश्ता",
        "stepsHindi": [
            "एक ब्लेंडर में ब्लूबेरी, केला, ग्रीक दही, बादाम का दूध और शहद मिलाएं।",
            "चिकना और मलाईदार होने तक ब्लेंड करें।",
            "अतिरिक्त पोषण के लिए चिया बीज डालें और थोड़ी देर ब्लेंड करें।",
            "एक गिलास में डालें और इस पौष्टिक ब्लूबेरी बनाना स्मूदी का आनंद लें!"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 126,
        "title": "Mexican Street Corn (Elote)",
        "description": "A delicious Mexican snack that is perfect for any occasion. It takes about 15 mins to prepare.",
        "category": "Snack",
        "prepTime": "15 min",
        "cookTime": "15 min",
        "totalTime": "30 min",
        "servings": 4,
        "rating": 4.6,
        "image": "🍠",
        "color": "bg-emerald-100 text-emerald-700",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Corn on the cob",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "भुट्टा"
            },
            {
                "name": "Mayonnaise",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "मेयोनेज़"
            },
            {
                "name": "Cotija cheese, crumbled",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "कोटिजा चीज़, टुकड़े टुकड़े किये हुए"
            },
            {
                "name": "Chili powder",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "मिर्च बुकनी"
            },
            {
                "name": "Lime wedges",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नीबू की कीलें"
            }
        ],
        "steps": [
            "Grill or roast corn on the cob until kernels are charred.",
            "Brush each cob with mayonnaise, then sprinkle with crumbled Cotija cheese and chili powder.",
            "Serve with lime wedges for squeezing over the top.",
            "Enjoy this delicious and flavorful Mexican Street Corn!"
        ],
        "nutrition": {
            "calories": 180,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Mexican",
            "Elote",
            "Mexican",
            "Street food"
        ],
        "titleHindi": "मैक्सिकन स्ट्रीट कॉर्न (एलोटे)",
        "descriptionHindi": "एक स्वादिष्ट मेक्सिकन नाश्ता जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 15 मिनट का समय लगता है.",
        "categoryHindi": "नाश्ता",
        "stepsHindi": [
            "मक्के को भुट्टे पर तब तक भूनें या भूनें जब तक कि दाने जल न जाएं।",
            "प्रत्येक भुट्टे को मेयोनेज़ से ब्रश करें, फिर टुकड़े किए हुए कोटिजा चीज़ और मिर्च पाउडर छिड़कें।",
            "ऊपर से निचोड़ने के लिए नींबू के टुकड़े डालकर परोसें।",
            "इस स्वादिष्ट और जायकेदार मैक्सिकन स्ट्रीट कॉर्न का आनंद लें!"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 127,
        "title": "Russian Borscht",
        "description": "A delicious Russian dinner that is perfect for any occasion. It takes about 30 mins to prepare.",
        "category": "Dinner",
        "prepTime": "30 min",
        "cookTime": "40 min",
        "totalTime": "70 min",
        "servings": 6,
        "rating": 4.3,
        "image": "🍢",
        "color": "bg-teal-100 text-teal-700",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Beets, peeled and shredded",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चुकंदर, छिले और कटे हुए"
            },
            {
                "name": "Cabbage, shredded",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "पत्तागोभी, कटी हुई"
            },
            {
                "name": "Potatoes, diced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "आलू, टुकड़ों में कटा हुआ"
            },
            {
                "name": "Onions, finely chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "प्याज, बारीक कटा हुआ"
            },
            {
                "name": "Carrots, grated",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "गाजर, कसा हुआ"
            },
            {
                "name": "Tomato paste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टमाटर का पेस्ट"
            },
            {
                "name": "Beef or vegetable broth",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "गोमांस या सब्जी शोरबा"
            },
            {
                "name": "Garlic, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लहसुन, कीमा बनाया हुआ"
            },
            {
                "name": "Bay leaves",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "तेजपत्ता"
            },
            {
                "name": "Sour cream for serving",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "परोसने के लिए खट्टा क्रीम"
            }
        ],
        "steps": [
            "In a pot, sauté chopped onions and garlic until softened.",
            "Add shredded beets, cabbage, diced potatoes, grated carrots, and tomato paste.",
            "Pour in broth and add bay leaves. Simmer until vegetables are tender.",
            "Serve hot with a dollop of sour cream on top.",
            "Enjoy the hearty and comforting flavors of Russian Borscht!"
        ],
        "nutrition": {
            "calories": 220,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Russian",
            "Borscht",
            "Russian",
            "Soup"
        ],
        "titleHindi": "रूसी बोर्स्ट",
        "descriptionHindi": "एक स्वादिष्ट रूसी रात्रिभोज जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 30 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "एक बर्तन में कटे हुए प्याज और लहसुन को नरम होने तक भूनें।",
            "कटे हुए चुकंदर, पत्तागोभी, कटे हुए आलू, कद्दूकस की हुई गाजर और टमाटर का पेस्ट डालें।",
            "शोरबा में डालें और तेज पत्ते डालें। सब्जियों के नरम होने तक धीमी आंच पर पकाएं।",
            "ऊपर से थोड़ी सी खट्टी क्रीम डालकर गरमागरम परोसें।",
            "रूसी बोर्स्ट के हार्दिक और आरामदायक स्वाद का आनंद लें!"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 128,
        "title": "South Indian Masala Dosa",
        "description": "A delicious Indian breakfast that is perfect for any occasion. It takes about 40 mins to prepare.",
        "category": "Breakfast",
        "prepTime": "40 min",
        "cookTime": "20 min",
        "totalTime": "60 min",
        "servings": 4,
        "rating": 4.4,
        "image": "🍣",
        "color": "bg-blue-100 text-blue-600",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Dosa batter (fermented rice and urad dal batter)",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "डोसा बैटर (किण्वित चावल और उड़द दाल बैटर)"
            },
            {
                "name": "Potatoes, boiled and mashed",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "आलू, उबले और मसले हुए"
            },
            {
                "name": "Onions, finely chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "प्याज, बारीक कटा हुआ"
            },
            {
                "name": "Mustard seeds",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "सरसों के बीज"
            },
            {
                "name": "Cumin seeds",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "जीरा"
            },
            {
                "name": "Curry leaves",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "करी पत्ता"
            },
            {
                "name": "Turmeric powder",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "हल्दी पाउडर"
            },
            {
                "name": "Green chilies, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "हरी मिर्च, कटी हुई"
            },
            {
                "name": "Ghee",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "घी"
            },
            {
                "name": "Coconut chutney for serving",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "परोसने के लिए नारियल की चटनी"
            }
        ],
        "steps": [
            "In a pan, heat ghee and add mustard seeds, cumin seeds, and curry leaves.",
            "Add chopped onions, green chilies, and turmeric powder. Sauté until onions are golden brown.",
            "Mix in boiled and mashed potatoes. Cook until well combined and seasoned.",
            "Spread dosa batter on a hot griddle to make thin pancakes.",
            "Place a spoonful of the potato mixture in the center, fold, and serve hot.",
            "Pair with coconut chutney for a delicious South Indian meal."
        ],
        "nutrition": {
            "calories": 320,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Indian",
            "Dosa",
            "Indian",
            "Asian"
        ],
        "titleHindi": "दक्षिण भारतीय मसाला डोसा",
        "descriptionHindi": "एक स्वादिष्ट भारतीय नाश्ता जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 40 मिनट का समय लगता है.",
        "categoryHindi": "नाश्ता",
        "stepsHindi": [
            "- एक पैन में घी गर्म करें और उसमें राई, जीरा और करी पत्ता डालें.",
            "कटा हुआ प्याज, हरी मिर्च और हल्दी पाउडर डालें. प्याज को सुनहरा भूरा होने तक भूनें।",
            "उबले और मसले हुए आलू मिला लें. अच्छी तरह मिश्रित और अनुभवी होने तक पकाएं।",
            "पतले पैनकेक बनाने के लिए गर्म तवे पर डोसा बैटर फैलाएं.",
            "बीच में एक चम्मच आलू का मिश्रण रखें, मोड़ें और गरमागरम परोसें।",
            "स्वादिष्ट दक्षिण भारतीय भोजन के लिए इसे नारियल की चटनी के साथ मिलाएं।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 129,
        "title": "Lebanese Falafel Wrap",
        "description": "A delicious Lebanese lunch that is perfect for any occasion. It takes about 15 mins to prepare.",
        "category": "Lunch",
        "prepTime": "15 min",
        "cookTime": "10 min",
        "totalTime": "25 min",
        "servings": 2,
        "rating": 4.7,
        "image": "🥗",
        "color": "bg-purple-100 text-purple-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Falafel balls",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "फ़लाफ़ेल गेंदें"
            },
            {
                "name": "Whole wheat or regular wraps",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "साबुत गेहूं या नियमित लपेटें"
            },
            {
                "name": "Tomatoes, diced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टमाटर, टुकड़ों में काट लें"
            },
            {
                "name": "Cucumbers, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "खीरे, कटा हुआ"
            },
            {
                "name": "Red onions, thinly sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लाल प्याज, पतले कटे हुए"
            },
            {
                "name": "Lettuce, shredded",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "सलाद, कटा हुआ"
            },
            {
                "name": "Tahini sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताहिनी सॉस"
            },
            {
                "name": "Fresh parsley, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताज़ा अजमोद, कटा हुआ"
            }
        ],
        "steps": [
            "Warm falafel balls according to package instructions.",
            "Place a generous serving of falafel in the center of each wrap.",
            "Top with diced tomatoes, sliced cucumbers, red onions, shredded lettuce, and fresh parsley.",
            "Drizzle with tahini sauce and wrap tightly.",
            "Enjoy this Lebanese Falafel Wrap filled with fresh and flavorful ingredients!"
        ],
        "nutrition": {
            "calories": 400,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Lebanese",
            "Falafel",
            "Lebanese",
            "Wrap"
        ],
        "titleHindi": "लेबनानी फलाफेल लपेटें",
        "descriptionHindi": "एक स्वादिष्ट लेबनानी दोपहर का भोजन जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 15 मिनट का समय लगता है.",
        "categoryHindi": "दिन का खाना",
        "stepsHindi": [
            "पैकेज के निर्देशों के अनुसार गर्म फलाफेल बॉल्स।",
            "प्रत्येक रैप के बीच में फलाफेल की एक बड़ी मात्रा रखें।",
            "ऊपर से कटे हुए टमाटर, कटे हुए खीरे, लाल प्याज, कटा हुआ सलाद और ताजा अजमोद डालें।",
            "ताहिनी सॉस छिड़कें और कसकर लपेटें।",
            "ताज़ी और स्वादिष्ट सामग्रियों से भरे इस लेबनानी फ़लाफ़ेल रैप का आनंद लें!"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 130,
        "title": "Brazilian Caipirinha",
        "description": "A delicious Brazilian beverage that is perfect for any occasion. It takes about 5 mins to prepare.",
        "category": "Beverage",
        "prepTime": "5 min",
        "cookTime": "15 min",
        "totalTime": "20 min",
        "servings": 1,
        "rating": 4.4,
        "image": "🥪",
        "color": "bg-pink-100 text-pink-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Cachaça (Brazilian sugarcane spirit)",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "काचाका (ब्राज़ीलियाई गन्ना स्पिरिट)"
            },
            {
                "name": "Lime, cut into wedges",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नींबू, वेजेज में काटें"
            },
            {
                "name": "Granulated sugar",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "दानेदार चीनी"
            },
            {
                "name": "Ice cubes",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बर्फ के टुकड़े"
            }
        ],
        "steps": [
            "In a glass, muddle lime wedges with granulated sugar to release the juice.",
            "Fill the glass with ice cubes.",
            "Pour cachaça over the ice and stir well.",
            "Sip and enjoy the refreshing taste of the Brazilian Caipirinha!",
            "Adjust sugar and lime to suit your taste preferences."
        ],
        "nutrition": {
            "calories": 150,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Brazilian",
            "Caipirinha",
            "Brazilian",
            "Cocktail"
        ],
        "titleHindi": "ब्राजीलियाई कैपिरिन्हा",
        "descriptionHindi": "एक स्वादिष्ट ब्राज़ीलियाई पेय जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 5 मिनट का समय लगता है.",
        "categoryHindi": "पेय",
        "stepsHindi": [
            "रस निकालने के लिए एक गिलास में नींबू के टुकड़े को दानेदार चीनी के साथ मिलाएं।",
            "गिलास को बर्फ के टुकड़ों से भरें।",
            "बर्फ के ऊपर काचाका डालें और अच्छी तरह हिलाएँ।",
            "चुस्की लें और ब्राज़ीलियाई कैपिरिन्हा के ताज़ा स्वाद का आनंद लें!",
            "अपनी स्वाद प्राथमिकताओं के अनुरूप चीनी और नींबू को समायोजित करें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 131,
        "title": "Spanish Patatas Bravas",
        "description": "A delicious Spanish appetizer that is perfect for any occasion. It takes about 20 mins to prepare.",
        "category": "Appetizer",
        "prepTime": "20 min",
        "cookTime": "30 min",
        "totalTime": "50 min",
        "servings": 4,
        "rating": 4.5,
        "image": "🍳",
        "color": "bg-red-100 text-red-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Potatoes, diced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "आलू, टुकड़ों में कटा हुआ"
            },
            {
                "name": "Olive oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "जैतून का तेल"
            },
            {
                "name": "Garlic, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लहसुन, कीमा बनाया हुआ"
            },
            {
                "name": "Smoked paprika",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "स्मोक्ड पेपरिका"
            },
            {
                "name": "Tomato sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टमाटर सॉस"
            },
            {
                "name": "Mayonnaise",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "मेयोनेज़"
            },
            {
                "name": "Hot sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "गर्म सॉस"
            },
            {
                "name": "Fresh parsley, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताज़ा अजमोद, कटा हुआ"
            }
        ],
        "steps": [
            "Preheat oven to 425°F (220°C).",
            "Toss diced potatoes with olive oil, minced garlic, and smoked paprika. Roast until crispy.",
            "In a small saucepan, heat tomato sauce, mayonnaise, and hot sauce. Stir until warm.",
            "Drizzle the sauce over the roasted potatoes and garnish with fresh parsley.",
            "Serve these flavorful Spanish Patatas Bravas as a delicious appetizer."
        ],
        "nutrition": {
            "calories": 240,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Spanish",
            "Patatas bravas",
            "Spanish"
        ],
        "titleHindi": "स्पैनिश पटाटास ब्रावस",
        "descriptionHindi": "एक स्वादिष्ट स्पैनिश ऐपेटाइज़र जो किसी भी अवसर के लिए बिल्कुल उपयुक्त है। इसे तैयार करने में लगभग 20 मिनट का समय लगता है.",
        "categoryHindi": "क्षुधावर्धक",
        "stepsHindi": [
            "ओवन को 425°F (220°C) पर पहले से गरम कर लें।",
            "कटे हुए आलू को जैतून के तेल, कीमा बनाया हुआ लहसुन और स्मोक्ड पेपरिका के साथ मिलाएं। कुरकुरा होने तक भुने.",
            "एक छोटे सॉस पैन में, टमाटर सॉस, मेयोनेज़ और गर्म सॉस गरम करें। गर्म होने तक हिलाएँ।",
            "भुने हुए आलू के ऊपर सॉस छिड़कें और ताज़ा अजमोद से गार्निश करें।",
            "इन स्वादिष्ट स्पैनिश पटाटास ब्रावस को स्वादिष्ट ऐपेटाइज़र के रूप में परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 132,
        "title": "Vietnamese Fresh Spring Rolls",
        "description": "A delicious Vietnamese appetizer that is perfect for any occasion. It takes about 15 mins to prepare.",
        "category": "Appetizer",
        "prepTime": "15 min",
        "cookTime": "10 min",
        "totalTime": "25 min",
        "servings": 4,
        "rating": 4.2,
        "image": "🥞",
        "color": "bg-orange-100 text-orange-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Rice paper wrappers",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चावल कागज़ के रैपर"
            },
            {
                "name": "Shrimp, cooked and sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "झींगा, पका हुआ और कटा हुआ"
            },
            {
                "name": "Rice vermicelli, cooked",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चावल सेंवई, पकी हुई"
            },
            {
                "name": "Lettuce leaves",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "सलाद पत्ते"
            },
            {
                "name": "Carrots, julienned",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "गाजर, जुलिएनड"
            },
            {
                "name": "Cucumber, julienned",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ककड़ी, जुलिएनड"
            },
            {
                "name": "Fresh mint leaves",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताज़ी पुदीने की पत्तियाँ"
            },
            {
                "name": "Peanut dipping sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "मूंगफली डुबाने की चटनी"
            }
        ],
        "steps": [
            "Dip rice paper wrappers in warm water to soften.",
            "Lay a wrapper on a flat surface and fill with shrimp, rice vermicelli, lettuce, carrots, cucumber, and mint leaves.",
            "Fold the sides of the wrapper and roll tightly to seal.",
            "Serve these Vietnamese Fresh Spring Rolls with peanut dipping sauce.",
            "Enjoy these light and refreshing rolls as a delightful appetizer or snack."
        ],
        "nutrition": {
            "calories": 180,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Vietnamese",
            "Spring rolls",
            "Vietnamese"
        ],
        "titleHindi": "वियतनामी ताज़ा स्प्रिंग रोल्स",
        "descriptionHindi": "एक स्वादिष्ट वियतनामी ऐपेटाइज़र जो किसी भी अवसर के लिए बिल्कुल उपयुक्त है। इसे तैयार करने में लगभग 15 मिनट का समय लगता है.",
        "categoryHindi": "क्षुधावर्धक",
        "stepsHindi": [
            "चावल के पेपर रैपर को नरम करने के लिए गर्म पानी में डुबोएं।",
            "एक सपाट सतह पर एक रैपर बिछाएं और उसमें झींगा, चावल सेंवई, सलाद, गाजर, ककड़ी और पुदीने की पत्तियां भरें।",
            "रैपर के किनारों को मोड़ें और सील करने के लिए कसकर रोल करें।",
            "इन वियतनामी ताज़ा स्प्रिंग रोल्स को मूंगफली डिपिंग सॉस के साथ परोसें।",
            "एक आनंददायक ऐपेटाइज़र या नाश्ते के रूप में इन हल्के और ताज़ा रोल का आनंद लें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 133,
        "title": "Mediterranean Quinoa Salad",
        "description": "A delicious Mediterranean lunch that is perfect for any occasion. It takes about 20 mins to prepare.",
        "category": "Lunch",
        "prepTime": "20 min",
        "cookTime": "15 min",
        "totalTime": "35 min",
        "servings": 6,
        "rating": 4.8,
        "image": "🥘",
        "color": "bg-amber-100 text-amber-700",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Quinoa, cooked",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "क्विनोआ, पका हुआ"
            },
            {
                "name": "Cherry tomatoes, halved",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चेरी टमाटर, आधा"
            },
            {
                "name": "Cucumber, diced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ककड़ी, टुकड़ों में कटा हुआ"
            },
            {
                "name": "Kalamata olives, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "कलामाता जैतून, कटा हुआ"
            },
            {
                "name": "Red onion, finely chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लाल प्याज, बारीक कटा हुआ"
            },
            {
                "name": "Feta cheese, crumbled",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "फ़ेटा चीज़, टुकड़ों में कटा हुआ"
            },
            {
                "name": "Fresh parsley, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताज़ा अजमोद, कटा हुआ"
            },
            {
                "name": "Lemon vinaigrette dressing",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नींबू विनाइग्रेटे ड्रेसिंग"
            }
        ],
        "steps": [
            "In a large bowl, combine cooked quinoa, cherry tomatoes, cucumber, olives, red onion, feta cheese, and parsley.",
            "Drizzle with lemon vinaigrette dressing and toss to combine.",
            "Chill before serving. This Mediterranean Quinoa Salad is perfect as a refreshing side dish."
        ],
        "nutrition": {
            "calories": 220,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Mediterranean",
            "Quinoa salad",
            "Mediterranean"
        ],
        "titleHindi": "भूमध्यसागरीय क्विनोआ सलाद",
        "descriptionHindi": "एक स्वादिष्ट भूमध्यसागरीय दोपहर का भोजन जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 20 मिनट का समय लगता है.",
        "categoryHindi": "दिन का खाना",
        "stepsHindi": [
            "एक बड़े कटोरे में, पका हुआ क्विनोआ, चेरी टमाटर, ककड़ी, जैतून, लाल प्याज, फ़ेटा चीज़ और अजमोद मिलाएं।",
            "नींबू विनैग्रेट ड्रेसिंग के साथ बूंदा बांदी करें और मिलाने के लिए टॉस करें।",
            "परोसने से पहले ठंडा करें। यह मेडिटेरेनियन क्विनोआ सलाद एक ताज़ा साइड डिश के रूप में एकदम सही है।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 134,
        "title": "Japanese Matcha Green Tea Ice Cream",
        "description": "A delicious Japanese dessert that is perfect for any occasion. It takes about 30 mins to prepare.",
        "category": "Dessert",
        "prepTime": "30 min",
        "cookTime": "15 min",
        "totalTime": "45 min",
        "servings": 4,
        "rating": 4.2,
        "image": "🍲",
        "color": "bg-yellow-100 text-yellow-700",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Heavy cream",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "भारी क्रीम"
            },
            {
                "name": "Whole milk",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "वसायुक्त दूध"
            },
            {
                "name": "Granulated sugar",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "दानेदार चीनी"
            },
            {
                "name": "Matcha green tea powder",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "माचा ग्रीन टी पाउडर"
            },
            {
                "name": "Egg yolks",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अंडे"
            }
        ],
        "steps": [
            "In a saucepan, heat heavy cream, whole milk, and granulated sugar until it begins to steam.",
            "Whisk in matcha green tea powder until fully combined.",
            "In a separate bowl, whisk egg yolks. Slowly pour the hot milk mixture into the yolks, whisking continuously.",
            "Return the mixture to the saucepan and heat until it thickens. Do not boil.",
            "Strain the mixture and let it cool. Churn in an ice cream maker according to the manufacturer's instructions.",
            "Freeze until firm. Indulge in the creamy goodness of Japanese Matcha Green Tea Ice Cream!"
        ],
        "nutrition": {
            "calories": 280,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Japanese",
            "Matcha ice cream",
            "Japanese"
        ],
        "titleHindi": "जापानी माचा ग्रीन टी आइसक्रीम",
        "descriptionHindi": "एक स्वादिष्ट जापानी मिठाई जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 30 मिनट का समय लगता है.",
        "categoryHindi": "मिठाई",
        "stepsHindi": [
            "एक सॉस पैन में भारी क्रीम, दूध और दानेदार चीनी को तब तक गर्म करें जब तक उसमें भाप न बनने लगे।",
            "माचा ग्रीन टी पाउडर को पूरी तरह मिश्रित होने तक फेंटें।",
            "एक अलग कटोरे में अंडे की जर्दी फेंटें। गर्म दूध के मिश्रण को धीरे-धीरे लगातार चलाते हुए जर्दी में डालें।",
            "मिश्रण को सॉस पैन में लौटाएँ और गाढ़ा होने तक गरम करें। उबालें नहीं.",
            "मिश्रण को छान लें और ठंडा होने दें। निर्माता के निर्देशों के अनुसार आइसक्रीम मेकर में मथें।",
            "सख्त होने तक फ्रीज करें। जापानी माचा ग्रीन टी आइसक्रीम की मलाईदार अच्छाई का आनंद लें!"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 135,
        "title": "Brazilian Chocolate Brigadeiros",
        "description": "A delicious Brazilian dessert that is perfect for any occasion. It takes about 20 mins to prepare.",
        "category": "Dessert",
        "prepTime": "20 min",
        "cookTime": "10 min",
        "totalTime": "30 min",
        "servings": 8,
        "rating": 4.2,
        "image": "🥣",
        "color": "bg-green-100 text-green-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Sweetened condensed milk",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "मीठा किया गया संघनित दूध"
            },
            {
                "name": "Cocoa powder",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "कोको पाउडर"
            },
            {
                "name": "Unsalted butter",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अनसाल्टेड मक्खन"
            },
            {
                "name": "Chocolate sprinkles",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चॉकलेट के छींटे"
            }
        ],
        "steps": [
            "In a saucepan, combine sweetened condensed milk, cocoa powder, and unsalted butter.",
            "Cook over medium heat, stirring constantly, until the mixture thickens and pulls away from the pan.",
            "Let the mixture cool. Grease your hands with butter and roll into small balls.",
            "Coat the brigadeiros in chocolate sprinkles.",
            "These Brazilian Chocolate Brigadeiros are a delightful sweet treat!"
        ],
        "nutrition": {
            "calories": 120,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Brazilian",
            "Brigadeiros",
            "Brazilian"
        ],
        "titleHindi": "ब्राजीलियाई चॉकलेट ब्रिगेडिरोस",
        "descriptionHindi": "एक स्वादिष्ट ब्राज़ीलियाई मिठाई जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 20 मिनट का समय लगता है.",
        "categoryHindi": "मिठाई",
        "stepsHindi": [
            "एक सॉस पैन में, मीठा गाढ़ा दूध, कोको पाउडर और अनसाल्टेड मक्खन मिलाएं।",
            "मध्यम आंच पर, लगातार हिलाते हुए पकाएं, जब तक कि मिश्रण गाढ़ा न हो जाए और पैन से अलग न हो जाए।",
            "मिश्रण को ठंडा होने दें. अपने हाथों को मक्खन से चिकना करें और छोटी-छोटी लोइयां बेल लें।",
            "ब्रिगेडिरोज़ को चॉकलेट स्प्रिंकल्स में लपेटें।",
            "ये ब्राज़ीलियाई चॉकलेट ब्रिगेडिरोज़ एक आनंददायक मीठा व्यंजन हैं!"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 136,
        "title": "Mexican Chicken Enchiladas",
        "description": "A delicious Mexican dinner that is perfect for any occasion. It takes about 25 mins to prepare.",
        "category": "Dinner",
        "prepTime": "25 min",
        "cookTime": "20 min",
        "totalTime": "45 min",
        "servings": 4,
        "rating": 4.1,
        "image": "🥗",
        "color": "bg-emerald-100 text-emerald-700",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Chicken breasts, cooked and shredded",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चिकन ब्रेस्ट, पकाया और कटा हुआ"
            },
            {
                "name": "Corn tortillas",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "मक्के की रोटी"
            },
            {
                "name": "Enchilada sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "एनचिलाडा सॉस"
            },
            {
                "name": "Black beans, drained and rinsed",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "काली फलियाँ, छानकर धो लें"
            },
            {
                "name": "Corn kernels",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "मक्के के दाने"
            },
            {
                "name": "Shredded Mexican cheese blend",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "कटा हुआ मैक्सिकन पनीर मिश्रण"
            },
            {
                "name": "Fresh cilantro, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताज़ा हरा धनिया, कटा हुआ"
            },
            {
                "name": "Sour cream for serving",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "परोसने के लिए खट्टा क्रीम"
            }
        ],
        "steps": [
            "Preheat oven to 375°F (190°C).",
            "In a bowl, mix shredded chicken with black beans, corn, and chopped cilantro.",
            "Fill each corn tortilla with the chicken mixture and roll tightly.",
            "Place the rolled enchiladas in a baking dish, cover with enchilada sauce, and sprinkle with shredded cheese.",
            "Bake until the cheese is melted and bubbly.",
            "Serve hot with a dollop of sour cream. Enjoy these delicious Mexican Chicken Enchiladas!"
        ],
        "nutrition": {
            "calories": 380,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Mexican",
            "Enchiladas",
            "Mexican",
            "Main course"
        ],
        "titleHindi": "मैक्सिकन चिकन एनचिलाडस",
        "descriptionHindi": "एक स्वादिष्ट मेक्सिकन रात्रिभोज जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 25 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "ओवन को 375°F (190°C) पर पहले से गरम कर लें।",
            "एक कटोरे में, कटे हुए चिकन को काली बीन्स, मक्का और कटा हरा धनिया के साथ मिलाएं।",
            "प्रत्येक कॉर्न टॉर्टिला को चिकन मिश्रण से भरें और कसकर रोल करें।",
            "बेले हुए एंचिलाडा को बेकिंग डिश में रखें, एंचिलाडा सॉस से ढक दें और कटा हुआ पनीर छिड़कें।",
            "पनीर के पिघलने और बुलबुले बनने तक बेक करें।",
            "खट्टी क्रीम की एक बूंद के साथ गरमागरम परोसें। इन स्वादिष्ट मैक्सिकन चिकन एनचिलाडस का आनंद लें!"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 137,
        "title": "Thai Coconut Shrimp Curry",
        "description": "A delicious Thai dinner that is perfect for any occasion. It takes about 20 mins to prepare.",
        "category": "Dinner",
        "prepTime": "20 min",
        "cookTime": "15 min",
        "totalTime": "35 min",
        "servings": 3,
        "rating": 4.9,
        "image": "🍕",
        "color": "bg-teal-100 text-teal-700",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Shrimp, peeled and deveined",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "झींगा, छिला हुआ और छिला हुआ"
            },
            {
                "name": "Coconut milk",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नारियल का दूध"
            },
            {
                "name": "Red curry paste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लाल करी पेस्ट"
            },
            {
                "name": "Fish sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "मछली की सॉस"
            },
            {
                "name": "Sugar",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चीनी"
            },
            {
                "name": "Bell peppers, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "शिमला मिर्च, कटी हुई"
            },
            {
                "name": "Zucchini, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "तोरी, कटी हुई"
            },
            {
                "name": "Fresh basil leaves",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताजा तुलसी के पत्ते"
            },
            {
                "name": "Jasmine rice for serving",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "परोसने के लिए चमेली चावल"
            }
        ],
        "steps": [
            "In a pan, simmer coconut milk with red curry paste, fish sauce, and sugar.",
            "Add sliced bell peppers and zucchini. Cook until vegetables are tender.",
            "Add shrimp and cook until they turn pink and opaque.",
            "Stir in fresh basil leaves.",
            "Serve this Thai Coconut Shrimp Curry over jasmine rice for a flavorful meal."
        ],
        "nutrition": {
            "calories": 420,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Thai",
            "Shrimp curry",
            "Thai",
            "Main course"
        ],
        "titleHindi": "थाई नारियल झींगा करी",
        "descriptionHindi": "एक स्वादिष्ट थाई डिनर जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 20 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "एक पैन में, नारियल के दूध को लाल करी पेस्ट, मछली सॉस और चीनी के साथ उबालें।",
            "कटी हुई शिमला मिर्च और तोरी डालें। सब्जियों के नरम होने तक पकाएं.",
            "झींगा डालें और तब तक पकाएं जब तक वे गुलाबी और अपारदर्शी न हो जाएं।",
            "ताजी तुलसी की पत्तियाँ मिलाएँ।",
            "स्वादिष्ट भोजन के लिए इस थाई नारियल झींगा करी को चमेली चावल के ऊपर परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 138,
        "title": "Greek Spanakopita",
        "description": "A delicious Greek appetizer that is perfect for any occasion. It takes about 30 mins to prepare.",
        "category": "Appetizer",
        "prepTime": "30 min",
        "cookTime": "40 min",
        "totalTime": "70 min",
        "servings": 8,
        "rating": 4.6,
        "image": "🍔",
        "color": "bg-blue-100 text-blue-600",
        "difficulty": "Medium",
        "ingredients": [
            {
                "name": "Phyllo dough",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "फिलो आटा"
            },
            {
                "name": "Spinach, chopped and cooked",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "पालक, कटा हुआ और पका हुआ"
            },
            {
                "name": "Feta cheese, crumbled",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "फ़ेटा चीज़, टुकड़ों में कटा हुआ"
            },
            {
                "name": "Onions, finely chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "प्याज, बारीक कटा हुआ"
            },
            {
                "name": "Eggs",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अंडे"
            },
            {
                "name": "Olive oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "जैतून का तेल"
            },
            {
                "name": "Dill, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "डिल, कटा हुआ"
            },
            {
                "name": "Salt and pepper to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक और काली मिर्च स्वादानुसार"
            }
        ],
        "steps": [
            "Preheat oven to 375°F (190°C).",
            "In a bowl, mix cooked chopped spinach with crumbled feta, chopped onions, beaten eggs, olive oil, dill, salt, and pepper.",
            "Layer sheets of phyllo dough in a baking dish, brushing each layer with olive oil.",
            "Spread the spinach and feta mixture over the phyllo layers.",
            "Top with more phyllo layers, brushing each with olive oil.",
            "Bake until golden brown. Slice and serve this delicious Greek Spanakopita!"
        ],
        "nutrition": {
            "calories": 280,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Greek",
            "Spanakopita",
            "Greek"
        ],
        "titleHindi": "ग्रीक स्पानाकोपिटा",
        "descriptionHindi": "एक स्वादिष्ट ग्रीक ऐपेटाइज़र जो किसी भी अवसर के लिए बिल्कुल उपयुक्त है। इसे तैयार करने में लगभग 30 मिनट का समय लगता है.",
        "categoryHindi": "क्षुधावर्धक",
        "stepsHindi": [
            "ओवन को 375°F (190°C) पर पहले से गरम कर लें।",
            "एक कटोरे में, पके हुए कटे हुए पालक को टुकड़े किए हुए फेटा, कटा हुआ प्याज, फेंटे हुए अंडे, जैतून का तेल, डिल, नमक और काली मिर्च के साथ मिलाएं।",
            "एक बेकिंग डिश में फ़ाइलो आटे की परतें बिछाएं, प्रत्येक परत पर जैतून का तेल लगाएं।",
            "पालक और फ़ेटा मिश्रण को फ़ाइलो परतों पर फैलाएँ।",
            "शीर्ष पर अधिक फ़ाइलो परतें डालें, प्रत्येक को जैतून के तेल से ब्रश करें।",
            "सुनहरा भूरा होने तक बेक करें. इस स्वादिष्ट ग्रीक स्पानाकोपीटा को काटें और परोसें!"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 139,
        "title": "Moroccan Couscous Salad",
        "description": "A delicious Moroccan lunch that is perfect for any occasion. It takes about 15 mins to prepare.",
        "category": "Lunch",
        "prepTime": "15 min",
        "cookTime": "10 min",
        "totalTime": "25 min",
        "servings": 6,
        "rating": 4.1,
        "image": "🍖",
        "color": "bg-purple-100 text-purple-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Couscous, cooked",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "कूसकूस, पकाया हुआ"
            },
            {
                "name": "Chickpeas, cooked",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चना, पका हुआ"
            },
            {
                "name": "Cherry tomatoes, halved",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चेरी टमाटर, आधा"
            },
            {
                "name": "Cucumber, diced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ककड़ी, टुकड़ों में कटा हुआ"
            },
            {
                "name": "Red onion, finely chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लाल प्याज, बारीक कटा हुआ"
            },
            {
                "name": "Fresh mint leaves, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताजी पुदीने की पत्तियां, कटी हुई"
            },
            {
                "name": "Feta cheese, crumbled",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "फ़ेटा चीज़, टुकड़ों में कटा हुआ"
            },
            {
                "name": "Lemon vinaigrette dressing",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नींबू विनाइग्रेटे ड्रेसिंग"
            }
        ],
        "steps": [
            "In a large bowl, combine cooked couscous, chickpeas, cherry tomatoes, cucumber, red onion, mint leaves, and crumbled feta.",
            "Drizzle with lemon vinaigrette dressing and toss to combine.",
            "Chill before serving. This Moroccan Couscous Salad makes a refreshing side dish."
        ],
        "nutrition": {
            "calories": 260,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Moroccan",
            "Couscous salad",
            "Moroccan"
        ],
        "titleHindi": "मोरक्कन कूसकूस सलाद",
        "descriptionHindi": "एक स्वादिष्ट मोरक्कन लंच जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 15 मिनट का समय लगता है.",
        "categoryHindi": "दिन का खाना",
        "stepsHindi": [
            "एक बड़े कटोरे में, पका हुआ कूसकूस, चना, चेरी टमाटर, खीरा, लाल प्याज, पुदीना की पत्तियां और क्रम्बल किया हुआ फेटा मिलाएं।",
            "नींबू विनैग्रेट ड्रेसिंग के साथ बूंदा बांदी करें और मिलाने के लिए टॉस करें।",
            "परोसने से पहले ठंडा करें। यह मोरक्कन कूसकूस सलाद एक ताज़ा साइड डिश बनाता है।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 140,
        "title": "Classic Mojito",
        "description": "A delicious Cocktail beverage that is perfect for any occasion. It takes about 10 mins to prepare.",
        "category": "Beverage",
        "prepTime": "10 min",
        "cookTime": "15 min",
        "totalTime": "25 min",
        "servings": 1,
        "rating": 4.7,
        "image": "🍗",
        "color": "bg-pink-100 text-pink-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Fresh mint leaves",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताज़ी पुदीने की पत्तियाँ"
            },
            {
                "name": "Lime, cut into wedges",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नींबू, वेजेज में काटें"
            },
            {
                "name": "Granulated sugar",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "दानेदार चीनी"
            },
            {
                "name": "White rum",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "सफ़ेद रम"
            },
            {
                "name": "Club soda",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "क्लब सोड़ा"
            },
            {
                "name": "Ice cubes",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बर्फ के टुकड़े"
            }
        ],
        "steps": [
            "In a glass, muddle fresh mint leaves with granulated sugar and lime wedges to release the flavors.",
            "Add white rum and stir well.",
            "Fill the glass with ice cubes and top with club soda.",
            "Stir gently and garnish with a sprig of mint.",
            "Sip and enjoy the classic and refreshing taste of a Mojito!"
        ],
        "nutrition": {
            "calories": 150,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Cocktail",
            "Mojito",
            "Cuban",
            "Cocktail"
        ],
        "titleHindi": "क्लासिक मोजिटो",
        "descriptionHindi": "एक स्वादिष्ट कॉकटेल पेय जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 10 मिनट का समय लगता है.",
        "categoryHindi": "पेय",
        "stepsHindi": [
            "स्वाद बढ़ाने के लिए एक गिलास में ताज़ी पुदीने की पत्तियों को दानेदार चीनी और नींबू के टुकड़ों के साथ मसल लें।",
            "सफ़ेद रम डालें और अच्छी तरह मिलाएँ।",
            "गिलास को बर्फ के टुकड़ों से भरें और ऊपर से क्लब सोडा डालें।",
            "धीरे से हिलाएँ और पुदीने की टहनी से सजाएँ।",
            "चुस्की लें और मोजिटो के क्लासिक और ताज़ा स्वाद का आनंद लें!"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 141,
        "title": "Caprese Bruschetta",
        "description": "A delicious Italian appetizer that is perfect for any occasion. It takes about 15 mins to prepare.",
        "category": "Appetizer",
        "prepTime": "15 min",
        "cookTime": "5 min",
        "totalTime": "20 min",
        "servings": 6,
        "rating": 4.2,
        "image": "🍚",
        "color": "bg-red-100 text-red-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Baguette, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बगुएट, कटा हुआ"
            },
            {
                "name": "Tomatoes, diced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टमाटर, टुकड़ों में काट लें"
            },
            {
                "name": "Fresh mozzarella, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताजा मोत्ज़ारेला, कटा हुआ"
            },
            {
                "name": "Fresh basil leaves",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताजा तुलसी के पत्ते"
            },
            {
                "name": "Balsamic glaze",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बाल्सेमिक शीशा लगाना"
            },
            {
                "name": "Olive oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "जैतून का तेल"
            },
            {
                "name": "Garlic, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लहसुन, कीमा बनाया हुआ"
            },
            {
                "name": "Salt and pepper to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक और काली मिर्च स्वादानुसार"
            }
        ],
        "steps": [
            "Preheat the oven broiler.",
            "Place baguette slices on a baking sheet and toast under the broiler until golden.",
            "In a bowl, combine diced tomatoes, sliced fresh mozzarella, minced garlic, and chopped fresh basil.",
            "Drizzle with olive oil, balsamic glaze, and season with salt and pepper.",
            "Spoon the tomato and mozzarella mixture onto the toasted baguette slices.",
            "Serve these delightful Caprese Bruschettas as a quick and tasty appetizer."
        ],
        "nutrition": {
            "calories": 150,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Italian",
            "Bruschetta",
            "Italian"
        ],
        "titleHindi": "कैप्रिस ब्रुशेटा",
        "descriptionHindi": "एक स्वादिष्ट इतालवी ऐपेटाइज़र जो किसी भी अवसर के लिए बिल्कुल उपयुक्त है। इसे तैयार करने में लगभग 15 मिनट का समय लगता है.",
        "categoryHindi": "क्षुधावर्धक",
        "stepsHindi": [
            "ओवन ब्रॉयलर को पहले से गरम कर लें।",
            "बैगूएट स्लाइस को बेकिंग शीट पर रखें और ब्रॉयलर के नीचे सुनहरा होने तक टोस्ट करें।",
            "एक कटोरे में, कटे हुए टमाटर, कटा हुआ ताजा मोत्ज़ारेला, कीमा बनाया हुआ लहसुन और कटी हुई ताजा तुलसी मिलाएं।",
            "जैतून का तेल, बाल्समिक ग्लेज़ छिड़कें और नमक और काली मिर्च डालें।",
            "टोस्टेड बैगूएट स्लाइस पर टमाटर और मोत्ज़ारेला मिश्रण को चम्मच से डालें।",
            "इन स्वादिष्ट कैप्रिस ब्रुशेटा को एक त्वरित और स्वादिष्ट ऐपेटाइज़र के रूप में परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 142,
        "title": "Teriyaki Chicken Stir-Fry",
        "description": "A delicious Japanese dinner that is perfect for any occasion. It takes about 15 mins to prepare.",
        "category": "Dinner",
        "prepTime": "15 min",
        "cookTime": "10 min",
        "totalTime": "25 min",
        "servings": 4,
        "rating": 4.6,
        "image": "🍲",
        "color": "bg-orange-100 text-orange-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Chicken breast, thinly sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चिकन ब्रेस्ट, पतला कटा हुआ"
            },
            {
                "name": "Broccoli florets",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ब्रोकोली फ्लोरेट्स"
            },
            {
                "name": "Bell peppers, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "शिमला मिर्च, कटी हुई"
            },
            {
                "name": "Carrots, julienned",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "गाजर, जुलिएनड"
            },
            {
                "name": "Soy sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "सोया सॉस"
            },
            {
                "name": "Teriyaki sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टेरीयाकी सॉस"
            },
            {
                "name": "Sesame oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "तिल का तेल"
            },
            {
                "name": "Garlic, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लहसुन, कीमा बनाया हुआ"
            },
            {
                "name": "Ginger, grated",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अदरक, कद्दूकस किया हुआ"
            },
            {
                "name": "Cooked rice for serving",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "परोसने के लिए पका हुआ चावल"
            }
        ],
        "steps": [
            "In a wok or skillet, heat sesame oil and sauté minced garlic and grated ginger until fragrant.",
            "Add thinly sliced chicken and cook until browned.",
            "Stir in broccoli florets, sliced bell peppers, and julienned carrots. Cook until vegetables are tender-crisp.",
            "Pour soy sauce and teriyaki sauce over the stir-fry. Toss to combine.",
            "Serve this quick Teriyaki Chicken Stir-Fry over cooked rice for a delicious meal."
        ],
        "nutrition": {
            "calories": 320,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Japanese",
            "Teriyaki chicken",
            "Japanese",
            "Stir-fry"
        ],
        "titleHindi": "टेरीयाकी चिकन स्टिर-फ्राई",
        "descriptionHindi": "एक स्वादिष्ट जापानी रात्रिभोज जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 15 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "एक कड़ाही या कड़ाही में तिल का तेल गर्म करें और उसमें कीमा बनाया हुआ लहसुन और कसा हुआ अदरक खुशबू आने तक भूनें।",
            "इसमें बारीक कटा हुआ चिकन डालें और भूरा होने तक पकाएं।",
            "ब्रोकोली के फूल, कटी हुई शिमला मिर्च और बारीक कटी हुई गाजर मिलाएँ। सब्ज़ियों के नरम-कुरकुरा होने तक पकाएँ।",
            "स्टर-फ्राई के ऊपर सोया सॉस और टेरीयाकी सॉस डालें। मिलाने के लिए टॉस करें.",
            "स्वादिष्ट भोजन के लिए इस त्वरित टेरीयाकी चिकन स्टिर-फ्राई को पके हुए चावल के साथ परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 143,
        "title": "Mango Avocado Salsa",
        "description": "A delicious Mexican snack that is perfect for any occasion. It takes about 10 mins to prepare.",
        "category": "Snack",
        "prepTime": "10 min",
        "cookTime": "15 min",
        "totalTime": "25 min",
        "servings": 4,
        "rating": 4.1,
        "image": "🍝",
        "color": "bg-amber-100 text-amber-700",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Mango, diced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "आम, टुकड़ों में कटा हुआ"
            },
            {
                "name": "Avocado, diced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "एवोकाडो, टुकड़ों में कटा हुआ"
            },
            {
                "name": "Red onion, finely chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लाल प्याज, बारीक कटा हुआ"
            },
            {
                "name": "Cilantro, chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "धनिया, कटा हुआ"
            },
            {
                "name": "Lime juice",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नींबू का रस"
            },
            {
                "name": "Salt and pepper to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक और काली मिर्च स्वादानुसार"
            },
            {
                "name": "Tortilla chips for serving",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "परोसने के लिए टॉर्टिला चिप्स"
            }
        ],
        "steps": [
            "In a bowl, combine diced mango, diced avocado, finely chopped red onion, and chopped cilantro.",
            "Drizzle with fresh lime juice and season with salt and pepper. Toss gently to combine.",
            "Serve this refreshing Mango Avocado Salsa with tortilla chips for a quick and tasty snack."
        ],
        "nutrition": {
            "calories": 90,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Mexican",
            "Mango salsa",
            "Mexican"
        ],
        "titleHindi": "मैंगो एवोकैडो साल्सा",
        "descriptionHindi": "एक स्वादिष्ट मेक्सिकन नाश्ता जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 10 मिनट का समय लगता है.",
        "categoryHindi": "नाश्ता",
        "stepsHindi": [
            "एक कटोरे में, कटे हुए आम, कटे हुए एवोकैडो, बारीक कटा हुआ लाल प्याज और कटा हरा धनिया मिलाएं।",
            "ताजा नीबू का रस छिड़कें और नमक और काली मिर्च डालें। मिलाने के लिए धीरे से टॉस करें।",
            "त्वरित और स्वादिष्ट नाश्ते के लिए इस ताज़ा मैंगो एवोकैडो साल्सा को टॉर्टिला चिप्स के साथ परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 144,
        "title": "Shrimp and Asparagus Stir-Fry",
        "description": "A delicious Asian dinner that is perfect for any occasion. It takes about 15 mins to prepare.",
        "category": "Dinner",
        "prepTime": "15 min",
        "cookTime": "10 min",
        "totalTime": "25 min",
        "servings": 3,
        "rating": 4.7,
        "image": "🍠",
        "color": "bg-yellow-100 text-yellow-700",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Shrimp, peeled and deveined",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "झींगा, छिला हुआ और छिला हुआ"
            },
            {
                "name": "Asparagus spears, trimmed and cut into pieces",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "शतावरी भाले, छंटनी और टुकड़ों में काट लें"
            },
            {
                "name": "Soy sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "सोया सॉस"
            },
            {
                "name": "Sesame oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "तिल का तेल"
            },
            {
                "name": "Garlic, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लहसुन, कीमा बनाया हुआ"
            },
            {
                "name": "Ginger, grated",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अदरक, कद्दूकस किया हुआ"
            },
            {
                "name": "Red pepper flakes",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "रेड पेपर फ्लेक्स"
            },
            {
                "name": "Green onions, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "हरा प्याज़, कटा हुआ"
            },
            {
                "name": "Cooked noodles or rice for serving",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "परोसने के लिए पके हुए नूडल्स या चावल"
            }
        ],
        "steps": [
            "In a wok or skillet, heat sesame oil and sauté minced garlic, grated ginger, and red pepper flakes until fragrant.",
            "Add shrimp and cook until they turn pink and opaque.",
            "Stir in asparagus pieces and cook until crisp-tender.",
            "Pour soy sauce over the stir-fry and toss to combine.",
            "Serve this quick Shrimp and Asparagus Stir-Fry over cooked noodles or rice."
        ],
        "nutrition": {
            "calories": 250,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Asian",
            "Shrimp stir-fry",
            "Asian",
            "Quick"
        ],
        "titleHindi": "झींगा और शतावरी स्टिर-फ्राई",
        "descriptionHindi": "एक स्वादिष्ट एशियाई रात्रिभोज जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 15 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "एक कड़ाही या कड़ाही में तिल का तेल गर्म करें और उसमें कीमा बनाया हुआ लहसुन, कसा हुआ अदरक और लाल मिर्च के टुकड़े सुगंधित होने तक भूनें।",
            "झींगा डालें और तब तक पकाएं जब तक वे गुलाबी और अपारदर्शी न हो जाएं।",
            "शतावरी के टुकड़े मिलाएं और कुरकुरा होने तक पकाएं।",
            "स्टर-फ्राई के ऊपर सोया सॉस डालें और मिलाने के लिए टॉस करें।",
            "इस त्वरित झींगा और शतावरी स्टिर-फ्राई को पके हुए नूडल्स या चावल के साथ परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 145,
        "title": "Italian Margherita Pizza",
        "description": "A delicious Italian dinner that is perfect for any occasion. It takes about 20 mins to prepare.",
        "category": "Dinner",
        "prepTime": "20 min",
        "cookTime": "12 min",
        "totalTime": "32 min",
        "servings": 4,
        "rating": 4.7,
        "image": "🍢",
        "color": "bg-green-100 text-green-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Pizza dough",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "पिज्जा का गुंथा हुआ आटा"
            },
            {
                "name": "Tomatoes, thinly sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "टमाटर, पतले कटे हुए"
            },
            {
                "name": "Fresh mozzarella, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताजा मोत्ज़ारेला, कटा हुआ"
            },
            {
                "name": "Fresh basil leaves",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ताजा तुलसी के पत्ते"
            },
            {
                "name": "Olive oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "जैतून का तेल"
            },
            {
                "name": "Garlic, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लहसुन, कीमा बनाया हुआ"
            },
            {
                "name": "Salt and pepper to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक और काली मिर्च स्वादानुसार"
            }
        ],
        "steps": [
            "Preheat the oven to the highest temperature your oven can go.",
            "Roll out pizza dough on a floured surface and transfer to a pizza stone or baking sheet.",
            "Brush the dough with olive oil and sprinkle minced garlic over the surface.",
            "Arrange thinly sliced tomatoes and fresh mozzarella slices on the dough.",
            "Bake until the crust is golden and the cheese is melted and bubbly.",
            "Top with fresh basil leaves and season with salt and pepper. Slice and serve this classic Margherita Pizza."
        ],
        "nutrition": {
            "calories": 280,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Italian",
            "Margherita pizza",
            "Italian",
            "Quick"
        ],
        "titleHindi": "इटैलियन मार्गेरिटा पिज़्ज़ा",
        "descriptionHindi": "एक स्वादिष्ट इतालवी रात्रिभोज जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 20 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "ओवन को उस उच्चतम तापमान पर पहले से गरम कर लें जिस पर आपका ओवन जा सकता है।",
            "पिज़्ज़ा के आटे को आटे की सतह पर बेलें और पिज़्ज़ा स्टोन या बेकिंग शीट पर रखें।",
            "आटे को जैतून के तेल से ब्रश करें और सतह पर कीमा बनाया हुआ लहसुन छिड़कें।",
            "आटे पर पतले-पतले कटे टमाटर और ताजा मोत्ज़ारेला स्लाइस रखें।",
            "जब तक क्रस्ट सुनहरा न हो जाए और पनीर पिघलकर बुलबुले जैसा न हो जाए, तब तक बेक करें।",
            "ऊपर ताजी तुलसी की पत्तियाँ डालें और नमक और काली मिर्च डालें। इस क्लासिक मार्गेरिटा पिज़्ज़ा को स्लाइस करके परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 146,
        "title": "Pesto Pasta with Cherry Tomatoes",
        "description": "A delicious Italian dinner that is perfect for any occasion. It takes about 15 mins to prepare.",
        "category": "Dinner",
        "prepTime": "15 min",
        "cookTime": "10 min",
        "totalTime": "25 min",
        "servings": 3,
        "rating": 4.3,
        "image": "🍣",
        "color": "bg-emerald-100 text-emerald-700",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Penne pasta",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "पेनने पास्ता"
            },
            {
                "name": "Basil pesto sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "तुलसी पेस्टो सॉस"
            },
            {
                "name": "Cherry tomatoes, halved",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चेरी टमाटर, आधा"
            },
            {
                "name": "Parmesan cheese, grated",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "परमेसन चीज़, कसा हुआ"
            },
            {
                "name": "Salt and black pepper to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "स्वादानुसार नमक और काली मिर्च"
            }
        ],
        "steps": [
            "Cook penne pasta according to package instructions. Drain and set aside.",
            "In a pan, warm basil pesto sauce. Add cooked pasta and toss to coat evenly.",
            "Stir in halved cherry tomatoes and cook until they soften slightly.",
            "Season with salt and black pepper to taste. Garnish with grated Parmesan cheese.",
            "Serve this quick and flavorful Pesto Pasta with Cherry Tomatoes for a delicious meal."
        ],
        "nutrition": {
            "calories": 320,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Italian",
            "Pesto pasta",
            "Italian",
            "Quick"
        ],
        "titleHindi": "चेरी टमाटर के साथ पेस्टो पास्ता",
        "descriptionHindi": "एक स्वादिष्ट इतालवी रात्रिभोज जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 15 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "पेने पास्ता को पैकेज के निर्देशों के अनुसार पकाएं। छानकर अलग रख दें।",
            "एक पैन में तुलसी पेस्टो सॉस गर्म करें। पका हुआ पास्ता डालें और समान रूप से कोट करने के लिए टॉस करें।",
            "आधे कटे हुए चेरी टमाटर डालें और हल्का नरम होने तक पकाएँ।",
            "स्वादानुसार नमक और काली मिर्च डालें। कद्दूकस किए हुए परमेसन चीज़ से सजाएँ।",
            "स्वादिष्ट भोजन के लिए इस त्वरित और स्वादिष्ट पेस्टो पास्ता को चेरी टमाटर के साथ परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 147,
        "title": "Hawaiian Chicken Skewers",
        "description": "A delicious Hawaiian dinner that is perfect for any occasion. It takes about 20 mins to prepare.",
        "category": "Dinner",
        "prepTime": "20 min",
        "cookTime": "15 min",
        "totalTime": "35 min",
        "servings": 4,
        "rating": 4.7,
        "image": "🥗",
        "color": "bg-teal-100 text-teal-700",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Chicken breasts, cut into chunks",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चिकन ब्रेस्ट, टुकड़ों में काट लें"
            },
            {
                "name": "Pineapple chunks",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अनानास के टुकड़े"
            },
            {
                "name": "Bell peppers, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "शिमला मिर्च, कटी हुई"
            },
            {
                "name": "Red onion, cut into wedges",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लाल प्याज, वेजेज में काटें"
            },
            {
                "name": "Soy sauce",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "सोया सॉस"
            },
            {
                "name": "Pineapple juice",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अनानास का रस"
            },
            {
                "name": "Ketchup",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "केचप"
            },
            {
                "name": "Brown sugar",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ब्राउन शुगर"
            },
            {
                "name": "Garlic, minced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लहसुन, कीमा बनाया हुआ"
            },
            {
                "name": "Wooden skewers, soaked in water",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लकड़ी की सींकें, पानी में भिगोई हुई"
            }
        ],
        "steps": [
            "Preheat the grill or grill pan.",
            "In a bowl, whisk together soy sauce, pineapple juice, ketchup, brown sugar, and minced garlic to make the marinade.",
            "Thread chicken chunks, pineapple chunks, bell pepper slices, and red onion wedges onto soaked wooden skewers.",
            "Brush the skewers with the marinade and grill until the chicken is cooked through.",
            "Serve these Hawaiian Chicken Skewers with rice or as a tasty appetizer."
        ],
        "nutrition": {
            "calories": 280,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Hawaiian",
            "Chicken skewers",
            "Hawaiian",
            "Quick"
        ],
        "titleHindi": "हवाईयन चिकन कटार",
        "descriptionHindi": "एक स्वादिष्ट हवाईयन डिनर जो किसी भी अवसर के लिए बिल्कुल उपयुक्त है। इसे तैयार करने में लगभग 20 मिनट का समय लगता है.",
        "categoryHindi": "रात का खाना",
        "stepsHindi": [
            "ग्रिल या ग्रिल पैन को पहले से गरम कर लें।",
            "मैरिनेड बनाने के लिए एक कटोरे में सोया सॉस, अनानास का रस, केचप, ब्राउन शुगर और कीमा बनाया हुआ लहसुन को एक साथ मिलाएं।",
            "चिकन के टुकड़े, अनानास के टुकड़े, बेल मिर्च के टुकड़े और लाल प्याज के टुकड़ों को भीगी हुई लकड़ी की सीख पर पिरोएं।",
            "सीखों को मैरिनेड से ब्रश करें और चिकन पकने तक ग्रिल करें।",
            "इन हवाईयन चिकन स्कूअर्स को चावल के साथ या स्वादिष्ट ऐपेटाइज़र के रूप में परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 148,
        "title": "Cucumber Avocado Rolls",
        "description": "A delicious Japanese appetizer that is perfect for any occasion. It takes about 20 mins to prepare.",
        "category": "Appetizer",
        "prepTime": "20 min",
        "cookTime": "15 min",
        "totalTime": "35 min",
        "servings": 3,
        "rating": 4.3,
        "image": "🥪",
        "color": "bg-blue-100 text-blue-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Sushi rice, seasoned",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "सुशी चावल, अनुभवी"
            },
            {
                "name": "Nori sheets",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नोरी चादरें"
            },
            {
                "name": "Cucumber, julienned",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ककड़ी, जुलिएनड"
            },
            {
                "name": "Avocado, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "एवोकाडो, कटा हुआ"
            },
            {
                "name": "Soy sauce for dipping",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "डुबाने के लिए सोया सॉस"
            },
            {
                "name": "Pickled ginger and wasabi for serving",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "परोसने के लिए मसालेदार अदरक और वसाबी"
            }
        ],
        "steps": [
            "Place a sheet of nori on a bamboo sushi rolling mat.",
            "Spread seasoned sushi rice evenly over the nori, leaving a small border at the top.",
            "Arrange julienned cucumber and sliced avocado along the bottom edge of the rice.",
            "Roll the nori tightly from the bottom, using the bamboo mat to shape the roll.",
            "Slice the roll into bite-sized pieces. Serve these refreshing Cucumber Avocado Rolls with soy sauce, pickled ginger, and wasabi."
        ],
        "nutrition": {
            "calories": 180,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Japanese",
            "Sushi rolls",
            "Japanese",
            "Quick"
        ],
        "titleHindi": "ककड़ी एवोकैडो रोल्स",
        "descriptionHindi": "एक स्वादिष्ट जापानी ऐपेटाइज़र जो किसी भी अवसर के लिए बिल्कुल उपयुक्त है। इसे तैयार करने में लगभग 20 मिनट का समय लगता है.",
        "categoryHindi": "क्षुधावर्धक",
        "stepsHindi": [
            "बांस की सुशी रोलिंग चटाई पर नोरी की एक शीट रखें।",
            "अनुभवी सुशी चावल को नोरी पर समान रूप से फैलाएं, शीर्ष पर एक छोटा बॉर्डर छोड़ दें।",
            "जूलिएन्ड खीरे और कटे हुए एवोकैडो को चावल के निचले किनारे पर व्यवस्थित करें।",
            "रोल को आकार देने के लिए बांस की चटाई का उपयोग करके, नोरी को नीचे से कसकर रोल करें।",
            "रोल को छोटे टुकड़ों में काट लें. इन ताज़ा ककड़ी एवोकैडो रोल्स को सोया सॉस, मसालेदार अदरक और वसाबी के साथ परोसें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 149,
        "title": "Mediterranean Chickpea Salad",
        "description": "A delicious Mediterranean lunch that is perfect for any occasion. It takes about 15 mins to prepare.",
        "category": "Lunch",
        "prepTime": "15 min",
        "cookTime": "15 min",
        "totalTime": "30 min",
        "servings": 4,
        "rating": 4.7,
        "image": "🍳",
        "color": "bg-purple-100 text-purple-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Canned chickpeas, drained and rinsed",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "डिब्बाबंद चने, छानकर धोये हुए"
            },
            {
                "name": "Cherry tomatoes, halved",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "चेरी टमाटर, आधा"
            },
            {
                "name": "Cucumber, diced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ककड़ी, टुकड़ों में कटा हुआ"
            },
            {
                "name": "Red onion, finely chopped",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "लाल प्याज, बारीक कटा हुआ"
            },
            {
                "name": "Kalamata olives, sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "कलामाता जैतून, कटा हुआ"
            },
            {
                "name": "Feta cheese, crumbled",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "फ़ेटा चीज़, टुकड़ों में कटा हुआ"
            },
            {
                "name": "Olive oil",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "जैतून का तेल"
            },
            {
                "name": "Lemon juice",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नींबू का रस"
            },
            {
                "name": "Dried oregano",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "सूखा अजवायन"
            },
            {
                "name": "Salt and pepper to taste",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नमक और काली मिर्च स्वादानुसार"
            }
        ],
        "steps": [
            "In a large bowl, combine chickpeas, cherry tomatoes, cucumber, red onion, olives, and feta cheese.",
            "In a small bowl, whisk together olive oil, lemon juice, dried oregano, salt, and pepper to make the dressing.",
            "Pour the dressing over the salad and toss gently to combine.",
            "Chill before serving. Enjoy this quick and refreshing Mediterranean Chickpea Salad."
        ],
        "nutrition": {
            "calories": 220,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Mediterranean",
            "Chickpea salad",
            "Mediterranean",
            "Quick"
        ],
        "titleHindi": "भूमध्यसागरीय चने का सलाद",
        "descriptionHindi": "एक स्वादिष्ट भूमध्यसागरीय दोपहर का भोजन जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 15 मिनट का समय लगता है.",
        "categoryHindi": "दिन का खाना",
        "stepsHindi": [
            "एक बड़े कटोरे में चना, चेरी टमाटर, खीरा, लाल प्याज, जैतून और फ़ेटा चीज़ मिलाएं।",
            "ड्रेसिंग बनाने के लिए एक छोटे कटोरे में जैतून का तेल, नींबू का रस, सूखे अजवायन, नमक और काली मिर्च को एक साथ मिलाएं।",
            "ड्रेसिंग को सलाद के ऊपर डालें और मिलाने के लिए धीरे से हिलाएँ।",
            "परोसने से पहले ठंडा करें। इस त्वरित और ताज़ा भूमध्य चना सलाद का आनंद लें।"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    },
    {
        "id": 150,
        "title": "Pineapple Coconut Smoothie",
        "description": "A delicious Smoothie breakfast that is perfect for any occasion. It takes about 10 mins to prepare.",
        "category": "Breakfast",
        "prepTime": "10 min",
        "cookTime": "15 min",
        "totalTime": "25 min",
        "servings": 2,
        "rating": 4.4,
        "image": "🥞",
        "color": "bg-pink-100 text-pink-600",
        "difficulty": "Easy",
        "ingredients": [
            {
                "name": "Pineapple chunks, fresh or frozen",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "अनानास के टुकड़े, ताजा या जमे हुए"
            },
            {
                "name": "Coconut milk",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "नारियल का दूध"
            },
            {
                "name": "Greek yogurt",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "ग्रीक दही"
            },
            {
                "name": "Banana, peeled and sliced",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "केला, छिला हुआ और कटा हुआ"
            },
            {
                "name": "Honey",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "शहद"
            },
            {
                "name": "Ice cubes",
                "amount": "1",
                "unit": "serving",
                "notes": "",
                "nameHindi": "बर्फ के टुकड़े"
            }
        ],
        "steps": [
            "In a blender, combine pineapple chunks, coconut milk, Greek yogurt, banana, and honey.",
            "Blend until smooth and creamy.",
            "Add ice cubes and blend again until the smoothie is chilled.",
            "Pour into a glass and enjoy the tropical goodness of this Pineapple Coconut Smoothie!"
        ],
        "nutrition": {
            "calories": 200,
            "protein": 20,
            "carbs": 40,
            "fat": 15,
            "fiber": 4,
            "sugar": 6,
            "sodium": 450
        },
        "chefTips": [
            "Adjust seasoning to taste.",
            "Serve hot for the best flavor."
        ],
        "substitutions": [],
        "tags": [
            "Smoothie",
            "Smoothie",
            "Pineapple",
            "Coconut"
        ],
        "titleHindi": "अनानास नारियल स्मूदी",
        "descriptionHindi": "एक स्वादिष्ट स्मूथी नाश्ता जो किसी भी अवसर के लिए उपयुक्त है। इसे तैयार करने में लगभग 10 मिनट का समय लगता है.",
        "categoryHindi": "नाश्ता",
        "stepsHindi": [
            "एक ब्लेंडर में अनानास के टुकड़े, नारियल का दूध, ग्रीक दही, केला और शहद मिलाएं।",
            "चिकना और मलाईदार होने तक ब्लेंड करें।",
            "बर्फ के टुकड़े डालें और स्मूदी के ठंडा होने तक फिर से ब्लेंड करें।",
            "एक गिलास में डालें और इस अनानास नारियल स्मूदी की उष्णकटिबंधीय अच्छाई का आनंद लें!"
        ],
        "chefTipsHindi": [
            "स्वाद के अनुसार मसाला समायोजित करें।",
            "बेहतरीन स्वाद के लिए गर्मागर्म परोसें।"
        ]
    }
];

export function getRecipeById(id: number) {
    return ALL_RECIPES.find((recipe) => recipe.id === id);
}

export function searchRecipesByIngredients(ingredients: string[]) {
    const lowerIngredients = ingredients.map(i => i.toLowerCase());
    return ALL_RECIPES.filter(recipe => {
        const recipeIngredients = recipe.ingredients.map(i => i.name.toLowerCase());
        return lowerIngredients.some(ingredient => recipeIngredients.some(ri => ri.includes(ingredient) || ingredient.includes(ri)));
    }).sort((a, b) => {
        const aMatches = a.ingredients.filter(i => lowerIngredients.some(li => i.name.toLowerCase().includes(li))).length;
        const bMatches = b.ingredients.filter(i => lowerIngredients.some(li => i.name.toLowerCase().includes(li))).length;
        return bMatches - aMatches;
    });
}

export function filterRecipesByDiet(recipes: Recipe[], diet: string) {
    const dietFilters: Record<string, (r: Recipe) => boolean> = {
        vegetarian: r => r.tags.some(t => t.toLowerCase().includes('vegetarian')),
        quick: r => parseInt(r.totalTime) <= 30,
        lowCalorie: r => r.nutrition.calories < 400,
        highProtein: r => r.nutrition.protein >= 25,
    };
    return dietFilters[diet] ? recipes.filter(dietFilters[diet]) : recipes;
}

export function getRecipesByCategory(category: string) {
    if (category === "All") return ALL_RECIPES;
    return ALL_RECIPES.filter(r => r.category === category);
}
