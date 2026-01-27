import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface MenuItem {
  title: string
  href: string
  icon?: string
}

const menuItems: MenuItem[] = [
  { title: 'Dashboard', href: '/' },
  { title: 'Products', href: '/products' },
  { title: 'Orders', href: '/orders' },
  { title: 'Customers', href: '/customers' },
  { title: 'Analytics', href: '/analytics' },
  { title: 'Settings', href: '/settings' },
]

export default function SideMenu() {
  const location = useLocation()

  return (
    <aside className="w-64 border-r bg-background">
      <nav className="flex flex-col gap-1 p-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {item.title}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
