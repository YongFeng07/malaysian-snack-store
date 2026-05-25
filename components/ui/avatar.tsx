import { User } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Avatar({ src, name, className }: { src?: string | null; name?: string | null; className?: string }) {
  return (
    <div className={cn('flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted', className)}>
      {src ? <img src={src} alt={name ?? 'Avatar'} className="h-full w-full object-cover" /> : <User className="h-5 w-5" />}
    </div>
  )
}
