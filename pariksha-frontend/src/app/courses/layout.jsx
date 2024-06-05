import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Pariksha",
  description: "Pariksha : Courses",
};

export default function Layout({ children }) {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="pt-20">{children}</div>
    </>
  );
}
