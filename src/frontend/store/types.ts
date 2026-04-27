export type {
  Application,
  ApplicationStatus,
} from "@/core/domain/types/application.types";

export interface Event {
  id: string;
  applicationId: string;
  type: string;
  timestamp: string;
}
