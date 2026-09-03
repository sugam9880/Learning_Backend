import { Router } from "express";
// import { upload } from "../middlewares/multer.middleware";
import { verifyjwt } from "../middlewares/auth.middleware.js";
import {
  checkLikeStatus,
  dislike,
  like,
} from "../controllers/like.controller.js";

const likeRouter = Router();

likeRouter.route("/liked/:videoId").post(verifyjwt, like);
likeRouter.route("/disliked/:videoId").delete(verifyjwt, dislike);
// likeRouter.route("/checkLikeStatus").get(verifyjwt, checkLikeStatus);

export { likeRouter };
