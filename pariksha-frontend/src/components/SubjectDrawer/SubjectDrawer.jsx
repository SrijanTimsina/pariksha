import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { FaVideo } from "react-icons/fa";
import Link from "next/link";

export default function SubjectDrawer({
  subjectData,
  courseTitle,
  videoId,
  subjectTitle,
}) {
  return (
    <Accordion allowMultiple={true}>
      {subjectData.sections.map((section, index) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {section.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel px={0} py={0} pb={2}>
            {section.videos.map((video, index) => (
              <Link
                href={`/${courseTitle}/videos/${subjectTitle}/${video._id}`}
                key={index}
              >
                <div className="flex cursor-pointer items-center justify-between gap-4 p-2 px-4 hover:bg-[#eeeeee]">
                  <div className="flex gap-10">
                    <FaVideo />
                    {video.title}
                  </div>
                  <p>{video.duration}</p>
                </div>
              </Link>
            ))}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
