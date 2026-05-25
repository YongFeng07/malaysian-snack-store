'use client'

import { Toaster as HotToaster } from 'react-hot-toast'

export function Toaster() {
  return (
    <HotToaster
      position="top-center"
      toastOptions={{
        className: 'border border-border bg-background text-foreground shadow-xl',
        duration: 2600,
      }}
    />
  )
}
