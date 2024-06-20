import React, { useState } from "react";
import Image from "next/image";
import fullPageAd from "/public/fullpagead.jpg";
import PrimaryButton from "./PrimaryButton";

export default function FullPageAd() {
  const [adState, setAdState] = useState(true);
  return (
    <>
      {adState && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
          <div>
            <PrimaryButton
              text={"Skip"}
              className={"mb-2 w-max"}
              onClick={() => setAdState(false)}
            />
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
