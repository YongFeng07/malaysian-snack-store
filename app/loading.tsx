import { LoadingSpinner } from '@/components/shared/loading-spinner'

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoadingSpinner className="h-8 w-8" />
    </div>
  )
}
