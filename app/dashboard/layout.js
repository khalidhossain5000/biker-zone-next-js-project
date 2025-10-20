
import DashboardSidebar from "@/components/Dashboard/layout/DashboardSidebar";
import React from "react";


export const metadata = {
  title: "Dashboard",
  description: "This is the dashboard layout",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="">
       <DashboardSidebar/>
        
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        <h2 className="text-red-600 bg-gray-300 py-6">User name and email will be dispayed here</h2>
        {children}
      </main>
    </div>
  );
}
