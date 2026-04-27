import clientPromise from "@/backend/infrastructure/mongo";
import { MongoUpdateLog } from "@/core/domain/types/mongo.types";
import { tryCatchWrapper } from "@/lib/utils/tryCatchWrapper";

const database = "next-mongodb";
const collection = "logs_update";

export const logUpdateRepository = {
  async create(data: MongoUpdateLog): Promise<void> {
    return tryCatchWrapper(async () => {
      const client = await clientPromise;
      const db = client.db(database);

      await db.collection<MongoUpdateLog>(collection).insertOne(data);
      console.log(`[logUpdateRepository] Log de actualización guardado para aplicación ${data.applicationId}`);
    });
  },
};
