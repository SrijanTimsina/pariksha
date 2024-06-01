"use client";

import { fetchCourses } from "@/hooks/courses";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function CoursesList() {
	const {
		data: allCourses,
		isPending,
		isError,
	} = useQuery({
		queryKey: ["courses"],
		queryFn: () => fetchCourses(),
	});
	console.log(allCourses);
	return (
		<div className="flex flex-col gap-10 p-4">
			{allCourses &&
				allCourses.data.length > 0 &&
				allCourses.data.map((course, index) => (
					<Link href={`/courses/${course.link}`} key={index}>
						<div className="flex  border border-solid border-[#d1d7dc] p-4 gap-4 hover:bg-gray-light">
							<div>
								<Image
									src="/book.jpg"
									height={100}
									width={300}
									alt="Stock Image"
								/>
							</div>
							<div>
								<h1 className="font-bold text-2xl mb-4">
									{course.title}
								</h1>
								<p>{course.description}</p>
							</div>
						</div>
					</Link>
				))}
		</div>
	);
}
