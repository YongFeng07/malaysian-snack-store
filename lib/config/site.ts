export const siteConfig = {
  name: 'RASA.CLUB',
  description: 'Premium Malaysian snack ordering for mobile-first social commerce.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '60123456789',
  links: {
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
  },
}
