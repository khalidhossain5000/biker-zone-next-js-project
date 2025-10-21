'use client'
import React from "react";
import logo from "../../../../assets/logo/logo-go.png";
import darklogo from "../../../../assets/logo/dark-logo.png";
import { useSession } from "next-auth/react";
import Image from "next/image";
const LogoAndInfo = () => {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between items-center px-6 py-6 bg-white shadow-xl">
      <div className="logoh">
        <Image
          src={logo}
          alt="Logo of the site"
          className="dark:hidden"
          width={250}
          height={250}
        />
        <Image
          src={darklogo}
          alt="Logo of the site"
          className="hidden dark:block"
          width={250}
          height={250}
        />
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
            <h2 className="text-xl font-bold text-black">
              Email: {session?.user.email}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoAndInfo;
