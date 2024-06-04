"use client";

import axios from "axios";
import { API_URL } from "./constant.js";

export const loginUser = async (formData) => {
	console.log("formData", formData);
	const { data } = await axios.post(
		`${API_URL}/users/login`,
		formData,
		{ headers: { "Content-Type": "application/json" } }
	);
	return data;
};

export const getCourseData = async (link) => {
	const { data } = await axios.get(
		`${API_URL}/course/getCourseData/${link}`
	);
	return data.data;
};
