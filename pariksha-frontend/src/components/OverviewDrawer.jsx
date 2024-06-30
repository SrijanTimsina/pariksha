"use client";

import React, { useEffect, useState } from "react";

import SubjectDrawer from "./SubjectDrawer/SubjectDrawer";
import { useQuery } from "@tanstack/react-query";
import { getSubjectInfo } from "@/hooks/subjects";

export default function OverviewDrawer({ courseTitle, subjectTitle, videoId }) {
  const {
    data: subjectData,
    isPending: subjectIsPending,
    isError: subjectIsError,
  } = useQuery({
    queryKey: ["subject", subjectTitle, courseTitle],
    queryFn: () => getSubjectInfo(subjectTitle, courseTitle),
  });
  return (
    <div className="m-auto w-full max-w-[800px]">
      {subjectData && (
        <SubjectDrawer
          subjectData={subjectData}
          courseTitle={courseTitle}
          subjectTitle={subjectTitle}
          videoId={videoId}
        />
      )}
    </div>
  );
}
