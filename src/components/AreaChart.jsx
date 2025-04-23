import { TrendingUp } from "lucide-react";
import { Area, AreaChart } from "recharts";
import PropTypes from "prop-types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

export function AreaChartSingle({ className, chartData, border, id }) {
  return (
    <Card className={`bg-transparent border-none shadow-none`}>
      <CardHeader className="hidden">
        <CardTitle>Area Chart</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer className={className} config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            {/* <CartesianGrid vertical={false} /> */}
            {/* <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            /> */}
            {/* <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            /> */}
            <defs>
              <linearGradient id="gradient-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5B93FF" />
                <stop offset="100%" stopColor="white" />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="gradient-fill2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFD66B" />
                <stop offset="100%" stopColor="white" />
              </linearGradient>
            </defs>
            <Area
              dataKey="desktop"
              type="natural"
              fill={id === 0 ? "url(#gradient-fill)" : "url(#gradient-fill2)"}
              fillOpacity={0.4}
              stroke={`#${border}`}
              strokeWidth={3}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="hidden">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

AreaChartSingle.propTypes = {
  className: PropTypes.string,
  chartData: PropTypes.arrayOf(PropTypes.object),
  border: PropTypes.string,
  id: PropTypes.number,
};
