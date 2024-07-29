import PrimaryButton from "@/components/PrimaryButton";
import FullPageAd from "./FullPageAd";
import { useAuth } from "@/utils/AuthContext";
import { IoMdTime } from "react-icons/io";

export default function TestDetails({ start, data }) {
  const { testScores, testHistory } = useAuth();
  const currentTestHistory = testHistory.filter(
    (test) => test.questionSetId === data.questionSet._id
  );
  const currentTestScore = testScores[data.questionSet._id]
    ? testScores[data.questionSet._id]
    : "_";
  const convertDate = (date) => {
    const localCreatedAt = new Date(date);
    const localDay = String(localCreatedAt.getDate()).padStart(2, "0");
    const localMonth = String(localCreatedAt.getMonth() + 1).padStart(2, "0");
    const localHours = String(localCreatedAt.getHours()).padStart(2, "0");
    const localMinutes = String(localCreatedAt.getMinutes()).padStart(2, "0");
    const localFormattedDate = `${localDay}/${localMonth}, ${localHours}:${localMinutes}`;
    return localFormattedDate;
  };
  return (
    <>
      <FullPageAd />
      <div className="mt-0">
        <div className="content-container">
          <div className="flex items-center justify-between gap-4 border-b-2 border-gray-dark bg-white py-3 max-[700px]:flex-col">
            <p className="text-2xl font-semibold">{data.questionSet.title}</p>
            <PrimaryButton
              text={"Start Test"}
              className={"w-max rounded px-20"}
              style={{ padding: "8px 80px" }}
              onClick={start}
            />
          </div>
          <p className="mb-4 mt-8 text-xl font-semibold">Test Details</p>
          <div className="gap-8 min-[800px]:flex">
            <div className="flex gap-4">
              <div className="flex w-28 flex-col items-center gap-1 border-b-2 border-t-2 border-solid border-gray-300 py-2">
                <p>Questions</p>
                <p className="ml-2 font-semibold">100</p>
              </div>
              <div className="flex w-28 flex-col items-center gap-1 border-b-2 border-t-2 border-solid border-gray-300 py-2">
                <p>Marks</p>
                <p className="ml-2 font-semibold">100</p>
              </div>
              <div className="flex w-28 flex-col items-center gap-1 border-b-2 border-t-2 border-solid border-gray-300 py-2 pl-2">
                <p>Time</p>
                <p className="ml-2 font-semibold">2h</p>
              </div>
            </div>
            <div className="flex gap-4 max-[799px]:mt-6">
              <div className="flex w-28 flex-col items-center gap-1 border-b-2 border-t-2 border-solid border-gray-300 py-2">
                <p>Average</p>
                <p className="ml-2 font-semibold">
                  {parseFloat(data.questionSet.avgScore.toFixed(2))}
                </p>
              </div>
              <div className="flex w-28 flex-col items-center gap-1 border-b-2 border-t-2 border-solid border-gray-300 py-2 pl-2">
                <p>Your Score</p>
                <p className="ml-2 font-semibold">{currentTestScore}</p>
              </div>
              <div className="flex w-28 flex-col items-center gap-1 border-b-2 border-t-2 border-solid border-gray-300 py-2 pl-2">
                <p>Rank</p>
                <p className="ml-2 font-semibold">{data.userRank}</p>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <p className="mb-2 text-xl font-semibold">Subjects</p>
            <div className="mt-4 flex flex-wrap gap-4">
              {data.questionSet.subjects.map((subject, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-solid border-gray-300 p-4"
                >
                  <p className="text-lg font-semibold">{subject.name}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    Questions : {subject.questions.length}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12">
            <p className="mb-4 text-xl font-semibold">Test History</p>
            <div className="mt-4 flex flex-wrap gap-4">
              {currentTestHistory.length > 0 ? (
                currentTestHistory.map((test, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-solid border-gray-300 p-4"
                  >
                    <p className="text-lg font-semibold">
                      Score : {test.score}
                    </p>
                    <p className="mt-2 flex items-center gap-0.5 text-sm text-gray-600">
                      <IoMdTime />
                      {convertDate(test.createdAt)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-md w-full text-center text-gray-600">
                  You have not completed this test yet.
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 border-t-2 border-solid border-gray-300 pt-4">
            <PrimaryButton
              text={"Start Test"}
              className={"rounded"}
              onClick={start}
            />
          </div>
        </div>
      </div>
      {/* <div className="mt-4 flex w-full items-center justify-center">
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
      </div> */}
    </>
  );
}
