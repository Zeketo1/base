import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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
const chartData = [
  { browser: "chrome", transactions: 275, fill: "#5B93FF" },
  { browser: "safari", transactions: 200, fill: "#FFD66B" },
  { browser: "firefox", transactions: 287, fill: "#FF8F6B" },
];

const chartConfig = {
  transactions: {
    label: "Transactions",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
};

export function PieChartDonut() {
  const totalTransactions = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.transactions, 0);
  }, []);

  return (
    <Card className="flex flex-col justify-between h-full">
      <CardHeader className="items-start pb-0">
        <CardTitle>Analytics</CardTitle>
        <CardDescription className="hidden">
          January - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="transactions"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
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
                          {totalTransactions.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Transactions
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
      <CardFooter className="flex justify-around gap-2 text-sm">
        <div className="flex gap-2 items-center">
          <div className="bg-[#5B93FF] h-3 w-3 rounded-full"></div>
          <p>Sales</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="bg-[#FFD66B] h-3 w-3 rounded-full"></div>
          <p>Distribute</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="bg-[#FF8F6B] h-3 w-3 rounded-full"></div>
          <p>Return</p>
        </div>
      </CardFooter>
    </Card>
  );
}
