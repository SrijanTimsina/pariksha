"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/hooks/auth";

export default function isUserAuthenticated() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: false,
    cacheTime: 0,
    staleTime: 0,
  });
}
