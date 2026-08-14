import { ApiError } from "../utils/Apierrors.js";
import { apiResponse } from "../utils/Apiresponse.js";
import mongoose, { set } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Comment} from "../models/comment.model.js"

const addComent = asyncHandler(async(req,res)=>{
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

    const commenterDoc = await Comment.findById(videoId);

    if (!commenterDoc) {
        throw new ApiError(400,"Invalid Comment")
    }

    return res.status(200).json(
        new apiResponse(200,{commenterDoc}, 'comment submitted')
    )

})

const updateComment = asyncHandler(async(req,res)=>{
    const {comment,videoId} = req.body;

    if (!(comment && videoId)) {
        throw new ApiError(409,"comment required")
    }

    const video = await Comment.findByIdAndUpdate(
        videoId,
        {
            $set:{
                comment
            }
        },
        {
            new: true
        }
    
    )

    if (!updateComment) {
        throw new ApiError(400,"comment Failed")
    }

    return res.status(200).json(
        new apiResponse(200,{video},'comment updated successfully')
    )

})

const deleteComment = asyncHandler(async(req,res)=>{
    const {videoId} = req.body;

    if (!videoId) {
        throw new ApiError(400,"VideoId required")
    }

    const deleting = await Comment.findByIdAndUpdate(videoId,
        {
            $set:{
                comment: undefined
            }
        },
        {new:true}
    )

    if (!deleting) {
        throw new ApiError(400,'something went wrong')
    }

    return res.status(200).json(
        new apiResponse(200,{deleting},'comment deleted successfully')
    )
})

export {addComent,updateComment,deleteComment}