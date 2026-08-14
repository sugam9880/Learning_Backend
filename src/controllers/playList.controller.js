import { ApiError } from "../utils/Apierrors.js";
import { apiResponse } from "../utils/Apiresponse.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Playlist } from "../models/playList.model.js";

const addToPalyList = asyncHandler(async(req,res)=>{
    const {name,desciption} = req.body;
    const {video} = req.params // id

    if (!(name && desciption && video)) {
        throw new ApiError(400,"Name and Desciption are required")
    }

    const playList = await Playlist.create({
        name,
        description,
        video
    })

    const playListDoc =  await Playlist.findById(video);
    if (!playListDoc) {
        throw new ApiError(409,'PlayList is Unavailable')
    }

    return res.status(200).json(
        new apiResponse(200,{playListDoc},'PlayList Created Successfully')
    )

})

const 

export {addToPalyList}