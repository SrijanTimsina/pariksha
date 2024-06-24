"use client";

import LoginForm from "@/components/LoginForm";
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
    <>
      {!user && (
        <div className="content-container">
          <LoginForm />
        </div>
      )}
    </>
  );
}
