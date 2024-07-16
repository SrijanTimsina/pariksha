"use client";

import { redirect } from "next/navigation";
import withAuth from "@/utils/withAuth";

import Spinner from "@/utils/Spinner";
import { useAuth } from "@/utils/AuthContext";

const defaultSubjectVideos = {
  "csit-entrance-Physics": "667e7d72b30ee779591c15d5",
  "csit-entrance-Mathematics": "668b8e71db2a2df10ed79e24",
  "csit-entrance-Maths": "668b8e71db2a2df10ed79e24",
  "csit-entrance-English": "667e8224b30ee779591c1639",
  "csit-entrance-Chemistry": "668d89dfed1a4a4f20e53694",
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
