import { custermerTableHeader, updatedCustomerData } from "@/utils/contants";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import TablePopover from "./TablePopover";

const CustomerTable = () => {
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
        {updatedCustomerData.map((data, i) => (
          <TableRow className="text-[13px]" key={i}>
            <TableCell className="flex items-center gap-3 text-[12px]">
              <img
                src={data.image}
                alt={data.name}
                className="h-[30px] w-[30px] object-cover rounded-full"
              />
              {data.name}
            </TableCell>
            <TableCell>{data.email}</TableCell>
            <TableCell>{data.phone}</TableCell>
            <TableCell>
              <div
                className={`text-center rounded-full p-1 w-[70%] ${
                  data.gender == "Female"
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
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomerTable;
