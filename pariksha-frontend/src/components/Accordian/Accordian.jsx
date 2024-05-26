import React from "react";
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
} from "@chakra-ui/react";

export default function Accordian() {
	return (
		<Accordion allowMultiple={true} allowToggle>
			<AccordionItem paddingY={"10px"}>
				<h2>
					<AccordionButton>
						<Box as="span" flex="1" textAlign="left">
							Section 1 title
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</AccordionPanel>
			</AccordionItem>
			<AccordionItem paddingY={"10px"}>
				<h2>
					<AccordionButton>
						<Box as="span" flex="1" textAlign="left">
							Section 1 title
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</AccordionPanel>
			</AccordionItem>
			<AccordionItem paddingY={"10px"}>
				<h2>
					<AccordionButton>
						<Box as="span" flex="1" textAlign="left">
							Section 1 title
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</AccordionPanel>
			</AccordionItem>
			<AccordionItem paddingY={"10px"}>
				<h2>
					<AccordionButton>
						<Box as="span" flex="1" textAlign="left">
							Section 1 title
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</AccordionPanel>
			</AccordionItem>
			<AccordionItem paddingY={"10px"}>
				<h2>
					<AccordionButton>
						<Box as="span" flex="1" textAlign="left">
							Section 1 title
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
}
