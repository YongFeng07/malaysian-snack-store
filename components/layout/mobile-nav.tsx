'use client'

import Link from 'next/link'
import { Home, LayoutDashboard, PackageSearch, ReceiptText, ShoppingBag } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store/cart-store'
import { cn } from '@/lib/utils'

const items = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/products', label: 'Shop', icon: PackageSearch },
  { href: '/account/orders', label: 'Orders', icon: ReceiptText },
  { href: '/admin/dashboard', label: 'Admin', icon: LayoutDashboard },
]

export function MobileNav() {
  const pathname = usePathname()
  const openCart = useCartStore((state) => state.openCart)
  const totalItems = useCartStore((state) => state.getTotalItems())

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 rounded-full border border-border bg-background/90 px-2 py-2 shadow-2xl backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-5 items-center">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} className={cn('flex flex-col items-center gap-1 rounded-full px-2 py-1.5 text-[10px] font-medium text-muted-foreground', active && 'bg-foreground text-background')}>
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          )
        })}
        <button onClick={openCart} className="relative flex flex-col items-center gap-1 rounded-full px-2 py-1.5 text-[10px] font-medium text-muted-foreground">
          <ShoppingBag className="h-4 w-4" />
          Cart
          {totalItems > 0 ? <span className="absolute right-3 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] text-background">{totalItems}</span> : null}
        </button>
      </div>
    </div>
  )
}
