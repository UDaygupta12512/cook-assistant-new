'use client'

import { useEffect, useState } from 'react'
import { signIn, getProviders, type ClientSafeProvider } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { Link } from '@/i18n/routing'
import { ChefHat, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, User } from 'lucide-react'

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const params = useParams<{ locale: string }>()
  const locale = params?.locale || 'en'
  const callbackUrl = `/${locale}/dashboard`
  const hasSocial = Boolean(providers?.google || providers?.github)

  useEffect(() => {
    let mounted = true
    getProviders()
      .then((p) => {
        if (mounted) setProviders(p)
      })
      .catch(() => {
        if (mounted) setProviders(null)
      })
    return () => {
      mounted = false
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data?.error || 'Unable to create account')
        return
      }

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl,
      })
      if (result?.error) {
        setError('Account created, but sign-in failed. Please sign in.')
        router.push(`/${locale}/signin`)
        return
      }
      router.push(callbackUrl)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithProvider = async (provider: 'google' | 'github') => {
    setIsLoading(true)
    try {
      await signIn(provider, { callbackUrl })
    } catch (error) {
      setError('Failed to sign in with provider')
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-500 text-white shadow-lg mb-4">
            <ChefHat className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground">Create your account</h1>
          <p className="mt-2 text-muted-foreground">Start saving recipes and building your meal plans.</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-border p-8">
          {error && (
            <div className="mb-6 rounded-xl bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium text-red-700 dark:text-red-400">{error}</p>
              </div>
            </div>
          )}

          {hasSocial && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {providers?.google && (
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => signInWithProvider('google')}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-white dark:bg-zinc-800 text-foreground font-medium hover:bg-secondary/50 transition-all disabled:opacity-50 shadow-sm hover:shadow"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span className="text-sm">Google</span>}
                </button>
              )}
              {providers?.github && (
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => signInWithProvider('github')}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-white dark:bg-zinc-800 text-foreground font-medium hover:bg-secondary/50 transition-all disabled:opacity-50 shadow-sm hover:shadow"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span className="text-sm">GitHub</span>}
                </button>
              )}
            </div>
          )}

          {hasSocial && (
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-zinc-900 px-3 text-muted-foreground">or sign up with email</span>
              </div>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Chef Udaya"
                  className="w-full bg-secondary/30 border border-border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chef@example.com"
                  className="w-full bg-secondary/30 border border-border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full bg-secondary/30 border border-border rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Use 8+ characters. Don’t reuse passwords from other sites.</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full bg-secondary/30 border border-border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-orange-500 text-white py-3 rounded-xl font-bold hover:from-primary/90 hover:to-orange-500/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Create account
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/signin" className="font-semibold text-primary hover:text-primary/80 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
