import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Pariksha",
  description: "Pariksha : Courses",
};

export default function Layout({ children }) {
  return (
    <div className="mb-10">
      <div className="mb-10 pl-4 pt-4">
        <Link href="/">
          <Image src="/01.png" width={200} height={100} alt="Pariksha" />
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
