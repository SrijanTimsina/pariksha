"use client";

import axiosInstance from "./axiosInstance.js";

export const getSubjectInfo = async (subjectTitle, CourseTitle) => {
  const { data } = await axiosInstance.get(
    `/subject/getSubjectInfo/${CourseTitle}/${subjectTitle}`,
    {
      withCredentials: true,
    }
  );
  return data.data;
};
