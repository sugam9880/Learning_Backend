import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDBFunction = async () => {
  try {
    const connectingDB = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `MongoDB Connected !! DB Host:${connectingDB.connection.host}  `
    );
  } catch (error) {
    // throw error;
    console.log("error", error);
    process.exit(1);
  }
};

export default connectDBFunction;
