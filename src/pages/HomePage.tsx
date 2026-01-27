import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
}

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          description="+20.1% from last month"
        />
        <StatCard
          title="Orders"
          value="+2350"
          description="+180.1% from last month"
        />
        <StatCard
          title="Products"
          value="+12,234"
          description="+19% from last month"
        />
        <StatCard
          title="Active Customers"
          value="+573"
          description="+201 since last hour"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="text-sm font-medium">Order #1234</p>
                  <p className="text-sm text-muted-foreground">2 items</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">$299.00</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="text-sm font-medium">Order #1233</p>
                  <p className="text-sm text-muted-foreground">1 item</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">$150.00</p>
                  <p className="text-xs text-muted-foreground">Processing</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Order #1232</p>
                  <p className="text-sm text-muted-foreground">3 items</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">$450.00</p>
                  <p className="text-xs text-muted-foreground">Shipped</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium">Olivia Martin</p>
                  <p className="text-xs text-muted-foreground">olivia.martin@email.com</p>
                </div>
                <div className="font-medium">+$1,999.00</div>
              </div>
              <div className="flex items-center">
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium">Jackson Lee</p>
                  <p className="text-xs text-muted-foreground">jackson.lee@email.com</p>
                </div>
                <div className="font-medium">+$39.00</div>
              </div>
              <div className="flex items-center">
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium">Isabella Nguyen</p>
                  <p className="text-xs text-muted-foreground">isabella.nguyen@email.com</p>
                </div>
                <div className="font-medium">+$299.00</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
