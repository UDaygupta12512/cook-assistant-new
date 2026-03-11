/**
 * Advanced Mock AI Model for Culinary Generation
 * This simulates a complex LLM logic by mapping dish keywords to a deep knowledge base.
 */

interface CulinaryProfile {
    baseIngredients: { name: string, nameHindi: string, amount: string, unit: string, category?: string }[];
    techniques: { name: string, hindi: string }[];
    chefTips: { text: string, hindi: string }[];
    descriptionPrefix: string;
}

export type DietaryGoal = 'Keto' | 'High Protein' | 'Low Carb' | 'Vegan' | 'Vegetarian' | 'Paleo' | 'Standard';

export type DietarySubstitution = { name: string; nameHindi: string; amount?: string; unit?: string };

export const SUBSTITUTION_RULES: Record<DietaryGoal, Record<string, DietarySubstitution>> = {
    'Vegan': {
        'chicken': { name: 'Firm Tofu', nameHindi: 'टोफू', amount: '1', unit: 'block' },
        'cream': { name: 'Coconut Cream', nameHindi: 'नारियल की मलाई', amount: '1/4', unit: 'cup' },
        'butter': { name: 'Olive Oil', nameHindi: 'जैतून का तेल', amount: '2', unit: 'tbsp' },
        'cheese': { name: 'Nutritional Yeast', nameHindi: 'पोषण खमीर', amount: '2', unit: 'tbsp' },
        'paneer': { name: 'Extra Firm Tofu', nameHindi: 'टोफू', amount: '200', unit: 'g' },
    },
    'Keto': {
        'rice': { name: 'Cauliflower Rice', nameHindi: 'फूलगोभी के चावल', amount: '2', unit: 'cups' },
        'flour': { name: 'Almond Flour', nameHindi: 'बादाम का आटा', amount: '1', unit: 'cup' },
        'pasta': { name: 'Zucchini Noodles (Zoodles)', nameHindi: 'ज़ुचिनी नूडल्स', amount: '300', unit: 'g' },
        'sugar': { name: 'Stevia/Erythritol', nameHindi: 'स्टीविया', amount: '1', unit: 'tsp' },
    },
    'High Protein': {
        'rice': { name: 'Quinoa', nameHindi: 'क्विनोआ', amount: '1', unit: 'cup' },
    },
    // Close-enough defaults: treat Low Carb similar to Keto for substitutions.
    'Low Carb': {
        'rice': { name: 'Cauliflower Rice', nameHindi: 'फूलगोभी के चावल', amount: '2', unit: 'cups' },
        'flour': { name: 'Almond Flour', nameHindi: 'बादाम का आटा', amount: '1', unit: 'cup' },
        'pasta': { name: 'Zucchini Noodles (Zoodles)', nameHindi: 'ज़ुचिनी नूडल्स', amount: '300', unit: 'g' },
        'sugar': { name: 'Stevia/Erythritol', nameHindi: 'स्टीविया', amount: '1', unit: 'tsp' },
    },
    'Vegetarian': {},
    'Paleo': {},
    'Standard': {}
};

