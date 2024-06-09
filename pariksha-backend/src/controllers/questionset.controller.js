import { QuestionSet } from "../models/questionset.model.js";
import { Course } from "../models/course.model.js";

import { ApiError } from "../utils/ApiError.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { createQuestionSubject } from "./questionSubject.controller.js";
import { ObjectId } from "mongodb";

const createQuestionSet = asyncHandler(async (req, res) => {
  const { type } = req.params;
  const courseId = new ObjectId("66601a157314e240c5000996");
  const { title, description, id, number, subjects } = req.body;

  if ([title, id, type].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required.");
  }

  if (type !== "past" && type !== "mock") {
    throw new ApiError(400, "Type must be either past or mock");
  }
  const questionSet = await QuestionSet.create({
    title,
    link: id,
    description,
    number,
    setType: type,
  });
  await Course.findByIdAndUpdate(
    courseId,
    { $push: { questionSets: questionSet._id } },
    { new: true }
  );

  const questionSubjects = await Promise.all(
    subjects.map((subject) => {
      return createQuestionSubject({
        subject: subject,
      });
    })
  );
  const updatedQuestionSet = await QuestionSet.findByIdAndUpdate(
    questionSet._id,
    {
      $set: { subjects: questionSubjects },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedQuestionSet, "Question set Created."));
});

const getAllQuestionSets = asyncHandler(async (req, res) => {
  const questionSets = await QuestionSet.find({});

  return res
    .status(200)
    .json(
      new ApiResponse(200, questionSets, "Question sets fetched successfully.")
    );
});

const getQuestionSet = asyncHandler(async (req, res) => {
  const { link } = req.params;

  const questionSet = await QuestionSet.findOne({ link: link }).populate({
    path: "subjects",
    populate: {
      path: "questions",
      select: "-correctAnswer",
    },
  });

  if (!questionSet) {
    throw new ApiError(404, "Question set not found.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, questionSet, "Question set fetched successfully.")
    );
});

export { createQuestionSet, getAllQuestionSets, getQuestionSet };
