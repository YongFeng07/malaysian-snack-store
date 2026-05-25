'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search sambal crisps, kuih, keropok..." className="h-14 rounded-2xl pl-12" />
    </div>
  )
}
