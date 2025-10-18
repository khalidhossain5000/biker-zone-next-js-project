import React from "react";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  return (
    <div>
      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></div>
        <span className="mx-3 text-gray-500 dark:text-gray-400 text-sm">
          or continue with
        </span>
        <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></div>
      </div>

      {/* Google Login Button */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-700 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#1f1f1f] transition cursor-pointer"
      >
        <FcGoogle className="w-6 h-6 " />
        <span className="font-medium text-gray-700 dark:text-gray-300">
          Continue with Google
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;
