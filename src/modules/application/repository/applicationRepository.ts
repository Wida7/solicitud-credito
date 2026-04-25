import clientPromise from "@/infrastructure/database/mongo";
import { Application } from "../domain/types/application.types";
import { MongoApplication } from "../domain/types/mongo.types";

//Manejo de errores con tryCatchWrapper
import { tryCatchWrapper } from "@/lib/utils/tryCatchWrapper";

const database = "next-mongodb";
const collection = "solicitudes_credito";

export const applicationRepository = {

	logger: (message: string) => {
		console.log(`📦 [ApplicationRepository] ${message}`);
	},

	//Crear una nueva solicitud de crédito
	async create(data: Omit<Application, "id" >): Promise<Application> {
		return tryCatchWrapper(async () => {
			const client = await clientPromise;
			const db = client.db(database);

			const document = {
				...data,
				createdAt: new Date().toString
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

	// Listar todas las solicitudes de crédito
	async findAll(): Promise<Application[]> {
		return tryCatchWrapper(async () => {
			const client = await clientPromise;
			const db = client.db(database);

			const data = await db.collection(collection).find().toArray();

			return data.map((doc) => ({
				id: doc._id.toString(),
				name: doc.name,
				identification: doc.identification,
				email: doc.email,
				monto: doc.monto,
				plazo: doc.plazo,
				status: doc.status,
				createdAt: doc.createdAt,
			}));
		});
	},
};