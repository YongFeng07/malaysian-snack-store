import Link from 'next/link'
import { Package, UserRound, Heart, Gift } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const links = [
  { href: '/account/orders', title: 'Order history', icon: Package },
  { href: '/products', title: 'Wishlist', icon: Heart },
  { href: '/products', title: 'Loyalty points', icon: Gift },
  { href: '/login', title: 'Profile settings', icon: UserRound },
]

export default function AccountPage() {
  return (
    <div className="container py-10">
      <h1 className="font-jakarta text-4xl font-black">Account</h1>
      <p className="mt-2 text-muted-foreground">Track orders, rewards, saved snacks, and delivery details.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {links.map(({ href, title, icon: Icon }) => (
          <Link key={title} href={href}>
            <Card className="transition hover:-translate-y-1 hover:shadow-lg">
              <CardHeader><Icon className="h-6 w-6" /></CardHeader>
              <CardContent><CardTitle className="text-lg">{title}</CardTitle></CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
