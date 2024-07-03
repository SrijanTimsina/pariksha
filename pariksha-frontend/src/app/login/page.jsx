"use client";

import LoginForm from "@/components/LoginForm";
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
    <>
      {!user && (
        <div className="content-container">
          <LoginForm redirect={redirect} />
        </div>
      )}
    </>
  );
}
