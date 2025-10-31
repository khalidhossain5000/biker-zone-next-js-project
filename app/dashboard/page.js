import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminChartHome from "@/components/Dashboard/Admin/AdminHomePageCharts/AdminChartHome";
import UserHome from "@/components/Dashboard/User/UserHome/UserHome";

const DashboardHomePage = async () => {
  const session = await getServerSession(authOptions);
  const admin = session?.user?.role === "admin";
  const user = session?.user?.role === "user";
  console.log(
    user,
    "this is session in dashboard global home page",
    session,
    admin,
    "this is admin"
  );
  return (
    <div>
      {/* <h2>Welcome to dashboard and it will be shown based on user role</h2> */}

      <div>{admin && <AdminChartHome />}</div>
      <div>{user && <UserHome />}</div>
    </div>
  );
};

export default DashboardHomePage;
