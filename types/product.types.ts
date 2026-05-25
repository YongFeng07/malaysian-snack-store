export interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
  image_url?: string | null
  is_active?: boolean
}

export interface ProductImage {
  id: string
  product_id?: string
  image_url: string
  alt_text?: string | null
  is_primary?: boolean
  display_order?: number
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compare_at_price?: number | null
  category_id?: string | null
  stock_quantity: number
  is_available: boolean
  is_featured: boolean
  weight_grams?: number | null
  ingredients?: string[] | null
  average_rating: number
  review_count: number
  categories?: Category | null
  product_images?: ProductImage[]
}
