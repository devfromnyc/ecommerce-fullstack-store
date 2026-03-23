"use client";

import { useState } from "react";
import Link from "next/link";
import SocialProviders from "./SocialProviders";

interface AuthFormProps {
  mode: "sign-in" | "sign-up";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isSignUp = mode === "sign-up";

  return (
    <div className="flex w-full flex-col items-center">
      {/* Toggle link */}
      <p className="mb-6 text-caption text-dark-700">
        {isSignUp ? (
          <>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-dark-900 underline underline-offset-2 hover:text-dark-700"
            >
              Sign In
            </Link>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-dark-900 underline underline-offset-2 hover:text-dark-700"
            >
              Sign Up
            </Link>
          </>
        )}
      </p>

      {/* Heading */}
      <h1 className="mb-2 text-center text-heading-3 font-bold text-dark-900">
        {isSignUp ? "Join Nike Today!" : "Welcome Back!"}
      </h1>
      <p className="mb-8 text-center text-body text-dark-700">
        {isSignUp
          ? "Create your account to start your journey"
          : "Please enter your details to sign in to your account"}
      </p>

      {/* Social providers */}
      <div className="mb-6 w-full">
        <SocialProviders />
      </div>

      {/* Divider */}
      <div className="mb-6 flex w-full items-center gap-4">
        <span className="h-px flex-1 bg-light-300" />
        <span className="text-caption text-dark-500">
          Or {isSignUp ? "sign up" : "sign in"} with
        </span>
        <span className="h-px flex-1 bg-light-300" />
      </div>

      {/* Form */}
      <form className="flex w-full flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        {/* Full Name — sign-up only */}
        {isSignUp && (
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="fullName"
              className="text-body-medium font-medium text-dark-900"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              className="w-full rounded-full border border-light-300 bg-light-200 px-5 py-3 text-body text-dark-900 placeholder:text-dark-500 transition-colors focus:border-dark-900 focus:outline-none"
            />
          </div>
        )}

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-body-medium font-medium text-dark-900"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="johndoe@gmail.com"
            autoComplete="email"
            className="w-full rounded-full border border-light-300 bg-light-200 px-5 py-3 text-body text-dark-900 placeholder:text-dark-500 transition-colors focus:border-dark-900 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-body-medium font-medium text-dark-900"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="minimum 8 characters"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              className="w-full rounded-full border border-light-300 bg-light-200 px-5 py-3 pr-12 text-body text-dark-900 placeholder:text-dark-500 transition-colors focus:border-dark-900 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-900 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                /* Eye-off icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                </svg>
              ) : (
                /* Eye icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-dark-900 px-6 py-3.5 text-body-medium font-medium text-light-100 transition-colors hover:bg-dark-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-900"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      {/* Bottom text */}
      <div className="mt-6 text-center">
        {isSignUp ? (
          <p className="text-caption text-dark-500">
            By signing up, you agree to our{" "}
            <Link
              href="#"
              className="text-dark-900 underline underline-offset-2 hover:text-dark-700"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="text-dark-900 underline underline-offset-2 hover:text-dark-700"
            >
              Privacy Policy
            </Link>
          </p>
        ) : (
          <Link
            href="#"
            className="text-caption font-medium text-dark-900 underline underline-offset-2 hover:text-dark-700"
          >
            Forgot password?
          </Link>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
