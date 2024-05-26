import React from "react";
import {
	Image,
	Avatar,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from "@chakra-ui/react";

export default function Navbar() {
	return (
		<div className="bg-primary navContainer px-10 py-4 flex justify-between items-center z-[9999] fixed w-full">
			<div className="logoContainer">
				<Image src="" alt="PARIKSHA" className="w-40 text-white" />
			</div>
			<div>
				<Menu>
					<MenuButton>
						<Avatar
							name="Srijan Timsina"
							src=""
							size="sm"
							colorScheme="gray"
						/>{" "}
					</MenuButton>
					<MenuList>
						<MenuItem>Download</MenuItem>
						<MenuItem>Create a Copy</MenuItem>
						<MenuItem>Mark as Draft</MenuItem>
						<MenuItem>Delete</MenuItem>
						<MenuItem>Attend a Workshop</MenuItem>
					</MenuList>
				</Menu>
			</div>
		</div>
	);
}
