import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { verifyjwt } from '../middlewares/auth.middleware.js'
import { video } from "../controllers/video.contoller.js";

const router = Router();
router.route("/uploadingVideo").post(
    upload.fields([
        {
            name:"videoFile",
            maxCount:1
        },
        {
            name:"thumbnail",
            maxCount:1
        }
    ]),
  verifyjwt,uploadvideo)

  router.route("/deletevideo/:videoId").get(removeVideo)

