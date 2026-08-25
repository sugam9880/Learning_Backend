import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    videoId: {
      type: mongoose.Types.ObjectId,
      ref: "Video",
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
