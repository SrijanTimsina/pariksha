"use client";

import { redirect } from "next/navigation";
import withAuth from "@/utils/withAuth";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/utils/Spinner";

async function getData(params) {
  const subject = params.subject;

  let subjectId = 123456;
  let videoId = "abcdef";

  return `csit-entrance/videos/${subject}/66601aa37314e240c50009a1`;
}

function Subject({ params }) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["subject", params.subject],
    queryFn: () => getData(params),
  });

  if (data) redirect(`/${data}`);
  return <Spinner />;
}

export default withAuth(Subject);
