'use client'

import { useEffect, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Category } from '@/types/product.types'
import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured } from '@/lib/config/env'
import { mockCategories } from '@/lib/mock-data'

export function ProductFilters({ selectedCategory, onCategoryChange, sortBy, onSortChange }: { selectedCategory: string; onCategoryChange: (value: string) => void; sortBy: string; onSortChange: (value: string) => void }) {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setCategories(mockCategories)
      return
    }

    void (async () => {
      try {
        const { data } = await createClient().from('categories').select('*').eq('is_active', true)
        setCategories((data as Category[]) ?? [])
      } catch {
        setCategories(mockCategories)
      }
    })()
  }, [])

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Button size="sm" variant={!selectedCategory ? 'default' : 'outline'} onClick={() => onCategoryChange('')}>All</Button>
        {categories.map((category) => (
          <Button key={category.id} size="sm" variant={selectedCategory === category.id ? 'default' : 'outline'} onClick={() => onCategoryChange(category.id)}>{category.name}</Button>
        ))}
      </div>
      <label className="flex items-center gap-2 rounded-full border px-3 py-2 text-sm">
        <SlidersHorizontal className="h-4 w-4" />
        <select value={sortBy} onChange={(event) => onSortChange(event.target.value)} className="bg-transparent outline-none">
          <option value="newest">Newest</option>
          <option value="price_asc">Price low to high</option>
          <option value="price_desc">Price high to low</option>
          <option value="rating">Top rated</option>
        </select>
      </label>
    </div>
  )
}
