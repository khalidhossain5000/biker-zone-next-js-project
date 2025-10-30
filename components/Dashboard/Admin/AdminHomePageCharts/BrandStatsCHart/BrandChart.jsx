"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

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
} from "@/components/ui/chart";

const BrandChart = () => {
  // 🔹 Fetch brand-wise data using React Query
  const {
    data: brandStats = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["brand-stats"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/stats/brand-stats");
      // API response: { brandStats: [ { _id: "honda", count: 5 } ] }
      return res.data.brandStats || [];
    },
  });

  if (isLoading)
    return <h2 className="text-center text-gray-400">Loading brand stats...</h2>;

  if (error)
    return (
      <h2 className="text-center text-red-500">
        Error loading brand stats 😢
      </h2>
    );

  // 🔹 Convert data for chart
  const chartData = brandStats.map((item, i) => ({
    browser: item._id || "Unknown",
    visitors: item.count || 0,
    fill: `var(--chart-${(i % 5) + 1})`,
  }));

  // 🔹 Create chartConfig dynamically
  const chartConfig = {
    visitors: { label: "Total Bikes" },
  };

  chartData.forEach((item, i) => {
    chartConfig[item.browser] = {
      label: item.browser,
      color: `var(--chart-${(i % 5) + 1})`,
    };
  });

  return (
    <Card className="flex flex-col w-full max-w-2xl mx-auto">
      <CardHeader className="items-center pb-0">
        <CardTitle>Brand-wise Bike Distribution</CardTitle>
        <CardDescription>Showing all bikes grouped by brand</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors">
              <LabelList
                dataKey="browser"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value) =>
                  chartConfig[value] ? chartConfig[value].label : value
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 12.3% this month
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing all bike brands from your database
        </div>
      </CardFooter>
    </Card>
  );
};

export default BrandChart;
