"use client";

import React, { useRef } from "react";
import { set } from "react-hook-form";
import ReactPlayer from "react-player";

export default function Video({ url }) {
  const playerRef = useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [adPlaying, setAdPlaying] = React.useState(false);
  const [adPlayed, setAdPlayed] = React.useState(false);
  function playVideo() {
    setPlaying(true);
  }

  return (
    <div className="relative flex-1">
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
      />
    </div>
  );
}
