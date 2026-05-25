'use client'

import { motion } from 'framer-motion'
import { ProductGrid } from '@/components/products/product-grid'
import { Hero } from '@/components/home/hero'
import { FeaturedCategories } from '@/components/home/featured-categories'
import { Newsletter } from '@/components/home/newsletter'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Product } from '@/types/product.types'
import { isSupabaseConfigured } from '@/lib/config/env'
import { mockProducts } from '@/lib/mock-data'

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      if (!isSupabaseConfigured()) {
        setFeaturedProducts(mockProducts.filter((product) => product.is_featured))
        setLoading(false)
        return
      }

      const supabase = createClient()
      const { data } = await supabase
        .from('products')
        .select(`
          *,
          categories (*),
          product_images (*)
        `)
        .eq('is_featured', true)
        .eq('is_available', true)
        .limit(8)

      setFeaturedProducts(((data as Product[])?.length ? (data as Product[]) : mockProducts).filter((product) => product.is_featured))
      setLoading(false)
    }

    fetchFeaturedProducts().catch(() => {
      setFeaturedProducts(mockProducts.filter((product) => product.is_featured))
      setLoading(false)
    })
  }, [])

  return (
    <div className="relative">
      <Hero />
      
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Snacks
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most loved Malaysian delicacies, carefully selected for you
            </p>
          </motion.div>
          
          <ProductGrid products={featuredProducts} loading={loading} />
        </div>
      </section>

      <FeaturedCategories />
      <Newsletter />
    </div>
  )
}
