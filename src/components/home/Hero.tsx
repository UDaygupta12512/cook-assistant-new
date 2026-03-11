import { Link } from '@/i18n/routing';
import { ArrowRight, Search, Sparkles, Volume2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { HeroSearch } from './HeroSearch';

export async function Hero() {
    const t = await getTranslations('Hero');

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="absolute top-0 right-0 -z-10 translate-x-[20%] translate-y-[-20%] w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[100px] opacity-70 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -z-10 translate-x-[-20%] translate-y-[20%] w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[100px] opacity-70 animate-pulse delay-700"></div>

            <div className="container mx-auto px-4 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-8 animate-fade-in-up border border-orange-200">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    {t('newBadge')}
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 max-w-4xl mx-auto leading-tight">
                    {t('titleStart')} <br />
                    <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">{t('titleHighlight')}</span>
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                    {t('subtitle')}
                </p>

                {/* Search */}
                <HeroSearch
                    placeholder={t('searchPlaceholder')}
                    buttonText={t('findRecipes')}
                />

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/generate"
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-all shadow-lg hover:shadow-xl animate-pulse-subtle"
                    >
                        <Sparkles className="w-5 h-5" />
                        AI Generate
                    </Link>
                    <Link
                        href="/recipes"
                        className="flex items-center gap-2 bg-foreground text-background px-8 py-3 rounded-full font-medium hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl"
                    >
                        {t('exploreRecipes')}
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                    <Link
                        href="/how-to-cook"
                        className="flex items-center gap-2 bg-white dark:bg-zinc-800 text-foreground border border-border px-8 py-3 rounded-full font-medium hover:bg-muted transition-all"
                    >
                        Try How to Cook
                    </Link>
                </div>

                {/* Voice Feature Banner */}
                <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800">
                    <Volume2 className="w-5 h-5" />
                    <span className="font-medium">Voice Cooking Assistant - हिंदी में बोलता है!</span>
                </div>

                {/* Stats */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-border py-8 bg-background/50 backdrop-blur-sm">
                    <div>
                        <div className="text-3xl font-bold text-primary mb-1">10k+</div>
                        <div className="text-sm text-muted-foreground">{t('stats.recipes')}</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary mb-1">500+</div>
                        <div className="text-sm text-muted-foreground">{t('stats.chefs')}</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary mb-1">98%</div>
                        <div className="text-sm text-muted-foreground">{t('stats.satisfaction')}</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                        <div className="text-sm text-muted-foreground">{t('stats.support')}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
