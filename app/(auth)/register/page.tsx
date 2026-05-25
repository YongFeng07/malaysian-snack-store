'use client'

import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured } from '@/lib/config/env'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    const form = new FormData(event.currentTarget)

    try {
      if (!isSupabaseConfigured()) {
        toast.success('Demo account created. Connect Supabase for real auth.')
        return
      }
      const { error } = await createClient().auth.signUp({
        email: String(form.get('email')),
        password: String(form.get('password')),
        options: { data: { full_name: String(form.get('fullName')), phone_number: String(form.get('phone')) } },
      })
      if (error) throw error
      toast.success('Check your email to confirm your account')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to register')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-jakarta text-3xl font-black">Create account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <Input name="fullName" placeholder="Full name" required />
          <Input name="phone" placeholder="Phone number" />
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" required minLength={6} />
          <Button className="w-full" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</Button>
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="text-foreground underline">Log in</Link>
        </p>
      </CardContent>
    </Card>
  )
}
