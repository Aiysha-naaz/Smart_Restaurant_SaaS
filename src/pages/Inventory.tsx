import { useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, ScanLine, Search } from "lucide-react";

const inventory = [
  { name: "Tomatoes", quantity: 45, unit: "kg", cost: "₹120/kg", status: "healthy" as const },
  { name: "Chicken Breast", quantity: 12, unit: "kg", cost: "₹320/kg", status: "low" as const },
  { name: "Olive Oil", quantity: 8, unit: "bottles", cost: "₹450/bottle", status: "healthy" as const },
  { name: "Mozzarella Cheese", quantity: 3, unit: "kg", cost: "₹680/kg", status: "low" as const },
  { name: "Salmon Fillet", quantity: 0, unit: "kg", cost: "₹1,200/kg", status: "out" as const },
  { name: "Basmati Rice", quantity: 25, unit: "kg", cost: "₹90/kg", status: "healthy" as const },
  { name: "Fresh Basil", quantity: 2, unit: "bunches", cost: "₹40/bunch", status: "low" as const },
  { name: "Soy Sauce", quantity: 15, unit: "bottles", cost: "₹180/bottle", status: "healthy" as const },
  { name: "Butter", quantity: 0, unit: "kg", cost: "₹520/kg", status: "out" as const },
  { name: "Onions", quantity: 30, unit: "kg", cost: "₹35/kg", status: "healthy" as const },
];

const statusLabels = { healthy: "Healthy", low: "Low Stock", out: "Out of Stock" };

export default function Inventory() {
  const [search, setSearch] = useState("");
  const filtered = inventory.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
          <p className="text-sm text-muted-foreground mt-1">Track and manage your stock levels.</p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
            <ScanLine className="h-4 w-4" /> Scan Inventory
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" /> Add Item
          </button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search inventory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="rounded-xl border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-6 py-3 font-medium text-muted-foreground">Item Name</th>
              <th className="px-6 py-3 font-medium text-muted-foreground">Quantity</th>
              <th className="px-6 py-3 font-medium text-muted-foreground">Unit</th>
              <th className="px-6 py-3 font-medium text-muted-foreground">Cost</th>
              <th className="px-6 py-3 font-medium text-muted-foreground">Stock Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.name} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-6 py-3 font-medium">{item.name}</td>
                <td className="px-6 py-3">{item.quantity}</td>
                <td className="px-6 py-3 text-muted-foreground">{item.unit}</td>
                <td className="px-6 py-3">{item.cost}</td>
                <td className="px-6 py-3">
                  <StatusBadge variant={item.status}>{statusLabels[item.status]}</StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
