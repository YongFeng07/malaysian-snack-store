import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  compare_at_price: z.coerce.number().positive().optional(),
  category_id: z.string().uuid().optional(),
  stock_quantity: z.coerce.number().int().min(0),
  is_available: z.boolean().default(true),
  is_featured: z.boolean().default(false),
})
