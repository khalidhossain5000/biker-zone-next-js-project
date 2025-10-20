"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../Theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
const ResponsiveMenu = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="text-black mr-2" size={40} />
        </SheetTrigger>
        <SheetContent className="">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <div className="h-[90vh] flex flex-col justify-between">
              <div className="flex flex-col justify-between h-full">
                {/* menu-items */}

                <ul className="space-y-2 my-6 text-[19px] font-medium ">
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
                  {/* later this will be shown if user role is user and another dashboard will also be shown here if the user role is admin then for later it will fixed here */}
                  {session && (
                    <li>
                      <Link
                        href={"/contact"}
                        className={
                          pathname === "/contact"
                            ? "text-blue-500 font-bold"
                            : "text-gray-700 dark:text-white"
                        }
                      >
                        User Dashboard
                      </Link>
                    </li>
                  )}
                </ul>

                {/* theme toggle and login button */}
                {/* <div className="flex items-center gap-6 ">
                  <ModeToggle></ModeToggle>

                  <Button className="cursor-pointer">Login</Button>
                </div> */}

                <div className="flex items-center gap-6">
                  <ModeToggle></ModeToggle>

                  {session?.user && (
                    <div className="">
                      <div className="hidden md:flex items-center gap-6">
                        <Button
                          className="text-lg px-12 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition my-2 font-semibold cursor-pointer text-center"
                          onClick={() => signOut({ callbackUrl: "/" })}
                        >
                          Logout
                        </Button>
                        <div>
                          <h2>{session.user?.email}</h2>
                        </div>
                      </div>
                      <div className="md:hidden">
                        <Button
                          className="text-lg px-12 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition my-2 font-semibold cursor-pointer text-center"
                          onClick={() => signOut({ callbackUrl: "/" })}
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  )}

                  {!session && (
                    <Link href="/login">
                      {" "}
                      <Button className="cursor-pointer">Login</Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ResponsiveMenu;
