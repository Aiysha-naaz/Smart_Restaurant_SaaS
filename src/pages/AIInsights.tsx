import { TrendingUp, Flame, Percent, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const topSelling = [
  { name: "Margherita Pizza", orders: 142, revenue: "₹59,640" },
  { name: "Grilled Salmon", orders: 98, revenue: "₹83,300" },
  { name: "Caesar Salad", orders: 87, revenue: "₹27,840" },
  { name: "Pasta Carbonara", orders: 76, revenue: "₹36,480" },
  { name: "Sushi Platter", orders: 64, revenue: "₹76,800" },
];

const trendingData = [
  { name: "Chicken Tikka", trend: "+24%", period: "This week" },
  { name: "Mango Smoothie", trend: "+18%", period: "This week" },
  { name: "Chocolate Lava Cake", trend: "+15%", period: "This week" },
];

const promotions = [
  { title: "Happy Hour Special", description: "Offer 20% off beverages between 3–5 PM to boost afternoon traffic.", impact: "Est. +₹4,200/day" },
  { title: "Combo Deal", description: "Bundle Margherita Pizza + Coke for ₹550 (save ₹130) to increase avg. order value.", impact: "Est. +₹8,400/week" },
  { title: "Weekend Brunch", description: "Introduce a brunch menu on Sat-Sun to capture untapped morning demand.", impact: "Est. +₹15,000/weekend" },
];

const categoryData = [
  { category: "Main Course", orders: 320 },
  { category: "Starters", orders: 180 },
  { category: "Desserts", orders: 95 },
  { category: "Beverages", orders: 210 },
];

export default function AIInsights() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">AI Insights</h1>
        <p className="text-sm text-muted-foreground mt-1">Smart recommendations powered by your data.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-semibold">Top Selling Items</h3>
          </div>
          <div className="space-y-3">
            {topSelling.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{item.revenue}</p>
                  <p className="text-xs text-muted-foreground">{item.orders} orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="h-5 w-5 text-warning" />
            <h3 className="text-sm font-semibold">Trending Dishes</h3>
          </div>
          <div className="space-y-4">
            {trendingData.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                <span className="text-sm font-medium">{item.name}</span>
                <div className="text-right">
                  <span className="text-sm font-semibold text-success">{item.trend}</span>
                  <p className="text-xs text-muted-foreground">{item.period}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Category chart */}
          <div className="mt-6">
            <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Orders by Category</h4>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
                <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} />
                <YAxis dataKey="category" type="category" tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} width={90} />
                <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214 32% 91%)", fontSize: "13px" }} />
                <Bar dataKey="orders" fill="hsl(217 91% 53%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Promotions */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Percent className="h-5 w-5 text-success" />
          <h3 className="text-sm font-semibold">Suggested Promotions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promotions.map((promo) => (
            <div key={promo.title} className="rounded-lg border border-border p-4 hover:shadow-sm transition-shadow">
              <h4 className="font-semibold text-sm">{promo.title}</h4>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{promo.description}</p>
              <p className="text-xs font-semibold text-success mt-3">{promo.impact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
