"use client";

import SignupForm from "@/components/SignupForm";
import { useAuth } from "@/utils/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (user) router.replace(`${redirect}`);
  }, [user]);

  return (
    <div className="content-container">
      <SignupForm />
    </div>
  );
}
