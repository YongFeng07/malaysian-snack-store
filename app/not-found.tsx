import { EmptyState } from '@/components/shared/empty-state'

export default function NotFound() {
  return <EmptyState title="Page not found" description="That page is no longer on the menu." actionHref="/" actionLabel="Back home" />
}
