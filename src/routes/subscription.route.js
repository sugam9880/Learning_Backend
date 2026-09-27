import { Router } from "express";
import { verifyjwt } from "../middlewares/auth.middleware.js";
import {
  getSubscriber,
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
subscriptionRouter.route("/getSubscriber").get(verifyjwt, getSubscriber);

export { subscriptionRouter };
