"use client";

import { redirect } from "next/navigation";
import withAuth from "@/utils/withAuth";

async function getData(params) {
  const subject = params.subject;

  let subjectId = 123456;
  let videoId = "abcdef";

  return `csit-entrance/videos/${subject}/66601aa37314e240c50009a1`;
}

async function Subject({ params }) {
  const routePath = await getData(params);
  redirect(`/${routePath}`);
}

export default withAuth(Subject);