const KNOWLEDGE_BASE: Record<string, CulinaryProfile> = {
    "dosa": {
        baseIngredients: [
            { name: "Fermented rice and lentil batter", nameHindi: "किण्वित चावल और दाल का घोल", amount: "2", unit: "cups" },
            { name: "Potatoes (boiled and mashed)", nameHindi: "आलू (उबले और मसले हुए)", amount: "3", unit: "medium" },
            { name: "Mustard seeds", nameHindi: "सरसों के बीज", amount: "1", unit: "tsp" },
            { name: "Curry leaves", nameHindi: "करी पत्ता", amount: "10-12", unit: "leaves" },
            { name: "Turmeric powder", nameHindi: "हल्दी पाउडर", amount: "1/2", unit: "tsp" }
        ],
        techniques: [
            { name: "Boil potatoes until fork-tender, peel and mash them well. Set aside.", hindi: "आलू को फोर्क से नरम होने तक उबालें, छीलें और अच्छी तरह मसल लें।" },
            { name: "Heat 2 tbsp oil in a pan. Add mustard seeds and let them splutter, then add curry leaves and urad dal.", hindi: "एक पैन में 2 बड़े चम्मच तेल गर्म करें। सरसों के बीज डालें और तड़कने दें, फिर करी पत्ता और उड़द दाल डालें।" },
            { name: "Add chopped onions and green chilies. Sauté until onions turn translucent, about 3-4 minutes.", hindi: "कटा प्याज और हरी मिर्च डालें। प्याज को 3-4 मिनट तक पारदर्शी होने तक भूनें।" },
            { name: "Add turmeric powder and mashed potatoes. Mix well, season with salt, and cook for 2 minutes. Set the masala aside.", hindi: "हल्दी पाउडर और मसले हुए आलू डालें। अच्छी तरह मिलाएं, नमक डालें और 2 मिनट पकाएं। मसाला अलग रखें।" },
            { name: "Heat a flat tawa on medium-high heat. Sprinkle water to test; if it sizzles, the tawa is ready.", hindi: "एक सपाट तवा मध्यम-तेज आंच पर गर्म करें। पानी छिड़कें; अगर यह चिड़चिड़ाता है, तो तवा तैयार है।" },
            { name: "Pour a ladle of batter in the center and spread it in thin circular motions from inside to out.", hindi: "बीच में एक कड़छी घोल डालें और इसे अंदर से बाहर की ओर गोलाकार गति में पतला फैलाएं।" },
            { name: "Drizzle oil around the edges. Cook on medium heat until the bottom turns golden and crispy, about 2-3 minutes.", hindi: "किनारों पर तेल छिड़कें। मध्यम आंच पर तब तक पकाएं जब तक नीचे सुनहरा और कुरकुरा न हो जाए, लगभग 2-3 मिनट।" },
            { name: "Place 2-3 spoons of potato masala in the center, fold the dosa and serve hot with sambar and chutneys.", hindi: "बीच में 2-3 चम्मच आलू मसाला रखें, डोसा मोड़ें और सांभर और चटनी के साथ गर्मा गर्म परोसें।" }
        ],
        chefTips: [
            { text: "Use a cast iron tawa for the best crispiness.", hindi: "बेहतरीन कुरकुरेपन के लिए लोहे के तवे का प्रयोग करें।" },
            { text: "Rub half an onion on the tawa to prevent sticking.", hindi: "घोल को चिपकने से रोकने के लिए तवे पर आधा प्याज रगड़ें।" }
        ],
        descriptionPrefix: "A thin, crispy South Indian crepe filled with spicy potato mixture."
    },
    "paneer": {
        baseIngredients: [
            { name: "Paneer (Cottage Cheese)", nameHindi: "पनीर", amount: "250", unit: "g" },
            { name: "Heavy cream", nameHindi: "हैवी क्रीम", amount: "1/4", unit: "cup" },
            { name: "Tomato puree", nameHindi: "टमाटर की प्यूरी", amount: "1", unit: "cup" },
            { name: "Kashmiri red chili powder", nameHindi: "कश्मीरी लाल मिर्च पाउडर", amount: "1", unit: "tbsp" },
            { name: "Kasuri Methi", nameHindi: "कसूरी मेथी", amount: "1", unit: "tsp" }
        ],
        techniques: [
            { name: "Cut paneer into 1-inch cubes. Soak in warm water for 10 minutes to keep them soft.", hindi: "पनीर को 1 इंच के टुकड़ों में काटें। नरम रखने के लिए 10 मिनट गरम पानी में भिगोएं।" },
            { name: "Heat 2 tbsp ghee or oil in a heavy pan. Add cumin seeds and let them splutter.", hindi: "2 बड़े चम्मच घी या तेल गरम करें। जीरा डालें और तड़कने दें।" },
            { name: "Add ginger-garlic paste and sauté for 1-2 minutes until the raw smell disappears.", hindi: "अदरक-लहसुन का पेस्ट डालें और 1-2 मिनट तक कच्ची महक जाने तक भूनें।" },
            { name: "Add tomato puree. Cook on medium heat for 8-10 minutes until oil separates from the gravy.", hindi: "टमाटर प्यूरी डालें। 8-10 मिनट तक मध्यम आंच पर पकाएं जब तक तेल अलग न हो जाए।" },
            { name: "Add Kashmiri red chili, turmeric, coriander, and garam masala. Stir well for 1 minute.", hindi: "कश्मीरी लाल मिर्च, हल्दी, धनिया और गरम मसाला डालें। 1 मिनट अच्छी तरह चलाएं।" },
            { name: "Add 1/2 cup water and bring to a simmer. Add the paneer cubes gently and cook for 3-4 minutes.", hindi: "1/2 कप पानी डालें और उबाल आने दें। पनीर के टुकड़े धीरे से डालें और 3-4 मिनट पकाएं।" },
            { name: "Stir in cream and crushed kasuri methi. Mix gently and cook for 2 more minutes on low heat.", hindi: "क्रीम और कसूरी मेथी डालें। धीरे से मिलाएं और धीमी आंच पर 2 मिनट और पकाएं।" },
            { name: "Garnish with fresh coriander and a drizzle of cream. Serve hot with naan, roti, or jeera rice.", hindi: "ताजा धनिया और क्रीम से सजाएं। नान, रोटी, या जीरा राइस के साथ गरमा गरम परोसें।" }
        ],
        chefTips: [
            { text: "Soak paneer in warm water for 10 mins for extra softness.", hindi: "अतिरिक्त कोमलता के लिए पनीर को 10 मिनट के लिए गर्म पानी में भिगोएँ।" }
        ],
        descriptionPrefix: "A rich and creamy Indian delicacy featuring soft paneer in a spiced gravy."
    },
    "pasta": {
        baseIngredients: [
            { name: "Semolina pasta", nameHindi: "सेमोलीना पास्ता", amount: "250", unit: "g" },
            { name: "Extra virgin olive oil", nameHindi: "जैतून का तेल", amount: "2", unit: "tbsp" },
            { name: "Fresh Garlic", nameHindi: "ताजा लहसुन", amount: "4", unit: "cloves" },
            { name: "Parmesan cheese", nameHindi: "परमेसन चीज़", amount: "1/4", unit: "cup" },
            { name: "Fresh basil", nameHindi: "ताजी तुलसी", amount: "1/2", unit: "cup" }
        ],
        techniques: [
            { name: "Bring a large pot of water to a rolling boil. Add 1 tbsp salt per liter of water.", hindi: "एक बड़े बर्तन में पानी उबालें। प्रति लीटर पानी में 1 बड़ा चम्मच नमक डालें।" },
            { name: "Add pasta and cook for 1 minute less than package instructions (for al dente). Reserve 1 cup pasta water before draining.", hindi: "पास्ता डालें और पैकेज निर्देशों से 1 मिनट कम पकाएं। छानने से पहले 1 कप पास्ता पानी अलग रखें।" },
            { name: "While pasta cooks, heat olive oil in a large pan over medium heat. Add sliced garlic and cook until lightly golden (1-2 min).", hindi: "जब पास्ता पक रहा हो, एक बड़े पैन में जैतून का तेल गरम करें। कटा हुआ लहसुन डालें और हल्का सुनहरा होने तक पकाएं।" },
            { name: "Add chili flakes or any additional vegetables/protein at this stage. Cook for 2-3 minutes.", hindi: "मिर्च फ्लेक्स या अतिरिक्त सब्जियां/प्रोटीन डालें। 2-3 मिनट पकाएं।" },
            { name: "Add drained pasta directly to the sauce pan. Toss to coat every strand evenly.", hindi: "छना हुआ पास्ता सीधे सॉस पैन में डालें। हर स्ट्रैंड को समान रूप से कोट करने के लिए टॉस करें।" },
            { name: "Add pasta water (2-3 tbsp at a time) and toss vigorously to create a silky emulsified sauce.", hindi: "पास्ता पानी (2-3 बड़े चम्मच) डालें और रेशमी सॉस बनाने के लिए जोर से टॉस करें।" },
            { name: "Remove from heat. Add grated Parmesan and fresh torn basil. Toss once more and season with salt and pepper.", hindi: "आंच से हटाएं। कद्दूकस किया परमेसन और ताजी तुलसी डालें। एक बार और टॉस करें।" },
            { name: "Serve immediately on warm plates. Top with extra Parmesan and a drizzle of quality olive oil.", hindi: "गरम प्लेटों में तुरंत परोसें। ऊपर अतिरिक्त परमेसन और जैतून का तेल डालें।" }
        ],
        chefTips: [
            { text: "Never rinse your pasta! The starch helps the sauce stick.", hindi: "अपना पास्ता कभी न धोएं! स्टार्च सॉस को चिपकने में मदद करता है।" }
        ],
        descriptionPrefix: "An authentic Italian pasta experience with classical seasoning."
    },
    "pizza": {
        baseIngredients: [
            { name: "00 Flour or All-purpose flour", nameHindi: "मैदा", amount: "2", unit: "cups" },
            { name: "Yeast", nameHindi: "खमीर", amount: "1", unit: "tsp" },
            { name: "Mozzarella cheese", nameHindi: "मोज़ेरेला चीज़", amount: "200", unit: "g" },
            { name: "Basil leaves", nameHindi: "तुलसी के पत्ते", amount: "1", unit: "handful" }
        ],
        techniques: [
            { name: "Mix flour, yeast, salt, sugar, and warm water. Knead for 10 minutes until smooth and elastic.", hindi: "मैदा, खमीर, नमक, चीनी, और गरम पानी मिलाएं। 10 मिनट तक चिकना और लचीला होने तक गूंदें।" },
            { name: "Cover dough with a damp cloth and let it rise for 1-2 hours (or cold ferment in fridge for 24 hours for best flavor).", hindi: "आटे को गीले कपड़े से ढकें और 1-2 घंटे फूलने दें (या बेहतर स्वाद के लिए 24 घंटे फ्रिज में रखें)।" },
            { name: "Preheat oven to the maximum temperature (250-300C/475-550F). Place a pizza stone or inverted baking tray inside.", hindi: "ओवन को अधिकतम तापमान (250-300C) पर प्रीहीट करें। अंदर पिज्जा स्टोन या उल्टी ट्रे रखें।" },
            { name: "Divide dough into balls. On a floured surface, stretch each ball by hand into a thin round. Do not use a rolling pin.", hindi: "आटे को गोले में बांटें। आटा लगी सतह पर हाथ से पतला गोल फैलाएं। बेलन का उपयोग न करें।" },
            { name: "Spread a thin layer of tomato sauce. Add torn mozzarella, leaving the edges bare for the crust.", hindi: "टमाटर सॉस की पतली परत लगाएं। क्रस्ट के लिए किनारों को छोड़ते हुए मोजेरेला डालें।" },
            { name: "Slide the pizza onto the hot stone/tray in the oven. Bake for 8-12 minutes until crust is golden and cheese bubbles.", hindi: "पिज्जा को ओवन में गरम स्टोन/ट्रे पर सरकाएं। 8-12 मिनट तक बेक करें जब तक क्रस्ट सुनहरा और चीज़ बबली न हो जाए।" },
            { name: "Remove from oven. Top with fresh basil leaves, a drizzle of olive oil, and serve immediately while hot.", hindi: "ओवन से निकालें। ताजी तुलसी, जैतून का तेल डालें और गरमा गरम तुरंत परोसें।" }
        ],
        chefTips: [
            { text: "Use a pizza stone for a crispy bottom crust.", hindi: "कुरकुरे निचले क्रस्ट के लिए पिज्जा स्टोन का उपयोग करें।" }
        ],
        descriptionPrefix: "Handcrafted artisanal pizza with a perfect blistered crust."
    },
    "upma": {
        baseIngredients: [
            { name: "Roasted Semolina (Suji)", nameHindi: "भुनी हुई सूजी", amount: "1", unit: "cup" },
            { name: "Mustard seeds & Curry leaves", nameHindi: "सरसों के बीज और करी पत्ता", amount: "1", unit: "tbsp" },
            { name: "Chop Onion & Green Chilies", nameHindi: "प्याज और हरी मिर्च", amount: "1", unit: "medium" },
            { name: "Hot Water", nameHindi: "गरम पानी", amount: "2.5", unit: "cups" }
        ],
        techniques: [
            { name: "Dry roast semolina (suji) in a pan on low heat for 4-5 minutes until it turns golden and smells nutty. Set aside.", hindi: "सूजी को धीमी आंच पर 4-5 मिनट तक सुनहरा और नटी महक आने तक सूखा भूनें। अलग रखें।" },
            { name: "Heat 2 tbsp oil or ghee in a pan. Add mustard seeds, urad dal, and chana dal. Let them splutter.", hindi: "2 बड़े चम्मच तेल या घी गरम करें। सरसों, उड़द दाल, चना दाल डालें। तड़कने दें।" },
            { name: "Add curry leaves, green chilies, and ginger. Sauté for 30 seconds until fragrant.", hindi: "करी पत्ता, हरी मिर्च और अदरक डालें। 30 सेकंड तक खुशबू आने तक भूनें।" },
            { name: "Add chopped onion and sauté until translucent, about 2-3 minutes. Add peas or other vegetables if desired.", hindi: "कटा प्याज डालें और 2-3 मिनट पारदर्शी होने तक भूनें। चाहें तो मटर या अन्य सब्जियां डालें।" },
            { name: "Add 2.5 cups hot water and salt. Bring to a rolling boil.", hindi: "2.5 कप गरम पानी और नमक डालें। तेज उबाल आने दें।" },
            { name: "Reduce heat to low. Gradually add roasted suji in a steady stream while stirring continuously to prevent lumps.", hindi: "आंच धीमी करें। लगातार चलाते हुए धीरे-धीरे भुनी हुई सूजी डालें ताकि गांठ न बनें।" },
            { name: "Cover and cook on low heat for 2-3 minutes until all water is absorbed and upma is fluffy.", hindi: "ढकें और धीमी आंच पर 2-3 मिनट पकाएं जब तक सारा पानी सोख न जाए और उपमा फुला हुआ हो।" },
            { name: "Squeeze lemon juice and garnish with fresh coriander and grated coconut. Serve hot.", hindi: "नींबू निचोड़ें और ताजे धनिये और कद्दूकस किए नारियल से सजाएं। गरमा गरम परोसें।" }
        ],
        chefTips: [
            { text: "Roast suji on low flame until it smells nutty for the best texture.", hindi: "बेहतरीन बनावट के लिए सूजी को धीमी आंच पर तब तक भूनें जब तक कि उसमें से नटी महक न आने लगे।" }
        ],
        descriptionPrefix: "A comforting South Indian savory porridge made with tempered semolina and vegetables."
    },
    "biryani": {
        baseIngredients: [
            { name: "Basmati Rice", nameHindi: "बासमती चावल", amount: "2", unit: "cups" },
            { name: "Biryani Masala & Whole Spices", nameHindi: "बिरयानी मसाला और साबुत मसाले", amount: "2", unit: "tbsp" },
            { name: "Fried Onions (Birista)", nameHindi: "तला हुआ प्याज", amount: "1", unit: "cup" },
            { name: "Saffron Milk", nameHindi: "केसर वाला दूध", amount: "1/4", unit: "cup" }
        ],
        techniques: [
            { name: "Wash basmati rice 3-4 times until water runs clear. Soak for 30 minutes, then drain.", hindi: "बासमती चावल को 3-4 बार धोएं जब तक पानी साफ न हो जाए। 30 मिनट भिगोएं, फिर छान दें।" },
            { name: "Marinate protein/vegetables with yogurt, ginger-garlic paste, biryani masala, chili, and turmeric for 1 hour (or overnight).", hindi: "प्रोटीन/सब्जियों को दही, अदरक-लहसुन पेस्ट, बिरयानी मसाला, मिर्च और हल्दी के साथ 1 घंटे (या रात भर) मैरीनेट करें।" },
            { name: "Boil water with whole spices (bay leaf, cardamom, cloves, cinnamon). Add soaked rice and cook until 70% done. Drain immediately.", hindi: "साबुत मसालों के साथ पानी उबालें। भिगोए चावल डालें और 70% पकने तक पकाएं। तुरंत छान दें।" },
            { name: "In a heavy pot, heat ghee and fry sliced onions until deep golden brown (birista). Remove half and set aside.", hindi: "एक भारी बर्तन में घी गरम करें और कटे प्याज को गहरा सुनहरा होने तक तलें। आधा निकालकर अलग रखें।" },
            { name: "Layer marinated protein over the remaining onions. Cook covered on high heat for 5 minutes to partially cook the protein.", hindi: "बचे हुए प्याज के ऊपर मैरीनेट किया प्रोटीन रखें। ढककर 5 मिनट तेज आंच पर पकाएं।" },
            { name: "Spread the parboiled rice evenly over the protein. Top with saffron milk, fried onions, chopped mint, and dots of ghee.", hindi: "प्रोटीन के ऊपर आधे पके चावल समान रूप से फैलाएं। ऊपर केसर दूध, तले प्याज, पुदीना और घी डालें।" },
            { name: "Seal the pot tightly with foil or dough. Cook on high heat for 3 minutes, then on the lowest heat for 20-25 minutes (Dum).", hindi: "बर्तन को फोइल या आटे से कसकर सील करें। 3 मिनट तेज आंच, फिर 20-25 मिनट सबसे धीमी आंच (दम) पर पकाएं।" },
            { name: "Let it rest for 5 minutes. Open the lid, gently mix layers with a flat spoon. Serve with raita and salad.", hindi: "5 मिनट रहने दें। ढक्कन खोलें, चपटे चम्मच से धीरे से परतें मिलाएं। रायता और सलाद के साथ परोसें।" }
        ],
        chefTips: [
            { text: "Do not overcook the rice during parboiling or it will get mushy.", hindi: "उबालते समय चावल को ज्यादा न पकाएं वरना वह गल जाएगा।" }
        ],
        descriptionPrefix: "A majestic and aromatic rice dish layered with exotic spices and flavors."
    },
    "chicken": {
        baseIngredients: [
            { name: "Chicken (bone-in or boneless)", nameHindi: "चिकन", amount: "500", unit: "g" },
            { name: "Yogurt for marinade", nameHindi: "दही", amount: "1/2", unit: "cup" },
            { name: "Ginger-Garlic paste", nameHindi: "अदरक-लहसुन का पेस्ट", amount: "2", unit: "tbsp" },
            { name: "Garam Masala", nameHindi: "गरम मसाला", amount: "1", unit: "tsp" },
            { name: "Oil or Ghee", nameHindi: "तेल या घी", amount: "3", unit: "tbsp" }
        ],
        techniques: [
            { name: "Clean chicken pieces and pat dry. Make 2-3 deep cuts on each piece for better marination.", hindi: "चिकन के टुकड़े साफ करें और सुखाएं। बेहतर मैरीनेशन के लिए हर टुकड़े पर 2-3 गहरे चीरे लगाएं।" },
            { name: "Mix yogurt, ginger-garlic paste, turmeric, chili powder, garam masala, and salt. Coat chicken and marinate for 30 min to 4 hours.", hindi: "दही, अदरक-लहसुन, हल्दी, मिर्च, गरम मसाला, नमक मिलाएं। चिकन पर लगाएं और 30 मिनट से 4 घंटे मैरीनेट करें।" },
            { name: "Heat 3 tbsp oil or ghee in a heavy-bottomed pan on high heat. Sear chicken pieces until golden brown on all sides (3-4 min per side). Remove and set aside.", hindi: "3 बड़े चम्मच तेल या घी गरम करें। चिकन को सभी तरफ से सुनहरा होने तक भूनें। निकालकर अलग रखें।" },
            { name: "In the same pan, add sliced onions. Cook on medium heat for 8-10 minutes until deep golden brown, stirring frequently.", hindi: "उसी पैन में कटा प्याज डालें। 8-10 मिनट मध्यम आंच पर गहरा सुनहरा होने तक पकाएं।" },
            { name: "Add ginger-garlic paste, cook 2 min. Add tomato puree and all spices. Cook until oil separates (8-10 min).", hindi: "अदरक-लहसुन पेस्ट डालें, 2 मिनट पकाएं। टमाटर प्यूरी और सभी मसाले डालें। तेल अलग होने तक पकाएं (8-10 मिनट)।" },
            { name: "Add seared chicken pieces back into the gravy. Add 1/2 cup water if needed. Cover and simmer on low heat for 15-20 minutes until chicken is cooked through.", hindi: "भुने हुए चिकन को वापस ग्रेवी में डालें। जरूरत हो तो 1/2 कप पानी डालें। ढकें और 15-20 मिनट धीमी आंच पर पकाएं।" },
            { name: "Check seasoning. Add salt if needed, and a squeeze of lemon to balance the flavors. Stir in kasuri methi if using.", hindi: "सीजनिंग जांचें। जरूरत हो तो नमक डालें, और स्वाद संतुलित करने के लिए नींबू निचोड़ें।" },
            { name: "Garnish with fresh coriander and serve hot with naan, roti, or steamed rice.", hindi: "ताजा धनिया से सजाएं और नान, रोटी, या स्टीम्ड राइस के साथ गरमा गरम परोसें।" }
        ],
        chefTips: [
            { text: "Score the chicken before marinating for deeper flavor penetration.", hindi: "गहरे स्वाद के लिए मैरीनेट करने से पहले चिकन पर चीरे लगाएं।" }
        ],
        descriptionPrefix: "A flavorful chicken dish with aromatic Indian spices."
    },
    "curry": {
        baseIngredients: [
            { name: "Main vegetable or protein", nameHindi: "मुख्य सब्जी या प्रोटीन", amount: "400", unit: "g" },
            { name: "Onion-Tomato base", nameHindi: "प्याज-टमाटर का बेस", amount: "2", unit: "medium" },
            { name: "Curry powder blend", nameHindi: "करी पाउडर", amount: "2", unit: "tbsp" },
            { name: "Coconut milk or cream", nameHindi: "नारियल का दूध या क्रीम", amount: "1", unit: "cup" },
            { name: "Fresh Coriander leaves", nameHindi: "ताजा धनिया पत्ती", amount: "1/4", unit: "cup" }
        ],
        techniques: [
            { name: "Prep all ingredients: dice onions finely, puree tomatoes, cut vegetables/protein into even pieces.", hindi: "सभी सामग्री तैयार करें: प्याज बारीक काटें, टमाटर प्यूरी करें, सब्जियां/प्रोटीन समान टुकड़ों में काटें।" },
            { name: "Heat oil in a heavy-bottomed pan. Add whole spices (cumin, mustard seeds, bay leaf) and let them splutter.", hindi: "भारी पैन में तेल गरम करें। साबुत मसाले (जीरा, सरसों, तेजपत्ता) डालें और तड़कने दें।" },
            { name: "Add diced onions and cook on medium heat for 8-10 minutes until deeply golden brown. This is the flavor foundation.", hindi: "कटा प्याज डालें और 8-10 मिनट मध्यम आंच पर गहरा सुनहरा होने तक पकाएं। यह स्वाद की नींव है।" },
            { name: "Add ginger-garlic paste and cook 1-2 minutes. Add tomato puree, curry powder, turmeric, chili. Cook until oil separates (8 min).", hindi: "अदरक-लहसुन पेस्ट डालें और 1-2 मिनट पकाएं। टमाटर प्यूरी, करी पाउडर, हल्दी, मिर्च डालें। तेल अलग होने तक पकाएं।" },
            { name: "Add the main vegetables or protein. Stir well to coat everything in the masala base.", hindi: "मुख्य सब्जियां या प्रोटीन डालें। सब कुछ मसाला बेस में कोट करने के लिए अच्छी तरह चलाएं।" },
            { name: "Pour in coconut milk or cream and 1/2 cup water. Bring to a boil, then reduce heat and simmer for 15-20 minutes until everything is tender.", hindi: "नारियल दूध या क्रीम और 1/2 कप पानी डालें। उबालें, फिर 15-20 मिनट धीमी आंच पर नरम होने तक पकाएं।" },
            { name: "Taste and adjust seasoning. Add salt, a pinch of sugar to balance acidity, and garam masala for final flavor.", hindi: "स्वाद चखें और सीजनिंग ठीक करें। नमक, खटाई संतुलित करने के लिए चुटकी चीनी, और गरम मसाला डालें।" },
            { name: "Garnish with fresh coriander leaves. Serve hot with steamed rice, naan, or roti.", hindi: "ताजे धनिये से सजाएं। स्टीम्ड राइस, नान, या रोटी के साथ गरमा गरम परोसें।" }
        ],
        chefTips: [
            { text: "Toast whole spices before grinding for maximum aroma.", hindi: "अधिकतम सुगंध के लिए पीसने से पहले साबुत मसालों को भूनें।" }
        ],
        descriptionPrefix: "A rich and aromatic curry with balanced spice layers."
    },
    "rice": {
        baseIngredients: [
            { name: "Long grain Basmati Rice", nameHindi: "बासमती चावल", amount: "2", unit: "cups" },
            { name: "Whole spices (bay leaf, cardamom, cloves)", nameHindi: "साबुत मसाले (तेजपत्ता, इलायची, लौंग)", amount: "4-5", unit: "pieces" },
            { name: "Ghee or Butter", nameHindi: "घी या मक्खन", amount: "2", unit: "tbsp" },
            { name: "Salt", nameHindi: "नमक", amount: "1", unit: "tsp" }
        ],
        techniques: [
            { name: "Wash rice 3-4 times until water runs clear. Soak in water for 20-30 minutes, then drain.", hindi: "चावल को 3-4 बार धोएं जब तक पानी साफ न हो। 20-30 मिनट भिगोएं, फिर छान दें।" },
            { name: "Heat ghee or butter in a heavy pot. Add whole spices (bay leaf, cardamom, cloves, cinnamon) and sauté for 30 seconds.", hindi: "भारी बर्तन में घी या मक्खन गरम करें। साबुत मसाले डालें और 30 सेकंड भूनें।" },
            { name: "Add sliced onions if making pulao, cook until light golden. Skip for plain rice.", hindi: "पुलाव बना रहे हों तो कटा प्याज डालें, हल्का सुनहरा होने तक पकाएं। सादे चावल के लिए छोड़ दें।" },
            { name: "Add drained rice and gently stir for 1 minute to coat each grain in ghee.", hindi: "छने हुए चावल डालें और 1 मिनट धीरे से चलाएं ताकि हर दाना घी में कोट हो जाए।" },
            { name: "Add water in 1:1.5 ratio (rice:water) and salt. Bring to a rolling boil.", hindi: "1:1.5 अनुपात (चावल:पानी) में पानी और नमक डालें। तेज उबाल आने दें।" },
            { name: "Reduce heat to the lowest setting. Cover tightly with a lid and cook for 15 minutes. Do NOT open the lid during this time.", hindi: "आंच सबसे कम करें। कसकर ढकें और 15 मिनट पकाएं। इस दौरान ढक्कन न खोलें।" },
            { name: "Turn off heat and let rice rest covered for 5 minutes. Then fluff gently with a fork and serve.", hindi: "आंच बंद करें और 5 मिनट ढके रहने दें। फिर कांटे से धीरे से फुलाएं और परोसें।" }
        ],
        chefTips: [
            { text: "Never stir rice while cooking — it breaks the grains.", hindi: "पकाते समय चावल को कभी न चलाएं — इससे दाने टूट जाते हैं।" }
        ],
        descriptionPrefix: "Perfectly fluffy and fragrant rice with aromatic whole spices."
    },
    "dal": {
        baseIngredients: [
            { name: "Yellow Lentils (Toor/Moong Dal)", nameHindi: "पीली दाल (तूर/मूंग)", amount: "1", unit: "cup" },
            { name: "Tomato", nameHindi: "टमाटर", amount: "1", unit: "medium" },
            { name: "Turmeric & Red Chili powder", nameHindi: "हल्दी और लाल मिर्च", amount: "1", unit: "tsp each" },
            { name: "Cumin seeds & Ghee for tadka", nameHindi: "जीरा और घी तड़के के लिए", amount: "1", unit: "tsp + 2 tbsp" }
        ],
        techniques: [
            { name: "Wash lentils 2-3 times. Add to a pressure cooker with 3 cups water, turmeric, and salt.", hindi: "दाल को 2-3 बार धोएं। प्रेशर कुकर में 3 कप पानी, हल्दी और नमक के साथ डालें।" },
            { name: "Pressure cook for 3-4 whistles until lentils are completely soft and mushy. If no cooker, boil in a pot for 30-40 min.", hindi: "3-4 सीटी तक प्रेशर कुक करें जब तक दाल पूरी तरह नरम न हो जाए। कुकर न हो तो बर्तन में 30-40 मिनट उबालें।" },
            { name: "Once cooled, open cooker and mash the dal with a whisk or ladle. Add chopped tomato and cook for 5 minutes.", hindi: "ठंडा होने पर कुकर खोलें और दाल को व्हिस्क से मैश करें। कटा टमाटर डालें और 5 मिनट पकाएं।" },
            { name: "Add red chili powder and coriander powder. Adjust consistency with water if too thick. Simmer for 5 more minutes.", hindi: "लाल मिर्च और धनिया पाउडर डालें। गाढ़ी हो तो पानी से पतली करें। 5 मिनट और पकाएं।" },
            { name: "For tadka: heat 2 tbsp ghee in a small pan until smoking hot. Add cumin seeds and let them splutter.", hindi: "तड़का के लिए: छोटे पैन में 2 बड़े चम्मच घी तेज आंच तक गरम करें। जीरा डालें और तड़कने दें।" },
            { name: "Add crushed garlic, dried red chilies, and asafoetida (hing) to the tadka. Cook for 30 seconds until garlic is golden.", hindi: "तड़के में पिसा हुआ लहसुन, सूखी लाल मिर्च, और हींग डालें। 30 सेकंड तक लहसुन सुनहरा होने तक पकाएं।" },
            { name: "Pour the hot, sizzling tadka over the cooked dal. Cover immediately to trap the smoky aroma for 2 minutes.", hindi: "गरम, चटपटाता तड़का पकी हुई दाल पर डालें। धुएं की सुगंध को रोकने के लिए 2 मिनट तुरंत ढक दें।" },
            { name: "Squeeze fresh lemon juice, garnish with coriander leaves, and serve hot with rice or roti.", hindi: "ताजा नींबू निचोड़ें, धनिया से सजाएं, और चावल या रोटी के साथ गरमा गरम परोसें।" }
        ],
        chefTips: [
            { text: "A squeeze of lemon at the end brightens all the flavors.", hindi: "अंत में नींबू निचोड़ने से सभी स्वाद निखर जाते हैं।" }
        ],
        descriptionPrefix: "A comforting Indian lentil dish with a smoky tempering."
    },
    "roti": {
        baseIngredients: [
            { name: "Whole Wheat Flour (Atta)", nameHindi: "गेहूं का आटा", amount: "2", unit: "cups" },
            { name: "Salt", nameHindi: "नमक", amount: "1/2", unit: "tsp" },
            { name: "Water (warm)", nameHindi: "गुनगुना पानी", amount: "3/4", unit: "cup" },
            { name: "Ghee for brushing", nameHindi: "घी लगाने के लिए", amount: "2", unit: "tbsp" }
        ],
        techniques: [
            { name: "Add flour and salt in a large bowl. Gradually add warm water and mix to form a rough dough.", hindi: "बड़े कटोरे में आटा और नमक डालें। धीरे-धीरे गुनगुना पानी डालें और मोटा आटा बनाएं।" },
            { name: "Knead the dough for 8-10 minutes until it is smooth, soft, and pliable. Add a few drops of oil while kneading.", hindi: "8-10 मिनट तक गूंदें जब तक चिकना, नरम और लचीला न हो जाए। गूंदते समय तेल की कुछ बूंदें डालें।" },
            { name: "Cover dough with a damp cloth and rest for at least 15-20 minutes. This relaxes the gluten for softer rotis.", hindi: "आटे को गीले कपड़े से ढकें और कम से कम 15-20 मिनट रखें। इससे ग्लूटन रिलैक्स होता है जिससे रोटी नरम बनती है।" },
            { name: "Divide dough into equal-sized balls (about golf ball size). Roll each ball smooth between your palms.", hindi: "आटे को समान आकार के गोलों में बांटें। हर गोले को हथेलियों से चिकना गोल करें।" },
            { name: "Dust each ball in dry flour. Roll into a thin, even circle (about 7-8 inches) using a rolling pin, rotating as you roll.", hindi: "हर गोले को सूखे आटे में डुबोएं। बेलन से पतला, समान गोल (7-8 इंच) बेलें, बेलते समय घुमाते रहें।" },
            { name: "Heat a tawa on high heat. Place the roti on it. When small bubbles appear on top (30 sec), flip it.", hindi: "तवे को तेज आंच पर गरम करें। रोटी रखें। जब छोटे बुलबुले दिखें (30 सेकंड), पलट दें।" },
            { name: "Cook the second side for 30 seconds, then lift roti with tongs and place directly on open flame to puff it up.", hindi: "दूसरी तरफ 30 सेकंड पकाएं, फिर चिमटे से उठाकर सीधे आंच पर रखें ताकि फूल जाए।" },
            { name: "Brush hot roti with ghee and serve immediately. Keep wrapped in a towel to stay warm.", hindi: "गरम रोटी पर घी लगाएं और तुरंत परोसें। गरम रखने के लिए तौलिये में लपेटकर रखें।" }
        ],
        chefTips: [
            { text: "The dough should be as soft as your earlobe for the best rotis.", hindi: "सबसे अच्छी रोटियों के लिए आटा आपके कान की लोब जितना नरम होना चाहिए।" }
        ],
        descriptionPrefix: "Soft, puffed Indian whole wheat flatbread."
    },
    "salad": {
        baseIngredients: [
            { name: "Mixed greens (lettuce, arugula, spinach)", nameHindi: "मिक्स साग", amount: "200", unit: "g" },
            { name: "Cherry tomatoes", nameHindi: "चेरी टमाटर", amount: "1", unit: "cup" },
            { name: "Cucumber", nameHindi: "खीरा", amount: "1", unit: "medium" },
            { name: "Extra virgin olive oil & lemon dressing", nameHindi: "जैतून का तेल और नींबू ड्रेसिंग", amount: "3", unit: "tbsp" },
            { name: "Toasted seeds or nuts", nameHindi: "भुने बीज या मेवे", amount: "2", unit: "tbsp" }
        ],
        techniques: [
            { name: "Wash all greens and vegetables in cold water. Dry thoroughly using a salad spinner or towels.", hindi: "सभी साग और सब्जियों को ठंडे पानी में धोएं। सलाद स्पिनर या तौलिये से अच्छी तरह सुखाएं।" },
            { name: "Chop vegetables into even, bite-sized pieces. Halve cherry tomatoes, slice cucumber into half-moons.", hindi: "सब्जियों को समान, छोटे टुकड़ों में काटें।" },
            { name: "Toast seeds or nuts in a dry pan over medium heat for 2-3 minutes until golden and fragrant.", hindi: "बीज या मेवों को सूखे पैन में 2-3 मिनट सुनहरा और खुशबूदार होने तक भूनें।" },
            { name: "Make the dressing: whisk olive oil, lemon juice, salt, pepper, and a pinch of honey or mustard.", hindi: "ड्रेसिंग बनाएं: जैतून तेल, नींबू, नमक, काली मिर्च, और चुटकी शहद या सरसों फेंटें।" },
            { name: "Arrange greens in a large bowl. Add chopped vegetables, any protein or cheese on top.", hindi: "बड़े कटोरे में साग रखें। ऊपर कटी सब्जियां, प्रोटीन या चीज़ डालें।" },
            { name: "Drizzle dressing over the salad just before serving. Toss gently to coat everything evenly.", hindi: "परोसने से ठीक पहले ड्रेसिंग डालें। सब कुछ समान रूप से कोट करने के लिए धीरे से टॉस करें।" },
            { name: "Top with toasted seeds/nuts and serve immediately while fresh and crisp.", hindi: "भुने बीज/मेवे डालें और ताजा और कुरकुरा रहते हुए तुरंत परोसें।" }
        ],
        chefTips: [
            { text: "Always dress salad at the last moment to keep it crisp.", hindi: "सलाद को कुरकुरा रखने के लिए हमेशा अंतिम क्षण में ड्रेसिंग डालें।" }
        ],
        descriptionPrefix: "A fresh, crisp salad with a zesty homemade dressing."
    },
    "soup": {
        baseIngredients: [
            { name: "Mixed vegetables or protein", nameHindi: "मिक्स सब्जियां या प्रोटीन", amount: "300", unit: "g" },
            { name: "Vegetable or Chicken broth", nameHindi: "सब्जी या चिकन शोरबा", amount: "4", unit: "cups" },
            { name: "Onion, Garlic, Celery", nameHindi: "प्याज, लहसुन, सेलरी", amount: "1", unit: "each" },
            { name: "Herbs (thyme, bay leaf)", nameHindi: "जड़ी बूटियां (थाइम, तेजपत्ता)", amount: "1", unit: "tsp" }
        ],
        techniques: [
            { name: "Prep vegetables: dice onion, mince garlic, chop celery, and cut main vegetables into even pieces.", hindi: "सब्जियां तैयार करें: प्याज काटें, लहसुन बारीक काटें, सेलरी काटें, मुख्य सब्जियां समान टुकड़ों में काटें।" },
            { name: "Heat 2 tbsp butter or oil in a large pot. Add onion, garlic, and celery. Cook for 5 min until softened.", hindi: "2 बड़े चम्मच मक्खन या तेल गरम करें। प्याज, लहसुन, सेलरी डालें। 5 मिनट नरम होने तक पकाएं।" },
            { name: "Add herbs and spices. Cook for 30 seconds until fragrant.", hindi: "जड़ी-बूटियां और मसाले डालें। 30 सेकंड खुशबू आने तक पकाएं।" },
            { name: "Add chopped vegetables and stir for 2 minutes. Pour in broth and bring to a boil.", hindi: "कटी सब्जियां डालें और 2 मिनट चलाएं। शोरबा डालें और उबालें।" },
            { name: "Reduce heat and simmer for 20-25 minutes until all vegetables are tender.", hindi: "आंच कम करें और 20-25 मिनट तक सभी सब्जियां नरम होने तक पकाएं।" },
            { name: "For creamy soup: blend with an immersion blender until smooth. For chunky: leave as is. Season with salt and pepper.", hindi: "क्रीमी सूप के लिए: इमर्शन ब्लेंडर से चिकना ब्लेंड करें। नमक और काली मिर्च डालें।" },
            { name: "Ladle into warm bowls. Finish with a drizzle of olive oil, fresh herbs, or cream. Serve with bread.", hindi: "गरम कटोरों में डालें। जैतून तेल, ताजी जड़ी-बूटियां, या क्रीम डालें। ब्रेड के साथ परोसें।" }
        ],
        chefTips: [
            { text: "A splash of acid (lemon or vinegar) at the end elevates any soup.", hindi: "अंत में थोड़ा एसिड (नींबू या सिरका) किसी भी सूप को बेहतर बनाता है।" }
        ],
        descriptionPrefix: "A warming, nourishing soup made from scratch."
    },
    "noodle": {
        baseIngredients: [
            { name: "Noodles (egg or rice)", nameHindi: "नूडल्स", amount: "250", unit: "g" },
            { name: "Soy sauce", nameHindi: "सोया सॉस", amount: "2", unit: "tbsp" },
            { name: "Sesame oil", nameHindi: "तिल का तेल", amount: "1", unit: "tbsp" },
            { name: "Vegetables (bell pepper, carrot, cabbage)", nameHindi: "सब्जियां (शिमला मिर्च, गाजर, पत्तागोभी)", amount: "2", unit: "cups" },
            { name: "Garlic and Ginger", nameHindi: "लहसुन और अदरक", amount: "1", unit: "tbsp each" }
        ],
        techniques: [
            { name: "Boil water and cook noodles for 1 minute less than package time. Drain and toss with a drizzle of sesame oil to prevent sticking.", hindi: "पानी उबालें और नूडल्स को पैकेज समय से 1 मिनट कम पकाएं। छानें और चिपकने से रोकने के लिए तिल तेल डालें।" },
            { name: "Prep sauce: mix soy sauce, oyster sauce (or hoisin), vinegar, sugar, and chili flakes in a small bowl.", hindi: "सॉस तैयार करें: सोया सॉस, ओयस्टर सॉस, सिरका, चीनी, और मिर्च फ्लेक्स मिलाएं।" },
            { name: "Heat a wok or large pan on the highest heat until smoking. Add oil and swirl to coat.", hindi: "वॉक या बड़े पैन को सबसे तेज आंच पर धुआं आने तक गरम करें। तेल डालें।" },
            { name: "Add garlic and ginger, stir-fry for 15 seconds. Add harder veggies (carrots) first, softer ones (cabbage) after 1 min.", hindi: "लहसुन और अदरक डालें, 15 सेकंड भूनें। पहले सख्त सब्जियां (गाजर), फिर 1 मिनट बाद नरम (पत्तागोभी)।" },
            { name: "Stir-fry vegetables for 2-3 minutes. They should be crisp-tender, not mushy.", hindi: "सब्जियों को 2-3 मिनट भूनें। वे करारे-नरम होनी चाहिए, गली नहीं।" },
            { name: "Add drained noodles and prepared sauce. Toss vigorously on high heat for 1-2 minutes to coat and caramelize slightly.", hindi: "छने नूडल्स और तैयार सॉस डालें। 1-2 मिनट तेज आंच पर जोर से टॉस करें।" },
            { name: "Serve immediately, garnished with spring onions, toasted sesame seeds, and a squeeze of lime.", hindi: "तुरंत परोसें, हरे प्याज, भुने तिल, और नींबू निचोड़कर सजाएं।" }
        ],
        chefTips: [
            { text: "High heat and quick tossing is the secret to great stir-fried noodles.", hindi: "तेज़ आंच और जल्दी मिलाना बेहतरीन स्टर-फ्राई नूडल्स का राज़ है।" }
        ],
        descriptionPrefix: "Quick and flavorful stir-fried noodles with crisp vegetables."
    },
    "egg": {
        baseIngredients: [
            { name: "Eggs", nameHindi: "अंडे", amount: "4", unit: "large" },
            { name: "Butter or Oil", nameHindi: "मक्खन या तेल", amount: "1", unit: "tbsp" },
            { name: "Salt & Pepper", nameHindi: "नमक और काली मिर्च", amount: "to taste", unit: "" },
            { name: "Fresh herbs (optional)", nameHindi: "ताजी जड़ी बूटियां (वैकल्पिक)", amount: "1", unit: "tbsp" }
        ],
        techniques: [
            { name: "Crack eggs into a bowl. Season with salt and pepper. Whisk vigorously until completely uniform and slightly frothy.", hindi: "अंडे कटोरे में तोड़ें। नमक, काली मिर्च डालें। एक समान और हल्का झागदार होने तक जोर से फेंटें।" },
            { name: "Place a non-stick pan on medium-low heat. Add butter and let it melt slowly without browning.", hindi: "नॉन-स्टिक पैन मध्यम-धीमी आंच पर रखें। मक्खन डालें और बिना भूरे धीरे से पिघलने दें।" },
            { name: "Pour in the whisked eggs. Wait 10-15 seconds until edges just begin to set.", hindi: "फेंटे हुए अंडे डालें। 10-15 सेकंड रुकें जब तक किनारे जमने न लगें।" },
            { name: "Use a spatula to gently push eggs from edges to center, creating soft curds. Let uncooked egg flow to the pan surface.", hindi: "स्पैचुला से धीरे से अंडे किनारों से केंद्र की ओर धकेलें। कच्चे अंडे को पैन सतह पर बहने दें।" },
            { name: "Continue folding gently every 15-20 seconds. Keep heat low. Total cooking time: 2-3 minutes.", hindi: "हर 15-20 सेकंड धीरे से मोड़ते रहें। आंच धीमी रखें। कुल समय: 2-3 मिनट।" },
            { name: "Remove from heat when eggs are still slightly wet and glossy - they will finish cooking from residual heat.", hindi: "जब अंडे अभी थोड़े गीले और चमकदार हों तब आंच से हटाएं - बची गर्मी से पक जाएंगे।" },
            { name: "Plate immediately. Top with fresh herbs, cheese, or chili flakes. Serve with toast or bread.", hindi: "तुरंत प्लेट करें। ताजी जड़ी-बूटियां, चीज़, या मिर्च फ्लेक्स डालें। टोस्ट के साथ परोसें।" }
        ],
        chefTips: [
            { text: "Remove eggs from heat just before they look done — residual heat finishes them.", hindi: "अंडों को पूरा पकने से ठीक पहले आंच से हटाएं — बची हुई गर्मी उन्हें पकाती है।" }
        ],
        descriptionPrefix: "Perfectly cooked eggs using classic French technique."
    },
    "taco": {
        baseIngredients: [
            { name: "Corn or flour tortillas", nameHindi: "कॉर्न या आटे की टॉर्टिया", amount: "8", unit: "pieces" },
            { name: "Seasoned protein (chicken/beef/beans)", nameHindi: "मसालेदार प्रोटीन", amount: "400", unit: "g" },
            { name: "Fresh salsa", nameHindi: "ताजा सालसा", amount: "1", unit: "cup" },
            { name: "Lime, Cilantro, Onion", nameHindi: "नींबू, धनिया, प्याज", amount: "1", unit: "each" }
        ],
        techniques: [
            { name: "Season protein with cumin, chili powder, garlic powder, salt, and pepper. Let sit for 15 minutes.", hindi: "प्रोटीन को जीरा, मिर्च, लहसुन, नमक, काली मिर्च से सीजन करें। 15 मिनट रखें।" },
            { name: "Heat oil in a skillet on high heat. Cook protein until well-browned and cooked through (5-7 min). Chop or shred.", hindi: "तेज आंच पर तेल गरम करें। प्रोटीन को अच्छी तरह भूरे और पकने तक पकाएं (5-7 मिनट)।" },
            { name: "Make fresh salsa: dice tomatoes, onion, cilantro, jalapeno. Mix with lime juice and salt.", hindi: "ताजा सालसा बनाएं: टमाटर, प्याज, धनिया, जलापेनो काटें। नींबू और नमक से मिलाएं।" },
            { name: "Warm tortillas on a dry hot skillet or directly on flame for 15-20 seconds each side until pliable.", hindi: "टॉर्टिया को सूखे गरम तवे या सीधे आंच पर 15-20 सेकंड हर तरफ गरम करें।" },
            { name: "Place a generous portion of cooked protein on each warm tortilla.", hindi: "हर गरम टॉर्टिया पर पके प्रोटीन का भरपूर हिस्सा रखें।" },
            { name: "Top with salsa, diced onion, fresh cilantro, and a generous squeeze of lime juice.", hindi: "सालसा, कटा प्याज, ताजा धनिया, और भरपूर नींबू निचोड़ें।" },
            { name: "Serve immediately with extra lime wedges, sliced radishes, and hot sauce on the side.", hindi: "अतिरिक्त नींबू, कटी मूली, और गरम सॉस के साथ तुरंत परोसें।" }
        ],
        chefTips: [
            { text: "Double-stack your tortillas to prevent them from tearing.", hindi: "टॉर्टिया को फटने से बचाने के लिए दो-दो रखें।" }
        ],
        descriptionPrefix: "Authentic street-style tacos with fresh toppings."
    },
    "sandwich": {
        baseIngredients: [
            { name: "Fresh bread (sourdough or ciabatta)", nameHindi: "ताज़ी ब्रेड", amount: "2", unit: "slices" },
            { name: "Protein (grilled chicken/cheese/egg)", nameHindi: "प्रोटीन", amount: "100", unit: "g" },
            { name: "Lettuce, Tomato, Onion", nameHindi: "सलाद पत्ता, टमाटर, प्याज", amount: "1", unit: "each" },
            { name: "Sauce or spread", nameHindi: "सॉस या स्प्रेड", amount: "2", unit: "tbsp" }
        ],
        techniques: [
            { name: "Choose fresh, quality bread. Slice evenly if using a loaf. Toast both sides until golden and crisp.", hindi: "ताजा, गुणवत्ता वाली ब्रेड चुनें। दोनों तरफ सुनहरा और कुरकुरा होने तक टोस्ट करें।" },
            { name: "Prepare the protein: grill chicken, fry egg, or slice cheese. Season with salt and pepper.", hindi: "प्रोटीन तैयार करें: चिकन ग्रिल करें, अंडा तलें, या चीज़ काटें। नमक और काली मिर्च डालें।" },
            { name: "Wash and prepare fresh toppings: slice tomato, separate lettuce leaves, slice onion into thin rings.", hindi: "ताजे टॉपिंग्स तैयार करें: टमाटर काटें, सलाद पत्ते अलग करें, प्याज पतले रिंग्स में काटें।" },
            { name: "Spread sauce or condiment on both slices of toast. This creates a moisture barrier to keep bread crisp.", hindi: "टोस्ट की दोनों स्लाइस पर सॉस लगाएं। यह ब्रेड को कुरकुरा रखने के लिए नमी की बाधा बनाता है।" },
            { name: "Layer ingredients: lettuce first (as moisture barrier), then protein, tomato, onion, and cheese.", hindi: "सामग्री परतें: पहले सलाद (नमी बाधा), फिर प्रोटीन, टमाटर, प्याज, पनीर।" },
            { name: "Close the sandwich gently. Press down lightly and slice diagonally for the classic presentation.", hindi: "सैंडविच धीरे से बंद करें। हल्का दबाएं और क्लासिक प्रेजेंटेशन के लिए तिरछा काटें।" },
            { name: "Serve immediately with chips, fries, or a side salad. Secure with a toothpick if stacked high.", hindi: "चिप्स, फ्राइज़, या साइड सलाद के साथ तुरंत परोसें। ऊँचे स्टैक होने पर टूथपिक से सुरक्षित करें।" }
        ],
        chefTips: [
            { text: "Spread sauce on both slices to create a moisture barrier for crisp bread.", hindi: "कुरकुरी ब्रेड के लिए दोनों तरफ सॉस लगाएं।" }
        ],
        descriptionPrefix: "A perfectly layered sandwich with premium ingredients."
    },
    "butter chicken": {
        baseIngredients: [
            { name: "Chicken (bone-in or boneless)", nameHindi: "चिकन", amount: "500", unit: "g" },
            { name: "Yogurt for marinade", nameHindi: "दही (मैरीनेड)", amount: "1/2", unit: "cup" },
            { name: "Tomato puree", nameHindi: "टमाटर प्यूरी", amount: "2", unit: "cups" },
            { name: "Butter", nameHindi: "मक्खन", amount: "4", unit: "tbsp" },
            { name: "Heavy cream", nameHindi: "हैवी क्रीम", amount: "1/2", unit: "cup" },
            { name: "Kashmiri red chili powder", nameHindi: "कश्मीरी लाल मिर्च", amount: "1", unit: "tbsp" },
            { name: "Garam masala", nameHindi: "गरम मसाला", amount: "1", unit: "tsp" }
        ],
        techniques: [
            { name: "Marinate chicken with yogurt, ginger-garlic paste, Kashmiri chili, turmeric, garam masala, and salt for at least 1 hour (overnight is best).", hindi: "चिकन को दही, अदरक-लहसुन पेस्ट, कश्मीरी मिर्च, हल्दी, गरम मसाला और नमक के साथ कम से कम 1 घंटे मैरीनेट करें (रात भर सबसे अच्छा)।" },
            { name: "Grill or pan-sear marinated chicken until charred on all sides. Set aside.", hindi: "मैरीनेट किए चिकन को सभी तरफ से भूनें जब तक कि थोड़ा जले। अलग रखें।" },
            { name: "In a heavy-bottomed pan, melt 3 tbsp butter. Add finely diced onions and cook until deep golden brown (8-10 min).", hindi: "भारी तले वाले पैन में 3 बड़े चम्मच मक्खन पिघलाएं। बारीक कटा प्याज डालें और गहरा सुनहरा होने तक पकाएं (8-10 मिनट)।" },
            { name: "Add ginger-garlic paste and cook for 2 minutes. Add tomato puree and cook for 15 minutes until oil separates.", hindi: "अदरक-लहसुन पेस्ट डालें और 2 मिनट पकाएं। टमाटर प्यूरी डालें और 15 मिनट तक तेल अलग होने तक पकाएं।" },
            { name: "Blend the sauce until silky smooth, then return to pan. This is the secret to restaurant-quality butter chicken.", hindi: "सॉस को रेशमी चिकना ब्लेंड करें, फिर पैन में वापस डालें। यह रेस्तरां जैसे बटर चिकन का राज है।" },
            { name: "Add cream, kasuri methi (crushed dried fenugreek), and a pinch of sugar. Stir well.", hindi: "क्रीम, कसूरी मेथी (कुचली सूखी मेथी), और चुटकी चीनी डालें। अच्छी तरह मिलाएं।" },
            { name: "Add the grilled chicken pieces and simmer gently for 10 minutes on low heat.", hindi: "भुने हुए चिकन के टुकड़े डालें और धीमी आंच पर 10 मिनट धीरे से पकाएं।" },
            { name: "Finish with a swirl of fresh cream and a knob of butter. Serve hot with naan or jeera rice.", hindi: "ताजी क्रीम और मक्खन से सजाएं। नान या जीरा राइस के साथ गरमा गरम परोसें।" }
        ],
        chefTips: [
            { text: "Blend the tomato-onion sauce for that authentic restaurant smoothness.", hindi: "असली रेस्तरां जैसी चिकनाहट के लिए टमाटर-प्याज सॉस ब्लेंड करें।" },
            { text: "Kasuri methi (dried fenugreek leaves) is the secret ingredient — never skip it.", hindi: "कसूरी मेथी गुप्त सामग्री है — कभी न छोड़ें।" }
        ],
        descriptionPrefix: "Creamy, aromatic Indian curry with tender chicken in a rich tomato-butter sauce."
    },
    "chole": {
        baseIngredients: [
            { name: "Chickpeas (soaked overnight)", nameHindi: "छोले (रात भर भीगे)", amount: "2", unit: "cups" },
            { name: "Onion (finely chopped)", nameHindi: "प्याज (बारीक कटा)", amount: "2", unit: "large" },
            { name: "Tomatoes (pureed)", nameHindi: "टमाटर (प्यूरी)", amount: "3", unit: "medium" },
            { name: "Chole masala", nameHindi: "छोले मसाला", amount: "2", unit: "tbsp" },
            { name: "Tea bags or amchur", nameHindi: "चाय की पत्ती या अमचूर", amount: "2", unit: "bags" }
        ],
        techniques: [
            { name: "Soak chickpeas overnight. Pressure cook with tea bags (for dark color), salt, and bay leaf for 5-6 whistles until soft.", hindi: "छोले रात भर भिगोएं। चाय की पत्ती (गहरे रंग के लिए), नमक और तेजपत्ता के साथ 5-6 सीटी तक प्रेशर कुक करें।" },
            { name: "Heat oil in a pan. Add cumin seeds, bay leaf, and cinnamon stick. Let them splutter.", hindi: "पैन में तेल गरम करें। जीरा, तेजपत्ता और दालचीनी डालें। तड़कने दें।" },
            { name: "Add onions and fry until deep golden brown, about 10 minutes on medium heat.", hindi: "प्याज डालें और गहरा सुनहरा होने तक लगभग 10 मिनट भूनें।" },
            { name: "Add ginger-garlic paste, cook 2 minutes. Add tomato puree, chole masala, turmeric, and chili. Cook until oil separates.", hindi: "अदरक-लहसुन पेस्ट डालें, 2 मिनट पकाएं। टमाटर प्यूरी, छोले मसाला, हल्दी और मिर्च डालें। तेल अलग होने तक पकाएं।" },
            { name: "Add cooked chickpeas with some cooking liquid. Mash a few chickpeas for thicker gravy. Simmer 15 minutes.", hindi: "पके छोले कुछ पानी के साथ डालें। गाढ़ी ग्रेवी के लिए कुछ छोले मसलें। 15 मिनट उबालें।" },
            { name: "Add amchur (dry mango powder) or lemon juice for tanginess. Adjust salt. Simmer 5 more minutes.", hindi: "खटाई के लिए अमचूर या नींबू डालें। नमक ठीक करें। 5 मिनट और उबालें।" },
            { name: "Garnish with fresh coriander, ginger julienne, and green chili. Serve with bhature, puri, or rice.", hindi: "ताजा धनिया, अदरक की जुलिएन्न और हरी मिर्च से सजाएं। भटूरे, पूरी या चावल के साथ परोसें।" }
        ],
        chefTips: [
            { text: "Tea bags while cooking give the traditional dark color to chole.", hindi: "पकाते समय चाय की पत्ती छोलों को पारंपरिक गहरा रंग देती है।" }
        ],
        descriptionPrefix: "Spicy and tangy North Indian chickpea curry, a Punjabi classic."
    },
    "rajma": {
        baseIngredients: [
            { name: "Red kidney beans (soaked overnight)", nameHindi: "राजमा (रात भर भीगे)", amount: "1.5", unit: "cups" },
            { name: "Onion (finely chopped)", nameHindi: "प्याज (बारीक कटा)", amount: "2", unit: "medium" },
            { name: "Tomatoes (pureed)", nameHindi: "टमाटर (प्यूरी)", amount: "3", unit: "medium" },
            { name: "Rajma masala / Garam masala", nameHindi: "राजमा / गरम मसाला", amount: "1.5", unit: "tbsp" }
        ],
        techniques: [
            { name: "Soak rajma overnight in plenty of water. Pressure cook with salt and bay leaf for 7-8 whistles until very soft.", hindi: "राजमा रात भर पानी में भिगोएं। नमक और तेजपत्ता के साथ 7-8 सीटी तक बहुत नरम होने तक प्रेशर कुक करें।" },
            { name: "Heat oil/ghee in a heavy pan. Add cumin seeds, bay leaf, cinnamon, and cloves.", hindi: "भारी पैन में तेल/घी गरम करें। जीरा, तेजपत्ता, दालचीनी और लौंग डालें।" },
            { name: "Add onions and cook until golden brown, about 8 minutes. Add ginger-garlic paste and cook 2 minutes.", hindi: "प्याज डालें और सुनहरा होने तक लगभग 8 मिनट पकाएं। अदरक-लहसुन पेस्ट डालें और 2 मिनट पकाएं।" },
            { name: "Add tomato puree, turmeric, chili powder, coriander powder, and rajma masala. Cook until oil separates (10 min).", hindi: "टमाटर प्यूरी, हल्दी, मिर्च, धनिया और राजमा मसाला डालें। तेल अलग होने तक पकाएं (10 मिनट)।" },
            { name: "Add cooked rajma with its liquid. Mash some beans against the side of the pan for a thick, creamy gravy. Simmer 20 minutes.", hindi: "पके राजमा उसके पानी के साथ डालें। गाढ़ी ग्रेवी के लिए कुछ राजमा पैन के किनारे मसलें। 20 मिनट धीमी आंच पर पकाएं।" },
            { name: "Add garam masala and butter. Stir well. Taste and adjust salt.", hindi: "गरम मसाला और मक्खन डालें। अच्छी तरह मिलाएं। स्वाद चखें और नमक ठीक करें।" },
            { name: "Garnish with fresh coriander and serve hot with steamed basmati rice.", hindi: "ताजा धनिया से सजाएं और स्टीम्ड बासमती चावल के साथ गरमा गरम परोसें।" }
        ],
        chefTips: [
            { text: "The longer rajma simmers, the creamier and more flavorful it gets.", hindi: "जितनी देर राजमा उबलेगा, उतना ही क्रीमी और स्वादिष्ट बनेगा।" }
        ],
        descriptionPrefix: "A hearty North Indian kidney bean curry, a comfort food classic served with rice."
    },
    "idli": {
        baseIngredients: [
            { name: "Idli rice (parboiled)", nameHindi: "इडली चावल", amount: "2", unit: "cups" },
            { name: "Urad dal (split black gram)", nameHindi: "उड़द दाल", amount: "1", unit: "cup" },
            { name: "Fenugreek seeds", nameHindi: "मेथी दाना", amount: "1", unit: "tsp" },
            { name: "Salt", nameHindi: "नमक", amount: "1", unit: "tsp" }
        ],
        techniques: [
            { name: "Wash and soak idli rice separately for 4-6 hours. Wash and soak urad dal with fenugreek seeds for 4-6 hours.", hindi: "इडली चावल अलग से धोकर 4-6 घंटे भिगोएं। उड़द दाल को मेथी दाने के साथ 4-6 घंटे भिगोएं।" },
            { name: "Grind urad dal first to a smooth, fluffy batter (adding cold water as needed). It should be light and airy.", hindi: "पहले उड़द दाल को चिकना, फूला हुआ बैटर बनाएं (जरूरत अनुसार ठंडा पानी डालें)। यह हल्का और हवादार होना चाहिए।" },
            { name: "Grind rice to a slightly coarse batter. Combine both batters, add salt, and mix well.", hindi: "चावल को हल्का दरदरा बैटर बनाएं। दोनों बैटर मिलाएं, नमक डालें और अच्छी तरह मिलाएं।" },
            { name: "Cover and let the batter ferment in a warm place for 8-12 hours until it doubles in size and becomes bubbly.", hindi: "ढकें और बैटर को गर्म जगह पर 8-12 घंटे किण्वित होने दें जब तक दोगुना और बुलबुलेदार न हो जाए।" },
            { name: "Grease the idli molds with oil. Pour fermented batter into each mold, filling to 3/4.", hindi: "इडली के सांचों में तेल लगाएं। हर सांचे में किण्वित बैटर 3/4 तक भरें।" },
            { name: "Pour water into the steamer and bring to a rolling boil. Place the idli stand and steam for 10-12 minutes.", hindi: "स्टीमर में पानी डालें और तेज उबाल आने दें। इडली स्टैंड रखें और 10-12 मिनट भाप में पकाएं।" },
            { name: "Check doneness: insert a toothpick — it should come out clean. Remove idlis with a wet spoon.", hindi: "टूथपिक डालकर चेक करें — साफ निकलना चाहिए। गीले चम्मच से इडली निकालें।" },
            { name: "Serve hot with coconut chutney and piping hot sambar.", hindi: "नारियल की चटनी और गरमागरम सांभर के साथ गरम परोसें।" }
        ],
        chefTips: [
            { text: "Use cold water when grinding urad dal for fluffier batter.", hindi: "फूले हुए बैटर के लिए उड़द दाल पीसते समय ठंडे पानी का उपयोग करें।" }
        ],
        descriptionPrefix: "Soft, fluffy South Indian steamed rice cakes, a healthy breakfast classic."
    },
    "samosa": {
        baseIngredients: [
            { name: "All-purpose flour (maida)", nameHindi: "मैदा", amount: "2", unit: "cups" },
            { name: "Potatoes (boiled & mashed)", nameHindi: "आलू (उबले और मसले)", amount: "4", unit: "medium" },
            { name: "Green peas", nameHindi: "हरे मटर", amount: "1/2", unit: "cup" },
            { name: "Cumin, coriander, garam masala", nameHindi: "जीरा, धनिया, गरम मसाला", amount: "1", unit: "tsp each" },
            { name: "Oil for deep frying", nameHindi: "तलने के लिए तेल", amount: "as needed", unit: "" }
        ],
        techniques: [
            { name: "Make dough: Mix flour, salt, ajwain, and 3 tbsp hot oil. Add water gradually to form a stiff dough. Rest for 30 minutes.", hindi: "आटा बनाएं: मैदा, नमक, अजवाइन, और 3 बड़े चम्मच गरम तेल मिलाएं। धीरे-धीरे पानी डालकर सख्त आटा गूंदें। 30 मिनट रखें।" },
            { name: "For filling: heat oil, add cumin seeds. Add green chili, ginger, boiled-mashed potatoes, peas, and all spices. Cook 5 minutes. Cool.", hindi: "भरावन: तेल गरम करें, जीरा डालें। हरी मिर्च, अदरक, उबले-मसले आलू, मटर, और सभी मसाले डालें। 5 मिनट पकाएं। ठंडा करें।" },
            { name: "Divide dough into balls. Roll each into an oval shape. Cut in half to get two semicircles.", hindi: "आटे को गोले बनाएं। हर गोले को अंडाकार बेलें। आधा काटकर दो अर्धगोले बनाएं।" },
            { name: "Apply water paste on the straight edge, form a cone. Fill with potato mixture (don't overfill). Seal edges tightly, pressing with a fork.", hindi: "सीधे किनारे पर पानी का पेस्ट लगाएं, शंकु बनाएं। आलू मिश्रण भरें (ज्यादा न भरें)। किनारे कांटे से दबाकर सील करें।" },
            { name: "Heat oil to 160°C (320°F) — medium-low heat. Slide samosas in gently. Fry on low heat for 8-10 minutes turning occasionally.", hindi: "तेल 160°C (320°F) तक गरम करें — मध्यम-धीमी आंच। समोसे धीरे से डालें। धीमी आंच पर 8-10 मिनट पलटते हुए तलें।" },
            { name: "Increase heat to high for final 2 minutes to get golden and super crispy.", hindi: "सुनहरा और कुरकुरा करने के लिए अंतिम 2 मिनट आंच तेज करें।" },
            { name: "Drain on paper towels. Serve hot with mint chutney and tamarind chutney.", hindi: "पेपर टॉवल पर सुखाएं। पुदीने की चटनी और इमली की चटनी के साथ गरमा गरम परोसें।" }
        ],
        chefTips: [
            { text: "Fry on LOW heat first — this ensures the samosa is cooked through and crispy, not raw inside.", hindi: "पहले धीमी आंच पर तलें — इससे समोसा अंदर से पका और कुरकुरा होता है।" }
        ],
        descriptionPrefix: "Crispy, spiced potato-filled pastry triangles — the iconic Indian street food snack."
    },
    "fried rice": {
        baseIngredients: [
            { name: "Cooked rice (day-old, cold)", nameHindi: "पका चावल (एक दिन पुराना, ठंडा)", amount: "3", unit: "cups" },
            { name: "Eggs", nameHindi: "अंडे", amount: "2", unit: "large" },
            { name: "Mixed vegetables (carrot, peas, corn, beans)", nameHindi: "मिश्रित सब्जियां (गाजर, मटर, मकई, बीन्स)", amount: "1", unit: "cup" },
            { name: "Soy sauce", nameHindi: "सोया सॉस", amount: "2", unit: "tbsp" },
            { name: "Sesame oil", nameHindi: "तिल का तेल", amount: "1", unit: "tbsp" },
            { name: "Spring onions", nameHindi: "हरे प्याज", amount: "3", unit: "stalks" }
        ],
        techniques: [
            { name: "Use day-old rice that has been refrigerated. Break up clumps with your hands. This is key for non-mushy fried rice.", hindi: "एक दिन पुराना फ्रिज का चावल इस्तेमाल करें। हाथ से गांठें तोड़ें। यह गैर-गीले फ्राइड राइस की कुंजी है।" },
            { name: "Heat wok on highest heat until smoking. Add 2 tbsp oil and swirl to coat the wok.", hindi: "वॉक को सबसे तेज आंच पर धुआं आने तक गरम करें। 2 बड़े चम्मच तेल डालें।" },
            { name: "Crack eggs directly into the hot wok. Scramble quickly for 30 seconds until just set. Break into small pieces.", hindi: "गरम वॉक में सीधे अंडे तोड़ें। 30 सेकंड में जल्दी से स्क्रैम्बल करें। छोटे टुकड़ों में तोड़ें।" },
            { name: "Push eggs to side. Add diced vegetables (carrots first, then peas, corn). Stir-fry 2 minutes on high heat.", hindi: "अंडे बगल में करें। कटी सब्जियां डालें (पहले गाजर, फिर मटर, मकई)। तेज आंच पर 2 मिनट भूनें।" },
            { name: "Add cold rice to the wok. Toss vigorously on highest heat, pressing rice against the wok for smoky flavor (wok hei).", hindi: "ठंडे चावल वॉक में डालें। तेज आंच पर जोर से उछालें, धुएं का स्वाद (वॉक हे) के लिए चावल को वॉक से दबाएं।" },
            { name: "Add soy sauce, a pinch of white pepper, and sesame oil. Toss everything together for 1-2 minutes.", hindi: "सोया सॉस, चुटकी सफेद मिर्च और तिल का तेल डालें। 1-2 मिनट सब कुछ मिलाएं।" },
            { name: "Add chopped spring onion greens. Give a final toss and serve immediately in a hot plate.", hindi: "कटे हरे प्याज डालें। आखिरी बार उछालें और गरम प्लेट में तुरंत परोसें।" }
        ],
        chefTips: [
            { text: "Day-old cold rice is the #1 secret. Fresh hot rice makes mushy fried rice.", hindi: "एक दिन पुराना ठंडा चावल #1 राज है। ताजा गरम चावल गीला फ्राइड राइस बनाता है।" },
            { text: "Maximum heat and fast tossing gives the 'wok hei' smoky flavor.", hindi: "अधिकतम आंच और तेज उछाल 'वॉक हे' धुएं का स्वाद देता है।" }
        ],
        descriptionPrefix: "Quick, smoky stir-fried rice with vegetables and egg — a wok classic."
    },
    "pad thai": {
        baseIngredients: [
            { name: "Flat rice noodles", nameHindi: "चपटे चावल के नूडल्स", amount: "200", unit: "g" },
            { name: "Shrimp or chicken", nameHindi: "झींगा या चिकन", amount: "200", unit: "g" },
            { name: "Tamarind paste", nameHindi: "इमली का पेस्ट", amount: "3", unit: "tbsp" },
            { name: "Fish sauce", nameHindi: "फिश सॉस", amount: "2", unit: "tbsp" },
            { name: "Palm sugar", nameHindi: "ताड़ की चीनी", amount: "2", unit: "tbsp" },
            { name: "Peanuts (crushed)", nameHindi: "मूंगफली (कुचली)", amount: "1/4", unit: "cup" },
            { name: "Eggs", nameHindi: "अंडे", amount: "2", unit: "large" },
            { name: "Bean sprouts", nameHindi: "बीन स्प्राउट्स", amount: "1", unit: "cup" }
        ],
        techniques: [
            { name: "Soak flat rice noodles in room temperature water for 30 minutes until pliable (not soft). Drain well.", hindi: "चपटे चावल के नूडल्स को कमरे के तापमान के पानी में 30 मिनट लचीला होने तक भिगोएं (नरम नहीं)। अच्छी तरह छानें।" },
            { name: "Make Pad Thai sauce: whisk tamarind paste, fish sauce, palm sugar, and 1 tbsp water until sugar dissolves.", hindi: "पैड थाई सॉस बनाएं: इमली पेस्ट, फिश सॉस, ताड़ चीनी, और 1 बड़ा चम्मच पानी चीनी घुलने तक फेंटें।" },
            { name: "Heat 2 tbsp oil in a wok on high heat. Cook shrimp/chicken until just done (2-3 min). Remove and set aside.", hindi: "वॉक में 2 बड़े चम्मच तेल तेज आंच पर गरम करें। झींगा/चिकन पकाएं (2-3 मिनट)। निकालकर अलग रखें।" },
            { name: "Add 1 tbsp oil to the wok. Crack eggs and scramble quickly. Push to the side of the wok.", hindi: "वॉक में 1 बड़ा चम्मच तेल डालें। अंडे तोड़ें और जल्दी स्क्रैम्बल करें। वॉक के किनारे कर दें।" },
            { name: "Add soaked noodles to the wok. Pour the Pad Thai sauce over. Toss continuously on high heat for 2-3 minutes until noodles absorb the sauce.", hindi: "भीगे नूडल्स वॉक में डालें। पैड थाई सॉस डालें। तेज आंच पर 2-3 मिनट लगातार मिलाएं जब तक नूडल्स सॉस सोख न लें।" },
            { name: "Add back the cooked protein, bean sprouts, and half the green onions. Toss for 30 seconds.", hindi: "पका प्रोटीन, बीन स्प्राउट्स, और आधे हरे प्याज वापस डालें। 30 सेकंड मिलाएं।" },
            { name: "Serve topped with crushed peanuts, extra bean sprouts, lime wedges, and dried chili flakes.", hindi: "कुचली मूंगफली, अतिरिक्त बीन स्प्राउट्स, नींबू, और सूखी मिर्च फ्लेक्स के साथ परोसें।" }
        ],
        chefTips: [
            { text: "Tamarind paste is non-negotiable — it's the soul of authentic Pad Thai.", hindi: "इमली का पेस्ट जरूरी है — यह असली पैड थाई की आत्मा है।" },
            { text: "Don't over-soak the noodles or they'll become mushy when stir-fried.", hindi: "नूडल्स ज्यादा न भिगोएं वरना भूनते समय गल जाएंगे।" }
        ],
        descriptionPrefix: "Thailand's iconic stir-fried rice noodles with the perfect sweet-sour-savory balance."
    },
    "kung pao chicken": {
        baseIngredients: [
            { name: "Chicken breast (diced)", nameHindi: "चिकन ब्रेस्ट (कटा)", amount: "400", unit: "g" },
            { name: "Dried red chilies", nameHindi: "सूखी लाल मिर्च", amount: "8-10", unit: "pieces" },
            { name: "Roasted peanuts", nameHindi: "भुनी मूंगफली", amount: "1/3", unit: "cup" },
            { name: "Sichuan peppercorns", nameHindi: "सिचुआन काली मिर्च", amount: "1", unit: "tsp" },
            { name: "Soy sauce + dark vinegar", nameHindi: "सोया सॉस + काला सिरका", amount: "2+1", unit: "tbsp" },
            { name: "Cornstarch", nameHindi: "कॉर्नस्टार्च", amount: "1", unit: "tbsp" }
        ],
        techniques: [
            { name: "Cut chicken into 1-inch cubes. Marinate with 1 tbsp soy sauce, 1 tbsp Shaoxing wine, and 1 tbsp cornstarch for 15 minutes.", hindi: "चिकन 1 इंच के टुकड़ों में काटें। 1 बड़ा चम्मच सोया सॉस, 1 बड़ा चम्मच शाओक्सिंग वाइन, और 1 बड़ा चम्मच कॉर्नस्टार्च से 15 मिनट मैरीनेट करें।" },
            { name: "Make the Kung Pao sauce: whisk 2 tbsp soy sauce, 1 tbsp dark vinegar, 1 tbsp sugar, 1 tsp sesame oil, and 1 tsp cornstarch slurry.", hindi: "कुंग पाओ सॉस बनाएं: 2 बड़े चम्मच सोया सॉस, 1 बड़ा चम्मच काला सिरका, 1 बड़ा चम्मच चीनी, 1 छोटा चम्मच तिल तेल, और कॉर्नस्टार्च घोल फेंटें।" },
            { name: "Heat wok until smoking. Add 2 tbsp oil. Stir-fry marinated chicken in batches until golden (2-3 min per batch). Remove.", hindi: "वॉक को धुआं आने तक गरम करें। 2 बड़े चम्मच तेल डालें। मैरीनेट चिकन को बैच में सुनहरा होने तक भूनें (2-3 मिनट)। निकालें।" },
            { name: "In the same wok, add 1 tbsp oil. Add dried red chilies and Sichuan peppercorns. Stir-fry 30 seconds until fragrant (don't burn!).", hindi: "उसी वॉक में 1 बड़ा चम्मच तेल डालें। सूखी लाल मिर्च और सिचुआन काली मिर्च डालें। 30 सेकंड खुशबू आने तक भूनें (जलने न दें!)।" },
            { name: "Add diced scallion whites, ginger, and garlic. Stir-fry 15 seconds. Add diced celery or bell pepper for crunch.", hindi: "कटे हरे प्याज का सफेद हिस्सा, अदरक और लहसुन डालें। 15 सेकंड भूनें। कुरकुरापन के लिए अजवाइन या शिमला मिर्च डालें।" },
            { name: "Return chicken to wok. Pour Kung Pao sauce over. Toss vigorously on high heat for 1 minute until sauce thickens and coats everything.", hindi: "चिकन वापस वॉक में डालें। कुंग पाओ सॉस डालें। तेज आंच पर 1 मिनट जोर से उछालें जब तक सॉस गाढ़ा न हो।" },
            { name: "Add roasted peanuts and scallion greens. Toss once. Serve immediately with steamed jasmine rice.", hindi: "भुनी मूंगफली और हरे प्याज का हरा हिस्सा डालें। एक बार उछालें। जैस्मिन चावल के साथ तुरंत परोसें।" }
        ],
        chefTips: [
            { text: "Sichuan peppercorns create the signature 'numbing' sensation. Toast them briefly for maximum effect.", hindi: "सिचुआन काली मिर्च विशेष 'सुन्न' अनुभव देती है। अधिकतम प्रभाव के लिए हल्का भूनें।" },
            { text: "Don't overcook the chicken — it should be juicy inside with a golden exterior.", hindi: "चिकन ज्यादा न पकाएं — अंदर से रसीला और बाहर से सुनहरा होना चाहिए।" }
        ],
        descriptionPrefix: "A fiery Sichuan classic with tender chicken, roasted peanuts, and the signature numbing-spicy punch."
    },
    "sushi": {
        baseIngredients: [
            { name: "Sushi rice (short grain)", nameHindi: "सुशी चावल", amount: "2", unit: "cups" },
            { name: "Rice vinegar", nameHindi: "चावल का सिरका", amount: "1/4", unit: "cup" },
            { name: "Nori sheets", nameHindi: "नोरी शीट", amount: "5", unit: "sheets" },
            { name: "Sushi-grade fish (salmon/tuna)", nameHindi: "सुशी-ग्रेड मछली", amount: "200", unit: "g" },
            { name: "Cucumber, Avocado", nameHindi: "खीरा, एवोकाडो", amount: "1", unit: "each" }
        ],
        techniques: [
            { name: "Wash sushi rice 5-6 times until water runs clear. Cook with equal water. Let steam for 10 minutes with lid on after cooking.", hindi: "सुशी चावल 5-6 बार पानी साफ होने तक धोएं। बराबर पानी से पकाएं। पकने के बाद 10 मिनट ढक्कन लगाकर भाप में रखें।" },
            { name: "Mix rice vinegar, sugar, and salt. Gently fold into hot rice with a cutting motion (don't mash). Fan while mixing to cool quickly.", hindi: "चावल का सिरका, चीनी और नमक मिलाएं। गरम चावल में काटने की गति से धीरे मिलाएं। जल्दी ठंडा करने के लिए पंखा करें।" },
            { name: "Slice fish into thin, even strips against the grain. Cut cucumber and avocado into thin matchsticks.", hindi: "मछली को ग्रेन के अगेंस्ट पतली, समान स्ट्रिप्स में काटें। खीरा और एवोकाडो पतली माचिस की तीली में काटें।" },
            { name: "Place nori sheet (shiny side down) on a bamboo mat. Wet your hands. Spread rice evenly, leaving 1 inch at the top.", hindi: "बांस की चटाई पर नोरी शीट (चमकदार साइड नीचे) रखें। हाथ गीले करें। चावल समान रूप से फैलाएं, ऊपर 1 इंच छोड़ दें।" },
            { name: "Place fish, cucumber, and avocado strips in a line across the center of the rice.", hindi: "चावल के बीच में एक लाइन में मछली, खीरा और एवोकाडो की स्ट्रिप्स रखें।" },
            { name: "Using the bamboo mat, roll tightly from the bottom up, applying gentle, even pressure. Seal the edge with a little water.", hindi: "बांस की चटाई का उपयोग करके नीचे से ऊपर कसकर रोल करें, हल्का समान दबाव लगाएं। किनारे को पानी से सील करें।" },
            { name: "With a sharp, wet knife, slice each roll into 6-8 bite-sized pieces. Clean knife between cuts.", hindi: "तेज, गीले चाकू से हर रोल को 6-8 छोटे टुकड़ों में काटें। हर कट के बीच चाकू साफ करें।" },
            { name: "Serve with soy sauce, pickled ginger, and wasabi.", hindi: "सोया सॉस, अचार अदरक और वसाबी के साथ परोसें।" }
        ],
        chefTips: [
            { text: "Use the freshest possible fish — sushi-grade is essential for raw preparations.", hindi: "सबसे ताजी मछली इस्तेमाल करें — कच्ची तैयारी के लिए सुशी-ग्रेड जरूरी है।" },
            { text: "Keep your hands wet when handling rice to prevent sticking.", hindi: "चिपकने से रोकने के लिए चावल छूते समय हाथ गीले रखें।" }
        ],
        descriptionPrefix: "Perfectly formed Japanese sushi rolls with seasoned rice and fresh fillings."
    },
    "ramen": {
        baseIngredients: [
            { name: "Ramen noodles (fresh or dried)", nameHindi: "रामेन नूडल्स", amount: "200", unit: "g" },
            { name: "Pork belly or chicken", nameHindi: "पोर्क बेली या चिकन", amount: "300", unit: "g" },
            { name: "Chicken/pork stock", nameHindi: "चिकन/पोर्क स्टॉक", amount: "6", unit: "cups" },
            { name: "Soy sauce (tare)", nameHindi: "सोया सॉस (तारे)", amount: "3", unit: "tbsp" },
            { name: "Mirin", nameHindi: "मिरीन", amount: "2", unit: "tbsp" },
            { name: "Eggs (for ajitsuke tamago)", nameHindi: "अंडे (अजित्सुके तमागो)", amount: "2", unit: "large" },
            { name: "Nori, green onions", nameHindi: "नोरी, हरे प्याज", amount: "for garnish", unit: "" }
        ],
        techniques: [
            { name: "Make chashu pork: roll pork belly tightly, tie with string. Braise in soy sauce, mirin, sake, sugar, garlic, and ginger for 2-3 hours on low heat until meltingly tender.", hindi: "चाशू पोर्क बनाएं: पोर्क बेली कसकर रोल करें, धागे से बांधें। सोया सॉस, मिरीन, साके, चीनी, लहसुन और अदरक में 2-3 घंटे धीमी आंच पर ब्रेज़ करें।" },
            { name: "Make ajitsuke tamago (marinated egg): soft-boil eggs (6.5 min in boiling water), ice bath, peel. Marinate in soy-mirin mixture for 4 hours minimum.", hindi: "अजित्सुके तमागो बनाएं: अंडे सॉफ्ट-बॉइल करें (6.5 मिनट उबलते पानी में), बर्फ के पानी में डालें, छीलें। सोया-मिरीन मिश्रण में 4 घंटे मैरीनेट करें।" },
            { name: "Build the broth: simmer chicken/pork stock with dried kelp, dried shiitake, garlic, and ginger for 30 minutes. Strain.", hindi: "शोरबा बनाएं: चिकन/पोर्क स्टॉक को सूखे केल्प, सूखे शिताके, लहसुन, और अदरक के साथ 30 मिनट उबालें। छानें।" },
            { name: "Prepare tare (seasoning base): mix 3 tbsp soy sauce, 1 tbsp mirin, and a drizzle of sesame oil in each serving bowl.", hindi: "तारे (सीज़निंग बेस) तैयार करें: हर परोसने वाले कटोरे में 3 बड़े चम्मच सोया सॉस, 1 बड़ा चम्मच मिरीन, और तिल का तेल मिलाएं।" },
            { name: "Cook ramen noodles according to package directions (usually 2-3 min). Do NOT overcook — they continue cooking in hot broth.", hindi: "रामेन नूडल्स पैकेज निर्देशानुसार पकाएं (आमतौर पर 2-3 मिनट)। ज्यादा न पकाएं — गरम शोरबे में पकते रहते हैं।" },
            { name: "Ladle hot broth over the tare in each bowl. Add drained noodles and give a quick stir.", hindi: "हर कटोरे में तारे पर गरम शोरबा डालें। छने नूडल्स डालें और जल्दी से हिलाएं।" },
            { name: "Slice chashu pork into thin rounds. Halve the marinated eggs. Arrange nori, chashu, egg, and sliced green onions beautifully on top.", hindi: "चाशू पोर्क पतले राउंड में काटें। मैरीनेट अंडे आधे करें। नोरी, चाशू, अंडा, और कटे हरे प्याज खूबसूरती से ऊपर सजाएं।" },
            { name: "Serve immediately while piping hot. Add chili oil, sesame seeds, or extra nori as desired.", hindi: "गरमागरम तुरंत परोसें। चाहें तो चिली ऑइल, तिल, या अतिरिक्त नोरी डालें।" }
        ],
        chefTips: [
            { text: "The tare (seasoning) goes in the bowl FIRST, then the broth. This builds layered flavor.", hindi: "तारे (सीज़निंग) पहले कटोरे में जाता है, फिर शोरबा। इससे परतदार स्वाद बनता है।" },
            { text: "Don't overcook the noodles — they should have a firm bite since they keep cooking in hot broth.", hindi: "नूडल्स ज्यादा न पकाएं — इनमें सख्त बाइट होनी चाहिए क्योंकि गरम शोरबे में पकते रहते हैं।" }
        ],
        descriptionPrefix: "Rich, deeply savory Japanese noodle soup with tender chashu pork and a perfectly marinated egg."
    },
    "omelette": {
        baseIngredients: [
            { name: "Eggs", nameHindi: "अंडे", amount: "3", unit: "large" },
            { name: "Butter", nameHindi: "मक्खन", amount: "1", unit: "tbsp" },
            { name: "Salt & Pepper", nameHindi: "नमक और काली मिर्च", amount: "to taste", unit: "" },
            { name: "Cheese (optional)", nameHindi: "चीज़ (वैकल्पिक)", amount: "30", unit: "g" },
            { name: "Fresh herbs (chives, parsley)", nameHindi: "ताजी जड़ी-बूटियां", amount: "1", unit: "tbsp" }
        ],
        techniques: [
            { name: "Crack 3 eggs into a bowl. Season with salt and pepper. Whisk vigorously until eggs are completely uniform and slightly frothy.", hindi: "3 अंडे कटोरे में तोड़ें। नमक, काली मिर्च डालें। एकदम एक समान और थोड़ा झागदार होने तक जोर से फेंटें।" },
            { name: "Heat a non-stick pan on medium heat. Add butter and swirl to coat the entire pan. Let butter foam but not brown.", hindi: "नॉन-स्टिक पैन मध्यम आंच पर गरम करें। मक्खन डालें और पूरे पैन में फैलाएं। मक्खन को झागदार होने दें लेकिन भूरा न हो।" },
            { name: "Pour in the eggs. Let sit for 10 seconds to form a thin layer on the bottom.", hindi: "अंडे डालें। नीचे एक पतली परत बनने के लिए 10 सेकंड रहने दें।" },
            { name: "Using a spatula, gently push the cooked edges toward the center. Tilt the pan so uncooked egg fills the gaps.", hindi: "स्पैचुला से धीरे से पके किनारों को केंद्र की ओर धकेलें। पैन झुकाएं ताकि कच्चा अंडा खाली जगह भर दे।" },
            { name: "When the top is still slightly wet but mostly set, add cheese and any fillings on one half.", hindi: "जब ऊपर अभी थोड़ा गीला लेकिन ज्यादातर सेट हो, एक आधे हिस्से पर चीज़ और भरावन डालें।" },
            { name: "Fold the omelette in half. Cook for 30 seconds more on medium-low heat. The inside should be creamy, not dry.", hindi: "आमलेट आधा मोड़ें। मध्यम-धीमी आंच पर 30 सेकंड और पकाएं। अंदर क्रीमी होना चाहिए, सूखा नहीं।" },
            { name: "Slide onto a warm plate. Garnish with fresh herbs and serve immediately.", hindi: "गरम प्लेट पर सरकाएं। ताजी जड़ी-बूटियों से सजाएं और तुरंत परोसें।" }
        ],
        chefTips: [
            { text: "The perfect omelette is creamy inside, NOT rubbery. Remove from heat while still slightly wet.", hindi: "परफेक्ट आमलेट अंदर से क्रीमी होता है, रबड़ जैसा नहीं। अभी थोड़ा गीला हो तब आंच से हटाएं।" }
        ],
        descriptionPrefix: "A light, fluffy omelette with a creamy center — classic French technique."
    },
    "apple pie": {
        baseIngredients: [
            { name: "Apples (Granny Smith or Honeycrisp, peeled & sliced)", nameHindi: "सेब (छिले और कटे)", amount: "5-6", unit: "medium" },
            { name: "All-purpose flour (for crust)", nameHindi: "मैदा (क्रस्ट के लिए)", amount: "2.5", unit: "cups" },
            { name: "Cold unsalted butter (cubed)", nameHindi: "ठंडा मक्खन (कटा)", amount: "1", unit: "cup" },
            { name: "Granulated sugar + Brown sugar", nameHindi: "चीनी + ब्राउन शुगर", amount: "3/4", unit: "cup total" },
            { name: "Cinnamon + Nutmeg", nameHindi: "दालचीनी + जायफल", amount: "1.5 tsp + 1/4 tsp", unit: "" },
            { name: "Lemon juice", nameHindi: "नींबू का रस", amount: "1", unit: "tbsp" },
            { name: "Cornstarch", nameHindi: "कॉर्नस्टार्च", amount: "2", unit: "tbsp" },
            { name: "Ice water", nameHindi: "बर्फ का पानी", amount: "6-8", unit: "tbsp" }
        ],
        techniques: [
            { name: "Make pie crust: In a food processor, pulse flour and salt. Add cold cubed butter and pulse until pea-sized crumbs form. Drizzle in ice water 1 tbsp at a time, pulsing until dough just holds together. Divide into two discs, wrap in plastic, and chill for at least 1 hour.", hindi: "पाई क्रस्ट बनाएं: फूड प्रोसेसर में मैदा और नमक डालें। ठंडा कटा मक्खन डालकर मटर के दाने जैसे बनाएं। 1-1 बड़ा चम्मच बर्फ का पानी डालकर आटा बनाएं। दो हिस्सों में बांटें, लपेटकर 1 घंटे फ्रिज करें।" },
            { name: "Peel, core, and thinly slice the apples (about 1/4 inch thick). Toss with lemon juice immediately to prevent browning.", hindi: "सेब छीलें, बीज निकालें, और पतला (लगभग 1/4 इंच) काटें। भूरे होने से रोकने के लिए तुरंत नींबू का रस मिलाएं।" },
            { name: "In a large bowl, combine sliced apples with granulated sugar, brown sugar, cinnamon, nutmeg, cornstarch, and a pinch of salt. Toss well to coat every slice evenly.", hindi: "बड़े कटोरे में कटे सेब, चीनी, ब्राउन शुगर, दालचीनी, जायफल, कॉर्नस्टार्च और चुटकी नमक मिलाएं। हर स्लाइस पर समान रूप से लगाएं।" },
            { name: "Preheat oven to 220°C (425°F). Roll out one chilled dough disc on a floured surface into a 12-inch circle. Gently transfer to a 9-inch pie dish. Trim edges leaving 1 inch overhang.", hindi: "ओवन को 220°C (425°F) पर प्रीहीट करें। एक ठंडे आटे को 12 इंच गोल बेलें। 9 इंच पाई डिश में रखें। 1 इंच अतिरिक्त छोड़कर किनारे काटें।" },
            { name: "Pour the apple filling into the pie crust, mounding it slightly higher in the center. Dot the top with small pieces of butter.", hindi: "सेब का भरावन पाई क्रस्ट में डालें, बीच में हल्का ऊंचा करें। ऊपर मक्खन के छोटे टुकड़े रखें।" },
            { name: "Roll out the second dough disc to 12 inches. Place over the filling. Trim, fold edges under, and crimp to seal. Cut 4-5 decorative slits in the top crust for steam to escape.", hindi: "दूसरा आटा 12 इंच बेलें। भरावन के ऊपर रखें। किनारे मोड़कर दबाएं। भाप निकलने के लिए ऊपर 4-5 सजावटी चीरे लगाएं।" },
            { name: "Brush the top crust with egg wash (1 beaten egg + 1 tbsp cream). Sprinkle generously with coarse sugar for a sparkly, golden finish.", hindi: "ऊपरी क्रस्ट पर एग वॉश (1 फेंटा अंडा + 1 बड़ा चम्मच क्रीम) लगाएं। चमकदार, सुनहरे फिनिश के लिए उदारतापूर्वक मोटी चीनी छिड़कें।" },
            { name: "Bake at 220°C (425°F) for 15 minutes, then reduce to 180°C (350°F) and bake for 35-40 minutes more until the crust is deep golden and filling is bubbly through the slits. If edges brown too fast, cover with foil. Cool for at least 2 hours before slicing. Serve with vanilla ice cream or whipped cream.", hindi: "220°C पर 15 मिनट बेक करें, फिर 180°C पर 35-40 मिनट और बेक करें जब तक क्रस्ट गहरा सुनहरा और भरावन बुलबुलेदार हो। किनारे जल्दी भूरे हों तो फॉइल से ढकें। काटने से पहले कम से कम 2 घंटे ठंडा करें। वैनिला आइसक्रीम के साथ परोसें।" }
        ],
        chefTips: [
            { text: "The #1 secret to flaky crust: keep everything ICE COLD — cold butter, ice water, and even chill your flour and bowl.", hindi: "परतदार क्रस्ट का #1 राज: सब कुछ बर्फ जैसा ठंडा रखें — ठंडा मक्खन, बर्फ का पानी, मैदा और कटोरा भी ठंडा।" },
            { text: "Use a mix of apple varieties (tart Granny Smith + sweet Honeycrisp) for the best flavor balance.", hindi: "सबसे अच्छे स्वाद के लिए सेब की अलग-अलग किस्में मिलाएं (खट्टे + मीठे)।" },
            { text: "Let the pie cool fully before cutting — the filling needs time to set. A warm pie will be runny!", hindi: "काटने से पहले पाई को पूरी तरह ठंडा होने दें — भरावन को सेट होने के लिए समय चाहिए।" }
        ],
        descriptionPrefix: "A classic American apple pie with a buttery, flaky crust and warm spiced apple filling."
    },
    "rasmalai": {
        baseIngredients: [
            { name: "Full-fat Milk (for chenna)", nameHindi: "फुल-फैट दूध (छेना के लिए)", amount: "1", unit: "liter" },
            { name: "Full-fat Milk (for rabri)", nameHindi: "फुल-फैट दूध (रबड़ी के लिए)", amount: "1", unit: "liter" },
            { name: "Sugar", nameHindi: "चीनी", amount: "1.5", unit: "cups" },
            { name: "Lemon juice or vinegar", nameHindi: "नींबू का रस या सिरका", amount: "2", unit: "tbsp" },
            { name: "Green cardamom powder", nameHindi: "हरी इलायची पाउडर", amount: "1/2", unit: "tsp" },
            { name: "Saffron strands", nameHindi: "केसर", amount: "a generous pinch", unit: "" },
            { name: "Chopped pistachios and almonds", nameHindi: "कटे पिस्ता और बादाम", amount: "2", unit: "tbsp" }
        ],
        techniques: [
            { name: "Boil 1 liter milk in a heavy pot. Once it comes to a rolling boil, add lemon juice a little at a time while stirring gently. The milk will curdle and separate into white chenna and green whey.", hindi: "1 लीटर दूध भारी बर्तन में उबालें। तेज उबाल आने पर धीरे-धीरे नींबू का रस डालें। दूध फट कर सफेद छेना और हरे पानी में बंट जाएगा।" },
            { name: "Strain through a muslin cloth. Rinse the chenna under cold water to remove the lemony taste. Squeeze out all excess water and hang for 30 minutes.", hindi: "मलमल के कपड़े से छानें। नींबू का स्वाद हटाने के लिए ठंडे पानी से धोएं। सारा अतिरिक्त पानी निचोड़ें और 30 मिनट लटकाएं।" },
            { name: "Knead the chenna on a flat surface for 8-10 minutes until it becomes completely smooth, soft, and crack-free. This is the most critical step — grainy chenna = hard rasmalai.", hindi: "छेना को समतल सतह पर 8-10 मिनट तक मसलें जब तक पूरी तरह चिकना, नरम, और बिना दरार हो। यह सबसे महत्वपूर्ण कदम है — दानेदार छेना = कड़ी रसमलाई।" },
            { name: "Divide the smooth chenna into 12-14 small balls and flatten each into a smooth disc (about 1.5 inch diameter). They will expand while cooking.", hindi: "चिकने छेना को 12-14 छोटी गोलियों में बांटें और हर एक को चपटी डिस्क (लगभग 1.5 इंच) बनाएं। पकाते समय फूलेंगी।" },
            { name: "Make sugar syrup: boil 5 cups water with 1 cup sugar until sugar dissolves. Gently slide the chenna discs into the boiling syrup. Cover and cook on medium heat for exactly 10 minutes. They will double in size.", hindi: "चाशनी बनाएं: 5 कप पानी में 1 कप चीनी घोलें। छेना की डिस्क धीरे से उबलती चाशनी में डालें। ढकें और मध्यम आंच पर ठीक 10 मिनट पकाएं। वे दोगुनी हो जाएंगी।" },
            { name: "For the rabri: In a separate heavy pan, boil 1 liter milk. Simmer on low heat, stirring frequently and scraping the sides, until it reduces to about 1/3 (thick and creamy, about 25-30 minutes).", hindi: "रबड़ी के लिए: अलग भारी पैन में 1 लीटर दूध उबालें। धीमी आंच पर बार-बार चलाते और किनारे खुरचते हुए लगभग 1/3 होने तक पकाएं (गाढ़ा और क्रीमी, लगभग 25-30 मिनट)।" },
            { name: "Add 1/2 cup sugar, saffron soaked in warm milk, and cardamom powder to the thickened milk. Mix well and cook for 2 more minutes. Let it cool to lukewarm.", hindi: "गाढ़े दूध में 1/2 कप चीनी, गर्म दूध में भिगोया केसर, और इलायची पाउडर डालें। अच्छी तरह मिलाएं और 2 मिनट और पकाएं। गुनगुना होने दें।" },
            { name: "Gently squeeze excess syrup from cooked chenna discs (press lightly between palms) and add them to the cooled saffron rabri. Refrigerate for at least 3-4 hours or overnight. Garnish with pistachios, almonds, and saffron strands. Serve chilled.", hindi: "पकी छेना डिस्क से धीरे से अतिरिक्त चाशनी निचोड़ें और ठंडी केसरी रबड़ी में डालें। कम से कम 3-4 घंटे या रात भर फ्रिज करें। पिस्ता, बादाम, और केसर से सजाकर ठंडा परोसें।" }
        ],
        chefTips: [
            { text: "Knead the chenna for at least 8-10 minutes — this is the #1 secret to soft, melt-in-mouth rasmalai.", hindi: "छेना को कम से कम 8-10 मिनट मसलें — यह नरम, मुंह में घुलने वाली रसमलाई का #1 राज है।" },
            { text: "Always use full-fat milk for both chenna and rabri. Low-fat milk gives less yield and poor texture.", hindi: "छेना और रबड़ी दोनों के लिए हमेशा फुल-फैट दूध इस्तेमाल करें। कम वसा वाला दूध कम मात्रा और खराब बनावट देता है।" },
            { text: "The chenna discs must be completely crack-free before cooking, or they will disintegrate in the syrup.", hindi: "पकाने से पहले छेना की डिस्क पूरी तरह बिना दरार होनी चाहिए, नहीं तो चाशनी में टूट जाएंगी।" }
        ],
        descriptionPrefix: "Soft, spongy milk dumplings soaked in rich saffron-cardamom flavored rabri — a beloved Indian dessert."
    },
    "gulab jamun": {
        baseIngredients: [
            { name: "Khoya / Mawa (dried milk solids)", nameHindi: "खोया / मावा", amount: "200", unit: "g" },
            { name: "All-purpose flour (maida)", nameHindi: "मैदा", amount: "3", unit: "tbsp" },
            { name: "Baking soda", nameHindi: "बेकिंग सोडा", amount: "a pinch", unit: "" },
            { name: "Sugar (for syrup)", nameHindi: "चीनी (चाशनी)", amount: "2", unit: "cups" },
            { name: "Water (for syrup)", nameHindi: "पानी (चाशनी)", amount: "2", unit: "cups" },
            { name: "Green cardamom powder", nameHindi: "हरी इलायची पाउडर", amount: "1/2", unit: "tsp" },
            { name: "Rose water", nameHindi: "गुलाब जल", amount: "1", unit: "tsp" },
            { name: "Ghee or Oil (for deep frying)", nameHindi: "घी या तेल (तलने के लिए)", amount: "for frying", unit: "" }
        ],
        techniques: [
            { name: "Make sugar syrup first: Combine 2 cups sugar and 2 cups water in a pot. Bring to a boil, stirring until sugar dissolves. Add cardamom powder, rose water, and a few drops of lemon juice (prevents crystallization). Simmer for 5 minutes until slightly sticky. Keep warm.", hindi: "पहले चाशनी बनाएं: 2 कप चीनी और 2 कप पानी बर्तन में मिलाएं। चीनी घुलने तक उबालें। इलायची, गुलाब जल, और नींबू की कुछ बूंदें डालें। 5 मिनट हल्की चिपचिपी होने तक उबालें। गर्म रखें।" },
            { name: "Grate or crumble the khoya/mawa finely into a large bowl. Make sure there are no lumps.", hindi: "खोया/मावा को बारीक कद्दूकस करें या बड़े कटोरे में तोड़ें। कोई गांठ न रहे।" },
            { name: "Add maida and baking soda to the khoya. Mix gently and knead into a smooth, crack-free dough. If too dry, add 1-2 tsp of milk. Do not over-knead.", hindi: "खोया में मैदा और बेकिंग सोडा डालें। धीरे से मिलाकर चिकना, बिना दरार वाला आटा गूंदें। सूखा हो तो 1-2 छोटे चम्मच दूध डालें। ज्यादा न गूंदें।" },
            { name: "Divide dough into 15-18 equal portions. Roll each into a perfectly smooth ball — absolutely NO cracks. Even a tiny crack will cause them to break while frying.", hindi: "आटे को 15-18 बराबर भागों में बांटें। हर एक को बिल्कुल चिकनी गोली बनाएं — बिल्कुल कोई दरार नहीं। छोटी सी दरार भी तलते समय तोड़ देगी।" },
            { name: "Heat ghee or oil in a deep kadhai on the LOWEST heat possible. This is the most important step. Gently slide 5-6 balls into the oil. Fry on very low heat, turning gently and constantly.", hindi: "गहरी कढ़ाई में घी/तेल सबसे धीमी आंच पर गरम करें। यह सबसे महत्वपूर्ण कदम है। 5-6 गोलियां धीरे से डालें। बहुत धीमी आंच पर लगातार धीरे-धीरे पलटते हुए तलें।" },
            { name: "Fry for 8-10 minutes, turning frequently, until deep golden brown on all sides. The slow frying ensures they cook evenly inside. Remove and drain on paper towel briefly.", hindi: "8-10 मिनट बार-बार पलटते हुए तलें, सभी तरफ से गहरा सुनहरा होने तक। धीमे तलने से अंदर तक समान पकते हैं। निकालकर पेपर टॉवल पर रखें।" },
            { name: "Immediately drop the hot fried gulab jamuns into the warm (not boiling) sugar syrup. They should be fully submerged.", hindi: "गरम तले हुए गुलाब जामुन तुरंत गर्म (उबलती नहीं) चाशनी में डालें। वे पूरी तरह डूबे होने चाहिए।" },
            { name: "Let them soak for at least 2-3 hours (overnight is best). They will absorb the syrup and become soft, spongy, and juicy. Serve warm or at room temperature, garnished with pistachios and saffron.", hindi: "कम से कम 2-3 घंटे (रात भर सबसे अच्छा) चाशनी में भिगोएं। वे चाशनी सोखकर नरम, स्पंजी और रसीले हो जाएंगे। पिस्ता और केसर से सजाकर गरम या कमरे के तापमान पर परोसें।" }
        ],
        chefTips: [
            { text: "The #1 secret: fry on the LOWEST heat possible. High heat makes them dark outside and raw inside — the most common mistake.", hindi: "#1 राज: सबसे धीमी आंच पर तलें। तेज आंच बाहर से काला और अंदर से कच्चा बनाती है — सबसे आम गलती।" },
            { text: "The balls must be crack-free. Knead the dough and roll each ball between palms until perfectly smooth.", hindi: "गोलियां बिना दरार होनी चाहिए। आटा गूंदें और हर गोली को हथेलियों में बिल्कुल चिकना होने तक रोल करें।" },
            { text: "Drop into WARM syrup, not boiling. Boiling syrup will dissolve the outer layer.", hindi: "गर्म चाशनी में डालें, उबलती में नहीं। उबलती चाशनी बाहरी परत घोल देगी।" }
        ],
        descriptionPrefix: "Soft, golden deep-fried milk dumplings soaked in fragrant rose-cardamom sugar syrup — India's most beloved dessert."
    },
    "rasgulla": {
        baseIngredients: [
            { name: "Full-fat Milk", nameHindi: "फुल-फैट दूध", amount: "1", unit: "liter" },
            { name: "Lemon juice or vinegar", nameHindi: "नींबू का रस या सिरका", amount: "2", unit: "tbsp" },
            { name: "Sugar (for syrup)", nameHindi: "चीनी (चाशनी के लिए)", amount: "2", unit: "cups" },
            { name: "Water (for syrup)", nameHindi: "पानी (चाशनी के लिए)", amount: "4", unit: "cups" },
            { name: "Green cardamom", nameHindi: "हरी इलायची", amount: "3-4", unit: "pods" },
            { name: "Rose water (optional)", nameHindi: "गुलाब जल (वैकल्पिक)", amount: "1", unit: "tsp" }
        ],
        techniques: [
            { name: "Boil 1 liter full-fat milk in a heavy-bottomed pan. Once it reaches a rolling boil, reduce heat to low and add lemon juice or vinegar one tablespoon at a time, stirring gently. The milk will curdle and separate into white chenna and greenish whey.", hindi: "1 लीटर फुल-फैट दूध भारी तले वाले बर्तन में उबालें। तेज उबाल आने पर आंच धीमी करें और धीरे-धीरे नींबू का रस डालें। दूध फट कर सफेद छेना और हरे पानी में बंट जाएगा।" },
            { name: "Strain the curdled milk through a muslin cloth. Rinse the chenna under cold running water for 30 seconds to remove any lemony taste. Squeeze out ALL excess water and hang the cloth for 30 minutes to drain completely.", hindi: "फटे दूध को मलमल के कपड़े से छानें। 30 सेकंड ठंडे पानी से धोएं। सारा पानी निचोड़ें और 30 मिनट लटकाकर रखें।" },
            { name: "Transfer the drained chenna to a clean surface. Knead it vigorously for 8-10 minutes using the heel of your palm until it becomes completely smooth, soft, and crack-free. This is the most critical step — if chenna is grainy, rasgullas will be hard.", hindi: "छने हुए छेना को साफ सतह पर रखें। हथेली की एड़ी से 8-10 मिनट तक जोर से मसलें। यह सबसे महत्वपूर्ण कदम है — दानेदार छेना = कड़े रसगुल्ले।" },
            { name: "Divide the smooth chenna into 12-15 equal portions. Roll each portion between your palms into perfectly smooth, crack-free balls. They should be slightly smaller than a golf ball as they will expand to double their size while cooking.", hindi: "चिकने छेना को 12-15 बराबर भागों में बांटें। हर भाग को हथेलियों के बीच बिल्कुल चिकनी, बिना दरार गोलियां बनाएं। गोल्फ बॉल से छोटी रखें क्योंकि पकाते समय दोगुनी हो जाएंगी।" },
            { name: "Prepare the sugar syrup: Dissolve 2 cups sugar in 4 cups water in a wide, deep pot. Add crushed cardamom pods. Bring to a vigorous rolling boil. The pot must be wide enough for rasgullas to float freely.", hindi: "चाशनी बनाएं: 4 कप पानी में 2 कप चीनी घोलें। कुटी इलायची डालें। तेज उबाल लाएं। बर्तन इतना चौड़ा हो कि रसगुल्ले आराम से तैर सकें।" },
            { name: "Gently drop the chenna balls into the rapidly boiling syrup one by one. Cover with a lid and cook on medium-high heat for 15 minutes. Do NOT open the lid during this time. The rasgullas will puff up and double in size.", hindi: "छेना की गोलियां एक-एक कर तेज उबलती चाशनी में धीरे से डालें। ढक्कन लगाएं और मध्यम-तेज आंच पर 15 मिनट पकाएं। इस दौरान ढक्कन न खोलें। रसगुल्ले फूल कर दोगुने हो जाएंगे।" },
            { name: "After 15 minutes, open the lid. The rasgullas should be spongy and doubled in size. The syrup will be thinner than it started — this is correct. Add rose water if using. Let the rasgullas cool down in the syrup.", hindi: "15 मिनट बाद ढक्कन खोलें। रसगुल्ले स्पंजी और दोगुने होने चाहिए। चाशनी पतली हो जाएगी — यह सही है। गुलाब जल डालें। रसगुल्लों को चाशनी में ठंडा होने दें।" },
            { name: "Once cooled to room temperature, refrigerate for at least 3-4 hours or overnight. Rasgullas taste best when chilled and fully soaked in syrup. Serve cold in their syrup, garnished with a few saffron strands or chopped pistachios.", hindi: "कमरे के तापमान पर ठंडा होने के बाद कम से कम 3-4 घंटे या रात भर फ्रिज करें। चाशनी में पूरी तरह भीगे ठंडे रसगुल्ले सबसे स्वादिष्ट लगते हैं। ठंडे परोसें, केसर या पिस्ता से सजाएं।" }
        ],
        chefTips: [
            { text: "Knead the chenna for at least 8-10 minutes until silky smooth — this is the #1 secret to spongy rasgullas. Grainy chenna will give hard, dense balls.", hindi: "छेना को कम से कम 8-10 मिनट तक रेशमी चिकना होने तक मसलें — यह स्पंजी रसगुल्लों का #1 राज है।" },
            { text: "Always use full-fat milk. Low-fat or toned milk gives very less chenna yield and poor texture.", hindi: "हमेशा फुल-फैट दूध इस्तेमाल करें। कम वसा वाला दूध कम छेना और खराब बनावट देता है।" },
            { text: "Never open the lid while the rasgullas are cooking. The steam pressure is what makes them puff up and become spongy.", hindi: "पकाते समय कभी ढक्कन न खोलें। भाप का दबाव ही रसगुल्लों को फुलाता और स्पंजी बनाता है।" }
        ],
        descriptionPrefix: "Soft, spongy white chenna balls cooked in light sugar syrup — Bengal's iconic and most beloved sweet."
    },
    "jalebi": {
        baseIngredients: [
            { name: "All-purpose flour (Maida)", nameHindi: "मैदा", amount: "1", unit: "cup" },
            { name: "Yogurt (Curd)", nameHindi: "दही", amount: "2", unit: "tbsp" },
            { name: "Baking soda", nameHindi: "बेकिंग सोडा", amount: "1/4", unit: "tsp" },
            { name: "Sugar (for syrup)", nameHindi: "चीनी (चाशनी के लिए)", amount: "1.5", unit: "cups" },
            { name: "Water", nameHindi: "पानी", amount: "3/4", unit: "cup" },
            { name: "Saffron strands", nameHindi: "केसर", amount: "a pinch", unit: "" },
            { name: "Green cardamom powder", nameHindi: "इलायची पाउडर", amount: "1/4", unit: "tsp" },
            { name: "Ghee or Oil (for deep frying)", nameHindi: "घी या तेल (तलने के लिए)", amount: "for frying", unit: "" }
        ],
        techniques: [
            { name: "Make the batter: Mix maida, yogurt, baking soda, and enough warm water to form a smooth, flowing batter (like pancake batter). Cover and let it ferment in a warm place for 8-12 hours or overnight.", hindi: "घोल बनाएं: मैदा, दही, बेकिंग सोडा और गुनगुना पानी मिलाकर चिकना बहने वाला घोल बनाएं। ढककर 8-12 घंटे या रात भर गर्म जगह पर रखें।" },
            { name: "Make sugar syrup: Combine sugar and water in a pot. Bring to a boil, stirring until sugar dissolves. Add saffron and cardamom. Simmer for 5-7 minutes until it reaches one-string consistency. Keep warm.", hindi: "चाशनी बनाएं: चीनी और पानी मिलाकर उबालें। केसर और इलायची डालें। 5-7 मिनट एक तार की चाशनी बनने तक पकाएं। गर्म रखें।" },
            { name: "After fermentation, the batter should be bubbly. Mix gently — do not deflate it. Pour batter into a squeeze bottle or a cloth piping bag with a small nozzle.", hindi: "किण्वन के बाद घोल में बुलबुले आने चाहिए। धीरे से मिलाएं। घोल को निचोड़ने वाली बोतल या कपड़े की थैली में भरें।" },
            { name: "Heat ghee or oil in a wide, deep kadhai on medium heat (around 170°C/340°F). The oil should NOT be too hot — jalebis need medium heat to cook evenly.", hindi: "चौड़ी गहरी कढ़ाई में घी/तेल मध्यम आंच (लगभग 170°C) पर गरम करें। तेल बहुत गर्म नहीं होना चाहिए।" },
            { name: "Squeeze the batter into the hot oil in circular spiral shapes (like a pretzel or coil). Make 3-4 at a time. Fry until the underside turns golden (about 2 minutes), then flip and fry the other side.", hindi: "गर्म तेल में घोल गोलाकार सर्पिल आकार में निचोड़ें। एक बार में 3-4 बनाएं। नीचे सुनहरा होने तक (2 मिनट) तलें, फिर पलटकर दूसरी तरफ तलें।" },
            { name: "Fry until both sides are evenly golden and crispy (about 3-4 minutes total). Remove with a slotted spoon and drain excess oil for a few seconds.", hindi: "दोनों तरफ सुनहरा और कुरकुरा होने तक तलें (कुल 3-4 मिनट)। झारे से निकालें और कुछ सेकंड तेल टपकने दें।" },
            { name: "Immediately dip the hot jalebis into the warm sugar syrup. Let them soak for 30-60 seconds — just enough to absorb syrup while staying crispy.", hindi: "गर्म जलेबियां तुरंत गर्म चाशनी में डुबोएं। 30-60 सेकंड भिगोएं — कुरकुरी रहते हुए चाशनी सोखने के लिए काफी है।" },
            { name: "Remove jalebis from syrup and serve immediately while hot and crispy. Jalebis are best enjoyed fresh — they lose crispiness as they cool.", hindi: "चाशनी से जलेबियां निकालकर तुरंत गर्म और कुरकुरा परोसें। जलेबियां ताजी सबसे अच्छी लगती हैं।" }
        ],
        chefTips: [
            { text: "Fermenting the batter overnight is the secret to crispy, perfectly textured jalebis. Do not skip this step.", hindi: "रात भर किण्वन कुरकुरी, सही बनावट वाली जलेबियों का राज है। यह कदम न छोड़ें।" },
            { text: "Keep the syrup warm and the oil at medium heat. Hot oil + cold syrup = soggy jalebis.", hindi: "चाशनी गर्म और तेल मध्यम रखें। गर्म तेल + ठंडी चाशनी = नरम जलेबियां।" },
            { text: "Soak jalebis in syrup for only 30-60 seconds. Over-soaking makes them soft instead of crispy.", hindi: "जलेबियों को सिर्फ 30-60 सेकंड भिगोएं। ज्यादा भिगोने से कुरकुरी की जगह नरम हो जाती हैं।" }
        ],
        descriptionPrefix: "Crispy, golden spiral-shaped deep-fried treats soaked in saffron-cardamom sugar syrup — one of India's most iconic street sweets."
    },
    "barfi": {
        baseIngredients: [
            { name: "Khoya / Mawa (dried milk solids)", nameHindi: "खोया / मावा", amount: "250", unit: "g" },
            { name: "Powdered sugar", nameHindi: "पिसी चीनी", amount: "3/4", unit: "cup" },
            { name: "Ghee", nameHindi: "घी", amount: "1", unit: "tbsp" },
            { name: "Green cardamom powder", nameHindi: "हरी इलायची पाउडर", amount: "1/2", unit: "tsp" },
            { name: "Chopped pistachios and almonds", nameHindi: "कटे पिस्ता और बादाम", amount: "2", unit: "tbsp" },
            { name: "Silver leaf (Vark) for decoration", nameHindi: "चांदी का वर्क (सजावट)", amount: "optional", unit: "" }
        ],
        techniques: [
            { name: "Grate the khoya/mawa finely. If it has any lumps, crumble them completely by hand or grater.", hindi: "खोया/मावा बारीक कद्दूकस करें। गांठें हों तो हाथ से पूरी तरह तोड़ें।" },
            { name: "Heat ghee in a heavy-bottomed non-stick pan on low heat. Add the grated khoya and stir continuously.", hindi: "भारी तले वाले नॉन-स्टिक पैन में धीमी आंच पर घी गरम करें। कसा खोया डालें और लगातार चलाएं।" },
            { name: "Cook the khoya on low heat for 8-10 minutes, stirring constantly to prevent it from sticking or burning. It will become soft and start leaving the sides of the pan.", hindi: "खोया को 8-10 मिनट धीमी आंच पर लगातार चलाते हुए पकाएं। यह नरम होगा और पैन के किनारे छोड़ने लगेगा।" },
            { name: "Add powdered sugar and mix well. The mixture will become slightly loose again — keep stirring on low heat.", hindi: "पिसी चीनी डालें और अच्छी तरह मिलाएं। मिश्रण थोड़ा पतला होगा — धीमी आंच पर चलाते रहें।" },
            { name: "Continue cooking until the mixture thickens again and starts coming together as a mass, leaving the sides of the pan cleanly (about 5-7 minutes).", hindi: "जब तक मिश्रण फिर गाढ़ा न हो जाए और पैन के किनारे साफ छोड़ने लगे तब तक पकाएं (लगभग 5-7 मिनट)।" },
            { name: "Add cardamom powder and most of the chopped nuts. Mix well and turn off the heat.", hindi: "इलायची पाउडर और अधिकांश कटे मेवे डालें। अच्छी तरह मिलाएं और आंच बंद करें।" },
            { name: "Grease a plate or tray with ghee. Pour the hot mixture onto it and spread evenly to about 1/2 inch thickness using a flat spatula.", hindi: "एक थाली या ट्रे में घी लगाएं। गर्म मिश्रण डालें और चपटे स्पैचुला से लगभग 1/2 इंच मोटाई में समान फैलाएं।" },
            { name: "Garnish with remaining nuts and silver leaf. Let it cool and set for 1-2 hours. Cut into diamond or square shapes with a sharp knife. Store in an airtight container.", hindi: "बचे मेवे और चांदी के वर्क से सजाएं। 1-2 घंटे ठंडा होकर सेट होने दें। तेज चाकू से हीरे या चौकोर आकार में काटें।" }
        ],
        chefTips: [
            { text: "Always cook on low heat and stir constantly. Khoya burns very quickly on high heat.", hindi: "हमेशा धीमी आंच पर पकाएं और लगातार चलाएं। तेज आंच पर खोया जल्दी जलता है।" },
            { text: "Use fresh khoya/mawa for the best taste and texture. Stale khoya gives a sour taste.", hindi: "सबसे अच्छे स्वाद और बनावट के लिए ताजा खोया इस्तेमाल करें। बासी खोया खट्टा स्वाद देता है।" },
            { text: "Cut the barfi while it is still slightly warm — fully cooled barfi tends to crumble.", hindi: "जब बर्फी थोड़ी गर्म हो तभी काटें — पूरी ठंडी बर्फी टूटती है।" }
        ],
        descriptionPrefix: "Rich, fudge-like Indian sweet made from khoya (dried milk solids) with cardamom and nuts — a festive favorite."
    },
    "kheer": {
        baseIngredients: [
            { name: "Full-fat Milk", nameHindi: "फुल-फैट दूध", amount: "1", unit: "liter" },
            { name: "Basmati Rice", nameHindi: "बासमती चावल", amount: "1/4", unit: "cup" },
            { name: "Sugar", nameHindi: "चीनी", amount: "1/2", unit: "cup" },
            { name: "Green cardamom powder", nameHindi: "हरी इलायची पाउडर", amount: "1/2", unit: "tsp" },
            { name: "Saffron strands", nameHindi: "केसर", amount: "a generous pinch", unit: "" },
            { name: "Chopped almonds, cashews, and pistachios", nameHindi: "कटे बादाम, काजू, पिस्ता", amount: "2", unit: "tbsp" },
            { name: "Raisins", nameHindi: "किशमिश", amount: "1", unit: "tbsp" }
        ],
        techniques: [
            { name: "Wash and soak basmati rice in water for 30 minutes. Drain and set aside.", hindi: "बासमती चावल धोकर 30 मिनट पानी में भिगोएं। छानकर अलग रखें।" },
            { name: "Pour 1 liter full-fat milk into a heavy-bottomed pan. Bring to a boil on medium-high heat, stirring frequently to prevent it from sticking to the bottom.", hindi: "1 लीटर फुल-फैट दूध भारी तले वाले बर्तन में डालें। मध्यम-तेज आंच पर बार-बार चलाते हुए उबालें।" },
            { name: "Once the milk starts boiling, add the soaked and drained rice. Reduce heat to low-medium and simmer.", hindi: "दूध उबलने लगे तो भिगोए और छाने हुए चावल डालें। आंच धीमी-मध्यम करें।" },
            { name: "Cook on low heat for 35-40 minutes, stirring every 3-4 minutes and scraping the sides of the pan. The milk will reduce and rice will become very soft and creamy.", hindi: "धीमी आंच पर 35-40 मिनट पकाएं, हर 3-4 मिनट पर चलाएं और किनारे खुरचें। दूध गाढ़ा होगा और चावल बहुत नरम।" },
            { name: "When the milk has reduced to about half and the rice grains are soft and broken, add sugar. Stir well and cook for 5 more minutes.", hindi: "जब दूध लगभग आधा रह जाए और चावल नरम और टूटे हों, चीनी डालें। 5 मिनट और पकाएं।" },
            { name: "Soak saffron in 1 tbsp warm milk. Add the saffron milk, cardamom powder, and most of the chopped nuts to the kheer. Mix gently.", hindi: "केसर 1 बड़े चम्मच गर्म दूध में भिगोएं। केसर वाला दूध, इलायची, और अधिकांश कटे मेवे खीर में डालें।" },
            { name: "Cook for 2-3 more minutes on low heat. Turn off the heat. The kheer will thicken further as it cools.", hindi: "2-3 मिनट और धीमी आंच पर पकाएं। आंच बंद करें। ठंडी होने पर खीर और गाढ़ी होगी।" },
            { name: "Serve warm or chilled. Garnish with remaining nuts, raisins, and saffron strands. Kheer tastes best after being refrigerated for a few hours.", hindi: "गर्म या ठंडी परोसें। बचे मेवे, किशमिश, और केसर से सजाएं। कुछ घंटे फ्रिज में रखने पर खीर सबसे स्वादिष्ट लगती है।" }
        ],
        chefTips: [
            { text: "Use full-fat milk and stir frequently. The constant stirring and milk-fat is what gives kheer its rich, creamy texture.", hindi: "फुल-फैट दूध इस्तेमाल करें और बार-बार चलाएं। लगातार चलाना और दूध की वसा ही खीर को गाढ़ा क्रीमी बनाते हैं।" },
            { text: "Add sugar only after the rice is fully cooked. Adding sugar early can make rice take longer to soften.", hindi: "चीनी तभी डालें जब चावल पूरी तरह पक जाएं। जल्दी चीनी डालने से चावल देर से नरम होते हैं।" },
            { text: "Kheer thickens as it cools, so keep it slightly thinner than desired consistency while cooking.", hindi: "खीर ठंडी होने पर गाढ़ी होती है, इसलिए पकाते समय चाही गाढ़ाई से थोड़ी पतली रखें।" }
        ],
        descriptionPrefix: "A creamy, slow-cooked Indian rice pudding infused with saffron, cardamom, and nuts — the king of Indian desserts."
    }
};



