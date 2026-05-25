import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Navbar } from '@/components/layout/navbar'
import { MobileNav } from '@/components/layout/mobile-nav'
import { CartDrawer } from '@/components/layout/cart-drawer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata: Metadata = {
  title: {
    default: 'Malaysian Snack Store | Premium Local Snacks',
    template: '%s | Malaysian Snack Store'
  },
  description: 'Discover the finest Malaysian snacks delivered to your doorstep. Premium quality, authentic flavors, fast delivery.',
  keywords: 'malaysian snacks, local snacks, traditional snacks, malaysian food, snack delivery',
  authors: [{ name: 'Malaysian Snack Store' }],
  openGraph: {
    title: 'Malaysian Snack Store',
    description: 'Premium Malaysian snacks delivered to your doorstep',
    url: 'https://malaysiansnackstore.com',
    siteName: 'Malaysian Snack Store',
    images: [
      {
        url: 'https://malaysiansnackstore.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malaysian Snack Store',
    description: 'Premium Malaysian snacks delivered to your doorstep',
    images: ['https://malaysiansnackstore.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen pt-16 pb-20 md:pb-0">
            {children}
          </main>
          <MobileNav />
          <CartDrawer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}