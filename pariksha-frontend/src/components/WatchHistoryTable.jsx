import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getWatchHistory } from "@/hooks/videos";

import Image from "next/image";
import { useAuth } from "@/utils/AuthContext";
import { IoMdTime } from "react-icons/io";
import Link from "next/link";

export default function WatchHistoryTable({ maxItems }) {
  const { watchHistory } = useAuth();
  const { data: userWatchHistory } = useQuery({
    queryKey: ["userWatchHistory"],
    queryFn: () => getWatchHistory(maxItems),
  });

  const convertDate = (date) => {
    const localCreatedAt = new Date(date);
    const localDay = String(localCreatedAt.getDate()).padStart(2, "0");
    const localMonth = String(localCreatedAt.getMonth() + 1).padStart(2, "0");

    const localFormattedDate = `${localDay}/${localMonth}`;
    return localFormattedDate;
  };

  return (
    <div className="mt-4">
      {(!userWatchHistory || userWatchHistory.length === 0) && (
        <div className="text-center">
          <p className="text-md w-full text-center text-gray-600">
            You have not watched any videos yet.
          </p>
        </div>
      )}

      {userWatchHistory && userWatchHistory.length > 0 && (
        <div className="flex flex-wrap gap-8">
          {userWatchHistory.map((history, index) => (
            <Link
              href={`/csit-entrance/videos/${history.subject}/${history.video._id}`}
            >
              <div key={index} className="flex gap-4">
                <div
                  className={`relative min-w-40 rounded-lg ${watchHistory.includes(history.video._id) ? "outline outline-[6px] -outline-offset-[6px] outline-red-600" : ""} `}
                >
                  <Image
                    src={`https://img.youtube.com/vi/${history.video.videoFile}/hqdefault.jpg`}
                    alt="video"
                    width={160}
                    height={90}
                    className="rounded-lg"
                  />
                  <p className="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-1 py-0.5 text-sm text-white">
                    {history.video.duration}
                  </p>
                </div>
                <div className="w-full max-w-[200px]">
                  <h4 className="text-lg font-semibold">
                    {history.video.title}
                  </h4>
                  <p className="ml-1 mt-1 text-sm text-gray-600">
                    {history.subject}
                  </p>
                  <p className="ml-1 mt-2 flex items-center gap-1 text-xs">
                    <IoMdTime />
                    {convertDate(history.createdAt)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
