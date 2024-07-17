import mongoose from "mongoose";

export async function db() {
  try {
    let database = await mongoose.connect(process.env.MONGO_CLOUD_URL);
    console.log(`DB is connected on ${database.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
