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
  const [testHistory, setTestHistory] = useState([]);
  const [testScores, setTestScores] = useState({});
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getCurrentUser(),
    refetchOnWindowFocus: false,
    retry: false,
    cacheTime: 0,
    staleTime: 0,
  });
  const updateUserWatching = useMutation({
    mutationFn: (data) => updateUserSubjectWatching(data),
  });
  const updateWatchHistory = useMutation({
    mutationFn: (data) => updateUserWatchHistory(data),
  });

  useEffect(() => {
    if (data) {
      setUser(data.user);
      setSubjectCurrentWatching(data.user.subjectCurrentWatching);
      setWatchHistory(data.user.watchHistory);
      const testHistory = data.testHistory.map((item) => {
        return {
          score: item.score,
          questionSetId: item.questionSetId._id,
          createdAt: item.createdAt,
          questionSetData: item.questionSetId,
          _id: item._id,
        };
      });
      setTestHistory(testHistory);
    }
  }, [data]);

  useEffect(() => {
    if (testHistory) {
      const result = testHistory.reduce((acc, current) => {
        const { questionSetId, score } = current;

        if (!acc[questionSetId] || acc[questionSetId] < score) {
          acc[questionSetId] = score;
        }

        return acc;
      }, {});
      setTestScores(result);
    }
  }, [testHistory]);

  const login = () => {
    queryClient.invalidateQueries(["current-user"]);
  };

  const changeSubjectCurrentWatching = (subject, videoId) => {
    setSubjectCurrentWatching((prevState) => ({
      ...prevState,
      [subject]: videoId,
    }));
    updateUserWatching.mutate({ subject: subject, videoId: videoId });
  };

  const removeFromWatchHistory = (videoId) => {
    if (watchHistory.includes(videoId)) {
      setWatchHistory((prevState) => prevState.filter((id) => id !== videoId));
      updateWatchHistory.mutate({
        option: "remove",
        videoId: videoId,
      });
    }
  };
  const addToWatchHistory = (videoId) => {
    if (!watchHistory.includes(videoId)) {
      setWatchHistory((prevState) => [...prevState, videoId]);
      updateWatchHistory.mutate({
        option: "add",
        videoId: videoId,
      });
    }
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
        testHistory,
        login,
        logout,
        testScores,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
