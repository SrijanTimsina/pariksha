"use client";

import Drawer from "@/components/Drawer/Drawer";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import OverviewDrawer from "@/components/OverviewDrawer";

export default function Layout({ children, params }) {
  const videoId = params.video;
  const subjectTitle = params.subject;
  const courseTitle = "csit-entrance";

  return (
    <div className="videoPageContainer relative flex w-full">
      <div className="relative w-full flex-1">
        {children}
        <div className="m-auto mt-1 w-full max-w-[1300px]">
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
      />
    </div>
  );
}
