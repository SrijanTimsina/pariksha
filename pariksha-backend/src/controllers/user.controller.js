import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access tokens."
    );
  }
};

const registerUser = asyncHandler(async (req, res, next) => {
  const {
    contactNumber,
    email,
    fullName,
    password,
    studyLocation,
    abroadPlans,
    priority,
  } = req.body;

  if (
    [contactNumber, email, fullName, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required.");
  }
  const existedUser = await User.findOne({
    $or: [{ contactNumber }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User is already registered.");
  }

  const user = await User.create({
    contactNumber: contactNumber,
    email,
    fullName,
    password,
    studyLocation,
    abroadPlans,
    priority,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  next();
});

const checkUserExists = asyncHandler(async (req, res) => {
  const { email, contactNumber } = req.body;

  if ([contactNumber, email].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "ContactNumber and email is required");
  }

  try {
    const existedPhone = await User.findOne({
      contactNumber: contactNumber,
    });
    if (existedPhone) {
      throw new ApiError(409, "Contact number already used.", [
        {
          contactNumber: "Phone number already used.",
        },
      ]);
    }

    const existedEmail = await User.findOne({
      email: email,
    });

    if (existedEmail) {
      throw new ApiError(409, "Email already used.", [
        { email: "Email already used." },
      ]);
    }
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }

  return res.status(200).json(new ApiResponse(200, {}, "create user."));
});

const loginUser = asyncHandler(async (req, res) => {
  let { identifier, password, email, contactNumber } = req.body;

  if (!identifier) {
    identifier = email || contactNumber;
  }

  if (!identifier && !email && !contactNumber) {
    throw new ApiError(400, "ContactNumber or email is required", [
      {
        identifier: "Enter contact number or email",
      },
    ]);
  }

  const user = await User.findOne(
    identifier.includes("@")
      ? { email: identifier }
      : { contactNumber: identifier }
  );

  try {
    if (!user) {
      throw new ApiError(404, "User is not registered", [
        {
          identifier: "The email or contact number is not registered.",
        },
      ]);
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Password Incorrect", [
        {
          password: "Incorrect password",
        },
      ]);
    }
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }

  const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    maxAge: 3600000,
    sameSite: "None",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User Logged In Successfully"
      )
    );
  // Get UserName or email and password
  // Find the user
  // Check password
  // Generate refresh and access token
  // send cookie
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
    maxAge: 3600000,
    sameSite: "None",
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh Token is expired or used");
    }
    const options = {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
      sameSite: "None",
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access Token Refreshed Successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Refresh Token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }
  if (oldPassword == newPassword) {
    throw new ApiError(400, "New and old password cannot be same");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully."));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

const updateFullName = asyncHandler(async (req, res) => {
  const { fullName } = req.body;
  if (!fullName) {
    throw new ApiError(400, "Username is required");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { fullName },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Full name updated successfully"));
});

const getUserWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    username: 1,
                    avatar: 1,
                    fullName: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user[0].watchHistory,
        "Watch history fetched successfully."
      )
    );
});

export {
  registerUser,
  checkUserExists,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateFullName,
  getUserWatchHistory,
};
