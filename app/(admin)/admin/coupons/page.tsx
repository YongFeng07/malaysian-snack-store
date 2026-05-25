import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const coupons = [
  ['FIRSTDROP', '15% off first order', 'percentage'],
  ['FREESHIP60', 'Free delivery over RM60', 'fixed'],
  ['RAYA10', 'RM10 off gift sets', 'fixed'],
]

export default function AdminCouponsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-jakarta text-3xl font-black">Coupons</h1>
          <p className="text-muted-foreground">Create percentage and fixed amount promotions.</p>
        </div>
        <Button><Plus className="h-4 w-4" /> New coupon</Button>
      </div>
      <div className="grid gap-4">
        {coupons.map(([code, description, type]) => (
          <Card key={code}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="font-bold tracking-[0.12em]">{code}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <Badge variant="secondary">{type}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
