import { QuestionSubject } from "../models/questionsubject.model.js";

import { Question } from "../models/question.model.js";
import { Answer } from "../models/question.model.js";

import { ObjectId } from "mongodb";
import { ShuffleArray } from "../utils/ShuffleArray.js";

const subjects = {
  Maths: new ObjectId("666408bb3c23ffa9cfa9bf46"),
  Mathematics: new ObjectId("666408bd3c23ffa9cfa9bf46"),
  Physics: new ObjectId("666408d03c23ffa9cfa9bf4e"),
  Chemistry: new ObjectId("666408ca3c23ffa9cfa9bf4a"),
  English: new ObjectId("66601a337314e240c5000999"),
  "Computer Gk": new ObjectId("666408f33c23ffa9cfa9bf52"),
};

const createQuestionSubject = async ({ subject }) => {
  const questionSubject = await QuestionSubject.create({
    name: subject.name,
  });
  const createdQuestionSubject = await QuestionSubject.findById(
    questionSubject._id
  );

  const subjectId = subjects[subject.name];

  const questionsArray = await Promise.all(
    subject.questions.map(async (question) => {
      const answersArray = await Promise.all(
        question.answers.map(async (answer) => {
          const createdAnswer = await Answer.create({ text: answer });
          return createdAnswer;
        })
      );

      const correctAnswer = answersArray[0]["_id"];

      const shuffledAnswers = await ShuffleArray(answersArray);

      const createdQuestion = await Question.create({
        questionText: question.text,
        answers: shuffledAnswers,
        correctAnswer: correctAnswer,
        questionSubject: createdQuestionSubject._id,
        subjectId: subjectId,
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
