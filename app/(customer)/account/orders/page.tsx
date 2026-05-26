'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { EmptyState } from '@/components/shared/empty-state'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured } from '@/lib/config/env'
import { formatPrice } from '@/lib/utils/format-price'
import { Order } from '@/types/order.types'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadOrders() {
      if (!isSupabaseConfigured()) {
        setLoading(false)
        return
      }

      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          setLoading(false)
          return
        }

        const { data } = await supabase
          .from('orders')
          .select('id, order_number, customer_name, customer_phone, delivery_address, total_amount, status, payment_status, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        setOrders((data as Order[]) ?? [])
      } finally {
        setLoading(false)
      }
    }

    void loadOrders()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!orders.length) {
    return <EmptyState title="No orders yet" description="Your orders will appear here after checkout." actionHref="/products" actionLabel="Start an order" />
  }

  return (
    <div className="container py-10">
      <h1 className="font-jakarta text-4xl font-black">Orders</h1>
      <div className="mt-8 grid gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold">{order.order_number}</p>
                <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleString('en-MY')}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{order.status}</Badge>
                <span className="font-bold">{formatPrice(order.total_amount)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
