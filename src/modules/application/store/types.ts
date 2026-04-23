export type ApplicationStatus =
  | "DRAFT"
  | "PENDING_VALIDATION"
  | "APPROVED"
  | "REJECTED"
  | "ABANDONED";

export interface Application {
  id: string;
  name: string;
  email: string;
  amount: number;
  status: ApplicationStatus;
  createdAt: string;
}

export interface Event {
  id: string;
  applicationId: string;
  type: string;
  timestamp: string;
}