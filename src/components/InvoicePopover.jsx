import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import PropTypes from "prop-types";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import TableAlertDialog from "./TableAlertDialog";
import CustomerSheet from "./CustomerSheet";
import { IoIosCamera } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

const InvoicePopover = ({ children, customerData }) => {
  const [customerName, setCustomerName] = useState(customerData.name);
  const [customerEmail, setCustomerEmail] = useState(customerData.email);
  const [customerDate, setCustomerDate] = useState(customerData.date);
  const [customerStatus, setCustomerStatus] = useState(customerData.status);

  // const customerValueChange = () => {
  //   customerData.name = customerName;
  //   customerData.email = customerEmail;
  //   customerData.date = customerDate;
  //   customerData.status = customerStatus;
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    customerData.name = customerName;
    customerData.email = customerEmail;
    customerData.date = customerDate;
    customerData.status = customerStatus;
    console.log(customerData.name);
  };

  const elementStyles = {
    edit: () => (
      <div>
        <h1 className="text-[16px] text-black font-semibold">Edit Customer</h1>
        <div className="flex items-center justify-center py-10">
          <div className="flex items-center justify-center h-[130px] w-[130px] rounded-full bg-gray-300">
            <IoIosCamera className="text-[35px]" />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[14px]">Name:</label>
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[14px]">Email:</label>
            <input
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              type="email"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[14px]">Date:</label>
            <input
              value={customerDate}
              onChange={(e) => setCustomerDate(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[14px]">Status:</label>
            <Select
              value={customerStatus}
              onValueChange={(value) => setCustomerStatus(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button
            type="submit"
            className="mt-4 cursor-pointer text-center text-white rounded-md p-2 w-full bg-[#605BFF]"
          >
            Edit Customer
          </button>
        </form>
      </div>
    ),
  };

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="p-0 flex flex-col w-[130px]">
        <CustomerSheet elementStyles={elementStyles.edit}>
          <div className="border-b flex gap-1 text-[#5B93FF] hover:bg-gray-100 p-3 text-[14px] items-center">
            <CiEdit className="text-[17px]" />
            Edit
          </div>
        </CustomerSheet>
        <TableAlertDialog>
          <div className="flex gap-1 text-[#E71D36] hover:bg-gray-100 p-3 text-[14px] items-center">
            <MdDelete className="text-[17px]" />
            Delete
          </div>
        </TableAlertDialog>
      </PopoverContent>
    </Popover>
  );
};

InvoicePopover.propTypes = {
  children: PropTypes.element,
  customerData: PropTypes.object.isRequired,
};

export default InvoicePopover;
