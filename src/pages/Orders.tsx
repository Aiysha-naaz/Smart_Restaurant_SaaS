import { useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
  { id: "ORD-1024", table: 5, items: "Margherita Pizza, Coke", total: "₹680", status: "preparing" as const, time: "12:42 PM" },
  { id: "ORD-1023", table: 12, items: "Grilled Salmon, Caesar Salad", total: "₹1,240", status: "ready" as const, time: "12:35 PM" },
  { id: "ORD-1022", table: 3, items: "Pasta Carbonara, Red Wine", total: "₹920", status: "served" as const, time: "12:28 PM" },
  { id: "ORD-1021", table: 7, items: "Burger, Fries, Milkshake", total: "₹540", status: "preparing" as const, time: "12:24 PM" },
  { id: "ORD-1020", table: 1, items: "Caesar Salad, Fresh Juice", total: "₹380", status: "served" as const, time: "12:20 PM" },
  { id: "ORD-1019", table: 9, items: "Steak, Mashed Potatoes, Wine", total: "₹1,850", status: "ready" as const, time: "12:15 PM" },
  { id: "ORD-1018", table: 14, items: "Sushi Platter, Miso Soup", total: "₹1,420", status: "served" as const, time: "12:10 PM" },
  { id: "ORD-1017", table: 6, items: "Chicken Tikka, Naan, Lassi", total: "₹720", status: "preparing" as const, time: "12:05 PM" },
];

const filters = ["All Orders", "Preparing", "Ready", "Served"] as const;

export default function Orders() {
  const [activeFilter, setActiveFilter] = useState<string>("All Orders");
  const [search, setSearch] = useState("");

  const filtered = orders.filter((o) => {
    const matchesFilter = activeFilter === "All Orders" || o.status === activeFilter.toLowerCase();
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.items.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track all restaurant orders.</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          + New Order
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                activeFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-6 py-3 font-medium text-muted-foreground">Order ID</th>
              <th className="px-6 py-3 font-medium text-muted-foreground">Table</th>
              <th className="px-6 py-3 font-medium text-muted-foreground">Items</th>
              <th className="px-6 py-3 font-medium text-muted-foreground">Total</th>
              <th className="px-6 py-3 font-medium text-muted-foreground">Status</th>
              <th className="px-6 py-3 font-medium text-muted-foreground">Time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-6 py-3 font-medium">{order.id}</td>
                <td className="px-6 py-3">Table {order.table}</td>
                <td className="px-6 py-3 text-muted-foreground max-w-[220px] truncate">{order.items}</td>
                <td className="px-6 py-3 font-medium">{order.total}</td>
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
  );
}
