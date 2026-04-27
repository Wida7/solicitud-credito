import { ObjectId } from "mongodb";
import { FormItems } from "@/core/domain/types/form.types";

export type MongoAbandonApplication = {
  _id?: ObjectId;
  rating: string;
  message: string;
  createdAt: string;
  stepAbandon?: number;
  formSnapshot: Partial<FormItems>;
};
import { Application } from "@/core/domain/types/application.types";

export type MongoApplication = Omit<Application, "id"> & {
  _id: ObjectId;
};

export type MongoUpdateLog = {
  applicationId: string;
  userId: number;
  username: string;
  updatedFields: Partial<Application>;
  updatedAt: string;
};
