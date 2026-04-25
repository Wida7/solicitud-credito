import clientPromise from "@/infrastructure/database/mongo";
import { AbandonApplication } from "../domain/types/abandon.types";
import { MongoAbandonApplication } from "../domain/types/mongo.types";

//Manejo de errores con tryCatchWrapper
import { tryCatchWrapper } from "@/lib/utils/tryCatchWrapper";

const database = "next-mongodb";
const collection = "solicitudes_abandonadas";

export const abandonRepository = {

  logger: (message: string) => {
    console.log(`📦 [AbandonRepository] ${message}`);
  },

  async create(
    data: Omit<AbandonApplication, "id">
  ): Promise<AbandonApplication> {
    return tryCatchWrapper(async () => {
      const client = await clientPromise;
      const db = client.db(database);

      const document: Omit<MongoAbandonApplication, "_id"> = {
        ...data,
        createdAt: new Date().toISOString(),
      };

      const result = await db
        .collection<Omit<MongoAbandonApplication, "_id">>(collection)
        .insertOne(document);

      return {
        ...document,
        id: result.insertedId.toString(),
      };
    });
  },

  // Listar todas las solicitudes de abandono
  async findAll(): Promise<AbandonApplication[]> {
    return tryCatchWrapper(async () => {
      const client = await clientPromise;
      const db = client.db(database);

      const data = await db.collection(collection).find().toArray();

      return data.map((doc) => ({
        id: doc._id.toString(),
        rating: doc.rating,
        message: doc.message,
        stepAbandon: doc.stepAbandon,
        formSnapshot: doc.formSnapshot,
        createdAt: doc.createdAt,
      }));
    });
  },
};
