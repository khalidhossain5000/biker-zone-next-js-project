"use client";
import React from "react";
import Image from "next/image";
import authImg from "../../../assets/auth/authh-img.png";
import logo from "../../../assets/logo/logo-go.png";
import darklogo from "../../../assets/logo/dark-logo.png";
import { useTheme } from "next-themes";
import Link from "next/link";

const Register = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="w-1/2 hidden md:block min-h-full ">
        <Image
          src={authImg}
          alt="Register illustration"
          className=" h-full"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white dark:bg-[#121212] transition-colors duration-300">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src={theme === "dark" ? darklogo : logo}
            alt="Site logo"
            width={180}
            height={60}
          />
        </div>

        {/* Register Form */}
        <form className="w-full max-w-3xl space-y-5">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">
            Create Account
          </h2>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md outline-none focus:ring-2 focus:ring-primary dark:bg-[#1f1f1f] dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md outline-none focus:ring-2 focus:ring-primary dark:bg-[#1f1f1f] dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md outline-none focus:ring-2 focus:ring-primary dark:bg-[#1f1f1f] dark:text-gray-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary/90 transition cursor-pointer"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
