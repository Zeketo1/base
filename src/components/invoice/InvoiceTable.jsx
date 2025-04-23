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
} from "../ui/table";
import InvoicePopover from "./InvoicePopover";
import PropTypes from "prop-types";
import Default from "../../assets/customer/default.jpg";
import { format } from "date-fns";
import { Checkbox } from "../ui/checkbox";

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
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-center">
        {filteredData.length == 0 ? (
          <TableRow>
            <TableCell
              className="text-center"
              colSpan={invoiceTableHeader.length + 1}
            >
              <div data-text="Loading...." className="text"></div>
            </TableCell>
          </TableRow>
        ) : (
          filteredData.map((data, i) => (
            <TableRow className="text-[13px]" key={i}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>#{data.invoiceId} </TableCell>
              <TableCell className="flex items-center gap-2 text-[12px]">
                {data.image ? (
                  <img
                    src={`data:${data.mimetype};base64,${data.image}`}
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
              <TableCell>{format(data.date, "MMM do, yyyy")}</TableCell>
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
                <InvoicePopover invoiceData={data}>
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
