"use client";

import axios from "axios";
import { API_URL } from "./constant.js";

export const getTestInfo = async (link) => {
  const { data } = await axios.get(
    `${API_URL}/questionset/getQuestionSetData/${link}`,
    {
      withCredentials: true,
    }
  );
  return data.data;
};
