import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

import { Section } from "../models/section.model.js";
import { Video } from "../models/video.model.js";
import { Subject } from "../models/subject.model.js";
import { WatchHistory } from "../models/watchHistory.model.js";

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
  const { option, videoId } = req.body;

  let update;
  if (option === "add") {
    update = { $push: { watchHistory: videoId } };
  } else if (option === "remove") {
    update = { $pull: { watchHistory: videoId } };
  } else {
    throw new ApiError(400, "Invalid option.");
  }

  await User.updateOne({ _id: req.user._id }, update);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User subject watching updated."));
});

const addToWatchHistory = asyncHandler(async (req, res) => {
  const { videoId, subject } = req.body;

  const video = await Video.findById(videoId).select("_id");

  const watchHistory = await WatchHistory.create({
    user: req.user._id,
    video: video._id,
    subject: subject,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, watchHistory, "Watch History Added."));
});

const getWatchHistory = asyncHandler(async (req, res) => {
  const count = req.params.count ? parseInt(req.params.count) : null;
  const user = await User.findById(req.user._id).select("_id");
  const pipeline = [
    { $match: { user: user._id } },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: "$video",
        latestEntry: { $first: "$$ROOT" },
      },
    },
    { $replaceRoot: { newRoot: "$latestEntry" } },
    { $sort: { createdAt: -1 } },
    {
      $project: {
        user: 0,
        __v: 0,
      },
    },
  ];
  if (count) {
    pipeline.push({ $limit: count });
  }
  const history = await WatchHistory.aggregate(pipeline).exec();

  const watchHistory = await WatchHistory.populate(history, {
    path: "video",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, watchHistory, "Watch History fetched."));
});

export {
  createVideo,
  getVideo,
  updateUserWatchHistory,
  addToWatchHistory,
  getWatchHistory,
};
