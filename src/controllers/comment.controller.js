import { ApiError } from "../utils/Apierrors";
import { apiResponse } from "../utils/Apiresponse";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";
import {Comment} from "../models/comment.model"

const commentController = asyncHandler(async(req,res)=>{
    const {comment,videoId} = req.body; // send from front-end 

    if (!(comment && videoId)) {
        throw ApiError(400,"Invalid");
    }

    const user_commenterId = req.user?._id;

    const commenter = await Comment.create({
        comment,
        owner: user_commenterId, 
        videoId
    })

    return res.status(200).json(
        new apiResponse(200,{commenter}, 'comment problem solved!')
    )

})