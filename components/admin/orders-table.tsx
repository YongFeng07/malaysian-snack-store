import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils/format-price'

const orders = [
  ['ORD-2401', 'Aina Rahman', 'Paid', 86.5],
  ['ORD-2402', 'Jason Lee', 'Preparing', 42],
  ['ORD-2403', 'Farah Z', 'Pending', 118.9],
  ['ORD-2404', 'Mei Tan', 'Delivered', 64],
]

export function OrdersTable() {
  return (
    <div className="overflow-hidden rounded-2xl border">
      <table className="w-full text-sm">
        <thead className="bg-muted text-left"><tr><th className="p-4">Order</th><th className="p-4">Customer</th><th className="p-4">Status</th><th className="p-4">Total</th><th className="p-4"></th></tr></thead>
        <tbody>
          {orders.map(([id, customer, status, total]) => (
            <tr key={String(id)} className="border-t">
              <td className="p-4 font-semibold">{id}</td>
              <td className="p-4">{customer}</td>
              <td className="p-4"><Badge variant="secondary">{status}</Badge></td>
              <td className="p-4">{formatPrice(Number(total))}</td>
              <td className="p-4 text-right"><Button size="sm" variant="outline">Update</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
