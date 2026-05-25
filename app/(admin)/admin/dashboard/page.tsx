'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RevenueChart } from '@/components/admin/revenue-chart'
import { RecentOrders } from '@/components/admin/recent-orders'
import { TopProducts } from '@/components/admin/top-products'
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  TrendingUp,
  Package,
  CreditCard
} from 'lucide-react'
import { formatPrice } from '@/lib/utils/format-price'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    averageOrderValue: 0,
    pendingOrders: 0,
    lowStockProducts: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient()
      
      // Fetch total revenue and orders
      const { data: orders } = await supabase
        .from('orders')
        .select('total_amount, status')
        .eq('payment_status', 'completed')
      
      const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0
      const totalOrders = orders?.length || 0
      
      // Fetch customers count
      const { count: customers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'customer')
      
      // Fetch pending orders
      const { count: pendingOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')
      
      // Fetch low stock products
      const { count: lowStock } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .lt('stock_quantity', 10)
        .gt('stock_quantity', 0)
      
      setStats({
        totalRevenue,
        totalOrders,
        totalCustomers: customers || 0,
        averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
        pendingOrders: pendingOrders || 0,
        lowStockProducts: lowStock || 0
      })
      setLoading(false)
    }
    
    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatPrice(stats.totalRevenue),
      icon: DollarSign,
      trend: '+12%',
      color: 'text-green-500'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      trend: '+8%',
      color: 'text-blue-500'
    },
    {
      title: 'Customers',
      value: stats.totalCustomers,
      icon: Users,
      trend: '+15%',
      color: 'text-purple-500'
    },
    {
      title: 'Avg. Order Value',
      value: formatPrice(stats.averageOrderValue),
      icon: TrendingUp,
      trend: '+5%',
      color: 'text-orange-500'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: Package,
      trend: 'Needs attention',
      color: 'text-yellow-500'
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockProducts,
      icon: CreditCard,
      trend: 'Need restock',
      color: 'text-red-500'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your store overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <TopProducts />
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentOrders />
        </CardContent>
      </Card>
    </div>
  )
}