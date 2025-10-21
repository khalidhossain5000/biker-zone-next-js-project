import DashboardSidebar from "@/components/Dashboard/layout/DashboardSidebar";
import LogoAndInfo from "@/components/Dashboard/layout/LogoandInfo/LogoAndInfo";
import React from "react";

export const metadata = {
  title: "Dashboard",
  description: "This is the dashboard layout",
};

export default function DashboardLayout({ children }) {
  return (
    <div className=" lg:min-h-screen flex">
      {/* Sidebar */}

      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 dark:bg-[#121212]">
        <LogoAndInfo/>
        {children}
      </main>
    </div>
  );
}
