import { ALL_RECIPES, type Recipe } from "@/lib/recipe-data";
import type { DietaryGoal, UserDietaryProfile } from "@/store/useDietaryStore";
import { generateAIPrediction, SUBSTITUTION_RULES } from "@/lib/ai-model";

type Normalized = {
  raw: string;
  normalized: string;
  tokens: string[];
};

const STOPWORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "to",
  "of",
  "for",
  "with",
  "without",
  "please",
  "pls",
  "can",
  "could",
  "would",
  "should",
  "give",
  "make",
  "cook",
  "recipe",
  "recipes",
  "how",
  "do",
  "i",
  "we",
  "you",
  "me",
  "my",
  "in",
  "on",
  "at",
  "is",
  "are",
  "it",
  "this",
  "that",
]);

const INGREDIENT_SYNONYMS: Record<string, string> = {
  chilli: "chili",
  chilies: "chili",
  chillies: "chili",
  cilantro: "coriander",
  "bell pepper": "capsicum",
  "spring onion": "scallion",
  "green onion": "scallion",
  aubergine: "eggplant",
  curd: "yogurt",
  garbanzo: "chickpea",
  garbanzoes: "chickpea",
  chickpeas: "chickpea",
  tomatoes: "tomato",
  potatoes: "potato",
  onions: "onion",
  eggs: "egg",
};

export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeIngredientToken(token: string): string {
  const t = normalizeText(token);
  if (!t) return t;
  if (INGREDIENT_SYNONYMS[t]) return INGREDIENT_SYNONYMS[t];
  // naive singularization for common plurals
  if (t.endsWith("es") && t.length > 4) return t.slice(0, -2);
  if (t.endsWith("s") && t.length > 3) return t.slice(0, -1);
  return t;
}

function tokenize(input: string): string[] {
  const normalized = normalizeText(input);
  if (!normalized) return [];
  const tokens = normalized
    .split(" ")
    .map((t) => t.trim())
    .filter(Boolean)
    .map(normalizeIngredientToken)
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t));
  return Array.from(new Set(tokens));
}

function normalized(input: string): Normalized {
  return {
    raw: input,
    normalized: normalizeText(input),
    tokens: tokenize(input),
  };
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const t of a) if (b.has(t)) intersection++;
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function recipeIngredientTokenSet(recipe: Recipe): Set<string> {
  const tokens: string[] = [];
  for (const ing of recipe.ingredients) {
    tokens.push(...tokenize(ing.name));
  }
  return new Set(tokens);
}

function recipeTitleTokenSet(recipe: Recipe): Set<string> {
  const tokens: string[] = [];
  tokens.push(...tokenize(recipe.title));
  if (recipe.titleHindi) tokens.push(...tokenize(recipe.titleHindi));
  return new Set(tokens);
}

function violatesUserPrefs(recipe: Recipe, profile?: UserDietaryProfile): boolean {
  if (!profile) return false;
  const allText = normalizeText(
    [
      recipe.title,
      recipe.titleHindi ?? "",
      recipe.description,
      recipe.descriptionHindi ?? "",
      ...recipe.ingredients.map((i) => i.name),
      ...recipe.ingredients.map((i) => i.nameHindi ?? ""),
      ...recipe.tags,
    ].join(" ")
  );
  const dislikes = (profile.dislikedIngredients ?? [])
    .map((d) => normalizeIngredientToken(d))
    .filter(Boolean);
  const allergies = (profile.allergies ?? [])
    .map((a) => normalizeIngredientToken(a))
    .filter(Boolean);

  // be conservative: if a dislike/allergy token appears anywhere, skip
  for (const d of dislikes) if (d && allText.includes(d)) return true;
  for (const a of allergies) if (a && allText.includes(a)) return true;
  return false;
}

