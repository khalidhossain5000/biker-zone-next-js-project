"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

const UsersRoleBar = () => {
  // 🔹 Fetch user role stats
  const {
    data: roleStats = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-roles"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/stats/users-stats");
     
      return res.data.roleStats || [];
    },
  });

  if (isLoading)
    return <h2 className="text-center text-gray-400">Loading user roles...</h2>;
  if (error)
    return (
      <h2 className="text-center text-red-500">Error loading user roles 😢</h2>
    );

  // 🔹 Prepare chart data for vertical bar chart
  const chartData = roleStats.map((role) => ({
    role: role._id,
    count: role.count,
  }));

  // Add total users as separate bar
  chartData.push({
    role: "total",
    count: roleStats.reduce((acc, r) => acc + (r.count || 0), 0),
  });

  // Chart config for ShadCN (orange theme)
  const chartConfig = {
    user: { label: "Normal Users", color: "#016630" }, // orange
    admin: { label: "Admins", color: "#00c950" }, // darker orange
    total: { label: "Total Users", color: "#e7000b" }, // light orange
    label: { color: "#000000" },
  };

  return (
    <Card className="shadow-xl shadow-green-200 border-none h-full   w-full mx-auto">
      <CardHeader>
        <CardTitle className={`text-center`}>Total User And Role Based Count Stats</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ right: 14, left: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="role"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => chartConfig[value]?.label || value}
            />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="count" radius={4}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartConfig[entry.role]?.color || "#f97316"}
                />
              ))}
              <LabelList
                dataKey="role"
                position="insideLeft"
                offset={8}
                className="fill-background"
                fontSize={12}
                formatter={(value) => chartConfig[value]?.label || value}
              />
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

    
    </Card>
  );
};

export default UsersRoleBar;
