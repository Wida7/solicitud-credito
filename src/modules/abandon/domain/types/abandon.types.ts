import { FormItems } from "@/modules/application/domain/types/form.types";

export type AbandonApplication = {
  id?: string;
  rating: string;
  message: string;
  createdAt?: string;
  stepAbandon?: number;
  formSnapshot: Partial<FormItems>;
};
