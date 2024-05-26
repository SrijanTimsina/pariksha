import Link from "next/link";

export default function Course({ params }) {
	return (
		<>
			<div>
				<h1>Course Page {params.course} </h1>
			</div>
		</>
	);
}
