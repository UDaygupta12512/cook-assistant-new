'use client'

import { Link, usePathname } from '@/i18n/routing'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Icons.home,
    },
    {
      name: 'Recipes',
      href: '/recipes',
      icon: Icons.utensils,
    },
    {
      name: 'How to Cook',
      href: '/how-to-cook',
      icon: Icons.chefHat,
    },
    {
      name: 'Favorites',
      href: '/recipes',
      icon: Icons.heart,
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: Icons.activity,
    },
  ]

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 dark:border-gray-800">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Icons.chefHat className="w-8 h-8 mr-2 text-primary" />
            <span className="text-xl font-bold">Cook Assistant</span>
          </div>
          <div className="flex flex-col flex-grow mt-5">
            <nav className="flex-1 px-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      isActive
                        ? 'bg-gray-100 dark:bg-gray-800 text-primary'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800',
                      'group flex items-center px-4 py-3 text-sm font-medium rounded-md'
                    )}
                  >
                    <Icon
                      className={cn(
                        isActive
                          ? 'text-primary'
                          : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Link href="/settings" className="group flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
            <Icons.settings className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
            <span>Settings</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full group flex items-center px-4 py-3 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 mt-2"
          >
            <Icons.logOut className="mr-3 h-6 w-6" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  )
}
