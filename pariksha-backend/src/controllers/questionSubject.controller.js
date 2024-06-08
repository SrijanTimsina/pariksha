import { QuestionSubject } from "../models/questionsubject.model.js";
import { QuestionSet } from "../models/questionset.model.js";
import { Question } from "../models/question.model.js";
import { Answer } from "../models/question.model.js";

import { ApiError } from "../utils/ApiError.js";

const createQuestionSubject = async ({ subject }) => {
  const questionSubject = await QuestionSubject.create({
    name: subject.name,
  });
  const createdQuestionSubject = await QuestionSubject.findById(
    questionSubject._id
  );

  const questionsArray = await Promise.all(
    subject.questions.map(async (question) => {
      const answersArray = await Promise.all(
        question.answers.map(async (answer) => {
          const createdAnswer = await Answer.create({ text: answer });
          return createdAnswer;
        })
      );

      const createdQuestion = await Question.create({
        questionText: question.text,
        answers: answersArray,
        correctAnswer: answersArray[0]["_id"],
        questionSubject: createdQuestionSubject._id,
      });

      return createdQuestion._id;
    })
  );

  await QuestionSubject.findByIdAndUpdate(
    createdQuestionSubject._id,
    {
      $set: { questions: questionsArray },
    },
    { new: true }
  );

  return createdQuestionSubject._id;
};

export { createQuestionSubject };
