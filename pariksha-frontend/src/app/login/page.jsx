"use client";

import LoginForm from "@/components/LoginForm";

import { Suspense } from "react";

export default function page() {
  return (
    <>
      <div className="content-container">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </>
  );
}
