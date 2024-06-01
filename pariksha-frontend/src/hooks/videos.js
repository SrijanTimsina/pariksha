"use client";

import axios from "axios";

export const getVideo = async (videoId) => {
	const { data } = await axios.get(
		`http://localhost:3465/api/v1/video/getVideo/${videoId}`
	);
	return data.data;
};
