"use client";

import { getCourseData } from "@/hooks/courses";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "../PrimaryButton";

import CourseDrawer from "../CourseDrawer/CourseDrawer";

function CourseInfo({ link }) {
  const {
    data: courseData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["course"],
    queryFn: () => getCourseData(link),
  });

  return (
    <div>
      {courseData && (
        <>
          <div className="courseInfo">
            <div className="bg-[#2d2f31] text-white">
              <div className="content-container flex justify-between gap-10 py-20">
                <div>
                  <h1>{courseData.title}</h1>
                  <p>{courseData.description}</p>
                </div>
                <div>
                  <Image
                    src="/book.jpg"
                    height={100}
                    width={300}
                    alt="Stock Image"
                  />

                  <PrimaryButton text={"Enroll Now"} className="mt-3" />
                </div>
              </div>
            </div>
          </div>
          <div className="content-container">
            <div className="mt-10 bg-white p-6 shadow-lg">
              <h1 className="mb-4 text-xl font-semibold">Past Questions</h1>

              {courseData.questionSets.map((questionSet, index) => (
                <Link
                  href={`/courses/${link}/tests/${questionSet.link}`}
                  key={index}
                >
                  <PrimaryButton text={questionSet.number} className="w-max" />
                </Link>
              ))}
            </div>
            <div className="mt-10 w-full max-w-[800px]">
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
