import { FormItems } from "../types/form.types";
import { Application } from "@/modules/application/store/types";

//Era para utilizar Redux como fuente de datos
export function mapFormToApplication(data: FormItems): Application {
  return {
    id: crypto.randomUUID(),
    name: data.name,
    email: data.email,
    phone: data.phone,
    monto: data.monto,
    plazo: data.plazo,
    cuota: data.cuotaAprox ?? 0,
    ingresos: data.ingresos,
    egresos: data.egresos,
    occupation: data.occupation,
    status: "DRAFT",
    createdAt: new Date().toISOString(),
  };
}