"use client";

import axios from "axios";
import { API_URL } from "./constant.js";
import axiosInstance from "./axiosInstance.js";

export const loginUser = async (formData) => {
  const { data } = await axios.post(`${API_URL}/users/login`, formData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return data.data;
};

export const logoutUser = async () => {
  const { data } = await axios.post(
    `${API_URL}/users/logout`,
    {},
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
  return data;
};

export const registerUser = async (formData) => {
  const { data } = await axios.post(`${API_URL}/users/register`, formData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return data.data;
};

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get(`/users/current-user`, {
    headers: { "Content-Type": "application/json" },
  });
  return data.data;
};
export const refreshToken = async () => {
  const { data } = await axios.post(
    `${API_URL}/users/refresh-token`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return data;
};

export const sendOtp = async (number) => {
  const { data } = await axios.post(`${API_URL}/users/sendOtp`, {
    contactNumber: number,
  });
  return data;
};

export const checkUserDetails = async (formData) => {
  const { data } = await axios.post(`${API_URL}/users/check`, formData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return data;
};
