import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

import { Course } from "../models/course.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";

const createCourse = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if ([title, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required.");
  }

  const course = await Course.create({
    title,
    description,
  });
  const createdCourse = await Course.findById(course._id);
  if (!createdCourse) {
    throw new ApiError(500, "Something went wrong while creating the course");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdCourse, "Course Created"));
});

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, courses, "Courses fetched successfully."));
});

const getCourseData = asyncHandler(async (req, res) => {
  const { link } = req.params;

  const course = await Course.findOne({ link: link }).populate([
    {
      path: "subjects",
      populate: {
        path: "sections",
        populate: {
          path: "videos",
        },
      },
    },
    {
      path: "questionSets",
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, course, "Courses fetched successfully."));
});

export { createCourse, getAllCourses, getCourseData };
