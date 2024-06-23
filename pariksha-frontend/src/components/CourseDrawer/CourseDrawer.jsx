import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CourseDrawer({ subjects, courseTitle }) {
  return (
    <div className="flex w-full flex-wrap gap-4">
      {subjects.map((subject, index) => (
        <Link href={`/${courseTitle}/videos/${subject.title}`} key={index}>
          <Image
            src={`/previewImages/${subject.title}.jpg`}
            height={140}
            width={200}
            alt={subject.title}
            className="rounded-xl"
            style={{ height: "140px", width: "200px" }}
          />
          <p className="text-md mt-3 font-semibold">{subject.title}</p>
        </Link>
      ))}
    </div>
  );
}
