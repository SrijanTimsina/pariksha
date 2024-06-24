export default function PrimaryButton({ onClick, text, className, ...props }) {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-[#03747E] px-4 py-2 ${className} text-white`}
      {...props}
    >
      {text}
    </button>
  );
}
