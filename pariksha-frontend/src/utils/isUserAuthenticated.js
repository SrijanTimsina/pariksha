"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/hooks/auth";

export default function isUserAuthenticated() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 1, // Retry once on failure
  });
}
