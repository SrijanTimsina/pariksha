export default function PrimaryButton({
	onClick,
	text,
	className,
	...props
}) {
	return (
		<button
			onClick={onClick}
			className={`w-full px-4 py-2 bg-primary ${className}`}
			{...props}
		>
			{text}
		</button>
	);
}
