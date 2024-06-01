"use client";

import React, { useEffect, useState } from "react";

import styles from "./Drawer.module.css";

import { Button } from "@chakra-ui/react";

import { FaArrowLeft } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import Accordian from "../CourseDrawer/CourseDrawer";
import SubjectDrawer from "../SubjectDrawer/SubjectDrawer";

export default function Drawer({
	subjectData,
	courseTitle,
	subjectTitle,
	videoId,
}) {
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<div style={{ width: drawerOpen ? "300px" : "0" }}>
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
				} w-80 pl-0.5`}
			>
				<div className="flex justify-between py-4 px-8 items-center border-b-2 border-[#d1d7dc] border-solid">
					<p className="font-semibold ">Course Content</p>
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