const DEFAULT_PROFILE: CulinaryProfile = {
    baseIngredients: [
        { name: "Primary ingredient (as needed)", nameHindi: "मुख्य सामग्री", amount: "as needed", unit: "" },
        { name: "Cooking Fat (Butter/Oil/Ghee)", nameHindi: "मक्खन/तेल/घी", amount: "2", unit: "tbsp" },
        { name: "Onion", nameHindi: "प्याज", amount: "1", unit: "medium" },
        { name: "Garlic and Ginger", nameHindi: "लहसुन और अदरक", amount: "1", unit: "tbsp" },
        { name: "Salt, Pepper & Spices", nameHindi: "नमक, काली मिर्च और मसाले", amount: "to taste", unit: "" },
        { name: "Base Liquid (Broth/Water/Coconut milk)", nameHindi: "शोरबा/पानी/नारियल दूध", amount: "1", unit: "cup" }
    ],
    techniques: [
        { name: "Prep all ingredients: wash, peel, chop, and measure everything.", hindi: "सभी सामग्री तैयार करें: धोएं, छीलें, काटें और मापें।" },
        { name: "Heat oil/ghee in a pan and sauté aromatics (onion, garlic, ginger) until golden.", hindi: "पैन में तेल/घी गर्म करें और प्याज, लहसुन, अदरक को सुनहरा होने तक भूनें।" },
        { name: "Add spices and cook briefly until fragrant (30-60 seconds).", hindi: "मसाले डालें और खुशबू आने तक (30-60 सेकंड) पकाएं।" },
        { name: "Add the main ingredients and liquid, stir to combine.", hindi: "मुख्य सामग्री और तरल डालें, मिलाने के लिए चलाएं।" },
        { name: "Cook on medium-low heat until fully done, stirring occasionally.", hindi: "पूरी तरह पकने तक मध्यम-धीमी आंच पर पकाएं, बीच-बीच में चलाते रहें।" },
        { name: "Taste, adjust seasoning, and garnish before serving.", hindi: "स्वाद चखें, सीजनिंग ठीक करें और परोसने से पहले गार्निश करें।" }
    ],
    chefTips: [
        { text: "Season in layers throughout cooking for a deeper flavor profile.", hindi: "गहरे स्वाद के लिए पकाने के दौरान परतों में सीजन करें।" },
        { text: "Always taste before serving and adjust salt/acid/spice.", hindi: "परोसने से पहले हमेशा चखें और नमक/एसिड/मसाला ठीक करें।" }
    ],
    descriptionPrefix: "A carefully crafted dish with balanced flavors and aromatic seasonings."
};

