import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.0/wetube");

const db=mongoose.connection;

const handleOpen=()=> console.log("Connected to db");
db.on("error", (error)=>console.log("DB ERROR!", error));
db.once("open", handleOpen);
