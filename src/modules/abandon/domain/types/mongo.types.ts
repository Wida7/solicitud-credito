import { ObjectId } from "mongodb";
import { FormItems } from "@/modules/application/domain/types/form.types";

export type MongoAbandonApplication = {
  _id?: ObjectId;
  rating: string;
  message: string;
  createdAt: string;
  stepAbandon?: number;
  formSnapshot: Partial<FormItems>;
};
