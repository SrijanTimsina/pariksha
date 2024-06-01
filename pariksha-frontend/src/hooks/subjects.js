"use client";

import axios from "axios";

export const getSubjectInfo = async (subjectTitle, CourseTitle) => {
	const { data } = await axios.get(
		`http://localhost:3465/api/v1/subject/getSubjectInfo/${CourseTitle}/${subjectTitle}`
	);
	return data.data;
};
