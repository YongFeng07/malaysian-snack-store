import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils/format-price'

const orders = [
  ['ORD-2401', 'Aina Rahman', 86.5, 'paid'],
  ['ORD-2402', 'Jason Lee', 42.0, 'preparing'],
  ['ORD-2403', 'Farah Z', 118.9, 'pending'],
]

export function RecentOrders() {
  return (
    <div className="space-y-3">
      {orders.map(([id, name, total, status]) => (
        <div key={String(id)} className="flex items-center justify-between rounded-xl border p-3">
          <div>
            <p className="font-semibold">{id}</p>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{formatPrice(Number(total))}</p>
            <Badge variant="secondary">{status}</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
