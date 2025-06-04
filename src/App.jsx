import React from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import ProductList from './components/ProductList.jsx'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Dashboard from './components/Dashboard'

// Mock product data
const mockProducts = [
  { id: 1, name: 'Product 1', price: 10, category: 'Category A' },
  { id: 2, name: 'Product 2', price: 20, category: 'Category B' },
  { id: 3, name: 'Product 3', price: 30, category: 'Category A' },
  { id: 4, name: 'Product 4', price: 40, category: 'Category C' },
]

// Zustand store
const useStore = create(persist(
  (set, get) => ({
    products: [],
    cart: [],
    user: null,
    fetchProducts: () => set({ products: mockProducts }),
    addToCart: (product) => set((state) => {
      const existingItem = state.cart.find(item => item.id === product.id)
      if (existingItem) {
        return { cart: state.cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) }
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] }
    }),
    removeFromCart: (productId) => set((state) => ({
      cart: state.cart.filter(item => item.id !== productId)
    })),
    updateQuantity: (productId, quantity) => set((state) => ({
      cart: state.cart.map(item => item.id === productId ? { ...item, quantity } : item)
    })),
    login: (userData) => set({ user: userData }),
    logout: () => set({ user: null }),
  }),
  {
    name: 'e-commerce-storage',
    getStorage: () => localStorage,
  }
))


export { useStore }



function App() {
  const [activeTab, setActiveTab] = React.useState('products')

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">E-commerce Platform</h1>
          <div className="space-x-4">
            <button onClick={() => setActiveTab('products')} className="text-white">Products</button>
            <button onClick={() => setActiveTab('cart')} className="text-white">Cart</button>
            <button onClick={() => setActiveTab('checkout')} className="text-white">Checkout</button>
            <button onClick={() => setActiveTab('dashboard')} className="text-white">Dashboard</button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto mt-8">
        {activeTab === 'products' && <ProductList />}
        {activeTab === 'cart' && <Cart />}
        {activeTab === 'checkout' && <Checkout />}
        {activeTab === 'dashboard' && <Dashboard />}
      </main>
    </div>
  )
}

export default App
