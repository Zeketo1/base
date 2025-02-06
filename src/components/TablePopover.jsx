import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import PropTypes from "prop-types";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import TableAlertDialog from "./TableAlertDialog";
import CustomerSheet from "./CustomerSheet";
import { FaRegEye } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdPhone } from "react-icons/md";
import { CustomerBarChart } from "./CustomerBarChart";
import { RadialChartText } from "./RadialChartText";
import { IoIosCamera } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const TablePopover = ({ children, customerData }) => {
  const chartData = [{ browser: "safari", visitors: 70, fill: "#FFD66B" }];

  const chartData2 = [{ browser: "safari", visitors: 60, fill: "#5B93FF" }];

  const elementStyles = {
    view: () => (
      <div className="py-5">
        <div className="border-b pb-5 flex flex-col items-center justify-center gap-3">
          <img
            src={customerData.image}
            alt={customerData.name}
            className="h-[130px] w-[130px] object-cover rounded-full"
          />
          <h1 className="text-[19px] text-black">{customerData.name}</h1>
          <p>{customerData.occupation}</p>
        </div>
        <div className="flex flex-col gap-4 py-5">
          <h1 className="text-[16px] font-semibold text-black">Contact Info</h1>
          <div>
            <div className="flex gap-2 items-center border-b pb-3 pl-3">
              <IoIosMail className="text-[23px]" />
              <p className="text-[15px]">{customerData.email}</p>
            </div>
            <div className="flex gap-2 items-center border-b py-3 pl-3">
              <MdPhone className="text-[23px]" />
              <p className="text-[15px]">{customerData.phone}</p>
            </div>
            <div className="flex gap-2 items-center border-b py-3 pl-3">
              <IoLocationSharp className="text-[23px]" />
              <p className="text-[15px]">{customerData.address}</p>
            </div>
          </div>
          <CustomerBarChart chartData={customerData.chartData} />
          <div className="grid grid-cols-2 gap-3">
            <RadialChartText
              chartData={chartData}
              endAngle={customerData.percent[0]}
            />
            <RadialChartText
              chartData={chartData2}
              endAngle={customerData.percent[1]}
            />
          </div>
        </div>
      </div>
    ),
    edit: () => (
      <div>
        <h1 className="text-[16px] text-black font-semibold">Edit Customer</h1>
        <div className="flex items-center justify-center py-10">
          <div className="flex items-center justify-center h-[130px] w-[130px] rounded-full bg-gray-300">
            <IoIosCamera className="text-[35px]" />
          </div>
        </div>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[14px]">Name:</label>
            <input
              value={customerData.name}
              type="text"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[14px]">Occupation:</label>
            <input
              value={customerData.occupation}
              type="text"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[14px]">Email:</label>
            <input
              value={customerData.email}
              type="email"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[14px]">Phone Number:</label>
            <input
              value={customerData.phone}
              type="text"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[14px]">Gender:</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div
            type="submit"
            className="mt-4 cursor-pointer text-center text-white rounded-md p-2 w-full bg-[#605BFF]"
          >
            Edit Customer
          </div>
        </form>
      </div>
    ),
  };

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="p-0 flex flex-col w-[130px]">
        <CustomerSheet elementStyles={elementStyles.view}>
          <div className="border-b flex gap-1 text-orange-500  hover:bg-gray-100 p-3 text-[14px] items-center">
            <FaRegEye className="text-[17px]" />
            View
          </div>
        </CustomerSheet>
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

TablePopover.propTypes = {
  children: PropTypes.element,
  customerData: PropTypes.object.isRequired,
};

export default TablePopover;
