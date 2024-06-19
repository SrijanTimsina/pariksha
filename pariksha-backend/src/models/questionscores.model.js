import mongoose, { Schema } from "mongoose";

const questionScoresSchema = new Schema(
  {
    questionSetId: { type: Schema.Types.ObjectId, ref: "QuestionSet" },
    scores: { type: [Number], default: [] },
  },
  { timestamps: true }
);

questionScoresSchema.methods.findRank = async function (score) {
  const sortedArray = this.scores;
  let left = 0;
  let right = sortedArray.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (sortedArray[mid] <= score) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return sortedArray.length + 1 - left;
};

export const QuestionScores = mongoose.model(
  "QuestionScores",
  questionScoresSchema
);
