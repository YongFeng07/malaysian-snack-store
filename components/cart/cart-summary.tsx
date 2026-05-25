import { formatPrice } from '@/lib/utils/format-price'

export function CartSummary({ subtotal }: { subtotal: number }) {
  const delivery = subtotal > 60 || subtotal === 0 ? 0 : 7
  const total = subtotal + delivery

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between text-muted-foreground">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-muted-foreground">
        <span>Delivery</span>
        <span>{delivery === 0 ? 'Free' : formatPrice(delivery)}</span>
      </div>
      <div className="flex justify-between border-t pt-3 text-base font-bold">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  )
}
