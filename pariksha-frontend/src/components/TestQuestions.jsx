"use client";
import { useEffect, useState } from "react";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

import QuestionSelector from "@/components/QuestionSelector";

const TestQuestions = ({ subjects, setUserSelectedAnswers }) => {
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 1;
  const [questionSelectorCount, setQuestionSelectorCount] = useState(
    subjects[0].questions.length
  );

  if (!subjects || subjects.length === 0) {
    return <div>No subjects available</div>;
  }

  const currentSubject = subjects[currentSubjectIndex];

  const totalPages = Math.ceil(
    currentSubject.questions.length / questionsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (currentSubjectIndex < subjects.length - 1) {
      setCurrentSubjectIndex(currentSubjectIndex + 1);
      setCurrentPage(0);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (currentSubjectIndex > 0) {
      setCurrentSubjectIndex(currentSubjectIndex - 1);
      setCurrentPage(
        Math.ceil(
          subjects[currentSubjectIndex - 1].questions.length / questionsPerPage
        ) - 1
      );
    }
  };
  const jumpToQuestion = (questionNumber) => {
    let totalQuestions = 0;
    for (let i = 0; i < subjects.length; i++) {
      totalQuestions += subjects[i].questions.length;
      if (questionNumber <= totalQuestions) {
        setCurrentSubjectIndex(i);
        const questionIndexInSubject =
          questionNumber - (totalQuestions - subjects[i].questions.length);
        setCurrentPage(
          Math.floor((questionIndexInSubject - 1) / questionsPerPage)
        );
        break;
      }
    }
  };
  const globalQuestionIndex = subjects
    .slice(0, currentSubjectIndex)
    .reduce((acc, subject) => acc + subject.questions.length, 0);

  const startIdx = currentPage * questionsPerPage;
  const currentQuestions = currentSubject.questions.slice(
    startIdx,
    startIdx + questionsPerPage
  );
  const renderMath = (text) => {
    const regex = /<InlineMath>(.*?)<\/InlineMath>/g;
    return text.split(regex).map((part, index) => {
      if (index % 2 === 1) {
        return <InlineMath key={index}>{part}</InlineMath>;
      }
      return part;
    });
  };
  const selectAnswer = (questionId, answerId) => {
    if (userAnswers[questionId] == answerId) {
      console.log("Already selected");
    } else {
      setUserAnswers((prev) => ({
        ...prev,
        [questionId]: answerId,
      }));
    }
  };

  useEffect(() => {
    setUserSelectedAnswers(userAnswers);
  }, [userAnswers]);

  return (
    <div className="content-container flex flex-col items-center gap-4">
      <h2 className="mb-4 mt-12 text-xl font-semibold">
        {currentSubject.name}
      </h2>
      <div>
        {currentQuestions.map((question, idx) => (
          <div key={idx}>
            <div className="mb-2 flex gap-6">
              <p className="text-md mt-2 font-bold">
                {globalQuestionIndex + startIdx + idx + 1}.
              </p>
              <p className="leading-10">{renderMath(question.questionText)}</p>
            </div>
            <div className="pl-2">
              <RadioGroup
                onChange={(e) => selectAnswer(question._id, e)}
                value={userAnswers[question._id]}
              >
                <Stack direction="column" spacing={4}>
                  {question.answers.map((answer, idx) => (
                    <Radio value={answer._id} key={idx} spacing={6}>
                      {renderMath(answer.text)}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-8">
        <button
          onClick={handleBack}
          disabled={currentSubjectIndex === 0 && currentPage === 0}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={
            currentSubjectIndex === subjects.length - 1 &&
            currentPage === totalPages - 1
          }
        >
          Next
        </button>
      </div>
      <QuestionSelector
        subjects={subjects}
        questionSelectorCount={questionSelectorCount}
        jumpToQuestion={jumpToQuestion}
        userAnswers={userAnswers}
      />
    </div>
  );
};

export default TestQuestions;
