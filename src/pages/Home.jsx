import { LineChartDot } from "@/components/LineChartDot";
import { homeCategory } from "../utils/contants";
import { RiArrowDropDownLine } from "react-icons/ri";
import { PieChartDonut } from "@/components/PieChartDonut";

const Home = () => {
  return (
    <div className={`flex flex-col gap-7 py-4 pr-7 w-full`}>
      <div className="flex justify-between py-1 mb-5">
        <div className="font-semibold text-[15px]">Dashboard</div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 text-[13px] bg-white py-2 px-4 rounded-md shadow-lg">
            10-06-2025 <RiArrowDropDownLine className="text-[17px]" />{" "}
          </div>
          <div className="flex items-center gap-1 text-[13px] bg-white py-2 px-4 rounded-md shadow-lg">
            10-06-2025 <RiArrowDropDownLine className="text-[17px]" />{" "}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-7">
        {homeCategory.map(({ color, num, icon, text }, i) => (
          <div
            key={i}
            className="flex gap-4 items-center justify-center rounded-lg shadow-md bg-white w-[full] h-[120px]"
          >
            <div
              style={{ backgroundColor: `#${color}` }}
              className={`flex items-center justify-center rounded-full p-3`}
            >
              <img
                src={icon}
                alt={text}
                className="h-[18px] w-[18px] object-cover"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-[17px] font-semibold">{num}+</p>
              <p className="text-[13px]">{text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="relative gap-7 grid grid-cols-[60%_37%] h-[300px]">
        <div className="bg-white pb-16 shadow-md rounded-lg">
          <LineChartDot />
        </div>
        <div>
          <PieChartDonut />
        </div>
      </div>
    </div>
  );
};

export default Home;
