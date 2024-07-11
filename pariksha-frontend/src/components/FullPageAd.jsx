import React, { useState, useEffect } from "react";
import Image from "next/image";
import Countdown from "react-countdown";

import { IoMdClose } from "react-icons/io";

export default function FullPageAd() {
  const [adState, setAdState] = useState(true);
  const renderer = ({ seconds }) => {
    if (seconds - 3 <= 0) {
      return (
        <span onClick={() => setAdState(false)}>
          <IoMdClose size={20} />
        </span>
      );
    } else {
      return (
        <span className="text-sm font-bold text-white">{seconds - 3}</span>
      );
    }
  };

  return (
    <>
      {adState && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(0,0,0,0.5)] p-4">
          <div className="relative px-6">
            <div className="absolute right-2 top-0 z-[9999] mt-[-18px] flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary text-white">
              <Countdown
                date={Date.now() + 1000 * 6}
                renderer={renderer}
                onComplete={() => setAdState(false)}
              />
            </div>
            <picture>
              <source
                media="(max-width: 800px)"
                srcset="/adImages/fullpagead-portrait.webp"
              />
              <source
                media="(min-width: 800px)"
                srcSet="/adImages/fullpagead-landscape.webp"
              />
              <Image
                src="/adImages/fullpagead-landscape.webp"
                alt="New Summit College"
                height={100}
                width={1100}
              />
            </picture>
          </div>
        </div>
      )}
    </>
  );
}
