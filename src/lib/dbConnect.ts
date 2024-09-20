import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  //* First checking if there already is a connection

  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  //* if not

  try {
    const db = await mongoose.connect(process.env.DATABASE_URL || "", {});

    // console.log("db.connections", db.connections[0].readyState);

    connection.isConnected = db.connections[0].readyState;

    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("Database connection failed", error);

    process.exit(1);
  }
}

export default dbConnect;
