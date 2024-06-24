"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser, checkUserDetails, loginUser } from "@/hooks/auth";
import Image from "next/image";
import Link from "next/link";
import Input from "./Input";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [loginDetailsFilled, setLoginDetailsFilled] = useState(false);
  const [loginDetails, setLoginDetails] = useState({});
  const [studyLocation, setStudyLocation] = useState(null);
  const [abroadPlans, setAbroadPlans] = useState();
  const [priority, setPriority] = useState(null);

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
      setLoginDetailsFilled(true);
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

  const userLogin = useMutation({
    mutationFn: (formData) => loginUser(formData),
    onSuccess: () => {
      router.replace("/");
    },
  });

  const userSignup = useMutation({
    mutationFn: (formData) => registerUser(formData),
    onSuccess: (data, variables) =>
      userLogin.mutate({
        identifier: variables.contactNumber,
        password: variables.password,
      }),
  });

  const loginDetailsSubmit = (data, event) => {
    event.preventDefault();
    userCheck.mutate(data);
  };
  const personalDetailsSubmit = (data, event) => {
    event.preventDefault();
    userSignup.mutate({ ...loginDetails, ...data });
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
        <p className="mb-10 mt-14">Welcome to Pariksha</p>
        {!loginDetailsFilled && (
          <form
            onSubmit={loginDetailsHandleSubmit(loginDetailsSubmit)}
            className="flex w-full flex-col px-8"
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
              className="m-auto w-max rounded-3xl bg-primary px-14 py-2 text-white"
            >
              Next
            </button>
          </form>
        )}
        {loginDetailsFilled && (
          <form
            onSubmit={personalDetailsHandleSubmit(personalDetailsSubmit)}
            className="flex w-full flex-col px-8"
          >
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
                    className={`whitespace-nowrap border border-black px-2 py-2 text-sm ${studyLocation === option.value ? "bg-gray-200" : ""}`}
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
                  className={`whitespace-nowrap border border-black px-2 py-2 text-sm ${abroadPlans === true ? "bg-gray-200" : ""}`}
                  onClick={() => setAbroadPlans(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`whitespace-nowrap border border-black px-2 py-2 text-sm ${abroadPlans === false ? "bg-gray-200" : ""}`}
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
                    className={`whitespace-nowrap border border-black px-2 py-2 text-sm ${priority === option.value ? "bg-gray-200" : ""}`}
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
                type="button"
                className="m-auto w-max rounded-md border border-black px-12 py-2 text-black hover:bg-gray-200"
                onClick={() => setLoginDetailsFilled(false)}
              >
                Back
              </button>
              <button
                type="submit"
                className="m-auto w-max rounded-md border border-black bg-gray-200 px-12 py-2 text-black"
              >
                Signup
              </button>
            </div>
          </form>
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
