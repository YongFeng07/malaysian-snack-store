import { createClient } from '@/lib/supabase/client'

export async function uploadProductImage(file: File, productId: string) {
  const path = `products/${productId}/${crypto.randomUUID()}-${file.name}`
  const supabase = createClient()
  const { data, error } = await supabase.storage.from('product-images').upload(path, file, { upsert: false })
  if (error) throw error
  const { data: publicUrl } = supabase.storage.from('product-images').getPublicUrl(data.path)
  return publicUrl.publicUrl
}
