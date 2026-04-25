import { ObjectId } from "mongodb";
import { Application } from "./application.types";

export type MongoApplication = Omit<Application, "id"> & {
  _id: ObjectId;
};
