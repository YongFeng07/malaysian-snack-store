export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">{children}</div>
}
