import { mockProducts } from '@/lib/mock-data'

export function TopProducts() {
  return (
    <div className="space-y-3">
      {mockProducts.slice(0, 5).map((product, index) => (
        <div key={product.id} className="flex items-center justify-between rounded-xl border p-3">
          <div>
            <p className="font-semibold">{product.name}</p>
            <p className="text-sm text-muted-foreground">{product.categories?.name}</p>
          </div>
          <span className="text-sm font-bold">#{index + 1}</span>
        </div>
      ))}
    </div>
  )
}
