import { LineChartDot } from "@/components/LineChartDot";
import { homeCategory, topSelling } from "../utils/contants";
import { RiArrowDropDownLine } from "react-icons/ri";
import { PieChartDonut } from "@/components/PieChartDonut";
import DashboardTable from "@/components/home/DashboardTable";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useUser } from "@clerk/clerk-react";

const Home = () => {
  const { setActive } = useOutletContext();
  const [data, setData] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    axios
      .get("http://localhost:3300/customer")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
    setActive(false);
  }, [setActive]);

  console.log(user);
  console.log(data);

  return (
    <div className={`flex-1 flex flex-col gap-7 py-4 pr-7 w-full`}>
      <div className="flex justify-between py-1 mb-5">
        <div className="font-semibold text-[20px]">Dashboard</div>
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
      <div className="relative gap-7 grid grid-cols-[60%_37%] h-fit">
        <div className="bg-white pb-[70px] shadow-md rounded-lg">
          <LineChartDot />
        </div>
        <div>
          <PieChartDonut />
        </div>
      </div>
      <div className="gap-7 grid grid-cols-[60%_37%]">
        <div className="relative w-full overflow-auto px-5 py-3 bg-white shadow-md rounded-lg">
          <p className="flex ml-5 justify-between text-left mt-4 text-sm font-semibold">
            Recent Orders
          </p>
          <DashboardTable />
        </div>
        <div className="px-5 pt-5 pb-1 h-full bg-white shadow-md rounded-lg w-full">
          <h3 className="mt-1 mb-2 text-sm font-semibold">
            Top Selling Products
          </h3>
          <div>
            {topSelling.map(({ image, name, price, ratings }, i) => (
              <div
                className={`flex gap-5 items-center ${
                  i === 0 && "border-b"
                } py-4`}
                key={i}
              >
                <img
                  className="h-[110px] w-[110px] rounded-lg object-cover "
                  src={image}
                  alt={name}
                />
                <div className="flex flex-col gap-2 justify-center h-full">
                  <p className="text-[14px]">{name}</p>
                  <img className="w-[80px]" src={ratings} alt="ratings" />
                  <p className="text-[13px] font-semibold">${price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
