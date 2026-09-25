import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";
import {
  uploadvideo,
  removeVideo,
  getAllVideos,
  updateViewsOfVideo,
  updateWatchHistory,
} from "../controllers/video.contoller.js";

const videoRouter = Router();
videoRouter.route("/uploadingVideo").post(
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  verifyjwt,
  uploadvideo
);

videoRouter.route("/deletevideo/:videoId").delete(removeVideo);

videoRouter.route("/All_YtVideos").get(getAllVideos);
videoRouter.route("/updateView/:videoId").patch(updateViewsOfVideo);
videoRouter.route("/updateView/:videoId").patch(updateWatchHistory);
export { videoRouter };
