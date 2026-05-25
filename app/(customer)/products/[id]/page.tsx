'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { notFound, useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProductGrid } from '@/components/products/product-grid'
import { ProductQuantity } from '@/components/products/product-quantity'
import { mockProducts } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils/format-price'
import { useCartStore } from '@/store/cart-store'

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>()
  const product = useMemo(() => mockProducts.find((item) => item.slug === params.id || item.id === params.id), [params.id])
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  if (!product) return notFound()

  const image = product.product_images?.[0]?.image_url ?? ''
  const related = mockProducts.filter((item) => item.category_id === product.category_id && item.id !== product.id).slice(0, 4)

  return (
    <div className="container py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
          {image ? <Image src={image} alt={product.name} fill priority className="object-cover" /> : null}
        </div>
        <div className="flex flex-col justify-center">
          <Badge className="mb-4 w-fit">{product.categories?.name}</Badge>
          <h1 className="font-jakarta text-4xl font-black md:text-6xl">{product.name}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{product.description}</p>
          <div className="mt-6 flex items-end gap-3">
            <span className="text-3xl font-black">{formatPrice(product.price)}</span>
            {product.compare_at_price ? <span className="text-muted-foreground line-through">{formatPrice(product.compare_at_price)}</span> : null}
          </div>
          <div className="mt-8 flex items-center gap-4">
            <ProductQuantity value={quantity} onChange={setQuantity} max={product.stock_quantity} />
            <Button size="lg" onClick={() => { addItem({ id: product.id, name: product.name, price: product.price, quantity, image }); toast.success('Added to cart') }}>Add to cart</Button>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            <div className="rounded-2xl border p-4">Stock: {product.stock_quantity}</div>
            <div className="rounded-2xl border p-4">Rating: {product.average_rating}/5</div>
            <div className="rounded-2xl border p-4">Fast KL delivery</div>
          </div>
        </div>
      </div>
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Related drops</h2>
        <ProductGrid products={related} />
      </section>
    </div>
  )
}
