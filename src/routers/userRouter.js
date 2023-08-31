import express from "express";

const userRouter = express.Router();
const handleEditUser = (req,res) => res.send("Edit User");
userRouter.get("/user", handleEditUser);

export default userRouter;