import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB is connected");
    });
    connection.on("error", (error) => {
      console.log("MongooDB connection error, please make sure db is up and running  ", error);
      process.exit();
    });
  } catch (error) {
    console.error("Somethning went wrong in connnecting to DB");
    console.error(error);
  }
}
