"use client";

import Video from "@/components/Video";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVideo } from "@/hooks/videos";
import { useAuth } from "@/utils/AuthContext";
import withAuth from "@/utils/withAuth";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import OverviewDrawer from "@/components/OverviewDrawer";

function VideoPage({ params }) {
  const { changeSubjectCurrentWatching } = useAuth();
  const videoId = params.video;
  const subject = params.subject;
  const courseTitle = "csit-entrance";

  useEffect(() => {
    changeSubjectCurrentWatching(`csit-entrance-${subject}`, videoId);
  }, []);

  const {
    data: videoData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideo(videoId, subject),
  });

  return (
    <>
      {videoData && (
        <div className="relative w-full flex-1">
          <Video url={videoData.videoFile} videoId={videoId} />
          <div className="m-auto mt-1 w-full max-w-[1300px]">
            <Tabs colorScheme={"teal"}>
              <TabList
                fontWeight={"medium"}
                paddingLeft={"8"}
                paddingRight={"8"}
              >
                <Tab>Overview</Tab>
                <Tab>Course&nbsp;Content</Tab>
                <Tab>Notes</Tab>
              </TabList>

              <TabPanels paddingLeft={"8"} paddingRight={"8"}>
                <TabPanel>
                  <p>{videoData.title}</p>
                </TabPanel>
                <TabPanel>
                  <OverviewDrawer
                    videoId={videoId}
                    courseTitle={courseTitle}
                    subjectTitle={subject}
                  />
                </TabPanel>
                <TabPanel>
                  <p>Coming Soon !!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
}

export default withAuth(VideoPage);
