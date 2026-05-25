'use client'

import Link from 'next/link'
import { Moon, Search, ShoppingBag, Sun, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cart-store'
import { useScroll } from '@/hooks/use-scroll'
import { cn } from '@/lib/utils'

const links = [
  { href: '/products', label: 'Shop' },
  { href: '/account/orders', label: 'Orders' },
  { href: '/admin/dashboard', label: 'Admin' },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const scrolled = useScroll(12)
  const totalItems = useCartStore((state) => state.getTotalItems())
  const openCart = useCartStore((state) => state.openCart)

  return (
    <header className={cn('fixed inset-x-0 top-0 z-40 border-b transition-all', scrolled ? 'border-border bg-background/85 shadow-sm backdrop-blur-xl' : 'border-transparent bg-background/60 backdrop-blur-md')}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-jakarta text-lg font-black tracking-[0.18em]">
          RASA.CLUB
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Account" asChild>
            <Link href="/account">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Cart" className="relative" onClick={openCart}>
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 ? <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center px-1 text-[10px]">{totalItems}</Badge> : null}
          </Button>
        </div>
      </div>
    </header>
  )
}
