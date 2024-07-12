import PrimaryButton from "@/components/PrimaryButton";
import FullPageAd from "./FullPageAd";
import { useAuth } from "@/utils/AuthContext";

export default function TestDetails({
  title,
  start,
  questionsCount,
  totalMarks,
  time,
  data,
}) {
  const { testHistory } = useAuth();
  const currentTestHistory = testHistory.filter(
    (test) => test.questionSetId === data._id
  );

  return (
    <>
      <FullPageAd />
      <div className="mt-4 flex w-full items-center justify-center">
        <div className="border border-black p-8">
          <p className="text-lg font-semibold"> {title}</p>
          <p>Questions: {questionsCount}</p>
          <p>Marks: {totalMarks}</p>
          <p>Time: {time}</p>
          <PrimaryButton
            text={"Start Test"}
            className={"mt-4"}
            onClick={start}
          />
        </div>
      </div>
    </>
  );
}
