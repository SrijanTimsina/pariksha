"use client";

import Video from "@/components/Video";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getVideo } from "@/hooks/videos";
import { getSubjectInfo } from "@/hooks/subjects";
import withAuth from "@/utils/withAuth";

function Course({ params }) {
  const videoId = params.video;

  const {
    data: videoData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideo(videoId),
  });

  return (
    <>
      {videoData && (
        <>
          <Video url={videoData.videoFile} />
        </>
      )}
    </>
  );
}

export default withAuth(Course);