// ── Dynamic dish-aware recipe generation ──────────────────────────────
// This analyses the dish name to infer cuisine, cooking method, main
// ingredient, and flavour profile, then builds a UNIQUE recipe.

type CuisineHint = { fat: string; fatHindi: string; spices: string; spicesHindi: string; side: string; sideHindi: string; garnish: string; garnishHindi: string };

const CUISINE_HINTS: Record<string, CuisineHint> = {
    indian: { fat: "Ghee", fatHindi: "घी", spices: "Garam masala, turmeric, cumin, coriander powder", spicesHindi: "गरम मसाला, हल्दी, जीरा, धनिया पाउडर", side: "steamed rice or roti", sideHindi: "चावल या रोटी", garnish: "Fresh coriander and a squeeze of lemon", garnishHindi: "ताजा धनिया और नींबू" },
    italian: { fat: "Extra virgin olive oil", fatHindi: "जैतून का तेल", spices: "Dried oregano, basil, red pepper flakes", spicesHindi: "ओरेगैनो, तुलसी, लाल मिर्च", side: "garlic bread or pasta", sideHindi: "गार्लिक ब्रेड या पास्ता", garnish: "Fresh basil and grated Parmesan", garnishHindi: "ताजी तुलसी और परमेसन" },
    chinese: { fat: "Sesame oil and vegetable oil", fatHindi: "तिल और वेजिटेबल ऑयल", spices: "Soy sauce, five-spice, white pepper, ginger", spicesHindi: "सोया सॉस, फाइव-स्पाइस, सफेद मिर्च, अदरक", side: "steamed jasmine rice", sideHindi: "जैस्मिन चावल", garnish: "Spring onions and toasted sesame seeds", garnishHindi: "हरे प्याज और भुने तिल" },
    mexican: { fat: "Vegetable oil or lard", fatHindi: "तेल", spices: "Cumin, chili powder, smoked paprika, oregano", spicesHindi: "जीरा, मिर्च पाउडर, स्मोक्ड पपरिका", side: "tortillas or Mexican rice", sideHindi: "टॉर्टिया या मेक्सिकन राइस", garnish: "Lime wedges, cilantro, and sour cream", garnishHindi: "नींबू, धनिया, और खट्टी क्रीम" },
    thai: { fat: "Coconut oil", fatHindi: "नारियल तेल", spices: "Lemongrass, fish sauce, Thai basil, chili", spicesHindi: "लेमनग्रास, फ़िश सॉस, थाई तुलसी, मिर्च", side: "sticky rice or jasmine rice", sideHindi: "स्टिकी राइस या जैस्मिन चावल", garnish: "Thai basil, crushed peanuts, and lime", garnishHindi: "थाई तुलसी, मूंगफली, और नींबू" },
    japanese: { fat: "Neutral oil and mirin", fatHindi: "तेल और मिरीन", spices: "Soy sauce, miso, dashi, sake", spicesHindi: "सोया सॉस, मिसो, दशी", side: "steamed short-grain rice", sideHindi: "स्टीम्ड शॉर्ट-ग्रेन चावल", garnish: "Nori strips and pickled ginger", garnishHindi: "नोरी और अचार अदरक" },
    global: { fat: "Butter or olive oil", fatHindi: "मक्खन या जैतून तेल", spices: "Salt, pepper, paprika, garlic powder", spicesHindi: "नमक, काली मिर्च, पपरिका, लहसुन पाउडर", side: "bread or salad", sideHindi: "ब्रेड या सलाद", garnish: "Fresh herbs and a squeeze of lemon", garnishHindi: "ताजी जड़ी-बूटियां और नींबू" },
};

