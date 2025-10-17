"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ModeToggle } from "../../Theme/ThemeToggle";
import { Button } from "@/components/ui/button";

const NavItem = () => {
  const pathname = usePathname();
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
        
         <Link href='/login'> <Button  className="cursor-pointer">Login</Button></Link>
        
      </div>
    </div>
  );
};

export default NavItem;
