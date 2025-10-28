"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
const LogoAndInfo = () => {
  const { data: session } = useSession();
  
  return (
    <div className="hidden lg:flex justify-between items-center px-6 py-6 bg-white dark:bg-gray-900 shadow-sm shadow-blue-200">
      <div className="logoh">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          Admin/User Dashboard
        </h2>
      </div>
      {/* user info  */}
      <div>
        {session?.user && (
          <div className="flex items-center gap-6">
            <Image
              src={
                session.user.image || "https://i.ibb.co/zVB99J4d/DEFAULT.jpg"
              }
              alt="user profile image here added"
              width={50}
              height={50}
              className="rounded-full cursor-pointer"
            />
            <div>
              <h2 className="text-xl font-bold text-black dark:text-white">
                Email: {session?.user.email}
              </h2>
              <h2>Name:{session?.user?.name}</h2>
              <p>Role:{session?.user.role}</p>
            </div>
          </div>
        )}
      </div>
      {/*  */}
    </div>
  );
};

export default LogoAndInfo;
