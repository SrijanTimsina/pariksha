"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/hooks/auth";
import { updateUserSubjectWatching } from "@/hooks/subjects";
import { updateUserWatchHistory } from "@/hooks/videos";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [watchHistory, setWatchHistory] = useState([]);
  const [subjectCurrentWatching, setSubjectCurrentWatching] = useState({});
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getCurrentUser(),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    retry: false,
  });
  const updateUserWatching = useMutation({
    mutationFn: (data) => updateUserSubjectWatching(data),
  });
  const updateWatchHistory = useMutation({
    mutationFn: (data) => updateUserWatchHistory(data),
  });

  useEffect(() => {
    if (data) {
      setUser(data);
      setSubjectCurrentWatching(data.subjectCurrentWatching);
      setWatchHistory(data.watchHistory);
    }
  }, [data]);

  useEffect(() => {
    if (
      subjectCurrentWatching &&
      Object.keys(subjectCurrentWatching).length > 0
    ) {
      updateUserWatching.mutate(subjectCurrentWatching);
    }
  }, [subjectCurrentWatching]);
  useEffect(() => {
    if (watchHistory && watchHistory.length > 0) {
      updateWatchHistory.mutate(watchHistory);
    }
  }, [watchHistory]);

  const login = () => {
    queryClient.invalidateQueries(["current-user"]);
  };

  const changeSubjectCurrentWatching = (subject, videoId) => {
    setSubjectCurrentWatching((prevState) => ({
      ...prevState,
      [subject]: videoId,
    }));
  };

  const removeFromWatchHistory = (videoId) => {
    if (watchHistory.includes(videoId)) {
      setWatchHistory((prevState) => prevState.filter((id) => id !== videoId));
    }
  };
  const addToWatchHistory = (videoId) => {
    if (!watchHistory.includes(videoId))
      setWatchHistory((prevState) => [...prevState, videoId]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        watchHistory,
        subjectCurrentWatching,
        changeSubjectCurrentWatching,
        removeFromWatchHistory,
        addToWatchHistory,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
