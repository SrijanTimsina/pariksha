import CourseInfo from "@/components/CourseInfo/CourseInfo";

import Navbar from "@/components/Navbar";

export default async function Course() {
  return (
    <>
      <div>
        <Navbar />
        <div className="pt-20">
          <CourseInfo link={"csit-entrance"} />
        </div>
      </div>
    </>
  );
}
