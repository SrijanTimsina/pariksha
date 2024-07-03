"use client";

import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import * as z from "zod";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import {
  getUserDetails,
  resetPassword,
  sendOtp,
  verifyOtp,
} from "@/hooks/auth";
import { useRouter } from "next/navigation";
import Countdown from "react-countdown";

const identifierSchema = z.object({
  identifier: z.union([
    z.string().email("Invalid email address or phone number"),
    z.string().regex(/^\d{10}$/, "Invalid email address or phone number"),
  ]),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function page() {
  const [formStage, setFormStage] = useState("identifierInput");
  const [otpValue, setOtpValue] = useState(null);
  const [otpError, setOtpError] = useState(false);
  const [emailOtp, setEmailOtp] = useState(true);
  const [countdownRunning, setCountdownRunning] = useState(false);
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const toast = useToast();
  const router = useRouter();

  const checkUser = useMutation({
    mutationFn: (identifier) => getUserDetails(identifier),
    onSuccess: (data) => {
      setEmail(data.data.email);
      setContact(data.data.contactNumber);
      sendUserOtp.mutate(data.data.email);
    },
    onError: (error) => {
      setLoginDetailsError("identifier", {
        type: "manual",
        message: "No user with this email or contact number found.",
      });
    },
  });
  const sendUserOtp = useMutation({
    mutationFn: (number) => sendOtp(number),
    onSuccess: (error) => {
      setFormStage("otp");
    },
    onError: (error) => {
      setLoginDetailsError("identifier", {
        type: "manual",
        message: "Error while sending OTP please try again later.",
      });
    },
  });
  const otpVerify = useMutation({
    mutationFn: ({ identifier, otp }) => verifyOtp(identifier, otp),
    onSuccess: (data, variables) => {
      setOtpValue(variables.otp);
      setFormStage("passwordInput");
    },
    onError: (error) => setOtpError(true),
  });

  const passwordReset = useMutation({
    mutationFn: (formData) => resetPassword(formData),
    onSuccess: (data) => {
      toast({
        title: "Password Changed.",
        description: "Your password has been changed successfully.",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      router.replace(`/login`);
    },
    onError: () => {
      toast({
        title: "Error Occured.",
        description: "There was an error while changing your password.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
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

  const {
    register: passwordRegister,
    handleSubmit: passwordHandleSubmit,
    setError: setPasswordError,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const setIdentifier = (data, event) => {
    event.preventDefault();
    checkUser.mutate(data.identifier);
  };

  const sendEmailOtp = () => {
    setCountdownRunning(true);
    setEmailOtp(true);
    sendUserOtp.mutate(email);
  };
  const sendNumberOtp = () => {
    setCountdownRunning(true);
    setEmailOtp(false);
    sendUserOtp.mutate(contact);
  };

  const submitOtp = (value) => {
    otpVerify.mutate({ identifier: emailOtp ? email : contact, otp: value });
  };
  const changePassword = (data, event) => {
    event.preventDefault();
    passwordReset.mutate({
      identifier: emailOtp ? email : contact,
      otp: otpValue,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
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
            {errors.identifier && (
              <span className="mt-3 text-sm text-red-500">
                {errors.identifier.message}
              </span>
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
              Didn't receive the OTP? Resend{" "}
              {countdownRunning && (
                <>
                  in &nbsp;
                  <Countdown
                    date={Date.now() + 10000 * 6}
                    onComplete={() => setCountdownRunning(false)}
                    renderer={({ minutes, seconds }) => (
                      <span className="font-semibold text-gray-500 underline">
                        {minutes <= 9 ? `0${minutes}` : minutes}:
                        {seconds <= 9 ? `0${seconds}` : seconds}
                      </span>
                    )}
                  />
                </>
              )}
            </p>

            {!countdownRunning && (
              <div className="mt-2 flex gap-4">
                <button
                  className="font-semibold text-primary underline"
                  onClick={sendNumberOtp}
                >
                  SMS
                </button>
                <button
                  className="font-semibold text-primary underline"
                  onClick={sendEmailOtp}
                >
                  Email
                </button>
              </div>
            )}
          </div>
        )}
        {formStage === "passwordInput" && (
          <form
            onSubmit={passwordHandleSubmit(changePassword)}
            className="mt-20 flex w-full flex-col px-8"
          >
            <label className="mb-1 pl-2 text-xs text-gray-500">Email</label>
            <p className="border-b-2 border-solid border-gray-200 pb-1 outline-none">
              {email}
            </p>
            <label
              className="mb-1 mt-8 pl-2 text-xs text-gray-500"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...passwordRegister("password")}
              className="border-b-2 border-solid border-gray-200 pb-1 outline-none"
            />
            {passwordErrors.password && (
              <span className="mt-3 text-sm text-red-500">
                {passwordErrors.password.message}
              </span>
            )}
            <label
              className="mb-1 mt-8 pl-2 text-xs text-gray-500"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...passwordRegister("confirmPassword")}
              className="border-b-2 border-solid border-gray-200 pb-1 outline-none"
            />
            {passwordErrors.confirmPassword && (
              <span className="mt-3 text-sm text-red-500">
                {passwordErrors.confirmPassword.message}
              </span>
            )}

            <button
              type="submit"
              className="mt-6 w-max rounded-xl bg-primary px-8 py-2 text-white"
            >
              Reset Password
            </button>
          </form>
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
