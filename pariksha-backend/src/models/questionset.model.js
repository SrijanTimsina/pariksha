import mongoose, { Schema } from "mongoose";

const questionSetSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    setType: { type: String, enum: ["past", "mock"], required: true },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "QuestionSubject",
      },
    ],
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const QuestionSet = mongoose.model("QuestionSet", questionSetSchema);
