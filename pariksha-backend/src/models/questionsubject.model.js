import mongoose, { Schema } from "mongoose";

const questionSubjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  { timestamps: true }
);

export const QuestionSubject = mongoose.model(
  "QuestionSubject",
  questionSubjectSchema
);
