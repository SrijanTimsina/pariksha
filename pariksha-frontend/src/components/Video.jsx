"use client";

import React, { useRef } from "react";
import { useAuth } from "@/utils/AuthContext";

import ReactPlayer from "react-player";

export default function Video({ url, videoId }) {
  const { addToWatchHistory } = useAuth();
  const playerRef = useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [adPlaying, setAdPlaying] = React.useState(false);
  const [adPlayed, setAdPlayed] = React.useState(false);

  return (
    <div className="relative">
      {!adPlayed && (
        <div
          className="adVideoContainer absolute inset-0"
          onClick={() => {
            setAdPlaying(true);
          }}
        >
          <ReactPlayer
            url={"/adDemo.mp4"}
            playing={adPlaying}
            width="100%"
            height="100%"
            className="w-full"
            onEnded={() => {
              setAdPlaying(false);
              setAdPlayed(true);
              setPlaying(true);
            }}
            style={{
              aspectRatio: "16/9",
              maxHeight: "80vh",
              backgroundColor: "#000",
              opacity: `${adPlaying ? 1 : 0}`,
            }}
          />
        </div>
      )}

      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/watch?v=${url}?&rel=0`}
        playing={playing}
        controls={true}
        width="100%"
        height="100%"
        className="w-full"
        style={{
          aspectRatio: "16/9",
          maxHeight: "80vh",
        }}
        onEnded={() => {
          addToWatchHistory(videoId);
        }}
      />
    </div>
  );
}
