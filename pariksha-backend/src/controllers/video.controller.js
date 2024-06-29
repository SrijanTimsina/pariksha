import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

import { Section } from "../models/section.model.js";
import { Video } from "../models/video.model.js";
import { Subject } from "../models/subject.model.js";

import { User } from "../models/user.model.js";

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

  if (!updatedSection) {
    throw new ApiError(500, "Something went wrong while updating the section.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdVideo, "Video Created"));
});

const getVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully."));
});

const updateUserWatchHistory = asyncHandler(async (req, res) => {
  const { watchHistory } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { watchHistory: watchHistory },
    },
    { new: true }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User subject watching updated."));
});

export { createVideo, getVideo, updateUserWatchHistory };
