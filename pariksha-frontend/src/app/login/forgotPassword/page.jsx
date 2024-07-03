"use client";

import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import * as z from "zod";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { getUserDetails, sendOtp } from "@/hooks/auth";

const identifierSchema = z.object({
  identifier: z.union([
    z.string().email("Invalid email address or phone number"),
    z.string().regex(/^\d{10}$/, "Invalid email address or phone number"),
  ]),
});

export default function page() {
  const [formStage, setFormStage] = useState("identifierInput");
  const [userError, setUserError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [emailOtp, setEmailOtp] = useState(true);
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const submitOtp = (value) => {
    // userSignup.mutate({ ...loginDetails,  otp: value });
    console.log(value);
    setOtpError(true);
  };

  const sendUserOtp = useMutation({
    mutationFn: (number) => sendOtp(number),
    onSuccess: (error) => {
      setFormStage("otp");
    },
    onError: (error) => {
      setUserError("Error while sending OTP please try again later.");
    },
  });

  const checkUser = useMutation({
    mutationFn: (identifier) => getUserDetails(identifier),
    onSuccess: (data) => {
      setEmail(data.data.email);
      setContact(data.data.contactNumber);
      sendUserOtp.mutate(data.data.email);
    },
    onError: (error) => {
      setUserError("No user with this email or contact number found.");
    },
  });

  const {
    register,
    handleSubmit: confirmIdentifier,
    setError: setLoginDetailsError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(identifierSchema),
  });

  const setIdentifier = (data, event) => {
    event.preventDefault();
    checkUser.mutate(data.identifier);
  };

  return (
    <div className="content-container">
      <div className="m-auto flex h-full w-full max-w-96 flex-col items-center justify-between border-2 border-gray-200 bg-white py-8">
        {/* {userLogin.isPending && <Spinner />} */}
        <Image
          src={"/ParikshaLogo.webp"}
          width={200}
          height={100}
          alt="Pariksha"
        />
        {formStage === "identifierInput" && (
          <form
            onSubmit={confirmIdentifier(setIdentifier)}
            className="mt-20 flex w-full flex-col px-8"
          >
            <label
              htmlFor="identifier"
              className="mb-1 pl-2 text-xs text-gray-500"
            >
              Email or Phone
            </label>
            <input
              id="identifier"
              {...register("identifier")}
              className="border-b-2 border-solid border-gray-200 pb-1 outline-none"
            />
            {userError && (
              <span className="mt-3 text-sm text-red-500">{userError}</span>
            )}
            <button
              type="submit"
              className="mt-6 w-max rounded-xl bg-primary px-8 py-2 text-white"
            >
              Continue
            </button>
          </form>
        )}
        {formStage === "otp" && (
          <div className="mt-20 flex w-full flex-col items-center justify-center px-8">
            <p className="mb-6 text-sm text-gray-700">
              Please enter the OTP sent to your registered{" "}
              {emailOtp ? "email" : "phone number"}.
            </p>
            <HStack>
              <PinInput
                onChange={() => setOtpError(false)}
                onComplete={(value) => submitOtp(value)}
                autoFocus
                otp
              >
                <PinInputField
                  borderColor={otpError ? "red" : "blackAlpha.400"}
                />
                <PinInputField
                  borderColor={otpError ? "red" : "blackAlpha.400"}
                />
                <PinInputField
                  borderColor={otpError ? "red" : "blackAlpha.400"}
                />
                <PinInputField
                  borderColor={otpError ? "red" : "blackAlpha.400"}
                />
                <PinInputField
                  borderColor={otpError ? "red" : "blackAlpha.400"}
                />
                <PinInputField
                  borderColor={otpError ? "red" : "blackAlpha.400"}
                />
              </PinInput>
            </HStack>
            {otpError && (
              <span className="mt-3 text-sm text-red-500">Invalid OTP.</span>
            )}
            <p className="mt-8 text-sm font-normal text-gray-500">
              Didn't receive the OTP? Resend
            </p>
            <div className="mt-2 flex gap-4">
              <button
                className="font-semibold text-primary underline"
                onClick={() => setEmailOtp(false)}
              >
                SMS
              </button>
              <button
                className="font-semibold text-primary underline"
                onClick={() => setEmailOtp(true)}
              >
                Email
              </button>
            </div>
          </div>
        )}
        <div className="mt-14 flex justify-center">
          <p className="text-sm text-gray-500">
            Login to your account? &nbsp;
            <Link href="/login" className="font-medium text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
