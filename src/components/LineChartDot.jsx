import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
  { month: "10am", sales: 186 },
  { month: "11am", sales: 305 },
  { month: "12pm", sales: 237 },
  { month: "1pm", sales: 73 },
  { month: "2pm", sales: 209 },
  { month: "3pm", sales: 214 },
  { month: "4pm", sales: 90 },
  { month: "5pm", sales: 104 },
  { month: "6pm", sales: 210 },
  { month: "7pm", sales: 140 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
};

export function LineChartDot() {
  return (
    <Card className="h-[300px] bg-transparent shadow-none border-none w-full">
      <CardHeader>
        <CardTitle className="font-semibold text-[14px]">Reports</CardTitle>
        <CardDescription className="hidden">
          January - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full">
        <ChartContainer className="w-full h-full" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="gradient-stroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5BC4FF" />
                <stop offset="100%" stopColor="#FF5BEF" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={40}
              tickFormatter={(value) => `${value}`} // Customize formatting if needed
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="sales"
              type="natural"
              stroke="url(#gradient-stroke)"
              strokeWidth={2}
              dot={{
                fill: "white",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="hidden flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
