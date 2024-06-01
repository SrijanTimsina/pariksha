export const API_URL =
	process.env.NEXT_PUBLIC_MODE === "DEVELOPMENT"
		? "http://localhost:3465/api/v1"
		: "https://pariksha-27nu.onrender.com/api/v1";
