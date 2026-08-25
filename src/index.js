// require('dotenv').config()
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
import connectDBFunction from "../src/DB/index.js";
import { app } from "../src/app.js";

connectDBFunction()
  .then(() => {
    app.on("Error", (error) => {
      console.log("Error", error);
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("DataBase Connection Failed", error));

// approach -2

// import express from "express"
// const app = express();

// ( async()=>{
//     try {
//      await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//      app.on("error", (error)=>{
//         console.log(error);
//         throw error;
//      })
//      app.listen( process.env.PORT, ()=>{
//         console.log(`App is listening on port ${process.env.PORT}`);

//      })
//     } catch (error) {
//         console.log(error);
//         throw error
//     }
// })()
