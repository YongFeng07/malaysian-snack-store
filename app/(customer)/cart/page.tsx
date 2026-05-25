'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CartItem } from '@/components/cart/cart-item'
import { CartSummary } from '@/components/cart/cart-summary'
import { EmptyState } from '@/components/shared/empty-state'
import { useCartStore } from '@/store/cart-store'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.getTotalPrice())

  if (!items.length) return <EmptyState title="Your cart is empty" description="Build a snack box from the catalog." actionHref="/products" actionLabel="Shop snacks" />

  return (
    <div className="container grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="mb-6 font-jakarta text-4xl font-black">Cart</h1>
        <div className="space-y-4">{items.map((item) => <CartItem key={item.id} item={item} />)}</div>
      </div>
      <div className="rounded-2xl border bg-card p-5">
        <CartSummary subtotal={total} />
        <Button asChild className="mt-6 w-full"><Link href="/checkout">Checkout</Link></Button>
      </div>
    </div>
  )
}
