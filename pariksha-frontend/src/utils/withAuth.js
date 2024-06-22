"use client";
import { useEffect } from "react";

import { redirect } from "next/navigation";

export default function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const session = true;
    useEffect(() => {
      if (!session) {
        redirect("/login");
      }
    }, []);

    if (!session) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
}
