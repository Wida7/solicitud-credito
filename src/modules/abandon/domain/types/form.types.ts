import { FormItems } from "@/modules/application/domain/types/form.types";

export type AbandonItems = {
  rating: string;
  message: string;
  stepAbandon: number;
  formSnapshot: Partial<FormItems>;
};
