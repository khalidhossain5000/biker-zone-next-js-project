
"use client";
import React from "react";
import Image from "next/image";
import authImg from "../../../assets/auth/authh-img.png";
import logo from "../../../assets/logo/logo-go.png";
import Link from "next/link";

const LoginPage = () => {
  

  return (
   <div className="min-h-screen flex ">
  {/* Left Side - Image */}
  <div className="hidden md:block w-1/2 min-h-full  bg-red-600">
    <Image
      src={authImg}
      alt="Authentication sgd Illustration"
      className=" h-full"
      priority
    />
  </div>

  {/* Right Side - Form */}
  <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 py-12 md:py-0">
    {/* Logo */}
    <div className="mb-8">
      <Image
        src={logo}
        alt="Site Logo"
        width={180}
        height={60}
        className="mx-auto"
      />
    </div>

    {/* Login Form */}
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Welcome Back
      </h2>

      <form className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary/90 cursor-pointer transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-[#11a0c7] hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  </div>
</div>

  );
};

export default LoginPage;
