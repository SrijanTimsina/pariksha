"use client";

import Drawer from "@/components/Drawer/Drawer";

export default function Layout({ children, params }) {
  const videoId = params.video;
  const subjectTitle = params.subject;
  const courseTitle = "csit-entrance";

  return (
    <div className="videoPageContainer relative flex w-full">
      {children}
      <Drawer
        videoId={videoId}
        courseTitle={courseTitle}
        subjectTitle={subjectTitle}
      />
    </div>
  );
}
