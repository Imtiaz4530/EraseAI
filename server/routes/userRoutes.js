import express from "express";
import {
  clerkWebhooks,
  userCredits,
  userPayment,
  verifyStripe,
} from "../controllers/userController.js";
import authUser from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/webhooks", clerkWebhooks);
userRouter.get("/credits", authUser, userCredits);
userRouter.post("/pay-stripe", authUser, userPayment);
userRouter.post("/verifystripe", authUser, verifyStripe);

export default userRouter;
