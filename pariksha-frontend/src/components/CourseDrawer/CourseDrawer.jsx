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

export default function CourseDrawer({ subjects, courseTitle }) {
  return (
    <Accordion allowMultiple={true}>
      {subjects.map((subject, index) => (
        <AccordionItem paddingY={0} key={index}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {subject.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel p={0}>
            {subject.sections.map((section, index) => (
              <Accordion allowMultiple={true} key={index}>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left" className="pl-4">
                        {section.title}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel py={0} pb={8}>
                    {section.videos.map((video, index) => (
                      <Link
                        href={`/courses/${courseTitle}/${subject.title}/${video._id}`}
                        key={index}
                      >
                        <div className="mx-6 flex cursor-pointer items-center justify-between gap-4 p-2 hover:bg-[#eeeeee]">
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
              </Accordion>
            ))}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
