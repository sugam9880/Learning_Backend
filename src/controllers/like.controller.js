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

const likeStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const like = await Like.findOne({ videoId });

  if (like) {
    return res.status(200).json(new apiResponse(200, true, " liked"));
  }
  return res.status(200).json(new apiResponse(200, false, " not liked"));
});
const getLikedvideos = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const like = await Like.aggregate([
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
    {
      $lookup: {
        from: "videos",
        localField: "videoId",
        foreignField: "_id",
        as: "likedVideos",
      },
    },
    {
      $unwind: "$likedVideos",
    },
    {
      $replaceWith: "$likedVideos",
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "userInfo",
        pipeline: [
          {
            $project: {
              password: 0,
              refreshToken: 0,
            },
          },
        ],
      },
    },
  ]);
  if (!like && like.length > 0) {
    throw new ApiError(400, "no Liked Videos");
  }
  return res
    .status(200)
    .json(new apiResponse(200, { like }, "got liked videos successfully"));
});
export { like, dislike, likeStatus, getLikedvideos };
