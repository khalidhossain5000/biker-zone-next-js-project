"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import { PieChart, Pie, Label } from "recharts";

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
import SkletonLoading from "@/components/(Global)/Loader/SkletonLoading/SkletonLoading";

const PaymentChart = () => {
  // Fetch payment method stats using React Query
  const {
    data: paymentStats = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payment-stats"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/stats/payment-stats");
      return res.data.paymentMethodStats || [];
    },
  });

  if (isLoading)
    return (
     <SkletonLoading/>
    );

  if (error)
    return (
      <h2 className="text-center text-red-500">
        Error loading payment stats 😢
      </h2>
    );

  // Prepare chart data with orange theme
  const colors = ["#f97316", "#193cb8", "#fca311", "#ffb347", "#ff7f50"];
  const chartData = paymentStats.map((item, index) => ({
    name: item._id || "Unknown",
    value: item.count || 0,
    fill: colors[index % colors.length],
  }));

  // 🔹 Calculate total payments
  const totalPayments = chartData.reduce((sum, item) => sum + item.value, 0);

  // 🔹 Create chart config (for ShadCN ChartContainer)
  const chartConfig = {};
  chartData.forEach((item) => {
    chartConfig[item.name] = { label: item.name, color: item.fill };
  });

  return (
    <Card className="border-none w-full mx-auto">
      <CardHeader className="text-center pb-0">
        <CardTitle>Payment Method Count Stats</CardTitle>
      </CardHeader>

      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              {/* Add center text */}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalPayments}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Payments
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PaymentChart;
