export function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return Boolean(url?.startsWith('https://') && key && !key.startsWith('your_'))
}

export const supabaseUrl = isSupabaseConfigured() ? process.env.NEXT_PUBLIC_SUPABASE_URL! : 'https://placeholder.supabase.co'
export const supabaseAnonKey = isSupabaseConfigured() ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! : 'placeholder-anon-key'
