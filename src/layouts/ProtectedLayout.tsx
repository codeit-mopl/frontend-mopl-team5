import { Outlet } from 'react-router-dom'
import GNB from '@/components/common/GNB'
import SideMenu from '@/components/common/SideMenu'

export default function ProtectedLayout() {
  return (
    <div className="min-h-screen bg-background">
      <GNB />
      <div className="flex">
        <SideMenu />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
