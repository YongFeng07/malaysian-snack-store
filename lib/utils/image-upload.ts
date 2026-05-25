import { createClient } from '@/lib/supabase/client'

export async function uploadProductImage(file: File, productId: string) {
  const path = `products/${productId}/${crypto.randomUUID()}-${file.name}`
  const { data, error } = await createClient().storage.from('product-images').upload(path, file, { upsert: false })
  if (error) throw error
  return data.path
}
