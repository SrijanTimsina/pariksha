"use client";

import axiosInstance from "./axiosInstance";

export const getVideo = async (videoId) => {
  const { data } = await axiosInstance.get(`/video/getVideo/${videoId}`);
  return data.data;
};
