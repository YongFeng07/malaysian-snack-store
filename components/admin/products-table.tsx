import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockProducts } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils/format-price'

export function ProductsTable() {
  return (
    <div className="overflow-hidden rounded-2xl border">
      <table className="w-full text-sm">
        <thead className="bg-muted text-left">
          <tr><th className="p-4">Product</th><th className="p-4">Category</th><th className="p-4">Price</th><th className="p-4">Stock</th><th className="p-4"></th></tr>
        </thead>
        <tbody>
          {mockProducts.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-4 font-semibold">{product.name}</td>
              <td className="p-4"><Badge variant="secondary">{product.categories?.name}</Badge></td>
              <td className="p-4">{formatPrice(product.price)}</td>
              <td className="p-4">{product.stock_quantity}</td>
              <td className="p-4 text-right"><Button size="sm" variant="outline">Edit</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
