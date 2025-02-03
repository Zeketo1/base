import { invoiceTableHeader } from "@/utils/contants";
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
import { Checkbox } from "./ui/checkbox";
import InvoicePopover from "./InvoicePopover";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa6";

const InvoiceTable = ({ filteredData }) => {
  return (
    <Table>
      <TableCaption className="hidden">Recent Orders</TableCaption>
      <TableHeader>
        <TableRow className="text-[12px]">
          {invoiceTableHeader.map((header, i) => (
            <TableHead
              key={i}
              //   className={`${
              //     i === invoiceTableHeader.length - 1 && "opacity-0"
              //   }`}
            >
              {header}
            </TableHead>
          ))}
          <TableHead>
            <FaTrash />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-center">
        {filteredData.length == 0 ? (
          <TableRow>
            <TableCell colSpan={invoiceTableHeader.length + 1}>
              Customer Name Not Found
            </TableCell>
          </TableRow>
        ) : (
          filteredData.map((data, i) => (
            <TableRow className="text-[13px]" key={i}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{data.invoiceId} </TableCell>
              <TableCell className="text-[12px]">
                {/* <img
                src={data.image}
                alt={data.name}
                className="h-[30px] w-[30px] object-cover rounded-full"
              /> */}
                {data.name}
              </TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.date}</TableCell>
              <TableCell>
                <div
                  className={`text-center ${
                    data.status.toLowerCase() === "complete" &&
                    "text-[#3A974C] bg-[#3a974d44]"
                  } ${
                    data.status.toLowerCase() === "pending" &&
                    "text-[#F29339] bg-[#f2923944]"
                  } ${
                    data.status.toLowerCase() === "cancelled" &&
                    "text-[#D11A2A] bg-[#d11a2945]"
                  } rounded-full py-2 px-4 w-[70%] cursor-pointer capitalize`}
                >
                  {data.status}
                </div>
              </TableCell>
              <TableCell>
                <InvoicePopover customerData={data}>
                  <HiOutlineDotsHorizontal />
                </InvoicePopover>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

InvoiceTable.propTypes = {
  filteredData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default InvoiceTable;
