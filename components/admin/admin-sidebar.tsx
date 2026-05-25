import Link from 'next/link'
import { BadgePercent, Boxes, LayoutDashboard, ReceiptText, Users } from 'lucide-react'

const links = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Boxes },
  { href: '/admin/orders', label: 'Orders', icon: ReceiptText },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/coupons', label: 'Coupons', icon: BadgePercent },
]

export function AdminSidebar() {
  return (
    <aside className="rounded-2xl border bg-card p-3 lg:sticky lg:top-24 lg:h-fit">
      <p className="px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Admin</p>
      <nav className="grid gap-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
