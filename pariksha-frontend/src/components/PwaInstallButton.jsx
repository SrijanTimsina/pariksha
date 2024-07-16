"use client";

import React, { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { MdOutlineIosShare } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import { usePathname } from "next/navigation";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";

const PwaInstallButton = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isInstalled, setIsInstalled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const checkInstalled = async () => {
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    const isIOSStandalone = window.navigator.standalone === true;

    if (isStandalone || isIOSStandalone) {
      setIsInstalled(true);
    }
  };
  useEffect(() => {
    checkInstalled();
  }, []);

  const onClick = () => {
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  const installButtonClick = () => {
    if (supportsPWA) {
      onClick();
    } else {
      onOpen();
    }
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Instructions To Install App</ModalHeader>
          <Divider colorScheme="green" />
          <ModalCloseButton />
          <ModalBody>
            <div className="mb-6 mt-2 flex flex-col">
              <h4 className="mb-6 text-center text-lg font-semibold">
                Check if you have already installed Pariksha app.
              </h4>
              <h3 className="mb-1 text-lg font-semibold">For Desktop</h3>
              <p>Please use Google Chrome to install Pariksha.</p>
              <h3 className="mb-2 mt-8 text-lg font-semibold">
                For IOS Devices.
              </h3>
              <ol style={{ listStyleType: "decimal" }} className="ml-8">
                <li className="mb-3">
                  <p className="flex items-center">
                    While viewing the website, tap{" "}
                    <MdOutlineIosShare className="mx-2" size={"18"} /> in the
                    menu bar.
                  </p>
                </li>
                <li>
                  <p className="mb-2">
                    Scroll down the list of options, then tap Add to Home
                    Screen.
                  </p>
                  <p>
                    If you don’t see Add to Home Screen, you can add it. Scroll
                    down to the bottom of the list, tap Edit&nbsp;Actions, then
                    tap Add to Home Screen.
                  </p>
                </li>
              </ol>
              <p className="mt-4">
                The icon appears only on the device where you add it.
              </p>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      {!isInstalled && (
        <PrimaryButton
          className={"mr-6 hidden w-max rounded-lg sm:block"}
          text={"Install App"}
          onClick={installButtonClick}
        />
      )}
      {!isInstalled && pathname === "/" && (
        <button
          className="fixed bottom-10 right-5 rounded-full bg-secondary p-5 text-white shadow-2xl hover:bg-primary active:bg-primaryDark sm:hidden"
          onClick={installButtonClick}
        >
          <FaDownload size={32} />
        </button>
      )}
    </>
  );
};

export default PwaInstallButton;
