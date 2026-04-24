export const CREDIT_CONFIG = {
  tasaAnual: 0.17,

  planesMensuales: [
    { plazoMeses: 3, descuento: 0.06, label: "3 meses" },
    { plazoMeses: 6, descuento: 0.04, label: "6 meses" },
    { plazoMeses: 9, descuento: 0.02, label: "9 meses" },
  ],

  planesAnuales: [
    { plazoMeses: 12, descuento: 0.02, label: "1 año" },
    { plazoMeses: 36, descuento: 0.01, label: "3 años" },
    { plazoMeses: 60, descuento: 0, label: "5 años" },
  ],
};