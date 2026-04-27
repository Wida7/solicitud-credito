import { CREDIT_CONFIG } from "../constants/creditConfig";
import { calcularCuotaMensual } from "../utils/calcularCuotaMensual";

export function creditSimulator(monto: number, yearly: boolean) {
  const plazos = yearly
    ? CREDIT_CONFIG.planesAnuales
    : CREDIT_CONFIG.planesMensuales;

  return plazos.map((plan) => {
    const cuota = calcularCuotaMensual({
      monto,
      plazoMeses: plan.plazoMeses,
      interesAnual: CREDIT_CONFIG.tasaAnual,
      descuento: plan.descuento,
    });

    return {
      ...plan,
      cuota,
      descuentoTexto: `${plan.descuento * 100}% menos intereses`,
    };
  });
}