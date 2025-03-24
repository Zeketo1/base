import { custermerTableHeader, formatPhoneNumber } from "@/utils/contants";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import TablePopover from "../TablePopover";
import { useEffect, useState } from "react";
import axios from "axios";
import Default from "../../assets/customer/default.jpg";

const CustomerTable = () => {
  const [customerData, setCustomerData] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3300/customer");
      const sortedData = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCustomerData(sortedData);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  
  useEffect(() => {
    fetchCustomers();
  }, []);

  function generateRandomPercentages() {
    const random1 = Math.floor(Math.random() * 71) + 30; // Random number between 50 and 100
    const random2 = Math.floor(Math.random() * 71) + 30; // Random number between 50 and 100
    return [random1, random2];
  }

  const getRandomDesktopValue = () => Math.floor(Math.random() * 500) + 50;
  const months = ["January", "February", "March", "April", "May", "June"];
  const updatedCustomerData = customerData.map((customer) => ({
    ...customer,
    percent: generateRandomPercentages(),
    chartData: months.map((month) => ({
      month,
      desktop: getRandomDesktopValue(),
    })),
  }));


  return (
    <Table>
      <TableCaption className="hidden">Recent Orders</TableCaption>
      <TableHeader>
        <TableRow className="text-[12px]">
          {custermerTableHeader.map((header, i) => (
            <TableHead
              key={i}
              className={`${
                i === custermerTableHeader.length - 1 && "opacity-0"
              }`}
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {updatedCustomerData.length === 0 ? (
          <TableRow>
            <TableCell
              className="text-center py-4"
              colSpan={custermerTableHeader.length + 1}
            >
              <div data-text="Loading...." className="text"></div>
            </TableCell>
          </TableRow>
        ) : (
          updatedCustomerData.map((data, i) => (
            <TableRow className="text-[13px]" key={i}>
              <TableCell className="flex items-center gap-3 text-[12px]">
                {data.profileImage ? (
                  <img
                    src={`data:${data.mimetype};base64,${data.profileImage}`}
                    alt={data.name}
                    className="h-[30px] w-[30px] object-cover rounded-full"
                  />
                ) : (
                  <img
                    src={Default}
                    alt="default"
                    className="h-[30px] w-[30px] object-cover rounded-full"
                  />
                )}
                {data.name}
              </TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{formatPhoneNumber(data.phone)}</TableCell>
              <TableCell>
                <div
                  className={`text-center capitalize rounded-full p-1 w-[70%] ${
                    data.gender == "female"
                      ? " text-pink-500 bg-[#be188c2c]"
                      : "text-[#0c5dfd] bg-[#5b92ff50]"
                  }`}
                >
                  {data.gender}
                </div>
              </TableCell>
              <TableCell>
                <TablePopover customerData={data}>
                  <HiOutlineDotsHorizontal />
                </TablePopover>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CustomerTable;
