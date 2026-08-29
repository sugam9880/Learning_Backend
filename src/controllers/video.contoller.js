import { ApiError } from "../utils/Apierrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/Apiresponse.js";
import { Subscription } from "../models/subscription.model.js";
import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadvideo = asyncHandler(async (req, res) => {
  // console.log('BODY',req.body);
  // console.log("files",req.files);
  const { title, description } = req.body;
  const owner = req.user._id;

  const videoLocalPath = req.files?.videoFile[0]?.path;
  const thumbnailLocalPath = req.files?.thumbnail[0].path;

  if (!videoLocalPath) {
    throw new ApiError(409, "didnot got the video");
  }

  const videoFile = await uploadOnCloudinary(videoLocalPath); // response
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath); // response

  if (!videoFile) {
    throw new ApiError(400, "file not uploaded to cloudinary");
  }

  const userVideo = await Video.create({
    videoFile: videoFile.url,
    thumbnail: thumbnail.url || null,
    title,
    description,
    duration: videoFile.duration,
    owner,
    // cloudinaryThumbnail: videoFile.thumbnail_url,
  });

  if (!userVideo) {
    throw new ApiError(404, "something went wrong");
  }
  return res
    .status(200)
    .json(new apiResponse(200, { userVideo }, " Video successfully uploaded"));
});

const removeVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(409, "unable to delete this video");
  }

  const video = await Video.findByIdAndDelete(videoId);

  if (!video) {
    throw new ApiError(404, "cannot delete the video");
  }
  return res
    .status(200)
    .json(new apiResponse(200, {}, " video has been removed"));
});

// const getAllVideos = asyncHandler(async (req, res) => {
//   const Videos = Video.find();
//   const video = Video.aggregate[
//     {
//       $lookup:{

//       }
//     }
//   ]
// });

export { uploadvideo, removeVideo };
