import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CartItem } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils/format-price'

export function OrderSummary({ subtotal, deliveryFee, tax, total, items }: { subtotal: number; deliveryFee: number; tax: number; total: number; items: CartItem[] }) {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-muted">
                {item.image ? <Image src={item.image} alt={item.name} fill className="object-cover" /> : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2 border-t pt-4 text-sm">
          <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>{deliveryFee ? formatPrice(deliveryFee) : 'Free'}</span></div>
          <div className="flex justify-between text-muted-foreground"><span>SST estimate</span><span>{formatPrice(tax)}</span></div>
          <div className="flex justify-between pt-2 text-lg font-bold"><span>Total</span><span>{formatPrice(total)}</span></div>
        </div>
      </CardContent>
    </Card>
  )
}
