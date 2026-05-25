export const paymentConfig = {
  stripeReady: Boolean(process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.startsWith('your_')),
  toyyibPayReady: Boolean(process.env.TOYYIBPAY_SECRET_KEY && !process.env.TOYYIBPAY_SECRET_KEY.startsWith('your_')),
  currency: 'MYR',
}
