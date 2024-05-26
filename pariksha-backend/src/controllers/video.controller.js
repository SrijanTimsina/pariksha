import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

import { Section } from "../models/section.model.js";
import { Video } from "../models/video.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";

const createVideo = asyncHandler(async (req, res) => {
  const { videoFile, title, duration, sectionId } = req.body;

  if ([title, videoFile, sectionId].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required.");
  }

  const video = await Video.create({
    title,
    videoFile,
    duration,
  });
  const createdVideo = await Video.findById(video._id);
  if (!createdVideo) {
    throw new ApiError(500, "Something went wrong while creating the video.");
  }

  const updatedSection = await Section.findOneAndUpdate(
    { _id: sectionId },
    { $push: { videos: createdVideo._id } },
    { new: true }
  );

  console.log(updatedSection);
  if (!updatedSection) {
    throw new ApiError(500, "Something went wrong while updating the section.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdVideo, "Video Created"));
});

export { createVideo };
