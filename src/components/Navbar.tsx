import { useState, useRef, useEffect } from "react";
import { Bell, Search, ChevronDown, LogOut, User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const restaurants = [
  { id: "1", name: "Downtown Bistro" },
  { id: "2", name: "Riverside Grill" },
  { id: "3", name: "Uptown Café" },
];

export function Navbar() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]);
  const [showRestaurantDropdown, setShowRestaurantDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const restaurantRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (restaurantRef.current && !restaurantRef.current.contains(e.target as Node))
        setShowRestaurantDropdown(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setShowProfileDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-6">
      {/* Restaurant selector */}
      <div ref={restaurantRef} className="relative">
        <button
          onClick={() => setShowRestaurantDropdown(!showRestaurantDropdown)}
          className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted transition-colors duration-150"
        >
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span>{selectedRestaurant.name}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
        {showRestaurantDropdown && (
          <div className="absolute left-0 top-full mt-1 w-56 rounded-xl border border-border bg-card shadow-sm animate-fade-in">
            {restaurants.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setSelectedRestaurant(r);
                  setShowRestaurantDropdown(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors first:rounded-t-xl last:rounded-b-xl",
                  r.id === selectedRestaurant.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted text-foreground"
                )}
              >
                <Building2 className="h-4 w-4" />
                {r.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search orders, menu, inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <button className="relative rounded-lg p-2 hover:bg-muted transition-colors duration-150">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>

        <div ref={profileRef} className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-muted transition-colors duration-150"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              JD
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
          </button>
          {showProfileDropdown && (
            <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-border bg-card shadow-sm animate-fade-in">
              <div className="border-b border-border px-4 py-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john@restaurant.com</p>
              </div>
              <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors">
                <User className="h-4 w-4 text-muted-foreground" />
                Profile
              </button>
              <button className="flex w-full items-center gap-2 rounded-b-xl px-4 py-2.5 text-sm text-destructive hover:bg-muted transition-colors">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
