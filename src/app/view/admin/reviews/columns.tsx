import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { Application } from "@/modules/application/domain/types/application.types";
import type { ColumnDef } from "@tanstack/react-table";

const moneyCell = (value: number) => (
  <div className="text-right font-medium">{formatCurrency(value)}</div>
);

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Telefono",
    cell: ({ row }) => <div>{row.getValue("phone") || "-"}</div>,
  },
  {
    accessorKey: "occupation",
    header: "Ocupacion",
    cell: ({ row }) => <div>{row.getValue("occupation") || "-"}</div>,
  },
  {
    accessorKey: "ingresos",
    header: () => <div className="text-right">Ingresos</div>,
    cell: ({ row }) => moneyCell(row.getValue("ingresos")),
  },
  {
    accessorKey: "egresos",
    header: () => <div className="text-right">Egresos</div>,
    cell: ({ row }) => moneyCell(row.getValue("egresos")),
  },
  {
    accessorKey: "monto",
    header: () => <div className="text-right">Monto</div>,
    cell: ({ row }) => moneyCell(row.getValue("monto")),
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue<Application["status"]>("status");

      const styles = {
        APPROVED:
          "bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5",
        REJECTED:
          "bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive",
        DRAFT:
          "bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-amber-400/5",
      }[status];

      return (
        <Badge className={cn("border-none focus-visible:outline-none", styles)}>
          {status}
        </Badge>
      );
    },
  },
];
