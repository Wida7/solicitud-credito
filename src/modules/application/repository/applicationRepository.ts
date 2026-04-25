import clientPromise from "@/infrastructure/database/mongo";
import {
  Application,
  CreateApplicationInput,
} from "../domain/types/application.types";
import { MongoApplication } from "../domain/types/mongo.types";
import { tryCatchWrapper } from "@/lib/utils/tryCatchWrapper";

const database = "next-mongodb";
const collection = "solicitudes_credito";

export const applicationRepository = {
  logger: (message: string) => {
    console.log(`[ApplicationRepository] ${message}`);
  },

  async create(data: CreateApplicationInput): Promise<Application> {
    return tryCatchWrapper(async () => {
      const client = await clientPromise;
      const db = client.db(database);

      const document: Omit<MongoApplication, "_id"> = {
        ...data,
        status: data.status ?? "DRAFT",
        createdAt: new Date().toISOString(),
      };

      const result = await db
        .collection<Omit<MongoApplication, "_id">>(collection)
        .insertOne(document);

      return {
        ...document,
        id: result.insertedId.toString(),
      };
    });
  },

  async findAll(): Promise<Application[]> {
    return tryCatchWrapper(async () => {
      const client = await clientPromise;
      const db = client.db(database);

      const data = await db.collection<MongoApplication>(collection).find().toArray();

      return data.map((doc) => ({
        id: doc._id.toString(),
        name: doc.name,
        email: doc.email,
        phone: doc.phone,
        identificationType: doc.identificationType,
        identification: doc.identification,
        monto: doc.monto,
        plazo: doc.plazo,
        cuotaAprox: doc.cuotaAprox,
        occupation: doc.occupation,
        ingresos: doc.ingresos,
        egresos: doc.egresos,
        yearly: doc.yearly,
        status: doc.status,
        createdAt: doc.createdAt,
      }));
    });
  },
};
