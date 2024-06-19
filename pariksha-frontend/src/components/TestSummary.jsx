import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";

export default function TestSummary({ title, data }) {
  console.log(data);
  const [summaryPage, setSummaryPage] = useState(true);
  return (
    <div className="mt-8">
      <div className="content-container">
        <p className="text-2xl font-semibold">{title}</p>

        {summaryPage && (
          <>
            <div>
              <h2 className="mt-8 text-xl font-semibold">
                Subject Wise Summary
              </h2>
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
              <div className="mt-4 flex gap-4">
                <div className="flex w-max flex-col gap-1 border-b-2 border-t-2 border-solid border-gray-300 px-8 py-2">
                  <p>Your Marks</p>
                  <p className="ml-2 font-semibold">{data.userMarks}</p>
                </div>
                <div className="flex w-max flex-col gap-1 border-b-2 border-t-2 border-solid border-gray-300 px-8 py-2">
                  <p>Average Marks</p>
                  <p className="ml-2 font-semibold">{data.avgScore}</p>
                </div>
                <div className="flex w-max flex-col gap-1 border-b-2 border-t-2 border-solid border-gray-300 px-8 py-2">
                  <p>Percentile</p>
                  <p className="ml-2 font-semibold">{data.percentile}%</p>
                </div>
                <div className="flex w-max flex-col gap-1 border-b-2 border-t-2 border-solid border-gray-300 px-8 py-2">
                  <p>Rank</p>
                  <p className="ml-2 font-semibold">{data.userRank}</p>
                </div>
              </div>
            </div>
            <PrimaryButton
              text={"Review Your Answers"}
              onClick={() => {
                setSummaryPage(false);
              }}
              className={"mt-8 w-max rounded-xl px-16 py-3"}
            />
          </>
        )}
        {!summaryPage && <div></div>}
      </div>
    </div>
  );
}
