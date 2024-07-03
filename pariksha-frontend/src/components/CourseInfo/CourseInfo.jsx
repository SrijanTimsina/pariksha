"use client";

import { getCourseData } from "@/hooks/courses";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "../PrimaryButton";

import CourseDrawer from "../CourseDrawer/CourseDrawer";
import PreviewVIdeo from "../PreviewVIdeo";

function CourseInfo({ link }) {
  const {
    data: courseData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["csit-entrance"],
    queryFn: () => getCourseData(),
  });

  return (
    <div>
      {courseData && (
        <>
          <div className="courseInfo">
            <div className="bg-primaryDark text-white">
              <div className="content-container py-8 min-[600px]:py-14 min-[1024px]:py-20">
                <div className="flex justify-between gap-4 max-[1024px]:flex-col min-[1024px]:gap-10">
                  <div>
                    <h1 className="text-2xl font-semibold max-[450px]:text-xl sm:text-3xl">
                      {courseData.title}
                    </h1>
                    <p className="mb-8 mt-8 text-justify text-lg max-[1024px]:hidden">
                      {courseData.description}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-center">
                    <PreviewVIdeo />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-container">
            <div className="mt-10 w-full">
              <h1 className="mb-4 text-2xl font-semibold">Course Content</h1>
              <CourseDrawer subjects={courseData.subjects} courseTitle={link} />
            </div>
            <div className="mt-10 bg-white">
              <h1 className="mb-6 text-2xl font-semibold">Past Questions</h1>
              <div className="flex flex-wrap gap-4">
                {courseData.questionSets.map((questionSet, index) => (
                  <Link href={`/${link}/tests/${questionSet.link}`} key={index}>
                    <Image
                      src={`/previewImages/${questionSet.number}.jpg`}
                      height={60}
                      width={200}
                      alt="Stock Image"
                      className="rounded-xl"
                      style={{ height: "140px" }}
                    />
                    <p className="text-md mt-3 font-semibold">
                      {questionSet.number}
                    </p>
                    <p className="text-sm">
                      Average Score :
                      {parseFloat(questionSet.avgScore.toFixed(2))}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CourseInfo;
