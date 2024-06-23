"use client";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import isUserAuthenticated from "./isUserAuthenticated";
import Spinner from "./Spinner";

export default function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const router = useRouter();
    const {
      data: session,
      isPending: loading,
      isError: error,
    } = isUserAuthenticated();

    useEffect(() => {
      if (error) {
        router.push("/login");
      }
    }, [session, router, loading, error]);

    if (loading) {
      return <Spinner />;
    }

    if (session) {
      return <WrappedComponent {...props} />;
    }
  };
}
