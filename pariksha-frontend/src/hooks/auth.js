"use client";

import axios from "axios";
import { API_URL } from "./constant.js";

export const loginUser = async (formData) => {
  const { data } = await axios.post(`${API_URL}/users/login`, formData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return data;
};

export const registerUser = async (formData) => {
  const { data } = await axios.post(`${API_URL}/users/register`, formData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return data.data;
};

export const checkUserDetails = async (formData) => {
  const { data } = await axios.post(`${API_URL}/users/check`, formData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return data;
};
