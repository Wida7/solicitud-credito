import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

// Validación de URI
/* console.log("MONGODB_URI:", process.env.MONGODB_URI); */
if (!uri) {
  throw new Error("❌ MONGODB_URI no está definida");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    console.log("📡 Conectando a Mongo...");
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;

} else {

  client = new MongoClient(uri);
  clientPromise = client.connect();
  
}

export default clientPromise;