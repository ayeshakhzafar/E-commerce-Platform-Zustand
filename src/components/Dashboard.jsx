import React from 'react'
import { useStore } from '../App'

function Dashboard() {
  const { cart, user } = useStore()

  const totalCartValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded shadow">
          <h3 className="font-bold mb-2">Cart Analytics</h3>
          <p>Total Cart Value: ${totalCartValue.toFixed(2)}</p>
          <p>Total Items in Cart: {totalItems}</p>
        </div>
        <div className="border p-4 rounded shadow">
          <h3 className="font-bold mb-2">User Activity</h3>
          {user ? (
            <div>
              <p>Logged in as: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Last Login: {new Date(user.lastLogin).toLocaleString()}</p>
            </div>
          ) : (
            <p>No user logged in</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

