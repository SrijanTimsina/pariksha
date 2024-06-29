import React from "react";
import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/link";
import Styles from "@/components/HeroSection/HeroSection.module.css";

export default function HeroSection() {
  return (
    <div class={`${Styles.heroSection} bg -z-[1] flex flex-col justify-center`}>
      <div class={`${Styles.heroContainer} max-w-[380px] pl-4`}>
        <h1 class="mb-1 text-3xl font-medium max-[440px]:text-2xl max-[350px]:text-xl">
          <span class="text-7xl font-bold text-[#FD9801] max-[440px]:text-6xl max-[350px]:text-5xl">
            FREE
          </span>
          CSIT
        </h1>
        <h1 class="mb-4 text-3xl font-medium max-[440px]:text-2xl max-[350px]:text-xl">
          ENTRANCE PREPARATION
        </h1>
        <p class="mb-4 text-sm font-light leading-6">
          Enroll in CSIT Entrance Preparation Course by Pariksha and get ready
          to excel your CSIT Entrance.
        </p>
        <Link href="/">
          <PrimaryButton className=" " text={"Get Started Now"} />
        </Link>
      </div>
      <div class={`${Styles.expandableImage} -z-[2]`}></div>
    </div>
  );
}
