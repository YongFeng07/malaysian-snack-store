import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="font-jakarta text-lg font-black tracking-[0.18em]">RASA.CLUB</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">Premium Malaysian snack drops for TikTok cravings, office pantries, gift boxes, and midnight orders.</p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold">Shop</p>
          <div className="grid gap-2 text-muted-foreground">
            <Link href="/products">Catalog</Link>
            <Link href="/checkout">Checkout</Link>
            <Link href="/account/orders">Track order</Link>
          </div>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold">Business</p>
          <div className="grid gap-2 text-muted-foreground">
            <Link href="/admin/dashboard">Admin dashboard</Link>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
