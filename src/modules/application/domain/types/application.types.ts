export interface Application {
  id: string;
  name: string;
  email: string;
  monto: number;
  plazo: number;
  status: "DRAFT" | "APPROVED" | "REJECTED";
  createdAt: string;
}