import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import InvoiceTable from "@/components/InvoiceTable";
import { invoiceTableData } from "@/utils/contants";

const Invoice = () => {
  const { setActive } = useOutletContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setActive(false);
  }, [setActive])

  useEffect(() => {
    const filteredDataEffect = invoiceTableData.filter((data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredDataEffect);
  }, [searchTerm]);
  // Filter the data based on the search term

  return (
    <div className={`flex-1 flex flex-col gap-7 py-4 pr-7 w-full`}>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-[15px]">Invoice</p>
        <div className="flex gap-4 items-center">
          <div className="flex shadow-md rounded-md bg-white px-2 items-center gap-2">
            <input
              className="py-2 rounded-md outline-none placeholder:text-[13px] text-[13px]"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IoIosSearch className="text-[18px]" />
          </div>
          <div className="py-2 px-4 bg-primary1 text-[13px] text-white rounded-md">
            + Add New
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <InvoiceTable filteredData={filteredData} />
      </div>
    </div>
  );
};

export default Invoice;
