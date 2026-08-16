import { ApiError } from "../utils/Apierrors.js";
import { apiResponse } from "../utils/Apiresponse.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Playlist } from "../models/playList.model.js";

const createPlayList = asyncHandler(async(req,res)=>{
    const {name,desciption} = req.body;
    const {videoId} = req.params // id
    const owner = req.user?._id

    if (!(name && desciption)) {
        throw new ApiError(409,"server failed try again")
    }
    const PlayListData = {
        name,
        desciption,
        owner
    };
    if (videoId) {
     PlayListData.videoId = [videoId]
    }

    const PlayList = await Playlist.create(PlayListData);

    const playList = await Playlist.findOne({name,description,videoId})

    if (!playList) {
        throw new ApiError(409,"playList not created")
    }

    return res.status(200).json(
        new apiResponse(200,{playList},'PlayList created successfully and the video is added if videoId was sent')
    )
})
const addToPalyList = asyncHandler(async(req,res)=>{
    const {PlayListId,videoId} = req.params // id
    const owner = req.user?._id

    if (!(PlayListId && videoId)) {
        throw new ApiError(400,"server failed")
    }
    if (!owner) {
        throw new ApiError(400,"not loggedIn")
    }
   const addvideo = await Playlist.findOneAndUpdate(
        {
            _id: PlayListId,
            owner
        },
        {
            $addToSet:{
                videoId: videoId
            }
        },{
            new: true
        }
    )

    if (!(name && desciption && user)) {
        throw new ApiError(400,"Name and Desciption are required")
    }
    return res.status(200).json(
        new apiResponse(200,{addvideo},'PlayList Created Successfully')
    )
})

const removeFromPlayList = asyncHandler(async(req,res)=>{
    const {PlayListId,videoId} = req.params // id
    const owner = req.user._id;

    if (!(PlayListId && videoId)) {
        throw new ApiError(409,"Server failed please try again later")
    }

  const removeVideoFromPlayList =   await Playlist.findOneAndUpdate(
    {
        _id:PlayListId,
        owner
    },
    {
        $pull:{
            videoId: videoId
        }
    },{
        new: true
    }
  )

  if (!removeVideoFromPlayList) {
    throw new ApiError(404,"server problem!")
  }
  return res.status(200).json(
    new apiResponse(200,{removeVideoFromPlayList}, "video successfully removed from playlist")
  )
})

const deletePlayList = asyncHandler(async(req,res)=>{
    const {name,desciption} = req.body;
    const {playListId,videoId} = req.params;
    const owner = req.user._id;

    if (!(name,desciption,videoId,user)) {
        throw new ApiError(404,"PlayList not found")
    }

  const deletingPlayList = await Playlist.findOneAndDelete(name,desciption,playListId,videoId,owner);

  if (!deletePlayList) {
    throw new ApiError(299,'server failed')
  }

  return res.status(200).json(
    new apiResponse(200,{deletePlayList},'PlayList deleted')
  )
})

export {createPlayList,addToPalyList,removeFromPlayList,deletePlayList}