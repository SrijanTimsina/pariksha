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
import Spinner from "@/utils/Spinner";
import Link from "next/link";
import BannerAd from "@/components/BannerAd";

function page({ params }) {
  const testName = params.testname;
  const [testStatus, setTestStatus] = useState("not_started");
  const [countdownDate, setCountdownDate] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

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
      submitTestAnswers(testData?.questionSet._id, {
        answers: userSelectedAnswers,
      }),
    onSuccess: (data) => {
      setTestStatus("summary");
      setTestSummary(data);
    },
  });

  const handleSubmit = () => {
    submitAnswer();
  };
  const pageChanged = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {isPending && <Spinner />}
      {isSubmitting && <Spinner />}
      {testData && (
        <div className=" ">
          {testStatus === "not_started" && (
            <TestDetails
              start={() => {
                setTestStatus("running");
                setCountdownDate(Date.now() + 7200 * 1000);
              }}
              data={testData}
            />
          )}
          {testStatus === "running" && (
            <div>
              <div className="my-6 flex w-full flex-col items-center">
                <BannerAd currentPage={currentPage} />
              </div>
              <div className="m-auto w-full max-w-[1200px]">
                <TestNav
                  count={Object.keys(userSelectedAnswers).length}
                  title={testData.questionSet?.title}
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
                  subjects={testData.questionSet.subjects}
                  setUserSelectedAnswers={setUserSelectedAnswers}
                  pageChanged={pageChanged}
                />
              </div>
              <div className="m-auto mt-4 flex w-full max-w-[1200px] flex-col items-center border-t-2 border-gray-dark pt-8">
                <BannerAd currentPage={currentPage} />
              </div>
            </div>
          )}
          {testSummary && testStatus === "summary" && (
            <TestSummary
              title={testData?.questionSet?.title}
              data={testSummary}
              review={() => setTestStatus("review")}
            />
          )}
          {testSummary && testStatus === "review" && (
            <TestAnswersReview
              title={testData?.questionSet?.title}
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