export function findBestRecipeByDishName(
  dishName: string,
  opts?: { profile?: UserDietaryProfile; limit?: number; minScore?: number }
): Recipe[] {
  const q = normalized(dishName);
  const qTokens = new Set(q.tokens);
  const qNorm = q.normalized;
  const limit = opts?.limit ?? 5;
  const minScore = opts?.minScore ?? 0.25; // lowered: short queries need a lower bar

  if (qTokens.size === 0 && !qNorm) return [];

  const scored = ALL_RECIPES.map((r) => {
    const titleNorm = normalizeText(r.title);
    const titleHindiNorm = r.titleHindi ? normalizeText(r.titleHindi) : "";

    // Substring match in either direction: "dosa" in "masala dosa", or "masala dosa" in "dosa"
    const titleHit =
      (qNorm && titleNorm.includes(qNorm)) ||
      (qNorm && qNorm.includes(titleNorm)) ||
      (qNorm && titleHindiNorm && titleHindiNorm.includes(qNorm)) ||
      (qNorm && titleHindiNorm && qNorm.includes(titleHindiNorm));

    const titleTokens = recipeTitleTokenSet(r);
    const titleScore = jaccard(qTokens, titleTokens);
    const tagScore = jaccard(qTokens, new Set(r.tags.flatMap((t) => tokenize(t))));

    // NEW: check if ALL user query tokens appear in the recipe title tokens
    let allQueryTokensInTitle = true;
    let coveredCount = 0;
    for (const t of qTokens) {
      if (titleTokens.has(t)) {
        coveredCount++;
      } else {
        allQueryTokensInTitle = false;
      }
    }
    const coverage = qTokens.size === 0 ? 0 : coveredCount / qTokens.size;

    // Give strong boost for substring hits or full token coverage
    let score = titleScore * 0.7 + tagScore * 0.25;
    if (titleHit) score += 0.85; // strong substring boost
    if (allQueryTokensInTitle && qTokens.size > 0) score += 0.5; // all tokens found in title
    if (coverage >= 0.5) score += coverage * 0.3; // partial coverage boost

    return { r, score, titleHit, titleScore, coverage, allQueryTokensInTitle };
  })
    .filter(({ r }) => !violatesUserPrefs(r, opts?.profile))
    .filter(({ titleHit, score, titleScore, coverage, allQueryTokensInTitle }) => {
      if (titleHit) return true;
      if (allQueryTokensInTitle) return true;
      if (qTokens.size === 0) return false;
      if (titleScore >= 0.4) return true;
      if (coverage >= 0.5 && score >= 0.25) return true;
      return score >= minScore;
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.r);
}

export function findBestRecipesByIngredients(
  ingredients: string[],
  opts?: { profile?: UserDietaryProfile; limit?: number; minMatchRatio?: number }
): Recipe[] {
  const limit = opts?.limit ?? 10;
  const minMatchRatio = opts?.minMatchRatio ?? 0.1; // Reduced to 0.1 for broader and more accurate results
  const queryTokens = new Set(ingredients.flatMap((i) => tokenize(i)));
  if (queryTokens.size === 0) return [];

  const scored = ALL_RECIPES.map((r) => {
    const ingTokens = recipeIngredientTokenSet(r);
    let matchedCount = 0;
    for (const token of queryTokens) {
      if (ingTokens.has(token)) matchedCount++;
    }

    // how much of the user's ingredient intent is covered by the recipe
    const queryCoverage = queryTokens.size === 0 ? 0 : matchedCount / queryTokens.size;
    // how focused the recipe is on requested ingredients (prevents noisy matches)
    const ingredientPrecision = ingTokens.size === 0 ? 0 : matchedCount / ingTokens.size;

    // bonus for title/tag relevance for better ordering
    const titleBonus = jaccard(queryTokens, recipeTitleTokenSet(r)) * 0.15;
    const tagBonus = jaccard(queryTokens, new Set(r.tags.flatMap((t) => tokenize(t)))) * 0.1;

    let score = queryCoverage * 0.75 + ingredientPrecision * 0.15 + titleBonus + tagBonus;
    if (queryCoverage === 1) score += 0.15;
    if (matchedCount >= 2) score += 0.05;

    return { r, score, queryCoverage, matchedCount };
  })
    .filter(({ r }) => !violatesUserPrefs(r, opts?.profile))
    .filter(({ queryCoverage, matchedCount }) => queryCoverage >= minMatchRatio || matchedCount >= 2)
    .sort((a, b) => {
      if (b.queryCoverage !== a.queryCoverage) return b.queryCoverage - a.queryCoverage;
      return b.score - a.score;
    });

  return scored.slice(0, limit).map((s) => s.r);
}

export type GeneratedHowToCookRecipe = {
  name: string;
  hindi: string;
  origin: string;
  difficulty: "Easy" | "Medium" | "Hard";
  prepTime: string;
  cookTime: string;
  servings: number;
  description: string;
  descriptionHindi: string;
  ingredients: string[];
  ingredientsHindi: string[];
  steps: { step: number; english: string; hindi: string }[];
  tips: string[];
  tipsHindi: string[];
  safetyNotes?: string[];
};

function inferOriginFromDishName(name: string): string {
  const n = normalizeText(name);
  if (/(dosa|idli|sambar|rasam|biryani|paneer|tikka|dal|chole|rajma|masala|rasmalai|rasgulla|gulab jamun|jalebi|barfi|kheer|halwa|ladoo|modak|sandesh|rabri|kulfi|peda|malpua)/.test(n)) return "Indian";
  if (/(pasta|pizza|risotto|carbonara|marinara)/.test(n)) return "Italian";
  if (/(ramen|udon|sushi|teriyaki|miso)/.test(n)) return "Japanese";
  if (/(pad thai|thai|tom yum|green curry)/.test(n)) return "Thai";
  if (/(taco|burrito|quesadilla|salsa)/.test(n)) return "Mexican";
  return "Global Cuisine";
}

function quickHindiFallback(english: string): string {
  // We don’t have a translator; keep it readable rather than wrong.
  return english;
}

export function ensureFullSteps(params: {
  dishName: string;
  existingEnglish: string[];
  existingHindi: string[];
}): { steps: string[]; stepsDetailed: { step: number; english: string; hindi: string }[]; stepsEnglish: string[]; stepsHindi: string[] } {
  const dish = params.dishName.trim() || "this dish";
  const existing = params.existingEnglish.filter(Boolean);
  const existingHi = params.existingHindi.filter(Boolean);

  // Keep existing steps, but ensure at least 8 steps with a sensible cooking flow.
  const base: string[] = existing.length ? [...existing] : [];

  const n = normalizeText(dish);
  const isBake = /(bake|oven|roast|cake|bread|pizza)/.test(n);
  const isFry = /(fry|fried|pakora|tempura|stir fry|stir-fry|tadka)/.test(n);
  const isSoup = /(soup|broth|ramen|stew)/.test(n);

  const fallback: string[] = [];
  fallback.push(isBake ? `Preheat the oven and prepare your baking tools for ${dish}.` : `Prep all your fresh ingredients for ${dish}: wash, chop, and organize.`);
  fallback.push(`Begin by heating your cooking vessel and adding a base of fat suitable for ${dish}.`);
  fallback.push(`Sauté your aromatics slowly to build a deep flavor profile specifically for this ${dish} recipe.`);
  fallback.push(`Incorporate the signature spices and seasonings that give ${dish} its unique character.`);
  fallback.push(isSoup ? `Add your liquid base and let the ${dish} flavors meld over a gentle simmer.` : `Add the primary ingredients for ${dish} and ensure they are well coated in the flavor base.`);
  fallback.push(isFry ? `Cook the ${dish} until you achieve the perfect texture, adjusting the flame as needed.` : `Slowly cook the ${dish} until every component is tender and perfectly infused with flavor.`);
  fallback.push(`Taste your ${dish} and make final adjustments to the seasoning, salt, and brightness.`);
  fallback.push(`Plate your beautiful ${dish} hot, adding a fresh garnish to enhance its visual appeal.`);

  // Start with the base native steps
  let finalEnglish: string[] = [];
  const seen = new Set<string>();

  for (const s of base) {
    const key = normalizeText(s);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    finalEnglish.push(s);
  }

  // If the recipe has fewer than 8 steps, pad it with fallbacks to ensure minimum detail
  if (finalEnglish.length < 8) {
    for (const s of fallback) {
      if (finalEnglish.length >= 8) break;
      const key = normalizeText(s);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      finalEnglish.push(s);
    }
  }

  const detailedEnglish = finalEnglish.map((step) =>
    step.length >= 55
      ? step
      : `${step} Keep the heat controlled at medium, stir every 30-60 seconds, and continue until texture and aroma clearly indicate doneness.`
  );

  const finalHindi = detailedEnglish.map((s, idx) => existingHi[idx] || s);

  return {
    stepsEnglish: detailedEnglish,
    stepsHindi: finalHindi,
    steps: detailedEnglish,
    stepsDetailed: detailedEnglish.map((s, idx) => ({ step: idx + 1, english: s, hindi: finalHindi[idx] || s })),
  };
}

export function generateHowToCookRecipe(
  dishName: string,
  goal: DietaryGoal,
  profile?: UserDietaryProfile
): GeneratedHowToCookRecipe {
  // 1) Try real database recipes — but ONLY for strong title matches.
  //    We score matches and require a high bar so that "kung pao chicken"
  //    does NOT return a generic "chicken curry" recipe from the DB.
  const q = normalizeText(dishName);
  const qTokens = new Set(tokenize(dishName));
  let best: Recipe | null = null;

  if (qTokens.size > 0) {
    const scored = ALL_RECIPES.map((r) => {
      const titleNorm = normalizeText(r.title);
      const titleHindiNorm = r.titleHindi ? normalizeText(r.titleHindi) : "";

      // Strong match: the query IS (or contains) the full recipe title, or vice-versa
      const exactSubstring =
        (q && titleNorm && titleNorm.includes(q)) ||
        (q && titleNorm && q.includes(titleNorm)) ||
        (q && titleHindiNorm && titleHindiNorm.includes(q)) ||
        (q && titleHindiNorm && q.includes(titleHindiNorm));

      // Token Jaccard similarity
      const titleTokens = new Set(tokenize(r.title));
      const titleJaccard = jaccard(qTokens, titleTokens);

      // Check: do ALL query tokens appear in the title?
      let allInTitle = true;
      for (const t of qTokens) { if (!titleTokens.has(t)) { allInTitle = false; break; } }

      return { r, exactSubstring, titleJaccard, allInTitle };
    }).filter(({ exactSubstring, titleJaccard, allInTitle }) => {
      // Only allow the DB recipe if:
      // • The query is an exact substring of the title (or vice versa), OR
      // • All query tokens are found in the title, OR
      // • Jaccard similarity is decent (>= 0.35)
      return exactSubstring || allInTitle || titleJaccard >= 0.35;
    }).filter(({ r }) => !violatesUserPrefs(r, profile))
      .sort((a, b) => {
        // Prefer exact substring > all tokens > high jaccard
        if (a.exactSubstring !== b.exactSubstring) return a.exactSubstring ? -1 : 1;
        if (a.allInTitle !== b.allInTitle) return a.allInTitle ? -1 : 1;
        return b.titleJaccard - a.titleJaccard;
      });

    if (scored.length > 0) { best = scored[0].r; }
  }

  if (best) {
    // If goal is Standard, return exact DB recipe.
    if (goal === "Standard") {
      return {
        name: best.title,
        hindi: best.titleHindi || best.title,
        origin: best.tags.find((t) => /(ian|ican|thai|japanese|mexican|indian)/i.test(t)) || inferOriginFromDishName(best.title),
        difficulty: best.difficulty as "Easy" | "Medium" | "Hard",
        prepTime: best.prepTime,
        cookTime: best.cookTime,
        servings: best.servings,
        description: best.description,
        descriptionHindi: best.descriptionHindi || best.description,
        ingredients: best.ingredients.map((i) => `${i.amount} ${i.unit || ""} ${i.name}`.replace(/\s+/g, " ").trim()),
        ingredientsHindi: best.ingredients.map((i) => i.nameHindi || i.name),
        steps: ensureFullSteps({
          dishName: best.title,
          existingEnglish: best.steps,
          existingHindi: best.stepsHindi || [],
        }).stepsDetailed,
        tips: best.chefTips,
        tipsHindi: best.chefTipsHindi || best.chefTips.map(quickHindiFallback),
      };
    }

    // For non-standard goals, transform the DB recipe with targeted substitutions.
    const rules = SUBSTITUTION_RULES[goal] || {};
    const transformText = (text: string) => {
      let t = text;
      for (const key of Object.keys(rules)) {
        const rep = rules[key]?.name;
        if (!rep) continue;
        t = t.replace(new RegExp(`\\b${key}\\b`, "gi"), rep);
      }
      return t;
    };

    const ingredients = best.ingredients.map((i) => {
      const lower = i.name.toLowerCase();
      for (const key of Object.keys(rules)) {
        if (lower.includes(key)) {
          const sub = rules[key];
          const amount = sub.amount ?? i.amount;
          const unit = sub.unit ?? i.unit;
          return `${amount} ${unit || ""} ${sub.name}`.replace(/\s+/g, " ").trim();
        }
      }
      return `${i.amount} ${i.unit || ""} ${i.name}`.replace(/\s+/g, " ").trim();
    });

    const ingredientsHindi = best.ingredients.map((i) => {
      const lower = i.name.toLowerCase();
      for (const key of Object.keys(rules)) {
        if (lower.includes(key)) {
          const sub = rules[key];
          return sub.nameHindi || sub.name;
        }
      }
      return i.nameHindi || i.name;
    });

    const rawSteps = ensureFullSteps({
      dishName: best.title,
      existingEnglish: best.steps.map(transformText),
      existingHindi: (best.stepsHindi || best.steps).map(s => transformText(s)),
    });
    const steps = rawSteps.stepsDetailed;

    const tips = best.chefTips.map(transformText);
    const tipsHindi = (best.chefTipsHindi || best.chefTips.map(quickHindiFallback)).map(transformText);

    const ai = generateAIPrediction(best.title, goal);
    return {
      name: ai.title,
      hindi: ai.title,
      origin: inferOriginFromDishName(best.title),
      difficulty: best.difficulty as "Easy" | "Medium" | "Hard",
      prepTime: best.prepTime,
      cookTime: best.cookTime,
      servings: best.servings,
      description: `${best.description} (Adjusted for a ${goal} profile.)`,
      descriptionHindi: `${best.descriptionHindi || best.description} (यह ${goal} आहार के लिए समायोजित है।)`,
      ingredients,
      ingredientsHindi,
      steps,
      tips,
      tipsHindi,
      safetyNotes: profile?.allergies?.length
        ? [`Avoid allergens: ${profile.allergies.join(", ")}.`]
        : undefined,
    };
  }

  // 2) Fallback: Dynamic AI generation — produces a UNIQUE recipe for any dish
  const ai = generateAIPrediction(dishName, goal);
  const origin = inferOriginFromDishName(dishName);
  const steps = ensureFullSteps({
    dishName: dishName,
    existingEnglish: ai.steps,
    existingHindi: ai.stepsHindi || [],
  }).stepsDetailed;

  return {
    name: ai.title,
    hindi: ai.title,
    origin,
    difficulty: ai.difficulty,
    prepTime: ai.prepTime,
    cookTime: ai.cookTime,
    servings: ai.servings,
    description: ai.description,
    descriptionHindi: ai.descriptionHindi,
    ingredients: ai.ingredients.map((i) => `${i.amount} ${i.unit} ${i.name}`.replace(/\s+/g, " ").trim()),
    ingredientsHindi: ai.ingredients.map((i) => i.nameHindi || i.name),
    steps: steps,
    tips: ai.chefTips,
    tipsHindi: ai.chefTipsHindi.map((t) => t || quickHindiFallback(t)),
    safetyNotes: profile?.allergies?.length ? [`Avoid allergens: ${profile.allergies.join(", ")}.`] : undefined,
  };
}

