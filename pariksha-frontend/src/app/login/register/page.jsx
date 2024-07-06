"use client";

import SignupForm from "@/components/SignupForm";

import { Suspense } from "react";

export default function page() {
  return (
    <div className="content-container">
      <Suspense>
        <SignupForm />
      </Suspense>
    </div>
  );
}
