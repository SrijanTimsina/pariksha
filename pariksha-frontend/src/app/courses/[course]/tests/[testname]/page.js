"use client";

import React, { useEffect, useState } from "react";
import { getTestInfo } from "@/hooks/tests";
import { useQuery } from "@tanstack/react-query";
import PrimaryButton from "@/components/PrimaryButton";
import Countdown from "react-countdown";
import TestQuestions from "@/components/TestQuestions";

export default function page({ params }) {
  const testName = params.testname;
  const [testStatus, setTestStatus] = useState("not_started");
  const [countdown, setCountdown] = useState(0); // State to hold the countdown time
  const [isRunning, setIsRunning] = useState(false);

  const {
    data: testData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["test", testName],
    queryFn: () => getTestInfo(testName),
  });

  return (
    <div>
      {testData && (
        <div className="mt-10 px-4">
          {testStatus === "not_started" && (
            <div className="flex w-full items-center justify-center">
              <div className="border border-black p-8">
                <p className="text-lg font-semibold"> {testData.title}</p>
                <p>Questions: 100</p>
                <p>Marks: 100</p>
                <p>Time: 2 Hours</p>
                <PrimaryButton
                  text={"Start Test"}
                  className={"mt-4"}
                  onClick={() => {
                    setTestStatus("running");
                  }}
                />
              </div>
            </div>
          )}
          {testStatus === "running" && (
            <div>
              <Countdown
                date={Date.now() + 7200 * 1000}
                // onComplete={onTimerEnd}
                renderer={({ hours, minutes, seconds }) => (
                  <p>
                    {hours}:{minutes}:{seconds}
                  </p>
                )} // Render prop to display remaining time
              />
              <TestQuestions subjects={testData.subjects} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
