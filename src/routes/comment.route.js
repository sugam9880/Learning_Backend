import { Router } from "express"
// import { upload } from "../middlewares/multer.middleware";
import { verifyjwt } from '../middlewares/auth.middleware.js'
import { addComent, deleteComment, updateComment } from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.route("/addingcomment/comment/:videoId").post(verifyjwt,addComent)
commentRouter.route("/updatingcomment/:commentId/:videoId").patch(verifyjwt,updateComment)
commentRouter.route("/deletingcomment/:commentId/:videoId").delete(verifyjwt,deleteComment)

export {commentRouter}

