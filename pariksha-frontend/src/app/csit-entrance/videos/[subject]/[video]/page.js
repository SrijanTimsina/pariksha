"use client";

import Video from "@/components/Video";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVideo } from "@/hooks/videos";
import { useAuth } from "@/utils/AuthContext";
import withAuth from "@/utils/withAuth";

import Spinner from "@/utils/Spinner";

function VideoPage({ params }) {
  const { changeSubjectCurrentWatching } = useAuth();
  const videoId = params.video;
  const subject = params.subject;

  useEffect(() => {
    changeSubjectCurrentWatching(`csit-entrance-${subject}`, videoId);
  }, []);

  const {
    data: videoData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideo(videoId, subject),
  });

  return (
    <>
      {isPending && <Spinner />}

      {videoData && (
        <>
          <Video url={videoData.videoFile} videoId={videoId} />
        </>
      )}
    </>
  );
}

export default withAuth(VideoPage);
