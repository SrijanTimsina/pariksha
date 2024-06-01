"use client";

import axios from "axios";
import { API_URL } from "./constant.js";

export const getSubjectInfo = async (subjectTitle, CourseTitle) => {
	const { data } = await axios.get(
		`${API_URL}/subject/getSubjectInfo/${CourseTitle}/${subjectTitle}`
	);
	return data.data;
};
