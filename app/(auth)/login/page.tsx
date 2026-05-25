'use client'

import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Chrome } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured } from '@/lib/config/env'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    const form = new FormData(event.currentTarget)

    try {
      if (!isSupabaseConfigured()) {
        toast.success('Demo login enabled. Connect Supabase for real auth.')
        return
      }
      const { error } = await createClient().auth.signInWithPassword({ email: String(form.get('email')), password: String(form.get('password')) })
      if (error) throw error
      toast.success('Welcome back')
      window.location.href = '/account'
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to login')
    } finally {
      setLoading(false)
    }
  }

  async function googleLogin() {
    if (!isSupabaseConfigured()) {
      toast.success('Connect Supabase to enable Google login.')
      return
    }
    await createClient().auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${location.origin}/account` } })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-jakarta text-3xl font-black">Log in</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" required />
          <Button className="w-full" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</Button>
          <Button type="button" variant="outline" className="w-full" onClick={googleLogin}><Chrome className="h-4 w-4" /> Continue with Google</Button>
        </form>
        <div className="mt-5 flex justify-between text-sm text-muted-foreground">
          <Link href="/register">Create account</Link>
          <Link href="/login">Forgot password?</Link>
        </div>
      </CardContent>
    </Card>
  )
}
