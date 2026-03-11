'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/icons'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitted(true)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">Reset Password</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your email and we'll send you a link to reset your password.
                    </p>
                </div>

                {isSubmitted ? (
                    <div className="bg-green-50 p-6 rounded-2xl text-center">
                        <Icons.checkCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-green-800">Check your email</h3>
                        <p className="text-green-700 mt-2">We've sent a password reset link to {email}</p>
                        <Link href="/signin">
                            <Button className="mt-6 w-full">Return to Sign In</Button>
                        </Link>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <Button type="submit" className="w-full">Send Reset Link</Button>
                        <div className="text-center">
                            <Link href="/signin" className="text-sm font-medium text-primary hover:text-primary/80">
                                Back to Sign In
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
