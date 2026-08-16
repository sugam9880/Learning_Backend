import { Router } from "express"
// import { upload } from "../middlewares/multer.middleware";
import { verifyjwt } from '../middlewares/auth.middleware.js'
import { addComent, deleteComment, updateComment } from "../controllers/comment.controller.js";

const router = Router();

router.route("/addingcomment/comment/:videoId").post(verifyjwt,addComent)
router.route("/updatingcomment/:commentId/:videoId").patch(verifyjwt,updateComment)
router.route("/deletingcomment/:commentId/:videoId").delete(verifyjwt,deleteComment)

