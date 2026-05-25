import { Category, Product } from '@/types/product.types'

export const mockCategories: Category[] = [
  { id: 'cat-crisps', name: 'Crisps', slug: 'crisps', description: 'Crunchy snack drops', is_active: true },
  { id: 'cat-kuih', name: 'Kuih', slug: 'kuih', description: 'Modern kuih boxes', is_active: true },
  { id: 'cat-spicy', name: 'Spicy', slug: 'spicy', description: 'Sambal heat', is_active: true },
  { id: 'cat-gifts', name: 'Gift Sets', slug: 'gift-sets', description: 'Snack bundles', is_active: true },
]

const images = [
  'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=900&auto=format&fit=crop',
]

export const mockProducts: Product[] = [
  ['Sambal Crunch Cassava', 'crisps', 'Thin cassava chips finished with smoky sambal dust.', 14.9, 18.9],
  ['Kopi Butter Muruku', 'crisps', 'Classic muruku with a roasted kopi butter glaze.', 12.5, null],
  ['Pandan Kuih Box', 'kuih', 'A chilled six-piece kuih box with pandan, coconut, and gula melaka.', 28, null],
  ['Dodol Bites Black Label', 'gift-sets', 'Soft dodol cubes wrapped for gifting and office snacking.', 22, 26],
  ['Ghost Pepper Keropok', 'spicy', 'Airy fish crackers with a serious late-night chilli kick.', 16.5, null],
  ['Raya Snack Flight', 'gift-sets', 'Four mini packs for discovery, gifting, and sharing.', 39, 45],
].map(([name, categorySlug, description, price, compare], index) => {
  const category = mockCategories.find((item) => item.slug === categorySlug)!
  const slug = String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  return {
    id: `prod-${index + 1}`,
    name: String(name),
    slug,
    description: String(description),
    price: Number(price),
    compare_at_price: compare ? Number(compare) : null,
    category_id: category.id,
    stock_quantity: 30 - index,
    is_available: true,
    is_featured: index < 4,
    average_rating: 4.7 + (index % 3) / 10,
    review_count: 18 + index * 7,
    categories: category,
    product_images: [{ id: `img-${index + 1}`, image_url: images[index], alt_text: String(name), is_primary: true, display_order: 0 }],
  }
})
