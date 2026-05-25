'use client'

import { useState, useEffect } from 'react'
import { ProductGrid } from '@/components/products/product-grid'
import { ProductFilters } from '@/components/products/product-filters'
import { SearchBar } from '@/components/products/search-bar'
import { createClient } from '@/lib/supabase/client'
import { Product } from '@/types/product.types'
import { motion } from 'framer-motion'
import { isSupabaseConfigured } from '@/lib/config/env'
import { mockProducts } from '@/lib/mock-data'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      if (!isSupabaseConfigured()) {
        let next = [...mockProducts]
        if (selectedCategory) next = next.filter((product) => product.category_id === selectedCategory)
        if (searchQuery) next = next.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        if (sortBy === 'price_asc') next.sort((a, b) => a.price - b.price)
        if (sortBy === 'price_desc') next.sort((a, b) => b.price - a.price)
        if (sortBy === 'rating') next.sort((a, b) => b.average_rating - a.average_rating)
        setProducts(next)
        setLoading(false)
        return
      }

      const supabase = createClient()
      
      let query = supabase
        .from('products')
        .select(`
          *,
          categories (*),
          product_images (*)
        `)
        .eq('is_available', true)

      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory)
      }

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`)
      }

      switch (sortBy) {
        case 'price_asc':
          query = query.order('price', { ascending: true })
          break
        case 'price_desc':
          query = query.order('price', { ascending: false })
          break
        case 'rating':
          query = query.order('average_rating', { ascending: false })
          break
        default:
          query = query.order('created_at', { ascending: false })
      }

      const { data } = await query

      setProducts(((data as Product[])?.length ? (data as Product[]) : mockProducts))
      setLoading(false)
    }

    fetchProducts().catch(() => {
      setProducts(mockProducts)
      setLoading(false)
    })
  }, [searchQuery, selectedCategory, sortBy])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-4 font-jakarta text-4xl font-black md:text-6xl">Snack Catalog</h1>
          <p className="max-w-2xl text-muted-foreground">
            Curated Malaysian snack drops with clean checkout, WhatsApp ordering, and premium gift-ready bundles.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <ProductFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Results */}
        <ProductGrid products={products} loading={loading} />
        
        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}
      </div>
    </div>
  )
}
