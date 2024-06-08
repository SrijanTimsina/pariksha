"use client";

import axios from "axios";
import { API_URL } from "./constant.js";

export const getAllQuestionSets = async () => {
  const { data } = await axios.get(
    `${API_URL}/questionset/getAllQuestionSets`,
    {
      withCredentials: true,
    }
  );
  return data;
};

export const getQuestionSetData = async (link) => {
  const { data } = await axios.get(
    `${API_URL}/questionset/getQuestionSetData/${link}`,
    {
      withCredentials: true,
    }
  );
  return data;
};
