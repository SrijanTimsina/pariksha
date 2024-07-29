"use client";

import axiosInstance from "./axiosInstance";

const getVideo = async (videoId, subjectName) => {
  const { data } = await axiosInstance.get(
    `/video/getVideo/${videoId}/${subjectName}`
  );
  return data.data;
};

const updateUserWatchHistory = async (userData) => {
  const { data } = await axiosInstance.post(
    `/video/updateUserWatchHistory`,
    userData
  );
  return data.data;
};

const addToWatchHistory = async (videoData) => {
  const { data } = await axiosInstance.post(
    `/video/addToWatchHistory`,
    videoData
  );
  return data.data;
};

const getWatchHistory = async (count) => {
  const { data } = await axiosInstance.get(`/video/getWatchHistory/${count}`);

  return data.data;
};

export { getVideo, updateUserWatchHistory, addToWatchHistory, getWatchHistory };
