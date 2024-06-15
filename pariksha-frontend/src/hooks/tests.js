"use client";

import axiosInstance from "./axiosInstance";

export const getTestInfo = async (link) => {
  const { data } = await axiosInstance.get(
    `/questionset/getQuestionSetData/${link}`,
    {
      withCredentials: true,
    }
  );
  return data.data;
};

export const submitTestAnswers = async (id, answers) => {
  const { data } = await axiosInstance.post(
    `/questionset/submitTestAnswers/${id}`,
    answers,
    {
      withCredentials: true,
    }
  );
  return data.data;
};
