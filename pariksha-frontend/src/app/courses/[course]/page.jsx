import CourseInfo from "@/components/CourseInfo/CourseInfo";
import Link from "next/link";

export default function Course({ params }) {
	return (
		<>
			<div>
				<CourseInfo link={params.course} />
			</div>
		</>
	);
}
