import express from "express";
import {edit,remove} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/user", edit);
userRouter.get("/remove", remove);

export default userRouter;