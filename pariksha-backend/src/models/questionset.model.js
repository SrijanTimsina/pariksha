import mongoose, { Schema } from "mongoose";
import { QuestionScores } from "./questionscores.model.js";

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
    number: {
      type: String,
      required: true,
    },
    avgScore: {
      type: Number,
      default: 0,
    },
    submissionCount: {
      type: Number,
      default: 0,
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

questionSetSchema.post("save", async function (doc, next) {
  try {
    QuestionScores.create({
      questionSetId: doc._id,
    });
    next();
  } catch (error) {
    next(error);
  }
});

export const QuestionSet = mongoose.model("QuestionSet", questionSetSchema);
