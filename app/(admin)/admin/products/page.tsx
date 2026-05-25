import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductsTable } from '@/components/admin/products-table'

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-jakarta text-3xl font-black">Products</h1>
          <p className="text-muted-foreground">Create drops, edit inventory, upload images, and manage categories.</p>
        </div>
        <Button><Plus className="h-4 w-4" /> New product</Button>
      </div>
      <ProductsTable />
    </div>
  )
}
