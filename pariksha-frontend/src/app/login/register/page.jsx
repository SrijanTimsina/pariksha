"use client";

import SignupForm from "@/components/SignupForm";
import { useAuth } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) router.replace("/");
  }, [user]);

  return (
    <div className="content-container">
      <SignupForm />
    </div>
  );
}
