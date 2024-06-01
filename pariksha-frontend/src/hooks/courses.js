"use client";

import axios from "axios";
import { API_URL } from "./constant.js";

export const fetchCourses = async () => {
	const { data } = await axios.get(`${API_URL}/course/getAllCourses`);
	return data;
};

export const getCourseData = async (link) => {
	const { data } = await axios.get(
		`${API_URL}/course/getCourseData/${link}`
	);
	return data.data;
};