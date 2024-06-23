import Image from "next/image";
import React from "react";
import ReactPlayer from "react-player";

export default function PreviewVIdeo() {
  return (
    // <ReactPlayer
    //   url={"/adDemo.mp4"}
    //   playing={false}
    //   controls={true}
    //   height={"auto"}
    //   className="w-full"
    //   style={{
    //     width: "400px",
    //     aspectRatio: "16/9",
    //   }}
    // />
    <div className="w-[200px]">
      <Image src={"/entrance.webp"} height={60} width={400} alt="Stock Image" />
    </div>
  );
}
