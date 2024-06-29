"use client";

import { redirect } from "next/navigation";
import withAuth from "@/utils/withAuth";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/utils/Spinner";
import { useAuth } from "@/utils/AuthContext";

const defaultSubjectVideos = {
  "csit-entrance-Maths": "66601aa37314e240c50009a1",
  "csit-entrance-Mathematics": "66601aa37314e240c50009a1",
  "csit-entrance-Physics": "667e7d72b30ee779591c15d5",
  "csit-entrance-Chemistry": "66601aa37314e240c50009a1",
  "csit-entrance-English": "667e8224b30ee779591c1639",
  "csit-entrance-Computer-Gk": "66601aa37314e240c50009a1",
};

function getCurrentSubjectData(subjectName) {
  const { subjectCurrentWatching } = useAuth();

  const videoId =
    subjectCurrentWatching?.[subjectName] || defaultSubjectVideos[subjectName];

  return `${videoId}`;
}

function Subject({ params }) {
  const data = getCurrentSubjectData(`csit-entrance-${params.subject}`);

  if (data) redirect(`/csit-entrance/videos/${params.subject}/${data}`);
  return <Spinner />;
}

export default withAuth(Subject);
