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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const dailyRevenue = [
  { date: "Mar 1", revenue: 38000 },
  { date: "Mar 2", revenue: 42000 },
  { date: "Mar 3", revenue: 35000 },
  { date: "Mar 4", revenue: 48000 },
  { date: "Mar 5", revenue: 52000 },
  { date: "Mar 6", revenue: 61000 },
  { date: "Mar 7", revenue: 55000 },
  { date: "Mar 8", revenue: 43000 },
  { date: "Mar 9", revenue: 47000 },
  { date: "Mar 10", revenue: 50000 },
  { date: "Mar 11", revenue: 58000 },
  { date: "Mar 12", revenue: 62000 },
  { date: "Mar 13", revenue: 68000 },
  { date: "Mar 14", revenue: 72000 },
];

const ordersByHour = [
  { hour: "9AM", orders: 8 }, { hour: "10AM", orders: 14 }, { hour: "11AM", orders: 22 },
  { hour: "12PM", orders: 38 }, { hour: "1PM", orders: 35 }, { hour: "2PM", orders: 18 },
  { hour: "3PM", orders: 12 }, { hour: "4PM", orders: 16 }, { hour: "5PM", orders: 24 },
  { hour: "6PM", orders: 42 }, { hour: "7PM", orders: 48 }, { hour: "8PM", orders: 44 },
  { hour: "9PM", orders: 32 }, { hour: "10PM", orders: 15 },
];

const topItems = [
  { name: "Margherita Pizza", value: 142 },
  { name: "Grilled Salmon", value: 98 },
  { name: "Caesar Salad", value: 87 },
  { name: "Pasta Carbonara", value: 76 },
  { name: "Sushi Platter", value: 64 },
];

const COLORS = ["hsl(217 91% 53%)", "hsl(160 84% 39%)", "hsl(38 92% 50%)", "hsl(0 84% 60%)", "hsl(215 16% 47%)"];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Detailed performance metrics for your restaurant.</p>
      </div>

      {/* Daily Revenue */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-sm font-semibold mb-4">Daily Revenue (March 2026)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214 32% 91%)", fontSize: "13px" }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} />
            <Line type="monotone" dataKey="revenue" stroke="hsl(217 91% 53%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(217 91% 53%)" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by Hour */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold mb-4">Orders by Hour</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ordersByHour}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "hsl(215 16% 47%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} />
              <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214 32% 91%)", fontSize: "13px" }} />
              <Bar dataKey="orders" fill="hsl(160 84% 39%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Selling Pie */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold mb-4">Top Selling Menu Items</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={topItems} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`} labelLine={false} fontSize={11}>
                {topItems.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214 32% 91%)", fontSize: "13px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
