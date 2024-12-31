import Image from 'next/image'
import { AddToCartButton } from './components/add-to-cart-button'
import { Wine } from './types'

const wines: Wine[] = [
  { id: 1, name: 'Cabernet Sauvignon', price: 25.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Chardonnay', price: 19.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Merlot', price: 22.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 4, name: 'Pinot Noir', price: 27.99, image: '/placeholder.svg?height=200&width=200' },
]

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Our Wines</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wines.map((wine) => (
          <div key={wine.id} className="border dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
            <Image src={wine.image} alt={wine.name} width={200} height={200} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{wine.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">${wine.price.toFixed(2)}</p>
            <AddToCartButton wine={wine} />
          </div>
        ))}
      </div>
    </div>
  )
}

