'use client'

import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ProductQuantity({ value, onChange, max = 99 }: { value: number; onChange: (value: number) => void; max?: number }) {
  return (
    <div className="inline-flex items-center rounded-full border">
      <Button type="button" variant="ghost" size="icon" onClick={() => onChange(Math.max(1, value - 1))}><Minus className="h-4 w-4" /></Button>
      <span className="w-10 text-center font-semibold">{value}</span>
      <Button type="button" variant="ghost" size="icon" onClick={() => onChange(Math.min(max, value + 1))}><Plus className="h-4 w-4" /></Button>
    </div>
  )
}
