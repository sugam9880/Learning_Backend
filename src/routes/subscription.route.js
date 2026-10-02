import { Router } from "express";
import { verifyjwt } from "../middlewares/auth.middleware.js";
import {
  getSubscriber,
  subscribe,
  subscribeStatus,
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
//subscribe status
subscriptionRouter
  .route("/subscribeStatus_and/count")
  .get(verifyjwt, subscribeStatus);

export { subscriptionRouter };
