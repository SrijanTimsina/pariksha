import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PiVideo, PiClock } from "react-icons/pi";

export default function CourseDrawer({ subjects, courseTitle }) {
  return (
    <div className="scrollContainer flex w-full gap-6 overflow-auto">
      {subjects
        .filter((subject) => subject.title !== "Computer-GK")
        .map((subject, index) => (
          <div
            key={index}
            className="rounded-lg border-2 border-gray-dark shadow"
          >
            <Link href={`/${courseTitle}/videos/${subject.title}`}>
              <Image
                src={`/previewImages/subjectsPreview/${subject.title}.png`}
                height={180}
                width={320}
                alt={subject.title}
                className="rounded-t-md bg-gray-light"
                style={{
                  width: "280px",
                  aspectRatio: "16/10",
                }}
              />
              <div className="min-w-[280px] border-t-2 border-gray-dark p-3">
                <p className="mb-2 mt-1 text-xl font-bold">{subject.title}</p>
                <div className="flex gap-4 pb-2 text-sm">
                  <span className="flex items-center gap-1 border-r-2 border-solid border-primary pr-4">
                    <PiVideo size={18} color="#03747E" />
                    {subject.videoCount}
                  </span>
                  <span className="flex items-center gap-1 pr-3">
                    <PiClock size={18} color="#03747E" />
                    {subject.duration}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}
