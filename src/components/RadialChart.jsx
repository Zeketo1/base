import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { IoIosTrendingUp } from "react-icons/io";
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
const chartData = [{ month: "january", desktop: 1260, mobile: 570, game: 608 }];

const chartConfig = {
  desktop: {
    label: "Total Sale",
    color: "#5B93FF",
  },
  mobile: {
    label: "Total Order",
    color: "#FFD66B",
  },
  game: {
    label: "Order Cancel",
    color: "#FF8F6B",
  },
};

export function RadialChartStacked() {

  return (
    <Card className="flex flex-col bg-transparent shadow-none border-none">
      <CardHeader className="items-start pb-0">
        <CardTitle>Product Sales Analytics</CardTitle>
        <CardDescription className="hidden">
          January - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[220px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={360}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <foreignObject
                        textAnchor="middle"
                        x={viewBox.cx - 25} // Adjust width offset
                        y={viewBox.cy - 25} // Adjust height offset
                        width={100} // Width of the div
                        height={50} // Height of the div
                      >
                        <div
                          xmlns="http://www.w3.org/1999/xhtml"
                          className="flex items-center justify-center bg-[#5b92ff42] text-[#5B93FF] rounded-full w-fit p-3"
                        >
                          <IoIosTrendingUp className="text-[25px]" />
                        </div>
                      </foreignObject>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="desktop"
              stackId="a"
              cornerRadius={5}
              fill="#5B93FF"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="mobile"
              fill="#FFD66B"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="game"
              fill="#FF8F6B"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-around gap-2 text-sm">
        <div className="flex items-center gap-2 text-xs">
            <div className="h-[10px] rounded-full w-[10px] bg-[#5B93FF]"/>
            <p>Total Sale</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
            <div className="h-[10px] rounded-full w-[10px] bg-[#FFD66B]"/>
            <p>Total Order</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
            <div className="h-[10px] rounded-full w-[10px] bg-[#FF8F6B]"/>
            <p>Order Cancel</p>
        </div>
      </CardFooter>
    </Card>
  );
}
