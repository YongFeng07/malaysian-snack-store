'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CartItem as CartItemType, useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils/format-price'

export function CartItem({ item }: { item: CartItemType }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  return (
    <div className="flex gap-4 rounded-2xl border bg-card p-3">
      <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-muted">
        {item.image ? <Image src={item.image} alt={item.name} fill className="object-cover" /> : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{item.name}</p>
        <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center rounded-full border">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => removeItem(item.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
