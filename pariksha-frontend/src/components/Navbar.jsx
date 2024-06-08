import React from "react";
import {
  Image,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navContainer fixed z-[9999] flex h-20 w-full items-center justify-between border-b-2 border-b-gray-200 bg-white px-10 py-4">
      <div className="logoContainer">
        <Link href="/">
          <Image src="/01.png" alt="PARIKSHA" className="w-40 text-white" />
        </Link>
      </div>
      <div>
        <Menu>
          <MenuButton>
            <Avatar name="Srijan Timsina" src="" size="sm" colorScheme="gray" />{" "}
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
