"use client";
import React from "react";
import Image from "next/image";
import authImg from "../../../assets/auth/authh-img.png";
import logo from "../../../assets/logo/logo-go.png";
import darklogo from "../../../assets/logo/dark-logo.png";
import { useTheme } from "next-themes";
import Link from "next/link";
import SocialLogin from "@/components/(Global)/SocialLogin/SocialLogin";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const Register = () => {
  const { theme } = useTheme();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        role: "user",
      });

      if (res.status === 200) {
        toast.success("User registered successfully");

        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/",
        });
      }
    } catch (err) {
      console.error(err);
      // Show error toast
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="w-1/2 hidden md:block min-h-full ">
        <Image src={authImg} alt="Register illustration" className=" h-full" />
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
        <form onSubmit={handleRegister} className="w-full max-w-3xl space-y-5">
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
              name="name"
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
              name="email"
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
              name="password"
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

          <SocialLogin />

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline cursor-pointer"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
