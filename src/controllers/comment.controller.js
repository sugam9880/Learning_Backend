import { ApiError } from "../utils/Apierrors.js";
import { apiResponse } from "../utils/Apiresponse.js";
import mongoose, { set } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.model.js";

const addComent = asyncHandler(async (req, res) => {
  const { comment } = req.body; // send from front-end
  const { videoId } = req.params;

  if (!(comment && videoId)) {
    throw ApiError(400, "Invalid");
  }

  const user_commenterId = req.user?._id;

  const commenter = await Comment.create({
    comment,
    owner: user_commenterId,
    videoId,
  });

  if (!commenter) {
    throw new ApiError(400, "db not created");
  }
  console.log("successfully commented the comment");

  return res
    .status(200)
    .json(new apiResponse(200, { commenter }, "comment submitted"));
});

const updateComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const { commentId } = req.params;

  if (!(comment && commentId)) {
    throw new ApiError(409, "comment required");
  }

  const video = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        comment,
      },
    },
    {
      new: true,
    }
  );

  if (!updateComment) {
    throw new ApiError(400, "comment Failed");
  }

  return res
    .status(200)
    .json(new apiResponse(200, { video }, "comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentID } = req.params;

  if (!commentID) {
    throw new ApiError(400, "commentID required");
  }

  const deleting = await Comment.findByIdAndDelete(commentID);

  if (!deleting) {
    throw new ApiError(400, "something went wrong");
  }

  return res
    .status(200)
    .json(new apiResponse(200, { deleting }, "comment deleted successfully"));
});

const getComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new ApiError(402, "vidoeId is required");
  }
  const comment = await Comment.aggregate([
    {
      $match: {
        videoId: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "commenter",
        pipeline: [
          {
            $project: {
              password: 0,
              refreshToken: 0,
              watchHistory: 0,
            },
          },
        ],
      },
    },
    {
      $unwind: "$commenter",
    },
  ]);
  if (comment.length === 0) {
    new apiResponse(200, { comment }, "no comments yet!");
  }
  return res
    .status(200)
    .json(new apiResponse(200, { comment }, "got the comment successfully!"));
});

export { addComent, updateComment, deleteComment, getComment };
