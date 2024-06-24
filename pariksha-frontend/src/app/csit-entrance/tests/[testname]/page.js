"use client";

import React, { useEffect, useState, useRef } from "react";
import { getTestInfo, submitTestAnswers } from "@/hooks/tests";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

import TestQuestions from "@/components/TestQuestions";
import TestDetails from "@/components/TestDetails";
import TestSummary from "@/components/TestSummary";

import TestNav from "@/components/TestNav";
import TestAnswersReview from "@/components/TestAnswersReview";
import withAuth from "@/utils/withAuth";
import Image from "next/image";

function page({ params }) {
  const testName = params.testname;
  const [testStatus, setTestStatus] = useState("not_started");
  const [countdownDate, setCountdownDate] = useState(0);

  const [userSelectedAnswers, setUserSelectedAnswers] = useState({});
  const [testSummary, setTestSummary] = useState({});
  const toast = useToast();

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
            <div>
              <div className="flex w-full flex-col items-center">
                <Image
                  src={"/up.jpg"}
                  alt="up"
                  width={1200}
                  height={200}
                  className="rounded-md"
                />
              </div>
              <TestNav
                count={Object.keys(userSelectedAnswers).length}
                title={testData?.title}
                countdownDate={countdownDate}
                handleSubmit={handleSubmit}
                onTimerEnd={() => {
                  toast({
                    title: "Time's up.",
                    description: "Your time is up. Please view your results",
                    status: "info",
                    duration: 9000,
                    isClosable: true,
                  });

                  handleSubmit();
                }}
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

export default withAuth(page);
