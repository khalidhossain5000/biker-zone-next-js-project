"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ModeToggle } from "../../Theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
const NavItem = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p className="text-gray-500">Loading user info...</p>;
  }
console.log(session,'this is from navitem');
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
              href={"/all-bikes"}
              className={
                pathname === "/news"
                  ? "text-blue-500 font-bold"
                  : "text-gray-700 dark:text-white"
              }
            >
              All Bikes
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
                  session.user.image || "https://i.ibb.co/zVB99J4d/DEFAULT.jpg"
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
              <DropdownMenuItem className="w-fit text-center px-8 py-1 border-[#8fda20] border-4 font-bold text-base text-[#8fda20] rounded-full bg-black dark:hover:bg-white dark:hover:text-black cursor-pointer">
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-lg px-12 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition my-2 font-semibold cursor-pointer text-center"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
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
