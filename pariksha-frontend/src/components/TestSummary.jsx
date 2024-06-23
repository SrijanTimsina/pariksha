import React, { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { Progress } from "@chakra-ui/react";
import FullPageAd from "./FullPageAd";

export default function TestSummary({ title, data, review }) {
  return (
    <>
      <FullPageAd />
      <div className="mt-8">
        <div className="content-container">
          <p className="text-2xl font-semibold">{title}</p>

          <div>
            <h2 className="mt-8 text-xl font-semibold">Subject Wise Summary</h2>
            <div className="mt-4 flex flex-wrap gap-4">
              {data.userSummary.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-solid border-gray-300 p-6"
                >
                  <p className="text-lg font-semibold">{item.subject}</p>
                  <p className="text-sm text-gray-600">
                    Your Marks : {item.subjectMarks}
                  </p>
                  <p className="text-sm text-gray-600">
                    Total Marks : {item.subjectTotalMarks}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mt-8 text-xl font-semibold">Overall Score</h2>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex w-32 flex-col items-center gap-1 border-b-2 border-t-2 border-solid border-gray-300 py-2 pl-2">
                <p>Marks</p>
                <p className="ml-2 font-semibold">{data.userMarks}</p>
              </div>
              <div className="flex w-32 flex-col items-center gap-1 border-b-2 border-t-2 border-solid border-gray-300 py-2">
                <p>Average</p>
                <p className="ml-2 font-semibold">{data.avgScore}</p>
              </div>
              <div className="flex w-32 flex-col items-center gap-1 border-b-2 border-t-2 border-solid border-gray-300 py-2">
                <p>Percentile</p>
                <p className="ml-2 font-semibold">{data.percentile}%</p>
              </div>
              <div className="flex w-32 flex-col items-center gap-1 border-b-2 border-t-2 border-solid border-gray-300 py-2">
                <p>Rank</p>
                <p className="ml-2 font-semibold">{data.userRank}</p>
              </div>
            </div>
            <div className="mt-8">
              <p className="mb-2 text-lg font-semibold">
                Your are in top {parseFloat((100 - data.percentile).toFixed(2))}{" "}
                %
              </p>
              <Progress
                value={data.percentile}
                colorScheme="blackAlpha"
                size={"sm"}
              />
            </div>
          </div>
          <PrimaryButton
            text={"Review Your Answers"}
            onClick={review}
            className={"mt-8 w-max rounded-xl px-16 py-3"}
          />
        </div>
      </div>
    </>
  );
}
