'use client'

import Image from 'next/image'
import { useCart } from '../hooks/use-cart'
export default function Cart() {
    const { cart, updateQuantity, removeItem } = useCart()

    const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 0), 0)

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center border-b dark:border-gray-700 py-4">
                            <Image src={item.image} alt={item.name} width={80} height={80} className="w-20 h-20 object-cover mr-4" />
                            <div className="flex-grow">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{item.name}</h2>
                                <p className="text-gray-600 dark:text-gray-400">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center">
                                <button onClick={() => updateQuantity(item.id, (item.quantity || 0) - 1)} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">-</button>
                                <span className="mx-2 text-gray-900 dark:text-gray-100">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, (item.quantity || 0) + 1)} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">+</button>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="ml-4 text-red-600 dark:text-red-400">Remove</button>
                        </div>
                    ))}
                    <div className="mt-6">
                        <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">Total: ${total.toFixed(2)}</p>
                        <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 transition-colors">
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

