export async function generateMetadata(
	{ params, searchParams },
	parent
) {
	return {
		title: `Pariksha: ${params.course}`,
	};
}

export default function Layout({ children }) {
	return <>{children}</>;
}
