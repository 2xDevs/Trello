import { env } from "@/env";
import { MongoClient } from "mongodb";

const MONGODB_URI = env.MONGODB_URL;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  cachedClient = new MongoClient(MONGODB_URI);

  await cachedClient.connect();
  return cachedClient;
}

export default connectToDatabase;
