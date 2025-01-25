import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
  { browser: "Jan", visitors: 140, fill: "#FF8F6B" },
  { browser: "Feb", visitors: 105, fill: "#5B93FF" },
  { browser: "March", visitors: 177, fill: "#FF8F6B" },
  { browser: "April", visitors: 123, fill: "#5B93FF" },
  { browser: "May", visitors: 90, fill: "#FF8F6B" },
  { browser: "June", visitors: 190, fill: "#5B93FF" },
  { browser: "July", visitors: 30, fill: "#FF8F6B" },
];

const chartConfig = {
  visitors: {
    label: "Months",
  },
  Jan: {
    label: "Jan",
    color: "hsl(var(--chart-1))",
  },
  Feb: {
    label: "Feb",
    color: "hsl(var(--chart-2))",
  },
  March: {
    label: "Mar",
    color: "hsl(var(--chart-3))",
  },
  April: {
    label: "Apr",
    color: "hsl(var(--chart-4))",
  },
  May: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },
  June: {
    label: "Jun",
    color: "hsl(var(--chart-5))",
  },
  July: {
    label: "Jul",
    color: "hsl(var(--chart-5))",
  },
};

const BarChartComponent = () => {
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle>Product Add by Month</CardTitle>
        <CardDescription className="hidden">
          January - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label}
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              barSize={10}
              layout="vertical"
              radius={50}
            />
          </BarChart>
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
};

export default BarChartComponent;
