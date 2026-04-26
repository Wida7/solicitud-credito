export function calcularProbabilidadAprobacion({
	ingresos,
	egresos,
	cuotaAprox,
}: {
	ingresos: number;
	egresos: number;
	cuotaAprox: number;
}) {
	const capacidad = ingresos - egresos;

	if (capacidad <= 0) return determinarEstado(0.1);

	const ratio = cuotaAprox / capacidad;

	//Porcentaje de la cuota según ingreso
	if (ratio <= 0.05) return determinarEstado(0.97);
	if (ratio <= 0.15) return determinarEstado(0.90);
	if (ratio <= 0.25) return determinarEstado(0.85);
	if (ratio <= 0.35) return determinarEstado(0.70);

	return determinarEstado(0.4);

}


function determinarEstado(probabilidad: number) {
  const rand = Math.random();

	//Proccesa la probabilidad y asigna
  return rand < probabilidad ? "APROBADO" : "RECHAZADO";
}