import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/utils/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FREE CSIT ENTRANCE PREPARATION - PARIKSHA",
  description: "Join Pariksha to get free CSIT entrance preparation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="pb-8">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
