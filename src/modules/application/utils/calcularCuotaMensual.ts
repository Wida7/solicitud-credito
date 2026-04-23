export function calcularCuotaMensual({
  monto,
  plazoMeses,
  interesAnual, // ej: 0.12 = 12%
  descuento = 0,
}: {
  monto: number;
  plazoMeses: number;
  interesAnual: number;
  descuento?: number;
}): number {
  // validaciones básicas
  if (monto <= 0 || plazoMeses <= 0) return 0;

  const tasaAnualAjustada = interesAnual * (1 - descuento);
  const tasaMensual = tasaAnualAjustada / 12;

  // caso sin interés
  if (tasaMensual === 0) {
    return Math.round(monto / plazoMeses);
  }

  // Calcula la cuota mensual usando la fórmula de amortización francesa:
  // distribuye el pago en cuotas fijas que incluyen capital + intereses.
  // Se parte de una tasa anual (ajustada por descuento), se convierte a tasa mensual,
  // y se aplica la fórmula: cuota = (P * r) / (1 - (1 + r)^-n)
  // donde:
  // P = monto del préstamo
  // r = tasa de interés mensual
  // n = número de meses
  const cuota =
    (monto * tasaMensual) /
    (1 - Math.pow(1 + tasaMensual, -plazoMeses));

  // redondeo
  return Math.round(cuota);
}