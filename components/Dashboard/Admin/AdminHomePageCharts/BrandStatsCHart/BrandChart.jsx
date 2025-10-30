"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, LabelList, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BrandChart = () => {
  //  Fetch brand-wise data
  const {
    data: brandStats = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["brand-stats"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/stats/brand-stats");
      return res.data.brandStats || [];
    },
  });

  if (isLoading)
    return (
      <h2 className="text-center text-black dark:text-white">
        Loading brand stats...
      </h2>
    );

  if (error)
    return (
      <h2 className="text-center text-red-500">Error loading brand stats</h2>
    );

  // Prepare chart data
  const colors = ["#f97316", "#ff6900", "#22c55e", "#3b82f6", "#8b5cf6"];
  const chartData = brandStats.map((item, index) => ({
    name: item._id || "Unknown", // name used for label
    value: item.count || 0, // value used for Pie
    fill: colors[index % colors.length],
  }));

  return (
    <Card className="border-none w-full mx-auto">
      <CardHeader className="pb-0">
        <CardTitle>Brand-wise Total Bike Count Stats Chart</CardTitle>
      </CardHeader>

      <CardContent className=" pb-0">
        <PieChart width={400} height={400} className="">
          <Tooltip />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={190}
            fill="#8884d8"
            label
          >
            <LabelList dataKey="name" />
          </Pie>
        </PieChart>
      </CardContent>
    </Card>
  );
};

export default BrandChart;
