import { ApiError } from "../utils/Apierrors.js";
import { apiResponse } from "../utils/Apiresponse.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Playlist } from "../models/playList.model.js";

const createPlayList = asyncHandler(async(req,res)=>{
    const {name,desciption} = req.body;
    const {videoId} = req.params // id
    const user = req.user?._id

    if (!(name && desciption)) {
        throw new ApiError(409,"server failed try again")
    }

    const PlayListData = {
        name,
        desciption
    };
    if (videoId) {
     PlayListData.videoId = [videoId]
    }
    
    const creatingPlayList = await Playlist.create(PlayListData);

    const playList = await Playlist.findOne({name,description,videoId})
    if (!playList) {
        throw new ApiError(409,"playList not created")
    }

    return res.status(200).json(
        new apiResponse(200,{playList},'PlayList created successfully and the video is added if videoId was sent')
    )
})

const addToPalyList = asyncHandler(async(req,res)=>{
    const {name,desciption} = req.body;
    const {videoId} = req.params // id
    const user = req.user?._id
    ////////////////////////////////////
   const addvideo = await Playlist.findByIdAndUpdate(
        Playlist._id,
        {
            $push:{
                videoId
            }
        },{
            new: true
        }
    )

    if (!(name && desciption && user)) {
        throw new ApiError(400,"Name and Desciption are required")
    }
    return res.status(200).json(
        new apiResponse(200,{playListDoc},'PlayList Created Successfully')
    )

})

const removeFromPlayList = asyncHandler(async(req,res)=>{
    const {name,desciption} = req.body;
    const {videoId} = req.params // id

    if (!(name && desciption && videoId)) {
        throw new ApiError(409,"Server failed please try again later")
    }

  
})

export {addToPalyList}