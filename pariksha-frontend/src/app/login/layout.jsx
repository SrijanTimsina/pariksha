import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Pariksha : Login",
  description: "Pariksha : Login",
};

export default function Layout({ children }) {
  return (
    <div className="mb-10">
      <div className="mb-10 pl-4 pt-4">
        <Link href="/">
          <Image
            src="/ParikshaLogo.webp"
            width={200}
            height={100}
            alt="Pariksha"
          />
        </Link>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
