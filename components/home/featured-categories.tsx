'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    id: 'traditional',
    name: 'Traditional Kuih',
    image: '/images/categories/traditional.jpg',
    count: 24,
    href: '/products?category=traditional',
    description: 'Authentic Malaysian heritage snacks'
  },
  {
    id: 'modern',
    name: 'Modern Snacks',
    image: '/images/categories/modern.jpg',
    count: 36,
    href: '/products?category=modern',
    description: 'Contemporary Malaysian treats'
  },
  {
    id: 'healthy',
    name: 'Healthy Options',
    image: '/images/categories/healthy.jpg',
    count: 18,
    href: '/products?category=healthy',
    description: 'Guilt-free snacking'
  },
  {
    id: 'bestseller',
    name: 'Bestsellers',
    image: '/images/categories/bestseller.jpg',
    count: 12,
    href: '/products?category=bestseller',
    description: 'Customer favorites'
  }
]

export function FeaturedCategories() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From traditional to modern, find your favorite Malaysian snacks
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Link href={category.href} className="group block">
                <div className="relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-primary/20 to-secondary/20">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-white text-xl font-bold mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-2">
                      {category.description}
                    </p>
                    <p className="text-white/60 text-xs mb-2">
                      {category.count} products
                    </p>
                    <span className="inline-flex items-center text-white text-sm font-medium group-hover:underline">
                      Shop Now
                      <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}