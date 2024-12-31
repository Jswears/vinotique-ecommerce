import Link from 'next/link'
import './globals.css'
import { ThemeProvider } from './components/theme-provider'
import { ThemeToggle } from './components/theme-toggle'
import { CartIcon } from './components/cart-icon'

export const metadata = {
  title: 'Wine E-commerce',
  description: 'Your favorite wine shop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <Link href="/" className="flex-shrink-0 flex items-center">
                    <span className="text-xl font-bold text-purple-600 dark:text-purple-400">Vinotique.</span>
                  </Link>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link href="/" className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Wines
                    </Link>
                    <Link href="/account" className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Account
                    </Link>
                  </div>
                </div>
                <div className="flex items-center">
                  <CartIcon />
                  <div className="ml-4">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <main className="flex-grow bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {children}
          </main>
          <footer className="bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                © 2023 WineShop. All rights reserved.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}

