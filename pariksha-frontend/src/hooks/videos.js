"use client";

import axiosInstance from "./axiosInstance";

export const getVideo = async (videoId, subjectName) => {
  const { data } = await axiosInstance.get(
    `/video/getVideo/${videoId}/${subjectName}`
  );
  return data.data;
};

const updateUserWatchHistory = async (watchHistory) => {
  const { data } = await axiosInstance.post(`/video/updateUserWatchHistory`, {
    watchHistory: watchHistory,
  });
  return data.data;
};

export { updateUserWatchHistory };
