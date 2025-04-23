import { LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import CustomerTable from "@/components/customer/CustomerTable";
import CustomerDialog from "@/components/customer/CustomerDialog";
const Customer = () => {
  return (
    <div className={`flex-1 flex flex-col gap-7 py-4 pr-7 w-full`}>
      <div className="flex justify-between py-1">
        <div className="font-semibold text-[20px]">Customer List</div>
      </div>
      <div className="py-2 flex items-center justify-between w-full">
        <div className="flex bg-white rounded-lg shadow-md">
          <Link to="/analytics" className="py-2 px-4 text-[13px]">
            Product
          </Link>
          <div className="py-2 px-5 text-[13px] bg-primary1 rounded-lg text-white">
            Customer
          </div>
        </div>
        <CustomerDialog>
          <div className="flex items-center text-white gap-2 bg-primary1 py-2 px-4 rounded-md shadow-lg">
            <LuPlus />
            <p className="text-[13px]">Add Customer</p>
          </div>
        </CustomerDialog>
      </div>
      <div className="relative w-full overflow-auto px-5 py-3 bg-white shadow-md rounded-lg">
        <CustomerTable />
      </div>
    </div>
  );
};

export default Customer;
