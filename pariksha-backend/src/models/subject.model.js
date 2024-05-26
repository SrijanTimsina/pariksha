import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sections: [
      {
        type: Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
    videoCount: { type: Number },
    duration: { type: String },
  },
  { timestamps: true }
);

export const Subject = mongoose.model("Subject", subjectSchema);
