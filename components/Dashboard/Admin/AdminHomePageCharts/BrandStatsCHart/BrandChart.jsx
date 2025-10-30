"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Pie, PieChart, LabelList, Tooltip, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BrandChart = () => {
  //  Fetch brand-wise data
  const { data: brandStats = [], isLoading, error } = useQuery({
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
    name: item._id || "Unknown",
    value: item.count || 0,
    fill: colors[index % colors.length],
  }));

  return (
    <Card className="border-none w-full mx-auto">
      <CardHeader className="pb-0">
        <CardTitle>Brand-wise Total Bike Count Stats Pie Chart</CardTitle>
      </CardHeader>

      <CardContent className="pb-0">
        {/* Parent div height control for responsiveness */}
        <div className="w-full h-[250px] sm:h-[300px] lg:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%" // Percentage-based for responsive
                fill="#8884d9"
                label
              >
                <LabelList dataKey="name" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandChart;
