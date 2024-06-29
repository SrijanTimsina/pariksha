import { Providers } from "@/utils/providers";
import { cookies } from "next/headers";

export const metadata = {
  title: "FREE CSIT ENTRANCE PREPARATION - PARIKSHA",
  description: "Join Pariksha to get free CSIT entrance preparation.",
};

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");

  return (
    <Providers accessToken={accessToken} refreshToken={refreshToken}>
      <div className="pb-8">{children}</div>
    </Providers>
  );
}
