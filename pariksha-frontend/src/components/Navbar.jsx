"use client";

import React, { useEffect, useRef } from "react";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";
import PrimaryButton from "./PrimaryButton";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/hooks/auth";
import {
  MdOutlineLogout,
  MdOutlineNotifications,
  MdOutlineMenu,
} from "react-icons/md";
import Image from "next/image";

import { FaRegUser, FaHistory } from "react-icons/fa";
import PwaInstallButton from "./PwaInstallButton";
import { CiMenuBurger } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdHistory } from "react-icons/md";

import PwaInstallSidebar from "./PwaInstallSidebar";

// import Notification from "./Notification";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const {
    isOpen: navDrawer,
    onOpen: onNavDrawerOpen,
    onClose: onNavDrawerClose,
  } = useDisclosure();

  const userLogout = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      logout();
      router.replace("/");
    },
  });

  return (
    <>
      <Drawer
        isOpen={navDrawer}
        onClose={onNavDrawerClose}
        placement="right"
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader className="flex items-center gap-8 border-b-4 border-b-gray-300">
            <button onClick={onNavDrawerClose}>
              <FaArrowLeftLong />
            </button>
            Account & Settings
          </DrawerHeader>

          <DrawerBody padding={0}>
            {user && (
              <Link href="/profile" onClick={onNavDrawerClose}>
                <div className="flex gap-6 border-b-4 border-b-gray-300 px-6 py-4">
                  <Image
                    src="/images/userAvatar.png"
                    alt="user"
                    width={100}
                    height={100}
                  />
                  <div>
                    <h1 className="mb-2 mt-2 text-lg font-semibold">
                      {user.fullName}
                    </h1>
                    <p className="text-sm">{user.email}</p>
                    <p className="text-sm">{user.contactNumber}</p>
                  </div>
                </div>
              </Link>
            )}
            <div className="mt-4 flex flex-col border-b-4 border-b-gray-300">
              <p className="mb-2 px-6 text-xs text-gray-600">ACCOUNT</p>
              <Link
                href={"/profile"}
                className="flex items-center gap-2 border-b border-b-gray-300 px-6 py-2 hover:bg-gray-50 active:bg-gray-50"
                onClick={onNavDrawerClose}
              >
                <FaRegUser size={16} /> Profile
              </Link>
              <Link
                href={"/csit-entrance/watch-history"}
                className="flex items-center gap-2 border-b border-b-gray-300 px-6 py-2 hover:bg-gray-50 active:bg-gray-50"
                onClick={onNavDrawerClose}
              >
                <MdHistory size={16} /> Watch History
              </Link>
              <Link
                href={"/csit-entrance/test-history"}
                className="flex items-center gap-2 border-b border-b-gray-300 px-6 py-2 hover:bg-gray-50 active:bg-gray-50"
                onClick={onNavDrawerClose}
              >
                <MdHistory size={16} /> Test History
              </Link>
            </div>
            <div className="mt-4 flex flex-col border-b-4 border-b-gray-300">
              <p className="mb-2 px-6 text-xs text-gray-600">APP</p>
              <PwaInstallSidebar />
            </div>
            <div className="mt-8 px-6">
              {!user && (
                <Link href="/login" onClick={onNavDrawerClose}>
                  <button className="w-full rounded-full border-2 border-solid border-black px-8 py-4">
                    LOGIN
                  </button>
                </Link>
              )}
              {user && (
                <button
                  onClick={() => {
                    userLogout.mutate();
                    onNavDrawerClose();
                  }}
                  className="w-full rounded-full border-2 border-solid border-black px-8 py-4"
                >
                  LOGOUT
                </button>
              )}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <div className="navContainer fixed z-[100] flex h-20 w-full items-center justify-between border-b-2 border-b-gray-200 bg-white px-5 py-4">
        <div className="logoContainer">
          <Link href="/">
            <Image
              src="/ParikshaLogo.webp"
              alt="PARIKSHA"
              width={160}
              height={48}
              className="w-40 text-white"
            />
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <PwaInstallButton />
          <button onClick={onNavDrawerOpen} className="cursor-pointer">
            <CiMenuBurger className="text-black" size={24} />
          </button>
        </div>
      </div>
    </>
  );
}
