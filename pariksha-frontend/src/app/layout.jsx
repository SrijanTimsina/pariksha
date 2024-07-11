import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/utils/providers";
// import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FREE CSIT ENTRANCE PREPARATION - PARIKSHA",
  manifest: "/manifest.json",
  description: "Join Pariksha to get free CSIT entrance preparation.",
  icons: {
    icon: "/imagesPWA/icons/icon-192x192.png",
    shortcut: "/imagesPWA/icons/icon-192x192.png",
    apple: "/imagesPWA/icons/icon-192x192.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/imagesPWA/icons/icon-192x192.png",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="pb-8">{children}</div>
        </Providers>
      </body>
      {/* <GoogleAnalytics gaId="G-BLFCZZLHQ1" /> */}
    </html>
  );
}
