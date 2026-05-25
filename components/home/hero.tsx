'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Truck, Zap } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-end overflow-hidden bg-black text-white">
      <Image src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1600&auto=format&fit=crop" alt="Premium Malaysian snack spread" fill priority className="object-cover opacity-65" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
      <div className="container relative z-10 pb-12 pt-24 md:pb-16">
        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-xl">
              <Zap className="h-4 w-4" />
              Weekly snack drops from Malaysia
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 max-w-4xl font-jakarta text-5xl font-black tracking-tight md:text-7xl lg:text-8xl">
            RASA.CLUB
            <span className="mt-2 block text-white/72">snacks with street-level heat.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8 max-w-2xl text-base leading-7 text-white/76 md:text-xl">
            A premium mobile-first ordering experience for keropok, muruku, dodol, sambal crisps, kuih boxes, and limited snack bundles.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild className="group bg-white text-black hover:bg-white/90">
              <Link href="/products">
                Shop Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/30 bg-white/10 text-white hover:bg-white/20">
              <Link href="/products">Browse Menu</Link>
            </Button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-12 flex flex-wrap items-center gap-5 text-sm text-white/72">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" />Free delivery over RM60</span>
            <span className="flex items-center gap-2"><Truck className="h-4 w-4" />Same-day KL delivery</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" />Halal-friendly sourcing</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
