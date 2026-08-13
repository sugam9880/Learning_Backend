import { ApiError } from "../utils/Apierrors";
import { apiResponse } from "../utils/Apiresponse";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";
import {Comment} from "../models/comment.model"

const commentController = asyncHandler(async(req,res)=>{
    const {comment} = req.body;

    if (!comment) {
        throw ApiError(400,"Invalid");
    }

    const user_commenterId = req.user?._id;

    const commenter = await Comment.create({
        comment,
        owner = user_commenterId 
    })

})