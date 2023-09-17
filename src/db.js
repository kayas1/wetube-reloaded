require("dotenv").config();
import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db=mongoose.connection;

const handleOpen=()=> console.log("Connected to db");
db.on("error", (error)=>console.log("DB ERROR!", error));
db.once("open", handleOpen);
