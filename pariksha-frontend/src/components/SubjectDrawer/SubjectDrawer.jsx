import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { MdOndemandVideo } from "react-icons/md";
import Link from "next/link";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

export default function SubjectDrawer({
  subjectData,
  courseTitle,
  videoId,
  subjectTitle,
}) {
  const findIndexByVideoId = (array, videoId) => {
    for (let i = 0; i < array.length; i++) {
      const videos = array[i].videos;
      if (videos.some((video) => video._id === videoId)) {
        return i;
      }
    }
    return 0;
  };

  return (
    <Accordion
      allowMultiple={true}
      defaultIndex={[findIndexByVideoId(subjectData.sections, videoId)]}
    >
      {subjectData.sections.map((section, index) => (
        <AccordionItem key={index}>
          <h2 className="border-b-2 border-white">
            <AccordionButton
              bg={"gray.200"}
              px={4}
              py={4}
              border={2}
              _hover={{ bg: "gray.300" }}
            >
              <Box as="span" flex="1" textAlign="left">
                <p className="font-semibold">{section.title}</p>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel px={0} py={0} pb={0.5}>
            {section.videos.map((video, index) => (
              <div
                className={`flex w-full cursor-pointer items-start gap-4 hover:bg-[#D1D7DC] ${videoId === video._id ? "bg-[#D1D7DC]" : ""}`}
                key={index}
              >
                <div className="pl-4 pt-2">
                  <input
                    type="checkbox"
                    id={video._id}
                    className="mt-1 h-4 w-4 cursor-pointer"
                  />
                </div>
                <Link
                  href={`/${courseTitle}/videos/${subjectTitle}/${video._id}`}
                  className="w-full py-2 pr-4"
                >
                  <div className="w-full">
                    <p className="mb-2 w-full text-sm">{video.title}</p>
                    <p className="flex w-full items-center gap-2 text-xs text-gray-600">
                      <MdOndemandVideo size={18} />
                      {video.duration}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
