"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/hooks/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Spinner from "@/utils/Spinner";

const loginSchema = z.object({
  identifier: z.union([
    z.string().email("Invalid email address or phone number"),
    z.string().regex(/^\d{10}$/, "Invalid email address or phone number"),
  ]),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const userLogin = useMutation({
    mutationFn: (formData) => loginUser(formData),
    onSuccess: () => router.replace("/"),
  });

  const onSubmit = (data, event) => {
    event.preventDefault();
    userLogin.mutate(data);
  };

  return (
    <div>
      <div className="m-auto flex h-full w-full max-w-96 flex-col items-center justify-between border-2 border-gray-200 bg-white py-8">
        {userLogin.isPending && <Spinner />}
        <Image src={"/01.png"} width={200} height={100} alt="Pariksha" />
        <p className="mb-10 mt-14">Welcome to Pariksha</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col px-8"
        >
          <div className="mb-4 flex w-full flex-col">
            <label
              htmlFor="identifier"
              className="mb-1 pl-2 text-xs text-gray-500"
            >
              Email or Phone
            </label>
            <input
              id="identifier"
              {...register("identifier")}
              className="border-b-2 pb-1 outline-none"
            />
            <div className="h-6">
              {errors.identifier && (
                <span className="text-xs text-red-500">
                  {errors.identifier.message}
                </span>
              )}
            </div>
          </div>
          <div className="mb-2 flex w-full flex-col">
            <label
              htmlFor="password"
              className="mb-1 pl-1 text-xs text-gray-500"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="border-b-2 pb-1 outline-none"
            />
            <div className="h-6">
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className="mb-6 flex justify-end text-xs text-primary">
            Forgot Password?
          </div>
          <button
            type="submit"
            className="m-auto w-max rounded-3xl bg-primary px-14 py-2 text-white"
          >
            Login
          </button>
        </form>
        <div className="mt-10 flex justify-center">
          <p className="text-sm text-gray-500">
            Don't have an account?
            <Link href="/login/register" className="text-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
