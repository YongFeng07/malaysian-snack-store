import { AdminSidebar } from '@/components/admin/admin-sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container grid gap-6 py-10 lg:grid-cols-[240px_1fr]">
      <AdminSidebar />
      <div className="min-w-0">{children}</div>
    </div>
  )
}
