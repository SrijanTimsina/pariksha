"use client";

import Drawer from "@/components/Drawer/Drawer";
import MainVideo from "@/components/MainVideo.jsx";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getVideo } from "@/hooks/videos";
import { getSubjectInfo } from "@/hooks/subjects";

export default function Course({ params }) {
	const videoId = params.video;
	const subjectTitle = params.subject;
	const courseTitle = params.course;

	const {
		data: subjectData,
		isPending: subjectIsPending,
		isError: subjectIsError,
	} = useQuery({
		queryKey: ["subject", subjectTitle, courseTitle],
		queryFn: () => getSubjectInfo(subjectTitle, courseTitle),
	});
	const {
		data: videoData,
		isPending,
		isError,
	} = useQuery({
		queryKey: ["video", videoId],
		queryFn: () => getVideo(videoId),
	});

	return (
		<div className="relative flex w-full ">
			{videoData && <MainVideo url={videoData.videoFile} />}
			<Drawer
				videoId={videoId}
				courseTitle={courseTitle}
				subjectTitle={subjectTitle}
				subjectData={subjectData}
			/>
		</div>
	);
}
