import { OrdersTable } from '@/components/admin/orders-table'

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-jakarta text-3xl font-black">Orders</h1>
        <p className="text-muted-foreground">View orders and move them from pending to delivered.</p>
      </div>
      <OrdersTable />
    </div>
  )
}
