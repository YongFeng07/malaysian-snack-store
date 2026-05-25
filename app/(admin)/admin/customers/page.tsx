import { Card, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'

const customers = ['Aina Rahman', 'Jason Lee', 'Farah Zain', 'Mei Tan']

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-jakarta text-3xl font-black">Customers</h1>
        <p className="text-muted-foreground">Customer profiles, order value, and loyalty points.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {customers.map((customer, index) => (
          <Card key={customer}>
            <CardContent className="flex items-center gap-4 p-5">
              <Avatar name={customer} />
              <div>
                <p className="font-semibold">{customer}</p>
                <p className="text-sm text-muted-foreground">{120 + index * 35} loyalty points</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
