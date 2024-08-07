"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/hooks/auth";
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/utils/Spinner";
import { useAuth } from "@/utils/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

const loginSchema = z.object({
  identifier: z.union([
    z.string().email("Invalid email address or phone number"),
    z.string().regex(/^\d{10}$/, "Invalid email address or phone number"),
  ]),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const LoginForm = () => {
  const { login, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (user) router.replace(`${redirect}`);
  }, [user]);

  const {
    register,
    handleSubmit,
    setError: setLoginDetailsError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const userLogin = useMutation({
    mutationFn: (formData) => loginUser(formData),
    onSuccess: login,
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

  const onSubmit = (data, event) => {
    event.preventDefault();
    userLogin.mutate(data);
  };

  return (
    <div>
      <div className="m-auto flex h-full w-full max-w-96 flex-col items-center justify-between border-2 border-gray-200 bg-white py-8">
        {userLogin.isPending && <Spinner />}
        <Image
          src={"/ParikshaLogo.webp"}
          width={200}
          height={100}
          alt="Pariksha"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-20 flex w-full flex-col px-8"
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
              className="border-b-2 border-solid border-gray-200 pb-1 outline-none"
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
              className="border-b-2 border-solid border-gray-200 pb-1 outline-none"
            />
            <div className="h-6">
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className="mb-6 flex justify-end text-xs font-normal text-primary">
            <Link href="/login/forgotPassword" className="text-primary">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="m-auto w-max rounded-xl bg-primary px-14 py-2.5 text-white"
          >
            Login
          </button>
        </form>
        <div className="mt-10 flex justify-center">
          <p className="text-sm text-gray-500">
            Don't have an account?
            <Link
              href={`/login/register?redirect=${redirect}`}
              className="text-primary"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
