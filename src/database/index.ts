import { MongoClient } from "mongodb";
import { Database, User, Listing, Booking } from "../lib/types";

const url = `${process.env.MONGODB_CONNECTION_STRING}`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(process.env.DB_NAME);

  return {
    bookings: db.collection<Booking>("bookings"),
    listings: db.collection<Listing>("listings"),
    users: db.collection<User>("users"),
  };
};
