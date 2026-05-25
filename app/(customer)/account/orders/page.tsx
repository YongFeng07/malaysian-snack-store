import { EmptyState } from '@/components/shared/empty-state'

export default function OrdersPage() {
  return <EmptyState title="No orders yet" description="Your paid and WhatsApp orders will appear here once Supabase is connected." actionHref="/products" actionLabel="Start an order" />
}
