import CoursesList from "@/components/CoursesList/CoursesList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchCourses } from "@/hooks/courses";

export default async function Courses() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });
  return (
    <div className="content-container">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CoursesList />
      </HydrationBoundary>
    </div>
  );
}
