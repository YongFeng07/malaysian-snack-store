import { cn } from '@/lib/utils'

export function ScrollArea({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('overflow-y-auto', className)} {...props} />
}
