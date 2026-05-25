'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PaymentMethods } from '@/components/checkout/payment-methods'
import { CheckoutInput, checkoutSchema } from '@/lib/validations/order'

export function CheckoutForm({ onSubmit, isProcessing }: { onSubmit: (data: CheckoutInput) => void; isProcessing: boolean }) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: 'whatsapp' },
  })

  const paymentMethod = watch('paymentMethod')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Delivery Details</CardTitle></CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Input placeholder="Full name" {...register('customerName')} />
            {errors.customerName ? <p className="text-sm text-destructive">{errors.customerName.message}</p> : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Input placeholder="Phone number" {...register('customerPhone')} />
              {errors.customerPhone ? <p className="text-sm text-destructive">{errors.customerPhone.message}</p> : null}
            </div>
            <Input placeholder="Email address" {...register('customerEmail')} />
          </div>
          <div className="grid gap-2">
            <Input placeholder="Delivery address" {...register('deliveryAddress')} />
            {errors.deliveryAddress ? <p className="text-sm text-destructive">{errors.deliveryAddress.message}</p> : null}
          </div>
          <Input placeholder="Delivery notes, gate code, preferred time" {...register('deliveryNotes')} />
          <Input placeholder="Coupon code" {...register('couponCode')} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
        <CardContent>
          <PaymentMethods value={paymentMethod} onChange={(value) => setValue('paymentMethod', value)} />
        </CardContent>
      </Card>
      <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
        {isProcessing ? 'Processing order...' : 'Place order'}
      </Button>
    </form>
  )
}
