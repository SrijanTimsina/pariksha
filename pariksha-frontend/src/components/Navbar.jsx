"use client";

import React, { useEffect } from "react";
import {
  Image,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "@/utils/AuthContext";
import PrimaryButton from "./PrimaryButton";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const userLogout = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      logout();
      router.replace("/");
    },
  });

  return (
    <div className="navContainer fixed z-[9999] flex h-20 w-full items-center justify-between border-b-2 border-b-gray-200 bg-white px-10 py-4">
      <div className="logoContainer">
        <Link href="/">
          <Image src="/01.png" alt="PARIKSHA" className="w-40 text-white" />
        </Link>
      </div>
      {!user && (
        <Link href="/login">
          <PrimaryButton text={"Login"} className={"w-max rounded-lg px-8"} />
        </Link>
      )}
      {user && (
        <div>
          <Menu>
            <MenuButton>
              <Avatar src="" size="sm" colorScheme="gray" />
            </MenuButton>
            <MenuList py={0} boxShadow="dark-lg">
              <MenuItem py={3} px={4}>
                <FaRegUser className="mr-[13px]" size={16} />
                Profile
              </MenuItem>
              <MenuItem py={3} px={4} onClick={() => userLogout.mutate()}>
                <MdOutlineLogout className="mr-2" size={20} />
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      )}
    </div>
  );
}
