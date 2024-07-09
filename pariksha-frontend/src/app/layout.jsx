import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/utils/providers";
import Script from "next/script";

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
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BLFCZZLHQ1"
        ></script>
        <script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments)}
          gtag("js", new Date()); gtag("config", "G-BLFCZZLHQ1");
          `}
        </script>
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="pb-8">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
