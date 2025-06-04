import React, { useState } from 'react'
import { useStore } from '../App'

function Checkout() {
  const { cart } = useStore()
  const [address, setAddress] = useState('')
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock payment confirmation
    setPaymentConfirmed(true)
  }

  if (paymentConfirmed) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
        <p>Your order has been confirmed and will be shipped to: {address}</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="address" className="block mb-1">Shipping Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <h3 className="font-bold">Order Summary:</h3>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="font-bold mt-2">Total: ${total.toFixed(2)}</div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Confirm Payment
        </button>
      </form>
    </div>
  )
}

export default Checkout

