import { ApiError } from "../utils/Apierrors";
import { apiResponse } from "../utils/Apiresponse";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";
import { Like } from "../models/like.model.js";

const like = asyncHandler(async(req,res)=>{
    const {videoId} = req.body;
    const likedBy = req.user;
    if (!likedBy) {
        throw new ApiError(400,'invalid');
    }

  const likedDocument =   await Like.create({
        videoId,
        likedBy
    })

    res.status(200).json(
        new apiResponse(200,{likedDocument},'liked')
    )


})