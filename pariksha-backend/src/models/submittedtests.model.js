import mongoose, { Schema } from "mongoose";

const submittedTestsSchema = new Schema(
  {
    questionSetId: {
      type: Schema.Types.ObjectId,
      ref: "QuestionSet",
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },
  },
  { timestamps: true }
);

export const SubmittedTests = mongoose.model(
  "SubmittedTests",
  submittedTestsSchema
);
