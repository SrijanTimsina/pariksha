"use client";

import axios from "axios";
import { API_URL } from "./constant.js";

export const getVideo = async (videoId) => {
	const { data } = await axios.get(
		`${API_URL}/video/getVideo/${videoId}`
	);
	return data.data;
};
