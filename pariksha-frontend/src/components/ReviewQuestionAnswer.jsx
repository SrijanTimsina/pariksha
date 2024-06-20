import React from "react";
import { renderMath } from "@/utils/renderMath";

export default function ReviewQuestionAnswer({ question, count }) {
  console.log(question);
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex gap-6">
        <p className="text-md mt-2 font-bold">{count}</p>
        <p className="leading-10">{renderMath(question.questionText)}</p>
      </div>
      <div className="flex flex-col gap-4 pl-10">
        {question.answers.map((answer, idx) => (
          <p
            key={idx}
            className={`${question.correctAnswer === answer._id ? "bg-green-100" : ""} px-8 py-4`}
          >
            {renderMath(answer.text)}
          </p>
        ))}
      </div>
    </div>
  );
}
