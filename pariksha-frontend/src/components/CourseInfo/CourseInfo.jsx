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
							<div className="content-container py-20 flex justify-between gap-10">
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
									<Link href="">
										<PrimaryButton
											text={"Start Learning"}
											className="mt-3"
										/>
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="content-container">
						<div className="w-full max-w-[800px] ">
							<h1 className="text-2xl font-semibold mb-4 mt-10">
								Course Content
							</h1>
							<CourseDrawer
								subjects={courseData.subjects}
								courseTitle={link}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default CourseInfo;
