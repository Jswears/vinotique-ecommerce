'use client'
import { useState } from 'react'
import { useCart } from '../hooks/use-cart'
import { Wine } from '../types'

export function AddToCartButton({ wine }: { wine: Wine }) {
    const { addToCart } = useCart()
    const [isAdded, setIsAdded] = useState(false)

    const handleAddToCart = () => {
        addToCart(wine)
        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
    }

    return (
        <button
            onClick={handleAddToCart}
            className={`mt-4 w-full px-4 py-2 rounded transition-colors ${isAdded
                ? 'bg-green-500 text-white'
                : 'bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600'
                }`}
        >
            {isAdded ? 'Added to Cart' : 'Add to Cart'}
        </button>
    )
}

