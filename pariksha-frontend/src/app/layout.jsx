import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Pariksha",
	description: "Pariksha app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<div>
						<Navbar />
					</div>
					<div className="mt-16">{children}</div>
				</Providers>
			</body>
		</html>
	);
}