function inferCuisineFromName(name: string): string {
    const n = name.toLowerCase();
    if (/(tikka|masala|paneer|dal|biryani|roti|naan|korma|vindaloo|samosa|chaat|kulfi|paratha|dosa|idli|upma|sambar|rasam|chole|rajma|aloo|gobi|palak|bhaji|pakora|puri|chapati|kheer|gulab|halwa|ladoo|jalebi|pav bhaji|butter chicken|tandoori|dhokla|kofta|keema|pulao|rasmalai|rasgulla|barfi|peda|modak|sandesh|malpua|rabri|basundi)/.test(n)) return "indian";
    if (/(pasta|pizza|risotto|carbonara|lasagna|bruschetta|tiramisu|gnocchi|focaccia|pesto|bolognese|ravioli|minestrone|caprese|prosciutto|arancini|panna cotta|osso buco|calzone)/.test(n)) return "italian";
    if (/(kung pao|lo mein|chow mein|fried rice|dim sum|wonton|spring roll|mapo tofu|peking|szechuan|hoisin|char siu|congee|bao|dumpling|hot pot|stir fry|chop suey|sweet and sour|orange chicken|general tso)/.test(n)) return "chinese";
    if (/(taco|burrito|enchilada|quesadilla|salsa|guacamole|churro|tamale|pozole|fajita|nacho|mole|tostada|elote|ceviche|chimichanga)/.test(n)) return "mexican";
    if (/(pad thai|tom yum|green curry|red curry|som tam|satay|massaman|panang|larb|khao pad|mango sticky|tom kha|pad see ew|thai basil)/.test(n)) return "thai";
    if (/(sushi|ramen|udon|soba|tempura|teriyaki|miso|gyoza|katsu|onigiri|okonomiyaki|takoyaki|edamame|tonkatsu|yakitori|donburi|matcha|mochi)/.test(n)) return "japanese";
    if (/(apple pie|pumpkin pie|pecan pie|brownie|cookie|cheesecake|pancake|waffle|muffin|donut|s'more|cobbler)/.test(n)) return "american";
    return "global";
}

type MethodHint = { verb: string; temp: string; time: string };

function inferMethod(name: string): MethodHint {
    const n = name.toLowerCase();
    if (/(bake|cake|bread|muffin|cookie|brownie|pie|tart|focaccia|scone)/.test(n)) return { verb: "Bake", temp: "180°C / 350°F", time: "25-35 min" };
    if (/(grill|grilled|bbq|barbecue|tandoori|kebab|tikka|satay|yakitori)/.test(n)) return { verb: "Grill", temp: "high heat", time: "8-12 min" };
    if (/(fry|fried|pakora|tempura|fritter|crispy|crunchy)/.test(n)) return { verb: "Deep fry", temp: "180°C / 350°F oil", time: "3-5 min per batch" };
    if (/(stir fry|stir-fry|pad thai|lo mein|chow mein|wok)/.test(n)) return { verb: "Stir-fry", temp: "highest heat", time: "3-5 min" };
    if (/(soup|broth|stew|chowder|bisque|congee|porridge)/.test(n)) return { verb: "Simmer", temp: "low heat", time: "30-45 min" };
    if (/(steam|steamed|momo|dim sum|idli|dhokla)/.test(n)) return { verb: "Steam", temp: "boiling water", time: "15-20 min" };
    if (/(roast|roasted)/.test(n)) return { verb: "Roast", temp: "200°C / 400°F", time: "30-45 min" };
    if (/(slow cook|braised|braise)/.test(n)) return { verb: "Braise", temp: "low heat", time: "2-3 hours" };
    return { verb: "Cook", temp: "medium heat", time: "20-30 min" };
}

function inferMainIngredient(name: string): { name: string; hindi: string; amount: string; unit: string } {
    const n = name.toLowerCase();
    if (/(chicken|murgh)/.test(n)) return { name: "Chicken", hindi: "चिकन", amount: "500", unit: "g" };
    if (/(mutton|lamb|gosht)/.test(n)) return { name: "Mutton/Lamb", hindi: "मटन", amount: "500", unit: "g" };
    if (/(fish|salmon|tuna|prawn|shrimp|seafood|mach)/.test(n)) return { name: "Fish/Seafood", hindi: "मछली/सीफूड", amount: "400", unit: "g" };
    if (/(egg|omelette|omelet|frittata|anda)/.test(n)) return { name: "Eggs", hindi: "अंडे", amount: "4", unit: "large" };
    if (/(paneer|cottage cheese)/.test(n)) return { name: "Paneer (Cottage Cheese)", hindi: "पनीर", amount: "250", unit: "g" };
    if (/(tofu)/.test(n)) return { name: "Firm Tofu", hindi: "टोफू", amount: "300", unit: "g" };
    if (/(potato|aloo)/.test(n)) return { name: "Potatoes", hindi: "आलू", amount: "4", unit: "medium" };
    if (/(cauliflower|gobi)/.test(n)) return { name: "Cauliflower", hindi: "फूलगोभी", amount: "1", unit: "medium head" };
    if (/(spinach|palak|saag)/.test(n)) return { name: "Fresh Spinach", hindi: "पालक", amount: "300", unit: "g" };
    if (/(mushroom)/.test(n)) return { name: "Mixed Mushrooms", hindi: "मशरूम", amount: "300", unit: "g" };
    if (/(beef|steak)/.test(n)) return { name: "Beef", hindi: "बीफ", amount: "500", unit: "g" };
    if (/(pork|bacon)/.test(n)) return { name: "Pork", hindi: "पोर्क", amount: "500", unit: "g" };
    if (/(lentil|dal|dhal)/.test(n)) return { name: "Lentils (mixed)", hindi: "दाल", amount: "1", unit: "cup" };
    if (/(bean|chickpea|chole|rajma|kidney)/.test(n)) return { name: "Beans/Legumes", hindi: "फलियां", amount: "1.5", unit: "cups" };
    if (/(rice|pulao|pilaf|biryani|khichdi|risotto|fried rice)/.test(n)) return { name: "Basmati/Long grain Rice", hindi: "चावल", amount: "2", unit: "cups" };
    if (/(pasta|spaghetti|penne|macaroni|noodle|lasagna|ravioli)/.test(n)) return { name: "Pasta/Noodles", hindi: "पास्ता/नूडल्स", amount: "300", unit: "g" };
    if (/(bread|toast|sandwich|bruschetta|focaccia)/.test(n)) return { name: "Fresh Bread", hindi: "ब्रेड", amount: "4", unit: "slices" };
    if (/(cake|muffin|brownie|cookie|pie)/.test(n)) return { name: "All-purpose Flour", hindi: "मैदा", amount: "2", unit: "cups" };
    if (/(chocolate|choco)/.test(n)) return { name: "Dark Chocolate", hindi: "डार्क चॉकलेट", amount: "200", unit: "g" };
    // Default: use the dish name itself as the primary ingredient
    const capitalized = name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    return { name: capitalized, hindi: capitalized, amount: "400", unit: "g" };
}

function inferSweetIngredients(name: string) {
    const n = name.toLowerCase();

    // Indian Sweets
    if (/(ladoo|laddu|laddoo|besan)/.test(n)) {
        return {
            main: { name: "Gram Flour (Besan) or Semolina", nameHindi: "बेसन या सूजी", amount: "2", unit: "cups" },
            sweetener: { name: "Powdered Sugar or Jaggery", nameHindi: "पिसी चीनी या गुड़", amount: "1", unit: "cup" },
            fat: { name: "Ghee (Clarified Butter)", nameHindi: "देसी घी", amount: "3/4", unit: "cup" },
            liquid: { name: "Milk (optional, for binding)", nameHindi: "दूध (बांधने के लिए)", amount: "2", unit: "tbsp" },
            extras: [
                { name: "Cardamom powder", nameHindi: "इलायची पाउडर", amount: "1", unit: "tsp" },
                { name: "Chopped nuts (almonds, cashews)", nameHindi: "कटे मेवे (बादाम, काजू)", amount: "1/4", unit: "cup" }
            ],
            flavoring: "cardamom powder and roasted nuts", flavoringHindi: "इलायची पाउडर और भुने मेवे",
            prepStep: "Sieve the main flour to ensure there are no lumps.", prepStepHindi: "गांठों से बचने के लिए आटे को छान लें।",
            cookStep1: "Heat ghee in a heavy-bottomed pan or kadhai on a low flame.", cookStep1Hindi: "एक भारी तले वाली कढ़ाई में धीमी आंच पर घी गरम करें।",
            cookStep2: "Add the flour and roast continuously on low heat. Stir constantly to prevent burning.", cookStep2Hindi: "आटा डालें और धीमी आंच पर लगातार भूनें। जलने से बचाने के लिए लगातार चलाते रहें।",
            cookStep3: "Roast until it turns aromatic and golden brown (about 12-15 minutes). Turn off the heat.", cookStep3Hindi: "खुशबूदार और सुनहरा भूरा होने तक भूनें (लगभग 12-15 मिनट)। आंच बंद कर दें।",
            cookStep4: "Transfer the mixture to a wide plate and let it cool slightly (it should still be warm to touch).", cookStep4Hindi: "मिश्रण को बड़ी थाली में निकालें और थोड़ा ठंडा होने दें (छूने लायक गर्म होना चाहिए)।",
            cookStep5: "Add the powdered sugar. Do NOT add sugar while it is very hot or it will melt and ruin the texture.", cookStep5Hindi: "पिसी चीनी डालें। बहुत गर्म रहते हुए चीनी न डालें वरना पिघल कर बनावट खराब हो जाएगी।",
            finishStep: "Take small portions of the warm mixture and firmly press between your palms to shape into round balls.", finishStepHindi: "गर्म मिश्रण का थोड़ा हिस्सा लें और हथेलियों के बीच दबाकर गोल आकार दें।",
            tip1: "The secret to perfect ladoos is roasting the flour on low heat patiently until you get a nutty aroma.", tip1Hindi: "परफेक्ट लड्डू का रहस्य धीमी आंच पर धैर्यपूर्वक भूनना है जब तक सोंधी महक न आ जाए।"
        };
    }
    if (/(halwa|halva|sheera)/.test(n)) {
        return {
            main: { name: "Semolina (Sooji) or Grated Carrots", nameHindi: "सूजी या कद्दूकस गाजर", amount: "1", unit: "cup/kg" },
            sweetener: { name: "Sugar", nameHindi: "चीनी", amount: "1", unit: "cup" },
            fat: { name: "Ghee", nameHindi: "घी", amount: "1/2", unit: "cup" },
            liquid: { name: "Water or Milk", nameHindi: "पानी या दूध", amount: "2.5", unit: "cups" },
            extras: [
                { name: "Cardamom powder", nameHindi: "इलायची पाउडर", amount: "1/2", unit: "tsp" },
                { name: "Mixed nuts and raisins", nameHindi: "मिले-जुले मेवे और किशमिश", amount: "1/4", unit: "cup" }
            ],
            flavoring: "cardamom and ghee-roasted nuts", flavoringHindi: "इलायची और घी में भुने मेवे",
            prepStep: "Keep water or milk warm in a separate vessel.", prepStepHindi: "पानी या दूध को अलग बर्तन में गर्म रखें।",
            cookStep1: "Heat half the ghee in a pan and lightly fry the nuts and raisins. Remove and set aside.", cookStep1Hindi: "पैन में आधा घी गरम करें और मेवे हल्के भून कर निकाल लें।",
            cookStep2: "In the same pan, add the main ingredient and roast on medium-low heat until fragrant.", cookStep2Hindi: "उसी पैन में मुख्य सामग्री डालें और मध्यम-धीमी आंच पर भूनें।",
            cookStep3: "Carefully pour the warm liquid over the roasted mixture (it will splutter). Stir continuously.", cookStep3Hindi: "गर्म तरल धीरे से भुने मिश्रण पर डालें (यह छिटकेगा)। लगातार चलाएं।",
            cookStep4: "Cook until the liquid is absorbed and the mixture thickens.", cookStep4Hindi: "तरल सोखने और मिश्रण गाढ़ा होने तक पकाएं।",
            cookStep5: "Add sugar and remaining ghee. The halwa will loosen up again.", cookStep5Hindi: "चीनी और बचा हुआ घी डालें। हलवा फिर से गीला हो जाएगा।",
            finishStep: "Cook until it leaves the sides of the pan. Garnish with fried nuts and serve hot.", finishStepHindi: "पैन के किनारे छोड़ने तक पकाएं। तले मेवों से सजाकर गरम परोसें।",
            tip1: "Using milk instead of water makes the halwa richer and creamier.", tip1Hindi: "पानी की जगह दूध का उपयोग हलवे को अधिक क्रीमी और स्वादिष्ट बनाता है।"
        };
    }
    if (/(kheer|payasam|phirni)/.test(n)) {
        return {
            main: { name: "Basmati Rice or Vermicelli", nameHindi: "बासमती चावल या सेवई", amount: "1/4", unit: "cup" },
            sweetener: { name: "Sugar or Condensed Milk", nameHindi: "चीनी या कंडेंस्ड मिल्क", amount: "1/2", unit: "cup" },
            fat: { name: "Ghee (for roasting)", nameHindi: "घी (भूनने के लिए)", amount: "1", unit: "tbsp" },
            liquid: { name: "Full-fat Milk", nameHindi: "फुल-फैट दूध", amount: "1", unit: "liter" },
            extras: [
                { name: "Green cardamom powder", nameHindi: "हरी इलायची पाउडर", amount: "1/2", unit: "tsp" },
                { name: "Saffron strands (soaked in milk)", nameHindi: "केसर (दूध में भीगा)", amount: "a pinch", unit: "" }
            ],
            flavoring: "cardamom, saffron, and slivered almonds", flavoringHindi: "इलायची, केसर, और कटे बादाम",
            prepStep: "Wash and soak rice for 30 minutes, or keep vermicelli ready. Soak saffron in warm milk.", prepStepHindi: "चावल को 30 मिनट भिगोएं या सेवई तैयार रखें। केसर को गर्म दूध में भिगोएं।",
            cookStep1: "In a heavy-bottomed pot, bring the milk to a boil on medium heat.", cookStep1Hindi: "एक भारी तले वाले बर्तन में मध्यम आंच पर दूध उबालें।",
            cookStep2: "Reduce heat to low and add the rice/vermicelli to the boiling milk.", cookStep2Hindi: "आंच धीमी करें और उबलते दूध में चावल/सेवई डालें।",
            cookStep3: "Simmer uncovered, stirring frequently to prevent sticking to the bottom.", cookStep3Hindi: "बिना ढके धीमी आंच पर पकाएं, नीचे चिपकने से रोकने के लिए बीच-बीच में चलाते रहें।",
            cookStep4: "Cook until the milk reduces to a thick, creamy consistency and the rice is completely soft.", cookStep4Hindi: "दूध के गाढ़ा और क्रीमी होने तक और चावल के पूरी तरह नरम होने तक पकाएं।",
            cookStep5: "Add sugar, saffron milk, and cardamom. Mix well and cook for another 5 minutes.", cookStep5Hindi: "चीनी, केसर वाला दूध, और इलायची डालें। अच्छी तरह मिलाएं और 5 मिनट और पकाएं।",
            finishStep: "Remove from heat. Serve warm or chill in the refrigerator.", finishStepHindi: "आंच से उतार लें। गर्म या फ्रिज में ठंडा करके परोसें।",
            tip1: "Always use full-fat milk for kheer to get that authentic rich, creamy texture.", tip1Hindi: "असली क्रीमी स्वाद के लिए हमेशा फुल-फैट दूध का ही उपयोग करें।"
        };
    }

    // Rasmalai
    if (/(rasmalai|ras malai|rasomalai)/.test(n)) {
        return {
            main: { name: "Paneer / Chenna (freshly made from full-fat milk)", nameHindi: "पनीर / छेना (फुल-फैट दूध से ताजा बना)", amount: "1", unit: "liter milk" },
            sweetener: { name: "Sugar", nameHindi: "चीनी", amount: "1.5", unit: "cups" },
            fat: { name: "Ghee (for greasing)", nameHindi: "घी (ग्रीसिंग के लिए)", amount: "1", unit: "tsp" },
            liquid: { name: "Full-fat Milk (for rabri)", nameHindi: "फुल-फैट दूध (रबड़ी के लिए)", amount: "1", unit: "liter" },
            extras: [
                { name: "Green cardamom powder", nameHindi: "हरी इलायची पाउडर", amount: "1/2", unit: "tsp" },
                { name: "Saffron strands", nameHindi: "केसर", amount: "a pinch", unit: "" },
                { name: "Chopped pistachios and almonds", nameHindi: "कटे पिस्ता और बादाम", amount: "2", unit: "tbsp" }
            ],
            flavoring: "cardamom and saffron-infused milk", flavoringHindi: "इलायची और केसर युक्त दूध",
            prepStep: "Boil 1 liter milk, add lemon juice to curdle it. Strain through muslin to get fresh chenna. Knead chenna until smooth.", prepStepHindi: "1 लीटर दूध उबालें, नींबू का रस डालकर फाड़ें। मलमल के कपड़े से छानकर ताजा छेना बनाएं। छेना को चिकना होने तक मसलें।",
            cookStep1: "Make sugar syrup: boil 4 cups water with 1 cup sugar until sugar dissolves completely.", cookStep1Hindi: "चाशनी बनाएं: 4 कप पानी में 1 कप चीनी डालकर पूरी तरह घुलने तक उबालें।",
            cookStep2: "Divide kneaded chenna into small balls, flatten slightly into discs. Drop into boiling sugar syrup.", cookStep2Hindi: "मसले छेना को छोटी गोलियों में बांटें, हल्का चपटा करें। उबलती चाशनी में डालें।",
            cookStep3: "Cover and cook the chenna discs in the syrup for 10-12 minutes on medium heat. They will double in size.", cookStep3Hindi: "ढकें और मध्यम आंच पर चाशनी में 10-12 मिनट पकाएं। वे दोगुने हो जाएंगे।",
            cookStep4: "Meanwhile, boil 1 liter milk on low heat, stirring frequently, until it reduces to half (thick rabri).", cookStep4Hindi: "इस बीच, 1 लीटर दूध को धीमी आंच पर बार-बार चलाते हुए उबालें, जब तक आधा न हो जाए (गाढ़ी रबड़ी)।",
            cookStep5: "Add 1/2 cup sugar, saffron, and cardamom to the thickened milk. Mix well.", cookStep5Hindi: "गाढ़े दूध में 1/2 कप चीनी, केसर, और इलायची डालें। अच्छी तरह मिलाएं।",
            finishStep: "Gently squeeze excess syrup from chenna discs and soak in the saffron rabri for at least 2-3 hours (refrigerated overnight is best). Garnish with pistachios and serve chilled.", finishStepHindi: "छेना की गोलियों से अतिरिक्त चाशनी निचोड़ें और केसरी रबड़ी में कम से कम 2-3 घंटे भिगोएं (रात भर फ्रिज में रखना सबसे अच्छा)। पिस्ता से सजाकर ठंडा परोसें।",
            tip1: "Knead the chenna for at least 8-10 minutes until completely smooth — this is the secret to soft, melt-in-mouth rasmalai.", tip1Hindi: "छेना को कम से कम 8-10 मिनट तक पूरी तरह चिकना होने तक मसलें — यह नरम, मुंह में घुलने वाली रसमलाई का राज है।"
        };
    }

    // Rasgulla
    if (/(rasgulla|rosogolla|roshogolla)/.test(n)) {
        return {
            main: { name: "Full-fat Milk (for making chenna)", nameHindi: "फुल-फैट दूध (छेना बनाने के लिए)", amount: "1", unit: "liter" },
            sweetener: { name: "Sugar (for syrup)", nameHindi: "चीनी (चाशनी के लिए)", amount: "2", unit: "cups" },
            fat: { name: "Lemon juice or vinegar (to curdle milk)", nameHindi: "नींबू का रस या सिरका (दूध फाड़ने के लिए)", amount: "2", unit: "tbsp" },
            liquid: { name: "Water (for sugar syrup)", nameHindi: "पानी (चाशनी के लिए)", amount: "4", unit: "cups" },
            extras: [
                { name: "Green cardamom pods", nameHindi: "हरी इलायची", amount: "3-4", unit: "pods" },
                { name: "Rose water (optional)", nameHindi: "गुलाब जल (वैकल्पिक)", amount: "1", unit: "tsp" }
            ],
            flavoring: "cardamom and rose water", flavoringHindi: "इलायची और गुलाब जल",
            prepStep: "Boil 1 liter full-fat milk. Add lemon juice to curdle it. Strain through muslin cloth, rinse under cold water, and squeeze out all water. Hang for 30 minutes.", prepStepHindi: "1 लीटर फुल-फैट दूध उबालें। नींबू का रस डालकर फाड़ें। मलमल के कपड़े से छानें, ठंडे पानी से धोएं, सारा पानी निचोड़ें। 30 मिनट लटकाएं।",
            cookStep1: "Knead the drained chenna vigorously on a flat surface for 8-10 minutes until completely smooth, soft, and crack-free. This is the most critical step.", cookStep1Hindi: "छाने हुए छेना को समतल सतह पर 8-10 मिनट तक जोर से मसलें जब तक बिल्कुल चिकना, नरम, और बिना दरार न हो जाए। यह सबसे महत्वपूर्ण कदम है।",
            cookStep2: "Divide the smooth chenna into 12-15 equal portions and roll into perfectly smooth, crack-free balls (slightly smaller than a golf ball).", cookStep2Hindi: "चिकने छेना को 12-15 बराबर भागों में बांटें और बिल्कुल चिकनी, बिना दरार गोलियां बनाएं (गोल्फ बॉल से थोड़ी छोटी)।",
            cookStep3: "Make sugar syrup: dissolve 2 cups sugar in 4 cups water in a wide, deep pot. Add crushed cardamom. Bring to a vigorous rolling boil.", cookStep3Hindi: "चाशनी बनाएं: चौड़े गहरे बर्तन में 4 कप पानी में 2 कप चीनी घोलें। कुटी इलायची डालें। तेज उबाल लाएं।",
            cookStep4: "Gently drop chenna balls into the rapidly boiling syrup. Cover with a lid and cook on medium-high heat for exactly 15 minutes. Do NOT open the lid.", cookStep4Hindi: "छेना की गोलियां तेज उबलती चाशनी में धीरे से डालें। ढक्कन लगाएं और 15 मिनट पकाएं। ढक्कन न खोलें।",
            cookStep5: "After 15 minutes, open lid. Rasgullas should be spongy and doubled in size. The syrup will be thinner — this is correct. Add rose water.", cookStep5Hindi: "15 मिनट बाद ढक्कन खोलें। रसगुल्ले स्पंजी और दोगुने होने चाहिए। चाशनी पतली होगी — यह सही है। गुलाब जल डालें।",
            finishStep: "Let rasgullas cool in the syrup. Refrigerate for 3-4 hours or overnight. Serve chilled, soaked in their light sugar syrup.", finishStepHindi: "रसगुल्लों को चाशनी में ठंडा होने दें। 3-4 घंटे या रात भर फ्रिज करें। ठंडे चाशनी में डुबोकर परोसें।",
            tip1: "Never open the lid while cooking — the steam pressure is what makes rasgullas spongy and puffed up.", tip1Hindi: "पकाते समय कभी ढक्कन न खोलें — भाप का दबाव ही रसगुल्लों को स्पंजी और फुला हुआ बनाता है।"
        };
    }

    // Gulab Jamun
    if (/(gulab jamun|gulab)/.test(n)) {
        return {
            main: { name: "Khoya / Mawa (dried milk solids)", nameHindi: "खोया / मावा", amount: "200", unit: "g" },
            sweetener: { name: "Sugar (for syrup)", nameHindi: "चीनी (चाशनी के लिए)", amount: "2", unit: "cups" },
            fat: { name: "Ghee or Oil (for deep frying)", nameHindi: "घी या तेल (तलने के लिए)", amount: "for frying", unit: "" },
            liquid: { name: "Water (for sugar syrup)", nameHindi: "पानी (चाशनी के लिए)", amount: "2", unit: "cups" },
            extras: [
                { name: "All-purpose flour (maida)", nameHindi: "मैदा", amount: "2", unit: "tbsp" },
                { name: "Green cardamom powder", nameHindi: "हरी इलायची पाउडर", amount: "1/2", unit: "tsp" },
                { name: "Rose water", nameHindi: "गुलाब जल", amount: "1", unit: "tsp" }
            ],
            flavoring: "cardamom and rose water", flavoringHindi: "इलायची और गुलाब जल",
            prepStep: "Grate or crumble khoya finely. Make sugar syrup: boil water with sugar, cardamom, and rose water until sticky (one-string consistency).", prepStepHindi: "खोया को बारीक कद्दूकस करें। चाशनी बनाएं: पानी, चीनी, इलायची और गुलाब जल को एक तार की चाशनी तक उबालें।",
            cookStep1: "In a bowl, combine crumbled khoya with maida and a pinch of baking soda. Knead into a smooth, crack-free dough using a little milk if needed.", cookStep1Hindi: "एक कटोरे में खोया, मैदा और चुटकी बेकिंग सोडा मिलाएं। जरूरत हो तो थोड़ा दूध डालकर चिकना, बिना दरार वाला आटा गूंदें।",
            cookStep2: "Make small, smooth, crack-free balls (about 15-18) from the dough. Even a tiny crack will cause them to break while frying.", cookStep2Hindi: "आटे से छोटी, चिकनी, बिना दरार वाली गोलियां (लगभग 15-18) बनाएं। छोटी सी दरार भी तलते समय तोड़ देगी।",
            cookStep3: "Heat ghee/oil on LOW heat (this is crucial). Gently slide in the balls. Fry on very low heat, turning constantly.", cookStep3Hindi: "घी/तेल को धीमी आंच पर गरम करें (यह बहुत जरूरी है)। गोलियां धीरे से डालें। बहुत धीमी आंच पर लगातार पलटते हुए तलें।",
            cookStep4: "Fry for 8-10 minutes until deep golden brown on all sides. They should be cooked through — not dark outside and raw inside.", cookStep4Hindi: "8-10 मिनट तक सभी तरफ से गहरा सुनहरा होने तक तलें। अंदर से भी पके होने चाहिए।",
            cookStep5: "Remove fried balls and immediately drop into warm (not boiling hot) sugar syrup.", cookStep5Hindi: "तली हुई गोलियां निकालकर तुरंत गर्म (उबलती नहीं) चाशनी में डालें।",
            finishStep: "Let gulab jamuns soak in syrup for at least 2 hours. They will absorb the syrup and become soft and spongy. Serve warm or at room temperature.", finishStepHindi: "गुलाब जामुन को कम से कम 2 घंटे चाशनी में भिगोएं। वे चाशनी सोखकर नरम और स्पंजी हो जाएंगे। गरम या कमरे के तापमान पर परोसें।",
            tip1: "The #1 secret: fry on the LOWEST heat possible. High heat will make them dark outside but raw inside.", tip1Hindi: "#1 राज: सबसे धीमी आंच पर तलें। तेज आंच बाहर से काला और अंदर से कच्चा बनाती है।"
        };
    }

    // Jalebi
    if (/(jalebi|imarti)/.test(n)) {
        return {
            main: { name: "All-purpose flour (Maida)", nameHindi: "मैदा", amount: "1", unit: "cup" },
            sweetener: { name: "Sugar (for syrup)", nameHindi: "चीनी (चाशनी के लिए)", amount: "1.5", unit: "cups" },
            fat: { name: "Ghee or Oil (for deep frying)", nameHindi: "घी या तेल (तलने के लिए)", amount: "for frying", unit: "" },
            liquid: { name: "Warm Water + Yogurt", nameHindi: "गर्म पानी + दही", amount: "3/4", unit: "cup" },
            extras: [
                { name: "Saffron strands", nameHindi: "केसर", amount: "a pinch", unit: "" },
                { name: "Cardamom powder", nameHindi: "इलायची पाउडर", amount: "1/4", unit: "tsp" },
                { name: "Lemon juice (for syrup)", nameHindi: "नींबू का रस (चाशनी के लिए)", amount: "1", unit: "tsp" }
            ],
            flavoring: "saffron and cardamom", flavoringHindi: "केसर और इलायची",
            prepStep: "Mix maida, a pinch of turmeric for color, and 1 tbsp yogurt. Add warm water gradually to make a smooth, flowing batter (like dosa batter). Let it ferment for 8-12 hours.", prepStepHindi: "मैदा, रंग के लिए चुटकी हल्दी, और 1 बड़ा चम्मच दही मिलाएं। धीरे-धीरे गर्म पानी डालकर चिकना बहता बैटर बनाएं (डोसा बैटर जैसा)। 8-12 घंटे खमीर उठने दें।",
            cookStep1: "Make sugar syrup: boil water with sugar. Add lemon juice, saffron, and cardamom. Cook to sticky one-string consistency. Keep warm.", cookStep1Hindi: "चाशनी बनाएं: पानी और चीनी उबालें। नींबू, केसर और इलायची डालें। एक तार की चाशनी तक पकाएं। गर्म रखें।",
            cookStep2: "Fill the fermented batter into a squeeze bottle or a cloth piping bag with a small hole.", cookStep2Hindi: "खमीर उठे बैटर को स्क्वीज़ बोतल या छोटे छेद वाली कपड़े की थैली में भरें।",
            cookStep3: "Heat ghee/oil on medium-high heat. Squeeze batter in circular/spiral shapes directly into hot oil.", cookStep3Hindi: "घी/तेल मध्यम-तेज आंच पर गरम करें। गरम तेल में सीधे गोलाकार/सर्पिल आकार में बैटर निचोड़ें।",
            cookStep4: "Fry for 2-3 minutes, flipping once, until golden and crispy on both sides.", cookStep4Hindi: "2-3 मिनट तलें, एक बार पलटें, दोनों तरफ से सुनहरा और कुरकुरा होने तक।",
            cookStep5: "Remove fried jalebis and immediately dip into warm sugar syrup for 30-60 seconds.", cookStep5Hindi: "तली हुई जलेबियां निकालकर तुरंत गर्म चाशनी में 30-60 सेकंड डुबोएं।",
            finishStep: "Remove from syrup and serve immediately while still warm and crispy. Best enjoyed fresh!", finishStepHindi: "चाशनी से निकालें और गरमा-गरम कुरकुरी तुरंत परोसें। ताजी बनी सबसे अच्छी!",
            tip1: "Fermentation is the key to crispy jalebi — let the batter ferment for at least 8 hours for that perfect texture.", tip1Hindi: "कुरकुरी जलेबी की कुंजी किण्वन है — परफेक्ट बनावट के लिए बैटर को कम से कम 8 घंटे खमीर उठने दें।"
        };
    }

    // Pie (Apple Pie, etc.)
    if (/(pie|tart|galette)/.test(n)) {
        const isApple = /apple/.test(n);
        const fruitName = isApple ? "Apples (peeled, cored, sliced)" : "Fresh seasonal fruit (sliced)";
        const fruitHindi = isApple ? "सेब (छिले, बिना बीज, कटे)" : "ताजे मौसमी फल (कटे)";
        return {
            main: { name: fruitName, nameHindi: fruitHindi, amount: isApple ? "5-6" : "3", unit: isApple ? "medium" : "cups" },
            sweetener: { name: "Granulated Sugar + Brown Sugar", nameHindi: "चीनी + ब्राउन शुगर", amount: "3/4", unit: "cup" },
            fat: { name: "Cold Butter (cubed, for crust)", nameHindi: "ठंडा मक्खन (क्रस्ट के लिए)", amount: "1", unit: "cup (2 sticks)" },
            liquid: { name: "Ice Water", nameHindi: "बर्फ का पानी", amount: "4-6", unit: "tbsp" },
            extras: [
                { name: "All-purpose flour (for crust)", nameHindi: "मैदा (क्रस्ट के लिए)", amount: "2.5", unit: "cups" },
                { name: "Cinnamon + Nutmeg", nameHindi: "दालचीनी + जायफल", amount: "1 tsp + 1/4 tsp", unit: "" },
                { name: "Lemon juice", nameHindi: "नींबू का रस", amount: "1", unit: "tbsp" },
                { name: "Cornstarch (for filling)", nameHindi: "कॉर्नस्टार्च (भरावन के लिए)", amount: "2", unit: "tbsp" }
            ],
            flavoring: "cinnamon, nutmeg, and a touch of lemon", flavoringHindi: "दालचीनी, जायफल, और थोड़ा नींबू",
            prepStep: "Make pie crust: pulse flour, salt, and cold cubed butter in a food processor until pea-sized crumbs form. Add ice water 1 tbsp at a time until dough just holds together. Divide in two, flatten into discs, wrap and refrigerate for 1 hour.", prepStepHindi: "पाई क्रस्ट बनाएं: मैदा, नमक, और ठंडे कटे मक्खन को फूड प्रोसेसर में मटर के दाने जैसे बनाएं। 1-1 बड़ा चम्मच बर्फ का पानी डालें जब तक आटा बने। दो हिस्सों में बांटें, चपटा करें, लपेटकर 1 घंटे फ्रिज करें।",
            cookStep1: "Peel, core, and thinly slice the fruit. Toss with sugar, brown sugar, cinnamon, nutmeg, lemon juice, and cornstarch.", cookStep1Hindi: "फल छीलें, बीज निकालें, और पतला काटें। चीनी, ब्राउन शुगर, दालचीनी, जायफल, नींबू, और कॉर्नस्टार्च मिलाएं।",
            cookStep2: "Roll out one disc of chilled dough on a floured surface to 12-inch circle. Transfer to a 9-inch pie dish.", cookStep2Hindi: "ठंडे आटे का एक हिस्सा आटा लगी सतह पर 12 इंच गोल बेलें। 9 इंच पाई डिश में रखें।",
            cookStep3: "Pour the fruit filling into the pie crust. Dot with small pieces of butter on top.", cookStep3Hindi: "फल का भरावन पाई क्रस्ट में डालें। ऊपर मक्खन के छोटे टुकड़े रखें।",
            cookStep4: "Roll out the second dough disc. Place over the filling. Crimp edges to seal. Cut 4-5 slits in the top for steam.", cookStep4Hindi: "दूसरा आटा बेलें। भरावन के ऊपर रखें। किनारे दबाकर सील करें। भाप के लिए ऊपर 4-5 चीरे लगाएं।",
            cookStep5: "Brush top with egg wash (1 egg beaten with 1 tbsp milk) and sprinkle with sugar for a golden, sparkly crust.", cookStep5Hindi: "ऊपर अंडे की वॉश (1 अंडा + 1 बड़ा चम्मच दूध) लगाएं और सुनहरे, चमकदार क्रस्ट के लिए चीनी छिड़कें।",
            finishStep: "Bake at 200°C (400°F) for 20 minutes, then reduce to 180°C (350°F) for 30-35 more minutes until golden and bubbly. Cool at least 2 hours before slicing. Serve with vanilla ice cream.", finishStepHindi: "200°C (400°F) पर 20 मिनट बेक करें, फिर 180°C (350°F) पर 30-35 मिनट और बेक करें जब तक सुनहरा और बुलबुलेदार। काटने से पहले कम से कम 2 घंटे ठंडा करें। वैनिला आइसक्रीम के साथ परोसें।",
            tip1: "The secret to flaky pie crust: keep everything COLD — cold butter, ice water, and even chill the flour. Handle the dough as little as possible.", tip1Hindi: "परतदार पाई क्रस्ट का राज: सब कुछ ठंडा रखें — ठंडा मक्खन, बर्फ का पानी, मैदा भी ठंडी। आटे को जितना कम हो सके छुएं।"
        };
    }

    // Cookies
    if (/(cookie|biscuit|shortbread)/.test(n)) {
        return {
            main: { name: "All-purpose flour", nameHindi: "मैदा", amount: "2.25", unit: "cups" },
            sweetener: { name: "Brown Sugar + White Sugar", nameHindi: "ब्राउन शुगर + सफेद चीनी", amount: "3/4 + 1/2", unit: "cup" },
            fat: { name: "Butter (softened)", nameHindi: "मक्खन (मुलायम)", amount: "1", unit: "cup (2 sticks)" },
            liquid: { name: "Eggs + Vanilla extract", nameHindi: "अंडे + वैनिला", amount: "2 + 1 tsp", unit: "" },
            extras: [
                { name: "Baking soda", nameHindi: "बेकिंग सोडा", amount: "1", unit: "tsp" },
                { name: "Chocolate chips or mix-ins", nameHindi: "चॉकलेट चिप्स", amount: "2", unit: "cups" },
                { name: "Salt", nameHindi: "नमक", amount: "1", unit: "tsp" }
            ],
            flavoring: "vanilla extract and a pinch of sea salt", flavoringHindi: "वैनिला और चुटकी समुद्री नमक",
            prepStep: "Preheat oven to 190°C (375°F). Line baking sheets with parchment paper.", prepStepHindi: "ओवन को 190°C (375°F) पर प्रीहीट करें। बेकिंग शीट पर पार्चमेंट पेपर लगाएं।",
            cookStep1: "In a large bowl, cream the softened butter with both sugars until light and fluffy (3-4 minutes).", cookStep1Hindi: "एक बड़े कटोरे में मुलायम मक्खन को दोनों चीनी के साथ हल्का और फूला होने तक (3-4 मिनट) फेंटें।",
            cookStep2: "Beat in the eggs one at a time, then add vanilla extract. Mix until smooth.", cookStep2Hindi: "एक-एक करके अंडे डालकर फेंटें, फिर वैनिला डालें। चिकना होने तक मिलाएं।",
            cookStep3: "In a separate bowl, whisk together flour, baking soda, and salt. Gradually fold into the wet mixture. Do not overmix.", cookStep3Hindi: "अलग कटोरे में मैदा, बेकिंग सोडा और नमक मिलाएं। धीरे-धीरे गीले मिश्रण में मोड़ें। बहुत अधिक न मिलाएं।",
            cookStep4: "Fold in chocolate chips or your chosen mix-ins. Chill dough for 30 minutes for thicker cookies.", cookStep4Hindi: "चॉकलेट चिप्स मिलाएं। मोटे कुकीज़ के लिए आटा 30 मिनट ठंडा करें।",
            cookStep5: "Scoop rounded tablespoons of dough onto prepared baking sheets, spacing them 2 inches apart.", cookStep5Hindi: "गोल बड़े चम्मच भर आटा तैयार बेकिंग शीट पर रखें, 2 इंच की दूरी पर।",
            finishStep: "Bake for 9-11 minutes until edges are golden but centers look slightly underdone. Cool on the baking sheet for 5 minutes, then transfer to a wire rack.", finishStepHindi: "9-11 मिनट बेक करें जब तक किनारे सुनहरे हों लेकिन बीच थोड़ा कच्चा दिखे। बेकिंग शीट पर 5 मिनट ठंडा करें, फिर वायर रैक पर रखें।",
            tip1: "Remove cookies when they look slightly underdone — they continue baking on the hot sheet and become perfectly chewy.", tip1Hindi: "कुकीज़ को थोड़ा कच्चा दिखने पर निकालें — वे गर्म शीट पर पकती रहती हैं और बिल्कुल सही चबाने लायक बनती हैं।"
        };
    }

    // Western Desserts (Cakes, Cupcakes, Muffins, Brownies)
    if (/(cake|cupcake|muffin|brownie)/.test(n)) {
        return {
            main: { name: "All-purpose Flour", nameHindi: "मैदा", amount: "1.5", unit: "cups" },
            sweetener: { name: "Granulated Sugar", nameHindi: "चीनी", amount: "1", unit: "cup" },
            fat: { name: "Butter (softened) or Oil", nameHindi: "मक्खन (मुलायम) या तेल", amount: "1/2", unit: "cup" },
            liquid: { name: "Milk + Eggs (or Yogurt for eggless)", nameHindi: "दूध और अंडे (या दही)", amount: "1", unit: "cup" },
            extras: [
                { name: "Baking Powder", nameHindi: "बेकिंग पाउडर", amount: "1.5", unit: "tsp" },
                { name: "Vanilla extract", nameHindi: "वैनिला एक्सट्रैक्ट", amount: "1", unit: "tsp" }
            ],
            flavoring: "vanilla extract", flavoringHindi: "वैनिला एक्सट्रैक्ट",
            prepStep: "Preheat oven to 180°C (350°F). Grease and line your baking pan.", prepStepHindi: "ओवन को 180°C (350°F) पर प्रीहीट करें। बेकिंग पैन में तेल लगाकर पेपर लगाएं।",
            cookStep1: "In a bowl, sift the flour, baking powder, and salt together (dry ingredients).", cookStep1Hindi: "एक कटोरे में मैदा, बेकिंग पाउडर और नमक एक साथ छान लें (सूखी सामग्री)।",
            cookStep2: "In another large bowl, cream the butter and sugar until light and fluffy.", cookStep2Hindi: "एक बड़े कटोरे में मक्खन और चीनी को हल्का और फूला हुआ होने तक फेंटें।",
            cookStep3: "Add eggs/yogurt one at a time, beating well after each addition. Mix in vanilla.", cookStep3Hindi: "एक-एक करके अंडे/दही डालें, हर बार अच्छी तरह फेंटें। वैनिला मिलाएं।",
            cookStep4: "Gradually fold the dry ingredients into the wet mixture, alternating with milk. Do not overmix.", cookStep4Hindi: "धीरे-धीरे सूखी सामग्री को गीले मिश्रण में मिलाएं, बीच-बीच में दूध डालें। बहुत अधिक न मिलाएं।",
            cookStep5: "Pour batter into the prepared pan and smooth the top.", cookStep5Hindi: "बैटर को तैयार पैन में डालें और ऊपर से चिकना करें।",
            finishStep: "Bake for 30-35 minutes or until a toothpick inserted in the center comes out clean. Cool completely before cutting.", finishStepHindi: "30-35 मिनट बेक करें या जब तक टूथपिक साफ न निकले। काटने से पहले पूरी तरह ठंडा करें।",
            tip1: "Make sure all wet ingredients are at room temperature to ensure a properly emulsified batter.", tip1Hindi: "सुनिश्चित करें कि सभी गीली सामग्री कमरे के तापमान पर हों ताकि बैटर सही बने।"
        };
    }

    // Generic Sweet Fallback
    return {
        main: { name: "Gram Flour, Semolina, or Rice", nameHindi: "बेसन, सूजी या चावल", amount: "1", unit: "cup" },
        sweetener: { name: "Sugar or Jaggery", nameHindi: "चीनी या गुड़", amount: "3/4", unit: "cup" },
        fat: { name: "Ghee or Butter", nameHindi: "घी या मक्खन", amount: "1/2", unit: "cup" },
        liquid: { name: "Milk or Water", nameHindi: "दूध या पानी", amount: "1", unit: "cup" },
        extras: [
            { name: "Cardamom or Vanilla", nameHindi: "इलायची या वैनिला", amount: "1", unit: "tsp" },
            { name: "Chopped nuts", nameHindi: "कटे मेवे", amount: "1/4", unit: "cup" }
        ],
        flavoring: "your chosen spice or extract", flavoringHindi: "पसंदीदा मसाला या अर्क",
        prepStep: "Prepare your ingredients and keep milk/water warm.", prepStepHindi: "अपनी सामग्री तैयार करें और दूध/पानी गर्म रखें।",
        cookStep1: "Melt the fat in a heavy-bottomed pan.", cookStep1Hindi: "भारी तले वाले पैन में घी/मक्खन पिघलाएं।",
        cookStep2: "Roast the main ingredient in the fat until aromatic.", cookStep2Hindi: "मुख्य सामग्री को घी में खुशबू आने तक भूनें।",
        cookStep3: "Add the liquid slowly while stirring constantly to prevent lumps.", cookStep3Hindi: "गांठों से बचने के लिए लगातार चलाते हुए तरल धीरे-धीरे डालें।",
        cookStep4: "Cook until the mixture reaches your desired consistency.", cookStep4Hindi: "मिश्रण के मनचाहे गाढ़ेपन तक पहुंचने तक पकाएं।",
        cookStep5: "Stir in the sweetener until fully dissolved.", cookStep5Hindi: "पूरी तरह घुलने तक स्वीटनर मिलाएं।",
        finishStep: "Garnish with nuts and let cool to set, or serve warm.", finishStepHindi: "मेवों से सजाएं और सेट होने के लिए ठंडा करें, या गरम परोसें।",
        tip1: "Always cook sweet mixtures on low-medium heat; high heat burns sugar quickly and ruins the flavor.", tip1Hindi: "हमेशा मीठे मिश्रण को धीमी-मध्यम आंच पर पकाएं; तेज आंच चीनी जलाती है।"
    };
}

export function generateAIPrediction(dishName: string, dietaryGoal: DietaryGoal = 'Standard') {
    const lowerName = dishName.toLowerCase().trim();

    // Keys that represent SPECIFIC dishes — they should match even as part of a name
    // e.g. "masala dosa" should match "dosa", "paneer tikka" should match "paneer"
    const SPECIFIC_DISH_KEYS = new Set([
        "dosa", "upma", "biryani", "dal", "roti", "pizza", "pasta", "taco", "sandwich",
        "butter chicken", "chole", "rajma", "idli", "samosa", "fried rice",
        "pad thai", "kung pao chicken", "sushi", "ramen", "omelette",
        "apple pie", "rasmalai", "gulab jamun", "rasgulla", "jalebi", "barfi", "kheer"
    ]);

    // Keys that are GENERIC ingredient words — they should ONLY match when the
    // dish name is essentially that word alone (e.g. "chicken" matches "chicken",
    // but NOT "kung pao chicken" or "chicken caesar salad")
    const GENERIC_INGREDIENT_KEYS = new Set([
        "chicken", "paneer", "curry", "rice", "salad", "soup", "noodle", "egg"
    ]);

    // 1) Try KNOWLEDGE_BASE with smart matching
    let bestKey: string | null = null;
    let bestScore = 0;

    for (const key in KNOWLEDGE_BASE) {
        if (!lowerName.includes(key)) continue;

        const nameWords = lowerName.split(/\s+/).filter(Boolean);
        const keyWords = key.split(/\s+/).filter(Boolean);
        // How much of the dish name is this key?
        const keyRatio = key.length / lowerName.length;

        let score = 0;

        if (lowerName === key) {
            // Exact match — always use
            score = 100;
        } else if (SPECIFIC_DISH_KEYS.has(key)) {
            // Specific dish key: match if key appears as a word in the name
            const appearsAsWord = nameWords.some(w => keyWords.includes(w) || w.includes(key));
            if (appearsAsWord) {
                score = 50 + keyRatio * 30; // prefer longer key matches
            }
        } else if (GENERIC_INGREDIENT_KEYS.has(key)) {
            // Generic key: only match if the key IS the dominant part of the name
            // e.g. "chicken" for dish name "chicken" or "fried chicken" (key > 40% of name)
            // But NOT for "chicken caesar salad" or "kung pao chicken"
            if (keyRatio >= 0.5 || nameWords.length <= 2) {
                score = 20 + keyRatio * 20;
            }
            // Otherwise score stays 0 — skip to dynamic generator
        } else {
            // Unknown key — use moderate matching
            score = 30 + keyRatio * 20;
        }

        if (score > bestScore) {
            bestScore = score;
            bestKey = key;
        }
    }

    if (bestKey && bestScore > 0) {
        let profile = JSON.parse(JSON.stringify(KNOWLEDGE_BASE[bestKey])) as CulinaryProfile;

        // Apply dietary substitutions
        if (dietaryGoal !== 'Standard' && SUBSTITUTION_RULES[dietaryGoal]) {
            const rules = SUBSTITUTION_RULES[dietaryGoal];
            profile.baseIngredients = profile.baseIngredients.map(ing => {
                const ingName = ing.name.toLowerCase();
                for (const k in rules) { if (ingName.includes(k)) return { ...ing, ...rules[k] }; }
                return ing;
            });
            profile.techniques = profile.techniques.map(t => {
                let en = t.name, hi = t.hindi;
                for (const k in rules) {
                    if (en.toLowerCase().includes(k)) {
                        en = en.replace(new RegExp(k, 'gi'), rules[k].name);
                        hi = hi.replace(new RegExp(k, 'gi'), rules[k].nameHindi);
                    }
                }
                return { name: en, hindi: hi };
            });
        }

        return {
            title: dietaryGoal !== 'Standard' ? `${dietaryGoal} ${dishName}` : dishName,
            description: `${profile.descriptionPrefix} Optimized for a ${dietaryGoal} profile.`,
            descriptionHindi: `${profile.descriptionPrefix} यह ${dietaryGoal} आहार के लिए अनुकूलित है।`,
            ingredients: profile.baseIngredients,
            steps: profile.techniques.map(t => t.name),
            stepsHindi: profile.techniques.map(t => t.hindi),
            chefTips: profile.chefTips.map(t => t.text),
            chefTipsHindi: profile.chefTips.map(t => t.hindi),
            prepTime: "15 min",
            cookTime: "25 min",
            servings: 4,
            difficulty: "Medium" as const
        };
    }

    // 2) DYNAMIC generation: build a unique recipe from dish-name analysis
    const cuisine = inferCuisineFromName(dishName);
    const hints = CUISINE_HINTS[cuisine] || CUISINE_HINTS.global;
    const method = inferMethod(dishName);
    const mainIng = inferMainIngredient(dishName);
    const prettyName = dishName.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");

    // ── Detect if the dish is a SWEET / DESSERT ──
    const isSweetDish = /(ladoo|laddu|laddoo|halwa|halva|kheer|payasam|barfi|burfi|peda|jalebi|gulab jamun|rasgulla|rasmalai|kulfi|modak|sandesh|malpua|rabri|basundi|shrikhand|phirni|imarti|ghevar|kalakand|mysore pak|coconut barfi|gajar halwa|moong dal halwa|sooji halwa|besan ladoo|motichoor|boondi|fudge|truffle|pudding|custard|mousse|panna cotta|ice cream|gelato|brownie|cookie|cake|cupcake|cheesecake|pie|tart|pastry|croissant|donut|doughnut|churro|macaron|eclair|tiramisu|creme brulee|souffle|mochi|mithai|sweet|dessert|candy|caramel|toffee)/.test(dishName.toLowerCase());

    if (isSweetDish) {
        // ── SWEET / DESSERT recipe generation ──
        const sweetBase = inferSweetIngredients(dishName);

        const sweetIngredients: CulinaryProfile["baseIngredients"] = [
            sweetBase.main,
            sweetBase.sweetener,
            sweetBase.fat,
            sweetBase.liquid,
            ...sweetBase.extras
        ];

        const sweetSteps = [
            `Gather and measure all ingredients for ${prettyName}. ${sweetBase.prepStep}`,
            `${sweetBase.cookStep1}`,
            `${sweetBase.cookStep2}`,
            `${sweetBase.cookStep3}`,
            `${sweetBase.cookStep4}`,
            `${sweetBase.cookStep5}`,
            `Add ${sweetBase.flavoring} for authentic flavor. Mix gently until well incorporated.`,
            `${sweetBase.finishStep}`,
        ];
        const sweetStepsHindi = [
            `${prettyName} के लिए सभी सामग्री इकट्ठा करें और मापें। ${sweetBase.prepStepHindi}`,
            `${sweetBase.cookStep1Hindi}`,
            `${sweetBase.cookStep2Hindi}`,
            `${sweetBase.cookStep3Hindi}`,
            `${sweetBase.cookStep4Hindi}`,
            `${sweetBase.cookStep5Hindi}`,
            `प्रामाणिक स्वाद के लिए ${sweetBase.flavoringHindi} डालें। धीरे से अच्छी तरह मिलाएं।`,
            `${sweetBase.finishStepHindi}`,
        ];

        const sweetTips = [
            `${sweetBase.tip1}`,
            `Always use fresh, quality ingredients for the best tasting ${prettyName}.`,
            `Taste as you go — adjust sweetness level to your preference.`,
        ];
        const sweetTipsHindi = [
            `${sweetBase.tip1Hindi}`,
            `सबसे स्वादिष्ट ${prettyName} के लिए हमेशा ताजी, गुणवत्ता वाली सामग्री का उपयोग करें।`,
            `बनाते समय चखते रहें — मिठास अपनी पसंद के अनुसार ठीक करें।`,
        ];

        const desc = `A delicious ${cuisine !== "global" ? cuisine.charAt(0).toUpperCase() + cuisine.slice(1) + " " : ""}${prettyName} — a beloved sweet treat made with traditional ingredients and techniques.`;

        return {
            title: dietaryGoal !== 'Standard' ? `${dietaryGoal} ${prettyName}` : prettyName,
            description: `${desc} Optimized for a ${dietaryGoal} profile.`,
            descriptionHindi: `${desc} यह ${dietaryGoal} आहार के लिए अनुकूलित है।`,
            ingredients: sweetIngredients,
            steps: sweetSteps,
            stepsHindi: sweetStepsHindi,
            chefTips: sweetTips,
            chefTipsHindi: sweetTipsHindi,
            prepTime: "20 min",
            cookTime: "30 min",
            servings: 6,
            difficulty: "Medium" as const
        };
    }

    // ── SAVORY recipe generation (original logic) ──
    const ingredients: CulinaryProfile["baseIngredients"] = [
        { name: mainIng.name, nameHindi: mainIng.hindi, amount: mainIng.amount, unit: mainIng.unit },
        { name: hints.fat, nameHindi: hints.fatHindi, amount: "2", unit: "tbsp" },
        { name: "Onion (finely chopped)", nameHindi: "प्याज (बारीक कटा)", amount: "1", unit: "medium" },
        { name: "Garlic cloves (minced)", nameHindi: "लहसुन (कटा)", amount: "4", unit: "cloves" },
        { name: "Fresh Ginger (grated)", nameHindi: "ताजा अदरक (कद्दूकस)", amount: "1", unit: "inch" },
        { name: hints.spices, nameHindi: hints.spicesHindi, amount: "to taste", unit: "" },
        { name: "Salt", nameHindi: "नमक", amount: "to taste", unit: "" },
        { name: "Water or Broth", nameHindi: "पानी या शोरबा", amount: "1", unit: "cup" },
    ];

    const steps = [
        `Prepare all ingredients for ${prettyName}: wash, peel, and chop ${mainIng.name.toLowerCase()} into even pieces. Measure out all spices.`,
        `Heat ${hints.fat.toLowerCase()} in a large pan or pot over ${method.temp}. Let it get properly hot before adding anything.`,
        `Add chopped onion and cook for 3-4 minutes until softened. Add minced garlic and ginger, stir for 30 seconds until fragrant.`,
        `Add ${hints.spices.toLowerCase()}. Stir well and cook for 1 minute until the spices bloom and release their aroma.`,
        `Add the prepared ${mainIng.name.toLowerCase()}. ${method.verb} on ${method.temp} for ${method.time}, stirring or turning as needed for even cooking.`,
        `Add water or broth if needed to prevent sticking. Cover and cook until ${mainIng.name.toLowerCase()} is fully done and tender. Adjust consistency.`,
        `Taste and adjust seasoning: add salt, pepper, a pinch of sugar if needed to balance acidity, and any finishing spices.`,
        `Plate ${prettyName} attractively. Garnish with ${hints.garnish.toLowerCase()}. Serve hot with ${hints.side}.`,
    ];
    const stepsHindi = [
        `${prettyName} के लिए सभी सामग्री तैयार करें: ${mainIng.hindi} को समान टुकड़ों में धोएं, छीलें और काटें। सभी मसाले मापें।`,
        `एक बड़े पैन में ${hints.fatHindi} ${method.temp} पर गरम करें।`,
        `कटा प्याज डालें और 3-4 मिनट नरम होने तक पकाएं। कटा लहसुन और अदरक डालें, 30 सेकंड तक खुशबू आने तक चलाएं।`,
        `${hints.spicesHindi} डालें। अच्छी तरह चलाएं और 1 मिनट तक मसाले भूनें जब तक खुशबू न आए।`,
        `तैयार ${mainIng.hindi} डालें। ${method.temp} पर ${method.time} तक पकाएं, समान पकाने के लिए चलाते या पलटते रहें।`,
        `जरूरत हो तो पानी या शोरबा डालें। ढकें और ${mainIng.hindi} पूरी तरह पकने तक पकाएं। गाढ़ापन ठीक करें।`,
        `स्वाद चखें और सीजनिंग ठीक करें: नमक, काली मिर्च, खटाई संतुलित करने के लिए चुटकी चीनी, और फिनिशिंग मसाले डालें।`,
        `${prettyName} को आकर्षक रूप से प्लेट करें। ${hints.garnishHindi} से सजाएं। ${hints.sideHindi} के साथ गरमा गरम परोसें।`,
    ];

    const tips = [
        `For the best ${prettyName}, ensure ${mainIng.name.toLowerCase()} is at room temperature before cooking for even results.`,
        `${method.verb} on the right heat is crucial — too high burns the outside, too low gives no flavor.`,
        `Taste at every stage. The key to great cooking is adjusting seasoning throughout, not just at the end.`,
    ];
    const tipsHindi = [
        `सबसे अच्छे ${prettyName} के लिए, पकाने से पहले ${mainIng.hindi} को कमरे के तापमान पर रखें।`,
        `सही आंच पर ${method.verb} करना महत्वपूर्ण है — बहुत तेज बाहर जला देती है, बहुत धीमी स्वाद नहीं आता।`,
        `हर चरण पर स्वाद चखें। बढ़िया खाना बनाने की कुंजी है हर कदम पर सीजनिंग ठीक करना।`,
    ];

    // Apply dietary substitutions to dynamic recipe
    if (dietaryGoal !== 'Standard' && SUBSTITUTION_RULES[dietaryGoal]) {
        const rules = SUBSTITUTION_RULES[dietaryGoal];
        for (let i = 0; i < ingredients.length; i++) {
            const ingName = ingredients[i].name.toLowerCase();
            for (const k in rules) {
                if (ingName.includes(k)) {
                    ingredients[i] = { ...ingredients[i], ...rules[k] };
                    break;
                }
            }
        }
    }

    const desc = `A delicious ${cuisine !== "global" ? cuisine.charAt(0).toUpperCase() + cuisine.slice(1) + " " : ""}${prettyName} recipe featuring ${mainIng.name.toLowerCase()} with authentic seasonings.`;

    return {
        title: dietaryGoal !== 'Standard' ? `${dietaryGoal} ${prettyName}` : prettyName,
        description: `${desc} Optimized for a ${dietaryGoal} profile.`,
        descriptionHindi: `${desc} यह ${dietaryGoal} आहार के लिए अनुकूलित है।`,
        ingredients,
        steps,
        stepsHindi,
        chefTips: tips,
        chefTipsHindi: tipsHindi,
        prepTime: "15 min",
        cookTime: method.time.split(" ")[0].includes("-") ? method.time.split("-")[1].replace(/[^0-9]/g, "") + " min" : "25 min",
        servings: 4,
        difficulty: "Medium" as const
    };
}

