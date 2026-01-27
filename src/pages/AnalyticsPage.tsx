import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue (This Month)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground mt-1">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Orders (This Month)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground mt-1">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.24%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +0.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Order Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124.50</div>
            <p className="text-xs text-muted-foreground mt-1">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">Electronics</p>
                  <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '65%' }} />
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium">$29,400</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">Clothing</p>
                  <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '45%' }} />
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium">$20,350</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">Home & Garden</p>
                  <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '35%' }} />
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium">$15,800</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">Sports</p>
                  <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '25%' }} />
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium">$11,250</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="text-sm font-medium">Wireless Headphones</p>
                  <p className="text-xs text-muted-foreground">234 units sold</p>
                </div>
                <span className="text-sm font-medium">$11,700</span>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="text-sm font-medium">Smart Watch</p>
                  <p className="text-xs text-muted-foreground">189 units sold</p>
                </div>
                <span className="text-sm font-medium">$9,450</span>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="text-sm font-medium">Running Shoes</p>
                  <p className="text-xs text-muted-foreground">156 units sold</p>
                </div>
                <span className="text-sm font-medium">$7,800</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Laptop Stand</p>
                  <p className="text-xs text-muted-foreground">143 units sold</p>
                </div>
                <span className="text-sm font-medium">$5,720</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend (Last 12 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-around gap-2">
            {[32, 45, 38, 52, 48, 61, 55, 67, 59, 71, 64, 78].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-primary rounded-t"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-muted-foreground">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
