import clientPromise from "@/infrastructure/database/mongo";
import { MongoUser } from "../domain/types/auth.types";

const database = "next-mongodb";
const collection = "usuarios";

export const authRepository = {
  async findByUsername(username: string): Promise<MongoUser | null> {
    const client = await clientPromise;
    const db = client.db(database);

    return db.collection<MongoUser>(collection).findOne({ username });
  },
};
