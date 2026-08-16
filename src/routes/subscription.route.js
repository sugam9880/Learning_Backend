import {Router} from 'express'
import {verifyjwt} from '../middlewares/auth.middleware'
import { subscribe, unsubscrbe } from '../controllers/subscription.controller';

const router = Route();
// subscribe
router.route("/userSubscribe/:channelId").post(verifyjwt,subscribe);

// unsubscribe
router.route("/userUnsubscribe/:channelId").delete(verifyjwt,unsubscrbe);