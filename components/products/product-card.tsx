'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Product } from '@/types/product.types'
import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils/format-price'

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const [isLoading, setIsLoading] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const primaryImage = product.product_images?.find((image) => image.is_primary) ?? product.product_images?.[0]
  const hasDiscount = Boolean(product.compare_at_price && product.compare_at_price > product.price)

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setIsLoading(true)
    addItem({ id: product.id, name: product.name, price: product.price, quantity: 1, image: primaryImage?.image_url ?? '' })
    toast.success('Added to cart')
    setTimeout(() => setIsLoading(false), 250)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} whileHover={{ y: -6 }} className="group">
      <Link href={`/products/${product.slug}`} className="block overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {primaryImage ? <Image src={primaryImage.image_url} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No image</div>}
          <div className="absolute left-3 top-3 flex gap-2">
            {hasDiscount ? <Badge variant="destructive">Drop price</Badge> : null}
            {!product.is_available ? <Badge variant="secondary">Sold out</Badge> : null}
          </div>
          <Button size="icon" variant="ghost" className="absolute right-3 top-3 bg-white/80 text-black backdrop-blur hover:bg-white" onClick={(event) => { event.preventDefault(); toast.success('Saved to wishlist') }}>
            <Heart className="h-4 w-4" />
          </Button>
          <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
            <Button className="w-full bg-white text-black hover:bg-white/90" disabled={!product.is_available || isLoading} onClick={handleAddToCart}>
              <ShoppingBag className="h-4 w-4" />
              {isLoading ? 'Adding' : 'Add to cart'}
            </Button>
          </div>
        </div>
        <div className="p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{product.categories?.name ?? 'Snack drop'}</p>
          <h3 className="line-clamp-1 text-lg font-bold">{product.name}</h3>
          <p className="mt-2 line-clamp-2 min-h-10 text-sm text-muted-foreground">{product.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold">{formatPrice(product.price)}</span>
              {hasDiscount ? <span className="text-sm text-muted-foreground line-through">{formatPrice(product.compare_at_price)}</span> : null}
            </div>
            {product.average_rating > 0 ? <span className="text-sm text-muted-foreground"><span className="text-yellow-500">★</span> {product.average_rating}</span> : null}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
