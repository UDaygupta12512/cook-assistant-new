"use client";

import { useTranslations } from "next-intl";

export function useNavbarTranslations() {
    const t = useTranslations("Navbar");

    return {
        recipes: t("recipes"),
        scan: t("scan"),
        mealPlanner: t("mealPlanner"),
        pantry: t("pantry"),
        shoppingList: t("shoppingList"),
        myRecipes: t("myRecipes"),
        search: t("search"),
        signIn: t("signIn"),
    };
}
