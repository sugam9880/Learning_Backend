import { ApiError } from "../utils/Apierrors.js";
import { apiResponse } from "../utils/Apiresponse.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.model.js";
import { User } from "../models/user.model.js";

const like = asyncHandler(async(req,res)=>{
    const {videoId} = req.params;
    const likedBy = req.user?._id;
    if (!likedBy) {
        throw new ApiError(400,'invalid');
    }

    const likeInfo = await Like.create({
        likedBy,
        videoId
    })

    if (!likeInfo) {
        throw new ApiError(409,"Something went wrong")
    }

    res.status(200).json(
        new apiResponse(200,{likeInfo},'liked')
    )


})

const dislike = asyncHandler(async(req,res)=>{
    const {videoId} = req.params;
    const likedBy = req.user?._id;

    if (!(dislikedBy && videoId)) {
        throw new ApiError(409,'not got the id')
    }
    const disliked = await Like.findOneAndDelete({
     videoId,
     likedBy
    });

    if (!disliked) {
        throw new ApiError(409,'user has not liked the video')
    }

    return res.status(200).json(
        new apiResponse(200,{}, 'Disliked Successfully')
    )
})
export {like,dislike}