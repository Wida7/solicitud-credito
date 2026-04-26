import { FormItems } from "../types/form.types";
import { Application } from "../types/application.types";

//Era para utilizar Redux como fuente de datos
export function mapFormToApplication(data: FormItems): Application {
  return {
    id: crypto.randomUUID(),
    name: data.name,
    email: data.email,
    identificationType: data.identificationType,
    identification: data.identification,
    phone: data.phone,
    monto: data.monto,
    plazo: data.plazo,
    cuotaAprox: data.cuotaAprox,
    ingresos: data.ingresos,
    egresos: data.egresos,
    occupation: data.occupation,
    yearly: data.yearly,
    status: "PENDIENTE",
    createdAt: new Date().toISOString(),
  };
}
