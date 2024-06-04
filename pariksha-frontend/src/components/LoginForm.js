"use client";
// components/LoginForm.js
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/hooks/auth";

// Define the Zod schema for validation
const loginSchema = z.object({
	identifier: z.union([
		z.string().email("Invalid email address or phone number"),
		z
			.string()
			.regex(/^\d{10}$/, "Invalid email address or phone number"),
	]),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters long"),
});

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
	});

	const userLogin = useMutation({
		mutationFn: (formData) => loginUser(formData),
	});

	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log("Login data:", data);
		userLogin.mutate(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label htmlFor="email">Email</label>
				<input
					id="identifier"
					{...register("identifier")}
					className="border-2 border-gray-300 rounded-md p-2"
				/>
				{errors.identifier && (
					<span>{errors.identifier.message}</span>
				)}
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					{...register("password")}
					className="border-2 border-gray-300 rounded-md p-2"
				/>
				{errors.password && <span>{errors.password.message}</span>}
			</div>
			<button
				type="submit"
				className="
            bg-primary text-white py-8 px-44"
			>
				Login
			</button>
		</form>
	);
};

export default LoginForm;
