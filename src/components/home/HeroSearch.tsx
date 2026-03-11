'use client'

import { useState } from 'react'
import { useRouter } from '@/i18n/routing'
import { Search } from 'lucide-react'

export function HeroSearch({ placeholder, buttonText }: { placeholder: string, buttonText: string }) {
    const [query, setQuery] = useState('')
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/recipes?search=${encodeURIComponent(query)}`)
        }
    }

    return (
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-600 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative flex items-center bg-white dark:bg-zinc-900 rounded-full shadow-lg border border-border p-2">
                <button type="submit" className="p-2 -ml-1 text-muted-foreground hover:text-primary transition-colors">
                    <Search className="w-5 h-5" />
                </button>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent border-none px-4 py-2 focus:outline-none text-foreground placeholder:text-muted-foreground"
                />
                <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-all">
                    {buttonText}
                </button>
            </div>
        </form>
    )
}
