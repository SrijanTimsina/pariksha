"use client";

import Drawer from "@/components/Drawer/Drawer";
import Video from "@/components/Video";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getVideo } from "@/hooks/videos";
import { getSubjectInfo } from "@/hooks/subjects";

export default function Course({ params }) {
  const videoId = params.video;
  const subjectTitle = params.subject;
  const courseTitle = params.course;

  const {
    data: videoData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideo(videoId),
  });

  return <>{videoData && <Video url={videoData.videoFile} />}</>;
}
