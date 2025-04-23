import { RiArrowDropDownLine } from "react-icons/ri";
import { LuPlus } from "react-icons/lu";
import { AreaChartSingle } from "@/components/AreaChart";
import { productAnalytics } from "@/utils/contants";
import AnalyticsTable from "@/components/analytics/AnalyticsTable";
import BarChartComponent from "@/components/BarChart";
import { RadialChartStacked } from "@/components/RadialChart";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Analytics = () => {
  const { setActive } = useOutletContext();
  useEffect(() => {
    setActive(false);
  }, [setActive]);
  
  return (
    <div className={`flex-1 flex flex-col gap-7 py-4 pr-7 w-full`}>
      <div className="flex justify-between py-1">
        <div className="font-semibold text-[20px]">Product Analytics</div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 text-[13px] bg-white py-2 px-4 rounded-md shadow-lg">
            10-06-2025 <RiArrowDropDownLine className="text-[17px]" />{" "}
          </div>
          <div className="flex items-center gap-1 text-[13px] bg-white py-2 px-4 rounded-md shadow-lg">
            10-06-2025 <RiArrowDropDownLine className="text-[17px]" />{" "}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex bg-white rounded-lg shadow-md">
          <div className="py-2 px-5 text-[13px] bg-primary1 rounded-lg text-white">
            Product
          </div>
          <Link to="/customer" className="py-2 px-4 text-[13px]">
            Customer
          </Link>
        </div>
        <div className="flex items-center text-white gap-2 bg-primary1 py-2 px-4 rounded-md shadow-lg">
          <LuPlus />
          <p className="text-[13px]">Add Products</p>
        </div>
      </div>
      <div className="gap-7 grid grid-cols-[60%_37%] h-fit">
        <div className="flex flex-col gap-7">
          <div className="grid grid-cols-2 gap-7">
            {productAnalytics.map(
              (
                {
                  color,
                  name,
                  glow,
                  icon,
                  quntityAdded,
                  totalProducts,
                  chartData,
                },
                i
              ) => (
                <div
                  className="overflow-hidden bg-white w-full h-[170px] rounded-lg shadow-md"
                  key={i}
                >
                  <div className="flex justify-between px-5 pt-4">
                    <div className="flex gap-4">
                      <div
                        style={{ backgroundColor: `#${glow}` }}
                        className={`flex items-center justify-center h-[40px] w-[40px] p-2 rounded-full`}
                      >
                        <img className=" object-cover" src={icon} alt={name} />
                      </div>
                      <div>
                        <p className="text-[13px] text-gray-500">{name}</p>
                        <p className="font-semibold">{totalProducts}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-green-400">{quntityAdded}</p>
                  </div>
                  <AreaChartSingle
                    className="h-[110px] w-full"
                    chartData={chartData}
                    border={color}
                    id={i}
                  />
                </div>
              )
            )}
          </div>
          <div className="w-full overflow-auto px-5 py-3 relative bg-white shadow-md rounded-lg">
            <p className="flex ml-5 justify-between text-left mt-4 text-sm font-semibold">
              Top Selling Products
            </p>
            <AnalyticsTable />
          </div>
        </div>
        <div className="grid grid-rows-2 gap-7 h-full">
          <div className="bg-white shadow-md rounded-lg">
            <BarChartComponent />
          </div>
          <div className="bg-white shadow-md rounded-lg">
            <RadialChartStacked />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
