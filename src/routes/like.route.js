import { Router } from "express";
// import { upload } from "../middlewares/multer.middleware";
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { dislike, like, likeStatus } from "../controllers/like.controller.js";

const likeRouter = Router();

likeRouter.route("/liked/:videoId").post(verifyjwt, like);
likeRouter.route("/disliked/:videoId").delete(verifyjwt, dislike);
likeRouter.route("/likeStatus/:videoId").get(likeStatus);
// likeRouter.route("/getAll_liked_videos").get(getLikeDocument);

export { likeRouter };
