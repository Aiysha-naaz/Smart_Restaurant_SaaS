import { useState } from "react";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  name: string;
  price: string;
  category: string;
  tags: string[];
  available: boolean;
  image: string;
}

const menuItems: MenuItem[] = [
  { id: "1", name: "Margherita Pizza", price: "₹420", category: "Main Course", tags: ["Trending"], available: true, image: "🍕" },
  { id: "2", name: "Grilled Salmon", price: "₹850", category: "Main Course", tags: ["Seasonal"], available: true, image: "🐟" },
  { id: "3", name: "Caesar Salad", price: "₹320", category: "Starters", tags: ["Trending"], available: true, image: "🥗" },
  { id: "4", name: "Pasta Carbonara", price: "₹480", category: "Main Course", tags: [], available: true, image: "🍝" },
  { id: "5", name: "Chicken Tikka", price: "₹380", category: "Starters", tags: ["Trending"], available: false, image: "🍗" },
  { id: "6", name: "Sushi Platter", price: "₹1,200", category: "Main Course", tags: ["Seasonal"], available: true, image: "🍣" },
  { id: "7", name: "Chocolate Lava Cake", price: "₹280", category: "Desserts", tags: ["Trending"], available: true, image: "🍫" },
  { id: "8", name: "Mango Smoothie", price: "₹180", category: "Beverages", tags: ["Seasonal"], available: true, image: "🥭" },
];

const tagColors: Record<string, string> = {
  Trending: "bg-primary/10 text-primary",
  Seasonal: "bg-warning/10 text-warning",
};

export default function Menu() {
  const [items, setItems] = useState(menuItems);

  const toggleAvailability = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, available: !i.available } : i)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Menu</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your restaurant's menu items.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Menu Item
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "rounded-xl border border-border bg-card p-5 transition-shadow duration-150 hover:shadow-sm",
              !item.available && "opacity-60"
            )}
          >
            <div className="text-4xl mb-3">{item.image}</div>
            <h3 className="font-semibold text-sm">{item.name}</h3>
            <p className="text-lg font-semibold mt-1">{item.price}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.category}</p>

            {item.tags.length > 0 && (
              <div className="flex gap-1.5 mt-3">
                {item.tags.map((tag) => (
                  <span key={tag} className={cn("rounded-full px-2 py-0.5 text-xs font-medium", tagColors[tag] || "bg-muted text-muted-foreground")}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex gap-2">
                <button className="rounded-md p-1.5 hover:bg-muted transition-colors">
                  <Pencil className="h-4 w-4 text-muted-foreground" />
                </button>
                <button className="rounded-md p-1.5 hover:bg-muted transition-colors">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </div>
              <button onClick={() => toggleAvailability(item.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                {item.available ? <ToggleRight className="h-6 w-6 text-success" /> : <ToggleLeft className="h-6 w-6" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
