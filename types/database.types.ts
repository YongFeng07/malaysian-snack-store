export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      categories: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      products: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      product_images: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      carts: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      cart_items: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      orders: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      order_items: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      payments: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      coupons: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      reviews: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      wishlists: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
