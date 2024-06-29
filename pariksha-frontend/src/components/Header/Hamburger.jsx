"use client";

import React from "react";
import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";
import Styles from "@/components/Header/Hamburger.module.css";

export default function Hamburger() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <button
        class={`${Styles.navToggle} ${isOpen && Styles.navActive} z-[20] h-8 w-8 cursor-pointer min-[901px]:hidden`}
        onClick={() => setIsOpen(!isOpen)}
      ></button>
      <div
        class={`hamburgerMenu ease fixed inset-0 z-[4] flex transform flex-col items-center bg-[#f4f4f4] transition-transform duration-[400ms] min-[901px]:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div class="mb-8 mt-28 flex flex-col items-center gap-4">
          <Link href="/partner-colleges">Partner Colleges</Link>
          <Link href="/CSIT">All About CSIT</Link>
          <Link href="/CSIT-entrance">All About CSIT Entrance </Link>
        </div>
        <Link href="/">
          <PrimaryButton text={"Get Started Now"} />
        </Link>
      </div>
    </>
  );
}
