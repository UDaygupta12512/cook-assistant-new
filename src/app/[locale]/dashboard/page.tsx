'use client'

import { useState } from 'react'
import { Link, useRouter } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { ALL_RECIPES } from '@/lib/recipe-data'

export default function DashboardPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  // Select 3 random recipes or latest recipes from the actual database
  const recentRecipes = ALL_RECIPES.slice(0, 3);

  // Rotate dish of the day based on the calendar day so it changes daily
  const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const dishOfTheDay = ALL_RECIPES[dayOfYear % ALL_RECIPES.length];

  return (
    <div className="space-y-10 animate-fade-in-up pb-12">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-orange-500 rounded-[2rem] shadow-2xl p-8 sm:p-12 text-white">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
          <Icons.chefHat className="w-64 h-64" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none"></div>

        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">Welcome back, Chef! <span className="inline-block animate-bounce">👋</span></h1>
          <p className="text-lg sm:text-xl text-white/90 font-medium">What culinary masterpiece are we creating today?</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  router.push(`/recipes?search=${encodeURIComponent(searchQuery)}`)
                }
              }}
              className="relative flex-1 group"
            >
              <button
                type="submit"
                className="absolute inset-y-0 left-0 pl-4 flex items-center group-hover:scale-110 transition-transform"
              >
                <Icons.search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </button>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 border-2 border-transparent rounded-2xl leading-5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white shadow-lg transition-all"
                placeholder="Search your recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Button asChild className="py-4 px-8 rounded-2xl bg-white text-primary hover:bg-white/90 font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all h-auto self-stretch">
              <Link href="/generate">
                <Icons.plus className="mr-2 h-5 w-5" />
                New Recipe
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Icons.wand2 className="w-6 h-6 text-primary" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'How to Cook', desc: 'AI dish generator', icon: Icons.chefHat, href: '/how-to-cook', color: 'from-orange-500 to-red-500' },
            { title: 'Favorites', desc: 'Your saved dishes', icon: Icons.heart, href: '/recipes', color: 'from-pink-500 to-rose-500' },
            { title: 'Generate Recipe', desc: 'Based on ingredients', icon: Icons.wand2, href: '/generate', color: 'from-purple-500 to-indigo-500' },
            { title: 'Cuisines', desc: 'Explore the globe', icon: Icons.utensils, href: '/cuisines', color: 'from-blue-500 to-cyan-500' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-border/50 hover:border-transparent hover:shadow-xl transition-all overflow-hidden flex flex-col h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 group-hover:-rotate-3 transition-transform origin-bottom-left`}>
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Link>
            )
          })}
        </div>
      </div>

      {/* AI Experiences */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Icons.wand2 className="w-6 h-6 text-primary" />
          AI Experiences
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            { title: 'Flavor Matchmaker', desc: 'Swipe right on your cravings', icon: Icons.heart, href: '/matchmaker', color: 'from-rose-400 to-rose-600' },
            { title: 'Recipe Adventure', desc: 'Choose your own recipe', icon: Icons.search, href: '/adventure', color: 'from-indigo-400 to-purple-600' },
            { title: 'Surprise Roulette', desc: 'Let fate decide your meal', icon: Icons.plus, href: '/roulette', color: 'from-amber-400 to-orange-500' },
            { title: 'AI Vision Scanner', desc: 'Turn ingredients to feasts', icon: Icons.camera, href: '/vision', color: 'from-emerald-400 to-teal-600' },
            { title: 'Global Cook-Map', desc: 'Live AI Cooking Globe', icon: Icons.globe, href: '/cook-map', color: 'from-blue-500 to-indigo-600' },
            { title: 'Chef Quests', desc: 'Level up your skills', icon: Icons.star, href: '/quests', color: 'from-amber-400 to-orange-600' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-border/50 hover:border-transparent hover:shadow-xl transition-all overflow-hidden flex flex-col md:flex-row items-center gap-6"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform origin-center flex-shrink-0`}>
                  <Icon className="h-8 w-8" />
                </div>

                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Emergency Button */}
      <div className="relative overflow-hidden bg-red-600 rounded-[2rem] shadow-2xl p-8 sm:p-12 text-white text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-2 uppercase tracking-tight flex items-center justify-center gap-3">
            <Icons.activity className="w-10 h-10 animate-pulse" /> Hangry Alarm
          </h2>
          <p className="text-red-100 text-lg sm:text-xl font-bold mb-8 max-w-lg mx-auto">
            No time. No patience. Need food NOW. Hit this button for instant 5-minute emergency recipes.
          </p>
          <Link
            href="/hangry"
            className="group relative inline-flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-red-800 rounded-full scale-100 group-hover:scale-110 shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all duration-300"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex flex-col items-center justify-center border-4 border-red-800 shadow-inner overflow-hidden active:scale-95 transition-transform cursor-pointer">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4),transparent)]"></div>
              <span className="font-black text-3xl uppercase tracking-tighter text-white drop-shadow-md">PUSH</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Dish of the Day */}
      <div className="relative overflow-hidden bg-white dark:bg-zinc-900 border border-border rounded-[2rem] shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/5 relative h-64 md:h-auto bg-primary/10 flex items-center justify-center text-6xl">
            {dishOfTheDay.image.includes('.') ? (
              <img src={dishOfTheDay.image} alt={dishOfTheDay.title} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span>{dishOfTheDay.image}</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 md:bg-gradient-to-r md:from-black/10 md:to-black/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 md:auto md:top-6 md:right-6 md:bottom-auto md:left-auto">
              <span className="px-4 py-2 bg-rose-500 text-white font-bold rounded-full shadow-lg flex items-center gap-2">
                <Icons.heart className="w-4 h-4 fill-current" /> Dish of the Day
              </span>
            </div>
          </div>

          <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-rose-500 font-bold mb-3 uppercase tracking-wider text-sm">
              <Icons.flame className="w-5 h-5" /> Trending Now
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">{dishOfTheDay.title}</h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl">
              {dishOfTheDay.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-xl text-sm font-bold text-foreground">
                <Icons.clock className="w-4 h-4 text-primary" /> {dishOfTheDay.totalTime}
              </div>
              <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-xl text-sm font-bold text-foreground">
                <Icons.chefHat className="w-4 h-4 text-primary" /> {dishOfTheDay.difficulty}
              </div>
            </div>

            <Link href={`/recipes/${dishOfTheDay.id}`} className="inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-xl group bg-gradient-to-br from-rose-500 to-orange-400 group-hover:from-rose-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-rose-200 dark:focus:ring-rose-800 transition-all hover:scale-105 active:scale-95 self-start shadow-xl">
              <span className="relative px-8 py-4 transition-all ease-in duration-75 bg-white dark:bg-zinc-900 rounded-[10px] group-hover:bg-opacity-0 font-bold text-lg flex items-center gap-2">
                Cook This Now <Icons.arrowRight className="w-5 h-5" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Recipes */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Icons.clock className="w-6 h-6 text-primary" />
            Recent Activity
          </h2>
          <Link href="/recipes" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group">
            View all <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentRecipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="group flex flex-col bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-border/50 hover:border-primary/50 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="relative aspect-video bg-secondary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                {/* Fallback pattern for mockup */}
                <div className={`absolute inset-0 ${recipe.color} pattern-dots transform group-hover:scale-105 transition-transform duration-500 flex items-center justify-center text-7xl`}>
                  {recipe.image.includes('.') ? (
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                    />
                  ) : (
                    <span>{recipe.image}</span>
                  )}
                </div>

                <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white z-20 truncate drop-shadow-md">
                  {recipe.title}
                </h3>
              </div>
              <div className="p-5 flex items-center justify-between bg-white dark:bg-zinc-900 border-t border-border/50 group-hover:bg-primary/5 transition-colors">
                <div className="flex items-center text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-full">
                    <Icons.clock className="h-4 w-4 text-primary" />
                    {recipe.prepTime}
                  </div>
                </div>
                <div className="flex items-center text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-full">
                    <Icons.utensils className="h-4 w-4 text-orange-500" />
                    {recipe.cookTime}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div >
  )
}
