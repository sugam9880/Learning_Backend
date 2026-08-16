import { Router } from "express"
// import { upload } from "../middlewares/multer.middleware";
import { verifyjwt } from '../middlewares/auth.middleware.js'
import { addToPalyList, createPlayList, deletePlayList, removeFromPlayList } from "../controllers/playList.controller.js";

const router = Router();
// creatingPlayList and adding video if there is videoId
router.route("/PlayList/createPlayList/:videoId").post(verifyjwt,createPlayList);

// adding video to playList

router.route("/PlayList/addToPlayList/:PlayListId/:videoId").patch(verifyjwt,addToPalyList);

// remove video from playList

router.route("/PlayList/removeFromPlayList/:PlayListId/:videoId").patch(verifyjwt,removeFromPlayList);

// delete playList

router.route("/PlayList/deletePlayList/:PlayListId/:videoId").delete(verifyjwt,deletePlayList);