function capitalizeFirstLetter(string) {
	return string[0].toUpperCase() + string.slice(1);
}
export async function generateMetadata(
	{ params, searchParams },
	parent
) {
	const title = capitalizeFirstLetter(
		params.course.replace("-", " ")
	);
	return {
		title: `Pariksha: ${title}`,
	};
}

export default function Layout({ children }) {
	return <>{children}</>;
}
