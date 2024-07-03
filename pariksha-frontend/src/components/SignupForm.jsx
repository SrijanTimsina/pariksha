"use client";

import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import {
  registerUser,
  checkUserDetails,
  loginUser,
  sendOtp,
} from "@/hooks/auth";
import Image from "next/image";
import Link from "next/link";
import Input from "./Input";
import { redirect } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { useAuth } from "@/utils/AuthContext";

const loginDetailsSchema = z.object({
  contactNumber: z.string().regex(/^\d{10}$/, "Invalid phone number."),
  email: z.string().email("Invalid email address."),
  fullName: z.string().min(2, "Full name must be at least 2 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
const personalDetailsSchema = z.object({
  studyLocation: z.enum(
    ["Kathmandu", "Chitwan", "Rupandehi", "Eastern_Region", "Others"],
    "Invalid study location"
  ),
  abroadPlans: z.boolean().refine((value) => typeof value === "boolean", {
    message: "Value must be a boolean",
  }),
  priority: z.enum(["CSIT", "BBA", "Others"], "Invalid study location"),
});

const SignupForm = () => {
  const [formStage, setFormStage] = useState("userDetails");
  const [loginDetails, setLoginDetails] = useState({});
  const [studyLocation, setStudyLocation] = useState(null);
  const [abroadPlans, setAbroadPlans] = useState(null);
  const [priority, setPriority] = useState(null);
  const [otpError, setOtpError] = useState(false);
  const { login } = useAuth();

  const {
    register: loginDetailsRegister,
    handleSubmit: loginDetailsHandleSubmit,
    setError: setLoginDetailsError,
    formState: { errors: loginDetailsError },
  } = useForm({
    resolver: zodResolver(loginDetailsSchema),
  });
  const {
    register: personalDetailsRegister,
    handleSubmit: personalDetailsHandleSubmit,
    setError: setPersonalDetailsError,
    setValue: setPersonalDetailsValue,
    formState: { errors: personalDetailsError },
  } = useForm({
    resolver: zodResolver(personalDetailsSchema),
  });

  useEffect(() => {
    if (studyLocation) {
      setPersonalDetailsValue("studyLocation", studyLocation);
    }
  }, [studyLocation]);
  useEffect(() => {
    setPersonalDetailsValue("abroadPlans", abroadPlans);
  }, [abroadPlans]);
  useEffect(() => {
    if (priority) {
      setPersonalDetailsValue("priority", priority);
    }
  }, [priority]);

  const userCheck = useMutation({
    mutationFn: (formData) => checkUserDetails(formData),
    onSuccess: (data, variables) => {
      setLoginDetails({ ...variables });
      setFormStage("personalDetails");
    },
    onError: (error) => {
      error.response.data.errors.map((e) => {
        for (let key in e) {
          setLoginDetailsError(key, {
            type: "manual",
            message: e[key],
          });
        }
      });
    },
  });

  const sendUserOtp = useMutation({
    mutationFn: (number) => sendOtp(number),
    onError: (error) => {
      console.log(error);
    },
  });

  const userLogin = useMutation({
    mutationFn: (formData) => loginUser(formData),
    onSuccess: login,
  });

  const userSignup = useMutation({
    mutationFn: (formData) => registerUser(formData),
    onSuccess: (data, variables) =>
      userLogin.mutate({
        identifier: variables.contactNumber,
        password: variables.password,
      }),
    onError: (error) => {
      setOtpError(true);
    },
  });

  const submitOtp = (value) => {
    userSignup.mutate({ ...loginDetails, otp: value });
  };

  const loginDetailsSubmit = (data, event) => {
    event.preventDefault();
    userCheck.mutate(data);
  };
  const personalDetailsSubmit = (data, event) => {
    event.preventDefault();
    setLoginDetails((prev) => ({ ...prev, ...data }));
    sendUserOtp.mutate(loginDetails.contactNumber);
    setFormStage("otp");
  };

  const studyLocationOptions = [
    { value: "Kathmandu", label: "Kathmandu" },
    { value: "Chitwan", label: "Chitwan" },
    { value: "Rupandehi", label: "Rupandehi" },
    { value: "Eastern_Region", label: "East" },
    { value: "Others", label: "Others" },
  ];

  const studyOptions = [
    { value: "CSIT", label: "CSIT" },
    { value: "BBA", label: "BBA" },
    { value: "Others", label: "Others" },
  ];

  return (
    <div>
      <div className="m-auto flex h-full w-full max-w-[450px] flex-col items-center justify-between border-2 border-gray-200 bg-white py-8">
        <Image
          src={"/ParikshaLogo.webp"}
          width={200}
          height={100}
          alt="Pariksha"
        />

        {formStage === "userDetails" && (
          <form
            onSubmit={loginDetailsHandleSubmit(loginDetailsSubmit)}
            className="mt-20 flex w-full flex-col px-8"
          >
            <Input
              name={"contactNumber"}
              label={"Contact Number"}
              register={loginDetailsRegister}
              error={loginDetailsError.contactNumber}
              type="number"
            />
            <Input
              name={"email"}
              label={"Email"}
              register={loginDetailsRegister}
              error={loginDetailsError.email}
            />
            <Input
              name={"fullName"}
              label={"Full Name"}
              register={loginDetailsRegister}
              error={loginDetailsError.fullName}
            />
            <Input
              name={"password"}
              label={"Password"}
              register={loginDetailsRegister}
              error={loginDetailsError.password}
              type="password"
            />

            <button
              type="submit"
              className="m-auto w-max rounded-xl bg-primary px-14 py-2.5 text-white"
            >
              Signup
            </button>
          </form>
        )}
        {formStage === "personalDetails" && (
          <form
            onSubmit={personalDetailsHandleSubmit(personalDetailsSubmit)}
            className="mt-20 flex w-full flex-col px-8"
          >
            <div>
              <button
                type="button"
                className="mb-8 flex items-center gap-1 text-black"
                onClick={() => setFormStage("userDetails")}
              >
                <FaAngleLeft size={16} color="gray" />{" "}
                <span className="underline">Back</span>
              </button>
            </div>
            <div className="mb-4 flex w-full flex-col">
              <label
                htmlFor="studyLocation"
                className="mb-1 pl-2 text-xs text-gray-500"
              >
                Where are you planning to study in Nepal?
              </label>
              <input
                type="hidden"
                id="studyLocation"
                {...personalDetailsRegister("studyLocation")}
                className="border-b-2 pb-1 outline-none"
              />
              <div className="mt-2 grid grid-cols-3 gap-4">
                {studyLocationOptions.map((option, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`whitespace-nowrap border border-gray-semiDark px-2 py-2 text-sm ${studyLocation === option.value ? "bg-primary text-white" : ""}`}
                    onClick={() => setStudyLocation(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="h-6">
                {personalDetailsError.studyLocation && (
                  <span className="text-xs text-red-500">
                    Please Select a Study Location
                  </span>
                )}
              </div>
            </div>
            <div className="mb-4 flex w-full flex-col">
              <label
                htmlFor="abroadPlans"
                className="mb-1 pl-2 text-xs text-gray-500"
              >
                Are you planning to study abroad?
              </label>
              <input
                type="hidden"
                id="abroadPlans"
                {...personalDetailsRegister("abroadPlans")}
                className="border-b-2 pb-1 outline-none"
              />
              <div className="mt-2 grid grid-cols-3 gap-4">
                <button
                  type="button"
                  className={`whitespace-nowrap border border-gray-semiDark px-2 py-2 text-sm ${abroadPlans === true ? "bg-primary text-white" : ""}`}
                  onClick={() => setAbroadPlans(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`whitespace-nowrap border border-gray-semiDark px-2 py-2 text-sm ${abroadPlans === false ? "bg-primary text-white" : ""}`}
                  onClick={() => setAbroadPlans(false)}
                >
                  No
                </button>
              </div>
              <div className="h-6">
                {personalDetailsError.abroadPlans && (
                  <span className="text-xs text-red-500">
                    Please Select an Option
                  </span>
                )}
              </div>
            </div>
            <div className="mb-4 flex w-full flex-col">
              <label
                htmlFor="priority"
                className="mb-1 pl-2 text-xs text-gray-500"
              >
                Which course are you planning to take?
              </label>
              <input
                type="hidden"
                id="priority"
                {...personalDetailsRegister("priority")}
                className="border-b-2 pb-1 outline-none"
              />
              <div className="mt-2 grid grid-cols-3 gap-4">
                {studyOptions.map((option, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`whitespace-nowrap border border-gray-semiDark px-2 py-2 text-sm ${priority === option.value ? "bg-primary text-white" : ""}`}
                    onClick={() => setPriority(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="h-6">
                {personalDetailsError.priority && (
                  <span className="text-xs text-red-500">
                    Please Select a Course you are interested in
                  </span>
                )}
              </div>
            </div>
            <div className="flex w-full gap-4">
              <button
                type="submit"
                className="m-auto w-max rounded-xl bg-primary px-14 py-2.5 text-white"
              >
                Signup
              </button>
            </div>
          </form>
        )}
        {formStage === "otp" && (
          <div className="mt-20 flex w-full flex-col items-center justify-center px-8">
            <p className="mb-14 text-sm text-gray-700">
              Please enter the OTP sent to your registered mobile number to
              complete the signup process.
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
            <p className="mb-10 mt-8 text-sm text-gray-500">
              Didn't receive the OTP? &nbsp;
              <button className="font-semibold text-primary underline">
                Resend
              </button>
            </p>
          </div>
        )}
        <div className="mt-10 flex justify-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
