import express from "express";
import { UserAuth } from "../src/middleware/userAuth.js";
import { getUserData } from "../src/controller/userController.js";

const userRouter = express.Router();
// Endpoint for get users data
userRouter.get('/data', UserAuth, getUserData);

export default userRouter;