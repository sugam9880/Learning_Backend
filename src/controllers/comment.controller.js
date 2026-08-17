import { ApiError } from "../utils/Apierrors.js";
import { apiResponse } from "../utils/Apiresponse.js";
import mongoose, { set } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Comment} from "../models/comment.model.js"

const addComent = asyncHandler(async(req,res)=>{
    const {comment} = req.body; // send from front-end 
    const {videoId} = req.params

    if (!(comment && videoId)) {
        throw ApiError(400,"Invalid");
    }

    const user_commenterId = req.user?._id;

    const commenter = await Comment.create({
        comment,
        owner: user_commenterId, 
        videoId
    })

    if (!commenter) {
        throw new ApiError(400,'db not created')
    }

    // const commenterDoc = await Comment.findById(videoId);

    // if (!commenterDoc) {
    //     throw new ApiError(400,"Invalid Comment")
    // }

    return res.status(200).json(
        new apiResponse(200,{commenter}, 'comment submitted')
    )

})

const updateComment = asyncHandler(async(req,res)=>{
    const {comment} = req.body;
    const {commentId} = req.params;

    if (!(comment && commentId)) {
        throw new ApiError(409,"comment required")
    }

    const video = await Comment.findByIdAndUpdate(
        commentId,
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
    const {commentID} = req.params;

    if (!commentID) {
        throw new ApiError(400,"commentID required")
    }

    const deleting = await Comment.findByIdAndDelete(commentID)

    if (!deleting) {
        throw new ApiError(400,'something went wrong')
    }

    return res.status(200).json(
        new apiResponse(200,{deleting},'comment deleted successfully')
    )
})

export {addComent,updateComment,deleteComment}