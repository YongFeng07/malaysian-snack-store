'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart-store'
import { CheckoutForm } from '@/components/checkout/checkout-form'
import { OrderSummary } from '@/components/checkout/order-summary'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { CheckoutInput } from '@/lib/validations/order'
import { generateWhatsAppMessage } from '@/lib/utils/generate-whatsapp-message'
import { isSupabaseConfigured } from '@/lib/config/env'
import { EmptyState } from '@/components/shared/empty-state'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  if (items.length === 0) {
    return <EmptyState title="Your cart is empty" description="Add a few snack drops before checkout." actionHref="/products" actionLabel="Shop snacks" />
  }

  const subtotal = getTotalPrice()
  const deliveryFee = subtotal > 50 ? 0 : 8
  const tax = subtotal * 0.06
  const total = subtotal + deliveryFee + tax

  const handleSubmit = async (formData: CheckoutInput) => {
    setIsProcessing(true)
    
    try {
      if (!isSupabaseConfigured()) {
        const message = generateWhatsAppMessage({
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          deliveryAddress: formData.deliveryAddress,
          deliveryNotes: formData.deliveryNotes,
          items,
          subtotal,
          deliveryFee,
          tax,
          total,
        })
        clearCart()
        if (formData.paymentMethod === 'whatsapp') {
          window.location.href = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '60123456789'}?text=${encodeURIComponent(message)}`
          return
        }
        toast.success('Demo order placed. Connect Supabase to persist orders.')
        router.push('/account/orders')
        return
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items,
        }),
      })
      const result = await response.json()

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Unable to create order')
      }

      const order = result.data.order
      
      // Clear cart
      clearCart()
      
      // Process payment based on method
      if (formData.paymentMethod === 'whatsapp') {
        const message = generateWhatsAppMessage({
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          deliveryAddress: formData.deliveryAddress,
          deliveryNotes: formData.deliveryNotes,
          items,
          subtotal,
          deliveryFee,
          tax,
          total,
        })
        window.location.href = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '60123456789'}?text=${encodeURIComponent(message)}`
      } else if (formData.paymentMethod === 'stripe') {
        // Redirect to Stripe checkout
        const response = await fetch('/api/payments/stripe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: order.id })
        })
        const { url } = await response.json()
        window.location.href = url
      } else if (formData.paymentMethod === 'toyyibpay') {
        // Redirect to ToyyibPay
        const response = await fetch('/api/payments/toyyibpay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: order.id })
        })
        const { url } = await response.json()
        window.location.href = url
      } else {
        // Cash or QR payment
        toast.success('Order placed successfully!')
        router.push(`/account/orders`)
      }
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to process order. Please try again.'
      console.error('Checkout error:', message, error)
      toast.error(message)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CheckoutForm onSubmit={handleSubmit} isProcessing={isProcessing} />
            </div>
            <div>
              <OrderSummary
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                tax={tax}
                total={total}
                items={items}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
