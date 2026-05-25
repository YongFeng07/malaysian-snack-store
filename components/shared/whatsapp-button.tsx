import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function WhatsappButton({ message, phone }: { message: string; phone: string }) {
  const url = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`

  return (
    <Button asChild className="bg-[#25D366] text-black hover:bg-[#25D366]/90">
      <a href={url} target="_blank" rel="noreferrer">
        <MessageCircle className="h-4 w-4" />
        WhatsApp order
      </a>
    </Button>
  )
}
