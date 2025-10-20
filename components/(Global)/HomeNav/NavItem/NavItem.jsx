"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ModeToggle } from "../../Theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
const NavItem = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p className="text-gray-500">Loading user info...</p>;
  }

  return (
    <div className="flex items-center gap-12">
      {/* menu-items */}
      <div>
        <ul className="flex items-center gap-6 text-[17px] font-medium ">
          <li>
            <Link
              href={"/"}
              className={
                pathname === "/"
                  ? "text-blue-500 font-bold"
                  : "text-gray-700 dark:text-white"
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={"/shop"}
              className={
                pathname === "/shop"
                  ? "text-blue-500 font-bold"
                  : "text-gray-700 dark:text-white"
              }
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              href={"/news"}
              className={
                pathname === "/news"
                  ? "text-blue-500 font-bold"
                  : "text-gray-700 dark:text-white"
              }
            >
              News
            </Link>
          </li>
          <li>
            <Link
              href={"/contact"}
              className={
                pathname === "/contact"
                  ? "text-blue-500 font-bold"
                  : "text-gray-700 dark:text-white"
              }
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
      {/* theme toggle and login button */}
      <div className="flex items-center gap-6">
        <ModeToggle></ModeToggle>

        {session?.user && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={
                  session.user.image ||
                  "https://i.ibb.co/zVB99J4d/DEFAULT.jpg"
                }
                alt="user profile image here added"
                width={50}
                height={50}
                className="rounded-full cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <div className="flex justify-center mb-3">
                  <h2 className="text-xl font-bold text-black">
                   Email: {session?.user.email}
                  </h2>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {!session && (
          <Link href="/login">
            {" "}
            <Button className="cursor-pointer">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavItem;
