"use client";

import axios from "axios";

export const fetchCourses = async () => {
	const { data } = await axios.get(
		"http://localhost:3465/api/v1/course/getAllCourses"
	);
	return data;
};

export const getCourseData = async (link) => {
	const { data } = await axios.get(
		`http://localhost:3465/api/v1/course/getCourseData/${link}`
	);
	return data.data;
};
