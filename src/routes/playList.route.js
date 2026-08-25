import { Router } from "express";
// import { upload } from "../middlewares/multer.middleware";
import { verifyjwt } from "../middlewares/auth.middleware.js";
import {
  addToPalyList,
  createPlayList,
  deletePlayList,
  removeFromPlayList,
} from "../controllers/playList.controller.js";

const playlistRouter = Router();
// creatingPlayList and adding video if there is videoId
playlistRouter
  .route("/PlayList/createPlayList/:videoId")
  .post(verifyjwt, createPlayList);

// adding video to playList

playlistRouter
  .route("/PlayList/addToPlayList/:PlayListId/:videoId")
  .patch(verifyjwt, addToPalyList);

// remove video from playList

playlistRouter
  .route("/PlayList/removeFromPlayList/:PlayListId/:videoId")
  .patch(verifyjwt, removeFromPlayList);

// delete playList

playlistRouter
  .route("/PlayList/deletePlayList/:PlayListId/:videoId")
  .delete(verifyjwt, deletePlayList);

export { playlistRouter };
