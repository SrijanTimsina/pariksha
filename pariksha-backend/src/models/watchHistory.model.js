import mongoose, { Schema } from "mongoose";

const watchHistorySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    video: { type: Schema.Types.ObjectId, ref: "Video" },
    subject: { type: String, required: true },
  },
  { timestamps: true }
);

export const WatchHistory = mongoose.model("WatchHistory", watchHistorySchema);
