import { ShoppingCart, DollarSign, Grid3X3, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const ordersPerHour = [
  { hour: "9AM", orders: 12 },
  { hour: "10AM", orders: 18 },
  { hour: "11AM", orders: 25 },
  { hour: "12PM", orders: 42 },
  { hour: "1PM", orders: 38 },
  { hour: "2PM", orders: 22 },
  { hour: "3PM", orders: 15 },
  { hour: "4PM", orders: 18 },
  { hour: "5PM", orders: 28 },
  { hour: "6PM", orders: 45 },
  { hour: "7PM", orders: 52 },
  { hour: "8PM", orders: 48 },
  { hour: "9PM", orders: 35 },
];

const weeklyRevenue = [
  { day: "Mon", revenue: 4200 },
  { day: "Tue", revenue: 3800 },
  { day: "Wed", revenue: 5100 },
  { day: "Thu", revenue: 4600 },
  { day: "Fri", revenue: 6200 },
  { day: "Sat", revenue: 7800 },
  { day: "Sun", revenue: 5400 },
];

const recentOrders = [
  { id: "ORD-1024", table: 5, items: "Margherita Pizza, Coke", status: "preparing" as const, time: "2 min ago" },
  { id: "ORD-1023", table: 12, items: "Grilled Salmon, Salad", status: "ready" as const, time: "8 min ago" },
  { id: "ORD-1022", table: 3, items: "Pasta Carbonara, Wine", status: "served" as const, time: "15 min ago" },
  { id: "ORD-1021", table: 7, items: "Burger, Fries, Shake", status: "preparing" as const, time: "18 min ago" },
  { id: "ORD-1020", table: 1, items: "Caesar Salad, Juice", status: "served" as const, time: "22 min ago" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your restaurant's performance today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Orders Today" value="156" change="+12% from yesterday" changeType="positive" icon={ShoppingCart} />
        <StatCard title="Revenue Today" value="₹42,580" change="+8.2% from yesterday" changeType="positive" icon={DollarSign} iconColor="bg-success/10 text-success" />
        <StatCard title="Active Tables" value="18/24" change="75% occupancy" changeType="neutral" icon={Grid3X3} iconColor="bg-primary/10 text-primary" />
        <StatCard title="Low Stock Alerts" value="7" change="3 critical items" changeType="negative" icon={AlertTriangle} iconColor="bg-destructive/10 text-destructive" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold mb-4">Orders Per Hour</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ordersPerHour}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
              <XAxis dataKey="hour" tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} />
              <Tooltip
                contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214 32% 91%)", fontSize: "13px" }}
              />
              <Bar dataKey="orders" fill="hsl(217 91% 53%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold mb-4">Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={weeklyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} />
              <Tooltip
                contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214 32% 91%)", fontSize: "13px" }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]}
              />
              <Line type="monotone" dataKey="revenue" stroke="hsl(160 84% 39%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(160 84% 39%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h3 className="text-sm font-semibold">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-6 py-3 font-medium text-muted-foreground">Order ID</th>
                <th className="px-6 py-3 font-medium text-muted-foreground">Table</th>
                <th className="px-6 py-3 font-medium text-muted-foreground">Items</th>
                <th className="px-6 py-3 font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-3 font-medium text-muted-foreground">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-3 font-medium">{order.id}</td>
                  <td className="px-6 py-3">Table {order.table}</td>
                  <td className="px-6 py-3 text-muted-foreground max-w-[200px] truncate">{order.items}</td>
                  <td className="px-6 py-3">
                    <StatusBadge variant={order.status}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </StatusBadge>
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
