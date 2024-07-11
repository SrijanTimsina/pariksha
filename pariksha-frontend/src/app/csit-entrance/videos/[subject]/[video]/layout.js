"use client";

import Drawer from "@/components/Drawer/Drawer";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import OverviewDrawer from "@/components/OverviewDrawer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

export default function Layout({ children, params }) {
  const [nextVideo, setNextVideo] = useState(null);
  const [prevVideo, setPrevVideo] = useState(null);
  const videoId = params.video;
  const subjectTitle = params.subject;
  const courseTitle = "csit-entrance";

  return (
    <div className="videoPageContainer relative flex w-full">
      <div className="relative w-full flex-1">
        <div className="relative">
          {children}
          <div>
            {prevVideo && (
              <button
                className="-ml-1 cursor-pointer bg-primary bg-opacity-50 py-1 text-gray-100 hover:bg-opacity-100 hover:text-white"
                style={{
                  borderRadius: 0,
                  position: "absolute",
                  top: "50%",
                  left: "0",
                }}
              >
                <Link
                  href={`/${courseTitle}/videos/${subjectTitle}/${prevVideo}`}
                >
                  <MdOutlineNavigateBefore size={32} />
                </Link>
              </button>
            )}
            {nextVideo && (
              <button
                className="-mr-1 cursor-pointer bg-primary bg-opacity-50 py-1 text-gray-100 hover:bg-opacity-100 hover:text-white"
                style={{
                  borderRadius: 0,
                  position: "absolute",
                  top: "50%",
                  right: "0",
                }}
              >
                <Link
                  href={`/${courseTitle}/videos/${subjectTitle}/${nextVideo}`}
                >
                  <MdOutlineNavigateNext size={32} />
                </Link>
              </button>
            )}
          </div>
        </div>
        <div className="my-2 flex w-full flex-col items-center">
          <Link
            href={`https://pariksha.solutions/new-summit-college`}
            target="_blank"
          >
            <picture>
              <source
                media="(max-width: 800px)"
                srcset="/adImages/ad-200.webp"
              />
              <source
                media="(min-width: 800px)"
                srcSet="/adImages/ad-100.webp"
              />
              <Image
                src="/adImages/ad-100.webp"
                alt="New Summit College"
                height={100}
                width={1200}
              />
            </picture>
          </Link>
        </div>
        <div className="m-auto mt-1 w-full max-w-[1300px] border-t-2 border-gray-dark">
          <Tabs colorScheme={"teal"} defaultIndex={1}>
            <TabList fontWeight={"medium"} paddingLeft={"8"} paddingRight={"8"}>
              <Tab>Overview</Tab>
              <Tab>Course&nbsp;Content</Tab>
              <Tab>Notes</Tab>
            </TabList>

            <TabPanels paddingLeft={"8"} paddingRight={"8"}>
              <TabPanel>{/* <p>{videoData.title}</p> */}</TabPanel>
              <TabPanel>
                <OverviewDrawer
                  videoId={videoId}
                  courseTitle={courseTitle}
                  subjectTitle={subjectTitle}
                />
              </TabPanel>
              <TabPanel>
                <p>Coming Soon !!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
      <Drawer
        videoId={videoId}
        courseTitle={courseTitle}
        subjectTitle={subjectTitle}
        setNextVideo={(id) => setNextVideo(id)}
        setPrevVideo={(id) => setPrevVideo(id)}
      />
    </div>
  );
}
