import { createBrowserClient } from '@supabase/ssr'
import { supabaseAnonKey, supabaseUrl } from '@/lib/config/env'

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
