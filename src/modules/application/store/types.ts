export type ApplicationStatus =
  | "DRAFT"
  | "PENDING_VALIDATION"
  | "APPROVED"
  | "REJECTED"
  | "ABANDONED";

export interface Application {
  id: string;
  name: string;
  identification?: string;
  email: string;
  phone?: string;
  monto: number;
  plazo: number;
  cuota?: number;
  ingresos?: number;
  egresos?: number;
  occupation?: string;
  status: "DRAFT" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export interface Event {
  id: string;
  applicationId: string;
  type: string;
  timestamp: string;
}