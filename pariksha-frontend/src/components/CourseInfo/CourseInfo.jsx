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
            <div className="bg-[#2d2f31] text-white">
              <div className="content-container py-20">
                <h1 className="mb-4 text-3xl font-semibold">
                  {courseData.title}
                </h1>
                <div className="flex justify-between gap-10 max-[900px]:flex-col">
                  <div>
                    <p>{courseData.description}</p>
                    <p className="mt-4 rounded-lg bg-green-700 px-4 py-2 text-center font-semibold text-yellow-300">
                      You need to log in to enroll in this course and prepare
                      for the examination
                    </p>
                  </div>
                  <div className="flex items-center justify-center min-[901px]:w-96">
                    <PreviewVIdeo />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-container">
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
            <div className="mt-10 w-full">
              <h1 className="mb-4 text-2xl font-semibold">Course Content</h1>

              <CourseDrawer subjects={courseData.subjects} courseTitle={link} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CourseInfo;
