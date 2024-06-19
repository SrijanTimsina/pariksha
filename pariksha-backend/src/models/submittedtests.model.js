import mongoose, { Schema } from "mongoose";

const submittedTestsSchema = new Schema(
  {
    questionSetId: { type: Schema.Types.ObjectId, ref: "QuestionSet" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    score: { type: Number, required: true },
  },
  { timestamps: true }
);

export const SubmittedTests = mongoose.model(
  "SubmittedTests",
  submittedTestsSchema
);
