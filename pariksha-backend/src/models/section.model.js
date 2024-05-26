import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    videoCount: { type: Number },
    duration: { type: String },
  },
  { timestamps: true }
);

export const Section = mongoose.model("Section", sectionSchema);
