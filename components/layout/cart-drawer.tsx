'use client'

import * as React from 'react'
import { useCartStore } from '@/store/cart-store'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { CartItem } from '@/components/cart/cart-item'
import { CartSummary } from '@/components/cart/cart-summary'
import { ShoppingBag, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function CartDrawer() {
  const { isOpen, closeCart, items, getTotalItems, getTotalPrice } = useCartStore()
  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-50">
          <motion.button aria-label="Close cart" className="absolute inset-0 bg-black/45 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} />
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 26, stiffness: 260 }} className="absolute bottom-0 right-0 top-0 w-full max-w-md outline-none">
          <div className="flex h-full flex-col bg-background shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <h2 className="font-semibold text-lg">Your Cart</h2>
                <span className="text-sm text-muted-foreground">
                  ({totalItems} items)
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={closeCart} className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <ScrollArea className="flex-1 p-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                      <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-4">
                      Looks like you haven't added any items yet
                    </p>
                    <Button onClick={closeCart} asChild>
                      <Link href="/products">Start Shopping</Link>
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </ScrollArea>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <Separator />
                <CartSummary subtotal={totalPrice} />
                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout" onClick={closeCart}>
                    Checkout
                  </Link>
                </Button>
              </div>
            )}
          </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
