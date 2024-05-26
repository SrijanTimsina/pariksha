import { redirect } from "next/navigation";

async function getData(params) {
	const course = params.course;
	const subject = params.subject;

	let subjectId = 123456;
	let videoId = "abcdef";

	return `courses/${course}/${subject}/${videoId}`;
}

export default async function Subject({ params }) {
	const routePath = await getData(params);
	redirect(`/${routePath}`);
}
