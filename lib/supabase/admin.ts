import { createClient } from '@supabase/supabase-js'
import { supabaseUrl } from '@/lib/config/env'

export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key || key.startsWith('your_')) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured')
  }
  return createClient(supabaseUrl, key, { auth: { persistSession: false } })
}
