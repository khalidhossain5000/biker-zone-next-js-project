"use client";
import { House, Motorbike } from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/(Global)/Theme/ThemeToggle";
import { signOut } from "next-auth/react";
import ResponsiveSidebarMenu from "./ResponsiveSidebarMenu";
import logo from "../../../assets/logo/logo-go.png";
import darklogo from "../../../assets/logo/dark-logo.png";
import Image from "next/image";
const DashboardSidebar = () => {
  const pathname = usePathname();

  const sidebarRoutes = [
    {
      name: "Dashboard Overview",
      path: "/dashboard",
      icon: <House className="w-5 h-5" />,
    },
    {
      name: "Add Bike",
      path: "/dashboard/add-bike",
      icon: <Motorbike className="w-5 h-5" />,
    },
    {
      name: "All Users",
      path: "/dashboard/all-users",
      icon: <House className="w-5 h-5" />,
    },
  ];

  return (
    <div className="sticky top-0">
      <aside className="hidden lg:flex lg:flex-col lg:min-h-screen bg-[#ffffff] dark:bg-[#25b3d8] text-white justify-between px-3 py-5 ">
        <div>
          {/* logo  */}
          <div className="logoh mb-12">
            <Image
              src={logo}
              alt="Logo of the site"
              className="dark:hidden"
              width={250}
            />
            <Image
              src={darklogo}
              alt="Logo of the site"
              className="hidden dark:block"
              width={250}
            />
          </div>
          {/* Top Routes */}
          <div className=" flex flex-col gap-4">
            {sidebarRoutes.map((route, idx) => {
              const isActive = pathname === route.path;
              return (
                <Link
                  key={idx}
                  href={route.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#004e66] dark:bg-[#0a8cb4] text-white font-semibold"
                      : "hover:bg-gray-800 text-black hover:text-white dark:hover:text-white "
                  }`}
                >
                  {route.icon}
                  <span>{route.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
        {/* Bottom Logout */}
        <div className="flex items-center gap-6">
          <ModeToggle />
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className=" w-full px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors font-medium dark:bg-green-500 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>
      {/* mobile dashboard menu start from here */}
      <div className="lg:hidden">
        <ResponsiveSidebarMenu
        ></ResponsiveSidebarMenu>
      </div>
    </div>
  );
};

export default DashboardSidebar;
