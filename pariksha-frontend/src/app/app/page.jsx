import CourseInfo from "@/components/CourseInfo/CourseInfo";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCourseData } from "@/hooks/courses";
import Navbar from "@/components/Navbar";

export default async function Course() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["csit-entrance"],
    queryFn: getCourseData,
  });
  return (
    <>
      <div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Navbar />
          <div className="pt-20">
            <CourseInfo link={"csit-entrance"} />
          </div>
        </HydrationBoundary>
      </div>
    </>
  );
}
