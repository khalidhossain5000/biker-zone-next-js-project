'use client'
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../Theme/ThemeToggle";
import { Button } from "@/components/ui/button";
const ResponsiveMenu = () => {
    const pathname=usePathname()
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="text-black mr-2" size={40} />
        </SheetTrigger>
        <SheetContent className="">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription className='h-[90vh] flex flex-col justify-between'>
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
                  </ul>
                
                {/* theme toggle and login button */}
                <div className="flex items-center gap-6 ">
                  <ModeToggle></ModeToggle>
                  
                    <Button className="cursor-pointer">Login</Button>
                  
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ResponsiveMenu;
