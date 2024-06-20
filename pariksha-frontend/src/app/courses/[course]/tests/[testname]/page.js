"use client";

import React, { useEffect, useState, useRef } from "react";
import { getTestInfo, submitTestAnswers } from "@/hooks/tests";
import { useMutation, useQuery } from "@tanstack/react-query";

import TestQuestions from "@/components/TestQuestions";
import TestDetails from "@/components/TestDetails";
import TestSummary from "@/components/TestSummary";

import TestNav from "@/components/TestNav";
import TestAnswersReview from "@/components/TestAnswersReview";

export default function page({ params }) {
  const testName = params.testname;
  const [testStatus, setTestStatus] = useState("not_started");
  const [countdownDate, setCountdownDate] = useState(0);

  const [userSelectedAnswers, setUserSelectedAnswers] = useState({});
  const [testSummary, setTestSummary] = useState({});

  const {
    data: testData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["test", testName],
    queryFn: () => getTestInfo(testName),
  });

  const {
    mutate: submitAnswer,
    isPending: isSubmitting,
    isError: isSubmitError,
  } = useMutation({
    mutationFn: () =>
      submitTestAnswers(testData?._id, { answers: userSelectedAnswers }),
    onSuccess: (data) => {
      setTestStatus("summary");
      setTestSummary(data);
    },
  });

  const handleSubmit = () => {
    submitAnswer();
  };

  return (
    <div>
      {testData && (
        <div className=" ">
          {testStatus === "not_started" && (
            <TestDetails
              title={testData?.title}
              start={() => {
                setTestStatus("running");
                setCountdownDate(Date.now() + 7200 * 1000);
              }}
              questionsCount={100}
              totalMarks={100}
              time={"2 Hours"}
            />
          )}
          {testStatus === "running" && (
            <div className="">
              <TestNav
                count={Object.keys(userSelectedAnswers).length}
                title={testData?.title}
                countdownDate={countdownDate}
                handleSubmit={handleSubmit}
              />

              <TestQuestions
                subjects={testData.subjects}
                setUserSelectedAnswers={setUserSelectedAnswers}
              />
            </div>
          )}
          {testSummary && testStatus === "summary" && (
            <TestSummary
              title={testData?.title}
              data={testSummary}
              review={() => setTestStatus("review")}
            />
          )}
          {testSummary && testStatus === "review" && (
            <TestAnswersReview
              title={testData?.title}
              data={testSummary}
              setTestStatus={setTestStatus}
            />
          )}
        </div>
      )}
    </div>
  );
}
