"use client";

import { getCourseData } from "@/hooks/courses";
import { useQuery } from "@tanstack/react-query";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/utils/AuthContext";

import CourseDrawer from "../CourseDrawer/CourseDrawer";
import PreviewVIdeo from "../PreviewVIdeo";

function CourseInfo({ link }) {
  const { testScores } = useAuth();
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
          {/* <div className="courseInfo">
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
          </div> */}
          <div className="content-container">
            <div className="mt-10 w-full">
              <h1 className="mb-4 text-2xl font-semibold">Course Content</h1>
              <CourseDrawer subjects={courseData.subjects} courseTitle={link} />
            </div>
            <div className="mt-10 bg-white">
              <h1 className="mb-6 text-2xl font-semibold">Past Questions</h1>
              <div className="scrollContainer flex w-full gap-6 overflow-auto">
                {courseData.questionSets
                  .filter((questionSet) => questionSet.setType === "past")
                  .map((questionSet, index) => (
                    <div
                      key={index}
                      className="rounded-lg border-2 border-gray-dark shadow"
                    >
                      <Link href={`/${link}/tests/${questionSet.link}`}>
                        <Image
                          src={`/previewImages/testsPreview/test-${index}.png`}
                          height={180}
                          width={320}
                          alt={questionSet.number}
                          className="rounded-t-md bg-gray-light"
                          style={{ width: "280px", aspectRatio: "16/10" }}
                        />
                        <div className="min-w-[280px] border-t-2 border-gray-dark p-3">
                          <p className="text-md mb-2 mt-1 text-xl font-bold">
                            {questionSet.number}
                          </p>
                          <div className="flex gap-4 text-sm">
                            <p className="border-r-2 border-solid border-primary pr-4 text-gray-600">
                              Score :{" "}
                              <span className="font-semibold">
                                {testScores?.[questionSet._id]
                                  ? testScores[questionSet._id]
                                  : "_"}
                              </span>
                            </p>
                            <p className="text-gray-600">
                              Avg Score :{" "}
                              <span className="font-semibold">
                                {parseFloat(questionSet.avgScore.toFixed(2))}
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
              <h1 className="mb-6 mt-10 text-2xl font-semibold">Models Sets</h1>
              <div className="scrollContainer flex w-full gap-6 overflow-auto">
                {courseData.questionSets
                  .filter((questionSet) => questionSet.setType === "mock")
                  .map((questionSet, index) => (
                    <div
                      key={index}
                      className="rounded-lg border-2 border-gray-dark shadow"
                    >
                      <Link href={`/${link}/tests/${questionSet.link}`}>
                        <Image
                          src={`/previewImages/testsPreview/test-${index}.png`}
                          height={180}
                          width={320}
                          alt={questionSet.number}
                          className="rounded-t-md bg-gray-light"
                          style={{ width: "280px", aspectRatio: "16/10" }}
                        />
                        <div className="min-w-[280px] border-t-2 border-gray-dark p-3">
                          <p className="text-md mb-2 mt-1 text-xl font-bold">
                            {questionSet.number}
                          </p>
                          <div className="flex gap-4 text-sm">
                            <p className="border-r-2 border-solid border-primary pr-4 text-gray-600">
                              Score :{" "}
                              <span className="font-semibold">
                                {testScores?.[questionSet._id]
                                  ? testScores[questionSet._id]
                                  : "_"}{" "}
                              </span>
                            </p>
                            <p className="text-gray-600">
                              Avg Score :{" "}
                              <span className="font-semibold">
                                {parseFloat(questionSet.avgScore.toFixed(2))}{" "}
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
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
