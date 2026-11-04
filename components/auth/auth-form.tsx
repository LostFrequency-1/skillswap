'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Logo } from '@/components/shared/logo'

interface AuthFormProps { mode: 'login' | 'register' }

export function AuthForm({ mode }: AuthFormProps) {
  const isRegister = mode === 'register'
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') || '').trim()
    const password = String(form.get('password') || '')
    const name = String(form.get('name') || '').trim()

    if (isRegister && name.length < 2) return setError('Please enter your full name.')
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Enter a valid email address.')
    if (password.length < 8) return setError('Password must be at least 8 characters.')

    setIsSubmitting(true)
    window.setTimeout(() => {
      localStorage.setItem('skillswap-demo-user', JSON.stringify({ email, name: name || 'Arjun Verma' }))
      toast.success(isRegister ? 'Account created' : 'Welcome back', { description: 'Taking you to your SkillSwap workspace.' })
      window.location.href = isRegister ? '/onboarding' : '/dashboard'
    }, 450)
  }

  return (
    <main className="grid min-h-svh lg:grid-cols-[minmax(0,1fr)_440px]">
      <section className="relative hidden overflow-hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="relative flex flex-col gap-16">
          <Logo href="/" className="text-primary-foreground" />
          <div className="max-w-lg">
            <p className="mb-4 text-sm font-medium text-primary-foreground/70">Learn in both directions</p>
            <h1 className="text-5xl font-semibold tracking-tight text-balance">Your next skill is closer than you think.</h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-primary-foreground/75">
              Swap knowledge with peers, build proof of what you know, and find a learning rhythm that fits your life.
            </p>
          </div>
        </div>
        <div className="relative flex items-center gap-3 text-sm text-primary-foreground/75">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/15"><LockKeyhole className="size-4" /></span>
          Your data stays yours. This is a frontend demo with mock authentication.
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-8 bg-background p-6 sm:p-10">
        <div className="lg:hidden"><Logo href="/" /></div>
        <Card className="w-full max-w-md border-0 shadow-none sm:border sm:shadow-sm">
          <CardHeader className="gap-2">
            <CardTitle className="text-2xl">{isRegister ? 'Create your account' : 'Welcome back'}</CardTitle>
            <CardDescription>
              {isRegister ? 'Start your first skill exchange in a few minutes.' : 'Sign in to continue learning and teaching.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {isRegister && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Full name</Label>
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="name" name="name" placeholder="Arjun Verma" className="pl-9" autoComplete="name" />
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" name="email" type="email" placeholder="you@example.com" className="pl-9" autoComplete="email" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between"><Label htmlFor="password">Password</Label>{!isRegister && <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline">Forgot password?</Link>}</div>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="At least 8 characters" className="pr-10 pl-9" autoComplete={isRegister ? 'new-password' : 'current-password'} />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground">{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button>
                </div>
              </div>
              {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}<ArrowRight data-icon="inline-end" /></Button>
            </form>
            <div className="my-5 flex items-center gap-3"><Separator className="flex-1" /><span className="text-xs text-muted-foreground">demo mode</span><Separator className="flex-1" /></div>
            <p className="text-center text-xs text-muted-foreground">Use any valid email and an 8+ character password. No real account is created.</p>
          </CardContent>
          <CardFooter className="justify-center border-t pt-5 text-sm text-muted-foreground">
            {isRegister ? 'Already have an account?' : 'New to SkillSwap?'}{' '}
            <Link href={isRegister ? '/login' : '/register'} className="ml-1 font-medium text-primary hover:underline">{isRegister ? 'Log in' : 'Create an account'}</Link>
          </CardFooter>
        </Card>
        <p className="max-w-md text-center text-xs text-muted-foreground">By continuing, you agree to SkillSwap&apos;s demo terms and acknowledge this prototype does not store real credentials.</p>
      </section>
    </main>
  )
}
