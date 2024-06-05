import React from "react";

export default function Input({ name, label, register, error, ...props }) {
  return (
    <div className="mb-4 flex w-full flex-col">
      <label htmlFor={name} className="mb-1 pl-2 text-xs text-gray-500">
        {label}
      </label>
      <input
        id={name}
        {...register(name)}
        className="border-b-2 border-gray-200 pb-1 outline-none"
        {...props}
      />
      <div className="h-6">
        {error && <span className="text-xs text-red-500">{error.message}</span>}
      </div>
    </div>
  );
}
