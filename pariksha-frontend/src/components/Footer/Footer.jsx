import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer class="bg-greenColor text-white">
      <div class="m-auto w-full max-w-7xl px-8 pt-10">
        <div class="footer-container flex justify-between gap-8 pb-4 max-[550px]:flex-col">
          <div class="footer-left">
            <Link href="/">
              <img
                src="/images/LogoWhite.webp"
                alt="PARIKSHA"
                style={{ width: "auto" }}
              />
            </Link>
          </div>
          <div class="footer-right flex justify-between gap-10">
            <div class="footer-center flex gap-10">
              <div class="footer-column flex flex-col gap-1 text-sm">
                <h3 class="mb-2 text-lg font-semibold text-gray-200">
                  Sitemap
                </h3>
                <Link href="/partner-colleges">Partner Colleges</Link>
                <Link href="/CSIT">All About CSIT</Link>
                <Link href="/CSIT-entrance">All About CSIT Entrance</Link>
              </div>
              <div class="footer-column flex flex-col gap-1 text-sm">
                <h3 class="mb-2 text-lg font-semibold text-gray-200">
                  Our Services
                </h3>
                <Link href="#">CSIT Entrance</Link>
                <Link href="#">Past Questions</Link>
                <Link href="#">Video Lessons</Link>
              </div>
            </div>
            {/* <div class="max-[700px]:hidden">
              <h3>Get in touch</h3>
              <div class="social-media mb-4 mt-1 flex gap-2">
                <Link href="https://www.facebook.com/">
                  <Icon name="facebook" size={32} />
                </Link>
                <Link href="https://www.facebook.com/">
                  <Icon name="instagram" size={32} />
                </Link>
              </div>
            </div> */}
          </div>
        </div>
        {/* <div class="mt-6 min-[699px]:hidden">
          <div class="flex items-center justify-center gap-4">
            <Link href="https://www.facebook.com/">
              <Icon name="facebook" size={32} />
            </Link>
            <Link href="https://www.facebook.com/">
              <Icon name="instagram" size={32} />
            </Link>
          </div>
        </div> */}
      </div>
      <div class="footer-bottom mt-5 border-t border-white pb-6 pt-2 text-center text-gray-600">
        <p class="pt-4 text-white">©2024 Pariksha. All rights reserved.</p>
      </div>
    </footer>
  );
}
