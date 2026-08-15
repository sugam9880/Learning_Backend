import { Router } from "express"
// import { upload } from "../middlewares/multer.middleware";
import { verifyjwt } from '../middlewares/auth.middleware.js'
import { dislike, like } from "../controllers/like.controller.js";

const router = Route();

router.route("/liked/:videoId").post(verifyjwt,like);
router.route("/disliked/:videoId").post(verifyjwt,dislike);