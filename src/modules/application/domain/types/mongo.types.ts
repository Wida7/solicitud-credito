import { ObjectId } from "mongodb";
import { FormItems } from "@/modules/application/domain/types/form.types";

export interface MongoApplication {
  _id: ObjectId;
  name: string;
  email: string;
  monto: number;
  plazo: number;
  status: "DRAFT" | "APPROVED" | "REJECTED";
  /* createdAt: string; */
}

export type MongoAbandonApplication = {
  _id?: ObjectId;

  rating: string;
  message: string;
  createdAt: string;
  stepAbandon?: number;

  formSnapshot: Partial<FormItems>;
};
