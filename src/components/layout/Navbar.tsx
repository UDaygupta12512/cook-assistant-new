import { getTranslations } from 'next-intl/server';
import { NavbarClient } from './NavbarClient';

export async function Navbar() {
    const t = await getTranslations('Navbar');

    const translations = {
        recipes: t('recipes'),
        scan: t('scan'),
        mealPlanner: t('mealPlanner'),
        pantry: t('pantry'),
        shoppingList: t('shoppingList'),
        myRecipes: t('myRecipes'),
        search: t('search'),
        signIn: t('signIn'),
    };

    return <NavbarClient translations={translations} />;
}
