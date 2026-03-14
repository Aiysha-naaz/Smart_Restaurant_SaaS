import { StatusBadge, BadgeVariant } from "@/components/StatusBadge";
import { QrCode, Eye } from "lucide-react";

interface TableData {
  number: number;
  status: BadgeVariant;
  statusLabel: string;
  guests?: number;
}

const tables: TableData[] = [
  { number: 1, status: "available", statusLabel: "Available" },
  { number: 2, status: "occupied", statusLabel: "Occupied", guests: 4 },
  { number: 3, status: "occupied", statusLabel: "Occupied", guests: 2 },
  { number: 4, status: "cleaning", statusLabel: "Cleaning Required" },
  { number: 5, status: "occupied", statusLabel: "Occupied", guests: 6 },
  { number: 6, status: "available", statusLabel: "Available" },
  { number: 7, status: "occupied", statusLabel: "Occupied", guests: 3 },
  { number: 8, status: "available", statusLabel: "Available" },
  { number: 9, status: "occupied", statusLabel: "Occupied", guests: 2 },
  { number: 10, status: "cleaning", statusLabel: "Cleaning Required" },
  { number: 11, status: "available", statusLabel: "Available" },
  { number: 12, status: "occupied", statusLabel: "Occupied", guests: 5 },
  { number: 13, status: "available", statusLabel: "Available" },
  { number: 14, status: "occupied", statusLabel: "Occupied", guests: 4 },
  { number: 15, status: "available", statusLabel: "Available" },
  { number: 16, status: "cleaning", statusLabel: "Cleaning Required" },
  { number: 17, status: "available", statusLabel: "Available" },
  { number: 18, status: "occupied", statusLabel: "Occupied", guests: 2 },
  { number: 19, status: "available", statusLabel: "Available" },
  { number: 20, status: "available", statusLabel: "Available" },
  { number: 21, status: "occupied", statusLabel: "Occupied", guests: 8 },
  { number: 22, status: "available", statusLabel: "Available" },
  { number: 23, status: "occupied", statusLabel: "Occupied", guests: 3 },
  { number: 24, status: "available", statusLabel: "Available" },
];

export default function Tables() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Tables</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage table status and QR codes.</p>
      </div>

      {/* Summary */}
      <div className="flex gap-4 text-sm">
        <span className="text-muted-foreground">
          Available: <span className="font-semibold text-success">{tables.filter((t) => t.status === "available").length}</span>
        </span>
        <span className="text-muted-foreground">
          Occupied: <span className="font-semibold text-primary">{tables.filter((t) => t.status === "occupied").length}</span>
        </span>
        <span className="text-muted-foreground">
          Cleaning: <span className="font-semibold text-warning">{tables.filter((t) => t.status === "cleaning").length}</span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tables.map((table) => (
          <div key={table.number} className="rounded-xl border border-border bg-card p-4 text-center hover:shadow-sm transition-shadow duration-150">
            <p className="text-lg font-semibold">T{table.number}</p>
            <div className="mt-2">
              <StatusBadge variant={table.status}>{table.statusLabel}</StatusBadge>
            </div>
            {table.guests && <p className="text-xs text-muted-foreground mt-2">{table.guests} guests</p>}
            <div className="mt-3 flex justify-center gap-2">
              <button className="rounded-md p-1.5 hover:bg-muted transition-colors" title="View Orders">
                <Eye className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="rounded-md p-1.5 hover:bg-muted transition-colors" title="QR Code">
                <QrCode className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
