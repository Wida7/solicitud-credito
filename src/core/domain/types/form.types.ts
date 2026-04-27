import { AbandonApplication } from "./abandon.types";

export type AbandonItems = Pick<
  AbandonApplication,
  "rating" | "message" | "stepAbandon" | "formSnapshot"
>;
export type FormItems = {
  name: string;
  email: string;
  phone: string;
  identificationType?: string;
  identification: string;
  monto: number;
  plazo: 0 | 1 | 3 | 5 | 6 | 9;
  cuotaAprox?: number;
  occupation: string;
  ingresos: number;
  egresos: number;
  yearly: boolean;
};
