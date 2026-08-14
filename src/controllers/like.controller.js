import { ApiError } from "../utils/Apierrors.js";
import { apiResponse } from "../utils/Apiresponse.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.model.js";

const like = asyncHandler(async(req,res)=>{
    const {videoId} = req.body;
    const {likedBy} = req.user?._id;
    if (!likedBy) {
        throw new ApiError(400,'invalid');
    }

  const likedDocument =   await Like.create({
        videoId,
        likedBy
    })

    const likeDoc = await Like.findById(videoId);

    if (!likeDoc) {
        throw new ApiError(409,"Something went wrong")
    }

    res.status(200).json(
        new apiResponse(200,{likeDoc},'liked')
    )


})

const dislike = asyncHandler(async(req,res)=>{
    const {likedBy} = req.user?._id;

    if (!likedBy) {
        throw new ApiError(409,'not got the id')
    }

    const disliked = Like.findById(likedBy);
    if (!disliked) {
        throw new ApiError(409,'something went wrong')
    }

    return res.status(200).json(
        new apiResponse(200,{disliked}, 'Disliked Successfully')
    )
})
export {like,dislike}