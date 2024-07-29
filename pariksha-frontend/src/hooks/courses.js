"use server";

import axios from "axios";
import { API_URL } from "./constant.js";

export const fetchCourses = async () => {
  const { data } = await axios.get(`${API_URL}/course/getAllCourses`, {
    withCredentials: true,
  });
  return data;
};

export const getCourseData = async () => {
  const { data } = await axios.get(
    `${API_URL}/course/getCourseData/csit-entrance`,
    {
      withCredentials: true,
    }
  );

  return data.data;
};
