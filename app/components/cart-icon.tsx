'use client'

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '../hooks/use-cart'

export function CartIcon() {
    const { itemCount } = useCart()

    return (
        <Link href="/cart" className="relative p-2">
            <ShoppingCart className="h-6 w-6 text-gray-500 dark:text-gray-300" />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {itemCount}
                </span>
            )}
        </Link>
    )
}

