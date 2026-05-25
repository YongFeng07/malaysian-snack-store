'use client'

import { CreditCard, MessageCircle, QrCode, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PaymentMethod } from '@/types/order.types'

const methods: { value: PaymentMethod; label: string; description: string; icon: typeof MessageCircle }[] = [
  { value: 'whatsapp', label: 'WhatsApp', description: 'Send order to store', icon: MessageCircle },
  { value: 'toyyibpay', label: 'ToyyibPay', description: 'FPX ready', icon: Wallet },
  { value: 'stripe', label: 'Card', description: 'Stripe ready', icon: CreditCard },
  { value: 'qr', label: 'QR Pay', description: 'Manual receipt', icon: QrCode },
]

export function PaymentMethods({ value, onChange }: { value: PaymentMethod; onChange: (value: PaymentMethod) => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {methods.map((method) => {
        const Icon = method.icon
        const active = value === method.value
        return (
          <button key={method.value} type="button" onClick={() => onChange(method.value)} className={cn('flex items-center gap-3 rounded-2xl border p-4 text-left transition', active ? 'border-foreground bg-foreground text-background' : 'hover:bg-muted')}>
            <Icon className="h-5 w-5" />
            <span>
              <span className="block font-semibold">{method.label}</span>
              <span className={cn('text-xs', active ? 'text-background/70' : 'text-muted-foreground')}>{method.description}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
