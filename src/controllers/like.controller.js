import { ApiError } from "../utils/Apierrors.js";
import { apiResponse } from "../utils/Apiresponse.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.model.js";

const like = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const likedBy = req.user?._id;
  if (!videoId) {
    throw new ApiError(304, "videoId is required");
  }
  if (!likedBy) {
    throw new ApiError(400, "unauthorized");
  }

  const AlreadyExist = await Like.findOne({ videoId, likedBy });

  if (AlreadyExist) {
    // dislike();
    throw new ApiError(409, "already Exist");
  }

  const likeInfo = await Like.create({
    likedBy,
    videoId,
  });

  if (!likeInfo) {
    throw new ApiError(409, "Something went wrong");
  }

  res.status(200).json(new apiResponse(200, { likeInfo }, "liked"));
});

const dislike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const dislikedBy = req.user?._id;

  if (!(dislikedBy && videoId)) {
    throw new ApiError(409, "not got the id");
  }
  const disliked = await Like.findOneAndDelete({
    videoId,
    likedBy: dislikedBy,
  });

  if (!disliked) {
    throw new ApiError(409, "user has not liked the video");
  }

  return res
    .status(200)
    .json(new apiResponse(200, { disliked }, "Disliked Successfully"));
});

// const checkLikeStatus = asyncHandler(async (req, res) => {
//   // const { videoId } = req.params;
//   // const likedBy = req.user?._id;
//   // const findStatus = Like.find((videoId,likedBy));
//   const findStatus = await Like.aggregate([
//     {
//       $lookup: {
//         from: "users",
//         localField: "likedBy",
//         foreignField: "_id",
//         as: "likeStatus",
//       },
//     },
//     {
//       $addFields: {
//         likecount: {
//           $size: "$likeStatus",
//         },
//       },
//     },
//   ]);
//   if (!findStatus && findStatus.length > 0) {
//     throw new ApiError(401, "no data");
//   }
//   return res
//     .status(200)
//     .json(new apiResponse(200, { findStatus }, "got the data"));
// });
export { like, dislike };
