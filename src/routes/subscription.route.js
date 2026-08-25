import { Router } from "express";
import { verifyjwt } from "../middlewares/auth.middleware.js";
import {
  subscribe,
  unsubscrbe,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();
// subscribe
subscriptionRouter
  .route("/userSubscribe/:channelId")
  .post(verifyjwt, subscribe);

// unsubscribe
subscriptionRouter
  .route("/userUnsubscribe/:channelId")
  .delete(verifyjwt, unsubscrbe);

export { subscriptionRouter };
