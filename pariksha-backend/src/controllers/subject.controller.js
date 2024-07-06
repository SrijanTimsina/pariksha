import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

import { Subject } from "../models/subject.model.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";

const createSubject = asyncHandler(async (req, res) => {
  const { title, courseId, videoCount, duration } = req.body;

  if ([title, courseId].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required.");
  }

  const subject = await Subject.create({
    title,
    videoCount,
    duration,
  });
  const createdSubject = await Subject.findById(subject._id);
  if (!createdSubject) {
    throw new ApiError(500, "Something went wrong while creating the subject.");
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    { $push: { subjects: createdSubject._id } },
    { new: true }
  );

  if (!updatedCourse) {
    throw new ApiError(500, "Something went wrong while updating the course.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdSubject, "Subject Created"));
});

const getSubjectInfo = asyncHandler(async (req, res) => {
  const { courseTitle, subjectTitle } = req.params;

  const course = await Course.findOne({ link: courseTitle })
    .populate({
      path: "subjects",
    })
    .select("subjects");
  if (!course) {
    throw new ApiError(404, "Course not found.");
  }

  const subjectInfo = course.subjects.find(
    (subject) => subject.title === subjectTitle
  );

  const subject = await Subject.findById(subjectInfo._id).populate({
    path: "sections",
    populate: {
      path: "videos",
    },
  });
  if (!subject) {
    throw new ApiError(404, "Subject not found.");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, subject, "Subject fetched successfully."));
});

const updateUserSubjectVideo = asyncHandler(async (req, res) => {
  const { userData } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { subjectCurrentWatching: userData },
    },
    { new: true }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User subject watching updated."));
});

export { createSubject, getSubjectInfo, updateUserSubjectVideo };
