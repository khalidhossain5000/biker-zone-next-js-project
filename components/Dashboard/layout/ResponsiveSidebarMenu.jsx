"use client";
import { ModeToggle } from "@/components/(Global)/Theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import logo from "../../../assets/logo/logo-go.png";
import darklogo from "../../../assets/logo/dark-logo.png";
const sidebarRoutes = [
  {
    name: "Dashboard Overview",
    path: "/dashboard",
    icon: <House className="w-5 h-5" />,
  },
  {
    name: "Analytics",
    path: "/dashboard/analytics",
    icon: <House className="w-5 h-5" />,
  },
  {
    name: "Reports",
    path: "/dashboard/reports",
    icon: <House className="w-5 h-5" />,
  },
];
const ResponsiveSidebarMenu = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between px-6 py-3 dark:bg-[#2b2b2b] dark:shadow-xl dark:shadow-white">
      <div>
        <Sheet>
          <SheetTrigger>
            <Menu className="text-black dark:text-white mr-2" size={40} />
          </SheetTrigger>
          <SheetContent className="">
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <div className="h-[90vh] flex flex-col justify-between">
                <div className="flex flex-col justify-between h-full">
                  {/* menu-items */}

                  <ul className="space-y-2 my-6 text-[19px] font-medium ">
                    {sidebarRoutes.map((route, idx) => {
                      const isActive = pathname === route.path;
                      return (
                        <Link
                          key={idx}
                          href={route.path}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            isActive
                              ? "bg-[#004e66] dark:bg-[#0a8cb4] text-white font-semibold"
                              : "hover:bg-gray-800 hover:text-white"
                          }`}
                        >
                          {route.icon}
                          <span>{route.name}</span>
                        </Link>
                      );
                    })}
                  </ul>

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
      {/* logo  */}
      <div className="logoh ">
        <Image
          src={logo}
          alt="Logo of the site"
          className="dark:hidden"
          width={150}
        />
        <Image
          src={darklogo}
          alt="Logo of the site"
          className="hidden dark:block"
          width={150}
        />
      </div>
    </div>
  );
};

export default ResponsiveSidebarMenu;
