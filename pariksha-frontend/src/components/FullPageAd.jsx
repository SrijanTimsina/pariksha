import React, { useState, useEffect } from "react";
import Image from "next/image";
import fullPageAd from "/public/fullpagead.jpg";
import PrimaryButton from "./PrimaryButton";

export default function FullPageAd() {
  const [adState, setAdState] = useState(true);

  return (
    <>
      {adState && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.5)] px-4">
          <div>
            <div className="mb-4 flex w-full justify-end">
              <PrimaryButton
                text={"Skip"}
                className={"mb-2 w-max rounded-md px-8"}
                onClick={() => setAdState(false)}
              />
            </div>
            <Image
              src={fullPageAd}
              alt="fullpagead"
              width={900}
              height={"auto"}
            />
          </div>
        </div>
      )}
    </>
  );
}
