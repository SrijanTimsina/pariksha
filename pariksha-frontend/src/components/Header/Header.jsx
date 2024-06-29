import React from "react";
import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";
import Hamburger from "@/components/Header/Hamburger";

export default function Header() {
  return (
    <nav class="m-auto w-full max-w-7xl px-4">
      <div class="flex w-full items-center justify-between py-4">
        <div class="z-[20] mt-2">
          <Link href="/">
            <div>
              <picture>
                <source
                  media="(min-width:1051px)"
                  srcset="/images/ParikshaLogo.webp"
                />
                <source
                  media="(min-width:1050px)"
                  srcset="/images/ParikshaLogoSmall.webp"
                />
                <img
                  src="/images/ParikshaLogoSmall.webp"
                  alt="PARIKSHA"
                  style={{ width: "auto" }}
                />
              </picture>
            </div>
          </Link>
        </div>

        <Hamburger />

        <div class="text-md flex items-center gap-8 max-[900px]:hidden">
          <Link href="/partner-colleges">Partner Colleges</Link>
          <Link href="/CSIT">All About CSIT</Link>
          <Link href="/CSIT-entrance">All About CSIT Entrance </Link>
        </div>
        <div class="max-[901px]:hidden">
          <Link href="/">
            <PrimaryButton className="" text={"Get Started Now"} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
