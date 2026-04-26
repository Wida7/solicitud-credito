import { FormItems } from "./form.types";

export type ApplicationStatus = "PENDIENTE" | "APROBADO" | "RECHAZADO";

export type CreateApplicationInput = FormItems & {
  status?: ApplicationStatus;
};

export type Application = FormItems & {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
};
