"use client";

import React, { useEffect, useState } from "react";

import styles from "./Drawer.module.css";

import { Button } from "@chakra-ui/react";

import { FaArrowLeft } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import Accordian from "../CourseDrawer/CourseDrawer";
import SubjectDrawer from "../SubjectDrawer/SubjectDrawer";
import { useQuery } from "@tanstack/react-query";
import { getSubjectInfo } from "@/hooks/subjects";

export default function Drawer({ courseTitle, subjectTitle, videoId }) {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const {
    data: subjectData,
    isPending: subjectIsPending,
    isError: subjectIsError,
  } = useQuery({
    queryKey: ["subject", subjectTitle, courseTitle],
    queryFn: () => getSubjectInfo(subjectTitle, courseTitle),
  });
  return (
    <div
      className={`${styles.drawerWholeContainer} ${drawerOpen ? styles.drawerOpen : ""}`}
    >
      <Button
        colorScheme="blackAlpha"
        onClick={() => setDrawerOpen(true)}
        leftIcon={<FaArrowLeft />}
        className={`${styles.button} cursor-pointer`}
        style={{
          borderRadius: 0,
          position: "absolute",
          top: "calc(50% - 50px)",
          right: "0",
          display: `${drawerOpen ? "none" : ""}`,
        }}
      >
        Course Content
      </Button>
      <div
        className={`${styles.drawerContainer} ${
          drawerOpen ? styles.show : ""
        } pl-0.5`}
      >
        <div
          className={`${styles.drawerHeader} flex items-center justify-between border-b-2 border-solid border-[#d1d7dc] px-8 py-4`}
        >
          <p className="font-semibold">Course Content</p>
          <button onClick={() => setDrawerOpen(false)}>
            <RxCross1 />
          </button>
        </div>
        {subjectData && (
          <SubjectDrawer
            subjectData={subjectData}
            courseTitle={courseTitle}
            subjectTitle={subjectTitle}
            videoId={videoId}
          />
        )}
      </div>
    </div>
  );
}
