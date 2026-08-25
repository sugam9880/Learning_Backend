import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema(
  {
    name: {
      // playListName
      type: String,
      required: true,
    },
    description: {
      //playList Description
      type: String,
      required: Boolean,
    },
    videoId: [
      {
        // videos
        type: mongoose.Types.ObjectId,
        ref: "Video",
      },
    ],
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Playlist = mongoose.model("Playlist", playlistSchema);
