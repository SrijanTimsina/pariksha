import VideoDrawer from "@/components/Drawer/Drawer";
import Mainvideo from "@/components/Mainvideo";
import React from "react";

export default function Course({ params }) {
	const videoId = params.video;
	console.log(videoId);
	return (
		<div className="relative flex w-full ">
			<Mainvideo url="https://www.youtube.com/watch?v=yKNxeF4KMsY" />
			<VideoDrawer />
		</div>
	);
}
