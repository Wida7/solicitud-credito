import { ObjectId } from "mongodb";

export interface MongoApplication {
  _id: ObjectId;
  name: string;
  email: string;
  monto: number;
  plazo: number;
  status: "DRAFT" | "APPROVED" | "REJECTED";
  createdAt: string;
}