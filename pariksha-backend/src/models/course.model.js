import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    description: {
      type: String,
    },
    videoCount: { type: Number },
    duration: { type: String },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
